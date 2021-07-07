const path = require('path');

module.exports = {
	entry: './client/index.js',
	target: 'node',
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
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
