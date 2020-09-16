// 同步钩子 -- SyncHook
class SyncHook {
	constructor(args) {
		this.tasks = []; // 发布订阅模式
	}
	tap(name, task) {
		this.tasks.push(task); // 注册
	}
	call(...args) { // 执行掉每个task,并将参数传入回调里面 这里是name
		this.tasks.forEach(taskFunc => {
			taskFunc(...args);
		})
	}
}

// 使用
const hook = new SyncHook(['name']);
hook.tap('react', (name) => {
	console.log('react', name);
});
hook.tap('node', (name) => {
	console.log('node', name);
});
hook.call('我要学习'); // 传递name

// react 我要学习
// node 我要学习