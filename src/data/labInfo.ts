/**
 * ============================================================================
 * [데이터 파일 가이드: 연구실 기본 정보 및 메타데이터 (Lab Information)]
 * ============================================================================
 * 이 파일은 웹사이트 전역(헤더, 푸터, 홈 히어로 섹션, 소개, 통계, 연락처 페이지 등)에서
 * 공통으로 참조되는 연구실의 핵심 메타데이터를 관리합니다.
 *
 * ----------------------------------------------------------------------------
 * ■ labInfo 객체의 주요 필드 설명
 * ----------------------------------------------------------------------------
 * - name (string): 연구실 공식 영문 명칭 ("Intelligent Radio Sensing Laboratory")
 * - shortName (string): 연구실 약칭 ("IRS Lab")
 * - affiliation (string): 대표 소속 기관명 ("DGIST")
 * - fullAffiliation (string): 소속 학과 전체 명칭 (EECS 및 AI 전공)
 * - university (string): 대학교 정식 명칭
 * - location (string): 도시 및 국가명 ("Daegu, Republic of Korea")
 * - address (string): 연구실 상세 도로명 주소
 * - building (string): 연구실 위치 건물 및 호수 ("Engineering Building E3, Room 406")
 * - email (string): 연구실 대표 문의 이메일 ("jhochoi@dgist.ac.kr")
 * - phone (string): 연구실 대표 전화번호
 * - opened (string): 연구실 개소 시점 ("December 2024")
 * - tagline (string): 홈 화면 히어로 섹션에 노출되는 대표 슬로건
 *     예: "AI-Driven Wireless+X Sensing"
 * - keywords (string[]): 연구실 핵심 연구 분야 키워드 태그 목록
 * - mission (string): 연구실 비전 및 미션 선언문
 * - notionContactLink (string): 컨택 관련 Notion 페이지 링크 URL
 * - notionPostdocLink (string): 포닥/연구원 채용 공고 Notion 페이지 링크 URL
 * - coordinates (object): 지도 표기용 위도(lat), 경도(lng) 지리 좌표
 * - stats (array): 홈 화면 및 소개에 노출되는 연구실 대표 통계 지표 배열
 *     - label: 통계 라벨 (예: "Active Research Grants", "Lab Members")
 *     - value: 통계 값 (예: "9+", "16")
 * ============================================================================
 */

export const labInfo = {
  name: "Intelligent Radio Sensing Laboratory",
  shortName: "IRS Lab",
  affiliation: "DGIST",
  fullAffiliation: "Department of Electrical Engineering and Computer Science (EECS) & Department of Interdisciplinary Studies of Artificial Intelligence (AI)",
  university: "Daegu Gyeongbuk Institute of Science and Technology (DGIST)",
  location: "Daegu, Republic of Korea",
  address: "333 Techno Jungang-daero, Yuga-eup, Dalseong-gun, Daegu 42988, Republic of Korea",
  building: "Engineering Building E3, Room 406",
  email: "jhochoi@dgist.ac.kr",
  phone: "+82-53-785-6328",
  opened: "December 2024",
  tagline: "AI-Driven Wireless+X Sensing",
  keywords: ["RADAR SENSING", "AI FOR WIRELESS", "MULTIMODAL PERCEPTION", "PHYSICAL INTELLIGENCE"],
  mission: "Our mission is to develop new sensing technologies to perceive the world from entirely new perspectives through AI-Driven Wireless+X Sensing. By integrating the power of artificial intelligence with radio-frequency signal processing—and expanding these capabilities through multi-modal sensor fusion—we push the boundaries of human and robotic perceptual capabilities.",
  notionContactLink: "https://modern-plutonium-519.notion.site/IRS-Lab-Contact-Info-18ed30c1d89b80a18087f093927b241b?pvs=4",
  notionPostdocLink: "https://modern-plutonium-519.notion.site/Postdoc-Hiring-21ed30c1d89b8085be8bc9e23719da51",
  coordinates: {
    lat: 35.7060902,
    lng: 128.4533465
  },
  stats: [
    { label: "Active Research Grants", value: "9+" },
    { label: "Top-Tier Venues", value: "CVPR, NeurIPS, ECCV, AAAI, ICASSP" },
    { label: "Lab Members", value: "16" },
    { label: "Established", value: "2024" }
  ]
};
