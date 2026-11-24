/**
 * ============================================================================
 * [데이터 파일 가이드: 연구실 장비 (Hardware Members - Easter Egg)]
 * ============================================================================
 * Members 페이지의 "Graduate Students" 타이틀을 7회 클릭하면 벽이 무너지며
 * 등장하는 히든 섹션("Hardware Members")에 표시되는 장비 목록입니다.
 *
 * ■ 새로운 장비 추가 방법
 * 1. 장비 이미지를 `public/images/equipment/` 폴더에 추가합니다.
 *    (예: `public/images/equipment/my-radar.png`)
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
  {
    id: 'ti-awr2944',
    name: 'TI AWR2944',
    role: '77 GHz mmWave Radar',
    vendor: 'Texas Instruments',
    specs: '4TX · 4RX · 76–81 GHz EVM',
    photo: '/images/equipment/ti-awr2944.png',
    url: 'https://www.ti.com/tool/AWR2944EVM',
    badgeVariant: 'radar',
  },
  {
    id: 'dca1000',
    name: 'DCA1000',
    role: 'Raw Data Capture',
    vendor: 'Texas Instruments',
    specs: 'Real-Time LVDS-to-Ethernet',
    photo: '/images/equipment/dca1000.png',
    url: 'https://www.ti.com/tool/DCA1000EVM',
    badgeVariant: 'capture',
  },
  {
    id: 'imagevk-74',
    name: 'IMAGEVK-74',
    role: '4D Imaging Radar',
    vendor: 'Mini-Circuits / Vayyar',
    specs: '20TX · 20RX · 62–69 GHz',
    photo: '/images/equipment/imagevk-74.png',
    url: 'https://www.minicircuits.com/WebStore/dashboard.html?model=IMAGEVK-74',
    badgeVariant: 'imaging',
  },
  {
    id: 'hardware-tbd',
    name: 'More Hardware',
    role: 'Coming Soon',
    specs: 'New sensing gear joining soon',
    badgeVariant: 'upcoming',
    isComingSoon: true,
  },
];
