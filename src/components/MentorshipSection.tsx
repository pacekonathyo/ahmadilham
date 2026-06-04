/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { StudentMentorship, MentorshipStatus } from '../types';
import { Search, GraduationCap, Users, BookOpen, Clock, CheckCircle2, FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface MentorshipSectionProps {
  mentorships: StudentMentorship[];
}

export default function MentorshipSection({ mentorships }: MentorshipSectionProps) {
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Status map for filtering
  const filters = [
    { id: 'all', label: 'Semua Mahasiswa' },
    { id: 'ongoing', label: 'Bimbingan Aktif' },
    { id: 'proposal', label: 'Ujian Proposal' },
    { id: 'thesis', label: 'Bimbingan Skripsi' },
    { id: 'completed', label: 'Selesai & Lulus' }
  ];

  const handleStatusFilterChange = (status: string) => {
    setActiveStatusFilter(status);
    setExpandedId(null);
  };

  const toggleNotes = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const filteredMentorships = useMemo(() => {
    return mentorships.filter(ment => {
      // Status filter
      if (activeStatusFilter !== 'all' && ment.status !== activeStatusFilter) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() === '') return true;

      const query = searchQuery.toLowerCase();
      const nameMatch = ment.studentName.toLowerCase().includes(query);
      const nimMatch = ment.studentNim.toLowerCase().includes(query);
      const titleMatch = ment.thesisTitle.toLowerCase().includes(query);
      const levelMatch = ment.level.toLowerCase().includes(query);
      const notesMatch = ment.notes ? ment.notes.toLowerCase().includes(query) : false;

      return nameMatch || nimMatch || titleMatch || levelMatch || notesMatch;
    });
  }, [mentorships, activeStatusFilter, searchQuery]);

  // Color scheme matching W3C specifications status badges
  const getW3CBadgeStyle = (status: MentorshipStatus) => {
    switch (status) {
      case 'completed': // like W3C Recommendation (Green)
        return 'bg-[#008000]/10 text-[#006400] border-[#008000]/25 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/50';
      case 'thesis': // like Proposed Recommendation (Blue)
        return 'bg-[#005a9c]/10 text-[#005a9c] border-[#005a9c]/25 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800/50';
      case 'proposal': // like Candidate Recommendation (Amber)
        return 'bg-[#a0522d]/10 text-[#a0522d] border-[#a0522d]/25 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/50';
      case 'ongoing': // like Working Draft (Orange/Red)
        return 'bg-[#d9534f]/10 text-[#c9302c] border-[#d9534f]/25 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50';
    }
  };

  const getStatusLabel = (status: MentorshipStatus) => {
    switch (status) {
      case 'completed':
        return 'Selesai & Lulus';
      case 'thesis':
        return 'Bimbingan Skripsi';
      case 'proposal':
        return 'Ujian Proposal';
      case 'ongoing':
        return 'Bimbingan Aktif';
    }
  };

  // Compute stats
  const stats = useMemo(() => {
    const total = mentorships.length;
    const completed = mentorships.filter(m => m.status === 'completed').length;
    const ongoingAndThesis = mentorships.filter(m => m.status === 'ongoing' || m.status === 'thesis').length;
    const proposal = mentorships.filter(m => m.status === 'proposal').length;
    return { total, completed, ongoingAndThesis, proposal };
  }, [mentorships]);

  return (
    <div className="space-y-8">
      {/* Top Banner Header designed following W3C specifications landing look */}
      <div className="space-y-3 border-b border-[#e1dbd0] dark:border-zinc-850 pb-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#005a9c] dark:text-blue-400 border border-[#005a9c]/30 px-2 py-0.5 rounded-none dark:border-blue-900/50">
            Tridharma: Pengajaran & Kemahasiswaan
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white leading-tight">
          Supervisi & Rumah Bimbingan Mahasiswa
        </h2>
        <p className="text-sm md:text-base text-slate-500 max-w-3xl leading-relaxed font-serif text-justify">
          Ruang koordinasi rancangan Tugas Akhir / Skripsi mahasiswa di program studi S1 Informatika Universitas Muhammadiyah Semarang yang dibimbing langsung oleh Ahmad Ilham, S.Kom., M.Cs., mencakup riset sistem cerdas, pemrosesan citra, IoT, dan sains data lokal.
        </p>
      </div>

      {/* Tech Spec Stats Box Grid (W3C Standard Group Metadata Style) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-stone-100/50 dark:bg-zinc-950/20 p-4 border border-[#e1dbd0] dark:border-zinc-800 rounded-none">
        <div className="p-3 text-left">
          <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Total Bimbingan</p>
          <div className="text-2xl font-mono font-bold text-slate-900 dark:text-white mt-1">{stats.total}</div>
          <span className="text-[9px] font-serif text-slate-400">Mahasiswa terdaftar</span>
        </div>
        <div className="p-3 text-left border-l border-[#e1dbd0]/60 dark:border-zinc-800">
          <p className="text-[10px] font-mono uppercase tracking-wider text-green-600 dark:text-emerald-450">Selesai & Lulus</p>
          <div className="text-2xl font-mono font-bold text-green-600 dark:text-emerald-400 mt-1">{stats.completed}</div>
          <span className="text-[9px] font-serif text-slate-400">Alumni berpredikat baik</span>
        </div>
        <div className="p-3 text-left border-l border-[#e1dbd0]/60 dark:border-zinc-800">
          <p className="text-[10px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400">Pengerjaan Skripsi</p>
          <div className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-450 mt-1">{stats.ongoingAndThesis}</div>
          <span className="text-[9px] font-serif text-slate-400">Tahap konstruksi naskah</span>
        </div>
        <div className="p-3 text-left border-l border-[#e1dbd0]/60 dark:border-zinc-800">
          <p className="text-[10px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400">Bimbingan Proposal</p>
          <div className="text-2xl font-mono font-bold text-amber-700 dark:text-amber-450 mt-1">{stats.proposal}</div>
          <span className="text-[9px] font-serif text-slate-400">Tahap pengajuan hipotesis</span>
        </div>
      </div>

      {/* Interactive Filters Area */}
      <div className="space-y-4">
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-450" />
          <input
            type="text"
            placeholder="Cari NIM, nama mahasiswa, judul penelitian, program studi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-none border border-[#e1dbd0] dark:border-zinc-800 bg-white dark:bg-[#12141c] font-sans text-xs focus:outline-none focus:ring-1 focus:ring-[#005a9c] focus:border-[#005a9c] text-slate-800 dark:text-slate-100 placeholder:italic"
          />
        </div>

        {/* Tab Filter Group (W3C Standard Specifications Category style) */}
        <div className="flex flex-wrap gap-1 border-b border-[#e1dbd0] dark:border-zinc-850/80 pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleStatusFilterChange(filter.id)}
              className={`px-3.5 py-1.5 rounded-none text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                activeStatusFilter === filter.id
                  ? 'bg-[#005a9c] text-white border-b-2 border-[#004578]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-stone-100/60'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main List Rendering in W3C Clean Tables / Grid spec style */}
      <div className="space-y-4">
        {filteredMentorships.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-[#e1dbd0] dark:border-zinc-800 font-sans text-xs md:text-sm">
              <thead className="bg-stone-50 dark:bg-[#12141c] text-slate-600 dark:text-zinc-400 font-mono text-[10px] uppercase tracking-wider border-b border-[#e1dbd0] dark:border-zinc-800 select-none">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Mahasiswa & NIM</th>
                  <th className="py-3.5 px-4 font-bold">Prodi / Jenjang</th>
                  <th className="py-3.5 px-4 font-bold">Rencana Topik / Judul Skripsi</th>
                  <th className="py-3.5 px-4 font-bold text-center">Status Penelitian</th>
                  <th className="py-3.5 px-4 font-bold text-right">Periode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e1dbd0] dark:divide-zinc-800/80 bg-white dark:bg-[#0c0e12]">
                {filteredMentorships.map((ment) => {
                  const isExpanded = expandedId === ment.id;
                  return (
                    <tr 
                      key={ment.id} 
                      className="hover:bg-[#faf8f5]/55 dark:hover:bg-zinc-900/30 transition-colors"
                    >
                      <td className="py-4 px-4 align-top">
                        <div className="space-y-1">
                          <p className="font-bold text-slate-900 dark:text-white font-sans">{ment.studentName}</p>
                          <p className="font-mono text-[10px] text-slate-450 text-slate-500 font-bold">{ment.studentNim}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 align-top text-xs font-serif text-slate-600 dark:text-zinc-400 whitespace-nowrap">
                        {ment.level}
                      </td>
                      <td className="py-4 px-4 align-top max-w-sm md:max-w-md">
                        <div className="space-y-1.5 text-justify">
                          <p className="font-serif font-bold text-slate-950 dark:text-slate-205 leading-relaxed text-justify dark:text-white">
                            {ment.thesisTitle}
                          </p>
                          {ment.notes && (
                            <div className="space-y-1">
                              <button 
                                onClick={() => toggleNotes(ment.id)}
                                className="text-[10px] font-mono text-[#005a9c] dark:text-blue-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                              >
                                {isExpanded ? 'Sembunyikan Catatan Kemajuan' : 'Tampilkan Catatan Kemajuan'}
                                <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                              </button>
                              
                              {isExpanded && (
                                <p className="text-xs font-serif italic text-stone-500 dark:text-zinc-400 bg-stone-50 dark:bg-zinc-900/50 p-2 text-justify border-l-2 border-[#005a9c]/50">
                                  {ment.notes}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 align-top text-center">
                        <span className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 border uppercase tracking-widest ${getW3CBadgeStyle(ment.status)}`}>
                          {getStatusLabel(ment.status)}
                        </span>
                      </td>
                      <td className="py-4 px-4 align-top text-right text-xs font-mono font-bold text-slate-550 text-slate-500 whitespace-nowrap">
                        {ment.academicYear}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-[#12141c] rounded-none border border-[#e1dbd0] dark:border-zinc-800 flex flex-col items-center justify-center space-y-3">
            <Users className="w-8 h-8 text-stone-350" />
            <div className="font-serif italic text-stone-400 text-sm">Tidak menemukan mahasiswa bimbingan dengan kata kunci tersebut.</div>
          </div>
        )}
      </div>

      {/* Interactive FAQ / Guidance Prosedur (W3C standard document helper block) */}
      <div className="p-6 border border-[#e1dbd0] dark:border-zinc-800 bg-[#faf8f5]/55 dark:bg-zinc-950/20 rounded-none space-y-4">
        <h4 className="font-mono font-bold text-[10px] uppercase tracking-wider text-[#005a9c] dark:text-blue-400 flex items-center gap-1.5 border-b border-[#e1dbd0] pb-2">
          <BookOpen className="w-3.5 h-3.5" />
          Prosedur Standardisasi Bimbingan & Konsultasi
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed font-serif text-slate-600 dark:text-zinc-400 text-justify">
          <div className="space-y-2">
            <p className="font-bold text-slate-900 dark:text-white">1. Pra-Proposal (Pengajuan Ide & Topik)</p>
            <p>Mahasiswa wajib memiliki draf awal berisi latar belakang persoalan komputer, rumusan masalah, batasan teknologi (seperti framework deep learning/dataset), serta usulan kontribusi metodologis sebelum memulai sesi penjadwalan bimbingan formal pertama.</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-slate-900 dark:text-white">2. Siklus Pertemuan Mingguan</p>
            <p>Konsultasi terjadwal dilakukan dua kali dalam seminggu di Laboratorium Informatika UNIMUS. Mahasiswa didorong untuk mengunggah draf kode pengerjaan (skrip Python / Jupyter Notebook) di repositori GitHub privat masing-masing sebagai sarana kontrol kemajuan riset.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
