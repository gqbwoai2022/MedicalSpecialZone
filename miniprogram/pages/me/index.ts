// 我的页面 - pages/me/index.js
Page({
  data: {
    userName: "未登录" // 模拟数据，实际可从全局或接口获取
  },

  // 跳转到订单列表
  navigateToOrder(e: any) {
    const type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: `/pages/order/list?type=${type}`
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