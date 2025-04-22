import { fullLogin } from '../../utils/util'; // 引入登录工具方法
Page({
  data: {
    userName: '未登录，点击登录',
    isLoggedIn: false // 新增登录状态标识
  },
  // 页面显示时更新状态
  onShow() {
    this.updateLoginStatus();
  },
  // 更新登录状态
  updateLoginStatus() {
    const userInfo = wx.getStorageSync('userInfo');
    const isLoggedIn = !!userInfo;
    this.setData({
      isLoggedIn,
      userName: isLoggedIn ? userInfo.nickName : '未登录，点击登录'
    });
  },

  // 点击用户信息区域
  onTapUserInfo() {
    if (!this.data.isLoggedIn) {
      this.handleLogin();
    }
  },

  // 处理登录流程
  async handleLogin() {
    try {
      // 复用首页的完整登录流程
      const { code, userInfo } = await fullLogin();

      // 调用登录接口（复用首页接口）
      await this.callLoginAPI(code);

      // 更新本地存储
      wx.setStorageSync('userInfo', userInfo);

      // 更新页面状态
      this.updateLoginStatus();

      wx.showToast({ title: '登录成功', icon: 'success' });
    } catch (error) {
      console.error('登录失败:', error);
      wx.showToast({
        title: error.message.includes('deny') ? '您取消了授权' : '登录失败',
        icon: 'none'
      });
    }
  },

  // 复用首页的登录接口调用
  async callLoginAPI(code: any) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://yuanhhealth.com/api/user/login',
        method: 'POST',
        data: {
          code,
          scene: getApp().globalData.sceneParams
        },
        success: (res) => {
          if (res.data.code === 1) {
            wx.setStorageSync('token', res.data.data);
            resolve(true);
          } else {
            reject(new Error(res.data.msg || '登录失败'));
          }
        },
        fail: reject
      });
    });
  },


  // 点击"全部"按钮
  navigateToAllOrders() {
    wx.navigateTo({
      url: '/pages/order/index?type=all&title=全部订单'
    });
  },

  // 跳转到订单列表
  navigateToOrder(e: any) {
    const type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: `/pages/order/index?type=${type}`
    });
  },

  // 跳转到就诊人管理
  navigateToPatientManage() {
    wx.navigateTo({
      url: '/pages/patient/manage'
    });
  },

  // 跳转到客服
  navigateToCustomerService() {
    wx.navigateTo({
      url: '/pages/service/index'
    });
  },

  // 分享功能
  navigateToShare() {
    wx.showToast({
      title: '转发功能已触发',
      icon: 'none'
    });
  }
});