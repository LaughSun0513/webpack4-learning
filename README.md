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
        compress:true, //开启压缩
        open:true //自动打开页面
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
## module -- 放loader

### 处理样式
#### style-loader ---> 将样式添加到head标签
#### css-loader ---> 支持 @import 写法
#### less less-loader ---> 解析less 语法
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
#### plugin -- mini-css-extract-plugin 抽离css
`yarn add mini-css-extract-plugin -D`

```
let MiniCssExtractPlugin = require('mini-css-extract-plugin')

plugins: [
    new MiniCssExtractPlugin({
        filename: 'main.css'  ->抽离的css文件名 也就是将src里的css打包的时候单独合并成一个css，如果要抽离less 再写一个MiniCssExtractPlugin 更换filename文件名即可
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

#### postcss-loader autoprefixer 给css加-webkit-之类的前缀 兼容不同浏览器
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
- optimize-css-assets-webpack-plugin 压缩css
- uglifyjs-webpack-plugin 压缩js 但是没法处理ES6，不好使
- terser-webpack-plugin  替换成这个plugin 可以支持ES6语法
`yarn add optimize-css-assets-webpack-plugin terser-webpack-plugin`
```js
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJsPlugin = require("terser-webpack-plugin");

optimization:{
    minimizer:[
        new OptimizeCssAssetsPlugin(),
        // new UglifyJsPlugin(), ERROR in bundle.js from UglifyJs Unexpected token: keyword «const»
        new TerserJsPlugin()
    ]
},
```

## babel相关
### ES6 --> ES65
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

### 支持装饰器语法 + ES7 class
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

## eslint 检查代码格式
- yarn add eslint eslint-loader -D
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