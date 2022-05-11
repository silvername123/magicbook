module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
	? './'
	: '/',
	devServer: {
		public: '192.168.124.6:8080'
	},
	configureWebpack: {
		performance: {
			hints: 'warning',
			'maxEntrypointSize': 10000000,
			'maxAssetSize': 30000000
		}
	}
}
