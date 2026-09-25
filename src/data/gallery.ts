/**
 * ============================================================================
 * [데이터 파일 가이드: 연구실 갤러리 및 행사 사진 (Gallery & Activities)]
 * ============================================================================
 * 이 파일은 연구실 세미나, 학술대회 참가, 회식, 워크숍 등 활동 사진 앨범을 관리합니다.
 * 본 시스템은 이미지 자동 검색(Auto-Discovery) 기능을 탑재하고 있어 파일명들을
 * 일일이 코드로 작성할 필요 없이 폴더명과 앨범 정보만 등록하면 됩니다.
 *
 * ----------------------------------------------------------------------------
 * ■ 새로운 갤러리 앨범 추가하는 방법 (간단 2단계)
 * ----------------------------------------------------------------------------
 * 1단계: 사진 파일 준비 및 폴더 생성
 *   - `public/images/gallery/` 경로 아래에 새 행사 폴더를 생성합니다. (예: `202610`)
 *   - 해당 폴더 안에 사진들을 넣습니다. (예: `1.jpg`, `2.jpg`, `3.jpg` ...)
 *   - 사진들은 파일명 숫자 순서(1, 2, ... 10)대로 자동 정렬되어 표시됩니다.
 *
 * 2단계: 아래 `galleryFolderData` 배열에 앨범 정보 추가
 *   - 최신 앨범을 배열 맨 위에 추가합니다.
 *
 * ----------------------------------------------------------------------------
 * ■ GalleryFolderItem 필드 설명
 * ----------------------------------------------------------------------------
 * - id (필수, string): 앨범 고유 식별자 (예: 'gallery-2026-10')
 * - title (필수, string): 앨범 제목 및 행사 명칭 (예: 'DGIST Autumn Workshop')
 * - date (필수, string): 행사 일자 또는 연월 (예: '2026.10')
 * - folder (필수, string): `public/images/gallery/` 내의 실제 폴더명 (예: '202610')
 *
 * ----------------------------------------------------------------------------
 * ■ 새로운 앨범 추가 예시 (galleryFolderData 배열 맨 위에 추가)
 * ----------------------------------------------------------------------------
 * {
 *   id: "gallery-2026-10",
 *   title: "IRS Lab Autumn Workshop & Dinner",
 *   date: "2026.10",
 *   folder: "202610",
 * },
 * ============================================================================
 */

import type { GalleryFolder, GalleryFolderItem } from '../types';

// Automatically discover all gallery images in public/images/gallery
const galleryImageGlobs = import.meta.glob(
  '/public/images/gallery/**/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP,GIF}'
);

// Group images by folder name
const folderImageMap: Record<string, { src: string; filename: string }[]> = {};

for (const path of Object.keys(galleryImageGlobs)) {
  const match = path.match(/\/gallery\/([^/]+)\/([^/]+)$/);
  if (match) {
    const [, folder, filename] = match;
    if (!folderImageMap[folder]) {
      folderImageMap[folder] = [];
    }
    folderImageMap[folder].push({
      src: `/images/gallery/${folder}/${filename}`,
      filename,
    });
  }
}

// Sort each folder's images in natural order (1.jpg, 2.jpg, ... 10.jpg)
for (const folder of Object.keys(folderImageMap)) {
  folderImageMap[folder].sort((a, b) =>
    a.filename.localeCompare(b.filename, undefined, { numeric: true, sensitivity: 'base' })
  );
}

// List of gallery albums: specify id, title, date, folder only
export const galleryFolderData: GalleryFolderItem[] = [
  {
    id: "gallery-2026-09",
    title: "IRS Lab Research Seminar & Discussions",
    date: "2026.09",
    folder: "202609",
  },
  {
    id: "gallery-2026-08-recap",
    title: "August Lab Highlights & Activities",
    date: "2026.08",
    folder: "202608_2",
  },
  {
    id: "gallery-2026-08-kiees",
    title: "KIEES Summer Conference 2026",
    date: "2026.08",
    folder: "202608_1",
  },
  {
    id: "gallery-2026-07-icml",
    title: "ICML 2026 Conference Attendance",
    date: "2026.07",
    folder: "202607_2",
  },
  {
    id: "gallery-2026-07-recap",
    title: "July Summer Research & Testbed Sessions",
    date: "2026.07",
    folder: "202607_1",
  },
  {
    id: "gallery-2026-05",
    title: "Teacher's Day Celebration",
    date: "2026.05",
    folder: "202605",
  },
  {
    id: "gallery-2026-04",
    title: "DGIST Spring Cherry Blossom Gathering",
    date: "2026.04",
    folder: "202604",
  },
  {
    id: "gallery-2026-02-kiees",
    title: "KIEES Winter Conference 2026",
    date: "2026.02",
    folder: "202602",
  },
];

export const galleryFolders: GalleryFolder[] = galleryFolderData.map((album) => {
  const images = (folderImageMap[album.folder] || []).map((img) => ({
    src: img.src,
  }));
  return {
    ...album,
    images,
  };
});
