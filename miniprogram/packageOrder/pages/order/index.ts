// 定义类型
type OrderType = 'hospital' | 'tech' | 'expert';
// 扩展订单状态类型
type OrderStatus = 'all' | 'unpaid' | 'paid' | 'cancelled';

interface ApiResponse<T = any> {
  code: number;
  msg?: string;
  data: T;
}

const titleMap: any = {
  all: '全部订单',
  unpaid: '待支付',
  paid: '已支付',
  cancelled: '已取消',
};

const ammountMap: any = {
  1: '1998',
  2: '3998',
  3: '5998'
};

const statusMap: any = {
  '0': '未支付',
  '1': '已支付',
  '-1': '已取消（无需退款）',
  '-2': '已取消（未退款）',
  '-3': '已取消（已退款）',
};

Page({
  data: {
    orderList: [
    ],
    loading: false,
    navTitle: '我的订单',
    options: {},
  },
  onShow() {
    this.loadData(this.data.options);
  },
  onLoad(options: any) {
    this.setData({ options });
    this.loadData(options);
  },

  // 加载数据
  async loadData(options: any) {
    if (options.type) {
      this.setData({
        navTitle: titleMap[options.type]
      });
    }
    wx.request({
      url: 'https://yuanhhealth.com/api/appointment/orders',
      method: 'GET',
      header: { Authorization: wx.getStorageSync('token') },
      success: (res: WechatMiniprogram.RequestSuccessCallbackResult<ApiResponse<any>>) => {
        try {
          if (res.data?.code === 1 && res.data?.data?.length) {
            const allData = res.data.data.map((item: any) => {
              let statusColor = '#999';
              if (item.status === 0) statusColor = '#fa8c16'; // 待支付-橙色
              if (item.status === 1) statusColor = '#52c41a'; // 已支付-绿色
              if (item.status < 0) statusColor = '#bfbfbf';   // 已取消-灰色
              return {
                orderId: item.id,
                serviceName: item.service,
                patientName: item.patient,
                visitTime: item.date,
                remark: item.specialRequirement || '',
                service: item.servicePackage,
                amount: ammountMap[item.servicePackage],
                status: statusMap[`${item.status.toString()}`],
                statusValue: item.status,
                statusColor,
              }
            })
            this.setData({
              orderList: allData.filter((item: any) => {
                if (options.type === 'unpaid' && item.statusValue === 0) {
                  return item;
                } else if (options.type === 'paid' && item.statusValue === 1) {
                  return item;
                } else if (options.type === 'cancelled' && item.statusValue < 0) {
                  return item;
                } else if (options.type === 'all') {
                  return item;
                }
              })
            });
          }
        } catch (e) {
          return;
        }
      }
    });
  },

  // 立即支付
  async handlePay(e: any) {
    const orderId = e.currentTarget.dataset.id;
    const serviceType = e.currentTarget.dataset.type;
    this.setData({ loading: true });
    wx.showLoading({ title: '准备支付中...' });
    wx.request({
      url: 'https://yuanhhealth.com/api/appointment/preOrder',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': wx.getStorageSync('token')
      },
      data: {
        service: serviceType,
        appointmentId: orderId
      },
      success: async (res: WechatMiniprogram.RequestSuccessCallbackResult<ApiResponse<any>>) => {
        if (res?.data?.code === 1) {
          const paymentParams = res?.data?.data;
          await new Promise((resolve, reject) => {
            wx.requestPayment({
              timeStamp: paymentParams.timeStamp,
              nonceStr: paymentParams.nonceStr,
              package: paymentParams.package,
              signType: paymentParams.signType,
              paySign: paymentParams.paySign,
              success: resolve,
              fail: reject
            });
          });
          this.loadData(this.data.options);
        } else {
          wx.showToast({
            title: res.data?.msg || '支付流程异常',
            icon: 'none',
          });
        }
      }
    });
  },

  // 取消订单
  async cancelOrder(e: any) {
    const orderId = e.currentTarget.dataset.id;
    const { confirm } = await wx.showModal({
      title: '确认取消',
      content: '确定要取消此订单吗？'
    });

    if (confirm) {
      wx.request({
        url: `https://yuanhhealth.com/api/appointment/cancel`,
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'Authorization': wx.getStorageSync('token')
        },
        data: {
          appointmentId: orderId
        },
        success: (res: WechatMiniprogram.RequestSuccessCallbackResult<ApiResponse<any>>) => {
          if (res?.data?.code === 1) {
            wx.showToast({
              title: '取消成功',
              icon: 'none',
            });
            this.loadData(this.data.options);
          } else {
            wx.showToast({
              title: res?.data?.msg || '取消失败',
              icon: 'none',
            });
          }
        }
      });
    }
  },
});