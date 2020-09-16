const { SyncHook } = require('tapable');

class Lesson {
	constructor() {
		this.hooks = {
			listener: new SyncHook(['name'])
		}
	}
	init() {
		this.hooks.listener.tap('node', (name) => {
			console.log('node', name)
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

// node tapable-SyncHook.js
// node 我要学习
// react 我要学习