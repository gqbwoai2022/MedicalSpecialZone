import { silentLogin, fullLogin } from '../../utils/util';
Page({
  data: {
    needAuth: false, // 是否需要显示授权按钮
    authLoading: false, // 授权按钮加载状态
    videoData: {
      url: '',
      cover: '',
      loading: true
    },
    isPlaying: false,   // 是否正在播放
  },
  async onLoad() {
    await this.loginFlowController();
    this.fetchVideoData();
  },

  // 核心登录控制器
  async loginFlowController() {
    if (this.checkAuthValid()) return;

    try {
      await this.executeSilentLogin();
      if (this.checkAuthValid()) return;
    } catch (silentError) {
      console.log('静默登录失败:', silentError);
    }
    if (!this.data.needAuth) {
      this.setData({ needAuth: true });
    }
  },

  // 检查授权有效性（宽松校验）
  checkAuthValid(): boolean {
    return !!wx.getStorageSync('token') && !!wx.getStorageSync('userInfo');
  },

  // 静默登录流程
  async executeSilentLogin() {
    try {
      const code = await silentLogin();
      await this.callLoginAPI(code, getApp().globalData.sceneParams);

      // 关键判断：静默登录不包含用户信息
      if (!wx.getStorageSync('userInfo')) {
        this.setData({ needAuth: true });
        throw new Error('需要用户授权');
      }
    } catch (error) {
      throw new Error(`静默登录失败: ${error.message}`);
    }
  },

  // 统一调用登录接口
  callLoginAPI(code: string, sceneParams: any) {
    wx.request({
      url: 'https://yuanhhealth.com/api/user/login',
      method: 'POST',
      data: {
        code,
        scene: sceneParams
      },
      success: (res: any) => {
        try {
          if (res.data.code === 1) {
            wx.setStorageSync('token', res.data.data)
          }
        } catch (e) {
          console.error('接口调用失败:', e)
          if (e.status === 401) { // token失效
            wx.removeStorageSync('token');
            throw e;
          }
        }
      }
    })
  },

  // 处理手动授权
  async handleUserAuth() {
    if (this.data.authLoading) return;
    this.setData({ authLoading: true })
    wx.showLoading({ title: '登录中' });

    try {
      const { code, userInfo } = await fullLogin();
      wx.setStorageSync('userInfo', userInfo); // 存储用户信息
      await this.callLoginAPI(code, getApp().globalData.sceneParams)
      wx.showLoading({ title: '登录成功' });
      this.setData({ needAuth: false });
    } catch (error) {
      wx.showToast({
        title: error.message.includes('deny')
          ? '您拒绝了授权'
          : '授权失败，请重试',
        icon: 'none'
      })
    } finally {
      this.setData({ authLoading: false });
      wx.hideLoading();
    }
  },

  onVideoReady() {
    this.setData({ 'videoData.loading': false })
    wx.hideLoading()
  },
  onVideoLoading() {
    wx.showLoading({ title: '缓冲中...' })
  },

  onVideoPlay() {
    wx.reportAnalytics('video_play', {
      video_id: 'homepage_main_video'
    })
    // 取消其他媒体的播放（如有）
    wx.getBackgroundAudioManager().pause()
  },

  fetchVideoData() {
    this.setData({
      videoData: {
        url: 'https://cos.yuanhhealth.com/test.mp4',
        cover: 'https://cos.yuanhhealth.com/video_cocer.png',
        loading: false,
      }
    });
  },

  onVideoError(e: any) {
    console.error('播放错误:', e.detail.errMsg);
    wx.showToast({ title: '播放失败，请重试', icon: 'none' });
  },

  handleMoreClick: function (e: any) {
    const type = e.currentTarget.dataset.type; // 获取卡片类型标识
    wx.navigateTo({
      url: `/packageHome/pages/homeMore/index?type=${type}` // 传递类型参数
    });
  },
})
