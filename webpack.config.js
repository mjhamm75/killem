module.exports = {
	entry: './app/js/router.js',
	output: {
		filename: 'server/public/bundle.js'
	},
	module: {
		loaders: [
			{
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules)/,
                loader: "style!css!sass"
            },
            { 
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: 'url-loader?limit=10000&minetype=application/font-woff' 
            },
            { 
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: 'file-loader' 
            },
            { 
                test: /\.(png|jpg)$/, 
                loader: 'url-loader?limit=8192'
            }
		]
	}
};