
Page({
  data: {
    navTitle: '',
    listData: [] as any[],
    type: '',
  },

  onLoad(options) {
    const type: any = options.type; // 接收跳转参数
    this.setNavTitle(type);
    this.loadData(type);
    this.setData({ type });
  },

  // 跳转详情页
  navigateToDetail(e: WechatMiniprogram.TouchEvent) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/packageHome/pages/homeMoreDetail/index?id=${id}&type=${this.data.type}`
    });
  },

  // 根据类型设置导航标题
  setNavTitle(type: 'hospital' | 'expert' | 'technology') {
    const titles = {
      'hospital': '合作医院',
      'expert': '院士专家',
      'technology': '先进技术'
    };
    this.setData({ navTitle: titles[type] || '详情列表' });
  },

  loadData(type: 'hospital' | 'expert') {
    const mockData = {
      'hospital': [
        {
          id: 1,
          image: 'http://cos.yuanhhealth.com/hospital1.jpg',
          title: '中国人民解放军总医院海南医院',
          subtitle: '',
          desc: '中国人民解放军总医院海南医院是中央军委批准建设的现代化三甲医院，位于三亚海棠湾，为总医院唯一跨地域全科分院。重点打造海战伤、热带病救治体系，配备达芬奇手术机器人等总值超7亿元的先进设备。开诊10年来年接诊66万人次，完成手术9000余台，实现海南"大病不出岛"，兼具军民融合与战略卫勤保障功能。'
        },
        {
          id: 2,
          image: 'http://cos.yuanhhealth.com/hospital2.jpg',
          title: '上海交通大学医学院附属瑞金医院',
          subtitle: '',
          desc: '上海交通大学医学院附属瑞金医院海南医院（海南博鳌研究型医院）是以海南省人民政府为建设主体，以上海交通大学医学院附属瑞金医院为输出医院，以海南省人民医院为依托医院，其建设目标为打造成为海南省国家区域医疗中心。'
        },
        {
          id: 3,
          image: 'http://cos.yuanhhealth.com/hospital3.jpg',
          title: '四川大学华西乐城医院',
          subtitle: '',
          desc: '四川大学华西乐城医院项目是四川大学、海南控股、乐城管理局合作共建、中建一局承建的自贸港前沿医学医教研一体化重点项目。项目建成后，四川大学华西乐城医院将成为乐城先行区又一集医疗、教学和科研为一体的综合性医院。'
        },
        {
          id: 4,
          image: 'http://cos.yuanhhealth.com/hospital4.jpg',
          title: '博鳌超级医院',
          subtitle: '',
          desc: '海南博鳌鲁医医院，由山东省医学会联合银丰集团设立，为鲁琼医疗合作重点引进项目，也是乐城先行区首批重点对接项目，是一所集医疗、科研、预防、康复为一体的三级非营利性综合医院。'
        },
        {
          id: 5,
          image: 'http://cos.yuanhhealth.com/hospital5.jpg',
          title: '中国干细胞集团海南博鳌干细胞附属医院',
          subtitle: '',
          desc: '国家卫健委批准执业的三级医院，属于医疗机构的最高等级，是海南省医保定点单位。医院按照JCI国际标准建设，致力于干细胞治疗和再生医学临床转化，被公认为国内规模最大、技术最先进的干细胞医院。'
        },
        {
          id: 6,
          image: 'http://cos.yuanhhealth.com/hospital6.jpg',
          title: '上海中医药大学博鳌国际医院',
          subtitle: '',
          desc: '博鳌国际医院是一家集医、教、研、抗衰、康养为一体的三级综合型医院。医院占地81.2亩，建筑面积65000平，核定病床数560张。医院秉持“创新、开拓、惠民、卓越”的理念和“客户至上，临床导向，技术创新，特色发展”的宗旨，树立“助力全民健康，让生命更精彩”的共同价值观。'
        },
        {
          id: 7,
          image: 'http://cos.yuanhhealth.com/hospital7.jpg',
          title: '海南医科大学第一附属医院乐城医院（慈铭博鳌国际医院）',
          subtitle: '',
          desc: '慈铭博鳌国际医院是先行区内首家公私合营特许经营的示范医院。是汇聚知名医疗专家、新特药械绿通及消费医疗包括抗衰及辅助生殖等中国新名片的三级综合医院。'
        },
        {
          id: 8,
          image: 'http://cos.yuanhhealth.com/hospital8.jpg',
          title: '树兰医院',
          subtitle: '',
          desc: '树兰（博鳌）医院隶属于树兰医疗集团，按照三级甲等标准筹备建造，采取“一个共享医院（平台）+若干个临床医学中心”的“1+X”共享医院模式进行运营，旨在成为一个以肝病、肿瘤、罕见病、抗衰老治疗及高端康复服务为重点的综合医院。'
        },
        {
          id: 9,
          image: 'http://cos.yuanhhealth.com/hospital9.jpg',
          title: '博鳌恒大国际医院',
          subtitle: '',
          desc: '博鳌恒大国际医院于2018年2月28日正式开业运营，是经海南省卫健委批复成立的三级肿瘤专科医院，医院严格参照国际JCI认证标准规划设计建设。'
        },
        {
          id: 10,
          image: 'http://cos.yuanhhealth.com/hospital10.jpg',
          title: '海南启研干细胞抗衰老医院',
          subtitle: '',
          desc: '海南启研医院以再生医学、功能医学为核心技术，在特许医疗、健康管理、医学美容和抗衰老、第三方医学检测四个方面与国际领先的医疗机构合作，开展高端抗衰服务业务、培训交流，提供精准医疗、个体化、全面健康管理。'
        },
      ],
      'expert': [
        {
          "id": 1,
          "image": "http://cos.yuanhhealth.com/wangchen.jpg",
          "title": "王晨院士",
          "desc": "北京协和医学院院校长，国家呼吸疾病临床研究中心主任，世界卫生组织戒烟与呼吸疾病预防合作中心主任"
        },
        {
          "id": 2,
          "image": "http://cos.yuanhhealth.com/zhengshusen.jpg",
          "title": "郑树森院士",
          "desc": "中国工程院院士，法国国家医学科学院外籍院士，浙江大学外科学教授，博士生导师"
        },
        {
          "id": 3,
          "image": "http://cos.yuanhhealth.com/chenxiangmei.jpg",
          "title": "陈香美院士",
          "desc": "中国工程院院士，解放军总医院肾病专科医院院长，擅长疑难肾病诊治及延缓慢性肾病发展"
        },
        {
          "id": 4,
          "image": "http://cos.yuanhhealth.com/dongjiahong.jpg",
          "title": "董家鸿院士",
          "desc": "现任清华大学临床医学院院长，清华大学精准医学研究院院长，清华大学附属北京清华长庚医院执行院长"
        },
        {
          "id": 5,
          "image": "http://cos.yuanhhealth.com/gejunbo.jpg",
          "title": "葛均波院士",
          "desc": "复旦大学附属中山医院心内科主任,上海市心血管临床医学中心主任,上海市心血管病研究所所长"
        },
        {
          "id": 6,
          "image": "http://cos.yuanhhealth.com/guying.jpg",
          "title": "顾瑛院士",
          "desc": "中国科学院院士，激光医学专家，博士生导师"
        },
        {
          "id": 7,
          "image": "http://cos.yuanhhealth.com/handemin.jpg",
          "title": "韩德民院士",
          "desc": "中国工程院院士，首都医科大学耳鼻咽喉科学院院长，世界华人耳鼻咽喉头颈外科理事会理事长"
        },
        {
          "id": 8,
          "image": "http://cos.yuanhhealth.com/lilanjuan.jpg",
          "title": "李兰娟院士",
          "desc": "中国工程院院士、浙江大学教授、主任医师、博士生导师"
        },
        {
          "id": 9,
          "image": "http://cos.yuanhhealth.com/lizhaoshen.jpg",
          "title": "李兆申院士",
          "desc": "海军军医大学长海医院消化内科主任，国家消化病临床医学研究中心主任,中国医师协会常务理事、内镜医师分会会长、胰腺病学专委会主委"
        },
        {
          "id": 10,
          "image": "http://cos.yuanhhealth.com/ningguang.png",
          "title": "宁光院士",
          "desc": "国家代谢性疾病临床研究中心主任，国家卫计委内分泌代谢病重点实验室主任，上海交通大学医学院附属瑞金医院副院长"
        },
        {
          "id": 11,
          "image": "http://cos.yuanhhealth.com/chenlin.jpg",
          "title": "陈霖院士",
          "desc": "中国科学院院士、第三世界科学院院士，中国科学院生物物理研究所研究员"
        },
        {
          "id": 12,
          "image": "http://cos.yuanhhealth.com/wangfusheng.jpg",
          "title": "王福生院士",
          "desc": "中国科学院院士，解放军总医院第五医学中心感染病诊疗与研究中心主任，国家感染性疾病临床医学研究中心主任，主任医师，博士生导师"
        },
        {
          "id": 13,
          "image": "http://cos.yuanhhealth.com/yumengsun.jpg",
          "title": "俞梦孙院士",
          "desc": "中国工程院院士，中国人民解放军空军军医大学空军航空医学研究所航空医学工程研究中心主任、博士生导师"
        },
        {
          "id": 14,
          "image": "http://cos.yuanhhealth.com/zhangzhiyuan.jpg",
          "title": "张志愿院士",
          "desc": "中国科学院院士，首都医科大学附属北京天坛医院神经外科学系教授，博士生导师，主任医师，首都医科大学神经外科学院院长"
        },
        {
          "id": 15,
          "image": "http://cos.yuanhhealth.com/zhaojizong.jpg",
          "title": "赵继宗院士",
          "desc": "中国科学院院士，首都医科大学附属北京天坛医院神经外科学系教授，博士生导师，主任医师"
        },

      ],
    };
    this.setData({ listData: mockData[type] || [] });
  },
});