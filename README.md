# webpack4-learning
- [webpack 安装](#webpack安装)
- [webpack可以进行0配置](#webpack可以进行0配置)
- [webpack打包出来的内容的分析](#webpack打包出来的内容的分析)
- [手动配置webpack](#手动配置webpack)
- [打包方式的三种配置方式](#打包方式的三种配置方式)

- [webpack-dev-server](#webpack-dev-server)
    - [在本地启动一个静态服务并自动打开页面](#在本地启动一个静态服务并自动打开页面)
    - [解决跨域问题](#解决跨域问题)
    - [接口转发功能 比如前端请求/api/user-->请求后端真实接口/user](#接口转发功能)
    - [本地mock数据](#本地mock数据)
    - [服务端使用webpack](#服务端使用webpack)
    - [热更新 浏览器不会刷新 增量更新](#热更新)
- [output输出文件可以添加hash值](#output输出文件可以添加hash值)

- [插件](#插件)
    - [html-webpack-plugin 自动生成html文件并引入js文件](#html-webpack-plugin)
        - [多entry入口js](#多entry入口js)
    - [mini-css-extract-plugin 抽离css到单独css文件](#plugin--mini-css-extract-plugin抽离css)
    - [optimize-css-assets-webpack-plugin 压缩css](#optimize-css-assets-webpack-plugin压缩css)
    - [terser-webpack-plugin 压缩js](#terser-webpack-plugin压缩js)
    - [clean-webpack-plugin 打包的时候每次清一下打包目录](#clean-webpack-plugin)
    - [copy-webpack-plugin 复制文件夹到打包文件里](#copy-webpack-plugin)
    - [webpack.BannerPlugin 在打包出来的js前面添加一段话](#webpack.BannerPlugin)
    - [webpack.DefinePlugin 往源代码里面注入变量](#webpack.DefinePlugin)
    - [webpack-merge 区分打包环境](#区分打包环境)
- [loader](#module--放loader)
    - [处理样式的loader](#module--放loader)
        - [style-loader 将样式添加到head标签](#style-loader将样式添加到head标签)
        - [css-loader 支持@import写法](#css-loader支持import写法)
        - [less less-loader 解析less语法](#less-loader解析less语法)
        - [postcss-loader + autoprefixer 加css前缀兼容不同浏览器](#postcss-loader)

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
- [devtool 可以看线上代码问题](#devtool)
- [watch 实时打包编译](#watch)
- [resolve属性](#resolve属性)
  - [resolve.modules 寻找模块的路径](#resolve.modules)
  - [resolve.alias 重命名包名](#resolve.alias)
  - [resolve.mainFields 寻找package.json字段](#resolve.mainFields)
  - [resolve.extensions 寻找文件类型](#resolve.extensions)

- [webpack的优化](#优化webpack)
    - [module.noParse 不解析依赖库](#module.noParse)
    - [module.rules.exclude / module.rules.include 排除路径/指定路径](#module.rules.exclude)
    - [webpack.ignorePlugin 忽略打包 手动引入小包](#webpack.ignorePlugin)
    - [webpack.dllPlugin && webpack.DllReferencePlugin 本地缓存](#webpack.dllPlugin)
    - [webpack的production模式自带tree-shaking](#webpack的production模式自带tree-shaking)
    - [optimization.splitChunks.cacheGroups提取公共代码](#optimization.splitChunks.cacheGroups提取公共代码)
        - [抽离公共引入的包或者代码](#抽离公共代码)
        - [抽离第三方包](#抽离第三方包)

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
## webpack-dev-server
### 在本地启动一个静态服务并自动打开页面
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

### 解决跨域问题
```js
// server.js
const app = require('express')();

// 接口1 localhost:3333/api/user
app.get('/api/user',(req,res)=>{
    res.json({
        txt: 'hello webpack-dev-server proxy localhost:3333/api/user'
    })
});

app.listen(3333,()=>{
    console.log('server listening on 3333')
})
```
`webpack-dev-server` 端口 `3332` , http://localhost:3332/api/user 访问 http://localhost:3333/api/user 端口跨域
```js
devServer: {
        port: 3332,
		progress: true,
		contentBase: "./dist",
		compress: true,
        open: true,
        proxy: {
            '/api': 'http://localhost:3333/' // 通过代理 监听到/api都转发到http://localhost:3333/
        }
},
```
### 接口转发功能
```js
ajax.get('/proxy/interface/user',(res)=>{

});
```
```js
// http://localhost:3332/proxy/interface/user --> http://localhost:3333/user
devServer: {
		port: 3332, //修改端口
		progress: true,
		contentBase: "./dist", //将当前目录作为静态服务的目录，否则会去内存里
		compress: true, //开启压缩
		open: true,
		proxy: {
			'/proxy': {
			    target: 'http://localhost:3333/',
			    pathRewrite: {
			        '/proxy/interface': '' // /proxy/interface/user 删掉前面的/proxy/interface 直接访问 /user
			    }
			},
		},
	},
```
### 本地mock数据
```js
ajax.get('/mock/user',(res)=>{

});
```
```js
// 通过before来调用devServer内置的express服务
devServer: {
    port: 3332, //修改端口
    progress: true,
    contentBase: "./dist", //将当前目录作为静态服务的目录，否则会去内存里
    compress: true, //开启压缩
    open: true,
    proxy: {
        // '/api': 'http://localhost:3333/',
        // '/proxy': {
        //     target: 'http://localhost:3333/',
        //     pathRewrite: {
        //         '/proxy/interface': ''
        //     }
        // },
    },
    before: (app) => {
        app.get("/mock/user", (req, res) => {
            res.json({
                txt: "hello webpack-dev-server proxy before-hooks to mock data",
            });
        });
    },
},
```
### 服务端使用webpack
```js
// webpack-dev-middleware
const config = require('./webpack.config.js');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler));
```

## 插件
### clean-webpack-plugin
```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
{
    plugins: [
        new CleanWebpackPlugin()
    ]
}
```
### webpack.BannerPlugin
```js
const webpack = require('webpack');

{
    plugins: [
        new webpack.BannerPlugin('make by 2020.8.31')
    ]
}

// 在打包完的代码里会加上
/*! make by 2020.8.31 */
```
### webpack.DefinePlugin
```js
// 可以往源代码里面注入变量 比如环境变量
const webpack = require('webpack');

{
    plugins: [
        new webpack.DefinePlugin({
            DEV: JSON.stringify('prodution'), // prodution
            FLAG: true, // true
            ADD: '1+1', // 2
            SHOWADD: JSON.stringify('1+1') // 1+1
        })
    ]
}
```

### copy-webpack-plugin
```js

```

### html-webpack-plugin
#### 自动生成html文件并引入打包的bundle.js文件
`yarn add html-webpack-plguin -D`

```js
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
#### 多entry入口js
##### 相同的html可以产出对应的js并引入 -- chunks属性
```js
module.exports = {
    mode: 'development',
    entry: {
        page1: './src/page1.js',
        page2: './src/page2.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'page1.html',
            chunks: ['page1']
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'page2.html',
            chunks: ['page2']
        }),
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
#### css-loader支持import写法
#### less-loader解析less语法
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
// 两个作用
// 1. 可以将css单独抽离成一个文件
// 2. 可以让html自动引入该css

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

#### postcss-loader
##### autoprefixer 给css加-webkit-之类的前缀兼容不同浏览器
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

## devtool
```txt
devtool: 'source-map'              源码映射 会单独生成一个sourcemap文件 代码出错 会显示报错的行和列 大而全
devtool: 'eval-source-map'         不会产生单独的sourcemap文件，但是可以显示行和列
devtool: 'cheap-module-source-map' 不会产生列，打包的时候会单独产生一个map文件 可以单独保存起来
devtool: 'cheap-module-eval-source-map' 只能看到报错是第几行 不会单独产生一个map文件 集成在打包后的文件里
```

## watch
```js
{
    watch:true,
    watchOptions: {
        poll: 1000,// 每毫秒问1000次是否需要更新
        aggregateTimeout: 500 // 防抖 写完代码文件后 500ms才开始打包
        ignored: /node_modules/ // 不需要监控
    }
}

```

## resolve属性
### resolve.modules
```js
// 告诉 webpack解析模块时应该搜索的目录
resolve: {
  modules: [path.resolve(__dirname, "src"), "node_modules"], // 先从src中找模块 否则从node_modules中找
}
```
### resolve.alias
```js
resolve: {
  modules: [path.resolve(__dirname, "src"), "node_modules"],
  alias: {
  	bootstrap: 'bootstrap/dist/css/bootstrap.css' // 重命名
  }
}

// 使用的时候 import 'bootstrap'; --> 实际引用 import 'bootstrap/dist/css/bootstrap.css'
```
### resolve.mainFields
```js
// 此选项将决定在 package.json 中使用哪个字段导入模块
resolve: {
  modules: [path.resolve(__dirname, "src"), "node_modules"],
  mainFields: ['style', 'main'] // 先找package.json中的style 再找main字段
}

// 例如bootstrap的package.json中的字段 读取的目录
"style": "dist/css/bootstrap.css",
"sass": "scss/bootstrap.scss",
"main": "dist/js/bootstrap.js",
```
### resolve.extensions
```js
// 解析文件的顺序
resolve: {
  modules: [path.resolve(__dirname, "src"), "node_modules"], // 先从src中找模块 否则从node_modules中找
  extensions: ['.js', '.css', '.json']
}

// 这里 extensions 其实是 extensions.css 会先找extensions.js 没有就extensions.css
import 'extensions';
```


## 区分打包环境
- webpack-merge     插件
- webpack.common.js 公共打包配置
- webpack.dev.js    本地打包配置
- webpack.prod.js   上线打包配置

## 优化webpack
### module.noParse 
- 不解析某个库里的依赖库 如不去解析jquery里的依赖库
```js
{
    module: {
    noParse: /jquery/,
    rules: [
        {
            test:/\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                }
            }
        }
    ]
    }
}
```
```js
// 不加noParse 打包时间 1987ms

Hash: 6ddd4cd616b38eba22eb
Version: webpack 4.44.1
Time: 1987ms
Built at: 2020-09-03 20:06:14
    Asset     Size  Chunks             Chunk Names
bundle.js  326 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 552 bytes {main} [built]
[./src/index.js] 49 bytes {main} [built]
    + 1 hidden module
```
```js
// 加noParse 打包时间 Time: 1553ms  1987ms --> 1553ms 

Hash: 3aedbfbbbf88f20207b9
Version: webpack 4.44.1
Time: 1553ms
Built at: 2020-09-03 20:07:03
    Asset     Size  Chunks             Chunk Names
bundle.js  325 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./src/index.js] 49 bytes {main} [built]
    + 1 hidden module
```

### module.rules.exclude 
### module.rules.include
```js
module: {
    rules: [
        {
            test:/\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                }
            },
            include: path.join(__dirname,'src'), // 处理src里的文件
            exclude: /node_modules/ // 排除node_modules
        }
    ]
}
```
```js
// 不加 exclude + include Time: 1737ms
Hash: 6ddd4cd616b38eba22eb
Version: webpack 4.44.1
Time: 1737ms
Built at: 2020-09-03 20:09:40
    Asset     Size  Chunks             Chunk Names
bundle.js  326 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 552 bytes {main} [built]
[./src/index.js] 49 bytes {main} [built]
    + 1 hidden module
```
```js
// exclude + include Time: 622ms  1737ms --> 622ms
Hash: f1092cade292dc491507
Version: webpack 4.44.1
Time: 622ms
Built at: 2020-09-03 20:08:18
    Asset     Size  Chunks             Chunk Names
bundle.js  322 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./src/index.js] 49 bytes {main} [built]
    + 1 hidden module
```

### webpack.ignorePlugin 
- ignore大包 + 手动引入小包 如引入moment时，不解析语言包 手动引入moment/locale/zh-cn
```js
import moment from 'moment';
moment.locale('zh-CN'); // moment里的语言包 分为很多种 我们只需要中文包

console.log(moment().startOf('day').fromNow());
```
```js
// 将语言包全部打包 需要 Time: 3072ms

    Hash: 5b8876f0f09bc3c6aafa
    Version: webpack 4.44.1
    Time: 3072ms
    Built at: 2020-09-03 20:16:06
        Asset       Size  Chunks             Chunk Names
    bundle.js    764 KiB    main  [emitted]  main
    index.html  238 bytes          [emitted]  
```

```js
const webpack = require('webpack');

plugins: [
    new webpack.IgnorePlugin(/\.\/locale/,/moment/), // 去掉moment所有的语言包
]

// index.js
import moment from 'moment';
import 'moment/locale/zh-cn'; //手动引入中文小包

moment.locale('zh-CN');
console.log(moment().startOf('day').fromNow());
```
```js
    // 去大包 手动引入小包 Time: 1572ms   Time: 3072ms --> 1572ms
    Hash: 0c09bed3746bcf22f7cb
    Version: webpack 4.44.1
    Time: 1572ms
    Built at: 2020-09-03 20:21:42
        Asset       Size  Chunks             Chunk Names
    bundle.js    159 KiB    main  [emitted]  main
    index.html  238 bytes          [emitted]  
    Entrypoint main = bundle.js
```


### webpack.dllPlugin
```js
// 先把 react react-dom缓存到本地 再打包别的
import React from 'react';
import { render } from 'react-dom';

render(
    <div>JSX</div>,
    document.getElementById('app')
); 
```
```js
// 1.webpack.config.react.js

const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        react: ['react','react-dom'] // 目标库
    },
    output: {
        filename: '_dll_[name].js', // 生成的名字
        path: path.resolve(__dirname, 'build'),
        library: '_dll_[name]', // _dll_react 
        // libraryTarget: 'var'
    },
    plugins: [
        // 利用webpack.DllPlugin
        new webpack.DllPlugin({
            name: '_dll_[name]', // name == library
            path: path.resolve(__dirname, 'build', 'manifest.json')
        })
    ]
}

// 2. npx webpack --config webpack.config.react.js
// 打包react和react-dom到本地 生成 manifest.json + _dll_react
```
```js
// 3. 使用manifest.json + _dll_react
// index.html
<script src="/_dll_react.js"></script>
```
```js
// 4. 正常打包的时候先去manifest.json找  webpack.config.js
new webpack.DllReferencePlugin({
    manifest: path.resolve(__dirname, 'build','manifest.json')
})
```

### happyPack
```js
// yarn add happypack
const Happypack = require('happypack');

{
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'Happypack/loader?id=js' // 这里让Happypack接管 并给个id标示
            },
            {
                test: /\.css$/,
                use:  'Happypack/loader?id=css'
            }
        ]
    },
    plugins: [
        new Happypack({
            id: 'js', // 使用上面的id
            use: [{  // 原来写在module.rules.use 换到插件内部
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
            }]
        }),
        new Happypack({
            id: 'css',
            use: ['style-loader','css-loader'] // 貌似css被打包到了js中
        })
    ]
}
```
```js
Hash: b1591d1f28e2d994a711
Version: webpack 4.44.1
Time: 734ms
Built at: 2020-09-04 15:09:00
    Asset      Size  Chunks             Chunk Names
bundle.js  3.98 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./src/index.js] 21 bytes {main} [built]

// 加了happypack对于简单的打包貌似没有起到作用   Time: 734ms --> Time: 744ms
// 对于复杂的项目应该会有效果
Happy[js]: Version: 5.0.1. Threads: 3
Happy[js]: All set; signaling webpack to proceed.
Hash: b1591d1f28e2d994a711
Version: webpack 4.44.1
Time: 744ms
Built at: 2020-09-04 15:09:20
    Asset      Size  Chunks             Chunk Names
bundle.js  3.98 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./src/index.js] 21 bytes {main} [built]
```

### webpack的production模式自带tree-shaking
#### tree-shaking / scope hosting作用域提升
- production模式 自带tree-shaking 会将没用的代码删掉，不打包进bundle.js
- scope hosting 会优化代码，将没用啰嗦的变量合并结果

### optimization.splitChunks.cacheGroups提取公共代码
#### 抽离公共代码
```js
// page1  --> a.js + b.js
// page2  --> a.js + b.js
const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        page1: './src/page1.js',
        page2: './src/page2.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname,'build')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2 // 引入次数超过两次的都打成common包 这里a.js和b.js都被引用了两次
                }
            }
        }
    }
}
```
```js
// 打包出的结果
common~page1~page2.js  134 bytes       0  [emitted]  common~page1~page2 // a.js和b.js被打包在了一起
             page1.js   1.52 KiB       1  [emitted]  page1
             page2.js   1.52 KiB       2  [emitted]  page2
```
#### 抽离第三方包
```js
optimization: {
    splitChunks: {
        cacheGroups: {
            common: { // 抽离代码理的公共代码
                chunks: 'initial',
                minSize: 0,
                minChunks: 2 // 引入次数超过两次的都打成common包 这里a.js和b.js都被引用了两次
            },
            vendor: { // 抽离第三方的包
                priority:1, // 提高打包的权重，否则都会进common的包 所以先抽离vendor第三包 再去抽离common
                test: /node_modules/,
                chunks: 'initial',
                minSize: 0,
                minChunks: 2
            }
        }
    }
}
```
```js
common~page1~page2.js  135 bytes       0  [emitted]  common~page1~page2 //  将a.js和b.js引入超过两次的文件打包到一起
             page1.js   1.56 KiB       2  [emitted]  page1
             page2.js   1.56 KiB       3  [emitted]  page2
vendor~page1~page2.js   87.9 KiB       1  [emitted]  vendor~page1~page2 // 将第三方包jquery抽离成一个文件
```

### import懒加载
```js
const button = document.createElement('button');
button.innerHTML = '点我加载 lazyLoad.js';
button.addEventListener('click', () => {
    // 直接使用import语法加载文件
    import('./lazyload.js').then(data => { 
        alert(data.default);
    })
});
document.body.appendChild(button);

// npm run dev 查看
```
### 热更新

- webpack.NamedModulesPlugin // 打印更新的模块路径
- webpack.HotModuleReplacementPlugin // 热更新插件

```js
// 查看003-webpack-dev-server

devServer: {
	hot: true, // 启用热更新
},
plugins: [
    new webpack.NamedModulesPlugin(), // 打印更新的模块路径
	new webpack.HotModuleReplacementPlugin(), // 热更新插件
]

// index.js
if (module.hot) { 
    module.hot.accept('./hotModules', () => { 
        console.log('监控hotModules文件的变化')
        let str = require('./hotModules'); // 重新加载这个文件
        console.log('更新完之后是增量更新，不刷新浏览器了' + str)
    })
}
// npm run dev
```
```
[HMR] Waiting for update signal from WDS...
index.js:27 更新我之后看看HotModuleReplacementPlugin和NamedModulesPlugin有没有生效~~~
index.js:24 hello webpack-dev-server proxy before-hooks to mock data
client:48 [WDS] Hot Module Replacement enabled.
client:52 [WDS] Live Reloading enabled.

// 浏览器不会刷新 增量更新
监控hotModules文件的变化
index.js:34 更新完之后是增量更新，不刷新浏览器了{"str":"1111更新我之后看看HotModuleReplacementPlugin和NamedModulesPlugin有没有生效~~~"}
log.js:24 [HMR] Updated modules:
log.js:24 [HMR]  - ./src/hotModules.js
log.js:24 [HMR] App is up to date.
```