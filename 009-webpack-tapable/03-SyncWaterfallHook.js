// 同步钩子 -- SyncWaterfallHook 上一个Task的返回值是下一个的入参
class SyncWaterfallHook {
    constructor(){
        this.tasks = [];
    }
    tap(taskName,taskFunc){
        this.tasks.push(taskFunc);
    }
    call(...args){
        let [firstTaskFunc,...others] = this.tasks;
        let firstTaskRes = firstTaskFunc(...args); // 执行第一个，将结果给后面的，成为入参
        // 关键代码 
        others.reduce((preTaskResult,nextTaskFunc)=>{
           return nextTaskFunc(preTaskResult);
        },firstTaskRes);
    }
}
// 使用
const hook = new SyncWaterfallHook(['name']);
hook.tap('node', (name, age) => {
	console.log('node', name, age);
    return '1. node的结果';
});
hook.tap('react', (data) => {
    console.log('react', data);
    return '2. react的结果';
});
hook.tap('Vue', (data) => {
    console.log('Vue', data);
});

hook.call('我要学习','我13岁'); // 传递name