const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    main: './tests/browser/main.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /\/node_modules\//,
      },
      {
        test: /\.(?:fts|map|yml)$/,
        use: 'raw-loader',
      },
    ],
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm',
      '.fts',
      '.map',
      '.yml',
    ],
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  output: {
    path: path.resolve(__dirname, './tests/browser/'),
    filename: '[name].js',
  },
  optimization: {
    minimize: false,
  },
  externals: {
    mocha: 'root mocha',
    chai: 'root chai',
  },
  devtool: 'source-map',
};
