export const academyContact = {
  phone: "+60 17-243 4167",
  whatsappNumber: "60172434167", // 017-243-4167 formatted for wa.me
  address: "B-19-03, A'marine condominium, Sunway South Quay, 47500, Subang Jaya, Selangor",
  wazeUrl: "https://www.waze.com/ul?q=A'marine%20condominium%20Sunway%20South%20Quay",
  googleMapsUrl: "https://maps.google.com/?q=A'marine+condominium+Sunway+South+Quay+Subang+Jaya",
  operatingHours: "Mon - Fri: 14:00 - 21:30 | Sat - Sun: 09:30 - 18:30"
};

export const tutorsData = [
  {
    id: "tina-lee",
    name: {
      ko: "티나 리 (Tina Lee)",
      en: "Ms. Tina Lee",
      zh: "李老师 (Tina Lee)"
    },
    subject: {
      ko: "수학 & 영어 올인원 (1:1 집중 지도)",
      en: "Mathematics & English (1:1 Mentorship)",
      zh: "数学与英语双科 (1对1精准教学)"
    },
    experience: "1:1 집중 개별 맞춤 지도",
    education: "The School of the Art Institute of Chicago (SAIC) 대학교 인테리어 B.A 졸업 | 홍익대학교 대학원 실내건축학과 졸업",
    educationList: [
      "The School of the Art Institute of Chicago (SAIC) 대학교 인테리어 B.A 졸업",
      "홍익대학교 대학원 실내건축학과 졸업"
    ],
    color: "from-blue-600 via-indigo-600 to-amber-500",
    badgeColor: "bg-blue-100 text-blue-800",
    avatar: "/tina-lee.jpg",
    specialties: [
      "1:1 맞춤형 수학 (Cambridge IGCSE 0580/0606, Checkpoint)",
      "1:1 맞춤형 영어 (First/Second Language 0500, Essay & Grammar)",
      "입체적 사고 기반 문제 해결력 코칭",
      "말레이시아 국제학교(Sunway, Taylor's, ISKL, GIS 등) 내신 & 시험 대비"
    ],
    schedule: [
      { day: "Mon", date: "Oct 19", slots: [{ time: "16:00 - 18:00", available: true }, { time: "19:00 - 21:00", available: false }] },
      { day: "Tue", date: "Oct 20", slots: [{ time: "16:00 - 18:00", available: false }, { time: "19:00 - 21:00", available: true }] },
      { day: "Wed", date: "Oct 21", slots: [{ time: "16:00 - 18:00", available: true }, { time: "19:00 - 21:00", available: true }] },
      { day: "Thu", date: "Oct 22", slots: [{ time: "16:00 - 18:00", available: false }, { time: "19:00 - 21:00", available: false }] },
      { day: "Fri", date: "Oct 23", slots: [{ time: "16:00 - 18:00", available: true }, { time: "19:00 - 21:00", available: true }] },
      { day: "Sat", date: "Oct 24", slots: [{ time: "10:00 - 12:00", available: true }, { time: "14:00 - 16:00", available: false }, { time: "16:30 - 18:30", available: true }] },
      { day: "Sun", date: "Oct 25", slots: [{ time: "10:00 - 12:00", available: true }, { time: "14:00 - 16:00", available: true }] }
    ]
  }
];

export const initialWorkshops = [
  {
    id: "ws-1",
    title: {
      ko: "IGCSE Additional Mathematics 핵심 미적분 & 벡터 3일 마스터",
      en: "IGCSE Add-Math Calculus & Vectors 3-Day Intensive",
      zh: "IGCSE 高等数学（微积分与向量）3天高分特训"
    },
    tutor: "Tina Lee",
    subject: "Math",
    grade: "Year 10 - 11",
    dates: "Nov 15 - Nov 17 (3 Days)",
    time: "10:00 - 13:00 (Total 9 Hours)",
    fee: "RM 540",
    seatsTotal: 2,
    seatsLeft: 1,
    status: "few",
    tags: ["IGCSE 0606", "Calculus", "Past Paper Drill"]
  },
  {
    id: "ws-2",
    title: {
      ko: "IGCSE English 0500 Paper 1 만점 대비 독해 & 요약 마스터",
      en: "IGCSE English 0500 Paper 1 Reading & Summary Masterclass",
      zh: "IGCSE 英语第一语言 0500 卷一高分阅读与精炼概括专项"
    },
    tutor: "Tina Lee",
    subject: "English",
    grade: "Year 10 - 11",
    dates: "Nov 22 - Nov 24 (3 Days)",
    time: "14:00 - 17:00 (Total 9 Hours)",
    fee: "RM 540",
    seatsTotal: 2,
    seatsLeft: 2,
    status: "open",
    tags: ["IGCSE 0500", "Paper 1", "Summary Writing"]
  },
  {
    id: "ws-3",
    title: {
      ko: "Year 7-9 기초 대수학(Algebra) & 워드 프라블럼 정복반",
      en: "KS3 Algebra & Word Problem Mastery for Year 7-9",
      zh: "7-9年级 基础代数与应用题专项突破班"
    },
    tutor: "Tina Lee",
    subject: "Math",
    grade: "Year 7 - 9",
    dates: "Dec 01 - Dec 03",
    time: "11:00 - 13:30 (Total 7.5 Hours)",
    fee: "RM 450",
    seatsTotal: 2,
    seatsLeft: 0,
    status: "full",
    tags: ["KS3 Checkpoint", "Algebra", "Problem Solving"]
  }
];

export const studyDriveMaterials = {
  monthlyPasscode: "OCT2026",
  driveRootUrl: "https://drive.google.com/drive/folders/example_tina_academy_portal",
  categories: [
    {
      id: "ks3",
      gradeLabel: {
        ko: "Year 7 - 9 (중등 기초 / Key Stage 3)",
        en: "Year 7 - 9 (Lower Secondary / KS3)",
        zh: "7 - 9 年级 (初中部 / KS3)"
      },
      folders: [
        {
          name: "Year 7-9 Cambridge Math Checkpoint Past Papers (2018-2025)",
          type: "PDF Archive",
          size: "48 MB",
          subject: "Math",
          driveLink: "https://drive.google.com/drive/folders/demo_ks3_math"
        },
        {
          name: "KS3 English Essential Vocabulary & Grammar Drill Book",
          type: "PDF / Worksheet",
          size: "18 MB",
          subject: "English",
          driveLink: "https://drive.google.com/drive/folders/demo_ks3_english"
        }
      ]
    },
    {
      id: "igcse",
      gradeLabel: {
        ko: "Year 10 - 11 (IGCSE 대비반)",
        en: "Year 10 - 11 (IGCSE Exam Preparation)",
        zh: "10 - 11 年级 (IGCSE 冲刺班)"
      },
      folders: [
        {
          name: "IGCSE Math 0580 Classified Past Papers by Topic (2019-2025)",
          type: "Folder",
          size: "120 MB",
          subject: "Math",
          driveLink: "https://drive.google.com/drive/folders/demo_igcse_0580"
        },
        {
          name: "IGCSE Add-Math 0606 Formula Sheet & Step-by-Step Solutions",
          type: "PDF Guide",
          size: "34 MB",
          subject: "Math",
          driveLink: "https://drive.google.com/drive/folders/demo_igcse_0606"
        },
        {
          name: "IGCSE English 0500 Model Essays (Grade 9 / A* Exemplars)",
          type: "Curated PDF",
          size: "25 MB",
          subject: "English",
          driveLink: "https://drive.google.com/drive/folders/demo_igcse_0500"
        }
      ]
    },
    {
      id: "alevel",
      gradeLabel: {
        ko: "Year 12 - 13 (A-Level / IBDP 고등)",
        en: "Year 12 - 13 (A-Level / IBDP Senior)",
        zh: "12 - 13 年级 (A-Level / IB 高中部)"
      },
      folders: [
        {
          name: "A-Level Pure Mathematics P1 & P3 Complete Revision Pack",
          type: "Archive",
          size: "85 MB",
          subject: "Math",
          driveLink: "https://drive.google.com/drive/folders/demo_alevel_pure"
        },
        {
          name: "A-Level English Literature Analytical Essay Structure Guide",
          type: "PDF Document",
          size: "14 MB",
          subject: "English",
          driveLink: "https://drive.google.com/drive/folders/demo_alevel_lit"
        }
      ]
    }
  ]
};

export const chatbotPresets = [
  {
    id: "location",
    trigger: "location",
    label: {
      ko: "📍 위치 및 오시는 길 (A'marine 콘도)",
      en: "📍 Location (A'marine South Quay)",
      zh: "📍 授课地点 (A'marine 公寓)"
    },
    response: {
      ko: "수업은 슬랑오르 수방자야 선웨이 사우스키의 **A'marine condominium (Unit B-19-03)**에서 진행됩니다.\n• 주소: B-19-03, A'marine condominium, Sunway South Quay, 47500, Subang Jaya, Selangor\n• Sunway University, Sunway International School(SIS), Taylor's Lakeside 캠퍼스 바로 인근입니다.\n• Waze나 Google Maps에서 'A'marine condominium'을 검색하시면 편하게 오실 수 있습니다.",
      en: "Sessions are conducted at **Unit B-19-03, A'marine condominium, Sunway South Quay, Subang Jaya, Selangor**.\n• Strategically located right next to Sunway International School (SIS), Sunway University, and Taylor's Lakeside.\n• Search 'A'marine condominium' on Waze or Google Maps for exact navigation.",
      zh: "课业辅导地点位于雪兰莪梳邦再也双威南湖 **A'marine condominium (Unit B-19-03)**。\n• 地址：B-19-03, A'marine condominium, Sunway South Quay, 47500, Subang Jaya, Selangor\n• 邻近双威国际学校 (SIS)、双威大学及泰莱大学湖畔校区。\n• 在 Waze 或 Google Maps 搜索 'A'marine condominium' 即可直达。"
    }
  },
  {
    id: "parking",
    trigger: "parking",
    label: {
      ko: "🚗 방문객 주차 안내",
      en: "🚗 Visitor Parking Guide",
      zh: "🚗 访客停车指南"
    },
    response: {
      ko: "A'marine condominium 정문 경비실에 방문객(Visitor) 주차 공간이 마련되어 있습니다.\n• **출입 절차**: 가드하우스(Guardhouse)에서 **B-19-03호 방문**이라고 말씀하시고 운전면허증/신분증 등록 후 방문객 주차 구역에 주차하시면 됩니다.\n• 수업 시작 전 미리 도착하시면 편안하게 주차 후 올라오실 수 있습니다.",
      en: "Designated visitor parking is provided inside A'marine condominium.\n• **Entry Procedure**: Inform the security guardhouse that you are visiting **Unit B-19-03**, register your driving license/ID, and park in designated visitor bays.\n• Ample and secure parking ensures smooth drop-offs and pick-ups.",
      zh: "A'marine 公寓配备安全规范的访客（Visitor）停车位。\n• **入闸流程**：在公寓大门警卫室说明拜访 **B-19-03 单元**，登记驾驶证件后即可驶入访客停车区停车。\n• 门禁严格，环境安静安全，方便家长接送。"
    }
  },
  {
    id: "tuition",
    trigger: "tuition",
    label: {
      ko: "💰 1:1 수업료 및 진행 방식",
      en: "💰 1:1 Tuition Fees & Format",
      zh: "💰 1对1 学费与课时安排"
    },
    response: {
      ko: "Tina 선생님의 수업은 **100% 1:1 단독 밀착 지도**로 진행됩니다.\n• **수업료**: 1회(90분) 기준 RM 250 (학년 및 커리큘럼별 협의)\n• **수업 횟수**: 주 1회 또는 주 2회 고정 스케줄로 협의 진행됩니다.\n• **특징**: 학생의 현재 학교 진도, 취약 단원, 성향을 철저히 분석하여 SAIC 및 홍익대 대학원 출신 Tina 선생님의 입체적이고 꼼꼼한 지도로 성적 향상을 이끕니다.",
      en: "Classes are strictly conducted on a **100% personalized 1:1 private basis**.\n• **Tuition per 90-min Session**: RM 250 (tailored to grade level & curriculum)\n• **Frequency**: Typically 1 to 2 dedicated sessions per week.\n• **Approach**: Tailored to student's exact school syllabus (Cambridge Checkpoint, IGCSE, IB) with structural clarity and critical thinking drills.",
      zh: "所有课程均由 Tina 老师进行 **100% 专属 1对1 定制授课**。\n• **课时费（每节90分钟）**：RM 250（根据年级与大纲定制）\n• **授课频次**：通常为每周 1~2 次固定时间段。\n• **特色**：根据国际学校真实学情，运用系统化逻辑与批判性思维引导，直击考点与难点。"
    }
  },
  {
    id: "testinfo",
    trigger: "testinfo",
    label: {
      ko: "📝 1:1 진단 테스트 절차",
      en: "📝 1:1 Diagnostic Test Info",
      zh: "📝 1对1 诊断测评流程"
    },
    response: {
      ko: "수업 시작 전 학생의 현재 개념 이해도와 영어/수학 취약점을 정밀 진단하는 1:1 테스트를 진행합니다.\n• **응시료**: RM 60 (신용카드 또는 Touch 'n Go로 사전 결제)\n• **소요 시간**: 약 60분 (A'marine 콘도 대면 또는 필요 시 온라인 Zoom)\n• **결과 상담**: 테스트 후 24시간 이내 Tina 선생님이 직접 학부모님께 1:1 심층 분석 리포트와 향후 커리큘럼 로드맵을 브리핑해 드립니다.",
      en: "A 60-minute diagnostic assessment is held before commencement to evaluate exact fundamentals.\n• **Fee**: RM 60 (Payable online via Touch 'n Go eWallet or Card)\n• **Duration**: ~60 minutes (In-person at A'marine South Quay or via Zoom)\n• **Feedback**: Comprehensive 1:1 diagnostic analysis report provided by Tina within 24 hours.",
      zh: "正式上课前进行 60 分钟 1对1 诊断性学情测评。\n• **费用**：RM 60（支持 Touch 'n Go 或银行卡在线支付）\n• **时长**：约 60 分钟（A'marine 公寓线下或线上 Zoom）\n• **学情反馈**：测评后 24 小时内由 Tina 老师亲自为家长进行一对一深度学情诊断与提分规划。"
    }
  }
];
