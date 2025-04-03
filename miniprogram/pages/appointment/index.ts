// 定义用户信息类型
type UserInfo = {
  nickName: string;
  avatarUrl: string;
  openId?: string; // 需要后续通过 wx.login 获取
};

Page({
  data: {
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
    // 模拟数据
    hospitalList: [
      { id: 1, name: '北京协和医院' },
      { id: 2, name: '上海瑞金医院' },
      { id: 3, name: '广州中山医院' }
    ],
    expertList: [
      { id: 1, name: '张院士（心血管科）' },
      { id: 2, name: '李院士（神经外科）' },
      { id: 3, name: '王院士（肿瘤科）' }
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
    isLoggedIn: false,      // 是否已登录
    userInfo: null as UserInfo | null, // 明确类型为 UserInfo 或 null
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
    const updateData = {
      showModal: false,
      selectedHospital: '',
      selectedExpert: '',
      selectedTech: ''
    };
    updateData[`selected${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}`] = value;

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

  // 提交预约
  async handleSubmit() {
    wx.navigateTo({ url: `/pages/packageSelection/index` });
    return;
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
    console.log('提交数据:', {
      appointment: {
        hospital: selectedHospital,
        expert: selectedExpert,
        tech: selectedTech
      },
      patient: {
        name: patientName,
        time: visitTime,
        phone: phone
      }
    });
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
      // 1. 检查是否已授权用户信息
      const { authSetting } = await wx.getSetting();
      if (authSetting?.['scope.userInfo']) {
        // 2. 已授权，获取用户昵称和头像
        const { userInfo } = await wx.getUserProfile({ desc: '用于提交预约信息' });

        // 3. 获取微信登录凭证 code（关键步骤）
        const { code } = await wx.login(); // 静默获取 code

        // 4. 将 code 发送到后端换取 openid
        const res = await wx.request({
          url: 'https://your-api.com/auth',
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

  // 提交数据到后端
  async submitDataToBackend() {
    const {
      selectedHospital,
      selectedExpert,
      selectedTech,
      patientName,
      visitTime,
      phone,
      specialRequest,
      userInfo
    } = this.data;

    // 确保 userInfo 存在且包含 openId
    if (!userInfo?.openId) {
      wx.showToast({ title: '用户信息获取失败', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '提交中...' });
    try {
      const res = await wx.request({
        url: 'https://your-api-domain.com/appointments',
        method: 'POST',
        data: {
          openid: userInfo.openId,
          nickname: userInfo.nickName,
          avatar: userInfo.avatarUrl,
          appointment: {
            type: selectedHospital ? 'hospital' : selectedExpert ? 'expert' : 'tech',
            value: selectedHospital || selectedExpert || selectedTech
          },
          patient: {
            name: patientName,
            time: visitTime,
            phone
          },
          remark: specialRequest || '无'
        },
        header: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + wx.getStorageSync('token')
        }
      });

      if (res.statusCode === 200) {
        wx.showToast({ title: '预约成功', icon: 'success' });
        setTimeout(() => {
          wx.switchTab({ url: '/pages/home/index' });
        }, 1500);
      } else {
        throw new Error(res.data.message || '提交失败');
      }
    } catch (error) {
      console.error('提交失败:', error);
      wx.showToast({ title: '提交失败，请重试', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  }
});