import {str} from './hotModules';

const ajax = {
    get: (url,callback) =>{
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.send();
        xhr.onload = () => {
            const res = JSON.parse(xhr.response);
            callback(res);
        };
    }
}

// ajax.get('/api/user',(res)=>{
//     console.log(res.txt);
// });
// ajax.get('/proxy/interface/user',(res)=>{
//     console.log(res.txt);
// });
ajax.get('/mock/user',(res)=>{
    console.log(res.txt);
});

console.log(str);

if (module.hot) { 
    module.hot.accept('./hotModules', () => { 
        console.log('监控hotModules文件的变化')
        let str = require('./hotModules');
        console.log('更新完之后是增量更新，不刷新浏览器了' + JSON.stringify(str));
    })
}




