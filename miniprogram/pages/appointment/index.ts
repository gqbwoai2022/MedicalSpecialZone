import { silentLogin, fullLogin } from '../../utils/util';


interface ApiResponse<T = any> {
  code: number;
  msg?: string;
  data: T;
}

Page({
  data: {
    isLoggedIn: false,
    userInfo: null,
    // 当前选中的类型（hospital/expert/tech）
    selectedType: '',
    // 已选的值
    selectedHospital: '',
    selectedExpert: '',
    selectedTech: '',
    // 弹窗相关
    showModal: false,
    modalTitle: '',
    optionList: [],
    hospitalList: [
      { id: 1, name: '中国人民解放军总医院海南医院' },
      { id: 2, name: '上海交通大学医学院附属瑞金医院' },
      { id: 3, name: '四川大学华西乐城医院' },
      { id: 4, name: '博鳌超级医院' },
      { id: 5, name: '中国干细胞集团海南博鳌干细胞附属医院' },
      { id: 6, name: '上海中医药大学博鳌国际医院' },
      { id: 7, name: '慈铭博鳌国际医院' },
      { id: 8, name: '树兰医院' },
      { id: 9, name: '博鳌恒大国际医院' },
      { id: 10, name: '海南启研干细胞抗衰老医院' },
    ],
    expertList: [
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
    ],
    techList: [
      { id: 1, name: 'AI 辅助诊断' },
      { id: 2, name: '微创手术机器人' },
      { id: 3, name: '3D 打印假体' }
    ],
    patientName: '',       // 就诊人姓名
    visitTime: '',         // 就诊时间
    phone: '',             // 联系电话
    currentDate: new Date().toISOString().split('T')[0], // 默认今天，格式：YYYY-MM-DD
    specialRequest: '',
  },

  // 点击选项项
  handleSelectOption(e: any) {
    const type = e.currentTarget.dataset.type;
    let title = '';
    let list: any = [];

    switch (type) {
      case 'hospital':
        title = '服务医院';
        list = this.data.hospitalList;
        break;
      case 'expert':
        title = '院士专家';
        list = this.data.expertList;
        break;
      case 'tech':
        title = '先进技术';
        list = this.data.techList;
        break;
    }

    this.setData({
      selectedType: type,
      showModal: true,
      modalTitle: title,
      optionList: list
    });
  },

  // 选择弹窗中的选项
  handleSelectModalOption(e: any) {
    const value = e.currentTarget.dataset.value;
    const { selectedType } = this.data;

    // 更新选中值（其他选项清空）
    const updateData: any = {
      showModal: false,
      selectedHospital: '',
      selectedExpert: '',
      selectedTech: ''
    };

    const typeMap: any = {
      hospital: 'selectedHospital',
      expert: 'selectedExpert',
      tech: 'selectedTech',
    };
    updateData[`${typeMap[selectedType]}`] = value;

    this.setData(updateData);
  },

  // 关闭弹窗
  closeModal() {
    this.setData({ showModal: false });
  },

  // 重新选择
  handleReset() {
    this.setData({
      selectedType: '',
      selectedHospital: '',
      selectedExpert: '',
      selectedTech: ''
    });
  },

  handleInputChange(e: any) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value
    });
  },

  // 时间选择事件
  handleTimeChange(e: any) {
    this.setData({
      visitTime: e.detail.value
    });
  },

  handleSpecialRequestChange(e: any) {
    this.setData({
      specialRequest: e.detail.value
    });
  },

  // 提交预约
  async handleSubmit() {
    const {
      selectedHospital, selectedExpert, selectedTech,
      patientName, visitTime, phone
    } = this.data;

    // 1.校验预约信息是否至少选一项
    if (!selectedHospital && !selectedExpert && !selectedTech) {
      wx.showToast({ title: '请至少选择一项预约内容', icon: 'none' });
      return;
    }

    // 2.校验就诊人信息是否完整
    if (!patientName || !visitTime || !phone) {
      wx.showToast({ title: '请填写完整的就诊人信息', icon: 'none' });
      return;
    }

    // 3.校验手机号格式
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }

    // 4. 检查微信登录状态
    if (!this.data.isLoggedIn) {
      await this.checkLogin();
      if (!this.data.isLoggedIn) return; // 用户拒绝授权
    }
    // 3. 提交数据到后端
    this.submitDataToBackend();
  },
  // 检查微信登录状态
  async checkLogin() {
    try {
      // 1. 检查本地存储的登录态
      const token = wx.getStorageSync('token');
      const storedUser = wx.getStorageSync('userInfo');
      // 2. 已有完整登录态
      if (token && storedUser) {
        this.setData({
          isLoggedIn: true,
          userInfo: storedUser
        });
        return true;
      }
      // 3. 触发静默登录流程
      await silentLogin();

      // 6. 需要手动授权
      await this.handleManualAuth();
      return true;
    } catch (error) {
      console.error('登录检查失败:', error);
      return false;
    }
  },

  // 手动授权处理
  async handleManualAuth() {
    try {
      const { userInfo } = await fullLogin();
      wx.setStorageSync('userInfo', userInfo);
      this.setData({
        isLoggedIn: true,
        userInfo: userInfo
      });
    } catch (error) {
      wx.showToast({ title: '授权失败，请重试', icon: 'none' });
      throw error;
    }
  },

  // 提交数据到后端
  async submitDataToBackend() {
    const {
      selectedHospital,
      selectedExpert,
      selectedTech,
      patientName,
      visitTime,
      phone,
      specialRequest
    } = this.data;

    const params = {
      service: selectedHospital || selectedExpert || selectedTech,
      phone: phone,
      patient: patientName,
      date: visitTime,
      specialRequirement: specialRequest,
    };

    wx.showLoading({ title: '提交中...' });
    wx.request({
      url: 'https://yuanhhealth.com/api/appointment',
      method: 'POST',
      data: params,
      header: {
        'Content-Type': 'application/json',
        'Authorization': wx.getStorageSync('token')
      },
      success: (res: WechatMiniprogram.RequestSuccessCallbackResult<ApiResponse<any>>) => {
        try {
          if (res.data.code === 1) {
            wx.setStorageSync('lastAppointmentId', res.data.data);
            wx.showToast({ title: '预约成功', icon: 'success' });
            setTimeout(() => {
              wx.navigateTo({ url: `/packageOrder/pages/packageSelection/index` });
            }, 600);
          } else {
            wx.showToast({ title: res.data.msg || '提交失败', icon: 'none' });
          }
        } catch (e) {
          wx.showToast({ title: '提交失败，请重试', icon: 'none' });
        }
      }
    });
  }
});