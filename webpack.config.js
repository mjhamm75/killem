module.exports = {
	entry: './app/js/router.js',
	output: {
		filename: 'server/public/bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'jsx-loader' }
		]
	}
};