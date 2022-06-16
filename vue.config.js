const { defineConfig } = require('@vue/cli-service')
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  css: {
    extract: false, 
  },
  configureWebpack: {
    optimization: {
      splitChunks: false, 
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
  }
})
