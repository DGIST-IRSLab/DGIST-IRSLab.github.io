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
    id: "wireless-centric-ai",
    title: "Wireless-Centric AI",
    shortTitle: "Wireless AI",
    question: "How to fully unleash the power of AI for wireless signals?",
    summary: "Developing novel learning representations, complex-valued neural architectures, and wireless foundation models tailored to the physics of electromagnetic wave propagation.",
    description: [
      "Traditional computer vision models fail when naively applied to raw radio-frequency (RF) waveforms due to phase sensitivity, multi-path propagation, complex-number signal domains, and distinctive noise characteristics.",
      "We design wireless-native neural network paradigms—including complex neural networks, frequency-domain transformers, and foundation models pretrained on multi-frequency radar corpora—that directly process I/Q channels and range-Doppler representations.",
      "Our work extends to generative AI for synthesizing realistic micro-Doppler signatures and augmenting sparse RF datasets across domain shifts."
    ],
    keywords: [
      "Radar Signal Processing + AI",
      "Wireless Foundation Models",
      "Generative RF Synthesis",
      "Complex Neural Networks",
      "Self-Supervised Masked RF Modeling"
    ],
    image: "/images/research_1.jpg",
    imageCaption: "Figure 1: Wireless-Centric AI framework uniting wave physics with transformer architectures for robust phase and Doppler feature extraction.",
    highlights: [
      "Self-supervised pre-training on multi-frequency mmWave datasets",
      "Complex-valued deep networks preserving phase and quadrature geometry",
      "Generative micro-Doppler synthesis across variable motion trajectories"
    ]
  },
  {
    id: "wireless-perception-systems",
    title: "Innovative Wireless+X Perception Systems",
    shortTitle: "Perception Systems",
    question: "How to achieve new perception technologies that see beyond human vision?",
    summary: "Building contactless, privacy-preserving sensing systems capable of penetrating occlusions, smoke, and total darkness for human health monitoring and remote scene understanding.",
    description: [
      "Optical sensors struggle under environmental extremes such as dense clutter, smoke, fog, and complete darkness, while raising critical privacy concerns in personal environments.",
      "We develop contactless physiological sensing technologies that monitor respiration and cardiac dynamics of freely moving subjects without requiring wearables.",
      "In parallel, we engineer Synthetic Aperture Radar (SAR) remote sensing algorithms and micro-motion kinematic sensing for long-distance multi-view human walking pose estimation."
    ],
    keywords: [
      "Contactless Health Monitoring",
      "Micro-Motion Kinematics",
      "SAR Remote Sensing",
      "Adverse Scenario Sensing (Occlusion, Darkness)",
      "Crowd Counting & Spatial Localization"
    ],
    image: "/images/research_2.jpg",
    imageCaption: "Figure 2: Non-line-of-sight sensing and contactless vital sign monitoring using high-frequency mmWave radar backscatter.",
    highlights: [
      "Sub-millimeter chest displacement tracking for free-moving respiration analysis",
      "Long-distance self-occluded human walking pose reconstruction",
      "Target and shadow region joint modeling for satellite SAR discrimination"
    ]
  },
  {
    id: "multimodal-fusion",
    title: "Multi-Modal / Multi-Sensor Fusion & Physical AI",
    shortTitle: "Multimodal & Physical AI",
    question: "How to achieve generalized perception by combining distinct physical sensor modalities?",
    summary: "Fusing complementary physics of radio waves, vision, infrared, and audio to build resilient embodied intelligence and foundation models for autonomous systems.",
    description: [
      "Single-modality systems possess inherent failure modes: cameras fail in low visibility or occlusion, while RF sensors produce sparse geometric point clouds without semantic textures.",
      "We develop multi-sensor fusion architectures (Video-RF transformers, Radar-Camera diffusion depth estimators, and multimodal cross-attention) that bind complementary spatial, temporal, and physical signals.",
      "Furthermore, we benchmark and extend Large Language Models (LLMs) to reason over mmWave radar streams for physical-world contextual comprehension."
    ],
    keywords: [
      "Radar + Camera Fusion",
      "Video-RF Transformers",
      "Diffusion Depth Estimation",
      "LLM mmWave Understanding",
      "Embodied Physical Intelligence"
    ],
    image: "/images/research_3.jpg",
    imageCaption: "Figure 3: Cross-modal transformer aligning sparse radar point reflections with dense visual semantic features for robust scene comprehension.",
    highlights: [
      "Video-RF fusion transformers for synchronized physiological and pose estimation",
      "Diffusion-driven metric depth recovery combining sparse radar returns with RGB",
      "Large-scale benchmarks evaluating LLM cognitive capabilities on RF data"
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
    topicId: "multimodal-fusion",
    description: "Multi-sensor fusion foundation model research for safe robot task planning in industrial manufacturing environments.",
    status: "ongoing"
  },
  {
    id: "proj-kiost-2026",
    title: "해양 마이크로 도플러 기술 기반 AI 수중 감시 시스템 개발",
    agency: "KIOST (Korea Institute of Ocean Science and Technology)",
    agencyBadge: "KIOST",
    period: "2026.04 – 2030.12",
    topicId: "wireless-perception-systems",
    description: "AI-based maritime micro-Doppler sensing and surveillance algorithms for underwater and surface object classification.",
    status: "ongoing"
  },
  {
    id: "proj-nrf-typeb-2026",
    title: "다중 주파수, 다중 변조, 다중 환경 통합 학습 기반 레이더 파운데이션 모델 연구 (신진연구-유형B)",
    agency: "NRF (National Research Foundation of Korea)",
    agencyBadge: "NRF",
    period: "2026.03 – 2031.02",
    topicId: "wireless-centric-ai",
    description: "Radar foundation model trained across multi-frequency bands, diverse modulation schemes, and disparate environmental domains.",
    status: "ongoing"
  },
  {
    id: "proj-add-moonshot-2025",
    title: "Physical AI 기반 고속 군집 자폭 무인수상정 대응 체계 연구 (룬샷 프로젝트)",
    agency: "ADD (Agency for Defense Development)",
    agencyBadge: "ADD",
    period: "2025.12 – 2026.11",
    topicId: "wireless-perception-systems",
    description: "Physical AI counter-measure algorithms against high-speed unmanned swarm surface vessels using multi-sensor radar tracking.",
    status: "ongoing"
  },
  {
    id: "proj-nrf-seed-2025",
    title: "우수신진연구-씨앗",
    agency: "NRF (National Research Foundation of Korea)",
    agencyBadge: "NRF",
    period: "2025.09 – 2026.08",
    topicId: "wireless-centric-ai",
    description: "Early-stage exploratory initiative on advanced signal representations for wireless cognitive sensing.",
    status: "ongoing"
  },
  {
    id: "proj-msit-innocore-llm-2025",
    title: "InnoCore: LLM 2.0 (Inference Enhancement, Domain Specialization, Multimodal Expansion, Trustworthy AI)",
    agency: "MSIT (Ministry of Science and ICT)",
    agencyBadge: "MSIT",
    period: "2025.07 – 2029.12",
    topicId: "multimodal-fusion",
    description: "Investigation into multimodal extension of large language models for sensory radio domain comprehension.",
    status: "ongoing"
  },
  {
    id: "proj-msit-innocore-bio-2025",
    title: "InnoCore: Trust-Enhanced Mutualistic Bio-Embedded AI",
    agency: "MSIT (Ministry of Science and ICT)",
    agencyBadge: "MSIT",
    period: "2025.07 – 2029.12",
    topicId: "wireless-perception-systems",
    description: "Biological sensing integration with embedded physical intelligence.",
    status: "ongoing"
  },
  {
    id: "proj-msit-star-2025",
    title: "MSIT AI Star Fellowship (AI 스타펠로우십사업)",
    agency: "MSIT (Ministry of Science and ICT)",
    agencyBadge: "MSIT",
    period: "2025.04 – 2030.12",
    topicId: "wireless-centric-ai",
    description: "Prestigious national fellowship advancing pioneering artificial intelligence research in physical perception.",
    status: "ongoing"
  },
  {
    id: "proj-dgist-startup-2025",
    title: "DGIST Faculty Startup Research Grant",
    agency: "DGIST",
    agencyBadge: "DGIST",
    period: "2025.01 – 2028.12",
    topicId: "wireless-centric-ai",
    description: "Core laboratory equipment, mmWave testbeds, and computing infrastructure setup.",
    status: "ongoing"
  }
];
