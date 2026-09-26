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
    id:"news-2026-09-paper",
    date: "2026.09",
    category: "PAPER",
    title:"2 Paper Accepted to NeurIPS 2026.",
    description:"Two papers(Radar MAE, mmLIP) by Eunchan Kim, Jeongwan Shin, and Jaehyeon Kim have been accepted to NeurIPS 2026 🥳 Congratulations!"
  },
  {
    id: "news-2026-08-award",
    date: "2026.08",
    category: "AWARD",
    title: "Ji-Hyuck Hong received the IEEE GRSS Seoul Chapter Chair Award.",
    description: "Lab member Ji-Hyuck Hong was recognized with the prestigious IEEE Geoscience and Remote Sensing Society (GRSS) Seoul Chapter Chair Award.",
  },
  {
    id: "news-2026-08-members",
    date: "2026.08",
    category: "PEOPLE",
    title: "New Members Joined IRS Lab (Seongryeong Lee, Seungeun Kang, Minjae Kim, Junhyung Gong).",
    description: "Welcome graduate students Seongryeong Lee, Seungeun Kang, Minjae Kim, and undergraduate researcher Junhyung Gong to our team!"
  },
  {
    id: "news-2026-07-interns",
    date: "2026.07",
    category: "PEOPLE",
    title: "Summer Internships for 2 Students (Jaeone Yun, Junwon Choi).",
    description: "Jaeone Yun and Junwon Choi began their summer research internships in the IRS Laboratory."
  },
  {
    id: "news-2026-04-neurips",
    date: "2026.04",
    category: "TALK",
    title: "Prof. Jae-Ho Choi appointed as Area Chair for NeurIPS 2026.",
    description: "Prof. Choi will serve as an Area Chair for the 40th Annual Conference on Neural Information Processing Systems (NeurIPS 2026).",
    highlight: true
  },
  {
    id: "news-2026-04-iitp",
    date: "2026.04",
    category: "GRANT",
    title: "IRS Lab is funded by the IITP (제조 환경 멀티센서 융합 모델 기반 안전 제약 준수 작업계획 생성 기술 연구).",
    description: "Our lab will receive long-term research support from the Institute of Information & Communications Technology Planning & Evaluation (IITP) for manufacturing multi-sensor fusion.",
    highlight: true
  },
  {
    id: "news-2026-04-kiost",
    date: "2026.04",
    category: "GRANT",
    title: "IRS Lab is funded by the KIOST (해양 마이크로 도플러 기술 기반 AI 수중 감시 시스템 개발).",
    description: "Funded by Korea Institute of Ocean Science and Technology (KIOST) to build AI-driven maritime micro-Doppler underwater/surface surveillance systems."
  },
  {
    id: "news-2026-03-nrf",
    date: "2026.03",
    category: "GRANT",
    title: "IRS Lab is funded by the NRF (다중 주파수·변조 통합 학습 기반 레이더 파운데이션 모델 연구, 신진연구-유형B).",
    description: "5-year research project on unified multi-frequency, multi-modulation radar foundation models supported by the National Research Foundation of Korea.",
    highlight: true
  },
  {
    id: "news-2026-02-cvpr",
    date: "2026.02",
    category: "PAPER",
    title: "1 Paper Accepted to CVPR 2026 Findings.",
    description: "'Can Language Models Understand mmWave Data? Benchmarking Large Language Models for mmWave Radar-Based Human Understanding' accepted to CVPR 2026.",
    highlight: true
  },
  {
    id: "news-2026-02-members",
    date: "2026.02",
    category: "PEOPLE",
    title: "New Members Joined IRS Lab (Donguk Ko, Bumjoon Kim, Minkyoung Shim, Jeongwoo Han, Yunjung Jeong).",
    description: "Donguk Ko, Bumjoon Kim, Minkyoung Shim, and Jeongwoo Han (MS), alongside Yunjung Jeong (Undergraduate), joined the lab."
  },
  {
    id: "news-2025-11-add",
    date: "2025.11",
    category: "GRANT",
    title: "IRS Lab is funded by the ADD(Physical AI 기반 고속 군집 자폭 무인수상정 대응 체계 연구).",
    description: "Physical AI counter-measure algorithms against high-speed unmanned swarm surface vessels funded by ADD.",
    highlight: true
  },
  {
    id: "news-2025-11-wacv",
    date: "2025.11",
    category: "PAPER",
    title: "1 Paper Accepted to WACV 2026.",
    description: "'ReFineVQA: Iterative Refinement of Video Description via Feedback Generation for Video Question Answering' accepted to IEEE/CVF WACV 2026."
  },
  {
    id: "news-2025-11-postdoc",
    date: "2025.11",
    category: "PEOPLE",
    title: "New Member Joined IRS Lab (Dr. Dohyun Park).",
    description: "Dr. Dohyun Park joined our research group to collaborate on radar remote sensing and machine learning."
  },
  {
    id: "news-2025-10-neurips-reviewer",
    date: "2025.10",
    category: "AWARD",
    title: "Prof. Jae-Ho Choi received the NeurIPS 2025 Top Reviewer Award.",
    description: "Recognized among top reviewers by the NeurIPS 2025 program committee for thorough and high-quality peer review contributions."
  },
  {
    id: "news-2025-09-members",
    date: "2025.09",
    category: "PEOPLE",
    title: "New Members Joined IRS Lab (Dr. Yazdan Qadri, Jaeone Yun).",
    description: "Welcome Postdoc Fellow Dr. Yazdan Qadri and undergraduate researcher Jaeone Yun."
  },
  {
    id: "news-2025-09-nrf-seed",
    date: "2025.09",
    category: "GRANT",
    title: "IRS Lab is funded by the NRF Excellent Young Researcher Seed Grant (우수신진연구-씨앗).",
    description: "Our lab received seed grant support under the NRF Excellent Young Researcher Program."
  },
  {
    id: "news-2025-08-postdocs",
    date: "2025.08",
    category: "PEOPLE",
    title: "New Members Joined IRS Lab (Dr. Jaehyun Park, Dr. Jeongwan Shin).",
    description: "Dr. Jaehyun Park and Dr. Jeongwan Shin joined the lab as Postdoctoral Fellows."
  },
  {
    id: "news-2025-08-grads",
    date: "2025.08",
    category: "PEOPLE",
    title: "New Members Joined IRS Lab (Eunchan Kim, Jihyuck Hong).",
    description: "Welcome Eunchan and Jihyuck to the IRS research group."
  },
  {
    id: "news-2025-07-interns",
    date: "2025.07",
    category: "PEOPLE",
    title: "New Members Joined IRS Lab (Nahyeon Kim, Jaeryong Lee, Uhyeok, Donguk, Dohyeok).",
    description: "Internships completed by Uhyeok, Donguk, and Dohyeok; Nahyeon Kim and Jaeryong Lee joined as undergraduate researchers."
  },
  {
    id: "news-2025-06-innocore",
    date: "2025.06",
    category: "GRANT",
    title: "IRS Lab is funded by the MSIT InnoCORE Projects.",
    description: "Selected for two InnoCORE national initiatives focusing on LLM 2.0 multimodal expansion and bio-embedded AI.",
    highlight: true
  },
  {
    id: "news-2025-06-starfellowship",
    date: "2025.06",
    category: "GRANT",
    title: "IRS Lab is funded by the MSIT AI Star Fellowship (AI 스타펠로우십).",
    description: "Prof. Jae-Ho Choi selected for the highly competitive MSIT AI Star Fellowship supporting pioneering physical AI research.",
    highlight: true
  },
  {
    id: "news-2025-02-cvpr",
    date: "2025.02",
    category: "PAPER",
    title: "1 Paper Accepted to CVPR 2025.",
    description: "'MVDoppler-Pose: Multi-Modal Multi-View mmWave Sensing for Long-Distance Self-Occluded Human Walking Pose Estimation' accepted to IEEE/CVF CVPR 2025.",
    highlight: true
  },
  {
    id: "news-2025-02-jaehyeon",
    date: "2025.02",
    category: "PEOPLE",
    title: "New Member Joined IRS Lab (Jaehyeon Kim).",
    description: "Jaehyeon Kim joined as the founding student of the IRS research group."
  },
  {
    id: "news-2024-12-icassp",
    date: "2024.12",
    category: "PAPER",
    title: "1 Paper Accepted to ICASSP 2025 (Oral Presentation).",
    description: "'High-Resolution Gait Micro-Doppler Synthesis from Videos Over Diverse Trajectories' accepted to IEEE ICASSP 2025 as an Oral Presentation.",
    highlight: true
  },
  {
    id: "news-2024-12-launch",
    date: "2024.12",
    category: "NEWS",
    title: "Intelligent Radio Sensing (IRS) Lab officially opens at DGIST.",
    description: "IRS Lab launched in the Department of EECS and Department of Interdisciplinary Studies of AI at DGIST, headed by Prof. Jae-Ho Choi.",
    highlight: true
  }
];
