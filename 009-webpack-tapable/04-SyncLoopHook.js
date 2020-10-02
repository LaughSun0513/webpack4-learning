// 同步钩子 -- SyncLoopHook 可以给定条件让某个函数多次执行 当符合条件返回undefined 即可继续执行下一个Task
class SyncLoopHook {
    constructor(){
        this.tasks = [];
    }
    tap(taskName,taskFunc){
        this.tasks.push(taskFunc);
    }
    call(...args){
        this.tasks.forEach(taskFunc=>{
            let res;
            do {
                res = taskFunc(...args);
            } 
            while (res !== undefined); // 只要不返回undefined就一直循环执行该函数
        })
    }
}
// 使用
const hook = new SyncLoopHook(['name']);
let index = 0;
hook.tap('node', (name, age) => {
	console.log('node', name);
    return ++index > 3 ? undefined : '继续执行该函数到3次再继续往下执行'
});
hook.tap('react', (data) => {
    console.log('react', data);
});
hook.tap('Vue', (data) => {
    console.log('Vue', data);
});

hook.call('我要学习'); // 传递name