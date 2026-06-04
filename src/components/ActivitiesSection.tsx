/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { AcademicActivity, ActivityCategory } from '../types';
import { Briefcase, FlaskConical, Handshake, Mic, Medal, Calendar, Award, MapPin } from 'lucide-react';

interface ActivitiesSectionProps {
  activities: AcademicActivity[];
}

export default function ActivitiesSection({ activities }: ActivitiesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Riwayat' },
    { id: 'teaching', label: 'Pengajaran (Dosen)' },
    { id: 'research_grant', label: 'Hibah Riset Penelitian' },
    { id: 'community_service', label: 'Pengabdian Masyarakat' },
    { id: 'speaker', label: 'Pembicara / Pemakalah' },
    { id: 'award', label: 'Sertifikasi / Kepakaran' }
  ];

  const filteredActivities = useMemo(() => {
    if (activeCategory === 'all') return activities;
    return activities.filter(act => act.category === activeCategory);
  }, [activities, activeCategory]);

  const getCategoryConfig = (category: ActivityCategory) => {
    switch (category) {
      case 'teaching':
        return {
          icon: Briefcase,
          title: 'Pengajaran & Instruksional',
          colorClass: 'text-[#1c2a44] bg-[#1c2a44]/5 border-[#1c2a44]/15 dark:bg-blue-950/25 dark:text-blue-300 dark:border-blue-900/40',
          dotColor: 'bg-[#1c2a44] dark:bg-blue-400'
        };
      case 'research_grant':
        return {
          icon: FlaskConical,
          title: 'Hibah Riset & Investigasi',
          colorClass: 'text-[#800020] bg-[#800020]/5 border-[#800020]/15 dark:bg-red-950/25 dark:text-red-300 dark:border-red-900/40',
          dotColor: 'bg-[#800020] dark:bg-red-400'
        };
      case 'community_service':
        return {
          icon: Handshake,
          title: 'Pengabdian & Khidmat Sosial',
          colorClass: 'text-[#556b2f] bg-[#556b2f]/5 border-[#556b2f]/15 dark:bg-emerald-950/25 dark:text-emerald-300 dark:border-emerald-900/40',
          dotColor: 'bg-[#556b2f] dark:bg-emerald-550'
        };
      case 'speaker':
        return {
          icon: Mic,
          title: 'Pemakalah & Syarahan Ilmiah',
          colorClass: 'text-amber-800 bg-amber-55/10 border-amber-200 dark:bg-amber-950/25 dark:text-amber-300 dark:border-amber-900/40',
          dotColor: 'bg-amber-700'
        };
      case 'award':
        return {
          icon: Medal,
          title: 'Sertifikasi Kompetensi & Piagam',
          colorClass: 'text-rose-800 bg-rose-50/50 border-rose-200 dark:bg-rose-950/25 dark:text-rose-300 dark:border-rose-900/40',
          dotColor: 'bg-rose-700'
        };
    }
  };

  const formatDate = (dateStr: string) => {
    // Check if it's general string or precise ISO date.
    if (dateStr.length === 7) { // e.g. "2024-11"
      const [year, month] = dateStr.split('-');
      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];
      const monthIdx = parseInt(month, 10) - 1;
      if (monthIdx >= 0 && monthIdx < 12) {
        return `${months[monthIdx]} ${year}`;
      }
    }
    return dateStr;
  };

  return (
    <div className="space-y-8">
      {/* Activities Header */}
      <div className="space-y-2 border-b border-[#e1dbd0] dark:border-zinc-850 pb-5">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white">
          Arsip Tridharma Perguruan Tinggi
        </h2>
        <p className="text-sm md:text-base text-slate-500 max-w-3xl leading-relaxed font-serif text-justify">
          Kronik pengabdian terstruktur sebagai tenaga pendidik, rekam jejak hibah penelitian kementerian nasional, khidmat sosial pengabdian masyarakat, diseminasi wawasan lewat seminar, serta piagam keahlian profesional.
        </p>
      </div>

      {/* Categories Tabs Selector */}
      <div className="flex flex-wrap gap-1 border-b border-[#e1dbd0] dark:border-zinc-850/80 pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-none text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#1c2a44] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-stone-100/60'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Timeline Graphic */}
      <div className="relative border-l-2 border-[#e1dbd0]/80 dark:border-zinc-800 ml-4 pl-8 space-y-8 py-2">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((act) => {
            const config = getCategoryConfig(act.category);
            const IconComponent = config.icon;

            return (
              <div key={act.id} className="relative group">
                {/* Visual Circle on Line */}
                <span className={`absolute -left-[41px] top-1 w-6 h-6 rounded-none border border-stone-200 dark:border-zinc-805 dark:border-zinc-800 bg-white dark:bg-[#12141c] flex items-center justify-center text-xs relative select-none shadow-xs text-white transition-all group-hover:border-[#800020] group-hover:bg-[#800020]/10`}>
                  <span className={`w-2.5 h-2.5 ${config.dotColor} rounded-none`}></span>
                </span>

                {/* Main Card Content */}
                <div className="bg-white dark:bg-[#12141c] p-6 rounded-none border border-[#e1dbd0] dark:border-zinc-800 shadow-2xs hover:border-[#800020] dark:hover:border-red-400 transition-all duration-200 space-y-4">
                  {/* Category Pill and Date */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 dark:border-zinc-850 pb-2">
                    <span className={`flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-none border ${config.colorClass}`}>
                      <IconComponent className="w-3.5 h-3.5" />
                      {config.title}
                    </span>

                    <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-stone-500 bg-stone-100/50 dark:bg-zinc-900 px-2.5 py-0.5 rounded-none border border-stone-200/40 dark:border-zinc-800/40">
                      <Calendar className="w-3.5 h-3.5 text-[#800020] dark:text-red-450 shrink-0" />
                      {formatDate(act.date)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base md:text-lg font-serif font-bold text-slate-900 dark:text-white leading-normal hover:text-[#800020] dark:hover:text-red-350">
                    {act.link ? (
                      <a href={act.link} target="_blank" referrerPolicy="no-referrer" className="hover:underline inline-flex items-center gap-1.5 decoration-[#800020]">
                        {act.title}
                      </a>
                    ) : (
                      act.title
                    )}
                  </h3>

                  {/* Body description */}
                  <p className="text-sm font-serif leading-relaxed text-stone-600 dark:text-zinc-400 text-justify">
                    {act.description}
                  </p>

                  {/* Location Info Footer */}
                  {act.location && (
                    <div className="flex items-center gap-1.5 pt-1 text-xs font-mono text-stone-400">
                      <MapPin className="w-3.5 h-3.5 text-[#800520] shrink-0" />
                      <span>{act.location}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-white dark:bg-[#12141c] rounded-none border border-[#e1dbd0] dark:border-zinc-800 flex flex-col items-center justify-center space-y-3 relative -left-8">
            <Award className="w-8 h-8 text-stone-350" />
            <div className="font-serif italic text-stone-450 text-sm">Belum ada kompilasi catatan riwayat tridharma dalam filter kategori ini.</div>
          </div>
        )}
      </div>
    </div>
  );
}
