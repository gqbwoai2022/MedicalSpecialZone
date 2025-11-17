import { silentLogin, fullLogin } from '../../utils/util';
const expertMap = [
  { id: 1, name: '王辰院士' },
  { id: 2, name: '宁光院士' },
  { id: 3, name: '陈香美院士' },
  { id: 4, name: '董家鸿院士' },
  { id: 5, name: '葛均波院士' },
  { id: 6, name: '顾瑛院士' },
  { id: 7, name: '韩德民院士' },
  { id: 8, name: '李兰娟院士' },
  { id: 9, name: '李兆申院士' },
  { id: 10, name: '郑树森院士' },
  { id: 11, name: '陈霖院士' },
  { id: 12, name: '王福生院士' },
  { id: 13, name: '俞梦孙院士' },
  { id: 14, name: '张志愿院士' },
  { id: 15, name: '赵继宗院士' },
  { id: 16, name: '王玉琢院士' },
  { id: 17, name: '王振义院士' },
  { id: 18, name: '陈赛娟院士' },
  { id: 19, name: '陆道培院士' },
  { id: 20, name: '王红阳院士' },
  { id: 21, name: '毛军发院士' },
  { id: 22, name: '张伯礼院士' },
  { id: 23, name: '尚红院士' },
  { id: 24, name: '田志刚院士' },
  { id: 25, name: '韩雅玲院士' },
  { id: 26, name: '郝希山院士' },
  { id: 27, name: '谢立信院士' },
  { id: 28, name: '姜保国院士' },
  { id: 29, name: '刘良院士' },
  { id: 30, name: '张英泽院士' },
];

const hospitalMap = [
  { id: 1, name: '解放军' },
  { id: 1, name: '301' },
  { id: 1, name: '三零一' },
  { id: 2, name: '交通大学' },
  { id: 2, name: '交大' },
  { id: 2, name: '瑞金' },
  { id: 3, name: '四川大学' },
  { id: 3, name: '川大' },
  { id: 3, name: '华西' },
  { id: 4, name: '博鳌超级' },
  { id: 5, name: '干细胞' },
  { id: 6, name: '中医药' },
  { id: 7, name: '慈铭' },
  { id: 8, name: '树兰' },
  { id: 9, name: '恒大' },
  { id: 10, name: '启研' },
  { id: 10, name: '干细胞' },
  { id: 10, name: '抗衰老' },
];
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
    searchValue: '',
    swiperImages: [
      "https://cos.yuanhhealth.com/lunbo1.jpg",
      "https://cos.yuanhhealth.com/lunbo2.jpg",
      "https://cos.yuanhhealth.com/lunbo3.jpg",
      "https://cos.yuanhhealth.com/lunbo4.jpg"
    ]
  },
  async onLoad() {
    wx.removeStorage({ key: 'userInfo' });
    wx.clearStorageSync();
    // await this.loginFlowController();
    this.fetchVideoData();
  },

  // 核心登录控制器
  async loginFlowController() {
    if (this.checkAuthValid()) return;

    try {
      await this.executeSilentLogin();
      if (this.checkAuthValid()) return;
    } catch (silentError) {
    }
    if (!this.data.needAuth) {
      this.setData({ needAuth: true });
    }
  },

  // 检查授权有效性（宽松校验）
  checkAuthValid(): boolean {
    const tokenValid = !!wx.getStorageSync('token');
    let userInfoValid: any = false;

    // 增加实时校验
    wx.getSetting({
      success: (res) => {
        userInfoValid = res.authSetting['scope.userInfo'];
        this.setData({ needAuth: !(tokenValid && userInfoValid) })
      }
    })
    return tokenValid && userInfoValid;
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
      wx.removeStorageSync('token');
      this.setData({ needAuth: true });
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
      if (error.errMsg.includes('deny')) {
        wx.showModal({
          title: '授权恢复',
          content: '请长按小程序图标→「设置」→「位置信息」选择「使用小程序时允许」',
          confirmText: '前往设置',
          success: () => {
            wx.openSetting({
              withSubscriptions: true // iOS17.6新增参数
            });
          }
        })
      }
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
        cover: '',
        loading: false,
      }
    });
  },

  onVideoError(e: any) {
    wx.showToast({ title: '播放失败，请重试', icon: 'none' });
  },

  handleMoreClick: function (e: any) {
    const type = e.currentTarget.dataset.type; // 获取卡片类型标识
    wx.navigateTo({
      url: `/packageHome/pages/homeMore/index?type=${type}` // 传递类型参数
    });
  },

  previewImage(e: any) {
    const currentIndex = e.currentTarget.dataset.index;
    const urls = this.data.swiperImages;

    wx.previewImage({ current: urls[currentIndex], urls });

  },

  onSearchInput: function (e: any) {
    this.setData({
      searchValue: e.detail.value
    });
  },

  onSearchConfirm: function () {
    const searchValue = this.data.searchValue.trim();
    if (!searchValue) return;

    // 1. 先在医院数据中搜索
    const hospitalResult = this.fuzzySearch(hospitalMap, searchValue);
    if (hospitalResult) {
      wx.navigateTo({
        url: `/packageHome/pages/homeMoreDetail/index?id=${hospitalResult.id}&type=hospital`
      });
      return;
    }

    // 2. 如果在医院数据中没找到，再搜索专家数据
    const expertResult = this.fuzzySearch(expertMap, searchValue);
    if (expertResult) {
      wx.navigateTo({
        url: `/packageHome/pages/homeMoreDetail/index?id=${expertResult.id}&type=expert`
      });
      return;
    }

    // 3. 都没找到时不处理（或可以加个提示）
    return;
  },

  // 模糊搜索方法
  fuzzySearch: function (data: any, keyword: any) {
    if (!keyword) return null;

    // 转换为小写进行不区分大小写的匹配
    const lowerKeyword = keyword.toLowerCase();

    // 查找第一个匹配的项
    return data.find((item: any) =>
      item.name.toLowerCase().includes(lowerKeyword)
    );
  },
})
