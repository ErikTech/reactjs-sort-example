const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
	entry: ['./src/js/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.bundle.js',
		sourceMapFilename: 'index.bundle.map',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							'@babel/preset-env', '@babel/react'
						],
						plugins: [
							require('@babel/plugin-proposal-object-rest-spread'), 
							require('@babel/plugin-transform-runtime'), 
							require('@babel/plugin-transform-react-jsx-source'), 
							require('@babel/plugin-proposal-class-properties')]
					}
				}
			}, {
				test: /\.s?[ac]ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
			}
		]
	},
	devServer: {
		port: 3333,
		historyApiFallback: true
	},
	mode: 'development',
	devtool: 'source-map',
	plugins: [
		new MiniCssExtractPlugin({filename: 'index.bundle.css'}),
		new UglifyJSPlugin({sourceMap: true}),
		new HtmlWebpackPlugin({template: 'src/index.html'}),
		new CopyWebpackPlugin([
			{
				from: 'src/img/',
				to: 'img/'
			}
		])
	]
};

module.exports = config;
