const app = require('express')();

app.get('/api/user',(req,res)=>{
    res.json({
        txt: 'hello webpack-dev-server proxy localhost:3333/api/user'
    })
});
app.get('/user',(req,res)=>{
    res.json({
        txt: 'hello webpack-dev-server proxy localhost:3333/user'
    })
});

app.listen(3333,()=>{
    console.log('server listening on 3333')
})