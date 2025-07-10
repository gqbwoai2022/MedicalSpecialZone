
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
          image: 'https://cos.yuanhhealth.com/hospital1.jpg',
          title: '中国人民解放军总医院海南医院',
          subtitle: '',
          desc: '解放军总医院海南医院（原海南分院）是经中央军委批准，原总后勤部和海南省委省政府共同建设的一所现代化综合医院，医院编制为正师级，按照三级甲等综合医院标准规划设计，集医疗、保健、教学、科研功能于一体的正师级医院，也是解放军总医院建院60年来'
        },
        {
          id: 2,
          image: 'https://cos.yuanhhealth.com/hospital2.jpg',
          title: '上海交通大学医学院附属瑞金医院',
          subtitle: '',
          desc: '上海交通大学医学院附属瑞金医院海南医院(海南博鳌研究型医院) (以下简称“瑞金海南医院”)是以海南省人民政府为建设主体，以上海交通大学医学院附属瑞金医院(以下简称“上海瑞金医院”)为输出医院，以海南省人民医院为依托医院，其建设目标为打造成为海南省国家区域医疗中心'
        },
        {
          id: 3,
          image: 'https://cos.yuanhhealth.com/hospital3.jpg',
          title: '四川大学华西乐城医院',
          subtitle: '',
          desc: '四川大学华西乐城医院项目是四川大学、海南控股、乐城管理局合作共建、中建一局承建的自贸港前沿医学医教研一体化重点项目。'
        },
        {
          id: 4,
          image: 'https://cos.yuanhhealth.com/hospital4.jpg',
          title: '博鳌超级医院',
          subtitle: '',
          desc: '博鳌超级医院是国有控股的三级综合医院，医院位于美丽的万泉河畔，占地面积2万平方米，开放床位150张。是海南自贸港乐城国际医疗旅游先行区开业的第一家医院'
        },
        {
          id: 5,
          image: 'https://cos.yuanhhealth.com/hospital5.jpg',
          title: '中国干细胞集团海南博鳌干细胞附属医院',
          subtitle: '',
          desc: '中国干细胞集团联合上海交通大学医学院附属同仁医院在博鳌乐城国际医疗旅游先行区建成了中国干细胞集团海南博鳌附属干细胞医院暨上海交通大学医学院附属同仁医院博鳌分院'
        },
        {
          id: 6,
          image: 'https://cos.yuanhhealth.com/hospital6.jpg',
          title: '上海中医药大学博鳌国际医院',
          subtitle: '',
          desc: '上海中医药大学博鳌国际医院按照三级综合医院标准建设，集医、教、研、抗衰、康养为一体，以生物医药新技术和再生医学为核心。'
        },
        {
          id: 7,
          image: 'https://cos.yuanhhealth.com/hospital7.jpg',
          title: '海南医科大学第一附属医院乐城医院（慈铭博鳌国际医院）',
          subtitle: '',
          desc: '海南医科大学第一附属医院乐城医院（慈铭博鳌国际医院）建立于2015年，位于博鳌乐城国际医疗旅游先行区，是首家公私合营特许经营的示范医院。'
        },
        {
          id: 8,
          image: 'https://cos.yuanhhealth.com/hospital8.jpg',
          title: '树兰医院',
          subtitle: '',
          desc: '树兰（博鳌）医院隶属于树兰医疗集团，按照三级甲等标准筹备建造，采取“一个共享医院（平台）+若干个临床医学中心”的“1+X”共享医院模式进行运营，旨在成为一个以肝病、肿瘤、罕见病、抗衰老治疗及高端康复服务为重点的综合医院。'
        },
        {
          id: 9,
          image: 'https://cos.yuanhhealth.com/hospital9.jpg',
          title: '博鳌恒大国际医院',
          subtitle: '',
          desc: '博鳌恒大国际医院于2018年2月28日正式开业运营，是经海南省卫健委批复成立的三级肿瘤专科医院，医院严格参照国际JCI认证标准规划设计建设。医院占地121.8亩，总建筑面积11万平方米，包括医疗楼和康养楼两大区域。'
        },
        {
          id: 10,
          image: 'https://cos.yuanhhealth.com/hospital10.jpg',
          title: '海南启研干细胞抗衰老医院',
          subtitle: '',
          desc: '海南启研医院，是由中信产业基金（CITIC PE）投资， 美丽田园（Beauty Farm）旗下的专业健康管理抗衰机构。'
        },
      ],
      'expert': [
        {
          "id": 1,
          "image": "https://cos.yuanhhealth.com/wangchen.jpg",
          "title": "王辰院士",
          "desc": "北京协和医学院院校长，国家呼吸疾病临床研究中心主任，世界卫生组织戒烟与呼吸疾病预防合作中心主任"
        },
        {
          "id": 2,
          "image": "https://cos.yuanhhealth.com/ningguang.png",
          "title": "宁光院士",
          "desc": "国家代谢性疾病临床研究中心主任，国家卫计委内分泌代谢病重点实验室主任，上海交通大学医学院附属瑞金医院副院长"
        },
        {
          "id": 3,
          "image": "https://cos.yuanhhealth.com/chenxiangmei.jpg",
          "title": "陈香美院士",
          "desc": "中国工程院院士，肾脏病学专家，博士生导师，解放军肾脏病研究所所长暨重点实验室主任，擅长疑难肾病诊治及延缓慢性肾病发展"
        },
        {
          "id": 4,
          "image": "https://cos.yuanhhealth.com/dongjiahong.jpg",
          "title": "董家鸿院士",
          "desc": "现任清华大学临床医学院院长，清华大学精准医学研究院院长，清华大学附属北京清华长庚医院执行院长"
        },
        {
          "id": 5,
          "image": "https://cos.yuanhhealth.com/gejunbo.jpg",
          "title": "葛均波院士",
          "desc": "复旦大学附属中山医院心内科主任,上海市心血管临床医学中心主任,上海市心血管病研究所所长"
        },
        {
          "id": 6,
          "image": "https://cos.yuanhhealth.com/guying.jpg",
          "title": "顾瑛院士",
          "desc": "中国科学院院士，激光医学专家，博士生导师"
        },
        {
          "id": 7,
          "image": "https://cos.yuanhhealth.com/handemin.jpg",
          "title": "韩德民院士",
          "desc": "中国工程院院士，首都医科大学耳鼻咽喉科学院院长，世界华人耳鼻咽喉头颈外科理事会理事长"
        },
        {
          "id": 8,
          "image": "https://cos.yuanhhealth.com/lilanjuan.jpg",
          "title": "李兰娟院士",
          "desc": "中国工程院院士、浙江大学教授、主任医师、博士生导师"
        },
        {
          "id": 9,
          "image": "https://cos.yuanhhealth.com/lizhaoshen.jpg",
          "title": "李兆申院士",
          "desc": "中国工程院院士，海军军医大学长海医院消化内科主任，国家消化病临床医学研究中心主任,中国医师协会常务理事、内镜医师分会会长、胰腺病学专委会主委"
        },
        {
          "id": 10,
          "image": "https://cos.yuanhhealth.com/zhengshusen.jpg",
          "title": "郑树森院士",
          "desc": "中国工程院院士，法国国家医学科学院外籍院士，浙江大学外科学教授，博士生导师"
        },
        {
          "id": 11,
          "image": "https://cos.yuanhhealth.com/chenlin.jpg",
          "title": "陈霖院士",
          "desc": "中国科学院院士、第三世界科学院院士，中国科学院生物物理研究所研究员"
        },
        {
          "id": 12,
          "image": "https://cos.yuanhhealth.com/wangfusheng.jpg",
          "title": "王福生院士",
          "desc": "中国科学院院士，解放军总医院第五医学中心感染病诊疗与研究中心主任，国家感染性疾病临床医学研究中心主任，主任医师，博士生导师"
        },
        {
          "id": 13,
          "image": "https://cos.yuanhhealth.com/yumengsun.jpg",
          "title": "俞梦孙院士",
          "desc": "中国工程院院士，中国人民解放军空军军医大学空军航空医学研究所航空医学工程研究中心主任、博士生导师"
        },
        {
          "id": 14,
          "image": "https://cos.yuanhhealth.com/zhangzhiyuan.jpg",
          "title": "张志愿院士",
          "desc": "中国科学院院士，首都医科大学附属北京天坛医院神经外科学系教授，博士生导师，主任医师，首都医科大学神经外科学院院长"
        },
        {
          "id": 15,
          "image": "https://cos.yuanhhealth.com/zhaojizong.jpg",
          "title": "赵继宗院士",
          "desc": "中国科学院院士，首都医科大学附属北京天坛医院神经外科学系教授，博士生导师，主任医师"
        },
        {
          "id": 16,
          "image": "https://cos.yuanhhealth.com/wangyuzhuo.jpg",
          "title": "王玉琢院士",
          "desc": "加拿大健康研究院院士，生物学博士，博士生导师，肿瘤个体化治疗领域的专家"
        },
        {
          "id": 17,
          "image": "https://cos.yuanhhealth.com/wangzhenyi.png",
          "title": "王振义院士",
          "desc": "中国工程院院士，内科血液学专家，医学家，医学教育家，法国科学院外籍院士"
        },
        {
          "id": 18,
          "image": "https://cos.yuanhhealth.com/chensaijuan.jpg",
          "title": "陈赛娟院士",
          "desc": "中国工程院院士，发展中国家科学院院士，上海交通大学医学基因组学国家重点实验室主任"
        },
        {
          "id": 19,
          "image": "https://cos.yuanhhealth.com/ludaopei.jpg",
          "title": "陆道培院士",
          "desc": "中国工程院院士，北京大学医学部学术委员会委员，北京大学血液病国家重点学科首席专家"
        },
        {
          "id": 20,
          "image": "https://cos.yuanhhealth.com/wanghongyang.jpg",
          "title": "王红阳院士",
          "desc": "中国工程院院士，发展中国家科学院院士，少将军衔，教授，主任医师，博导，医学与肿瘤分子生物学专家。 国家肝癌科学中心始创主任"
        },
        {
          "id": 21,
          "image": "https://cos.yuanhhealth.com/maojunfa.jpg",
          "title": "毛军发院士",
          "desc": "中国科学院院士，电磁场与微波技术专家，深圳大学校长，国务院学位委员会学科评议组成员"
        },
        {
          "id": 22,
          "image": "https://cos.yuanhhealth.com/zhangboli.jpg",
          "title": "张伯礼院士",
          "desc": "中国工程院院士、医药卫生学部主任 ，国医大师，中国医学科学院学部委员"
        },
        {
          "id": 23,
          "image": "https://cos.yuanhhealth.com/shanghong.png",
          "title": "尚红院士",
          "desc": "中国工程院院士，中国医科大学附属第一医院院长，国家医学检验临床医学研究中心主任"
        },
        {
          "id": 24,
          "image": "https://cos.yuanhhealth.com/tianzhigang.jpg",
          "title": "田志刚院士",
          "desc": "中国工程院院士、欧洲人文和自然科学院院士，中国科学技术大学生命科学学院教授"
        },
        {
          "id": 25,
          "image": "https://cos.yuanhhealth.com/hanyaling.jpg",
          "title": "韩雅玲院士",
          "desc": "中国工程院院士，中国人民解放军沈阳军区总医院副院长兼全军心血管病研究所所长"
        },
        {
          "id": 26,
          "image": "https://cos.yuanhhealth.com/haoxishan.jpg",
          "title": "郝希山院士",
          "desc": "中国工程院院士，中国医学科学院学部委员，天津医科大学博士研究生导师"
        },
        {
          "id": 27,
          "image": "https://cos.yuanhhealth.com/xielixin.jpg",
          "title": "谢立信院士",
          "desc": "中国工程院院士，博士生导师，山东省眼科研究所名誉所长、青岛眼科医院院长"
        },
        {
          "id": 28,
          "image": "https://cos.yuanhhealth.com/jiangbaoguo.png",
          "title": "姜保国院士",
          "desc": "中国工程院院士，中国中医科学院学部委员，北京大学人民医院教授、博士生导师"
        },
        {
          "id": 29,
          "image": "https://cos.yuanhhealth.com/liuliang.jpg",
          "title": "刘良院士",
          "desc": "中国工程院院士，澳门科技大学第三任校长、荣誉校长，中医证候全国重点实验室主任"
        },
        {
          "id": 30,
          "image": "https://cos.yuanhhealth.com/zhangyingze.jpg",
          "title": "张英泽院士",
          "desc": "中国工程院院士，河北医科大学教授、主任医师、博士生导师"
        },
      ],
    };
    this.setData({ listData: mockData[type] || [] });
  },
});