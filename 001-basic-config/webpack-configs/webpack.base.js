const path = require("path");

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
	externals: {
		// jquery: '$'
	},
};