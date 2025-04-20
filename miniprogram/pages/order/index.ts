// 定义类型
type OrderType = 'hospital' | 'tech' | 'expert';
// 扩展订单状态类型
type OrderStatus = 'all' | 'unpaid' | 'paid' | 'cancelled';

Page({
  data: {
    activeType: 'all', // 默认显示全部
    orderList: [
      {
        type: 'hospital',
        orderId: '1',
        serviceName: 'text',
        patientName: 'qqq',
        visitTime: '2025-05-01',
        remark: '不吃香菜',
        amount: 3988,
        status: 'unpaid',
        value: '三甲医院'
      },
    ],
    loading: false,
    hasMore: true,
    page: 1,
    pageSize: 10,
    navTitle: '我的订单'
  },

  async onLoad(options: any) {
    // this.loadData();
  },

  // 加载数据
  async loadData() {
    const res = await wx.request({
      url: 'https://yuanhhealth.com/api/order/list',
      method: 'GET',
      header: { Authorization: `Bearer ${wx.getStorageSync('token')}` },
      data: {
        type: this.data.activeType,
        page: this.data.page,
        pageSize: this.data.pageSize
      }
    });

    if (res.data.code === 1) {
      const list = res.data.data.list || [];
      this.setData({
        orderList: list,
      });
    }
  },

  // 立即支付
  handlePay(e: any) {
    const orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/payment/index?orderId=${orderId}`
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
      await wx.request({
        url: `https://yuanhhealth.com/api/order/cancel/${orderId}`,
        method: 'POST'
      });
      this.loadData(); // 刷新列表
    }
  },

  // 过滤器
  filters: {
    typeTextFilter(value: OrderType) {
      const map = {
        hospital: '医院服务',
        tech: '先进技术',
        expert: '院士专家'
      };
      return map[value] || value;
    }
  } as any
});