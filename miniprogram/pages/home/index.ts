const app = getApp<IAppOption>()
Page({
  data: {
    videoUrl: "",       // 后端返回的视频地址
    videoCover: "",     // 视频封面图
    isPlaying: false,   // 是否正在播放
  },
  onLoad() {
    // 模拟从后端获取视频数据
    this.fetchVideoData();
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
  handleMoreClick: function(e: any) {
    const type = e.currentTarget.dataset.type; // 获取卡片类型标识
    wx.navigateTo({
      url: `/pages/homeMore/index?type=${type}` // 传递类型参数
    });
  },
})
