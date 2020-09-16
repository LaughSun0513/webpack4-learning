const { SyncBailHook } = require('tapable');

class Lesson {
	constructor() {
		this.hooks = {
			listener: new SyncBailHook(['name'])
		}
	}
	init() {
		this.hooks.listener.tap('node', (name) => {
			console.log('node', name);
			// return '学累了,先不接下去学react了'
			// return 0;
			// return [];
			// return {};
			// return '';
			// return null;
			// return false;
			// return true;

			// 只要非undefined的都可以停止在这个函数，不会继续执行下一个
			// return undefined;
		});
		this.hooks.listener.tap('react', (name) => {
			console.log('react', name)
		})
	}
	start() {
		this.hooks.listener.call('我要学习'); // 传递name
	}
}
const obj = new Lesson();
obj.init(); // 注册
obj.start(); // 调用，传递name

// node 我要学习