
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path:path.resolve(__dirname,'build'),
    },
    module: {
        // noParse: /jquery/,
        rules: [
            {
                test:/\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                },
                // include: path.join(__dirname,'src'), // 处理src里的文件
                // exclude: /node_modules/ // 排除node_modules
            }
        ]
    },
    plugins: [
        new webpack.IgnorePlugin(/\.\/locale/,/moment/),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename:"index.html"
        })
    ]
}