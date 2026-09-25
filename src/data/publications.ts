/**
 * ============================================================================
 * [데이터 파일 가이드: 연구 논문 및 출판물 (Publications)]
 * ============================================================================
 * 이 파일은 IRS Lab에서 발표한 국제/국내 학술대회(Conference), 저널(Journal),
 * 워크숍(Workshop) 논문 목록을 관리합니다.
 *
 * ----------------------------------------------------------------------------
 * ■ Publication 객체의 주요 필드 설명
 * ----------------------------------------------------------------------------
 * - id (필수, string): 논문 고유 ID (BibTeX key 형태 권장, 예: 'choi2025mvdoppler')
 * - title (필수, string): 논문 제목 (영문)
 * - authors (필수, string[]): 전체 저자 이름 배열 (교신저자는 관례상 '이름*' 표기)
 *     예: ["Gildong Hong", "Jaehyeon Kim", "Jae-Ho Choi*"]
 * - labAuthors (선택, string[]): 연구실 소속 저자 이름 배열
 *     (웹사이트 논문 뷰에서 해당 저자명이 굵은 글씨(Bold)로 강조 표기됩니다)
 * - venue (필수, string): 발표된 학술대회 또는 학술지의 정식 명칭
 *     예: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)"
 * - venueShort (선택, string): 화면 배지에 간결하게 노출될 약칭
 *     예: "CVPR", "NeurIPS", "IEEE SPL", "WACV"
 * - year (필수, number): 발표 연도 (숫자, 예: 2026)
 * - type (필수, string): 논문 발표 형태
 *     'conference' (국제학술대회) | 'journal' (학술저널) | 'workshop' (워크숍)
 * - isTopConf (선택, boolean): CVPR, NeurIPS, ICML 등 최우수(Top-tier) 학회 여부 (강조 배지 부착)
 * - isSCI (선택, boolean): SCI/SCIE 등재 저널 여부 (강조 배지 부착)
 * - isDomestic (선택, boolean): 한국전자파학회 등 국내 학술대회/학술지 여부
 * - pdfUrl (선택, string): 논문 PDF 파일 다운로드 또는 arXiv/IEEE Xplore 링크 URL
 * - projectUrl (선택, string): 프로젝트 공식 웹사이트/데모 페이지 URL
 * - codeUrl (선택, string): 오픈소스 GitHub 코드 저장소 URL
 * - videoUrl (선택, string): 발표 영상 또는 시연 영상 URL (YouTube 등)
 * - bibtex (선택, string): 인용용 BibTeX 문자열 (화면에서 'Copy BibTeX' 기능으로 제공됨)
 *
 * ----------------------------------------------------------------------------
 * ■ 새로운 논문 추가 템플릿 (배열 맨 위에 최신 순으로 추가)
 * ----------------------------------------------------------------------------
 * {
 *   id: "hong2026sample",
 *   title: "Paper Title Goes Here",
 *   authors: ["Gildong Hong", "Jaehyeon Kim", "Jae-Ho Choi*"],
 *   labAuthors: ["Gildong Hong", "Jaehyeon Kim", "Jae-Ho Choi"],
 *   venue: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
 *   venueShort: "CVPR",
 *   year: 2026,
 *   type: "conference",
 *   isTopConf: true,
 *   pdfUrl: "https://arxiv.org/pdf/...",
 *   projectUrl: "https://project-page.github.io/",
 *   codeUrl: "https://github.com/...",
 *   bibtex: `@inproceedings{hong2026sample,
 *   title={Paper Title Goes Here},
 *   author={Hong, Gildong and Kim, Jaehyeon and Choi, Jae-Ho},
 *   booktitle={IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)},
 *   year={2026}
 * }`
 * },
 * ============================================================================
 */

import type { Publication } from '../types';

export const publications: Publication[] = [
  {
    id: "shin2026llm-mmwave",
    title: "Can Language Models Understand mmWave Data? Benchmarking Large Language Models for mmWave Radar-Based Human Understanding",
    authors: ["Jeongwan Shin", "Jaehyeon Kim", "Donguk Ko", "Jae-Ho Choi*"],
    labAuthors: ["Jeongwan Shin", "Jaehyeon Kim", "Donguk Ko", "Jae-Ho Choi"],
    venue: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR-Findings)",
    venueShort: "CVPR Findings",
    year: 2026,
    type: "conference",
    isTopConf: true,
    pdfUrl:"https://arxiv.org/pdf/2608.14179v1",
    bibtex: `@inproceedings{shin2026mmwave,
  title={Can Language Models Understand mmWave Data? Benchmarking Large Language Models for mmWave Radar-Based Human Understanding},
  author={Shin, Jeongwan and Kim, Jaehyeon and Ko, Donguk and Choi, Jae-Ho},
  booktitle={IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR-Findings)},
  year={2026}
}`
  },
  {
    id: "shin2026refinevqa",
    title: "ReFineVQA: Iterative Refinement of Video Description via Feedback Generation for Video Question Answering",
    authors: ["Jeongwan Shin", "Chan Hur", "Seongmin Cho", "Jae-Ho Choi*", "Hyeyoung Park*"],
    labAuthors: ["Jeongwan Shin", "Jae-Ho Choi"],
    venue: "IEEE/CVF Winter Conference on Applications of Computer Vision (WACV)",
    venueShort: "WACV",
    year: 2026,
    type: "conference",
    isTopConf:true,
    pdfUrl: "https://openaccess.thecvf.com/content/WACV2026/papers/Shin_ReFineVQA_Iterative_Refinement_of_Video_Description_via_Feedback_Generation_for_WACV_2026_paper.pdf",
    bibtex: `@inproceedings{shin2026refinevqa,
  title={ReFineVQA: Iterative Refinement of Video Description via Feedback Generation for Video Question Answering},
  author={Shin, Jeongwan and Hur, Chan and Cho, Seongmin and Choi, Jae-Ho and Park, Hyeyoung},
  booktitle={IEEE/CVF Winter Conference on Applications of Computer Vision (WACV)},
  year={2026}
}`
  },
  {
    id: "choi2025mvdoppler-pose",
    title: "MVDoppler-Pose: Multi-Modal Multi-View mmWave Sensing for Long-Distance Self-Occluded Human Walking Pose Estimation",
    authors: ["Jae-Ho Choi*", "Soheil Hor", "Shubo Yang", "Amin Arbabian"],
    labAuthors: ["Jae-Ho Choi"],
    venue: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
    venueShort: "CVPR",
    year: 2025,
    type: "conference",
    isTopConf: true,
    pdfUrl: "https://openaccess.thecvf.com/content/CVPR2025/papers/Choi_MVDoppler-Pose_Multi-Modal_Multi-View_mmWave_Sensing_for_Long-Distance_Self-Occluded_Human_Walking_CVPR_2025_paper.pdf",
    projectUrl: "https://mvdoppler-pose.github.io/",
    bibtex: `@inproceedings{choi2025mvdopplerpose,
  title={MVDoppler-Pose: Multi-Modal Multi-View mmWave Sensing for Long-Distance Self-Occluded Human Walking Pose Estimation},
  author={Choi, Jae-Ho and Hor, Soheil and Yang, Shubo and Arbabian, Amin},
  booktitle={IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)},
  year={2025}
}`
  },
  {
    id: "yang2025gait-microdoppler",
    title: "High-Resolution Gait Micro-Doppler Synthesis from Videos Over Diverse Trajectories",
    authors: ["Shubo Yang*", "Soheil Hor", "Jae-Ho Choi", "Amin Arbabian"],
    labAuthors: ["Jae-Ho Choi"],
    venue: "IEEE International Conference on Acoustics, Speech, and Signal Processing (ICASSP)",
    venueShort: "ICASSP",
    year: 2025,
    type: "conference",
    isTopConf: true,
    pdfUrl: "https://ieeexplore.ieee.org/abstract/document/10888938",
    bibtex: `@inproceedings{yang2025highres,
  title={High-Resolution Gait Micro-Doppler Synthesis from Videos Over Diverse Trajectories},
  author={Yang, Shubo and Hor, Soheil and Choi, Jae-Ho and Arbabian, Amin},
  booktitle={IEEE International Conference on Acoustics, Speech, and Signal Processing (ICASSP)},
  year={2025}
}`
  },
  {
    id: "choi2024crowd-counting-transformer",
    title: "Radar-Based Crowd Counting in Real-World Environments with Spatiotemporal Transformer",
    authors: ["Jae-Ho Choi", "Kyung-Tae Kim*"],
    labAuthors: ["Jae-Ho Choi"],
    venue: "IEEE Signal Processing Letters (SPL)",
    venueShort: "IEEE SPL",
    year: 2024,
    type: "journal",
    pdfUrl: "https://ieeexplore.ieee.org/abstract/document/10710320",
    bibtex: `@article{choi2024radar,
  title={Radar-Based Crowd Counting in Real-World Environments with Spatiotemporal Transformer},
  author={Choi, Jae-Ho and Kim, Kyung-Tae},
  journal={IEEE Signal Processing Letters},
  volume={31},
  pages={2840--2844},
  year={2024},
  publisher={IEEE}
}`
  },
  {
    id: "choi2024fusion-vital",
    title: "Fusion-Vital: Video-RF Fusion Transformer for Advanced Remote Physiological Measurement",
    authors: ["Jae-Ho Choi", "Ki-Bong Kang", "Kyung-Tae Kim*"],
    labAuthors: ["Jae-Ho Choi"],
    venue: "AAAI Conference on Artificial Intelligence (AAAI)",
    venueShort: "AAAI",
    year: 2024,
    type: "conference",
    isTopConf: true,
    pdfUrl: "https://ojs.aaai.org/index.php/AAAI/article/view/27898",
    bibtex: `@inproceedings{choi2024fusionvital,
  title={Fusion-Vital: Video-RF Fusion Transformer for Advanced Remote Physiological Measurement},
  author={Choi, Jae-Ho and Kang, Ki-Bong and Kim, Kyung-Tae},
  booktitle={Proceedings of the AAAI Conference on Artificial Intelligence},
  volume={38},
  number={2},
  pages={1248--1256},
  year={2024}
}`
  },
  {
    id: "choi2024heterogeneous-clutter",
    title: "Radar-Based People Counting under Heterogeneous Clutter Environments",
    authors: ["Jae-Ho Choi", "Ji-Eun Kim", "Kyung-Tae Kim*"],
    labAuthors: ["Jae-Ho Choi"],
    venue: "IEEE Sensors Journal",
    venueShort: "IEEE SensJ",
    year: 2024,
    type: "journal",
    pdfUrl: "https://ieeexplore.ieee.org/document/10322673",
    bibtex: `@article{choi2024people,
  title={Radar-Based People Counting under Heterogeneous Clutter Environments},
  author={Choi, Jae-Ho and Kim, Ji-Eun and Kim, Kyung-Tae},
  journal={IEEE Sensors Journal},
  volume={24},
  number={1},
  pages={785--794},
  year={2024}
}`
  },
  {
    id: "hor2023mvdoppler",
    title: "MVDoppler: Unleashing the Power of Multi-View Doppler for MicroMotion-based Gait Classification",
    authors: ["Soheil Hor*", "Shubo Yang", "Jae-Ho Choi", "Amin Arbabian"],
    labAuthors: ["Jae-Ho Choi"],
    venue: "Neural Information Processing Systems (NeurIPS)",
    venueShort: "NeurIPS",
    year: 2023,
    type: "conference",
    isTopConf: true,
    pdfUrl: "https://openreview.net/pdf?id=1plAfmP5ms",
    projectUrl: "https://mvdoppler.github.io/",
    bibtex: `@inproceedings{hor2023mvdoppler,
  title={MVDoppler: Unleashing the Power of Multi-View Doppler for MicroMotion-based Gait Classification},
  author={Hor, Soheil and Yang, Shubo and Choi, Jae-Ho and Arbabian, Amin},
  booktitle={Advances in Neural Information Processing Systems (NeurIPS)},
  year={2023}
}`
  },
  {
    id: "choi2023rf-vital",
    title: "RF-Vital: Radio-Based Contactless Respiration Monitoring for a Moving Individual",
    authors: ["Jae-Ho Choi", "Ki-Bong Kang", "Kyung-Tae Kim*"],
    labAuthors: ["Jae-Ho Choi"],
    venue: "IEEE Internet of Things Journal (IoTJ)",
    venueShort: "IEEE IoTJ",
    year: 2023,
    type: "journal",
    pdfUrl: "https://ieeexplore.ieee.org/abstract/document/10304252",
    bibtex: `@article{choi2023rfvital,
  title={RF-Vital: Radio-Based Contactless Respiration Monitoring for a Moving Individual},
  author={Choi, Jae-Ho and Kang, Ki-Bong and Kim, Kyung-Tae},
  journal={IEEE Internet of Things Journal},
  volume={11},
  number={5},
  pages={8210--8221},
  year={2023}
}`
  },
  {
    id: "jeong2023beam-scheduling",
    title: "Beam Scheduling of Maritime Multifunctional Radar Based on Binary Integration",
    authors: ["Nam-Hoon Jeong", "Min Kim", "Jae-Ho Choi", "Kyung-Tae Kim*"],
    labAuthors: ["Jae-Ho Choi"],
    venue: "IEEE Access",
    venueShort: "IEEE Access",
    year: 2023,
    type: "journal",
    pdfUrl: "https://ieeexplore.ieee.org/abstract/document/10097706"
  },
  {
    id: "choi2022remote-respiration-eccv",
    title: "Remote Respiration Monitoring of Moving Person Using Radio Signals",
    authors: ["Jae-Ho Choi", "Ki-Bong Kang", "Kyung-Tae Kim*"],
    labAuthors: ["Jae-Ho Choi"],
    venue: "European Conference on Computer Vision (ECCV)",
    venueShort: "ECCV",
    year: 2022,
    type: "conference",
    isTopConf: true,
    pdfUrl: "https://www.ecva.net/papers/eccv_2022/papers_ECCV/papers/136970248.pdf",
    bibtex: `@inproceedings{choi2022remote,
  title={Remote Respiration Monitoring of Moving Person Using Radio Signals},
  author={Choi, Jae-Ho and Kang, Ki-Bong and Kim, Kyung-Tae},
  booktitle={European Conference on Computer Vision (ECCV)},
  pages={248--264},
  year={2022}
}`
  },
  {
    id: "jeong2022sar-target",
    title: "Feature Selection for SAR Target Discrimination and Efficient Two-Stage Detection Method",
    authors: ["Nam-Hoon Jeong", "Jae-Ho Choi", "Geon Lee", "Ji-Hoon Park", "Kyung-Tae Kim*"],
    labAuthors: ["Jae-Ho Choi"],
    venue: "Remote Sensing",
    venueShort: "Remote Sensing",
    year: 2022,
    type: "journal",
    pdfUrl: "https://www.mdpi.com/2072-4292/14/16/4044"
  },
  {
    id: "choi2022deep-people-counting",
    title: "Deep Learning Approach for Radar-Based People Counting",
    authors: ["Jae-Ho Choi", "Ji-Eun Kim", "Kyung-Tae Kim*"],
    labAuthors: ["Jae-Ho Choi"],
    venue: "IEEE Internet of Things Journal (IoTJ)",
    venueShort: "IEEE IoTJ",
    year: 2022,
    type: "journal",
    pdfUrl: "https://ieeexplore.ieee.org/abstract/document/9540889"
  },
  {
    id: "choi2022fusion-sar-atr",
    title: "Fusion of Target and Shadow Regions for Improved SAR ATR",
    authors: ["Jae-Ho Choi", "Myung-Jun Lee", "Nam-Hoon Jeong", "Geon Lee", "Kyung-Tae Kim*"],
    labAuthors: ["Jae-Ho Choi"],
    venue: "IEEE Transactions on Geoscience and Remote Sensing (TGRS)",
    venueShort: "IEEE TGRS",
    year: 2022,
    type: "journal",
    pdfUrl: "https://ieeexplore.ieee.org/document/9751685",
  },
  {
    id: "kang2021uav-microdoppler",
    title: "Analysis of Micro-Doppler Signatures of Small UAVs Based on Doppler Spectrum",
    authors: ["Ki-Bong Kang", "Jae-Ho Choi", "Byung-Lae Cho", "Jung-Soo Lee", "Kyung-Tae Kim*"],
    labAuthors: ["Jae-Ho Choi"],
    venue: "IEEE Transactions on Aerospace and Electronic Systems (TAES)",
    venueShort: "IEEE TAES",
    year: 2021,
    type: "journal",
    pdfUrl: "https://ieeexplore.ieee.org/document/9409707"
  },
  {
    id: "choi2021cardiac-rate",
    title: "Robust Cardiac Rate Estimation of an Individual",
    authors: ["In-Oh Choi", "Min Kim", "Jae-Ho Choi", "Jeong-Ki Park", "Kyung-Tae Kim*"],
    labAuthors: ["Jae-Ho Choi"],
    venue: "IEEE Sensors Journal",
    venueShort: "IEEE SensJ",
    year: 2021,
    type: "journal",
    pdfUrl: "https://ieeexplore.ieee.org/document/9409125"
  },
  {
    id: "choi2021people-counting-iruwb",
    title: "People Counting Using IR-UWB Radar Sensor in a Wide Area",
    authors: ["Jae-Ho Choi", "Ji-Eun Kim", "Kyung-Tae Kim*"],
    labAuthors: ["Jae-Ho Choi"],
    venue: "IEEE Internet of Things Journal (IoTJ)",
    venueShort: "IEEE IoTJ",
    year: 2021,
    type: "journal",
    pdfUrl: "https://ieeexplore.ieee.org/document/9234452",
    videoUrl: "https://www.youtube.com/watch?v=SRfiu0eAav8"
  },
  {
    id: "choi2020radarconf",
    title: "Accurate People Counting Based on Radar: Deep Learning Approach",
    authors: ["Jae-Ho Choi", "Ji-Eun Kim", "Nam-Hoon Jeong", "Kyung-Tae Kim*", "Seung-Hyun Jin"],
    labAuthors: ["Jae-Ho Choi"],
    venue: "IEEE Radar Conference (RadarConf)",
    venueShort: "IEEE RadarConf",
    year: 2020,
    type: "conference",
    pdfUrl: "https://ieeexplore.ieee.org/document/9266496"
  },
  {
    id: "kim2020presence-detection",
    title: "Robust Detection of Presence of Individuals in an Indoor Environment Using IR-UWB Radar",
    authors: ["Ji-Eun Kim", "Jae-Ho Choi", "Kyung-Tae Kim*"],
    labAuthors: ["Jae-Ho Choi"],
    venue: "IEEE Access",
    venueShort: "IEEE Access",
    year: 2020,
    type: "journal",
    pdfUrl: "https://ieeexplore.ieee.org/abstract/document/9110845"
  },
  // Domestic Papers (KIEES)
  {
    id: "hong2026kiees-summer1",
    title: "딥러닝 해상 소형 표적 탐지를 위한 물리 모델 기반 레이더 신호 합성 및 학습 파이프라인",
    authors: ["Ji-Hyuck Hong", "Eun-Chan Kim", "Jae-Hyun Park", "In-Oh Choi", "Min Kim", "Hun-Yong Shin", "Dong-Young Kim", "Jae-Ho Choi*"],
    labAuthors: ["Ji-Hyuck Hong", "Eun-Chan Kim", "Jae-Hyun Park", "Jae-Ho Choi"],
    venue: "한국전자파학회 하계종합학술대회 (KIEES)",
    venueShort: "KIEES Summer",
    year: 2026,
    type: "conference",
    isDomestic: true,
  },
  {
    id: "kim2026kiees-summer2",
    title: "레이더 해상 클러터 시뮬레이터를 활용한 트랜스포머 기반 거리-도플러 표적 탐지",
    authors: ["Eun-Chan Kim", "Jae-Hyeon Kim", "Ji-Hyuck Hong", "In-Oh Choi", "Min Kim", "Hun-Yong Shin", "Dong-Young Kim", "Jae-Ho Choi*"],
    labAuthors: ["Eun-Chan Kim", "Jae-Hyeon Kim", "Ji-Hyuck Hong", "Jae-Ho Choi"],
    venue: "한국전자파학회 하계종합학술대회 (KIEES)",
    venueShort: "KIEES Summer",
    year: 2026,
    type: "conference",
    isDomestic: true,
  },
  {
    id: "hong2026kiees-journal",
    title: "딥러닝 기반 교차 도메인 UAV 식별을 위한 레이더 마이크로 도플러 신호 증강 전략",
    authors: ["Ji-Hyuck Hong", "Jae-Hyun Park", "Ki-Bong Kang", "Min Kim", "Hun-Yong Shin", "Dong-Young Kim", "Jae-Ho Choi*"],
    labAuthors: ["Ji-Hyuck Hong", "Jae-Hyun Park", "Jae-Ho Choi"],
    venue: "한국전자파학회 논문지 (JKIEES)",
    venueShort: "JKIEES",
    year: 2026,
    type: "journal",
    isDomestic: true,
  },
  {
    id: "lee2026kiees-journal",
    title: "확산 모델 기반 레이더-카메라 융합 깊이 추정에 관한 연구",
    authors: ["Jae-Ryong Lee", "Jeong-Wan Shin", "Hun-Yong Shin", "Dong-Young Kim", "Min Kim", "Jae-Ho Choi*"],
    labAuthors: ["Jae-Ryong Lee", "Jeong-Wan Shin", "Jae-Ho Choi"],
    venue: "한국전자파학회 논문지 (JKIEES)",
    venueShort: "JKIEES",
    year: 2026,
    type: "journal",
    isDomestic: true,
  },
  {
    id: "choi2026kiees-winter",
    title: "레이더 신호 특화적 AI 및 파운데이션 모델로의 확장",
    authors: ["Jae-Ho Choi*"],
    labAuthors: ["Jae-Ho Choi"],
    venue: "한국전자파학회 동계종합학술대회 (KIEES)",
    venueShort: "KIEES Winter",
    year: 2026,
    type: "conference",
    isDomestic: true,
  },
  {
    id: "kim2026kiees-mae",
    title: "Masked Autoencoder 기반 자율주행 mmWave 레이더 자기지도학습",
    authors: ["Eun-Chan Kim", "Jeong-Wan Shin", "Jae-Ho Choi*"],
    labAuthors: ["Eun-Chan Kim", "Jeong-Wan Shin", "Jae-Ho Choi"],
    venue: "한국전자파학회 동계종합학술대회 (KIEES)",
    venueShort: "KIEES Winter",
    year: 2026,
    type: "conference",
    isDomestic: true,
  },
  {
    id: "lee2026kiees-diff",
    title: "Diffusion 기반 레이더-카메라 융합 깊이 추정 모델",
    authors: ["Jae-Ryong Lee", "Jeong-Wan Shin", "Jae-Ho Choi*"],
    labAuthors: ["Jae-Ryong Lee", "Jeong-Wan Shin", "Jae-Ho Choi"],
    venue: "한국전자파학회 동계종합학술대회 (KIEES)",
    venueShort: "KIEES Winter",
    year: 2026,
    type: "conference",
    isDomestic: true,
  },
  {
    id: "kim2025kiees-pose",
    title: "mmWave 레이다 기반 향상된 3D 자세 추정을 위한 인코딩 기법 연구",
    authors: ["Jae-Hyeon Kim", "Jae-Ho Choi*"],
    labAuthors: ["Jae-Hyeon Kim", "Jae-Ho Choi"],
    venue: "한국전자파학회 하계종합학술대회 (KIEES)",
    venueShort: "KIEES Summer",
    year: 2025,
    type: "conference",
    isDomestic: true,
  }
];
