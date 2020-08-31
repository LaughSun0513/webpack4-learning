require("./index.css");
// import $ from "jquery";
// require("expose-loader?$!jquery");
import "@babel/polyfill";
import {createImgByJS} from './img';

const fn = () => {
	const str = "hello webpack!!!";
	return str;
};

console.log(fn());

// ES7写法 类上加属性
class A {
	a = 1;
}
const newA = new A();
console.log(newA.a);

// 装饰器写法
@log
class B {
	b = 2;
}
const newB = new B();

function log(targetClass) {
	console.log(targetClass);
}

// generate/yield 语法
function* generate() {
	yield "generate";
}
console.log(generate().next().value);

// includes语法 通过@babel/polyfill 在Array上重写了includes
console.log("aaa".includes("a"));

// console.log(window.$);
console.log($);


createImgByJS();
