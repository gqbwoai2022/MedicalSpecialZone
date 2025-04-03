Page({
  // 按钮点击事件（示例）
  handleBuy(e: any) {
    const price = e.currentTarget.dataset.price;
    wx.showToast({
      title: `购买￥${price}套餐`,
      icon: 'none'
    });
    // 实际开发中跳转到支付页：
    // wx.navigateTo({ url: `/pages/payment/index?price=${price}` });
  }
});