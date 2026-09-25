import type { Person, InternGroup } from '../types';

export const professor: Person = {
  id: "jaeho-choi",
  name: "Jae-Ho Choi",
  nameKr: "최재호",
  role: "Professor",
  title: "Assistant Professor",
  photo: "/images/teampic/Jaeho2.jpg",
  email: "jhochoi@dgist.ac.kr",
  phone: "+82-53-785-6328",
  room: "Engineering Building E3, Room 406",
  bio: "Jae-Ho Choi is an Assistant Professor in the Department of Electrical Engineering and Computer Science (EECS) and Department of Interdisciplinary Studies of Artificial Intelligence (AI) at DGIST since December 2024. Prior to joining DGIST, he was a Postdoctoral Scholar in the Department of Electrical Engineering at Stanford University (advised by Prof. Amin Arbabian) from 2023 to 2024. He received his Ph.D. and M.S. degrees in Electrical Engineering from POSTECH (advised by Prof. Kyung-Tae Kim) in 2023 and 2019, and his B.S. degree in Computer Science from Korea University in 2017.",
  researchInterests: [
    "Radio+X Perception Technologies (Indoor perception, 3D human pose, vital signs)",
    "AI for Wireless & Radar (Wireless-centric learning, complex neural networks, foundation models)",
    "Defense & Remote Sensing (Synthetic aperture radar, target detection/tracking, micro-Doppler)"
  ],
  education: [
    "Ph.D., Electrical Engineering, POSTECH (2019.02 – 2023.02)",
    "M.S., Electrical Engineering, POSTECH (2017.02 – 2019.02)",
    "B.S., Computer Science, Korea University (2011.03 – 2017.02)"
  ],
  experience: [
    "Assistant Professor, EECS & AI, DGIST (2024.12 – Present)",
    "Postdoctoral Scholar, Department of Electrical Engineering, Stanford University (2023.04 – 2024.10)",
    "Postdoctoral Researcher, Next-Gen. Defense Tech. Research Center, POSTECH (2023.02 – 2023.03)",
    "Intern, Memory Division, Samsung Electronics (2016.06 – 2016.09)"
  ],
  googleScholar: "https://scholar.google.com/citations?user=ywDewK4AAAAJ&hl=en",
  cvUrl: "https://www.overleaf.com/read/yjhfmgxbrmgm#925bd3",
  linkedin: "https://www.linkedin.com/in/gogoho88"
};

export const postdocs: Person[] = [
  {
    id: "jeongwan-shin",
    name: "Jeongwan Shin",
    nameKr: "신정완",
    role: "Postdoc Fellow",
    title: "Postdoctoral Fellow",
    photo: "/images/teampic/student_jeongwan.png",
    email: "jwshin@dgist.ac.kr",
    website: "https://jeongwan-shin.github.io/",
    researchInterests: ["Computer Vision", "Video Question Answering", "Radar-Camera Multimodal Learning"]
  },
  {
    id: "yazdan-qadri",
    name: "Yazdan Qadri",
    role: "Postdoc Fellow",
    title: "Postdoctoral Fellow",
    photo: "/images/teampic/postdoc_YQ.jpg",
    email: "yazdan@dgist.ac.kr",
    website: "https://yazdanaq.github.io/",
    researchInterests: ["Wireless Communications", "Signal Processing", "Physical Layer Security & AI"]
  }
];

export const graduateStudents: Person[] = [
  {
    id: "seongryeong-lee",
    name: "Seongryeong Lee",
    nameKr: "이성령",
    role: "Ph.D. Student",
    title: "Ph.D. Student",
    photo: "/images/teampic/student_LSR.jpg",
    email: "seongryeong.lee@dgist.ac.kr",
    researchInterests: ["Radar Signal Processing", "Physical AI", "Micro-Doppler Kinematics"]
  },
  {
    id: "jaehyeon-kim",
    name: "Jaehyeon Kim",
    nameKr: "김재현",
    role: "Joint MS & PhD",
    title: "Joint MS & Ph.D. Student",
    photo: "/images/teampic/student_jaehyun.jpg",
    email: "sks05248@dgist.ac.kr",
    researchInterests: ["mmWave Radar 3D Pose Estimation", "Foundation Models for Radar", "LLM Radar Understanding"]
  },
  {
    id: "jihyuck-hong",
    name: "Ji-Hyuck Hong",
    nameKr: "홍지혁",
    role: "Joint MS & PhD",
    title: "Joint MS & Ph.D. Student",
    photo: "/images/teampic/student_jihyeok.jpg",
    email: "jh.hong@dgist.ac.kr",
    researchInterests: ["Maritime Radar Signal Processing", "UAV Micro-Doppler Augmentation", "IEEE GRSS Seoul Chapter Awardee"]
  },
  {
    id: "jaeryong-lee",
    name: "Jaeryong Lee",
    nameKr: "이재룡",
    role: "Joint MS & PhD",
    title: "Joint MS & Ph.D. Student",
    photo: "/images/teampic/student_LJR2.jpg",
    email: "wofyd0826@dgist.ac.kr",
    researchInterests: ["Diffusion Models for Radar-Camera Fusion", "Metric Depth Estimation", "Sensor Fusion"]
  },
  {
    id: "seungeun-kang",
    name: "Seungeun Kang",
    nameKr: "강승은",
    role: "Joint MS & PhD",
    title: "Joint MS & Ph.D. Student",
    photo: "/images/teampic/student_KSE2.jpg",
    email: "seungeun.kang@dgist.ac.kr",
    researchInterests: ["Wireless AI", "Contactless Sensing", "Signal Representation Learning"]
  },
  {
    id: "eunchan-kim",
    name: "Eunchan Kim",
    nameKr: "김은찬",
    role: "MS Student",
    title: "M.S. Student",
    photo: "/images/teampic/student_eunchan.jpg",
    email: "eunchan.kim@dgist.ac.kr",
    researchInterests: ["Masked Autoencoders for Radar", "Self-Supervised Learning", "Range-Doppler Detection"]
  },
  {
    id: "donguk-ko",
    name: "Donguk Ko",
    nameKr: "고동욱",
    role: "MS Student",
    title: "M.S. Student",
    photo: "/images/teampic/student_DW.jpg",
    email: "duko@dgist.ac.kr",
    researchInterests: ["LLMs for mmWave Data", "Multimodal Benchmarking", "Signal Processing"]
  },
  {
    id: "bumjoon-kim",
    name: "Bumjoon Kim",
    nameKr: "김범준",
    role: "MS Student",
    title: "M.S. Student",
    photo: "/images/teampic/student_BJK.jpg",
    email: "bj1430@dgist.ac.kr",
    researchInterests: ["RF Sensing Systems", "Hardware Testbeds", "Real-Time Embedded AI"]
  },
  {
    id: "minkyoung-shim",
    name: "Minkyoung Shim",
    nameKr: "심민경",
    role: "MS Student",
    title: "M.S. Student",
    photo: "/images/teampic/student_MKS.jpg",
    email: "musum129@dgist.ac.kr",
    researchInterests: ["Physiological Sensing", "Contactless Vital Monitoring", "Deep Signal Analysis"]
  },
  {
    id: "jeongwoo-han",
    name: "Jeongwoo Han",
    nameKr: "한정우",
    role: "MS Student",
    title: "M.S. Student",
    photo: "/images/teampic/student_JWH.jpg",
    email: "hanjw927@dgist.ac.kr",
    researchInterests: ["Radar Signal Processing", "Autonomous Vehicle Perception", "Spatial Clustering"]
  },
  {
    id: "minjae-kim",
    name: "Minjae Kim",
    nameKr: "김민재",
    role: "MS Student",
    title: "M.S. Student",
    photo: "/images/teampic/student_KMJ.jpg",
    email: "minjaek@dgist.ac.kr",
    researchInterests: ["Multimodal Fusion", "Complex Neural Networks", "Sensing Under Darkness"]
  }
];

export const undergraduateResearchers: Person[] = [
  {
    id: "jaeone-yun",
    name: "Jaeone Yun",
    nameKr: "윤재원",
    role: "Undergraduate Researcher",
    title: "Undergraduate Researcher",
    photo: "/images/teampic/student_JW.jpg",
    email: "jaeoneyun@dgist.ac.kr",
    researchInterests: ["Radar Signal Processing", "Machine Learning"]
  },
  {
    id: "yunjung-jeong",
    name: "Yunjung Jeong",
    nameKr: "정윤중",
    role: "Undergraduate Researcher",
    title: "Undergraduate Researcher",
    photo: "/images/teampic/student_YJJ.jpg",
    email: "ak0147@dgist.ac.kr",
    website: "https://yunjung-jeong.github.io/cv/",
    researchInterests: ["Wireless AI", "Deep Learning Architectures"]
  },
  {
    id: "junhyung-gong",
    name: "Junhyung Gong",
    nameKr: "공준형",
    role: "Undergraduate Researcher",
    title: "Undergraduate Researcher",
    photo: "/images/teampic/student_jhgong.jpg",
    email: "jhgong@dgist.ac.kr",
    researchInterests: ["RF Sensing", "Embedded Systems"]
  }
];

export const alumni: Person[] = [
  {
    id: "jaehyun-park",
    name: "Dr. Jaehyun Park",
    nameKr: "박재현 박사",
    role: "Alumni",
    title: "Postdoctoral Fellow (2025–2026)",
    photo: "/images/teampic/student_jaehyunpark.jpg",
    alumniPeriod: "2025 – 2026",
    alumniDestination: "NASA Jet Propulsion Laboratory (JPL)",
    website: "https://jhynpark.github.io/",
    researchInterests: ["Planetary Radar", "Remote Sensing", "Signal Processing"]
  },
  {
    id: "dohyun-park",
    name: "Dr. Dohyun Park",
    nameKr: "박도현 박사",
    role: "Alumni",
    title: "Postdoctoral Fellow (2025–2026)",
    photo: "/images/teampic/postdoc_DH.jpg",
    alumniPeriod: "2025 – 2026",
    alumniDestination: "NASA Jet Propulsion Laboratory (JPL)",
    website: "https://sites.google.com/view/dohyunpark",
    researchInterests: ["Synthetic Aperture Radar", "Geophysical Inversion", "Machine Learning"]
  }
];

export const internHistory: InternGroup[] = [
  {
    period: "2026 Summer",
    names: ["Jaeone Yun (윤재원)", "Junwon Choi (최준원)"]
  },
  {
    period: "2026 Winter",
    names: ["Jaeryong Lee (이재룡)", "Jaeone Yun (윤재원)", "Yunjung Jeong (정윤중)"]
  },
  {
    period: "2025 Fall (2025.07 ~ 2025.12)",
    names: ["Nahyeon Kim (김나현)"]
  },
  {
    period: "2025 Summer",
    names: ["Donguk Ko (고동욱)", "Uhyeok Kwon (권우혁)", "Dohyeok Nam (남도혁)", "Jaeryong Lee (이재룡)"]
  }
];
