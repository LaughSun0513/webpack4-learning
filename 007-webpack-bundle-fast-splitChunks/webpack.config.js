
const path = require('path');
module.exports = {
    mode: 'production',
    entry: {
        page1: './src/page1.js',
        page2: './src/page2.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname,'build')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: { // 抽离代码理的公共代码
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2 // 引入次数超过两次的都打成common包 这里a.js和b.js都被引用了两次
                },
                vendor: { // 抽离第三方的包
                    priority:1, // 提高打包的权重，否则都会进common的包 所以先抽离vendor第三包 再去抽离common
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2
                }
            }
        }
    }
}