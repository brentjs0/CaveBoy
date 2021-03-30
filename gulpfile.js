'use strict';

const autoprefixer = require('autoprefixer');
const babelify = require('babelify');
const browserify = require('browserify');
const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
const gulplog = require('gulplog');
const gulpPostcss = require('gulp-postcss');
const gulpRename = require('gulp-rename');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpTap = require('gulp-tap');
const gulpUglify = require('gulp-uglify');
const sass = require('sass');
const vinylBuffer = require('vinyl-buffer');
// const vinylSourceStream = require('vinyl-source-stream');
// const { Readable } = require('stream');

// Copy HTML file(s) to the web distributable folder.
exports.copyHTML = function copyHTML() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./web-dist/'));
}

// Copy HTML file(s) to the web distributable folder.
exports.html = gulp.series(exports.copyHTML);

// Transpile SCSS to CSS, add browser prefixes, and save the file in the web distributable CSS folder.
exports.processStyles = function processStyles() {
    return gulp.src('./src/style/style.scss', { read: false })
        .pipe(gulpTap(function (file) {
            gulplog.info(`Transpiling ${file.path}...`);
            file.contents = sass.renderSync({ file: file.path }).css
        }))
        .pipe(gulpPostcss([autoprefixer()]))
        .pipe(gulpRename({ extname: '.css' }))
        .pipe(gulp.dest('./web-dist/style/'));
}

// Transpile SCSS to CSS, add browser prefixes, and save the file in the web distributable CSS folder.
exports.styles = gulp.series(exports.processStyles);

// Transpile and package browser script files and save the bundle in the web distributable JS folder.
exports.bundleBrowserScripts = function bundleBrowserScripts() {
    return gulp.src(['./src/script/bundle.ts'], { read: false })
        .pipe(gulpTap(function (file) {
            gulplog.info(`Bundling ${file.path}...`);
            file.contents = browserify({
                entries: [file.path],
                debug: true,
                extensions: ['.js', '.ts']
            })
            .transform(babelify, {
                presets: ['@babel/preset-env', '@babel/preset-typescript'],
                plugins: ['@babel/plugin-proposal-class-properties'],
                extensions: ['.js', '.ts'],
                sourceMaps: true
            })
            .bundle()
        }))
        .pipe(vinylBuffer())
        .pipe(gulpSourcemaps.init({ loadMaps: true }))
        //.pipe(gulpUglify())
        .on('error', gulplog.error)
        .pipe(gulpRename({ extname: '.min.js' }))
        .pipe(gulpSourcemaps.write('./',))
        .pipe(gulp.dest('./web-dist/script/'));
}

// Copy main.js (the main Electron process) to the web distributable folder.
exports.transpileMainScript = function transpileMainScript() {
    return gulp.src('./src/main.ts')
        .pipe(gulpBabel({
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-proposal-class-properties']
        }))
        .pipe(gulpRename({ extname: '.js' }))
        .pipe(gulp.dest('./web-dist/'));
}

// Bundle/copy browser scripts, transpile the main script, and save files to the web distributable folder.
exports.scripts = gulp.series(exports.bundleBrowserScripts, exports.transpileMainScript);

// Run all the tasks necessary to prepare the project for web distribution.
exports.go = gulp.series(exports.html, exports.styles, exports.scripts);

exports.watch = function watch() {
    gulp.watch('./src/**/*.html', { ignoreInitial: false }, exports.html);
    gulp.watch('./src/style/**/*.scss', { ignoreInitial: false }, exports.styles);
    gulp.watch(['./src/main.ts', './src/script/bundle.ts'], { ignoreInitial: false }, exports.scripts);
}

exports.default = exports.watch;