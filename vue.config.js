const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    configureWebpack: config => {
        const htmlWebpackPlugin = config.plugins.filter(p => p instanceof HtmlWebpackPlugin)[0];
        htmlWebpackPlugin.options.title = 'CaveBoy';
    },
    lintOnSave: 'warning',
    productionSourceMap: true,
    publicPath: './'
};