/**
 * ============================================================================
 * [데이터 파일 가이드: 핵심 연구 분야 및 과제 (Research Topics & Projects)]
 * ============================================================================
 * 이 파일은 IRS Lab의 3대 핵심 연구 테마(Research Topics)와
 * 연구실에서 수행 중인 주요 연구 과제(Research Projects)를 관리합니다.
 *
 * ----------------------------------------------------------------------------
 * ■ 1. researchTopics (핵심 연구 테마 카드) 필드 설명
 * ----------------------------------------------------------------------------
 * - id (필수, string): 테마 고유 식별자 (예: 'wireless-centric-ai')
 * - title (필수, string): 연구 분야 대주제명 (예: 'Wireless-Centric AI')
 * - shortTitle (필수, string): 탭/상단에 노출될 간결한 축약명 (예: 'Wireless AI')
 * - question (필수, string): 핵심 연구 질문 (Research Question, 카드 상단에 굵게 강조됨)
 *     예: "How to fully unleash the power of AI for wireless signals?"
 * - summary (필수, string): 연구 테마에 대한 핵심 한 줄 소개
 * - description (필수, string[]): 세부 연구 방향 및 기술 소개 문단 배열
 * - keywords (필수, string[]): 핵심 기술 키워드 배열 (카드 하단에 '#태그' 형태로 노출)
 * - image (필수, string): 대표 아키텍처/컨셉 다이어그램 이미지 경로 (예: '/images/research_1.jpg')
 * - imageCaption (필수, string): 다이어그램 하단 설명 캡션
 * - highlights (필수, string[]): 주요 연구 성과 및 핵심 포인트 (3~4개 글머리 기호)
 *
 * ----------------------------------------------------------------------------
 * ■ 2. researchProjects (연구 프로젝트 목록) 필드 설명
 * ----------------------------------------------------------------------------
 * - id (필수, string): 프로젝트 고유 ID (예: 'proj-iitp-2026')
 * - title (필수, string): 과제 정식 명칭 (국문/영문)
 * - agency (필수, string): 지원 기관 전체 명칭 (예: 'IITP (Institute of ...)')
 * - agencyBadge (선택, string): 뱃지용 기관 약칭 (예: 'IITP', 'NRF', 'ADD', 'KIOST')
 * - period (필수, string): 총 연구 수행 기간 (예: '2026.04 – 2028.12')
 * - topicId (선택, string): 연관된 researchTopics의 id (연계 필터링용)
 * - description (선택, string): 과제에 대한 간략한 설명 요약
 * - status (필수, 'ongoing' | 'completed'): 과제 진행 상태 ('ongoing': 진행중, 'completed': 완료)
 *
 * ----------------------------------------------------------------------------
 * ■ 새로운 연구 테마 추가 템플릿
 * ----------------------------------------------------------------------------
 * {
 *   id: "new-topic-id",
 *   title: "New Research Topic Title",
 *   shortTitle: "New Topic",
 *   question: "What is the core scientific question to solve?",
 *   summary: "A concise lead summary of this topic.",
 *   description: [
 *     "Detailed paragraph 1 explaining the problem and limitations of existing methods.",
 *     "Detailed paragraph 2 describing our lab's novel approach and contributions."
 *   ],
 *   keywords: ["Keyword 1", "Keyword 2", "Keyword 3"],
 *   image: "/images/research_new.jpg",
 *   imageCaption: "Figure: Framework overview of the proposed sensing method.",
 *   highlights: ["Highlight point 1", "Highlight point 2", "Highlight point 3"]
 * }
 * ============================================================================
 */

import type { ResearchTopic, ResearchProject } from '../types';

export const researchTopics: ResearchTopic[] = [
  {
    id: "wireless-foundation-models",
    title: "Wireless Foundation Models",
    shortTitle: "Wireless Foundation Models",
    question: "How to bridge physical wireless signals and multimodal foundation models?",
    summary: "Developing novel learning representations, self-supervised learning, and cross-modal foundation models tailored to the physics of electromagnetic wave propagation.",
    description: [
      "Traditional computer vision models fail when naively applied to raw radio-frequency (RF) waveforms due to phase sensitivity, multi-path propagation, complex-number signal domains, and distinctive noise characteristics.",
      "We design wireless-native foundation model paradigms—including physics-aware self-supervised learning, cross-modal wireless-language pretraining, and radar-grounded multimodal scene reasoning—that directly understand physical RF representations.",
      "Our work extends to RF simulation and digital twin synthesis to bridge simulation and real-world domain shifts."
    ],
    keywords: [
      "Physics-Aware Self-Supervised Learning",
      "Cross-Modal Wireless-Language Pretraining",
      "Radar-Grounded Multimodal Scene Reasoning",
      "RF Simulation & Digital Twin Synthesis",
      "Wireless Foundation Models"
    ],
    image: "/images/research_1.png",
    imageCaption: "Figure 1: Wireless Foundation Models framework integrating self-supervised learning, cross-modal pretraining, multimodal scene reasoning, and RF digital twin synthesis.",
    highlights: [
      "Physics-Aware Self-Supervised Learning",
      "Cross-Modal Wireless-Language Pretraining",
      "Radar-Grounded Multimodal Scene Reasoning",
      "RF Simulation & Digital Twin Synthesis"
    ]
  },
  {
    id: "beyond-optical-perception",
    title: "Beyond-Optical Perception Systems",
    shortTitle: "Beyond-Optical Perception",
    question: "How to perceive human dynamics and physical scenes beyond optical limits?",
    summary: "Building contactless, non-line-of-sight sensing systems capable of penetrating occlusions, smoke, and darkness for human motion tracking, physiological monitoring, and robotics.",
    description: [
      "Optical sensors struggle under environmental extremes such as dense clutter, smoke, fog, and complete darkness, while raising critical privacy concerns in personal environments.",
      "We develop contactless physiological sensing technologies that monitor respiration, cardiac dynamics, and SpO2 of freely moving subjects without requiring wearables.",
      "In parallel, we engineer 3D human pose and motion estimation, see-through robotic manipulation, and micro-Doppler radar sensing for aerial and non-line-of-sight targets."
    ],
    keywords: [
      "3D Human Pose & Motion Estimation",
      "Contactless Vital Sign & SpO2 Monitoring",
      "See-Through Robotic Manipulation",
      "Micro-Doppler Aerial Target Sensing",
      "Adverse Scenario Sensing"
    ],
    image: "/images/research_2.png",
    imageCaption: "Figure 2: Beyond-optical perception systems overcoming visual occlusion and lighting constraints for 3D pose estimation, contactless vital monitoring, see-through robotics, and aerial target sensing.",
    highlights: [
      "3D Human Pose & Motion Estimation",
      "Contactless Vital Sign & SpO2 Monitoring",
      "See-Through Robotic Manipulation",
      "Micro-Doppler Aerial Target Sensing"
    ]
  },
  {
    id: "isac-ai-signal-processing",
    title: "ISAC & AI Signal Processing",
    shortTitle: "ISAC & AI Signal Processing",
    question: "How to transform ubiquitous wireless signals into intelligent sensing systems?",
    summary: "Transforming ubiquitous wireless signals into intelligent sensing systems through ambient network sensing, AI-driven signal reconstruction, and autonomous agentic processing pipelines.",
    description: [
      "Ubiquitous communication signals offer rich opportunistic sensing modalities when paired with intelligent signal processing.",
      "We investigate ambient Wi-Fi and cellular network sensing, deep learning-based virtual I/Q reconstruction, and signal super-resolution for high-precision radar imaging beyond hardware boundaries.",
      "Furthermore, we develop autonomous signal processing agents that observe, interpret, and adaptively control sensing pipelines in complex RF environments."
    ],
    keywords: [
      "Ambient Wi-Fi & Cellular Network Sensing",
      "AI-Driven Virtual I/Q Reconstruction",
      "Signal Super-Resolution for Radar Imaging",
      "Autonomous Signal Processing Agents",
      "Integrated Sensing & Communication (ISAC)"
    ],
    image: "/images/research_3.png",
    imageCaption: "Figure 3: Integrated Sensing and Communication (ISAC) and AI signal processing transforming ambient wireless waveforms through virtual I/Q reconstruction, super-resolution, and autonomous DSP agents.",
    highlights: [
      "Ambient Wi-Fi & Cellular Network Sensing",
      "AI-Driven Virtual I/Q Reconstruction",
      "Signal Super-Resolution for Radar Imaging",
      "Autonomous Signal Processing Agents"
    ]
  }
];

export const researchProjects: ResearchProject[] = [
  {
    id: "proj-iitp-2026",
    title: "제조 환경 멀티센서 융합 모델 기반 안전 제약 준수 작업계획 생성 기술 연구 (1단계)",
    agency: "IITP (Institute of Information & Communications Technology Planning & Evaluation)",
    agencyBadge: "IITP",
    period: "2026.04 – 2028.12 (Total: ~2033.12)",
    topicId: "isac-ai-signal-processing",
    description: "Multi-sensor fusion foundation model research for safe robot task planning in industrial manufacturing environments.",
    status: "ongoing"
  },
  {
    id: "proj-kiost-2026",
    title: "해양 마이크로 도플러 기술 기반 AI 수중 감시 시스템 개발",
    agency: "KIOST (Korea Institute of Ocean Science and Technology)",
    agencyBadge: "KIOST",
    period: "2026.04 – 2030.12",
    topicId: "beyond-optical-perception",
    description: "AI-based maritime micro-Doppler sensing and surveillance algorithms for underwater and surface object classification.",
    status: "ongoing"
  },
  {
    id: "proj-nrf-typeb-2026",
    title: "다중 주파수, 다중 변조, 다중 환경 통합 학습 기반 레이더 파운데이션 모델 연구 (신진연구-유형B)",
    agency: "NRF (National Research Foundation of Korea)",
    agencyBadge: "NRF",
    period: "2026.03 – 2031.02",
    topicId: "wireless-foundation-models",
    description: "Radar foundation model trained across multi-frequency bands, diverse modulation schemes, and disparate environmental domains.",
    status: "ongoing"
  },
  {
    id: "proj-add-moonshot-2025",
    title: "Physical AI 기반 고속 군집 자폭 무인수상정 대응 체계 연구 (룬샷 프로젝트)",
    agency: "ADD (Agency for Defense Development)",
    agencyBadge: "ADD",
    period: "2025.12 – 2026.11",
    topicId: "beyond-optical-perception",
    description: "Physical AI counter-measure algorithms against high-speed unmanned swarm surface vessels using multi-sensor radar tracking.",
    status: "ongoing"
  },
  {
    id: "proj-nrf-seed-2025",
    title: "우수신진연구-씨앗",
    agency: "NRF (National Research Foundation of Korea)",
    agencyBadge: "NRF",
    period: "2025.09 – 2026.08",
    topicId: "wireless-foundation-models",
    description: "Early-stage exploratory initiative on advanced signal representations for wireless cognitive sensing.",
    status: "ongoing"
  },
  {
    id: "proj-msit-innocore-llm-2025",
    title: "InnoCore: LLM 2.0 (Inference Enhancement, Domain Specialization, Multimodal Expansion, Trustworthy AI)",
    agency: "MSIT (Ministry of Science and ICT)",
    agencyBadge: "MSIT",
    period: "2025.07 – 2029.12",
    topicId: "isac-ai-signal-processing",
    description: "Investigation into multimodal extension of large language models for sensory radio domain comprehension.",
    status: "ongoing"
  },
  {
    id: "proj-msit-innocore-bio-2025",
    title: "InnoCore: Trust-Enhanced Mutualistic Bio-Embedded AI",
    agency: "MSIT (Ministry of Science and ICT)",
    agencyBadge: "MSIT",
    period: "2025.07 – 2029.12",
    topicId: "beyond-optical-perception",
    description: "Biological sensing integration with embedded physical intelligence.",
    status: "ongoing"
  },
  {
    id: "proj-msit-star-2025",
    title: "MSIT AI Star Fellowship (AI 스타펠로우십사업)",
    agency: "MSIT (Ministry of Science and ICT)",
    agencyBadge: "MSIT",
    period: "2025.04 – 2030.12",
    topicId: "wireless-foundation-models",
    description: "Prestigious national fellowship advancing pioneering artificial intelligence research in physical perception.",
    status: "ongoing"
  },
  {
    id: "proj-dgist-startup-2025",
    title: "DGIST Faculty Startup Research Grant",
    agency: "DGIST",
    agencyBadge: "DGIST",
    period: "2025.01 – 2028.12",
    topicId: "wireless-foundation-models",
    description: "Core laboratory equipment, mmWave testbeds, and computing infrastructure setup.",
    status: "ongoing"
  }
];
