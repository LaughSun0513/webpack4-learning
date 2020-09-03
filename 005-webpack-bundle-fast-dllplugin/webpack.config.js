
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    devServer: {
        port:3000, //修改端口
        progress:true,//
        contentBase:'./build', //将当前目录作为静态服务的目录，否则会去内存里
        compress:true, //开启压缩
        open:true //自动打开页面
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'build','manifest.json')
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: "index.html"
        })
    ]
}