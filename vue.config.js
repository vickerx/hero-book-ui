
const port = 4000;
module.exports = {
  devServer: {
    host: '0.0.0.0',
    port,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        logLevel: 'debug',
        target: 'http://localhost:10010/',
        changeOrigin: true,
        pathRewrite(path) {
          return path.replace('/api', '');
        },
      },
    },
  },
};
