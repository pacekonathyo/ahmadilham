/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ResearcherProfile,
  Publication,
  AcademicActivity,
  Article,
  PublicationType,
  ActivityCategory,
  StudentMentorship,
  MentorshipStatus
} from '../types';
import {
  User,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit3,
  Check,
  RefreshCw,
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  Code,
  Link,
  Eye,
  Settings,
  X,
  Users
} from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

interface AdminCMSProps {
  profile: ResearcherProfile;
  publications: Publication[];
  activities: AcademicActivity[];
  articles: Article[];
  mentorships: StudentMentorship[];
  onUpdateAll: (data: {
    profile: ResearcherProfile;
    publications: Publication[];
    activities: AcademicActivity[];
    articles: Article[];
    mentorships: StudentMentorship[];
  }) => void;
  onResetToDefault: () => void;
}

export default function AdminCMS({
  profile,
  publications,
  activities,
  articles,
  mentorships = [],
  onUpdateAll,
  onResetToDefault
}: AdminCMSProps) {
  // Navigation tabs of CMS
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'publications' | 'articles' | 'activities' | 'mentorship' | 'backup'>('profile');

  // Mentorship states
  const [editingMentId, setEditingMentId] = useState<string | null>(null);
  const [isAddingMent, setIsAddingMent] = useState(false);
  const [mentForm, setMentForm] = useState<Partial<StudentMentorship>>({
    studentName: '',
    studentNim: '',
    thesisTitle: '',
    academicYear: 'Genap 2025/2026',
    status: 'ongoing',
    level: 'S1 Informatika',
    notes: ''
  });

  const resetMentForm = () => {
    setEditingMentId(null);
    setIsAddingMent(false);
    setMentForm({
      studentName: '',
      studentNim: '',
      thesisTitle: '',
      academicYear: 'Genap 2025/2026',
      status: 'ongoing',
      level: 'S1 Informatika',
      notes: ''
    });
  };

  const handleSaveMent = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedMents: StudentMentorship[];

    const finalMent: StudentMentorship = {
      id: editingMentId || `ment-${Date.now()}`,
      studentName: mentForm.studentName || '',
      studentNim: mentForm.studentNim || '',
      thesisTitle: mentForm.thesisTitle || '',
      academicYear: mentForm.academicYear || 'Genap 2025/2026',
      status: (mentForm.status as MentorshipStatus) || 'ongoing',
      level: mentForm.level || 'S1 Informatika',
      notes: mentForm.notes || ''
    };

    if (editingMentId) {
      updatedMents = mentorships.map(m => m.id === editingMentId ? finalMent : m);
    } else {
      updatedMents = [finalMent, ...mentorships];
    }

    onUpdateAll({ profile, publications, activities, articles, mentorships: updatedMents });
    resetMentForm();
    showBackupMessage('Data bimbingan mahasiswa berhasil disimpan.', false);
  };

  const handleEditMent = (ment: StudentMentorship) => {
    setEditingMentId(ment.id);
    setMentForm({ ...ment });
    setIsAddingMent(true);
  };

  const handleDeleteMent = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data bimbingan mahasiswa ini?')) {
      const updated = mentorships.filter(m => m.id !== id);
      onUpdateAll({ profile, publications, activities, articles, mentorships: updated });
      showBackupMessage('Data bimbingan berhasil dihapus.', false);
    }
  };

  // Form states
  const [profileForm, setProfileForm] = useState<ResearcherProfile>({ ...profile });
  const [newInterest, setNewInterest] = useState('');

  // Publications states
  const [editingPubId, setEditingPubId] = useState<string | null>(null);
  const [isAddingPub, setIsAddingPub] = useState(false);
  const [pubForm, setPubForm] = useState<Partial<Publication>>({
    title: '',
    authors: '',
    type: 'journal_international',
    venue: '',
    year: new Date().getFullYear(),
    volumeInfo: '',
    publisher: '',
    doi: '',
    url: '',
    citationCount: 0,
    abstract: '',
    tags: []
  });
  const [pubTagInput, setPubTagInput] = useState('');

  // Articles states
  const [editingArtId, setEditingArtId] = useState<string | null>(null);
  const [isAddingArt, setIsAddingArt] = useState(false);
  const [artForm, setArtForm] = useState<Partial<Article>>({
    title: '',
    summary: '',
    content: '',
    category: 'Opini Teknologi',
    tags: [],
    isDraft: false,
    readingTimeMinutes: 5
  });
  const [artTagInput, setArtTagInput] = useState('');
  const [isArticlePreviewActive, setIsArticlePreviewActive] = useState(false);

  // Activities states
  const [editingActId, setEditingActId] = useState<string | null>(null);
  const [isAddingAct, setIsAddingAct] = useState(false);
  const [actForm, setActForm] = useState<Partial<AcademicActivity>>({
    title: '',
    description: '',
    date: '',
    category: 'teaching',
    location: ''
  });

  // Database Backup status
  const [backupMessage, setBackupMessage] = useState<{ text: string; error: boolean } | null>(null);

  // Synchronize profile form when incoming profile changes
  useEffect(() => {
    setProfileForm({ ...profile });
  }, [profile]);

  // -- Profile Helpers --
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAll({ profile: profileForm, publications, activities, articles, mentorships });
    showBackupMessage('Profil berhasil diperbarui di memori lokal.', false);
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setProfileForm(prev => ({
        ...prev,
        researchInterests: [...prev.researchInterests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (idx: number) => {
    setProfileForm(prev => ({
      ...prev,
      researchInterests: prev.researchInterests.filter((_, i) => i !== idx)
    }));
  };

  // -- Publications Helpers --
  const handleSavePub = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedPubs: Publication[];

    const finalPub: Publication = {
      id: editingPubId || `pub-${Date.now()}`,
      title: pubForm.title || 'Judul Kosong',
      authors: pubForm.authors || 'Ahmad Ilham',
      type: pubForm.type || 'journal_international',
      venue: pubForm.venue || '',
      year: Number(pubForm.year) || new Date().getFullYear(),
      volumeInfo: pubForm.volumeInfo,
      publisher: pubForm.publisher,
      doi: pubForm.doi,
      url: pubForm.url,
      citationCount: Number(pubForm.citationCount) || 0,
      abstract: pubForm.abstract || '',
      tags: pubForm.tags || []
    };

    if (editingPubId) {
      updatedPubs = publications.map(p => p.id === editingPubId ? finalPub : p);
    } else {
      updatedPubs = [finalPub, ...publications];
    }

    onUpdateAll({ profile, publications: updatedPubs, activities, articles, mentorships });
    resetPubForm();
    showBackupMessage('Publikasi berhasil disimpan.', false);
  };

  const handleEditPub = (pub: Publication) => {
    setEditingPubId(pub.id);
    setPubForm({ ...pub });
    setIsAddingPub(true);
  };

  const handleDeletePub = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus publikasi riset ini?')) {
      const updated = publications.filter(p => p.id !== id);
      onUpdateAll({ profile, publications: updated, activities, articles, mentorships });
      showBackupMessage('Publikasi berhasil dihapus.', false);
    }
  };

  const resetPubForm = () => {
    setEditingPubId(null);
    setIsAddingPub(false);
    setPubForm({
      title: '',
      authors: '',
      type: 'journal_international',
      venue: '',
      year: new Date().getFullYear(),
      volumeInfo: '',
      publisher: '',
      doi: '',
      url: '',
      citationCount: 0,
      abstract: '',
      tags: []
    });
    setPubTagInput('');
  };

  const handleAddPubTag = () => {
    if (pubTagInput.trim()) {
      const currentTags = pubForm.tags || [];
      if (!currentTags.includes(pubTagInput.trim())) {
        setPubForm(prev => ({ ...prev, tags: [...currentTags, pubTagInput.trim()] }));
      }
      setPubTagInput('');
    }
  };

  const handleRemovePubTag = (tag: string) => {
    setPubForm(prev => ({
      ...prev,
      tags: (prev.tags || []).filter(t => t !== tag)
    }));
  };

  // -- Articles / Markdown Studio Helpers --
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedArts: Article[];

    const originalSlug = editingArtId ? articles.find(a => a.id === editingArtId)?.slug : '';
    const generatedSlug = artForm.title
      ? artForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : `opinion-${Date.now()}`;

    const finalArt: Article = {
      id: editingArtId || `art-${Date.now()}`,
      slug: originalSlug || generatedSlug,
      title: artForm.title || 'Untitled Article',
      summary: artForm.summary || '',
      content: artForm.content || '',
      publishedAt: editingArtId ? (articles.find(a => a.id === editingArtId)?.publishedAt || new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0],
      category: artForm.category || 'Opini Teknologi',
      tags: artForm.tags || [],
      isDraft: artForm.isDraft ?? false,
      readingTimeMinutes: Number(artForm.readingTimeMinutes) || 5
    };

    if (editingArtId) {
      updatedArts = articles.map(a => a.id === editingArtId ? finalArt : a);
    } else {
      updatedArts = [finalArt, ...articles];
    }

    onUpdateAll({ profile, publications, activities, articles: updatedArts, mentorships });
    resetArtForm();
    showBackupMessage('Artikel opini berhasil disimpan.', false);
  };

  const handleEditArticle = (art: Article) => {
    setEditingArtId(art.id);
    setArtForm({ ...art });
    setIsAddingArt(true);
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel opini ini?')) {
      const updated = articles.filter(a => a.id !== id);
      onUpdateAll({ profile, publications, activities, articles: updated, mentorships });
      showBackupMessage('Artikel berhasil dihapus.', false);
    }
  };

  const resetArtForm = () => {
    setEditingArtId(null);
    setIsAddingArt(false);
    setArtForm({
      title: '',
      summary: '',
      content: '',
      category: 'Opini Teknologi',
      tags: [],
      isDraft: false,
      readingTimeMinutes: 5
    });
    setArtTagInput('');
    setIsArticlePreviewActive(false);
  };

  const handleAddArtTag = () => {
    if (artTagInput.trim()) {
      const currentTags = artForm.tags || [];
      if (!currentTags.includes(artTagInput.trim())) {
        setArtForm(prev => ({ ...prev, tags: [...currentTags, artTagInput.trim()] }));
      }
      setArtTagInput('');
    }
  };

  const handleRemoveArtTag = (tag: string) => {
    setArtForm(prev => ({
      ...prev,
      tags: (prev.tags || []).filter(t => t !== tag)
    }));
  };

  const insertMarkdownTag = (token: string) => {
    const textarea = document.getElementById('md-editor-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);

    let replacement = '';
    switch (token) {
      case 'bold':
        replacement = `**${selected || 'Teks Tebal'}**`;
        break;
      case 'italic':
        replacement = `*${selected || 'Teks Miring'}*`;
        break;
      case 'h2':
        replacement = `\n## ${selected || 'Sub Judul'}\n`;
        break;
      case 'h3':
        replacement = `\n### ${selected || 'Sub Sub Judul'}\n`;
        break;
      case 'quote':
        replacement = `\n> ${selected || 'Kutipan Opini'}\n`;
        break;
      case 'code':
        replacement = `\n\`\`\`javascript\n${selected || '// kode program di sini'}\n\`\`\`\n`;
        break;
      case 'link':
        replacement = `[${selected || 'Teks Tautan'}](https://url-tautan.com)`;
        break;
    }

    const newContent = text.substring(0, start) + replacement + text.substring(end);
    setArtForm(prev => ({ ...prev, content: newContent }));

    // Refocus with delay
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 3, start + 3);
    }, 50);
  };

  // -- Activities Helpers --
  const handleSaveAct = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedActs: AcademicActivity[];

    const finalAct: AcademicActivity = {
      id: editingActId || `act-${Date.now()}`,
      title: actForm.title || 'Judul Kegiatan',
      description: actForm.description || '',
      date: actForm.date || new Date().toISOString().split('T')[0].substring(0, 7),
      category: actForm.category || 'teaching',
      location: actForm.location
    };

    if (editingActId) {
      updatedActs = activities.map(a => a.id === editingActId ? finalAct : a);
    } else {
      updatedActs = [finalAct, ...activities];
    }

    onUpdateAll({ profile, publications, activities: updatedActs, articles, mentorships });
    resetActForm();
    showBackupMessage('Kegiatan akademis berhasil disimpan.', false);
  };

  const handleEditAct = (act: AcademicActivity) => {
    setEditingActId(act.id);
    setActForm({ ...act });
    setIsAddingAct(true);
  };

  const handleDeleteAct = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus arsip kegiatan akademis ini?')) {
      const updated = activities.filter(a => a.id !== id);
      onUpdateAll({ profile, publications, activities: updated, articles, mentorships });
      showBackupMessage('Kegiatan berhasil dihapus.', false);
    }
  };

  const resetActForm = () => {
    setEditingActId(null);
    setIsAddingAct(false);
    setActForm({
      title: '',
      description: '',
      date: '',
      category: 'teaching',
      location: ''
    });
  };

  // -- JSON Backup and Upload Helpers --
  const handleExportBackup = () => {
    const backupState = {
      profile,
      publications,
      activities,
      articles,
      mentorships
    };

    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupState, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `backup_blog_ahmad_ilham_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showBackupMessage("Database berhasil diekspor! Catatan cadangan disimpan sebagai berkas JSON.", false);
    } catch {
      showBackupMessage("Gagal mengekspor data cadangan.", true);
    }
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const files = e.target.files;

    if (!files || files.length === 0) return;

    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile && parsed.publications && parsed.activities && parsed.articles) {
          onUpdateAll({
            profile: parsed.profile,
            publications: parsed.publications,
            activities: parsed.activities,
            articles: parsed.articles,
            mentorships: parsed.mentorships || []
          });
          showBackupMessage("Database berhasil dipulihkan dari berkas JSON!", false);
          // Auto update form states
          setProfileForm({ ...parsed.profile });
        } else {
          showBackupMessage("Format berkas JSON cadangan tidak lengkap atau tidak valid.", true);
        }
      } catch (err) {
        showBackupMessage("Gagal membaca berkas JSON. Periksa kompatibilitas file Anda.", true);
      }
    };

    fileReader.readAsText(files[0]);
  };

  const showBackupMessage = (text: string, error: boolean) => {
    setBackupMessage({ text, error });
    setTimeout(() => {
      setBackupMessage(null);
    }, 5000);
  };

  return (
    <div className="space-y-6">
      {/* CMS Dashboard Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-zinc-800/80">
        <div className="space-y-1">
          <h2 className="text-2xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-emerald-600 animate-spin-slow" />
            Panel Sistem Manajemen Konten (CMS)
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Kelola data profil utama, draf artikel Markdown, karya publikasi riset, serta sinkronisasi backup local database.
          </p>
        </div>

        {/* Global Reset Button */}
        <button
          onClick={() => {
            if (window.confirm('Peringatan: Seluruh suntingan data manual Anda di memori lokal browser akan ditimpa kembali dengan data bawaan Ahmad Ilham yang orisinal. Lanjutkan?')) {
              onResetToDefault();
              showBackupMessage('Data telah disetel ulang ke setelan pabrik.', false);
            }
          }}
          className="flex items-center gap-1 text-xs font-mono font-bold text-rose-600 hover:text-rose-700 bg-rose-50/60 hover:bg-rose-100/50 border border-rose-200/40 px-3 py-1.5 rounded-lg cursor-pointer transition-all shrink-0 select-none"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          RESET DATA BAWAAN
        </button>
      </div>

      {/* Floating Backup Toast Message */}
      {backupMessage && (
        <div className={`p-4 rounded-xl border text-sm font-sans flex items-center gap-2.5 transition-all fixed bottom-6 right-6 z-50 shadow-lg ${
          backupMessage.error
            ? 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/80 dark:border-rose-900'
            : 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/80 dark:border-emerald-900'
        }`}>
          <Check className="w-4 h-4 shrink-0" />
          <span>{backupMessage.text}</span>
        </div>
      )}

      {/* Grid Workspace Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column Navigation Tabs */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 border-b lg:border-b-0 border-slate-100 select-none">
          <button
            onClick={() => setActiveSubTab('profile')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-sans text-xs md:text-sm font-semibold tracking-wide border transition-all text-left whitespace-nowrap cursor-pointer shrink-0 ${
              activeSubTab === 'profile'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-zinc-950 border-slate-900 dark:border-white shadow-xs'
                : 'bg-transparent border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-900'
            }`}
          >
            <User className="w-4 h-4" />
            Identitas Dosen
          </button>
          <button
            onClick={() => { setActiveSubTab('publications'); resetPubForm(); }}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-sans text-xs md:text-sm font-semibold tracking-wide border transition-all text-left whitespace-nowrap cursor-pointer shrink-0 ${
              activeSubTab === 'publications'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-zinc-950 border-slate-900 dark:border-white shadow-xs'
                : 'bg-transparent border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Karya Publikasi ({publications.length})
          </button>
          <button
            onClick={() => { setActiveSubTab('articles'); resetArtForm(); }}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-sans text-xs md:text-sm font-semibold tracking-wide border transition-all text-left whitespace-nowrap cursor-pointer shrink-0 ${
              activeSubTab === 'articles'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-zinc-950 border-slate-900 dark:border-white shadow-xs'
                : 'bg-transparent border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            Tulis Opini ({articles.length})
          </button>
          <button
            onClick={() => { setActiveSubTab('activities'); resetActForm(); }}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-sans text-xs md:text-sm font-semibold tracking-wide border transition-all text-left whitespace-nowrap cursor-pointer shrink-0 ${
              activeSubTab === 'activities'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-zinc-950 border-slate-900 dark:border-white shadow-xs'
                : 'bg-transparent border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Timeline Tridharma ({activities.length})
          </button>
          <button
            onClick={() => { setActiveSubTab('mentorship'); resetMentForm(); }}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-sans text-xs md:text-sm font-semibold tracking-wide border transition-all text-left whitespace-nowrap cursor-pointer shrink-0 ${
              activeSubTab === 'mentorship'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-zinc-950 border-slate-900 dark:border-white shadow-xs'
                : 'bg-transparent border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-900'
            }`}
          >
            <Users className="w-4 h-4" />
            Pembimbingan ({mentorships.length})
          </button>
          <button
            onClick={() => setActiveSubTab('backup')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-sans text-xs md:text-sm font-semibold tracking-wide border transition-all text-left whitespace-nowrap cursor-pointer shrink-0 ${
              activeSubTab === 'backup'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-zinc-950 border-slate-900 dark:border-white shadow-xs'
                : 'bg-transparent border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-900'
            }`}
          >
            <Download className="w-4 h-4" />
            Backup & Pemulihan
          </button>
        </div>

        {/* Right Column Contents */}
        <div className="lg:col-span-9 bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-slate-200/60 dark:border-zinc-800/80 min-h-[450px]">
          {/* TAB 1: PROFILE FORM */}
          {activeSubTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <h3 className="text-base font-sans font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-800/80 pb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-emerald-600" />
                Identitas Utama & Portofolio Personal Peneliti
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 font-sans text-sm">
                <div className="md:col-span-7 space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full h-10 px-3.5 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-850 dark:text-slate-100"
                  />
                </div>
                <div className="md:col-span-5 space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Gelar Akademik</label>
                  <input
                    type="text"
                    required
                    value={profileForm.titles}
                    onChange={(e) => setProfileForm({ ...profileForm, titles: e.target.value })}
                    className="w-full h-10 px-3.5 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-850 dark:text-slate-100"
                  />
                </div>

                <div className="md:col-span-6 space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Peran / Posisi Kerja</label>
                  <input
                    type="text"
                    required
                    value={profileForm.role}
                    onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                    className="w-full h-10 px-3.5 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-850"
                  />
                </div>
                <div className="md:col-span-6 space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Program Studi / Departemen</label>
                  <input
                    type="text"
                    required
                    value={profileForm.department}
                    onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                    className="w-full h-10 px-3.5 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-850"
                  />
                </div>

                <div className="md:col-span-12 space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Afiliasi Universitas / Instansi</label>
                  <input
                    type="text"
                    required
                    value={profileForm.institution}
                    onChange={(e) => setProfileForm({ ...profileForm, institution: e.target.value })}
                    className="w-full h-10 px-3.5 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-850"
                  />
                </div>

                <div className="md:col-span-12 space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Surel Akademis Utama (Email)</label>
                  <input
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full h-10 px-3.5 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-850"
                  />
                </div>

                <div className="md:col-span-12 space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Alamat Kantor / Surat Menyurat</label>
                  <textarea
                    rows={2}
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-850"
                  />
                </div>

                <div className="md:col-span-12 space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Biografi Naratif Singkat</label>
                  <textarea
                    rows={4}
                    required
                    value={profileForm.aboutMe}
                    onChange={(e) => setProfileForm({ ...profileForm, aboutMe: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-850 font-serif leading-relaxed text-sm"
                  />
                </div>
              </div>

              {/* Portal Integrasi URL */}
              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80 space-y-4 font-sans text-sm">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Portal Indexer & Akun Sosial</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs text-slate-500">Google Scholar Profile URL</label>
                    <input
                      type="url"
                      value={profileForm.googleScholarUrl || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, googleScholarUrl: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-xs"
                      placeholder="https://scholar.google.com/citations..."
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs text-slate-500">SINTA Kementerian URL</label>
                    <input
                      type="url"
                      value={profileForm.sintaUrl || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, sintaUrl: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-xs"
                      placeholder="https://sinta.kemdikbud.go.id/authors/detail..."
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs text-slate-500">Scopus Author ID URL</label>
                    <input
                      type="url"
                      value={profileForm.scopusUrl || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, scopusUrl: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-xs"
                      placeholder="https://www.scopus.com/authid/detail..."
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs text-slate-500">GitHub Profile URL</label>
                    <input
                      type="url"
                      value={profileForm.githubUrl || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, githubUrl: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-xs"
                      placeholder="https://github.com/username..."
                    />
                  </div>
                </div>
              </div>

              {/* Research Interests Bullets */}
              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80 space-y-2.5 font-sans text-sm">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Tambahkan Kepakaran & Kelompok Riset</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddInterest(); } }}
                    placeholder="Contoh: Pengolahan Citra Digital, NLP..."
                    className="flex-1 h-9 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddInterest}
                    className="h-9 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Tambah
                  </button>
                </div>
                {/* Interest badges to remove */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {profileForm.researchInterests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-zinc-900/90 text-xs font-medium text-slate-700 dark:text-slate-350 rounded-full border border-slate-200/40"
                    >
                      {interest}
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(idx)}
                        className="text-slate-400 hover:text-red-500 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Submit */}
              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex justify-end">
                <button
                  type="submit"
                  className="px-5 h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs select-none"
                >
                  <Check className="w-4 h-4" /> SIMPAN IDENTITAS PROFIL
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: PUBLICATIONS MANAGEMENT */}
          {activeSubTab === 'publications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800/80 pb-2">
                <h3 className="text-base font-sans font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  Daftar Portofolio Publikasi Riset ({publications.length})
                </h3>
                {!isAddingPub && (
                  <button
                    type="button"
                    onClick={() => { resetPubForm(); setIsAddingPub(true); }}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer select-none"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    TAMBAH PUBLIKASI
                  </button>
                )}
              </div>

              {isAddingPub ? (
                /* Edit/Add Publication form workspace */
                <form onSubmit={handleSavePub} className="space-y-5 font-sans text-sm">
                  <div className="flex items-center justify-between border-b pb-1">
                    <span className="text-xs font-bold font-mono text-emerald-600 tracking-wider">
                      {editingPubId ? 'EDIT MATERI PUBLIKASI' : 'TAMBAH PUBLIKASI ILMIAH BARU'}
                    </span>
                    <button
                      type="button"
                      onClick={resetPubForm}
                      className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" /> BATAL
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-12 space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Judul Karya Tulis / Buku (Title)</label>
                      <input
                        type="text"
                        required
                        value={pubForm.title}
                        onChange={(e) => setPubForm({ ...pubForm, title: e.target.value })}
                        className="w-full h-10 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm"
                        placeholder="Masukkan judul riset lengkap..."
                      />
                    </div>

                    <div className="md:col-span-8 space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Tim Penulis (Authors separated by commas)</label>
                      <input
                        type="text"
                        required
                        value={pubForm.authors}
                        onChange={(e) => setPubForm({ ...pubForm, authors: e.target.value })}
                        className="w-full h-10 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm"
                        placeholder="Contoh: Ahmad Ilham, Budi Waluyo"
                      />
                    </div>
                    <div className="md:col-span-4 space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Tahun Publikasi</label>
                      <input
                        type="number"
                        required
                        value={pubForm.year}
                        onChange={(e) => setPubForm({ ...pubForm, year: Number(e.target.value) })}
                        className="w-full h-10 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm"
                      />
                    </div>

                    <div className="md:col-span-4 space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Kategori Publikasi</label>
                      <select
                        value={pubForm.type}
                        onChange={(e) => setPubForm({ ...pubForm, type: e.target.value as PublicationType })}
                        className="w-full h-10 px-2 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm"
                      >
                        <option value="journal_international">Jurnal Internasional (Scopus/dll)</option>
                        <option value="journal_national">Jurnal Nasional Terakreditasi (Sinta)</option>
                        <option value="conference">Prosiding Seminar / Konferensi</option>
                        <option value="book">Buku Ajar / Referensi</option>
                      </select>
                    </div>
                    <div className="md:col-span-8 space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Nama Jurnal / Seminar / ISBN Buku (Venue)</label>
                      <input
                        type="text"
                        required
                        value={pubForm.venue}
                        onChange={(e) => setPubForm({ ...pubForm, venue: e.target.value })}
                        className="w-full h-10 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm"
                        placeholder="Contoh: Jurnal Teknologi Informasi, Prosiding SNHP UNIMUS"
                      />
                    </div>

                    <div className="md:col-span-8 space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Informasi Volume / Halaman (VolumeInfo)</label>
                      <input
                        type="text"
                        value={pubForm.volumeInfo || ''}
                        onChange={(e) => setPubForm({ ...pubForm, volumeInfo: e.target.value })}
                        className="w-full h-10 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm"
                        placeholder="Contoh: Vol. 5, No. 2, hlm. 12-25"
                      />
                    </div>
                    <div className="md:col-span-4 space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Jumlah Sitasi (Indeks)</label>
                      <input
                        type="number"
                        value={pubForm.citationCount || 0}
                        onChange={(e) => setPubForm({ ...pubForm, citationCount: Number(e.target.value) })}
                        className="w-full h-10 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm"
                      />
                    </div>

                    <div className="md:col-span-6 space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Tautan URL Web Jurnal/Buku</label>
                      <input
                        type="url"
                        value={pubForm.url || ''}
                        onChange={(e) => setPubForm({ ...pubForm, url: e.target.value })}
                        className="w-full h-10 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="md:col-span-6 space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Kode Digital Object Identifier (DOI)</label>
                      <input
                        type="text"
                        value={pubForm.doi || ''}
                        onChange={(e) => setPubForm({ ...pubForm, doi: e.target.value })}
                        className="w-full h-10 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm"
                        placeholder="10.12345/jtiik.x.y"
                      />
                    </div>

                    <div className="md:col-span-12 space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Naskah Abstrak Makalah</label>
                      <textarea
                        rows={4}
                        value={pubForm.abstract || ''}
                        onChange={(e) => setPubForm({ ...pubForm, abstract: e.target.value })}
                        className="w-full p-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm font-serif"
                        placeholder="Masukkan draf abstrak orisinal di sini..."
                      />
                    </div>

                    {/* Tag list */}
                    <div className="md:col-span-12 space-y-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Kata Kunci Riset (Tags)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={pubTagInput}
                          onChange={(e) => setPubTagInput(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddPubTag(); } }}
                          placeholder="Tambahkan kata kunci..."
                          className="flex-1 h-9 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-xs"
                        />
                        <button
                          type="button"
                          onClick={handleAddPubTag}
                          className="h-9 px-3 bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-850 dark:hover:bg-zinc-800 rounded-lg text-xs font-bold cursor-pointer"
                        >
                          Sematkan
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(pubForm.tags || []).map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-zinc-900 text-xs text-slate-700 dark:text-slate-300 rounded-md border"
                          >
                            #{tag}
                            <button
                              type="button"
                              onClick={() => handleRemovePubTag(tag)}
                              className="text-slate-400 hover:text-rose-500 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex justify-end gap-3 select-none">
                    <button
                      type="button"
                      onClick={resetPubForm}
                      className="px-4 h-10 font-bold border border-slate-200 hover:bg-slate-50 dark:border-zinc-800 dark:hover:bg-zinc-900 rounded-lg text-xs text-slate-500 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Check className="w-4 h-4" /> SIMPAN PUBLIKASI RISET
                    </button>
                  </div>
                </form>
              ) : (
                /* Interactive Publications Catalog Grid for Editing */
                <div className="space-y-3 font-sans text-sm max-h-[600px] overflow-y-auto pr-1">
                  {publications.map((pub) => (
                    <div
                      key={pub.id}
                      className="p-4 rounded-xl border border-slate-200/60 dark:border-zinc-800 bg-slate-50/20 dark:bg-zinc-900/20 hover:bg-slate-50/50 dark:hover:bg-zinc-900/40 transition-colors flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm bg-slate-100 dark:bg-zinc-800 border text-slate-600">
                            {pub.type === 'journal_international' ? 'INTERNASIONAL' : pub.type === 'journal_national' ? 'SINTA' : pub.type === 'conference' ? 'PRESIDING' : 'BUKU AJAR'}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">{pub.year}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                          {pub.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium italic">{pub.venue}</p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 select-none">
                        <button
                          type="button"
                          onClick={() => handleEditPub(pub)}
                          className="p-1.5 rounded-lg border border-slate-2 border-slate-200 hover:bg-white dark:border-zinc-800 dark:hover:bg-zinc-800 text-slate-500 hover:text-emerald-600 cursor-pointer"
                          title="Edit Publikasi"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePub(pub.id)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-white dark:border-zinc-800 dark:hover:bg-zinc-800 text-slate-400 hover:text-rose-500 cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ARTICLES & MARKDOWN WRITING STUDIO WORKSPACE */}
          {activeSubTab === 'articles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800/80 pb-2">
                <h3 className="text-base font-sans font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  Kepenulisan Artikel Opini & Live Markdown Editor ({articles.length})
                </h3>
                {!isAddingArt && (
                  <button
                    type="button"
                    onClick={() => { resetArtForm(); setIsAddingArt(true); }}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer select-none"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    TULIS OPINI BARU
                  </button>
                )}
              </div>

              {isAddingArt ? (
                /* Dynamic Split Pane writing Studio Workspace */
                <form onSubmit={handleSaveArticle} className="space-y-5 font-sans text-sm">
                  <div className="flex items-center justify-between border-b pb-1">
                    <span className="text-xs font-bold font-mono text-emerald-650 tracking-wider">
                      {editingArtId ? 'SUNTING ULANG OPINI ILMIAH' : 'STUDIO KEPENULISAN MARKDOWN'}
                    </span>
                    <button
                      type="button"
                      onClick={resetArtForm}
                      className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" /> BATAL
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8 space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Judul Artikel Opini</label>
                      <input
                        type="text"
                        required
                        value={artForm.title}
                        onChange={(e) => setArtForm({ ...artForm, title: e.target.value })}
                        className="w-full h-10 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm font-semibold"
                        placeholder="Contoh: Menatap Masa Depan Pendidikan Komputer di Demak..."
                      />
                    </div>
                    <div className="md:col-span-4 space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Waktu Baca (Menit)</label>
                      <input
                        type="number"
                        required
                        value={artForm.readingTimeMinutes}
                        onChange={(e) => setArtForm({ ...artForm, readingTimeMinutes: Number(e.target.value) })}
                        className="w-full h-10 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm"
                      />
                    </div>

                    <div className="md:col-span-6 space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Kategori Opini</label>
                      <input
                        type="text"
                        required
                        value={artForm.category}
                        onChange={(e) => setArtForm({ ...artForm, category: e.target.value })}
                        className="w-full h-10 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm"
                        placeholder="Opini Teknologi, Pendidikan Tinggi, Sains Terbuka..."
                      />
                    </div>
                    <div className="md:col-span-6 flex items-center gap-2 pt-5 select-none font-sans text-xs">
                      <input
                        type="checkbox"
                        id="isDraftCheck"
                        checked={artForm.isDraft || false}
                        onChange={(e) => setArtForm({ ...artForm, isDraft: e.target.checked })}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <label htmlFor="isDraftCheck" className="font-bold text-slate-600 cursor-pointer">
                        SIMPAN SEBAGAI DRAF (Tidak akan terlihat oleh publik)
                      </label>
                    </div>

                    <div className="md:col-span-12 space-y-1">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">Abstrak / Rangkuman Singkat (Tampil di kartu list)</label>
                      <input
                        type="text"
                        required
                        value={artForm.summary}
                        onChange={(e) => setArtForm({ ...artForm, summary: e.target.value })}
                        className="w-full h-10 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-xs"
                        placeholder="Masukkan abstraksi populer 1-2 kalimat..."
                      />
                    </div>

                    {/* Markdown Writing Editor Toolbar Buttons & Split Pane */}
                    <div className="md:col-span-12 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100 dark:bg-zinc-900 px-3 py-1.5 rounded-t-lg border-t border-x border-slate-200 dark:border-zinc-800 select-none">
                        {/* Editor Markdown Toolbar Styling Shortcuts */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => insertMarkdownTag('bold')}
                            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 rounded cursor-pointer"
                            title="Tebal (Bold)"
                          >
                            <Bold className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertMarkdownTag('italic')}
                            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 rounded cursor-pointer"
                            title="Miring (Italic)"
                          >
                            <Italic className="w-4 h-4" />
                          </button>
                          <span className="w-px h-4 bg-slate-300 dark:bg-zinc-700 mx-1" />
                          <button
                            type="button"
                            onClick={() => insertMarkdownTag('h2')}
                            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 rounded cursor-pointer flex items-center font-bold text-xs gap-0.5"
                            title="Sub Heading H2"
                          >
                            <Heading2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertMarkdownTag('h3')}
                            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 rounded cursor-pointer flex items-center font-bold text-xs gap-0.5"
                            title="Sub Sub Heading H3"
                          >
                            <Heading3 className="w-4 h-4" />
                          </button>
                          <span className="w-px h-4 bg-slate-300 dark:bg-zinc-700 mx-1" />
                          <button
                            type="button"
                            onClick={() => insertMarkdownTag('quote')}
                            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 rounded cursor-pointer"
                            title="Kutipan (Quote)"
                          >
                            <Quote className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertMarkdownTag('code')}
                            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 rounded cursor-pointer"
                            title="Blok Kode (Code Block)"
                          >
                            <Code className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertMarkdownTag('link')}
                            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 rounded cursor-pointer"
                            title="Tautan Link"
                          >
                            <Link className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Split screen Preview Tab Selector */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setIsArticlePreviewActive(false)}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                              !isArticlePreviewActive
                                ? 'bg-white text-slate-900 border border-slate-200 dark:bg-zinc-850 dark:text-white dark:border-zinc-800'
                                : 'text-slate-500 hover:text-slate-800 dark:hover:text-zinc-300'
                            }`}
                          >
                            Edit Naskah
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsArticlePreviewActive(true)}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                              isArticlePreviewActive
                                ? 'bg-white text-slate-900 border border-slate-200 dark:bg-zinc-850 dark:text-white dark:border-zinc-800'
                                : 'text-slate-500 hover:text-slate-800 dark:hover:text-zinc-300'
                            }`}
                          >
                            <Eye className="w-3.5 h-3.5" /> Pratinjau Live
                          </button>
                        </div>
                      </div>

                      {/* Studio Textarea work Canvas or live preview compiles right here! */}
                      {isArticlePreviewActive ? (
                        <div className="p-5 min-h-[350px] max-h-[500px] overflow-y-auto bg-slate-50/50 dark:bg-zinc-900/20 border border-slate-200 dark:border-zinc-800 rounded-b-lg select-text select-article pr-2">
                          {artForm.content ? (
                            <MarkdownRenderer content={artForm.content} />
                          ) : (
                            <div className="text-center text-slate-400 text-xs py-24 select-none italic font-sans">Belum ada naskah tulisan Markdown untuk dipreview. Ketuk tombol edit naskah untuk mulai mengarang artikel.</div>
                          )}
                        </div>
                      ) : (
                        <textarea
                          id="md-editor-textarea"
                          rows={14}
                          required
                          value={artForm.content}
                          onChange={(e) => setArtForm({ ...artForm, content: e.target.value })}
                          className="w-full p-4 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-b-lg font-mono text-sm leading-relaxed focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          placeholder="# Tuliskan Judul Kepala Utama Artikel Anda&#10;&#10;Tuliskan paragraf orisinal di sini menggunakan sintaks standar Markdown..."
                        />
                      )}
                    </div>

                    {/* Tag list */}
                    <div className="md:col-span-12 space-y-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Kata Kunci Esai (Tags)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={artTagInput}
                          onChange={(e) => setArtTagInput(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddArtTag(); } }}
                          placeholder="Contoh: sains-terbuka..."
                          className="flex-1 h-9 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-xs"
                        />
                        <button
                          type="button"
                          onClick={handleAddArtTag}
                          className="h-9 px-3 bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-850 dark:hover:bg-zinc-850 rounded-lg text-xs font-bold cursor-pointer"
                        >
                          Sematkan
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(artForm.tags || []).map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-zinc-900 text-xs text-slate-700 dark:text-slate-300 rounded-md border"
                          >
                            #{tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveArtTag(tag)}
                              className="text-slate-400 hover:text-rose-500 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Submission Action bar */}
                  <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex justify-end gap-3 select-none">
                    <button
                      type="button"
                      onClick={resetArtForm}
                      className="px-4 h-10 font-bold border border-slate-200 hover:bg-slate-50 dark:border-zinc-800 dark:hover:bg-zinc-900 rounded-lg text-xs text-slate-500 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Check className="w-4 h-4" /> SIMPAN ARTIKEL OPINI
                    </button>
                  </div>
                </form>
              ) : (
                /* Opinion List view for Selecting */
                <div className="space-y-3 font-sans text-sm max-h-[600px] overflow-y-auto pr-1">
                  {articles.map((art) => (
                    <div
                      key={art.id}
                      className="p-4 rounded-xl border border-slate-200/60 dark:border-zinc-800 bg-slate-50/20 dark:bg-zinc-900/20 hover:bg-slate-50/50 dark:hover:bg-zinc-900/40 transition-colors flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm border ${
                            art.isDraft
                              ? 'bg-amber-150 text-amber-800 bg-amber-50 dark:bg-amber-950/25 border-amber-200'
                              : 'bg-emerald-150 text-emerald-800 bg-emerald-50 dark:bg-emerald-950/25 border-emerald-200'
                          }`}>
                            {art.isDraft ? 'DRAF' : 'PUBLIK'}
                          </span>
                          <span className="text-xs font-semibold text-indigo-650 bg-indigo-50 dark:bg-zinc-900 p-1 py-0.5 rounded text-indigo-700 dark:text-indigo-450">{art.category}</span>
                          <span className="text-xs font-bold text-slate-400">{art.publishedAt}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                          {art.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-serif line-clamp-1">{art.summary}</p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 select-none">
                        <button
                          type="button"
                          onClick={() => handleEditArticle(art)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-white dark:border-zinc-800 dark:hover:bg-zinc-800 text-slate-500 hover:text-emerald-600 cursor-pointer"
                          title="Suntik Naskah"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteArticle(art.id)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-white dark:border-zinc-800 dark:hover:bg-zinc-800 text-slate-400 hover:text-rose-500 cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ACTIVITIES TIMELINE WORKSPACE */}
          {activeSubTab === 'activities' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800/80 pb-2">
                <h3 className="text-base font-sans font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  Manajemen Arsip Timeline Kegiatan Akademis ({activities.length})
                </h3>
                {!isAddingAct && (
                  <button
                    type="button"
                    onClick={() => { resetActForm(); setIsAddingAct(true); }}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer select-none"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    TAMBAH RIWAYAT
                  </button>
                )}
              </div>

              {isAddingAct ? (
                /* Add / edit academic activities event form */
                <form onSubmit={handleSaveAct} className="space-y-5 font-sans text-sm">
                  <div className="flex items-center justify-between border-b pb-1">
                    <span className="text-xs font-bold font-mono text-emerald-600 tracking-wider">
                      {editingActId ? 'SUNTING KEGIATAN AKADEMIS' : 'TAMBAH KEGIATAN AKADEMIS BARU'}
                    </span>
                    <button
                      type="button"
                      onClick={resetActForm}
                      className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" /> BATAL
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-12 space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Judul Kegiatan / Program Tridharma</label>
                      <input
                        type="text"
                        required
                        value={actForm.title}
                        onChange={(e) => setActForm({ ...actForm, title: e.target.value })}
                        className="w-full h-10 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm"
                        placeholder="Contoh: Mengampu Mata Kuliah 'Kecerdasan Buatan'..."
                      />
                    </div>

                    <div className="md:col-span-6 space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Kategori Tridharma</label>
                      <select
                        value={actForm.category}
                        onChange={(e) => setActForm({ ...actForm, category: e.target.value as ActivityCategory })}
                        className="w-full h-10 px-2 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm"
                      >
                        <option value="teaching">Pengajaran & Perkuliahan Kelas (Dosen)</option>
                        <option value="research_grant">Penerimaan Hibah Riset & Penelitian</option>
                        <option value="community_service">Pengabdian Kepada Masyarakat (PKM)</option>
                        <option value="speaker">Pembicara Ahli / Pemakalah Seminar</option>
                        <option value="award">Sertifikasi & Penghargaan Akademis</option>
                      </select>
                    </div>
                    <div className="md:col-span-6 space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Tanggal / Periode SMT (e.g., 2026-05 atau Gasal 2025)</label>
                      <input
                        type="text"
                        required
                        value={actForm.date}
                        onChange={(e) => setActForm({ ...actForm, date: e.target.value })}
                        className="w-full h-10 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm"
                        placeholder="e.g. 2026-05"
                      />
                    </div>

                    <div className="md:col-span-12 space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Lokasi Kegiatan / Penyelenggara</label>
                      <input
                        type="text"
                        value={actForm.location || ''}
                        onChange={(e) => setActForm({ ...actForm, location: e.target.value })}
                        className="w-full h-10 px-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm"
                        placeholder="Contoh: Gedung Laboratorium Komputer UNIMUS, DRTPM Kemdikbudristek"
                      />
                    </div>

                    <div className="md:col-span-12 space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Deskripsi Komplet Kegiatan</label>
                      <textarea
                        rows={3}
                        required
                        value={actForm.description}
                        onChange={(e) => setActForm({ ...actForm, description: e.target.value })}
                        className="w-full p-3 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm"
                        placeholder="Terangkan secara naratif fungsionalitas dan rekam kontribusi Anda..."
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex justify-end gap-3 select-none">
                    <button
                      type="button"
                      onClick={resetActForm}
                      className="px-4 h-10 font-bold border border-slate-200 hover:bg-slate-50 dark:border-zinc-800 dark:hover:bg-zinc-900 rounded-lg text-xs text-slate-500 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Check className="w-4 h-4" /> SIMPAN RIWAYAT TRIDHARMA
                    </button>
                  </div>
                </form>
              ) : (
                /* List of achievements to choose for edit */
                <div className="space-y-3 font-sans text-sm max-h-[600px] overflow-y-auto pr-1">
                  {activities.map((act) => (
                    <div
                      key={act.id}
                      className="p-4 rounded-xl border border-slate-200/60 dark:border-zinc-800 bg-slate-50/20 dark:bg-zinc-900/20 hover:bg-slate-50/50 dark:hover:bg-zinc-900/40 transition-colors flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm bg-slate-100 dark:bg-zinc-800 border text-slate-600 uppercase">
                            {act.category === 'teaching' ? 'AKADEMIS' : act.category === 'research_grant' ? 'RISET' : act.category === 'community_service' ? 'PKM' : act.category === 'speaker' ? 'SEMINAR' : 'PRESTASI'}
                          </span>
                          <span className="text-xs font-bold text-slate-400">{act.date}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white leading-snug line-clamp-1">
                          {act.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1">{act.description}</p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 select-none">
                        <button
                          type="button"
                          onClick={() => handleEditAct(act)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-white dark:border-zinc-800 dark:hover:bg-zinc-800 text-slate-500 hover:text-emerald-600 cursor-pointer"
                          title="Suntik Kegiatan"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteAct(act.id)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-white dark:border-zinc-800 dark:hover:bg-zinc-800 text-slate-400 hover:text-rose-500 cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4.5: MENTORSHIP MANAGEMENT (Pembimbingan Mahasiswa) */}
          {activeSubTab === 'mentorship' && (
            <div className="space-y-6 font-sans text-sm">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-zinc-800/80 pb-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5 flex-1">
                  <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                  Mengelola Mahasiswa Bimbingan & Tugas Akhir
                </h3>
                {!isAddingMent && (
                  <button
                    onClick={() => setIsAddingMent(true)}
                    className="flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-lg cursor-pointer transition-all shrink-0 select-none"
                  >
                    <Plus className="w-4 h-4" /> TAMBAH MAHASISWA
                  </button>
                )}
              </div>

              {isAddingMent ? (
                <form onSubmit={handleSaveMent} className="space-y-4 bg-slate-50/60 dark:bg-zinc-900/30 p-4 border border-slate-200 dark:border-zinc-800 rounded-xl">
                  <h4 className="text-xs font-mono uppercase font-bold tracking-wider text-[#005a9c] dark:text-blue-400">
                    {editingMentId ? 'Sunting Data Mahasiswa' : 'Tambah Mahasiswa Bimbingan Baru'}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Nama Mahasiswa</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Aditya Pratama"
                        value={mentForm.studentName || ''}
                        onChange={(e) => setMentForm({ ...mentForm, studentName: e.target.value })}
                        className="w-full h-10 px-3.5 bg-white dark:bg-[#12141c] border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-slate-100 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">NIM (Nomor Induk Mahasiswa)</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: G2A022001"
                        value={mentForm.studentNim || ''}
                        onChange={(e) => setMentForm({ ...mentForm, studentNim: e.target.value })}
                        className="w-full h-10 px-3.5 bg-white dark:bg-[#12141c] border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-slate-100 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Judul Tugas Akhir / Skripsi</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Contoh: Klasifikasi Tingkat Kerusakan Paru-paru dengan Algoritma U-Net..."
                      value={mentForm.thesisTitle || ''}
                      onChange={(e) => setMentForm({ ...mentForm, thesisTitle: e.target.value })}
                      className="w-full p-3 bg-white dark:bg-[#12141c] border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-slate-100 text-xs text-justify"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Status Bimbingan</label>
                      <select
                        value={mentForm.status || 'ongoing'}
                        onChange={(e) => setMentForm({ ...mentForm, status: e.target.value as MentorshipStatus })}
                        className="w-full h-10 px-3 bg-white dark:bg-[#12141c] border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-slate-100 text-xs"
                      >
                        <option value="ongoing">Bimbingan Aktif (Draft)</option>
                        <option value="proposal">Ujian Proposal (Candidate)</option>
                        <option value="thesis">Bimbingan Skripsi (Proposed)</option>
                        <option value="completed">Selesai & Lulus (Recommendation)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Program Studi & Jenjang</label>
                      <input
                        type="text"
                        placeholder="Contoh: S1 Informatika"
                        value={mentForm.level || 'S1 Informatika'}
                        onChange={(e) => setMentForm({ ...mentForm, level: e.target.value })}
                        className="w-full h-10 px-3.5 bg-white dark:bg-[#12141c] border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-slate-100 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Periode / Tahun Akademik</label>
                      <input
                        type="text"
                        placeholder="Contoh: Genap 2025/2026"
                        value={mentForm.academicYear || 'Genap 2025/2026'}
                        onChange={(e) => setMentForm({ ...mentForm, academicYear: e.target.value })}
                        className="w-full h-10 px-3.5 bg-white dark:bg-[#12141c] border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-slate-100 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Catatan Kemajuan / Log Bimbingan</label>
                    <textarea
                      rows={3}
                      placeholder="Contoh: Bab III Metodologi pengerjaan telah disetujui. Melanjutkan ke setup dataset."
                      value={mentForm.notes || ''}
                      onChange={(e) => setMentForm({ ...mentForm, notes: e.target.value })}
                      className="w-full p-3 bg-white dark:bg-[#12141c] border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-slate-100 text-xs text-justify"
                    />
                  </div>

                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      type="button"
                      onClick={resetMentForm}
                      className="px-4 py-2 border border-slate-200 hover:bg-slate-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold cursor-pointer transition-all"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-1 shadow-xs"
                    >
                      <Check className="w-4 h-4" /> SIMPAN MAHASISWA
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {mentorships.length > 0 ? (
                    mentorships.map((ment) => (
                      <div key={ment.id} className="p-4 rounded-xl border border-slate-200/60 dark:border-zinc-800 bg-slate-50/20 dark:bg-zinc-900/20 hover:bg-slate-50/50 dark:hover:bg-zinc-900/40 transition-colors flex items-start justify-between gap-4">
                        <div className="space-y-1 font-sans flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white text-sm">{ment.studentName}</span>
                            <span className="font-mono text-[10px] text-slate-500 bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-bold">{ment.studentNim}</span>
                            <span className="text-[10px] bg-slate-100 dark:bg-zinc-800 border text-slate-500 px-1.5 py-0.5 rounded uppercase font-mono font-bold tracking-wider">{ment.level}</span>
                            <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-450 px-1.5 py-0.5 border border-emerald-100 dark:border-emerald-900 rounded font-mono font-bold uppercase tracking-wider">{ment.status}</span>
                          </div>
                          <p className="text-xs font-serif font-bold text-slate-950 dark:text-slate-205 leading-relaxed text-justify">{ment.thesisTitle}</p>
                          {ment.notes && (
                            <p className="text-[11px] font-serif italic text-stone-500 dark:text-zinc-400 bg-stone-55 border-l-2 p-1.5 leading-relaxed text-justify">Log: {ment.notes}</p>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1 shrink-0 select-none">
                          <button
                            type="button"
                            onClick={() => handleEditMent(ment)}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-white dark:border-zinc-800 dark:hover:bg-zinc-800 text-slate-500 hover:text-emerald-600 cursor-pointer"
                            title="Sunting Data"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMent(ment.id)}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-white dark:border-zinc-800 dark:hover:bg-zinc-800 text-slate-400 hover:text-rose-500 cursor-pointer"
                            title="Hapus Data"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-slate-400 italic">Belum ada mahasiswa bimbingan terdaftar. Klik + TAMBAH MAHASISWA untuk memulai.</div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: BACKUP & DATABASE SYNC INTEGRITY */}
          {activeSubTab === 'backup' && (
            <div className="space-y-6 font-sans text-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-800/80 pb-2 flex items-center gap-1.5">
                <Download className="w-4 h-4 text-emerald-600" />
                Backup / Migrasi Basis Data Lokal
              </h3>

              <div className="space-y-4">
                <p className="text-slate-500 leading-relaxed text-xs">
                  Semua tulisan opini, karya ilmiah baru, dan riwayat yang Anda masukkan ke sistem CMS disimpan langsung di dalam ruang penyimpanan browser Anda (*local storage*). Agar draf tulisan Anda aman dari kehilangan sistem (saat berganti komputer atau membersihkan instalasi browser), disarankan melakukan pencadangan berkala di bawah ini.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  {/* Export Box */}
                  <div className="p-5 border border-slate-200 dark:border-zinc-800 bg-slate-50/40 dark:bg-zinc-900/30 rounded-2xl space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-bold">
                        <Download className="w-4 h-4 text-emerald-600" />
                        Ekspor Database Saat Ini
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Unduh seluruh status identitas dosen, draf publikasi ilmiah, artikel, serta catatan timeline akademis Anda menjadi satu file biner <code className="px-1 py-0.5 bg-slate-100 dark:bg-zinc-900 text-rose-500 font-mono text-[10px] rounded">backup_blog.json</code>.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleExportBackup}
                      className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-850 dark:hover:bg-zinc-800 rounded-lg text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-4 h-4" /> Unduh Bakul JSON
                    </button>
                  </div>

                  {/* Import Restoration Box */}
                  <div className="p-5 border border-slate-200 dark:border-zinc-800 bg-slate-50/40 dark:bg-zinc-900/30 rounded-2xl space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-bold">
                        <Upload className="w-4 h-4 text-emerald-600" />
                        Pulihkan / Impor Database
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Pilih file berformat <code className="px-1 py-0.5 bg-slate-100 dark:bg-zinc-900 text-indigo-500 font-mono text-[10px] rounded">.json</code> hasil ekspor sebelumnya. Melakukan impor akan langsung menimpa data di memori browser saat ini demi efisiensi.
                      </p>
                    </div>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".json"
                        id="import-database-input"
                        onChange={handleImportBackup}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <button
                        type="button"
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 pointer-events-none"
                      >
                        <Upload className="w-4 h-4" /> Pilih & Unggah JSON
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Specifications detail */}
              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-2.5">Statistik Ukuran Data</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 font-mono text-xs text-slate-500">
                  <div className="bg-slate-50 dark:bg-zinc-900 p-2.5 rounded-lg border border-slate-100 dark:border-zinc-850">
                    <div>Identitas Profil:</div>
                    <div className="font-bold text-slate-750 dark:text-slate-200 text-sm mt-0.5">Tersimpan</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-zinc-900 p-2.5 rounded-lg border border-slate-100 dark:border-zinc-850">
                    <div>Jumlah Publikasi:</div>
                    <div className="font-bold text-slate-750 dark:text-slate-200 text-sm mt-0.5">{publications.length} Entri</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-zinc-900 p-2.5 rounded-lg border border-slate-100 dark:border-zinc-850">
                    <div>Jumlah Artikel:</div>
                    <div className="font-bold text-slate-750 dark:text-slate-200 text-sm mt-0.5">{articles.length} Entri</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-zinc-900 p-2.5 rounded-lg border border-slate-100 dark:border-zinc-850">
                    <div>Timeline Riwayat:</div>
                    <div className="font-bold text-slate-750 dark:text-slate-200 text-sm mt-0.5">{activities.length} Entri</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-zinc-900 p-2.5 rounded-lg border border-slate-100 dark:border-zinc-850">
                    <div>Bimbingan TA:</div>
                    <div className="font-bold text-slate-750 dark:text-slate-200 text-sm mt-0.5">{mentorships.length} Mhs</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
