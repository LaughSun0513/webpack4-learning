const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    mode:'development', //默认两种模式 prodution development
    entry:'./src/index.js', //入口
    output:{
        filename:'bundle.[hash:6].js', //打包后的文件名 带6位hash
        path:path.resolve(__dirname,'build') //路径必须是一个绝对路径
    },
    devServer:{
        port:3000, //修改端口
        progress:true,//
        contentBase:'./build', //将当前目录作为静态服务的目录，否则会去内存里
        compress:true //开启压缩
    },
    plugins:[ //数组，放着所有的webpack插件
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:"index.html",
            minify:{
                removeAttributeQuotes:true, //去掉html的引号
                collapseWhitespace:true, //将HTML打包成一行
            },
            hash:true //会在打包后的bundle.js和添加hash值 例如bundle.js?30c2c0f02493fdc2a499

        })
    ]
}