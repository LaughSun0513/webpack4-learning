# webpack4-learning

## webpack 安装
 yarn add  webpack webpack-cli -D

## webpack可以进行0配置


是打包工具-->输出后的结果(js模块)
打包(支持我们的js的模块化)

可以直接 `npx webpack` 进行打包 输出dist文件

## webpack打包出来的内容的分析
```
(function (modules) { // webpackBootstrap
	// The module cache
	var installedModules = {}; //定义缓存

	// The require function
	function __webpack_require__(moduleId) { //require函数

		// Check if module is in cache
		if (installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		// Create a new module (and put it into the cache)
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};

		// Execute the module function
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);//调用路径key对应的value函数

		// Flag the module as loaded
		module.l = true;

		// Return the exports of the module
		return module.exports;
	}


	// expose the modules object (__webpack_modules__)
	__webpack_require__.m = modules;

	// expose the module cache
	__webpack_require__.c = installedModules;

	// define getter function for harmony exports
	__webpack_require__.d = function (exports, name, getter) {
		if (!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, { enumerable: true, get: getter });
		}
	};

	// define __esModule on exports
	__webpack_require__.r = function (exports) {
		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
		}
		Object.defineProperty(exports, '__esModule', { value: true });
	};

	// create a fake namespace object
	// mode & 1: value is a module id, require it
	// mode & 2: merge all properties of value into the ns
	// mode & 4: return value when already ns object
	// mode & 8|1: behave like require
	__webpack_require__.t = function (value, mode) {
		if (mode & 1) value = __webpack_require__(value);
		if (mode & 8) return value;
		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
		var ns = Object.create(null);
		__webpack_require__.r(ns);
		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
		if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
		return ns;
	};

	// getDefaultExport function for compatibility with non-harmony modules
	__webpack_require__.n = function (module) {
		var getter = module && module.__esModule ?
			function getDefault() { return module['default']; } :
			function getModuleExports() { return module; };
		__webpack_require__.d(getter, 'a', getter);
		return getter;
	};

	// Object.prototype.hasOwnProperty.call
	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

	// __webpack_public_path__
	__webpack_require__.p = "";


	// Load entry module and return exports
	return __webpack_require__(__webpack_require__.s = "./src/index.js"); //入口模块
})

	({

		"./src/index.js": //key--->模块路径
		(function (module, exports) { //value函数

			eval("console.log('hello webpack!');\n\n\n//# sourceURL=webpack:///./src/index.js?");
		})

	});

```

## 手动配置webpack
默认配置文件的名字webpack.config.js

```
const path = require('path');

module.exports={
    mode:'development', //默认两种模式 prodution development
    entry:'./src/index.js', //入口
    output:{
        filename:'bundle.js', //打包后的文件名
        path:path.resolve(__dirname,'build') //路径必须是一个绝对路径
    }
}
```

## 打包方式的配置
如果修改  webpack.config.js 的文件名 比如webpack.config.my.js 运行方式有如下几种

1.`npx webpack --config webpack.config.my.js`

2.在package.json创建
```
"scripts":{
      "build":"webpack --config webpack.config.my.js"
  }
```
运行 `npm run build`

3.添加 命令行参数 也可以运行
```
"scripts":{
      "build":"webpack"
  }
```

运行`npm run build -- --config webpack.config.my.js`   // 添加 -- 参数

------------------------------------
##webpack-dev-server   在本地启动一个静态服务

`yarn add webpack-dev-server -D`

```
"scripts": {
    "dev":"webpack-dev-server"
  }
```
```
devServer:{
        port:3000, //修改端口
        progress:true,//
        contentBase:'./build', //将当前目录作为静态服务的目录，否则会去内存里
        compress:true //开启压缩
}
```
运行`npm run dev` 

## 插件

### html-webpack-plugin --- 自动生成html文件 并引入打包的bundle.js文件
`yarn add html-webpack-plguin -D`

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    mode:'development', //默认两种模式 prodution development
    entry:'./src/index.js', //入口
    output:{
        filename:'bundle.js', //打包后的文件名
        path:path.resolve(__dirname,'build') //路径必须是一个绝对路径
    },
    devServer:{
        port:3000, //修改端口
        progress:true,//
        contentBase:'./build', //将当前目录作为静态服务的目录，否则会去内存里
        compress:true //开启压缩
    },
    plugins:[ //数组，放着所有的webpack插件
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:"index.html",
            minify:{
                removeAttributeQuotes:true, //去掉html的引号
                collapseWhitespace:true, //将HTML打包成一行
            },
            hash:true //会在打包后的bundle.js和添加hash值 例如bundle.js?30c2c0f02493fdc2a499

        })
    ]
}
```

## 输出文件output可以添加hash值
1.如果文件没有做任何修改 只会生成一个hash值 一旦有修改 打包后会重新生成hash
```
output:{
        filename:'bundle.[hash].js', //打包后的文件名 带hash --->打包出来的文件名例如 bundle.5c284871e052be54834e.js
        path:path.resolve(__dirname,'build') //路径必须是一个绝对路径
    }
```
2. 可以配置hash的位数
```
output:{
        filename:'bundle.[hash:6].js', //打包后的文件名 带6位hash ---> 打包出来的文件名例如  bundle.5c2848.js
        path:path.resolve(__dirname,'build') //路径必须是一个绝对路径
    },
```

-----------------------2019.4.19 以上------------------

