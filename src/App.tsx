/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  Github,
  Linkedin,
  Sun,
  Moon,
  Settings,
  Grid,
  Menu,
  X,
  MapPin,
  ExternalLink,
  Users
} from 'lucide-react';

import { ResearcherProfile, Publication, AcademicActivity, Article, StudentMentorship } from './types';
import { initialProfile, initialPublications, initialActivities, initialArticles, initialStudentMentorships } from './data/initialData';

// Subcomponents import
import ProfileSection from './components/ProfileSection';
import PublicationsSection from './components/PublicationsSection';
import ArticlesSection from './components/ArticlesSection';
import ActivitiesSection from './components/ActivitiesSection';
import MentorshipSection from './components/MentorshipSection';
import AdminCMS from './components/AdminCMS';
import GithubPagesGuide from './components/GithubPagesGuide';

const STORAGE_KEY = 'ahmad_ilham_academic_blog_db';

export default function App() {
  // Main Data States
  const [profile, setProfile] = useState<ResearcherProfile>(initialProfile);
  const [publications, setPublications] = useState<Publication[]>(initialPublications);
  const [activities, setActivities] = useState<AcademicActivity[]>(initialActivities);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [mentorships, setMentorships] = useState<StudentMentorship[]>(initialStudentMentorships);

  // App UI States
  const [activeTab, setActiveTab] = useState<string>('bio');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Initialize and load database from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.publications) setPublications(parsed.publications);
        if (parsed.activities) setActivities(parsed.activities);
        if (parsed.articles) setArticles(parsed.articles);
        if (parsed.mentorships) setMentorships(parsed.mentorships);
      } catch (e) {
        console.error("Ggal membaca basis data lokal, menggunakan set awal.", e);
      }
    }

    // Initialize Dark Mode preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const localTheme = localStorage.getItem('ahmad_ilham_theme');
    const shouldUseDark = localTheme === 'dark' || (!localTheme && mediaQuery.matches);
    changeTheme(shouldUseDark);
  }, []);

  const changeTheme = (toDark: boolean) => {
    setIsDarkMode(toDark);
    if (toDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ahmad_ilham_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ahmad_ilham_theme', 'light');
    }
  };

  const handleUpdateAll = (updated: {
    profile: ResearcherProfile;
    publications: Publication[];
    activities: AcademicActivity[];
    articles: Article[];
    mentorships: StudentMentorship[];
  }) => {
    setProfile(updated.profile);
    setPublications(updated.publications);
    setActivities(updated.activities);
    setArticles(updated.articles);
    setMentorships(updated.mentorships);

    // Persist to local storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleResetToDefault = () => {
    setProfile(initialProfile);
    setPublications(initialPublications);
    setActivities(initialActivities);
    setArticles(initialArticles);
    setMentorships(initialStudentMentorships);
    localStorage.removeItem(STORAGE_KEY);
  };

  const navigationItems = [
    { id: 'bio', label: 'Profil Peneliti', icon: User },
    { id: 'publications', label: 'Publikasi Riset', icon: BookOpen },
    { id: 'mentorship', label: 'Pembimbingan', icon: Users },
    { id: 'articles', label: 'Artikel Opini', icon: FileText },
    { id: 'activities', label: 'Kegiatan Akademis', icon: Calendar },
    { id: 'cms', label: 'CMS Administrator', icon: Settings },
    { id: 'deploy', label: 'Deployment Pages', icon: Github }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f19] text-[#24292e] dark:text-slate-100 font-sans flex flex-col justify-between transition-colors duration-350 antialiased selection:bg-blue-100 dark:selection:bg-blue-950/40 selection:text-blue-900 dark:selection:text-blue-100">
      
      {/* Dynamic Header Block (Following webmachinelearning.github.io style) */}
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/60 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* WebML-Style Connect-the-Dots Logo Brand */}
          <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => handleNavClick('bio')}>
            <div className="shrink-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#005a9c] dark:text-blue-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Connections */}
                <line x1="22" y1="50" x2="48" y2="25" stroke="currentColor" strokeWidth="4.5" />
                <line x1="22" y1="50" x2="48" y2="50" stroke="currentColor" strokeWidth="4.5" />
                <line x1="22" y1="50" x2="48" y2="75" stroke="currentColor" strokeWidth="4.5" />
                
                <line x1="48" y1="25" x2="78" y2="36" stroke="currentColor" strokeWidth="4.5" />
                <line x1="48" y1="50" x2="78" y2="36" stroke="currentColor" strokeWidth="4.5" />
                <line x1="48" y1="50" x2="78" y2="64" stroke="currentColor" strokeWidth="4.5" />
                <line x1="48" y1="75" x2="78" y2="64" stroke="currentColor" strokeWidth="4.5" />

                {/* Nodes with custom distinct colors like WebML */}
                <circle cx="22" cy="50" r="7.5" fill="#3b82f6" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="48" cy="25" r="7.5" fill="#1d4ed8" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="48" cy="50" r="7.5" fill="#60a5fa" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="48" cy="75" r="7.5" fill="#1e40af" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="78" cy="36" r="7.5" fill="#2563eb" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="78" cy="64" r="7.5" fill="#3b82f6" stroke="currentColor" strokeWidth="2.5" />
              </svg>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline gap-1 select-none">
              <span className="bg-[#005a9c] text-white px-2 py-0.5 rounded-sm font-sans font-bold text-xs tracking-wider lowercase">web</span>
              <span className="font-sans font-light text-[#005a9c] dark:text-blue-400 text-base md:text-lg tracking-tight lowercase">akademis</span>
              <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono font-medium tracking-wide block md:inline-block ml-0.5">ahmadilham</span>
            </div>
          </div>

          {/* Desktop Navigation Link Tabs (Matching simple links layout of WebML) */}
          <nav className="hidden lg:flex items-center gap-6 select-none font-sans font-medium text-xs md:text-sm">
            {navigationItems.map((item) => {
              // Hide redundant deployment tab in webml-style layout
              if (item.id === 'deploy') return null;
              
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-5 px-0.5 transition-colors cursor-pointer relative font-bold tracking-wide ${
                    isActive
                      ? 'text-[#005a9c] dark:text-blue-400 font-extrabold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-[#005a9c] dark:hover:text-blue-300 font-medium'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#005a9c] dark:bg-blue-400 animate-fade-in" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Utility Buttons: Theme Selector + Crimson-Red GitHub Button + Mobile menu */}
          <div className="flex items-center gap-3">
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="bg-[#c9302c] hover:bg-[#ac2925] text-white font-sans font-bold text-xs md:text-sm px-4 py-1.5 rounded-md shadow-xs transition-colors select-none cursor-pointer flex items-center gap-1.5"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}

            <button
              onClick={() => changeTheme(!isDarkMode)}
              className="p-2 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
              aria-label="Ubah Tema"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile burger button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Layer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.12 }}
            className="lg:hidden fixed inset-x-0 top-16 bg-white dark:bg-[#0c0e12] border-b border-[#e1dbd0] dark:border-zinc-800 py-4 px-6 z-30 shadow-md font-sans"
          >
            <div className="flex flex-col gap-2 select-none">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-none font-bold text-xs uppercase tracking-wider transition-all text-left cursor-pointer border-l-2 ${
                      isActive
                        ? 'border-[#800020] bg-stone-50 text-stone-900 dark:bg-zinc-900 dark:text-white'
                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-stone-50 dark:hover:bg-zinc-900/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#800020] dark:text-red-400" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container Workspace rendering tabs */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="w-full"
          >
            {activeTab === 'bio' && (
              <ProfileSection
                profile={profile}
                publicationsCount={publications.length}
                articlesCount={articles.filter(a => !a.isDraft).length}
                activitiesCount={activities.length}
                onNavigate={(tab) => handleNavClick(tab)}
              />
            )}

            {activeTab === 'publications' && (
              <PublicationsSection publications={publications} />
            )}

            {activeTab === 'mentorship' && (
              <MentorshipSection mentorships={mentorships} />
            )}

            {activeTab === 'articles' && (
              <ArticlesSection articles={articles} />
            )}

            {activeTab === 'activities' && (
              <ActivitiesSection activities={activities} />
            )}

            {activeTab === 'cms' && (
              <AdminCMS
                profile={profile}
                publications={publications}
                activities={activities}
                articles={articles}
                mentorships={mentorships}
                onUpdateAll={handleUpdateAll}
                onResetToDefault={handleResetToDefault}
              />
            )}

            {activeTab === 'deploy' && (
              <GithubPagesGuide />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Area (Following webmachinelearning.github.io styles) */}
      <footer className="w-full bg-gradient-to-r from-[#004780] via-[#005a9c] to-[#1c62b9] dark:from-[#0a1120] dark:via-[#002e5c] dark:to-[#004a80] text-slate-100 py-12 md:py-16 select-none transition-colors border-t border-blue-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 items-start font-sans">
          
          {/* Identity column based on WebML Footer */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <svg className="w-7 h-7 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="22" y1="50" x2="48" y2="25" stroke="currentColor" strokeWidth="4.5" />
                <line x1="22" y1="50" x2="48" y2="50" stroke="currentColor" strokeWidth="4.5" />
                <line x1="22" y1="50" x2="48" y2="75" stroke="currentColor" strokeWidth="4.5" />
                <line x1="48" y1="25" x2="78" y2="36" stroke="currentColor" strokeWidth="4.5" />
                <line x1="48" y1="50" x2="78" y2="36" stroke="currentColor" strokeWidth="4.5" />
                <line x1="48" y1="50" x2="78" y2="64" stroke="currentColor" strokeWidth="4.5" />
                <circle cx="22" cy="50" r="7" fill="#60a5fa" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="48" cy="25" r="7" fill="#ffffff" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="48" cy="50" r="7" fill="#3b82f6" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="48" cy="75" r="7" fill="#93c5fd" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="78" cy="36" r="7" fill="#ffffff" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="78" cy="64" r="7" fill="#60a5fa" stroke="currentColor" strokeWidth="2.5" />
              </svg>
              <div className="flex items-baseline gap-1">
                <span className="bg-white text-[#005a9c] px-1.5 py-0.5 rounded-sm font-sans font-bold text-[10px] tracking-wider lowercase">web</span>
                <span className="font-sans font-normal text-white text-base tracking-tight lowercase">akademis</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-blue-100 font-sans italic opacity-90 text-justify">
              "Mewujudkan pengajaran sains informatika tepercaya, riset kecerdasan buatan terapan bernilai tinggi, serta pembimbingan mahasiswa tugas akhir berbasis inovasi & integritas."
            </p>
            <p className="text-[10px] text-blue-200/70 font-mono tracking-wide">
              © 2026 Ahmad Ilham, S.Kom., M.Cs. • Universitas Muhammadiyah Semarang
            </p>
          </div>

          <div className="md:col-span-1" />

          {/* Sitemaps Quick Tabs links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-bold text-white text-xs tracking-widest uppercase font-mono border-b border-blue-400/20 pb-2">
              AKADEMIS
            </h4>
            <div className="grid grid-cols-1 gap-y-2.5 text-xs text-blue-100">
              <button onClick={() => handleNavClick('bio')} className="text-left font-medium hover:text-white transition-colors cursor-pointer">Profil Pengampu</button>
              <button onClick={() => handleNavClick('publications')} className="text-left font-medium hover:text-white transition-colors cursor-pointer">Arsip & Publikasi Riset</button>
              <button onClick={() => handleNavClick('mentorship')} className="text-left font-medium hover:text-white transition-colors cursor-pointer">Pembimbingan Tugas Akhir</button>
              <button onClick={() => handleNavClick('articles')} className="text-left font-medium hover:text-white transition-colors cursor-pointer">Esai & Catatan Opini</button>
              <button onClick={() => handleNavClick('activities')} className="text-left font-medium hover:text-white transition-colors cursor-pointer">Timeline Tridharma</button>
              <button onClick={() => handleNavClick('cms')} className="text-left font-medium hover:text-white transition-colors cursor-pointer">Kelola Database (CMS)</button>
              <button onClick={() => handleNavClick('deploy')} className="text-left font-medium hover:text-white transition-colors cursor-pointer">Panduan Deployment (GitHub Pages)</button>
            </div>
          </div>

          {/* Academic Portals links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-bold text-white text-xs tracking-widest uppercase font-mono border-b border-blue-400/20 pb-2">
              SITASI RESMI
            </h4>
            <div className="flex flex-col gap-3 text-xs font-mono text-blue-100">
              <a
                href={profile.sintaUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="hover:text-white flex items-center gap-1.5 transition-colors"
                title="SINTA Indeks Resmi"
              >
                SINTA Kemdikbudristek
                <ExternalLink className="w-3 h-3 text-blue-300 opacity-80 shrink-0" />
              </a>
              <a
                href={profile.googleScholarUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="hover:text-white flex items-center gap-1.5 transition-colors"
                title="Google Scholar Profil"
              >
                Google Scholar Profile
                <ExternalLink className="w-3 h-3 text-blue-300 opacity-80 shrink-0" />
              </a>
              <a
                href={profile.scopusUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="hover:text-white flex items-center gap-1.5 transition-colors"
                title="Scopus Indeks Peneliti"
              >
                Scopus Index Profile
                <ExternalLink className="w-3 h-3 text-blue-300 opacity-80 shrink-0" />
              </a>
              <div className="pt-2">
                <span className="text-[10px] text-blue-200/50 uppercase tracking-widest font-mono">FOLLOW US</span>
                <div className="flex gap-2.5 mt-1.5">
                  <a href={profile.githubUrl} target="_blank" referrerPolicy="no-referrer" className="text-white hover:text-blue-200 transition-colors" title="GitHub">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href={profile.linkedinUrl} target="_blank" referrerPolicy="no-referrer" className="text-white hover:text-blue-200 transition-colors" title="LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
