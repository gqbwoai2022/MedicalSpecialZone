import { silentLogin, fullLogin } from '../../../utils/util';
interface ApiResponse<T = any> {
  code: number;
  msg?: string;
  data: T;
}

Page({
  data: {
    loading: false // 加载状态
  },
  async checkLogin() {
    try {
      // 1. 检查本地存储的登录态
      if (wx.getStorageSync('token')) return true;

      // 2. 尝试静默登录
      const code = await silentLogin();
      await this.callLoginAPI(code);

      // 3. 检查最终状态
      return !!wx.getStorageSync('token');
    } catch (error) {
      // 4. 需要手动授权
      return this.handleManualAuth();
    }
  },
  // 手动授权处理（复用首页逻辑）
  async handleManualAuth() {
    try {
      const { code } = await fullLogin();
      await this.callLoginAPI(code);
      return true;
    } catch (error) {
      wx.showToast({ title: '授权失败，请重试', icon: 'none' });
      return false;
    }
  },

  // 统一登录接口调用
  async callLoginAPI(code: string) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://yuanhhealth.com/api/user/login',
        method: 'POST',
        data: {
          code,
          scene: getApp().globalData.sceneParams
        },
        success: (res: WechatMiniprogram.RequestSuccessCallbackResult<ApiResponse<any>>) => {
          if (res.data.code === 1) {
            wx.setStorageSync('token', res.data.data);
            resolve(true);
          } else {
            reject(new Error('登录失败'));
          }
        },
        fail: reject
      });
    });
  },
  handleBuy(e: any): void {
    // 1. 获取必要参数
    const serviceType = e.currentTarget.dataset.service; // 从按钮获取套餐类型
    const appointmentId = wx.getStorageSync('lastAppointmentId');
    const token = wx.getStorageSync('token');

    // 2. 参数校验
    if (!appointmentId) {
      wx.showToast({ title: '未找到预约信息，请重新预约', icon: 'none' });
      wx.navigateBack();
    }
    if (!token) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      this.checkLogin();
    }

    // 3. 显示加载状态
    this.setData({ loading: true });
    wx.showLoading({ title: '准备支付中...' });

    // 4. 调用预下单接口
    wx.request({
      url: 'https://yuanhhealth.com/api/appointment/preOrder',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: {
        service: serviceType,
        appointmentId: appointmentId
      },
      success: (res: any) => {
        try {
          if (res.data.code === 1) {
            // 6. 获取支付参数
            const paymentParams = res.data.data;

            // 7. 发起微信支付
            wx.requestPayment({
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
          } else {
            wx.showToast({
              title: res.data.msg || '支付流程异常',
              icon: 'none',
            });
          }
        } catch (e) {
        } finally {
          this.setData({ loading: false });
          wx.hideLoading();
          return;
        }
      }
    });
  }
});