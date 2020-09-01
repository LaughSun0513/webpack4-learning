const app = require('express')();
const config = require('./webpack.config.js');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler));

app.use('/user',(req,res)=>{
    res.json({
        txt: 'webpack 在后端启动了 端口一致解决了跨域 顺便打了个包并返回了接口http://localhost:3334/user的结果'
    })
});

app.listen(3334,()=>{
    console.log('webpack in server listening on 3333')
})