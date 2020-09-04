const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	devServer: {
		hot: true, // 启用热更新
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
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
		}),
		new webpack.NamedModulesPlugin(), // 打印更新的模块路径
		new webpack.HotModuleReplacementPlugin(), // 热更新插件
	],
};
