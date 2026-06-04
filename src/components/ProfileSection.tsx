/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ResearcherProfile } from '../types';
import { 
  Mail, 
  MapPin, 
  ExternalLink, 
  GraduationCap, 
  Github, 
  Linkedin, 
  BookOpen, 
  FileText, 
  Users, 
  Zap, 
  ShieldAlert, 
  Globe, 
  BadgeDollarSign,
  ChevronRight,
  BookOpenText,
  Calendar
} from 'lucide-react';

interface ProfileSectionProps {
  profile: ResearcherProfile;
  publicationsCount: number;
  articlesCount: number;
  activitiesCount: number;
  onNavigate: (tab: string) => void;
}

export default function ProfileSection({
  profile,
  publicationsCount,
  articlesCount,
  activitiesCount,
  onNavigate
}: ProfileSectionProps) {
  return (
    <div className="space-y-16 animate-fade-in">
      
      {/* 1. HERO HEADER BLOCK (Following webmachinelearning.github.io visual balance) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12 border-b border-slate-100 dark:border-slate-800/60">
        
        {/* Left Side: Text Branding + Brief Info */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-sans font-extrabold text-[#005a9c] dark:text-blue-400 tracking-tight leading-tight select-none flex items-baseline flex-wrap">
              Ahmad Ilham
              <span className="inline-block bg-[#c9302c] w-3.5 h-3.5 md:w-4.5 md:h-4.5 ml-1.5 shrink-0 align-baseline"></span>
            </h1>
            
            <h2 className="text-xl md:text-2xl font-sans font-semibold text-blue-600/90 dark:text-blue-350 tracking-tight leading-snug">
              Enable robust academic innovations and browser-based intelligent research
            </h2>
            
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-350 leading-relaxed text-justify max-w-2xl">
              Ahmad Ilham, S.Kom., M.Cs. merupakan dosen tetap di Program Studi S1 Informatika Universitas Muhammadiyah Semarang (UNIMUS). Beliau mengemban Tridharma perguruan tinggi dengan memfokuskan kegiatan pengajaran dan penelitian pada bidang Kecerdasan Buatan (AI), Computer Vision, Deep Learning, serta Web Technology, di samping membina bimbingan mahasiswa tingkat akhir secara interaktif dan humanis.
            </p>
          </div>

          {/* Double Buttons matching webmachinelearning.github.io buttons exactly */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onNavigate('mentorship')}
              className="bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-750 text-white font-sans font-bold text-xs md:text-sm px-6 py-2.5 rounded-md shadow-xs transition-colors cursor-pointer"
            >
              KONSULTASI BIMBINGAN
            </button>
            <button
              onClick={() => onNavigate('publications')}
              className="border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 text-[#005a9c] dark:text-blue-400 font-sans font-bold text-xs md:text-sm px-6 py-2.5 rounded-md shadow-xs transition-colors cursor-pointer"
            >
              PORTFOLIO RISET
            </button>
          </div>
        </div>

        {/* Right Side: The Famous "WEB ❤️ ... " Slogan */}
        <div className="lg:col-span-5 flex items-center justify-center py-6 px-4 md:py-12 border border-slate-100 dark:border-slate-800/60 bg-slate-50/30 dark:bg-slate-900/10 rounded-xl">
          <div className="text-center font-sans select-none tracking-widest whitespace-nowrap">
            <span className="text-xl md:text-2xl lg:text-3xl font-extralight text-slate-400 dark:text-slate-500 block">
              WEB <span className="inline-block text-[#c9302c] font-normal mx-1 select-none animate-pulse">❤️</span> INFORMATIKA
            </span>
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono tracking-widest uppercase block mt-2">
              ahmad ilham • unimus portfolio
            </span>
          </div>
        </div>

      </div>

      {/* 2. "Combining the best of both worlds" (Tridharma and Mentorship Integration Grid) */}
      <div className="space-y-10 py-6">
        
        {/* Headings */}
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-sans font-bold text-[#005a9c] dark:text-blue-400 tracking-tight">
            Menggabungkan Riset Teoretis dengan Pengajaran Praktis
          </h3>
          <p className="text-sm md:text-base text-slate-500 dark:text-zinc-400 leading-relaxed font-light">
            by bringing browser-accessible intelligence down to student-guided models and web-based implementations
          </p>
        </div>

        {/* Feature Grid mimicking Low Latency, Privacy, High Availability, Low Cost */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          {/* Feature 1 - Low Latency mapping to Supervisi Responsif */}
          <div className="flex gap-4 items-start">
            <div className="shrink-0 p-3 bg-blue-50 dark:bg-blue-950/40 text-[#005a9c] dark:text-blue-400 rounded-md">
              <Zap className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-sans font-bold text-slate-900 dark:text-white text-base">
                Supervisi Mahasiswa Responsif
              </h4>
              <p className="text-xs md:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed text-justify">
                Bimbingan terstruktur dan intensif seminggu sekali di laboratorium informatika. Memastikan naskah skripsi bebas dari hambatan teknis logika pemrograman secara real-time.
              </p>
            </div>
          </div>

          {/* Feature 2 - Privacy Preserving mapping to Integritas Karya & Etika */}
          <div className="flex gap-4 items-start">
            <div className="shrink-0 p-3 bg-blue-50 dark:bg-blue-950/40 text-[#005a9c] dark:text-blue-400 rounded-md">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-sans font-bold text-slate-900 dark:text-white text-base">
                Integritas Karya Bebas Plagiarisme
              </h4>
              <p className="text-xs md:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed text-justify">
                Menanamkan kejujuran akademis dengan verifikasi naskah ketat melalui cek plagiasi digital terpercaya, menjunjung tinggi kode etik ilmiah, serta kejujuran pengerjaan sanksi riset.
              </p>
            </div>
          </div>

          {/* Feature 3 - High Availability mapping to Aksesibilitas Terbuka di Kelas */}
          <div className="flex gap-4 items-start">
            <div className="shrink-0 p-3 bg-blue-50 dark:bg-blue-950/40 text-[#005a9c] dark:text-blue-400 rounded-md">
              <Globe className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-sans font-bold text-slate-900 dark:text-white text-base">
                Aksesibilitas Kode Sumber Terbuka
              </h4>
              <p className="text-xs md:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed text-justify">
                Seluruh naskah publikasi riset, bahan ajar, serta draf pemrograman sistem mahasiswa bimbingan disebarkan secara terbuka di lisensi publik guna memicu keaktifan kontribusi ilmiah.
              </p>
            </div>
          </div>

          {/* Feature 4 - Low Cost mapping to Problem Praktis & Tepat Guna */}
          <div className="flex gap-4 items-start">
            <div className="shrink-0 p-3 bg-blue-50 dark:bg-blue-950/40 text-[#005a9c] dark:text-blue-400 rounded-md">
              <BadgeDollarSign className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-sans font-bold text-slate-900 dark:text-white text-base">
                Riset Tepat Guna & Berdaya Guna
              </h4>
              <p className="text-xs md:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed text-justify">
                Mendorong mahasiswa untuk berfokus pada solusi tepat guna yang dapat langsung dideploy dengan biaya minimal di sistem komputasi awan murah, greenhouse pertanian, maupun unit klinis.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* 3. W3C SPECIFICATION-STYLE METADATA TABLES (Aesthetic details) */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden shrink-0 bg-slate-50/50 dark:bg-slate-900/5 transition-colors">
        
        {/* Header bar of metadata table */}
        <div className="px-5 py-3.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 font-sans font-bold text-xs tracking-wider uppercase">
          Spesifikasi Administratif & Metadata Akademis
        </div>
        
        {/* Data Rows */}
        <div className="divide-y divide-slate-200 dark:divide-slate-800 font-sans text-xs md:text-sm leading-relaxed">
          
          <div className="grid grid-cols-1 md:grid-cols-4 px-5 py-3 gap-y-1 items-baseline">
            <div className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide text-[10px]">Identitas Dosen</div>
            <div className="md:col-span-3 text-slate-800 dark:text-slate-200 font-medium">
              {profile.name} {profile.titles} <span className="text-slate-400 dark:text-zinc-500 text-xs font-normal">({profile.role})</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 px-5 py-3 gap-y-1 items-baseline">
            <div className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide text-[10px]">Afiliasi Resmi</div>
            <div className="md:col-span-3 text-slate-800 dark:text-slate-200 font-medium font-mono text-xs">
              {profile.department} • <span className="font-bold">{profile.institution}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 px-5 py-3 gap-y-1 items-baseline">
            <div className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide text-[10px]">Kepakaran Utama</div>
            <div className="md:col-span-3">
              <div className="flex flex-wrap gap-1.5">
                {profile.researchInterests.map((interest, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-sm bg-blue-50 dark:bg-blue-950/30 text-[#005a9c] dark:text-blue-400 font-mono text-xs border border-blue-105/10 dark:border-blue-900/40">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 px-5 py-3 gap-y-1 items-baseline">
            <div className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide text-[10px]">Korespondensi</div>
            <div className="md:col-span-3 text-slate-850 dark:text-slate-200 font-mono text-xs select-all">
              <a href={`mailto:${profile.email}`} className="hover:text-blue-550 dark:hover:text-blue-400 underline">
                {profile.email}
              </a>
              {profile.address && (
                <span className="text-slate-400 block mt-1 font-sans text-xs font-normal leading-normal">{profile.address}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 px-5 py-3 gap-y-1 items-baseline">
            <div className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide text-[10px]">Indeksasi SINTA</div>
            <div className="md:col-span-3 text-sm flex items-center gap-2">
              <a
                href={profile.sintaUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 font-mono text-xs font-bold underline inline-flex items-center gap-1.5 text-blue-600"
              >
                SINTA Kemdikbudristek ID
                <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 px-5 py-3 gap-y-1 items-baseline">
            <div className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide text-[10px]">Sitasi Scholar</div>
            <div className="md:col-span-3 text-sm flex items-center gap-2">
              <a
                href={profile.googleScholarUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="hover:text-blue-650 dark:hover:text-blue-450 font-mono text-xs font-bold underline inline-flex items-center gap-1.5 text-blue-600"
              >
                Google Scholar Profile
                <ExternalLink className="w-3 h-3 text-slate-450 shrink-0" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 px-5 py-3 gap-y-1 items-baseline">
            <div className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide text-[10px]">Scopus Identifer</div>
            <div className="md:col-span-3 text-sm flex items-center gap-2">
              <a
                href={profile.scopusUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="hover:text-blue-650 dark:hover:text-blue-450 font-mono text-xs font-bold underline inline-flex items-center gap-1.5 text-blue-600"
              >
                Scopus Author Portal
                <ExternalLink className="w-3 h-3 text-slate-450 shrink-0" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 4. THREE LIGHT QUICK NAV CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        
        {/* Card 1 */}
        <div className="p-6 rounded-lg bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/80 flex flex-col justify-between space-y-4 hover:border-blue-400 dark:hover:border-blue-500 group transition-all">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#005a9c] dark:text-blue-400">
              <BookOpen className="w-4 h-4" />
              <h3 className="font-sans font-bold text-slate-900 dark:text-white text-base">Publikasi Riset</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed text-justify">
              Daftar kompilasi naskah akademis mumpuni di jurnal internasional Scopus, naskah nasional terakreditasi Kemdikbud (Sinta), monografi, serta buku ajar pendukung tridharma perguruan tinggi.
            </p>
          </div>
          <button
            onClick={() => onNavigate('publications')}
            className="flex items-center gap-1.5 text-[10px] font-mono text-[#005a9c] dark:text-blue-400 group-hover:underline font-bold tracking-widest cursor-pointer mt-2"
          >
            LIHAT ARSIP PUBLIKASI ({publicationsCount}) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-lg bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/80 flex flex-col justify-between space-y-4 hover:border-blue-400 dark:hover:border-blue-500 group transition-all">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#005a9c] dark:text-blue-400">
              <FileText className="w-4 h-4" />
              <h3 className="font-sans font-bold text-slate-900 dark:text-white text-base">Esai & Catatan Opini</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed text-justify">
              Rangkaian draf pembahasan pemikiran segar dalam kedaulatan sains terbuka, esai literasi siber kecerdasan buatan, tantangan disinformasi, serta opini sosiologi pendidikan tinggi informatika.
            </p>
          </div>
          <button
            onClick={() => onNavigate('articles')}
            className="flex items-center gap-1.5 text-[10px] font-mono text-[#005a9c] dark:text-blue-400 group-hover:underline font-bold tracking-widest cursor-pointer mt-2"
          >
            BACA ARTIKEL OPINI ({articlesCount}) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-lg bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/80 flex flex-col justify-between space-y-4 hover:border-blue-400 dark:hover:border-blue-500 group transition-all">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#005a9c] dark:text-blue-400">
              <Calendar className="w-4 h-4" />
              <h3 className="font-sans font-bold text-slate-900 dark:text-white text-base">Tridharma & Kegiatan</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed text-justify">
              Catatan kronologis pengajaran kuliah resmi sebagai dosen pengampu tepercaya, realisasi pengiriman hibah penelitian nasional, pengabdian masyarakat terukur, serta program bimbingan eksternal.
            </p>
          </div>
          <button
            onClick={() => onNavigate('activities')}
            className="flex items-center gap-1.5 text-[10px] font-mono text-[#005a9c] dark:text-blue-400 group-hover:underline font-bold tracking-widest cursor-pointer mt-2"
          >
            EKSPLORASI RIWAYAT ({activitiesCount}) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
