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
	module: {
		rules: [
			{
				test: require.resolve('jquery'),
				loader: 'expose-loader',
				options: {
				  exposes: ['$', 'jQuery'],
				},
			},
			{
				test:/\.js$/,
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
				//use:['style-loader','css-loader']
				use: [
					// {
					//     loader:'style-loader',
					//     options:{
					//         insertAt:'top'
					//     }
					// },
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
				include: path.join(__dirname,'src'),
				exclude: /node_modules/
			}
		],
	},
};
