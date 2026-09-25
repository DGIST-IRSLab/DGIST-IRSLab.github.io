export type ThemeMode = 'light' | 'dark' | 'system';

export interface ResearchTopic {
  id: string;
  title: string;
  shortTitle: string;
  question: string;
  summary: string;
  description: string[];
  keywords: string[];
  image: string;
  imageCaption: string;
  highlights: string[];
}

export interface ResearchProject {
  id: string;
  title: string;
  agency: string;
  agencyBadge?: string;
  period: string;
  topicId?: string;
  description?: string;
  status: 'ongoing' | 'completed';
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  labAuthors: string[]; // names that belong to IRS lab to highlight
  venue: string;
  venueShort: string;
  year: number;
  type: 'conference' | 'journal' | 'workshop';
  badges?: string[]; // e.g. "Top Conf.", "Oral", "Top 5%"
  pdfUrl?: string;
  projectUrl?: string;
  codeUrl?: string;
  videoUrl?: string;
  doi?: string;
  bibtex?: string;
  abstract?: string;
  thumbnail?: string;
  isDomestic?: boolean;
  selected?: boolean;
}

export interface Person {
  id: string;
  name: string;
  nameKr?: string;
  role: 'Professor' | 'Postdoc Fellow' | 'Ph.D. Student' | 'Integrated M.S./Ph.D.' | 'Integrated Ph.D.' | 'Joint MS & PhD' | 'MS Student' | 'Undergraduate Researcher' | 'Alumni';
  title: string;
  photo: string;
  email?: string;
  phone?: string;
  room?: string;
  bio?: string;
  researchInterests?: string[];
  education?: string[];
  experience?: string[];
  website?: string;
  googleScholar?: string;
  github?: string;
  linkedin?: string;
  cvUrl?: string;
  alumniDestination?: string;
  alumniPeriod?: string;
}

export interface InternGroup {
  period: string;
  names: string[];
}

export interface NewsItem {
  id: string;
  date: string; // "2026.08"
  category: 'PAPER' | 'AWARD' | 'GRANT' | 'PEOPLE' | 'TALK' | 'NEWS';
  title: string;
  description?: string;
  link?: string;
  highlight?: boolean;
}

export interface GalleryFolderItem {
  id: string;
  title: string;
  date: string;
  folder: string;
}

export interface GalleryFolder extends GalleryFolderItem {
  images: {
    src: string;
    caption?: string;
  }[];
}

