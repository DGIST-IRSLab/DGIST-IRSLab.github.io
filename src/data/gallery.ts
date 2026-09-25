import type { GalleryFolder, GalleryFolderItem } from '../types';

// Automatically discover all gallery images in public/images/gallery
const galleryImageModules = import.meta.glob<string>(
  '/public/images/gallery/**/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP,GIF}',
  { eager: true, query: '?url', import: 'default' }
);

// Group images by folder name
const folderImageMap: Record<string, { src: string; filename: string }[]> = {};

for (const [path, url] of Object.entries(galleryImageModules)) {
  const match = path.match(/\/gallery\/([^/]+)\/([^/]+)$/);
  if (match) {
    const [, folder, filename] = match;
    if (!folderImageMap[folder]) {
      folderImageMap[folder] = [];
    }
    folderImageMap[folder].push({
      src: url,
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
