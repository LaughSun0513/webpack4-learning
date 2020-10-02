const { SyncLoopHook } = require('tapable');

class Lesson {
	constructor() {
        this.index = 0;
		this.hooks = {
			listener: new SyncLoopHook(['name'])
		}
	}
	init() {
		this.hooks.listener.tap('node', (name) => {
            console.log('node', name);
            return ++this.index > 3 ? undefined : '继续执行该函数到3次再继续往下执行'
		});
		this.hooks.listener.tap('react', (data) => {
            console.log('react', data);
        });
        this.hooks.listener.tap('Vue', (data) => {
            console.log('Vue', data);
		})
	}
	start() {
		this.hooks.listener.call('我要学习'); // 传递name
	}
}
const obj = new Lesson();
obj.init(); // 注册
obj.start(); // 调用，传递name

/*  SyncLoopHook结论：可以给定条件让某个函数多次执行 当符合条件返回undefined 即可继续执行下一个Task

    node 我要学习
    node 我要学习
    node 我要学习
    node 我要学习
    react 我要学习
    Vue 我要学习
*/