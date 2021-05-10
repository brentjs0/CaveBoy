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
  devtool: false,
};
