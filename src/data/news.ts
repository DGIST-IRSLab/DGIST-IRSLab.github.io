/**
 * ============================================================================
 * [데이터 파일 가이드: 연구실 소식 및 공지사항 (News & Announcements)]
 * ============================================================================
 * 이 파일은 IRS Lab의 논문 채택, 과제 수주, 멤버 영입, 수상, 학술 활동 등
 * 주요 연구실 소식을 시간 역순(최신순)으로 관리합니다.
 *
 * ----------------------------------------------------------------------------
 * ■ NewsItem 객체의 주요 필드 설명
 * ----------------------------------------------------------------------------
 * - id (필수, string): 뉴스 항목 고유 식별자 (예: 'news-2026-09-award')
 * - date (필수, string): 발생 년월 (권장 형식: 'YYYY.MM', 예: '2026.09')
 * - category (필수, string): 소식 분류 카테고리 (카테고리별 전용 배지 색상 적용)
 *     'PAPER'  : 국제/국내 학술대회 및 저널 논문 채택(Accept) 소식
 *     'AWARD'  : 우수논문상, 학회장상, 표창 등 대내외 수상 실적
 *     'GRANT'  : 정부부처/기관(IITP, NRF, ADD, KIOST 등) 연구과제 선정
 *     'PEOPLE' : 신규 대학원생/연구원/인턴 연구실 합류 소식
 *     'TALK'   : 초청 강연, 세미나 발표, 학술대회 Area Chair 선임 등
 *     'NEWS'   : 연구실 개소식, 행사, 보도자료 등 일반 공지
 * - title (필수, string): 소식의 핵심 제목 (한눈에 파악 가능한 간결한 문장)
 * - description (선택, string): 소식에 대한 상세 부연 설명
 * - link (선택, string): 관련 웹사이트, 보도자료, 논문 링크 URL
 * - highlight (선택, boolean): true 설정 시 홈 화면 및 리스트에서 눈에 띄게 강조됨
 *
 * ----------------------------------------------------------------------------
 * ■ 새로운 소식 추가 템플릿 (배열 맨 위에 최신 순으로 추가)
 * ----------------------------------------------------------------------------
 * {
 *   id: "news-2026-09-sample",
 *   date: "2026.09",
 *   category: "PAPER",
 *   title: "1 Paper Accepted to NeurIPS 2026.",
 *   description: "Our work on multimodal radar foundation models has been accepted to NeurIPS 2026.",
 *   highlight: true
 * },
 * ============================================================================
 */

import type { NewsItem } from '../types';

export const newsItems: NewsItem[] = [
  {
    id: "news-2026-10-members",
    date: "2026.10",
    category: "PEOPLE",
    title: "New Member Joined IRS Lab (Wonbin Yang).",
    description: "Undergraduate researcher Wonbin joined our team. Welcome!"
  },
  {
    id: "news-2026-10-paper",
    date: "2026.10",
    category: "PAPER",
    title: "1 Paper Accepted to IEEE IoTJ.",
    description: "One paper by Dohyun Park has been accepted to IEEE Internet of Things Journal (IoTJ). Congratulations!"
  },
  {
    id: "news-2026-10-award",
    date: "2026.10",
    category: "AWARD",
    title: "Prof. Jae-Ho Choi Selected as Top Area Chair for NeurIPS 2026.",
    description: "Prof. Jae-Ho Choi has been recognized as a Top Area Chair for NeurIPS 2026."
  },
  {
    id: "news-2026-09-paper",
    date: "2026.09",
    category: "PAPER",
    title: "2 Papers Accepted to NeurIPS 2026.",
    description: "Two papers (RadarMAE, mmLIP) by Eunchan Kim, Jeongwan Shin, and Jaehyeon Kim have been accepted to NeurIPS 2026. Congratulations! 🎉"
  },
  {
    id: "news-2026-09-award",
    date: "2026.09",
    category: "AWARD",
    title: "UGRP Team Received the Excellence Award at the 2026 DGIST UGRP Symposium.",
    description: "Jaewon, Junwon, Eunbi, and Seohyeong received the Excellence Award (Top 2) for their project on IQ Wireless Foundation Models. Congratulations! 🏆"
  },
  {
    id: "news-2026-08-award",
    date: "2026.08",
    category: "AWARD",
    title: "Ji-Hyuck Hong Received the IEEE GRSS Seoul Chapter Chair Award.",
    description: "Ji-Hyuck Hong received the IEEE Geoscience and Remote Sensing Society (GRSS) Seoul Chapter Chair Award. Congratulations! 🏅"
  },
  {
    id: "news-2026-08-members",
    date: "2026.08",
    category: "PEOPLE",
    title: "New Members Joined IRS Lab (Seungeun Kang, Minjae Kim, Junhyung Gong).",
    description: "Graduate students Seungeun, Minjae and undergraduate researcher Junhyung joined our team. Welcome!"
  },
  {
    id: "news-2026-07-interns",
    date: "2026.07",
    category: "PEOPLE",
    title: "Summer Internships for 2 Students (Jaeone Yun, Junwon Choi).",
    description: "Jaeone and Junwon began their summer research internships at IRS Lab."
  },
  {
    id: "news-2026-04-neurips",
    date: "2026.04",
    category: "TALK",
    title: "Prof. Jae-Ho Choi Appointed as Area Chair for NeurIPS 2026.",
    description: "Prof. Jae-Ho Choi will serve as an Area Chair for the 40th Annual Conference on Neural Information Processing Systems (NeurIPS 2026).",
    highlight: true
  },
  {
    id: "news-2026-04-iitp",
    date: "2026.04",
    category: "GRANT",
    title: "IRS Lab is Funded by IITP (제조 환경 멀티센서 융합 모델 기반 안전 제약 준수 작업계획 생성 기술 연구).",
    description: "Our lab is funded by the Institute of Information & Communications Technology Planning & Evaluation (IITP, 2026–2033) for research on multi-sensor fusion in manufacturing environments.",
    highlight: true
  },
  {
    id: "news-2026-04-kiost",
    date: "2026.04",
    category: "GRANT",
    title: "IRS Lab is Funded by KIOST (해양 마이크로 도플러 기술 기반 AI 수중 감시 시스템 개발).",
    description: "Our lab is funded by the Korea Institute of Ocean Science and Technology (KIOST, 2026–2030) for research on AI-driven maritime micro-Doppler surveillance systems."
  },
  {
    id: "news-2026-03-nrf",
    date: "2026.03",
    category: "GRANT",
    title: "IRS Lab is Funded by NRF (다중 주파수·변조 통합 학습 기반 레이더 파운데이션 모델 연구, 신진연구-유형B).",
    description: "Our lab is funded by the National Research Foundation of Korea (NRF Young Researcher Program Type-B, 2026–2031) for research on unified multi-frequency, multi-modulation radar foundation models.",
    highlight: true
  },
  {
    id: "news-2026-02-cvpr",
    date: "2026.02",
    category: "PAPER",
    title: "1 Paper Accepted to CVPR 2026 Findings.",
    description: "One paper by Jeongwan Shin, Jaehyeon Kim, and Donguk Ko has been accepted to IEEE/CVF CVPR 2026 Findings. Congratulations!",
    highlight: true
  },
  {
    id: "news-2026-02-members",
    date: "2026.02",
    category: "PEOPLE",
    title: "New Members Joined IRS Lab (Donguk Ko, Bumjoon Kim, Minkyoung Shim, Jeongwoo Han, Yunjung Jeong).",
    description: "Graduate students Donguk, Bumjoon, Minkyoung, Jeongwoo and undergraduate researcher Yunjung joined our team. Welcome!"
  },
  {
    id: "news-2025-11-add",
    date: "2025.11",
    category: "GRANT",
    title: "IRS Lab is Funded by ADD (Physical AI 기반 고속 군집 자폭 무인수상정 대응 체계 연구).",
    description: "Our lab is funded by the Agency for Defense Development (ADD Loonshot Project, 2025–2026) for research on Physical AI countermeasures against high-speed unmanned surface vessels.",
    highlight: true
  },
  {
    id: "news-2025-11-wacv",
    date: "2025.11",
    category: "PAPER",
    title: "1 Paper Accepted to WACV 2026.",
    description: "One paper (ReFineVQA) by Jeongwan Shin has been accepted to IEEE/CVF WACV 2026. Congratulations!"
  },
  {
    id: "news-2025-11-postdoc",
    date: "2025.11",
    category: "PEOPLE",
    title: "New Member Joined IRS Lab (Dr. Dohyun Park).",
    description: "Postdoctoral fellow Dr. Dohyun Park joined our team. Welcome!"
  },
  {
    id: "news-2025-10-neurips-reviewer",
    date: "2025.10",
    category: "AWARD",
    title: "Prof. Jae-Ho Choi Received the NeurIPS 2025 Top Reviewer Award.",
    description: "Prof. Jae-Ho Choi has been recognized as a Top Reviewer for NeurIPS 2025."
  },
  {
    id: "news-2025-09-members",
    date: "2025.09",
    category: "PEOPLE",
    title: "New Members Joined IRS Lab (Dr. Yazdan Qadri, Jaeone Yun).",
    description: "Postdoctoral fellow Dr. Yazdan Qadri and undergraduate researcher Jaeone joined our team. Welcome!"
  },
  {
    id: "news-2025-09-nrf-seed",
    date: "2025.09",
    category: "GRANT",
    title: "IRS Lab is Funded by NRF (우수신진연구-씨앗).",
    description: "Our lab is funded by the National Research Foundation of Korea (NRF Excellent Young Researcher Seed Grant, 2025–2026)."
  },
  {
    id: "news-2025-08-postdocs",
    date: "2025.08",
    category: "PEOPLE",
    title: "New Members Joined IRS Lab (Dr. Jaehyun Park, Dr. Jeongwan Shin).",
    description: "Postdoctoral fellows Dr. Jaehyun Park and Dr. Jeongwan Shin joined our team. Welcome!"
  },
  {
    id: "news-2025-08-grads",
    date: "2025.08",
    category: "PEOPLE",
    title: "New Members Joined IRS Lab (Eunchan Kim, Jihyuck Hong).",
    description: "Graduate students Eunchan and Jihyuck joined our team. Welcome!"
  },
  {
    id: "news-2025-07-interns",
    date: "2025.07",
    category: "PEOPLE",
    title: "Summer Internships for 3 Students (Uhyeok, Donguk, Dohyeok).",
    description: "Uhyeok, Donguk, and Dohyeok began their summer research internships at IRS Lab."
  },
  {
    id: "news-2025-07-members",
    date: "2025.07",
    category: "PEOPLE",
    title: "New Members Joined IRS Lab (Nahyeon Kim, Jaeryong Lee).",
    description: "Undergraduate researchers Nahyeon and Jaeryong joined our team. Welcome!"
  },
  {
    id: "news-2025-06-innocore",
    date: "2025.06",
    category: "GRANT",
    title: "IRS Lab is Funded by MSIT InnoCORE Projects (InnoCORE 사업).",
    description: "Our lab is funded by two MSIT InnoCORE Projects (2025–2029) focusing on multimodal LLM expansion and bio-embedded AI.",
    highlight: true
  },
  {
    id: "news-2025-06-starfellowship",
    date: "2025.06",
    category: "GRANT",
    title: "IRS Lab is Funded by MSIT AI Star Fellowship (AI 스타펠로우십).",
    description: "Our lab is funded by the MSIT AI Star Fellowship (2025–2030) supporting pioneering Physical AI research.",
    highlight: true
  },
  {
    id: "news-2025-02-cvpr",
    date: "2025.02",
    category: "PAPER",
    title: "1 Paper Accepted to CVPR 2025.",
    description: "One paper (MVDoppler-Pose) by Prof. Jae-Ho Choi has been accepted to IEEE/CVF CVPR 2025. Congratulations!",
    highlight: true
  },
  {
    id: "news-2025-02-jaehyeon",
    date: "2025.02",
    category: "PEOPLE",
    title: "New Member Joined IRS Lab (Jaehyeon Kim).",
    description: "Graduate student Jaehyeon joined our team. Welcome!"
  },
  {
    id: "news-2024-12-icassp",
    date: "2024.12",
    category: "PAPER",
    title: "1 Paper Accepted to ICASSP 2025 (Oral Presentation).",
    description: "One paper by Prof. Jae-Ho Choi has been accepted to IEEE ICASSP 2025 for an Oral Presentation. Congratulations!",
    highlight: true
  },
  {
    id: "news-2024-12-launch",
    date: "2024.12",
    category: "NEWS",
    title: "Intelligent Radio Sensing (IRS) Lab Officially Opens at DGIST.",
    description: "IRS Lab has launched in the Department of EECS and Department of Interdisciplinary Studies of AI at DGIST, led by Prof. Jae-Ho Choi.",
    highlight: true
  }
];
