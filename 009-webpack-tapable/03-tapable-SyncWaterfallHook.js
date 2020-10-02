const { SyncWaterfallHook } = require('tapable');

class Lesson {
	constructor() {
		this.hooks = {
			listener: new SyncWaterfallHook(['name','age'])
		}
	}
	init() {
		this.hooks.listener.tap('node', (name,age) => {
            console.log('node', name,age);
            return '1. node的结果';
		});
		this.hooks.listener.tap('react', (data) => {
            console.log('react', data);
            return '2. react的结果';
        });
        this.hooks.listener.tap('Vue', (data) => {
            console.log('Vue', data);
		})
	}
	start() {
		this.hooks.listener.call('我要学习','13'); // 传递name
	}
}
const obj = new Lesson();
obj.init(); // 注册
obj.start(); // 调用，传递name

/*  SyncWaterfallHook结论：上一个结果是下一个的入参

    node 我要学习 13
    react 1. node的结果
    Vue 2. react的结果
*/