const path = require("path");
const webpack = require('webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 打包的时候 单独打出css文件
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // 压缩css
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 压缩js 不支持ES6
const TerserJsPlugin = require("terser-webpack-plugin"); // 压缩js 支持ES6


module.exports = {
	mode: "production", //默认两种模式 production development
	entry: path.resolve(__dirname, "src/index.js"), //入口
	output: {
		filename: "bundle.js", //打包后的文件名 带6位hash
		path: path.resolve(__dirname, "build"), //路径必须是一个绝对路径
	},
	devServer: {
		port: 3000, //修改端口
		progress: true, //
		contentBase: "./build", //将当前目录作为静态服务的目录，否则会去内存里
		compress: true, //开启压缩
		open: true,
	},
	optimization:{
		minimizer:[
			new OptimizeCssAssetsPlugin(),
			// new UglifyJsPlugin(), ERROR in bundle.js from UglifyJs Unexpected token: keyword «const»
			new TerserJsPlugin()
		]
	},
	plugins: [
		//数组，放着所有的webpack插件
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
			minify: {
				removeAttributeQuotes: true, //去掉html的引号
				collapseWhitespace:true, //将HTML打包成一行
			},
			hash: true, //会在打包后的bundle.js和添加hash值 例如bundle.js?30c2c0f02493fdc2a499
		}),
		new MiniCssExtractPlugin({
			filename: "main.css",
		}),
		new webpack.ProvidePlugin({
			$: 'jquery'
		})
	]
};
