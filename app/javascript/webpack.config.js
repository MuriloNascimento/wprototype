const path = require("path")
const { VueLoaderPlugin } = require("vue-loader")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const webpack = require('webpack')

module.exports = {
	entry: {
		main: path.join(__dirname, '/src/main.js'),
	},
	output: {
		path: path.join(__dirname, '../../public/javascripts'),
		filename: 'main.js',
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				},
			},
			{
				test: /\.vue$/,
				loader: "vue-loader",
			},
			{
				test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
				loader: "file-loader",
				options: {
					name: "../fonts/[name][contenthash:8].[ext]",
				},
			},
			{
				test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
				loader: "file-loader",
				options: {
					name: "[name][contenthash:8].[ext]",
					outputPath: "assets/img",
					esModule: false,
				},
			},
			{
				test: /\.(scss|css)$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
			}
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "../stylesheets/[name].css"
		}),
		new webpack.DefinePlugin({
			__VUE_OPTIONS_API__: false,
			__VUE_PROD_DEVTOOLS__: false,
		}),
	],
	resolve: {
		alias: {
			vue$: "vue/dist/vue.esm-bundler.js"
		},
		extensions: ["*", ".js", ".vue", ".json"],
	},
	performance : {
		hints : false
	},
	optimization: {
		moduleIds: 'deterministic',
		chunkIds: 'named',
		concatenateModules: true,
		innerGraph: false,
		mangleExports: true,
		mangleWasmImports: true,
		mergeDuplicateChunks: true
	},
	devServer: {
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		watchFiles: ['./src/*'],
		allowedHosts: ['all'],
		historyApiFallback: true,
		port: 8080,
		hot: false,
		devMiddleware: {
			serverSideRender: true,
			writeToDisk: true
		}
	}
}
