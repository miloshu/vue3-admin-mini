// autoprefixer 插件处理css前缀
export default {
  plugins: {
    // 兼容浏览器，添加前缀
    'autoprefixer':{
        overrideBrowserslist: [
          "Android 4.1",
          "iOS 7.1",
          "Chrome > 31",
          "ff > 31",
          "ie >= 8"
          //'last 10 versions', // 所有主流浏览器最近2个版本
      ],
      grid: true
    }
  }
}
