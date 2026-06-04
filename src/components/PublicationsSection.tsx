/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Publication, PublicationType } from '../types';
import { Search, ChevronDown, ChevronUp, Link, BookOpen, Quote, Tag } from 'lucide-react';

interface PublicationsSectionProps {
  publications: Publication[];
}

export default function PublicationsSection({ publications }: PublicationsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Tabs structure
  const tabs = [
    { id: 'all', label: 'Semua Publikasi' },
    { id: 'journal_international', label: 'Jurnal Internasional' },
    { id: 'journal_national', label: 'Jurnal Nasional' },
    { id: 'conference', label: 'Prosiding & Konferensi' },
    { id: 'book', label: 'Buku Ajar' }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setExpandedId(null);
  };

  const toggleAbstract = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const filteredPublications = useMemo(() => {
    return publications.filter(pub => {
      // Tab filter
      if (activeTab !== 'all' && pub.type !== activeTab) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() === '') return true;

      const query = searchQuery.toLowerCase();
      const titleMatch = pub.title.toLowerCase().includes(query);
      const authorsMatch = pub.authors.toLowerCase().includes(query);
      const venueMatch = pub.venue.toLowerCase().includes(query);
      const abstractMatch = pub.abstract ? pub.abstract.toLowerCase().includes(query) : false;
      const tagsMatch = pub.tags.some(tag => tag.toLowerCase().includes(query));

      return titleMatch || authorsMatch || venueMatch || abstractMatch || tagsMatch;
    });
  }, [publications, activeTab, searchQuery]);

  const getBadgeStyle = (type: PublicationType) => {
    switch (type) {
      case 'journal_international':
        return 'text-[#800020] border-[#800020]/25 bg-[#800020]/5 dark:text-red-305 dark:text-red-300 dark:border-red-900/40 dark:bg-red-950/20';
      case 'journal_national':
        return 'text-[#1c2a44] border-[#1c2a44]/25 bg-[#1c2a44]/5 dark:text-blue-300 dark:border-blue-900/40 dark:bg-blue-950/20';
      case 'conference':
        return 'text-stone-700 border-stone-300 bg-stone-55 dark:text-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50';
      case 'book':
        return 'text-amber-800 border-amber-200 bg-amber-50/50 dark:text-amber-300 dark:border-amber-900/40 dark:bg-amber-950/20';
    }
  };

  const getTypeNameInID = (type: PublicationType) => {
    switch (type) {
      case 'journal_international': return 'Jurnal Internasional (Scopus/SJR)';
      case 'journal_national': return 'Jurnal Nasional Terakreditasi';
      case 'conference': return 'Prosiding Seminar Ilmiah';
      case 'book': return 'Buku Referensi / Ajar';
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Section Header */}
      <div className="space-y-2 border-b border-[#e1dbd0] dark:border-zinc-850 pb-5">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white">
          Portofolio Publikasi Riset & Karya Tulis
        </h2>
        <p className="text-sm md:text-base text-slate-500 max-w-3xl leading-relaxed font-serif text-justify">
          Arsip draf karya tulis ilmiah, buku referensi perkuliahan, naskah jurnal terindeks Scopus, serta berkala SINTA Republik Indonesia yang dikembangkan oleh Ahmad Ilham secara mandiri maupun kolaborasi institusi.
        </p>
      </div>

      {/* Filters and Search Bar Container */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari naskah lewat judul, penulis, kata kunci, abstrak, atau penerbit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-none border border-[#e1dbd0] dark:border-zinc-800 bg-white dark:bg-[#12141c] font-sans text-xs focus:outline-none focus:ring-1 focus:ring-[#800020] focus:border-[#800020] text-slate-800 dark:text-slate-100 placeholder:italic placeholder:text-stone-400"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-1 border-b border-[#e1dbd0] dark:border-zinc-850/80 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-3 py-1.5 rounded-none text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#1c2a44] text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-stone-100/60 dark:hover:bg-zinc-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Publications Listing */}
      <div className="space-y-6">
        {filteredPublications.length > 0 ? (
          filteredPublications.map((pub) => {
            const isExpanded = expandedId === pub.id;
            return (
              <div
                key={pub.id}
                className="bg-white dark:bg-[#12141c] p-6 rounded-none border border-[#e1dbd0] dark:border-zinc-800 shadow-2xs hover:border-[#800020] dark:hover:border-red-400 transition-all duration-200 flex flex-col space-y-4 relative"
              >
                {/* Header Tag + Year */}
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-none border tracking-widest uppercase ${getBadgeStyle(pub.type)}`}>
                      {getTypeNameInID(pub.type)}
                    </span>
                    {pub.citationCount !== undefined && pub.citationCount > 0 && (
                      <span className="flex items-center gap-1.5 text-[10px] font-mono bg-stone-100 dark:bg-zinc-900 text-stone-605 text-[#800020] dark:text-red-300 px-2 py-0.5 rounded-none border border-stone-200/50 dark:border-zinc-800">
                        <Quote className="w-3 h-3 text-[#800020] dark:text-red-400" />
                        Google Sitasi: {pub.citationCount}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-600 bg-stone-100/50 dark:bg-zinc-900 px-2.5 py-0.5 rounded-none border border-stone-200/40 dark:border-zinc-800/40">
                    TAHUN {pub.year}
                  </span>
                </div>

                {/* Main Title & Authors in Citation Style */}
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-serif font-bold text-slate-900 dark:text-white hover:text-[#800020] dark:hover:text-red-305 transition-colors leading-snug">
                    {pub.url ? (
                      <a href={pub.url} target="_blank" referrerPolicy="no-referrer" className="inline-flex items-center gap-1.5 hover:underline decoration-[#800020]">
                        {pub.title}
                        <Link className="w-4 h-4 text-stone-300 shrink-0 inline" />
                      </a>
                    ) : (
                      pub.title
                    )}
                  </h3>
                  <p className="text-xs md:text-sm font-sans font-semibold tracking-wide text-stone-600 dark:text-zinc-400">
                    {pub.authors}
                  </p>
                </div>

                {/* Venue details in Standard Italic style */}
                <p className="text-xs md:text-sm font-serif italic text-stone-500 dark:text-zinc-400 border-l border-stone-200 dark:border-zinc-800 pl-3">
                  Dipublikasikan pada: <span className="font-semibold text-[#1c2a44] dark:text-[#a0b0d0]">{pub.venue}</span> {pub.volumeInfo && `, VolInfo: ${pub.volumeInfo}`} {pub.publisher && ` — (${pub.publisher})`}
                </p>

                {/* Tags */}
                {pub.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#e1dbd0]/40 dark:border-zinc-850/40">
                    <Tag className="w-3 h-3 text-stone-400 shrink-0" strokeWidth={2.5} />
                    {pub.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono text-stone-400 dark:text-zinc-500 uppercase tracking-wider"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Abstract Section (Collapsible) */}
                {pub.abstract && (
                  <div className="border-t border-[#e1dbd0]/50 dark:border-zinc-900 pt-3">
                    <button
                      type="button"
                      onClick={() => toggleAbstract(pub.id)}
                      className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 hover:text-[#800020] dark:hover:text-red-300 cursor-pointer transition-colors"
                    >
                      <span>{isExpanded ? 'Sembunyikan Abstrak Naskah' : 'Tampilkan Abstrak Dokumen'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-[#800020]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#800020]" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 text-sm font-serif leading-relaxed text-stone-605 text-stone-600 dark:text-zinc-300 p-4 rounded-none bg-[#faf8f5] dark:bg-[#0c0e12] border border-[#e1dbd0] dark:border-zinc-800 select-text text-justify">
                        <p className="font-bold font-sans text-slate-800 dark:text-slate-200 text-xs mb-2 font-mono tracking-wider uppercase border-b border-stone-200/50 dark:border-zinc-850 pb-1">Abstrak Makalah Ilmiah:</p>
                        {pub.abstract}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-white dark:bg-[#12141c] rounded-none border border-[#e1dbd0] dark:border-zinc-800 flex flex-col items-center justify-center space-y-3">
            <BookOpen className="w-8 h-8 text-stone-350" />
            <div className="font-serif italic text-stone-400 text-sm">Tidak dapat menemukan draf atau naskah publikasi riset yang dicari.</div>
          </div>
        )}
      </div>
    </div>
  );
}
