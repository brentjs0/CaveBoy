const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  configureWebpack: (config) => {
    config.mode = 'production';
    config.devtool = 'source-map';
    config.optimization.minimize = false;

    const htmlWebpackPlugin = config.plugins.filter(
      (p) => p instanceof HtmlWebpackPlugin
    )[0];
    htmlWebpackPlugin.options.title = 'CaveBoy';
  },
  lintOnSave: 'warning',
  productionSourceMap: true,
  publicPath: './',
};
