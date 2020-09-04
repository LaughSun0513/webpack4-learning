const button = document.createElement('button');
button.innerHTML = '点我加载 lazyLoad.js';
button.addEventListener('click', () => {
    import('./lazyload.js').then(data => { 
        alert(data.default);
    })
});
document.body.appendChild(button);
