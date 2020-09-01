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





