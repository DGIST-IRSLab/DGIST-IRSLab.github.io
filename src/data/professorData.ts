/**
 * ============================================================================
 * [데이터 파일 가이드: 연구책임자 / 교수님 프로필 (P.I Profile)]
 * ============================================================================
 * 이 파일은 상단 메뉴의 'P.I' 전용 상세 페이지(/pi)에 렌더링되는
 * 최재호 교수님의 모든 상세 정보(약력, 학력, 연구과제, 학술봉사, 초청강연)를 관리합니다.
 *
 * ----------------------------------------------------------------------------
 * ■ 주요 항목 및 필드 설명
 * ----------------------------------------------------------------------------
 * 1. 기본 프로필 정보:
 *    - name / nameKr: 영문명 ("Jae-Ho Choi, Ph.D.") / 한글명 ("최재호")
 *    - title: 직위 ("Assistant Professor")
 *    - department / institution: 소속 학과 및 기관명
 *    - address / email / phone: 연구실 위치, 이메일, 전화번호
 *    - photo: 교수님 증명사진 경로 (예: '/images/teampic/standard/Jaeho2.jpg')
 *    - cvUrl, googleScholar, linkedin: 외부 프로필 링크 URL
 *    - bio: 교수님 공식 소개글 (영문 문단)
 *
 * 2. experience (경력 사항 배열):
 *    - role: 직책 (예: 'Assistant Professor', 'Postdoctoral Scholar')
 *    - organization: 소속 기관 (예: 'DGIST (EECS & AI)', 'Stanford University (EE)')
 *    - period: 재직 기간 (예: '2024.12 – Present')
 *    - detail: 세부 설명 (연구 내용, 지도 교수 등)
 *
 * 3. education (학력 사항 배열):
 *    - degree: 학위 구분 ('Ph.D.', 'M.S.', 'B.S.')
 *    - field: 전공 분야 ('Electrical Engineering', 'Computer Science')
 *    - institution: 졸업 학교 ('POSTECH', 'Korea University')
 *    - period: 재학 기간 ('2019.02 – 2023.02')
 *    - advisor: 지도교수님 정보 (선택)
 *
 * 4. projects (수행 중인 연구과제 목록 - ProfessorProject):
 *    - id: 과제 고유 식별자 (예: 'iitp-2026')
 *    - title: 과제 정식 명칭 (한글 또는 영문)
 *    - agency: 지원 기관 풀네임 (예: 'IITP (Institute of ...)')
 *    - agencyBadge: 배지에 노출될 기관 약칭 (예: 'IITP', 'NRF', 'ADD', 'KIOST', 'MSIT')
 *    - period: 당해 단계 또는 총 연구 기간 (예: '2026.04 ~ 2028.12')
 *    - totalPeriod (선택): 총 사업 기간이 따로 있을 경우 명시
 *    - role (선택): 수행 역할 (예: 'Principal Investigator', 'Participating PI')
 *
 * 5. academicService (학술 봉사 활동):
 *    - areaChair: Area Chair 활동 학회 목록 (예: ["NeurIPS’26"])
 *    - tpc: TPC 위원 활동 학회 목록 (예: ["AAAI’26"])
 *    - reviewerConferences: 논문 심사위원(Reviewer)으로 참여한 국제학회 목록
 *    - reviewerJournals: 논문 심사위원으로 참여한 국제저널(IEEE TPAMI, TIP 등) 목록
 *
 * 6. invitedTalks (초청 강연 목록):
 *    - title: 발표/강연 제목
 *    - venue: 강연 장소 및 학술 행사명
 *    - date: 강연 년월 ('YYYY.MM')
 *
 * ----------------------------------------------------------------------------
 * ■ 새로운 연구과제 추가 템플릿 (projects 배열에 추가)
 * ----------------------------------------------------------------------------
 * {
 *   id: "nrf-2027",
 *   title: "연구과제 제목을 입력하세요",
 *   agency: "NRF (National Research Foundation of Korea)",
 *   agencyBadge: "NRF",
 *   period: "2027.01 ~ 2029.12",
 *   role: "Principal Investigator"
 * },
 * ============================================================================
 */

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
      title: "신진연구-유형B(다중 주파수, 다중 변조, 다중 환경 통합 학습 기반 레이더 파운데이션 모델 연구)",
      agency: "NRF (National Research Foundation of Korea)",
      agencyBadge: "NRF",
      period: "2026.03 ~ 2031.02",
      role: "Principal Investigator"
    },
    {
      id: "add-moonshot-2025",
      title: "룬샷프로젝트(Physical AI 기반 고속 군집 자폭 무인수상정 대응 체계 연구)",
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
      title: "InnoCore(LLM 2.0: Inference Enhancement, Domain Specialization, Multimodal Expansion, and Trustworthy AI)",
      agency: "MSIT (Ministry of Science and ICT)",
      agencyBadge: "MSIT",
      period: "2025.07 ~ 2029.12",
      role: "Co-Investigator / Participating PI"
    },
    {
      id: "msit-innocore-bio-2025",
      title: "InnoCore(Trust-Enhanced Mutualistic Bio-Embedded AI)",
      agency: "MSIT (Ministry of Science and ICT)",
      agencyBadge: "MSIT",
      period: "2025.07 ~ 2029.12",
      role: "Co-Investigator / Participating PI"
    },
    {
      id: "msit-star-2025",
      title: "AI Starfellowship",
      agency: "MSIT (Ministry of Science and ICT)",
      agencyBadge: "MSIT",
      period: "2025.04 ~ 2030.12",
      role: "Fellow / Principal Investigator"
    },
    {
      id: "dgist-startup-2025",
      title: "DGIST Start-Up Grant",
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
      "CVPR, ICCV, ECCV, NeurIPS, AAAI, BMVC, WACV etc."
    ],
    reviewerJournals: [
      "IEEE TPAMI, IEEE TIP, IEEE IoTJ, IEEE SensJ, IEEE TMC, IEEE TGRS, IEEE TMTT, IEEE TAES, IEEE SPL, etc."
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
      venue: "한국해양과학기술원",
      date: "2025.12"
    },
    {
      title: "RF-Integrated Multimodal AI",
      venue: "대한전자공학회 영상이해/영상처리 연구회",
      date: "2025.07"
    },
    {
      title: "Radio+AI: Wireless Perception beyond Human Vision",
      venue: "DGIST-EECS/AI",
      date: "2025.05"
    },
    {
      title: "Radio+AI: Wireless Perception beyond Human Vision",
      venue: "POSTECH-EE",
      date: "2025.05"
    },
    {
      title: "Fusion of target and shadow regions for improved SAR ATR",
      venue: "차세대 국방융합기술 연구센터",
      date: "2021.07"
    }
  ] as InvitedTalk[]
};
