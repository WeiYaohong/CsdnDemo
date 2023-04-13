const { resolve } = require('path')

module.exports = {
  createOptimization: (config) => {
    config.devtool('none')
    config.performance.set('hints', false)
    config.optimization.splitChunks({
      automaticNameDelimiter: '-',
      chunks: 'all',
      cacheGroups: {
        chunk: {
          name: 'ums-chunk',
          test: /[\\/]node_modules[\\/]/,
          minSize: 131072,
          maxSize: 524288,
          chunks: 'async',
          minChunks: 2,
          priority: 10,
        },
        vue: {
          name: 'vue',
          test: /[\\/]node_modules[\\/](vue(.*)|core-js)[\\/]/,
          chunks: 'initial',
          priority: 20,
        },
        elementUI: {
          name: 'element-plus',
          test: /[\\/]node_modules[\\/]element-plus(.*)[\\/]/,
          priority: 30,
        },
        extra: {
          name: 'ums-plugins',
          test: resolve('src/plugins'),
          priority: 40,
        },
        // 根据使用模块抽取公共代码
        // echarts: {
        //   name: 'echarts',
        //   test: /[\\/]node_modules[\\/](echarts|zrender|tslib)[\\/]/,
        //   priority: 50,
        // },
      },
    })
  },
}
