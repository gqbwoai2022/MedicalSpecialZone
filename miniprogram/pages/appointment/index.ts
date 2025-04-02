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
    currentDate: new Date().toISOString().split('T')[0] // 默认今天，格式：YYYY-MM-DD
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
  handleSubmit() {
    const {
      selectedHospital, selectedExpert, selectedTech,
      patientName, visitTime, phone
    } = this.data;

    // 校验预约信息是否至少选一项
    if (!selectedHospital && !selectedExpert && !selectedTech) {
      wx.showToast({ title: '请至少选择一项预约内容', icon: 'none' });
      return;
    }

    // 校验就诊人信息是否完整
    if (!patientName || !visitTime || !phone) {
      wx.showToast({ title: '请填写完整的就诊人信息', icon: 'none' });
      return;
    }

    // 校验手机号格式
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
    // 所有校验通过，提交数据
    wx.showToast({ title: '提交成功', icon: 'success' });
  }
});