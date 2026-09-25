export interface ProfessorProject {
  id: string;
  title: string;
  titleEn?: string;
  agency: string;
  agencyBadge: string;
  period: string;
  totalPeriod?: string;
  role?: string;
}

export interface InvitedTalk {
  title: string;
  venue: string;
  date: string;
}

export interface AcademicService {
  areaChair: string[];
  tpc: string[];
  reviewerConferences: string[];
  reviewerJournals: string[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  detail?: string;
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  period: string;
  advisor?: string;
}

export const professorData = {
  name: "Jae-Ho Choi, Ph.D.",
  nameKr: "최재호",
  title: "Assistant Professor",
  department: "Department of Electrical Engineering and Computer Science (EECS) & Department of Interdisciplinary Studies of Artificial Intelligence (AI)",
  institution: "DGIST (Daegu Gyeongbuk Institute of Science and Technology)",
  address: "Room 406, Engineering Building E3, 333 Techno Jungang-daero, Hyeonpung-eup, Dalseong-gun, Daegu 42988, Republic of Korea",
  email: "jhochoi@dgist.ac.kr",
  phone: "+82-53-785-6328",
  photo: "/images/teampic/standard/Jaeho2.jpg",
  cvUrl: "https://www.overleaf.com/read/yjhfmgxbrmgm#925bd3",
  googleScholar: "https://scholar.google.com/citations?user=ywDewK4AAAAJ&hl=en",
  linkedin: "https://www.linkedin.com/in/gogoho88",

  bio: "I am an Assistant Professor at Department of Electrical Engineering and Computer Science (EECS) and Department of Interdisciplinary Studies of Artificial Intelligence (AI), DGIST, Daegu, Korea, since 2024. From 2023 to 2024, I was a Postdoctoral Scholar in Department of Electrical Engineering (advised by Prof. Amin Arbabian) at Stanford University, Stanford, CA, US. I received the M.S. and Ph.D. degree in Electrical Engineering from POSTECH (advised by Prof. Kyung-Tae Kim), Pohang, Korea, in 2019 and 2023, respectively. I completed the B.S. degree in Computer Science from Korea University, Seoul, Korea, in 2017.",

  experience: [
    {
      role: "Assistant Professor",
      organization: "DGIST (EECS & AI)",
      period: "2024.12 – Present",
      detail: "Principal Investigator of Intelligent Radio Sensing Laboratory"
    },
    {
      role: "Postdoctoral Scholar",
      organization: "Stanford University (EE)",
      period: "2023.04 – 2024.10",
      detail: "Advised by Prof. Amin Arbabian (Arbabian Lab)"
    },
    {
      role: "Postdoctoral Researcher",
      organization: "POSTECH (Next-Gen. Defense Tech. Research Center)",
      period: "2023.02 – 2023.03",
      detail: "Radar Signal Processing & Defense Remote Sensing"
    },
    {
      role: "Intern",
      organization: "Samsung Electronics (Memory Division)",
      period: "2016.06 – 2016.09",
      detail: "Semiconductor Memory Systems"
    }
  ] as ExperienceItem[],

  education: [
    {
      degree: "Ph.D.",
      field: "Electrical Engineering",
      institution: "POSTECH",
      period: "2019.02 – 2023.02",
      advisor: "Advised by Prof. Kyung-Tae Kim (IRAS Lab)"
    },
    {
      degree: "M.S.",
      field: "Electrical Engineering",
      institution: "POSTECH",
      period: "2017.02 – 2019.02",
      advisor: "Advised by Prof. Kyung-Tae Kim (IRAS Lab)"
    },
    {
      degree: "B.S.",
      field: "Computer Science",
      institution: "Korea University",
      period: "2011.03 – 2017.02"
    }
  ] as EducationItem[],

  researchInterests: [
    {
      title: "Radio+X Perception Technologies",
      description: "Radio or radio+X systems for diverse sensing technologies (e.g., indoor perception, 3D human understanding, and contactless health monitoring)."
    },
    {
      title: "AI for Wireless / Radar",
      description: "Wireless-centric learning representations, data-efficient multimodal learning, complex-valued neural networks, and radar foundation models."
    },
    {
      title: "Defense & Remote Sensing",
      description: "Synthetic aperture radar (SAR) target detection/tracking, micro-Doppler signature analysis, and multi-sensor defense surveillance systems."
    }
  ],

  projects: [
    {
      id: "iitp-2026",
      title: "제조 환경 멀티센서 융합 모델 기반 안전 제약 준수 작업계획 생성 기술 연구_1단계",
      agency: "IITP (Institute of Information & Communications Technology Planning & Evaluation)",
      agencyBadge: "IITP",
      period: "2026.04 ~ 2028.12",
      totalPeriod: "2026.04 ~ 2033.12",
      role: "Principal Investigator"
    },
    {
      id: "kiost-2026",
      title: "해양 마이크로 도플러 기술 기반 AI 수중 감시 시스템 개발",
      agency: "KIOST (Korea Institute of Ocean Science and Technology)",
      agencyBadge: "KIOST",
      period: "2026.04 ~ 2030.12",
      role: "Principal Investigator"
    },
    {
      id: "nrf-typeb-2026",
      title: "신진연구-유형B (다중 주파수, 다중 변조, 다중 환경 통합 학습 기반 레이더 파운데이션 모델 연구)",
      agency: "NRF (National Research Foundation of Korea)",
      agencyBadge: "NRF",
      period: "2026.03 ~ 2031.02",
      role: "Principal Investigator"
    },
    {
      id: "add-moonshot-2025",
      title: "룬샷프로젝트 (Physical AI 기반 고속 군집 자폭 무인수상정 대응 체계 연구)",
      agency: "ADD (Agency for Defense Development)",
      agencyBadge: "ADD",
      period: "2025.12 ~ 2026.11",
      role: "Principal Investigator"
    },
    {
      id: "nrf-seed-2025",
      title: "우수신진연구-씨앗",
      agency: "NRF (National Research Foundation of Korea)",
      agencyBadge: "NRF",
      period: "2025.09 ~ 2026.08",
      role: "Principal Investigator"
    },
    {
      id: "msit-innocore-llm-2025",
      title: "InnoCore (LLM 2.0: Inference Enhancement, Domain Specialization, Multimodal Expansion, and Trustworthy AI)",
      agency: "MSIT (Ministry of Science and ICT)",
      agencyBadge: "MSIT",
      period: "2025.07 ~ 2029.12",
      role: "Co-Investigator / Participating PI"
    },
    {
      id: "msit-innocore-bio-2025",
      title: "InnoCore (Trust-Enhanced Mutualistic Bio-Embedded AI)",
      agency: "MSIT (Ministry of Science and ICT)",
      agencyBadge: "MSIT",
      period: "2025.07 ~ 2029.12",
      role: "Co-Investigator / Participating PI"
    },
    {
      id: "msit-star-2025",
      title: "AI Starfellowship (AI 스타펠로우십사업)",
      agency: "MSIT (Ministry of Science and ICT)",
      agencyBadge: "MSIT",
      period: "2025.04 ~ 2030.12",
      role: "Fellow / Principal Investigator"
    },
    {
      id: "dgist-startup-2025",
      title: "DGIST Start-Up Grant (정착연구지원과제)",
      agency: "DGIST",
      agencyBadge: "DGIST",
      period: "2025.01 ~ 2028.12",
      role: "Principal Investigator"
    }
  ] as ProfessorProject[],

  academicService: {
    areaChair: ["NeurIPS’26"],
    tpc: ["AAAI’26"],
    reviewerConferences: [
      "CVPR", "ICCV", "ECCV", "NeurIPS", "AAAI", "BMVC", "WACV"
    ],
    reviewerJournals: [
      "IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)",
      "IEEE Transactions on Image Processing (TIP)",
      "IEEE Internet of Things Journal (IoTJ)",
      "IEEE Sensors Journal (SensJ)",
      "IEEE Transactions on Mobile Computing (TMC)",
      "IEEE Transactions on Geoscience and Remote Sensing (TGRS)",
      "IEEE Transactions on Microwave Theory and Techniques (TMTT)",
      "IEEE Transactions on Aerospace and Electronic Systems (TAES)",
      "IEEE Signal Processing Letters (SPL)"
    ]
  } as AcademicService,

  invitedTalks: [
    {
      title: "On the Opportunities of Foundational/LLM-Integrated Radar+AI",
      venue: "한국전자파학회 동계학술대회",
      date: "2026.02"
    },
    {
      title: "On the Opportunities of Foundational/LLM-Integrated Radar+AI",
      venue: "RLRC 센터 Seminar",
      date: "2025.12"
    },
    {
      title: "AI-Based Radar/Sonar microDoppler",
      venue: "한국해양과학기술원 (KIOST)",
      date: "2025.12"
    },
    {
      title: "RF-Integrated Multimodal AI",
      venue: "대한전자공학회 영상이해/영상처리 연구회",
      date: "2025.07"
    },
    {
      title: "Radio+AI: Wireless Perception beyond Human Vision",
      venue: "DGIST EECS / AI Colloquium",
      date: "2025.05"
    },
    {
      title: "Radio+AI: Wireless Perception beyond Human Vision",
      venue: "POSTECH EE Seminar",
      date: "2025.05"
    },
    {
      title: "Fusion of target and shadow regions for improved SAR ATR",
      venue: "차세대 국방융합기술 연구센터",
      date: "2021.07"
    }
  ] as InvitedTalk[]
};
