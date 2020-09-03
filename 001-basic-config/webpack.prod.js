const path = require("path");
const {
    merge
} = require('webpack-merge');
const baseConfig = require('./webpack.common');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // 压缩css
const TerserJsPlugin = require("terser-webpack-plugin"); // 压缩js 支持ES6

const prodConfig = {
    mode: "production", //默认两种模式 production development
    output: {
        filename: "bundle.js", //打包后的文件名 带6位hash
        path: path.resolve(__dirname, "build"), //路径必须是一个绝对路径
        publicPath: 'http://www.baidu.com'
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserJsPlugin()
        ]
    },
    module: {
        rules: [{
            test: /\.(png|jpg|gif|svg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1,
                    esModule: false,
                    outputPath: '/img/',
                    publicPath: 'http://www.baidu.com'
                }
            }
        }]
    }
};

module.exports = merge(baseConfig, prodConfig);