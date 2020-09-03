const path = require("path");
const webpack = require('webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 打包的时候 单独打出css文件
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // 压缩css
const TerserJsPlugin = require("terser-webpack-plugin"); // 压缩js 支持ES6
const CopyPlugin = require('copy-webpack-plugin'); // 拷贝文件夹到打包文件下

module.exports = {
	mode: "production", //默认两种模式 production development
	entry: path.resolve(__dirname, "src/index.js"), //入口
	output: {
		filename: "bundle.js", //打包后的文件名 带6位hash
		path: path.resolve(__dirname, "build"), //路径必须是一个绝对路径
		// publicPath: 'http://www.baidu.com'
	},
	devServer: {
		port: 3000, //修改端口
		progress: true,
		contentBase: "./build", //将当前目录作为静态服务的目录，否则会去内存里
		compress: true, //开启压缩
		open: true,
	},
	watch: false,
	watchOptions: {
		poll: 1000,
		aggregateTimeout: 100,
		ignored: /node_modules/
	},
	plugins: [
		//数组，放着所有的webpack插件
		new CleanWebpackPlugin(),
		new webpack.BannerPlugin('make by 2020.8.31'),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
			minify: {
				removeAttributeQuotes: true, //去掉html的引号
				//collapseWhitespace:true, //将HTML打包成一行
			},
			hash: true, //会在打包后的bundle.js和添加hash值 例如bundle.js?30c2c0f02493fdc2a499
		}),
		new MiniCssExtractPlugin({
			filename: "css/main.css",
		}),
		new webpack.ProvidePlugin({
			$: 'jquery'
		}),
		new CopyPlugin({
			patterns: [
				{ from: 'copyDir', to: './' },
			],
		}),
		new webpack.DefinePlugin({
            DEV: JSON.stringify('prodution'),
            FLAG: true,
            ADD: '1+1',
            SHOWADD: JSON.stringify('1+1')
        })
	],
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin(),
			new TerserJsPlugin()
		]
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: 'html-withimg-loader'
			},
			// {
			// 	test: /\.(png|jpg|gif|svg)$/,
			// 	use: {
			// 		loader:'file-loader',
			// 		options:{
			// 			esModule:false
			// 		}
			// 	}
			// },
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 1,
						esModule: false,
						// outputPath: '/img/',
						// publicPath: 'http://www.baidu.com'
					}
				}
			},
			{
				test: /\.js$/,
				use: {
					loader: 'eslint-loader',
					options: {
						enforce: 'pre'
					}
				},
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: "postcss-loader",
						options: {
							ident: "postcss",
							plugins: [
								require("autoprefixer")(),
							],
						},
					},
				],
			},
			{
				test: /\.less$/,
				use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							["@babel/plugin-proposal-decorators", { "legacy": true }],
							["@babel/plugin-proposal-class-properties", { "loose": true }],
							["@babel/plugin-transform-runtime"]
						]
					}
				},
				include: path.join(__dirname, 'src'),
				exclude: /node_modules/
			}

		],
	},
	resolve: {
		modules: [path.resolve(__dirname, "src"), "node_modules"], // 先从src中找模块 否则从node_modules中找
		// alias: {
		// 	bootstrap: 'bootstrap/dist/css/bootstrap.css'
		// }
		mainFields: ['style', 'main'],
		extensions: ['.js', '.css', '.json']
	}
};