const HtmlWebpackPlugin = require('html-webpack-plugin');

const nodeEnv = process.env.NODE_ENV.trim();

module.exports = {
  configureWebpack: (config) => {
    config.mode = nodeEnv;

    if (nodeEnv === 'production') {
      config.devtool = 'source-map';
    } else {
      config.devtool = 'eval-source-map';
      config.optimization.minimize = false;
    }

    config.plugins[5].options.title = 'CaveBoy';
  },
  lintOnSave: 'warning',
  outputDir: nodeEnv === 'production' ? 'dist' : 'dev',
  productionSourceMap: true,
  publicPath: './',
};
