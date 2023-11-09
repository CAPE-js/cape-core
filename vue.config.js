const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  css: {
    extract: false
  },
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    output: {
      filename: 'cape.js',
      path: path.resolve(__dirname, 'dist')
    }
  },
  chainWebpack: config => {
    // set HTML to not minify
    config.plugin('html').tap(options => { options[0].minify = false; return options })
  }
})
