/**
 * ============================================================================
 * [데이터 파일 가이드: 연구실 장비 (Hardware Members - Easter Egg)]
 * ============================================================================
 * Members 페이지 하단에서 빠르거나 강하게 아래로 스크롤하면 뾰로롱✨ 하며
 * 등장하는 히든 섹션("Hardware Members")에 표시되는 장비 목록입니다.
 *
 * ■ 새로운 장비 추가 방법
 * 1. 장비 이미지를 `public/images/equipment/` 폴더에 추가합니다.
 *    (예: `public/images/equipment/my-radar.png`)
 *    - 투명 배경 PNG는 기본적으로 여백을 두고 깔끔하게 중앙 배치(`photoFit: 'contain'`)됩니다.
 *    - 배경이 포함된 일반 사진은 `photoFit: 'cover'`로 설정하면 프레임에 꽉 차게 표시됩니다.
 * 2. (선택) 호버 시 보여줄 재미있는 실전 셋업 사진이 있다면
 *    `public/images/equipment/special/` 폴더에 장비 id와 동일한 파일명으로 넣습니다.
 * 3. 아래 `hardwareMembers` 배열의 'hardware-tbd' 항목 위에 새 객체를 추가합니다.
 * ============================================================================
 */

import type { HardwareMember } from '../types';

// Auto-discover optional hover special photos placed in public/images/equipment/special/
const specialEquipmentGlobs = import.meta.glob(
  '/public/images/equipment/special/**/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP,GIF}'
);

const specialEquipmentMap = new Map<string, string>();
for (const rawPath of Object.keys(specialEquipmentGlobs)) {
  const filename = rawPath.split('/').pop();
  if (filename) {
    const webPath = rawPath.replace(/^\/public/, '');
    specialEquipmentMap.set(filename.toLowerCase(), webPath);
    const baseWithoutExt = filename.replace(/\.[^/.]+$/, '').toLowerCase();
    specialEquipmentMap.set(baseWithoutExt, webPath);
  }
}

export function getSpecialEquipmentPhoto(item: HardwareMember): string | undefined {
  if (item.specialPhoto) return item.specialPhoto;
  if (item.id && specialEquipmentMap.has(item.id.toLowerCase())) {
    return specialEquipmentMap.get(item.id.toLowerCase());
  }
  if (item.photo) {
    const filename = item.photo.split('/').pop();
    if (filename) {
      if (specialEquipmentMap.has(filename.toLowerCase())) {
        return specialEquipmentMap.get(filename.toLowerCase());
      }
      const baseWithoutExt = filename.replace(/\.[^/.]+$/, '').toLowerCase();
      if (specialEquipmentMap.has(baseWithoutExt)) {
        return specialEquipmentMap.get(baseWithoutExt);
      }
    }
  }
  return undefined;
}

export const hardwareMembers: HardwareMember[] = [
  // Radar & RF Sensing
  {
    id: 'ti-awr2944',
    name: 'TI AWR2944 / 2944P',
    role: 'FMCW Radar',
    vendor: 'Texas Instruments',
    specs: [
      { label: 'Antenna', value: '4TX · 4RX' },
      { label: 'Center Freq', value: '77 GHz (76–81)' },
    ],
    photo: '/images/equipment/ti-awr2944.png',
    url: 'https://www.ti.com/tool/AWR2944EVM',
    badgeVariant: 'radar',
  },
  {
    id: 'ti-awr2544lop',
    name: 'TI AWR2544LOPEVM',
    role: 'FMCW Radar',
    vendor: 'Texas Instruments',
    specs: [
      { label: 'Antenna', value: '4TX · 4RX (LOP)' },
      { label: 'Center Freq', value: '77 GHz (76–81)' },
    ],
    photo: '/images/equipment/awr2544lop.png',
    url: 'https://www.ti.com/tool/AWR2544LOPEVM',
    badgeVariant: 'radar',
  },
  {
    id: 'ti-iwr1443boost',
    name: 'TI IWR1443BOOST',
    role: 'FMCW Radar',
    vendor: 'Texas Instruments',
    specs: [
      { label: 'Antenna', value: '3TX · 4RX' },
      { label: 'Center Freq', value: '77 GHz (76–81)' },
    ],
    photo: '/images/equipment/iwr1443boost.png',
    url: 'https://www.ti.com/tool/IWR1443BOOST',
    badgeVariant: 'radar',
  },
  {
    id: 'dca1000',
    name: 'DCA1000',
    role: 'Capture Board',
    vendor: 'Texas Instruments',
    specs: [
      { label: 'Interface', value: 'LVDS → 1GbE' },
      { label: 'Capture', value: 'Raw ADC Data' },
    ],
    photo: '/images/equipment/dca1000.png',
    url: 'https://www.ti.com/tool/DCA1000EVM',
    badgeVariant: 'capture',
  },
  {
    id: 'imagevk-74',
    name: 'IMAGEVK-74',
    role: 'SFCW Radar',
    vendor: 'Mini-Circuits / Vayyar',
    specs: [
      { label: 'Antenna', value: '20TX · 20RX' },
      { label: 'Freq Band', value: '62–69 GHz' },
    ],
    photo: '/images/equipment/imagevk-74.png',
    url: 'https://www.minicircuits.com/WebStore/dashboard.html?model=IMAGEVK-74',
    badgeVariant: 'imaging',
  },

  // Software-Defined Radios (SDR)
  {
    id: 'ettus-usrp-x410',
    name: 'Ettus USRP X410',
    role: 'SDR Transceiver',
    vendor: 'Ettus Research / NI',
    specs: [
      { label: 'Freq Range', value: '1 MHz–7.2 GHz' },
      { label: 'RF / BW', value: '4TX · 4RX (400 MHz)' },
    ],
    photo: '/images/equipment/ettus-usrp-x410.png',
    url: 'https://www.ettus.com/all-products/usrp-x410/',
    badgeVariant: 'sdr',
  },
  {
    id: 'ni-usrp-2921',
    name: 'NI USRP-2921',
    role: 'SDR Transceiver',
    vendor: 'National Instruments',
    specs: [
      { label: 'Freq Bands', value: '2.4–2.5 · 4.9–5.9 GHz' },
      { label: 'Bandwidth', value: '20 MHz · 1GbE' },
    ],
    photo: '/images/equipment/ni-usrp-2921.png',
    url: 'https://www.ni.com/en/shop/hardware/software-defined-radios/model-usrp-2921',
    badgeVariant: 'sdr',
  },

  // Thermal / IR Cameras
  {
    id: 'flir-boson-320',
    name: 'FLIR Boson 320',
    role: 'Thermal Camera',
    vendor: 'Teledyne FLIR',
    specs: [
      { label: 'Resolution', value: '320 × 256 (12 μm)' },
      { label: 'Spectrum', value: 'LWIR (7.5–13.5 μm)' },
    ],
    photo: '/images/equipment/flir-boson-320.png',
    url: 'https://oem.flir.com/products/boson/',
    badgeVariant: 'thermal',
  },
  {
    id: 'thermoeye-tmc256e',
    name: 'ThermoEye TMC256E',
    role: 'Thermal Camera',
    vendor: 'ThermoEye',
    specs: [
      { label: 'Resolution', value: '256 × 192 (12 μm)' },
      { label: 'Interface', value: 'Ethernet (PoE)' },
    ],
    photo: '/images/equipment/thermoeye-tmc256e.png',
    url: 'https://www.thermoeye.co.kr/solutions/thermalcamera.html',
    badgeVariant: 'thermal',
  },

  // Robotics
  {
    id: 'rb5-850b',
    name: 'RB5-850B',
    role: 'Robot Arm',
    vendor: 'Rainbow Robotics',
    specs: [
      { label: 'DOF / Reach', value: '6-DOF · 850 mm' },
      { label: 'Payload', value: '5 kg' },
    ],
    photo: '/images/equipment/rb5-850b.png',
    url: 'https://www.rainbow-robotics.com/rb5',
    badgeVariant: 'robot',
    photoFit: 'contain',
  },
  {
    id: 'so-101',
    name: 'SO-101',
    role: 'Robot Arm',
    vendor: 'LeRobot / TheRobotStudio',
    specs: [
      { label: 'DOF', value: '6-DOF Open-Source' },
      { label: 'Platform', value: 'Hugging Face LeRobot' },
    ],
    photo: '/images/equipment/so-101.webp',
    url: 'https://github.com/TheRobotStudio/SO-ARM100',
    badgeVariant: 'robot',
    photoFit: 'cover',
  },
  {
    id: 'lekiwi',
    name: 'LeKiwi',
    role: 'Mobile Robot',
    vendor: 'LeRobot / SIGRobotics',
    specs: [
      { label: 'Drive', value: '3-Wheel Omni Base' },
      { label: 'Arm', value: 'SO-101 Manipulator' },
    ],
    photo: '/images/equipment/lekiwi.png',
    url: 'https://github.com/SIGRobotics-UIUC/LeKiwi',
    badgeVariant: 'robot',
    photoFit: 'contain',
  },

  // Recruiting placeholder
  {
    id: 'hardware-tbd',
    name: 'Now Recruiting',
    role: 'New Gear Welcome',
    vendor: '5V DC · Zero complaints',
    badgeVariant: 'upcoming',
    isComingSoon: true,
  },
];
