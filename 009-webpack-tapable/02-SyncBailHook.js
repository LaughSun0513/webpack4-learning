// 同步钩子 -- SyncBailHook 执行到某个Task只要返回非undefined类型的值就停止执行，不继续下去
class SyncBailHook {
	constructor(args) {
		this.tasks = []; // 发布订阅模式
	}
	tap(name, task) {
		this.tasks.push(task); // 注册
	}
	call(...args) { // 执行掉每个task,并将参数传入回调里面 这里是name
		for (let i = 0; i < this.tasks.length; i++) {
			let curTask = this.tasks[i](...args); // 调用各个任务，
			if (curTask !== undefined) { // 如果有返回值就break
				break;
			}
		}
	}
}
// 使用
const hook = new SyncBailHook(['name']);
hook.tap('react', (name) => {
	console.log('react', name);
	return '停止学习'
});
hook.tap('node', (name) => {
	console.log('node', name);
});
hook.call('我要学习'); // 传递name