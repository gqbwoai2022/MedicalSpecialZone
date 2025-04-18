Page({
  data: {
    loading: false // 加载状态
  },
  async checkLogin() {
    try {
      // 1. 检查是否已授权用户信息
      const { authSetting } = await wx.getSetting();
      if (authSetting?.['scope.userInfo']) {
        // 2. 已授权，获取用户昵称和头像
        const { userInfo } = await wx.getUserProfile({ desc: '用于提交预约信息' });

        // 3. 获取微信登录凭证 code（关键步骤）
        const { code } = await wx.login(); // 静默获取 code

        // 4. 将 code 发送到后端换取 openid
        const res = await wx.request({
          url: 'https://yuanhhealth.com/api/user/login',
          method: 'POST',
          data: { code },
        });

        // 5. 更新用户信息（包含 openid）
        this.setData({
          isLoggedIn: true,
          userInfo: {
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl,
            openId: res.data.openid // 假设后端返回 openid
          }
        });
        return true;
      } else {
        // 6. 用户未授权，引导授权
        const { confirm } = await wx.showModal({
          title: '提示',
          content: '需要您授权登录才能提交预约',
          confirmText: '去授权'
        });
        if (confirm) {
          const { authSetting } = await wx.openSetting();
          if (authSetting?.['scope.userInfo']) {
            return this.checkLogin(); // 递归调用自身完成授权
          }
        }
        return false;
      }
    } catch (error) {
      console.error('登录失败:', error);
      wx.showToast({ title: '登录失败，请重试', icon: 'none' });
      return false;
    }
  },
  async handleBuy(e: any) {
    try {
      // 1. 获取必要参数
      const serviceType = e.currentTarget.dataset.service; // 从按钮获取套餐类型
      const appointmentId = wx.getStorageSync('lastAppointmentId');
      const token = wx.getStorageSync('token');

      // 2. 参数校验
      if (!appointmentId) {
        wx.showToast({ title: '未找到预约信息，请重新预约', icon: 'none' });
        return wx.navigateBack();
      }
      if (!token) {
        wx.showToast({ title: '请先登录', icon: 'none' });
        this.checkLogin();
      }

      // 3. 显示加载状态
      this.setData({ loading: true });
      wx.showLoading({ title: '准备支付中...' });

      // 4. 调用预下单接口
      const preOrderRes = await wx.request({
        url: 'https://yuanhhealth.com/api/appointment/preOrder',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: {
          service: serviceType,
          appointmentId: appointmentId
        }
      });

      // 5. 处理接口响应
      if (preOrderRes.data.code !== 1) {
        throw new Error(preOrderRes.data.msg || '预下单失败');
        return;
      }

      // 6. 获取支付参数
      const paymentParams = preOrderRes.data.data;

      // 7. 发起微信支付
      const paymentRes = await wx.requestPayment({
        timeStamp: paymentParams.timeStamp,
        nonceStr: paymentParams.nonceStr,
        package: paymentParams.package,
        signType: paymentParams.signType,
        paySign: paymentParams.paySign
      });

      // 8. 支付成功处理
      wx.redirectTo({
        url: `/pages/payment/success?order=${appointmentId}`
      });

    } catch (error) {
      // 9. 错误处理
      wx.showToast({
        title: error.message || '支付流程异常',
        icon: 'none',
        duration: 3000
      });

      // 10. 打印完整错误日志（开发环境）
      if (process.env.NODE_ENV === 'development') {
        console.error('支付流程错误:', {
          error,
          timestamp: new Date().toISOString()
        });
      }
    } finally {
      // 11. 清除加载状态
      this.setData({ loading: false });
      wx.hideLoading();
    }
  }
});