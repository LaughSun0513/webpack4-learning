const path = require("path");
const {
    merge
} = require('webpack-merge');
const baseConfig = require('./webpack.common');


const devConfig = {
    mode: "development", //默认两种模式 production development
    output: {
        filename: "bundle.js", //打包后的文件名 带6位hash
        path: path.resolve(__dirname, "build"), //路径必须是一个绝对路径
        // publicPath: 'http://www.baidu.com'
    },
    devServer: {
        port: 3000, //修改端口
        progress: true,
        contentBase: "./build", //将当前目录作为静态服务的目录，否则会去内存里
        compress: true, //开启压缩
        open: true,
    },
    watch: false,
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 100,
        ignored: /node_modules/
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            // {
            //     test: /\.(png|jpg|gif|svg)$/,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             esModule: false
            //         }
            //     }
            // },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        esModule: false
                    }
                }
            }
        ]
    }

};

module.exports = merge(baseConfig, devConfig);