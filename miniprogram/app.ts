App({
  globalData: {
    sceneParams: '' // 全局存储场景参数
  },
  onLaunch(options) {
    // 解析二维码场景值
    if (options.query.scene) {
      this.globalData.sceneParams = options.query.scene;
      wx.setStorageSync('sceneParams', options.query.scene);
    }
  },
})