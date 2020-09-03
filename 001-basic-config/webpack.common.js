const path = require("path");
const webpack = require('webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 打包的时候 单独打出css文件
const CopyPlugin = require('copy-webpack-plugin'); // 拷贝文件夹到打包文件下

module.exports = {
	entry: path.resolve(__dirname, "src/index.js"), //入口
	resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"], // 先从src中找模块 否则从node_modules中找
        // alias: {
        // 	bootstrap: 'bootstrap/dist/css/bootstrap.css'
        // }
        mainFields: ['style', 'main'],
        extensions: ['.js', '.css', '.json']
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
				collapseWhitespace:true, //将HTML打包成一行
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
    module: {
		rules: [
			{
				test: /\.html$/,
				use: 'html-withimg-loader'
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
    }
};