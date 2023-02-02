module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 配置文件发生变化需要重启
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
