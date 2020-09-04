const path = require('path');
const Happypack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // {
            //     test: /\.jsx?$/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['@babel/preset-env']
            //         }
            //     }
            // }
            {
                test: /\.jsx?$/,
                use: 'Happypack/loader?id=js'
            },
            // {
            //     test: /\.css$/,
            //     use:  [MiniCssExtractPlugin.loader, 'css-loader']
            // }
            // {
            //     test: /\.css$/,
            //     use:  [MiniCssExtractPlugin.loader, 'Happypack/loader?id=css']    // 这里Happypack + mini-css-extract-plugin打包配置有点问题，后面再研究
            // }
            {
                test: /\.css$/,
                use:  'Happypack/loader?id=css'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        // new MiniCssExtractPlugin({
        //     filename: 'main.css'
        // }),
        new Happypack({
            id: 'js',
            use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
            }]
        }),
        new Happypack({
            id: 'css',
            use: ['style-loader','css-loader'] // 貌似css被打包到了js中
        })
    ]
}