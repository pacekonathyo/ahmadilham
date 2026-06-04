/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ResearcherProfile {
  name: string;
  titles: string;
  role: string;
  institution: string;
  department: string;
  email: string;
  phone?: string;
  address?: string;
  aboutMe: string;
  researchInterests: string[];
  googleScholarUrl?: string;
  sintaUrl?: string;
  scopusUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export type PublicationType = 'journal_international' | 'journal_national' | 'conference' | 'book';

export interface Publication {
  id: string;
  title: string;
  authors: string;
  type: PublicationType;
  venue: string; // Journal name or conference name
  year: number;
  volumeInfo?: string; // e.g. "Vol. 5, No. 2, pp. 120-130"
  publisher?: string;
  doi?: string;
  url?: string;
  citationCount?: number;
  abstract?: string;
  tags: string[];
}

export type ActivityCategory = 'teaching' | 'research_grant' | 'community_service' | 'speaker' | 'award';

export interface AcademicActivity {
  id: string;
  title: string;
  description: string;
  date: string; // e.g. "2026-05" or "Gasal 2025/2026"
  category: ActivityCategory;
  location?: string;
  link?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string; // Markdown text
  publishedAt: string; // Date string
  updatedAt?: string;
  category: string;
  tags: string[];
  isDraft: boolean;
  readingTimeMinutes: number;
}

export type MentorshipStatus = 'ongoing' | 'completed' | 'proposal' | 'thesis';

export interface StudentMentorship {
  id: string;
  studentName: string;
  studentNim: string;
  thesisTitle: string;
  academicYear: string; // e.g. "2025/2026"
  status: MentorshipStatus;
  level: string; // e.g. "S1 Informatika"
  notes?: string;
}

export interface BackupState {
  profile: ResearcherProfile;
  publications: Publication[];
  activities: AcademicActivity[];
  articles: Article[];
  mentorships: StudentMentorship[];
}
