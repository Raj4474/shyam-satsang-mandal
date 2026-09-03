export interface Author {
  id: string;
  name: string;
  gujaratiName: string;
  slug: string;
  profileImage?: string | null;
  shortBio?: string | null;
  fullBio?: string | null;
  birthInfo?: string | null;
  tags?: string | null;
  featured: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  _count?: {
    bhajans: number;
    dhuns: number;
  };
}

export interface Bhajan {
  id: string;
  title: string;
  slug: string;
  authorId?: string | null;
  author?: Author | null;
  category?: string | null;
  description?: string | null;
  lyrics: string;
  audioUrl?: string | null;
  pdfUrl?: string | null;
  coverImage?: string | null;
  textColor?: string | null;
  featured: boolean;
  sortOrder?: number;
  status: 'DRAFT' | 'PUBLISHED' | string;
  publishedAt?: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface Dhun {
  id: string;
  title: string;
  slug: string;
  authorId?: string | null;
  author?: Author | null;
  description?: string | null;
  lyrics?: string | null;
  audioUrl?: string | null;
  videoUrl?: string | null;
  pdfUrl?: string | null;
  coverImage?: string | null;
  textColor?: string | null;
  featured: boolean;
  sortOrder?: number;
  status: 'DRAFT' | 'PUBLISHED' | string;
  publishedAt?: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface BiographySection {
  id: string;
  title: string;
  slug: string;
  content: string;
  type: 'TEXT' | 'IMAGE' | 'GALLERY' | 'TIMELINE' | 'QUOTE' | 'VIDEO' | 'AUDIO' | string;
  mediaUrl?: string | null;
  textColor?: string | null;
  sortOrder: number;
  published: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  type: 'IMAGE' | 'AUDIO' | 'PDF' | 'VIDEO' | string;
  size: number;
  createdAt?: Date | string;
}

export interface AudioTrack {
  id: string;
  title: string;
  authorName?: string;
  audioUrl: string;
  coverImage?: string;
  type?: 'bhajan' | 'dhun';
}
