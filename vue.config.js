const path = require('path');
module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias.set('@', path.resolve(__dirname, './src'))
    },
    devServer: {
        proxy: 'https://api.weixin.qq.com'
    }
}