const path = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        page1: './src/page1.js',
        page2: './src/page2.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'page1.html',
            chunks: ['page1']
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'page2.html',
            chunks: ['page2']
        }),
    ]
}