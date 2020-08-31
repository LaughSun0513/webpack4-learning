# webpack4-learning
- [webpack 安装](#webpack安装)
- [webpack可以进行0配置](#webpack可以进行0配置)
- [webpack打包出来的内容的分析](#webpack打包出来的内容的分析)
- [手动配置webpack](#手动配置webpack)
- [打包方式的三种配置方式](#打包方式的三种配置方式)
- [webpack-dev-server在本地启动一个静态服务](#webpack-dev-server在本地启动一个静态服务)
- [output输出文件可以添加hash值](#output输出文件可以添加hash值)

- [插件](#插件)
    - [html-webpack-plugin 自动生成html文件并引入js文件](#html-webpack-plugin)
    - [mini-css-extract-plugin 抽离css到单独css文件](#plugin--mini-css-extract-plugin抽离css)
    - [optimize-css-assets-webpack-plugin 压缩css](#optimize-css-assets-webpack-plugin压缩css)
    - [terser-webpack-plugin 压缩js](#terser-webpack-plugin压缩js)

- [loader](#module--放loader)
    - [处理样式的loader](#module--放loader)
        - [style-loader 将样式添加到head标签](#style-loader将样式添加到head标签)
        - [css-loader 支持@import写法](#css-loader支持@import写法)
        - [less less-loader 解析less语法](#less&&less-loader解析less语法)
        - [postcss-loader + autoprefixer 加css前缀兼容不同浏览器](#postcss-loader&&autoprefixer)

    - [图片相关](#图片相关)
        - [js引入图片](#在JS中使用图片)
            - [file-loader](#file-loader)
        - [html引入图片](#在html中img引入图片)
            - [html-withimg-loader](#html-withimg-loader)
        - [css引入图片](#在css中background引入图片)
            - [url-loader](#url-loader)
           
    - [babel相关](#babel相关)
        - [支持ES6转ES5](#ES6转ES5)
        - [支持装饰器语法 ES7](#支持ES7)
        - [支持generate语法](#支持generate语法)

    - [eslint 检查代码格式](#eslint检查代码格式)

- [全局变量引入问题 往window上挂变量的三种方式](#全局变量引入问题--往window上挂变量)

 

## webpack安装
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

## 打包方式的三种配置方式
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
## webpack-dev-server在本地启动一个静态服务

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
    compress:true, //开启压缩
    open:true //自动打开页面
}
```
运行`npm run dev`

## 插件

### html-webpack-plugin
#### 自动生成html文件并引入打包的bundle.js文件
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

## output输出文件可以添加hash值
### 1.如果文件没有做任何修改 只会生成一个hash值 一旦有修改 打包后会重新生成hash
```
output:{
        filename:'bundle.[hash].js', //打包后的文件名 带hash --->打包出来的文件名例如 bundle.5c284871e052be54834e.js
        path:path.resolve(__dirname,'build') //路径必须是一个绝对路径
    }
```
### 2.可以配置hash的位数
```
output:{
        filename:'bundle.[hash:6].js', //打包后的文件名 带6位hash ---> 打包出来的文件名例如  bundle.5c2848.js
        path:path.resolve(__dirname,'build') //路径必须是一个绝对路径
    },
```

-----------------------2019.4.19 以上------------------
## module--放loader

### 处理样式
#### style-loader将样式添加到head标签
#### css-loader支持@import写法
#### less&&less-loader解析less语法
```
  "devDependencies": {
    "css-loader": "^2.1.1",
    "html-webpack-plugin": "^3.2.0",
    "less": "^3.9.0",
    "less-loader": "^5.0.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.30.0",
    "webpack-cli": "^3.3.0",
    "webpack-dev-server": "^3.3.1"
  }
```
```
module:{
    rules:[
        {
            test:/\.css$/,
            //-----字符串:针对单个loader------
            //use:'style-loader'  
            //-----数组: 多个loader ------
            //use:['style-loader','css-loader']
            //-----数组: 多个loader 对象 可添加 options配置------
            use:[        
                {
                    loader:'style-loader',
                    options:{
                        /*
                          正常情况下 样式文件会加载在js里 并动态添加到最后的style标签内,如果html内部有style 标签，style标签内的相同属性就会被js样式覆盖，所以要调整优先级，让style 标签内样式优先
                        */
                        insertAt:'top'  
                    }
                },
                'css-loader'
            ]
        },
        {
            test:/\.less$/,
            use:['style-loader','css-loader','less-loader']
        }
    ]
}
```
#### plugin--mini-css-extract-plugin抽离css
`yarn add mini-css-extract-plugin -D`

```
let MiniCssExtractPlugin = require('mini-css-extract-plugin')

plugins: [
    new MiniCssExtractPlugin({
        filename: 'css/main.css'  ->抽离的css文件名 也就是将src里的css打包的时候单独合并成一个css，然后到css目录下(可以指定目录)如果要抽离less 再写一个MiniCssExtractPlugin 更换filename文件名即可
    })
]

{
    test: /\.css$/,   // css 处理
    // use: 'css-loader'
    // use: ['style-loader', 'css-loader'],
    use: [
        // {
        //     loader: 'style-loader',
        //     options: {
        //         insertAt: 'top' // 将css标签插入最顶头  这样可以自定义style不被覆盖
        //     }
        // },
        MiniCssExtractPlugin.loader,   // 抽离
        'css-loader', // css-loader 用来解析@import这种语法,
    ]
}
```

#### postcss-loader&&autoprefixer
##### 给css加-webkit-之类的前缀兼容不同浏览器
`yarn add postcss-loader autoprefixer -D`
```js
{
    loader: "postcss-loader",
    options: {
        ident: "postcss",
        plugins: [
            require("autoprefixer")(),
        ],
    },
},
```
```json
// package.json
"browserslist": [
    "defaults",
    "not ie < 8",
    "last 2 versions",
    "> 1%",
    "iOS >= 8",
    "Firefox >= 20",
    "Android > 4.4",
    "last 3 iOS versions"
]
```
```css
/* main.css */
body {
    background:red;
    -webkit-transform: rotate(45deg) translate(150px,93px);
            transform: rotate(45deg) translate(150px,93px);
}
```

## optimization -- 压缩 css 和 压缩 js
### optimize-css-assets-webpack-plugin压缩css
### uglifyjs-webpack-plugin压缩js,但是没法处理ES6,不好使
### terser-webpack-plugin压缩js
`yarn add optimize-css-assets-webpack-plugin terser-webpack-plugin`
```js
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJsPlugin = require("terser-webpack-plugin");

optimization:{
    minimizer:[
        new OptimizeCssAssetsPlugin(),
        // new UglifyJsPlugin(), ERROR in bundle.js from UglifyJs Unexpected token: keyword «const»
        new TerserJsPlugin() // 替换成uglifyjs可以支持ES6语法
    ]
},
```

## babel相关
### ES6转ES5
- yarn add @babel/core @babel/preset-env babel-loader -D

```
{
    test:/\.js$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        }
    }
}
```

### 支持ES7
#### 装饰器语法 ES7的class私有属性语法
- yarn add @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D

```
{
    test:/\.js$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env'],
            plugins: [
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose" : true }],
            ]
        }
    }
}
```

### 支持generate语法
- yarn add @babel/plugin-transform-runtime @babel/runtime -D
```
{
    test:/\.js$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env'],
            plugins: [
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                ["@babel/plugin-transform-runtime"]
            ]
        }
    },
    include: path.join(__dirname,'src'), // 处理src里的文件
    exclude: /node_modules/ // 排除node_modules
}
```

### eslint检查代码格式
- yarn add eslint eslint-loader -D
- .eslintrc.json 配置语法规则
```
{
    test:/\.js$/,
    use: {
        loader: 'eslint-loader',
        options: {
            enforce: 'pre' // 因为loader自下而上执行 如果想让该模块写在上面并先执行 可以使用该属性 后执行'post'
        }
    },
    exclude: /node_modules/
},
```

### 全局变量引入问题--往window上挂变量
- yarn add expose-loader -D
#### 代码里内联loader 不推荐 没成功
```
require("expose-loader?$!jquery");
console.log(window.$);
```
#### 方式1: webpack配置loader 然后直接window上取 但是要引入 成功
```
{
    test: require.resolve('jquery'),
    loader: 'expose-loader',
    options: {
        exposes: ['$', 'jQuery'],
    },
},

// 使用
import $ from "jquery";
console.log(window.$);
```
#### 方式2: plugin方式 -- webpack.ProvidePlugin 不需要在每个文件都要import一遍 直接用
```
const webpack = require('webpack');

new webpack.ProvidePlugin({
			$: 'jquery'
})

// 使用 不需要在每个文件都要import一遍 直接用$
console.log($);
```

#### 方式3: script标签 引入之后 不打包 -- externals
```
<script src='http://cdn/jquery.js'>
import $ from 'jquery'; // 这行代码会导致jquery被打包进代码，打包的时候需要排除掉

externals: {
    jquery: 'jQuery'
}
```

## 图片相关
### 在JS中使用图片
#### file-loader
```js
import logo from './1.png'; // 会从内存中生成一个hash图片 引入之后 反射到新的地址

const newImage = new Image();
newImage.src = logo;
document.body.appendChild(newImage);
```
```js
 {
    test: /\.(png|jpg|gif|svg)$/,
    use: {
        loader:'file-loader',
        options:{
            esModule:false // 在使用过程中会报错，是因为file-loader版本过高，需要设置
        }
    }
}
```
### 在html中img引入图片
#### html-withimg-loader
// 在使用过程中会报错，是因为file-loader版本过高，需要设置esModule:false
```
{
    test: /\.html$/,
    use: 'html-withimg-loader'
},
```
### 在css中background引入图片
#### url-loader
- url-loader包含了file-loader的功能
```css
    background: url('./1.png');
```
```js
{
    test: /\.(png|jpg|gif|svg)$/,
    use: {
        loader:'url-loader',
        options: {
            limit: 1,
            esModule: false
        }
    }
},
```

##### 打包出的图片指定目录 比如所有图都到 `img/` 下面
```js
{
    test: /\.(png|jpg|gif|svg)$/,
    use: {
        loader:'url-loader',
        options: {
            outputPath: '/img/' --> 如果是要加CDN域名,最好前面需要加上`/` 比如 'www.baidu.com/img/'
        }
    }
},
```
##### 打包出的图片指定目录 添加CDN域名
- 方式一： 全局添加output.publicPath 会导致css等也加上
- 方式二： 只针对图片添加publicPath
```js
output: {
  publicPath: 'http://www.baidu.com'
},
```
```js
{
  test: /\.(png|jpg|gif|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 1,
      esModule: false,
      outputPath: '/img/',
      publicPath: 'http://www.baidu.com'
    }
  }
},
```
