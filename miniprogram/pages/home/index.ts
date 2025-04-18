import { login } from '../../utils/util';
Page({
  data: {
    videoUrl: "",       // 后端返回的视频地址
    videoCover: "",     // 视频封面图
    isPlaying: false,   // 是否正在播放
  },
  onLoad() {
    // 模拟从后端获取视频数据
    this.fetchVideoData();
    // 1. 获取全局场景参数
    const sceneParams = getApp().globalData.sceneParams

    // 2. 自动触发登录流程
    if (sceneParams) {
      this.handleAutoLogin(sceneParams)
    }
  },
  async handleAutoLogin() {
    try {
      // 3. 执行微信登录认证
      wx.showLoading({ title: '登录中' })
      const loginRes = await login()
      wx.hideLoading()

      // 4. 调用后端接口
      const res = await wx.request({
        url: 'https://yuanhhealth.com/api/login',
        method: 'POST',
        data: {
          code: loginRes.code,
          userInfo: loginRes.userInfo,
          sceneParams: sceneParams
        }
      })

      // 5. 存储登录凭证
      if (res.data.code === 200) {
        wx.setStorageSync('token', res.data.token)
        wx.setStorageSync('userInfo', loginRes.userInfo)
      }
    } catch (error) {
      console.error('自动登录失败:', error)
      this.showLoginModal()
    }
  },
  showLoginModal() {
    wx.showModal({
      title: '登录提示',
      content: '需要登录才能使用完整功能',
      success: (res) => {
        if (res.confirm) {
          this.handleAutoLogin()
        } else {
          wx.hideLoading()
        }
      }
    })
  },
  // 从后端获取视频信息
  fetchVideoData() {
    wx.request({
      url: "https://your-api.com/getVideo", // 替换为你的API
      method: "GET",
      success: (res: any) => {
        // this.setData({
        //   videoUrl: res.data.videoUrl,
        //   videoCover: res.data.videoCover,
        // });
      },
      fail: () => {
        wx.showToast({ title: "视频加载失败", icon: "none" });
      },
    });
  },
  // 视频开始播放
  onVideoPlay(e: any) {
    this.setData({ isPlaying: true });
  },
  // 视频播放错误
  onVideoError(e: any) {
    console.error("视频播放错误:", e.detail.errMsg);
    wx.showToast({ title: "视频播放失败", icon: "none" });
  },
  handleMoreClick: function (e: any) {
    const type = e.currentTarget.dataset.type; // 获取卡片类型标识
    wx.navigateTo({
      url: `/pages/homeMore/index?type=${type}` // 传递类型参数
    });
  },
})
