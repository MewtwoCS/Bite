const path = require('path');

module.exports = {
	entry: './client/index.js',

	target: 'web',

	mode: 'development',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/',
	},

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		hot: true,
		port: 8080,
	},

	module: {
		rules: [
			{
				test: /\.jsx?/,
				exclude: /nodeModules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};
