Page({
  data: {
    type: '',
    detailData: null,
  },

  onLoad(options) {
    this.loadData(Number(options.id), options.type);
  },

  loadData(id: number, type: string) {
    // 从mock数据获取（示例数据扩展）
    const mockData = {
      hospital: [
        {
          id: 1,
          image: '/assets/hospital1.jpg',
          title: '中国人民解放军总医院海南医院',
          desc: '中国人民解放军总医院海南医院是中央军委批准建设的现代化三甲医院，位于三亚海棠湾，为总医院唯一跨地域全科分院。重点打造海战伤、热带病救治体系，配备达芬奇手术机器人等总值超7亿元的先进设备。开诊10年来年接诊66万人次，完成手术9000余台，实现海南"大病不出岛"，兼具军民融合与战略卫勤保障功能。',
          departments: [
            '海战伤救治中心',
            '热带病专科',
            '机器人手术中心',
            '军民融合医疗部'
          ]
        },
        {
          id: 2,
          image: '/assets/hospital2.jpg',
          title: '上海交通大学医学院附属瑞金医院海南医院',
          desc: '上海交通大学医学院附属瑞金医院海南医院（海南博鳌研究型医院）是以海南省人民政府为建设主体，以上海交通大学医学院附属瑞金医院为输出医院，以海南省人民医院为依托医院，其建设目标为打造成为海南省国家区域医疗中心。',
          departments: [
            '国家区域医疗中心',
            '疑难重症诊疗部',
            '多学科会诊中心'
          ]
        },
        {
          id: 3,
          image: '/assets/hospital3.jpg',
          title: '四川大学华西乐城医院',
          desc: '四川大学华西乐城医院项目是四川大学、海南控股、乐城管理局合作共建、中建一局承建的自贸港前沿医学医教研一体化重点项目。项目建成后，四川大学华西乐城医院将成为乐城先行区又一集医疗、教学和科研为一体的综合性医院。',
          departments: [
            '医教研一体化中心',
            '前沿医学研究部',
            '综合诊疗中心'
          ]
        },
        {
          id: 4,
          image: '/assets/hospital4.jpg',
          title: '博鳌超级医院',
          desc: '海南博鳌鲁医医院，由山东省医学会联合银丰集团设立，为鲁琼医疗合作重点引进项目，也是乐城先行区首批重点对接项目，是一所集医疗、科研、预防、康复为一体的三级非营利性综合医院。',
          departments: [
            '鲁琼医疗合作中心',
            '综合康复科',
            '临床科研部'
          ]
        },
        {
          id: 5,
          image: '/assets/hospital5.jpg',
          title: '中国干细胞集团海南博鳌干细胞附属医院',
          desc: '国家卫健委批准执业的三级医院，属于医疗机构的最高等级，是海南省医保定点单位。医院按照JCI国际标准建设，致力于干细胞治疗和再生医学临床转化，被公认为国内规模最大、技术最先进的干细胞医院。',
          departments: [
            '干细胞治疗中心',
            '再生医学部',
            'JCI标准护理部'
          ]
        },
        {
          id: 6,
          image: '/assets/hospital6.jpg',
          title: '上海中医药大学博鳌国际医院',
          desc: '博鳌国际医院是一家集医、教、研、抗衰、康养为一体的三级综合型医院。医院占地81.2亩，建筑面积65000平，核定病床数560张。医院秉持“创新、开拓、惠民、卓越”的理念和“客户至上，临床导向，技术创新，特色发展”的宗旨，树立“助力全民健康，让生命更精彩”的共同价值观。',
          departments: [
            '抗衰老中心',
            '中西医结合科',
            '健康管理中心'
          ]
        },
        {
          id: 7,
          image: '/assets/hospital7.jpg',
          title: '海南医科大学第一附属医院乐城医院',
          desc: '慈铭博鳌国际医院是先行区内首家公私合营特许经营的示范医院。是汇聚知名医疗专家、新特药械绿通及消费医疗包括抗衰及辅助生殖等中国新名片的三级综合医院。',
          departments: [
            '辅助生殖中心',
            '抗衰老医学部',
            '特需医疗部'
          ]
        },
        {
          id: 8,
          image: '/assets/hospital8.jpg',
          title: '树兰医院',
          desc: '树兰（博鳌）医院隶属于树兰医疗集团，按照三级甲等标准筹备建造，采取“一个共享医院（平台）+若干个临床医学中心”的“1+X”共享医院模式进行运营，旨在成为一个以肝病、肿瘤、罕见病、抗衰老治疗及高端康复服务为重点的综合医院。',
          departments: [
            '肝病诊疗中心',
            '肿瘤精准治疗科',
            '罕见病研究所'
          ]
        },
        {
          id: 9,
          image: '/assets/hospital9.jpg',
          title: '博鳌恒大国际医院',
          desc: '博鳌恒大国际医院于2018年2月28日正式开业运营，是经海南省卫健委批复成立的三级肿瘤专科医院，医院严格参照国际JCI认证标准规划设计建设。',
          departments: [
            '肿瘤放射治疗中心',
            'JCI标准护理部',
            '国际医疗部'
          ]
        },
        {
          id: 10,
          image: '/assets/hospital10.jpg',
          title: '海南启研干细胞抗衰老医院',
          desc: '海南启研医院以再生医学、功能医学为核心技术，在特许医疗、健康管理、医学美容和抗衰老、第三方医学检测四个方面与国际领先的医疗机构合作，开展高端抗衰服务业务、培训交流，提供精准医疗、个体化、全面健康管理。',
          departments: [
            '功能医学中心',
            '精准医疗部',
            '高端抗衰中心'
          ]
        }
      ],
      expert: [
        {
          id: 1,
          image: "/assets/chenlin.jpg",
          title: "陈霖院士",
          items: [
            "中国科学院院士",
            "第三世界科学院院士",
            "中国科学院生物物理研究所研究员"
          ],
          specialty: "认知科学和实验心理学，视觉认知和脑成像"
        },
        {
          id: 2,
          image: "/assets/chenxiangmei.jpg",
          title: "陈香美院士",
          items: [
            "中国工程院院士",
            "解放军总医院肾病专科医院院长",
            "中华医学会理事",
            "中华肾脏病学会主任委员"
          ],
          specialty: "疑难肾病的诊治，延缓慢性肾病发展"
        },
        {
          id: 3,
          image: '/assets/dongjiahong.jpg',
          title: '董家鸿院士',
          items: ['现任清华大学临床医学院院长', '清华大学精准医学研究院院长，', '清华大学附属北京清华长庚医院执行院长'],
          specialty: '开设肝胆胰肿瘤临床医学中心。专注肝胆外科手术中定位、定量、定构和精控，提升了肝脏肿瘤、胆道肿瘤、肝胆管结石症、肝内胆管扩张症、终末期肝胆病等复杂肝胆病的外科治疗。'
        },
        {
          id: 4,
          image: '/assets/gejunbo.jpg',
          title: '葛均波院士',
          items: [
            '复旦大学附属中山医院心内科主任',
            '上海市心血管临床医学中心主任',
            '上海市心血管病研究所所长',
            '中华医学会心血管病分会主任委员',
            '中国心血管健康联盟主席',
            '美国心血管造影和介入学会理事会理事',
            '美国心脏病学会国际顾问'
          ],
          specialty: "开设心血管疾病临床研究中心。开展心血管造影、心脏支架手术及介入治疗，致力于心血管疑难疾病的研究等"
        },
        {
          id: 5,
          image: '/assets/guying.jpg',
          title: '顾瑛院士',
          specialty: '靶向光动力治疗肿瘤和血管性疾病，外科、妇科和皮肤科疾病激光治疗，弱激光治疗退行性、神经性等疾病。17.阮长耿院士  中国工程院院士，血液学专家，苏州大学附属第一医院江苏省血液研究所所长，卫生部血栓与止血重点实验室主任，苏州大学附属第一医院教授、主任医师、博士生导师，同济大学名誉教授。',
          items: [
            '中国科学院院士',
            '激光医学专家',
            '博士生导师'
          ]
        },
        {
          id: 6,
          image: '/assets/handemin.jpg',
          title: '韩德民院士',
          specialty: '开设耳鼻咽喉临床医学中心。开展头颈部肿瘤生物治疗及综合治疗、耳鼻咽喉科内窥镜诊断与治疗，尤其擅长慢性副鼻窦炎、鼻息肉以及疑难病的内窥镜手术、激光手术等及呼吸暂停综合诊治、重度感音神经性聋（人工电子耳蜗植入术）的诊治。',
          items: [
            '中国工程院院士',
            '首都医科大学耳鼻咽喉科学院院长',
            '世界华人耳鼻咽喉头颈外科理事会理事长',
            '世界卫生组织(WHO)防聋合作中心主任'
          ]
        },
        {
          id: 7,
          image: '/assets/lilanjuan.jpg',
          title: '李兰娟院士',
          specialty: '传染病诊治国家重点实验室主任，感染性疾病诊治协同创新中心主任，国家感染性疾病临床医学研究中心主任，树兰医疗发起人。兼任教育部科技委生物与医学学部主任，“艾滋病和病毒性肝炎等重大传染病防治”科技重大专项 “十三五”计划技术副总师，“综合防治示范区和现场研究”责任专家组组长，国家卫生和计划生育委员会第一届人口健康信息化专家咨询委员会主任。',
          items: [
            '中国工程院院士',
            '浙江大学教授',
            '主任医师',
            '博士生导师',
          ]
        },
        {
          id: 8,
          image: '/assets/lizhaoshen.jpg',
          title: '李兆申院士',
          specialty: '开设消化系统疾病诊治中心。开展消化系统疾病诊治，主要围绕急性胰腺炎、慢性胰腺炎和胰腺肿瘤等胰腺疾病开展综合诊疗，聚焦食管癌、胃癌和结直肠癌等消化道肿瘤开展微创诊治，开展消化内镜新技术转化应用。',
          items: [
            '海军军医大学长海医院消化内科主任',
            '国家消化病临床医学研究中心主任',
            '中国医师协会常务理事',
            '内镜医师分会会长',
            '胰腺病学专委会主委',
          ]
        },
        {
          id: 9,
          image: '/assets/ningguang.png',
          title: '宁光院士',
          specialty: '开设内分泌代谢病临床医学中心。开展内分泌代谢病疑难杂症，包括难治性糖尿病血糖控制和糖尿病并发症，及内分泌肿瘤及糖尿病科研工作。',
          items: [
            '国家代谢性疾病临床研究中心主任',
            '国家卫计委内分泌代谢病重点实验室主任',
            '上海交通大学医学院附属瑞金医院副院长'
          ]
        },
        {
          id: 10,
          image: '/assets/wangchen.jpg',
          title: '王晨院士',
          specialty: '开设呼吸疾病临床医学中心。开展肺栓塞与肺动脉高压、新发呼吸道传染病、慢性阻塞性肺疾病、烟草病学等领域的医教研工作。',
          items: [
            '北京协和医学院院校长',
            '国家呼吸疾病临床研究中心主任',
            '世界卫生组织戒烟与呼吸疾病预防合作中心主任'
          ]
        },
        {
          id: 11,
          image: '/assets/wangfusheng.jpg',
          title: '王福生院士',
          specialty: '感染免疫；免疫治疗',
          items: [
            '中国科学院院士',
            '解放军总医院第五医学中心感染病诊疗与研究中心主任',
            '国家感染性疾病临床医学研究中心主任',
            '主任医师',
            '博士生导师',
          ]
        },
        {
          id: 12,
          image: '/assets/yumengsun.jpg',
          title: '俞梦孙院士',
          specialty: '',
          items: [
            '中国工程院院士',
            '中国人民解放军空军军医大学空军航空医学研究所航空医学工程研究中心主任',
            '博士生导师'
          ]
        },
        {
          id: 13,
          image: '/assets/zhangzhiyuan.jpg',
          title: '张志愿院士',
          specialty: '开设口腔颌面外科临床医学中心。开展口腔颌面部与头颈部肿瘤的诊治，尤其擅长口腔颌面部晚期恶性肿瘤侵犯颅底的颅颌面联合切除术、侵犯颈动脉的颈动脉移植术以及口腔颌面头颈部血管瘤、大型血管畸形的诊断和手术治疗等。',
          items: [
            '中国抗癌协会头颈肿瘤专业委员会名誉主委',
            '国际牙科研究会中国分会主席',
          ]
        },
        {
          id: 14,
          image: '/assets/zhaojizong.jpg',
          title: '赵继宗院士',
          specialty: '在国内率先建立具有国际先进水平的微创神经外科技术平台，将神经外科手术从脑解剖结构保护提升到脑功能保护，推动我国神经外科学迅速达到国际水准。临床与基础研究的重大贡献是推动了我国脑卒中临床救治和实验研究，是中国卒中学会发起人和主要推动者，促使我国脑卒中患者群体的高致残、高死亡现状趋于及时、科学、高效地得到合理治疗和康复。',
          items: [
            '中国科学院院士',
            '首都医科大学附属北京天坛医院神经外科学系教授',
            '博士生导师',
            '主任医师',
            '首都医科大学神经外科学院院长',
            '国家神经性疾病临床医学研究中心主任',
            '首都医科大学附属北京天坛医院神经外科学系主任',
            '旅美学者,享受政府特殊津贴',
            '中华医学会神经外科分会第四、五届主任委员',
            '中国脑卒中学会会长',
            '世界神经外科联盟执委',
            'Dandy神经外科学会中国主委',
            'Chinese Neurosurgical Journal杂志主编',
          ]
        },
        {
          id: 15,
          image: '/assets/zhengshusen.jpg',
          title: '郑树森院士',
          specialty: '',
          items: [
            '中国工程院院士',
            '法国国家医学科学院外籍院士',
            '浙江大学外科学教授',
            '博士生导师',
            '卫生部多器官联合移植研究重点实验室主任',
            '浙江大学学术委员会副主任',
            '浙江大学器官移植研究所所长',
            '浙江大学附属第一医院学术委员会主任',
            '肝胆胰外科中心主任',
            '树兰医疗总院院长',
            '浙江树人大学树兰国际医学院院长',
            '中华医学会副会长、中国医师协会副会长、中国医师协会器官移植医师分会会长、活体器官移植专业委员会主任委员',
            '中国研究型医院协会社会办医分会会长',
            '中国医师协会住院医师规范化培训外科专业委员会主任委员',
            '浙江省医学会外科学分会主任委员、浙江省医学会器官移植学分会主任委员',
          ]
        }
      ],
      technology: [
        {
          id: 1,
          image: '/assets/tech1.jpg',
          title: '质子治疗系统',
          desc: '...',
          parameters: '误差<1mm，能量范围70-250MeV',
          cases: '已治疗2000+肿瘤病例'
        }
      ]
    };

    const detail = mockData[type].find(item => item.id === id);
    this.setData({
      type,
      detailData: detail,
      navTitle: this.getNavTitle(type)
    });
  },

  getNavTitle(type: string) {
    const titles = {
      hospital: '合作医院',
      expert: '院士专家',
      technology: '先进技术'
    };
    return titles[type];
  }
});