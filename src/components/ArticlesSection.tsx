/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Article } from '../types';
import { ChevronLeft, Calendar, Clock, ArrowRight, BookOpen, Tag } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

interface ArticlesSectionProps {
  articles: Article[];
}

export default function ArticlesSection({ articles }: ArticlesSectionProps) {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Separate published vs draft (only show published on public site)
  const publishedArticles = articles.filter(art => !art.isDraft);

  const activeArticle = articles.find(art => art.id === selectedArticleId);

  const formatDate = (dateStr: string) => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      const day = date.getDate();
      const monthIdx = date.getMonth();
      const year = date.getFullYear();
      return `${day} ${months[monthIdx]} ${year}`;
    } catch {
      return dateStr;
    }
  };

  if (activeArticle) {
    return (
      <div className="space-y-8 max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => setSelectedArticleId(null)}
          className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-[#800020] transition-colors cursor-pointer border-b border-stone-300 pb-1 uppercase tracking-wider"
        >
          <ChevronLeft className="w-4 h-4 text-[#800020]" />
          Kembali ke Indeks Esai
        </button>

        {/* Article Metadata */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-none border text-[#800020] bg-[#800020]/5 border-[#800020]/20 uppercase tracking-widest">
              Kategori: {activeArticle.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(activeArticle.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{activeArticle.readingTimeMinutes} Menit Baca</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-950 dark:text-white leading-tight">
            {activeArticle.title}
          </h1>

          <p className="text-sm md:text-base font-serif italic text-stone-500 border-l-2 border-[#800020] pl-4 py-1.5 dark:text-zinc-400 bg-stone-50 dark:bg-zinc-900/40 pr-3">
            Sari Tulisan: &ldquo;{activeArticle.summary}&rdquo;
          </p>
        </div>

        <hr className="border-[#e1dbd0] dark:border-zinc-800" />

        {/* Dynamic Markdown Content View */}
        <article className="select-text prosetype">
          <MarkdownRenderer content={activeArticle.content} />
        </article>

        {/* Footer info & tags */}
        <div className="border-t border-[#e1dbd0] dark:border-zinc-800 pt-6 mt-12 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-[#800020] shrink-0" />
            <span className="text-xs font-mono font-bold text-[#800020] uppercase tracking-widest mr-1">Indeks Istilah:</span>
            {activeArticle.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-2.5 py-1 rounded-none bg-white dark:bg-zinc-900/50 text-stone-605 text-stone-600 dark:text-zinc-400 border border-[#e1dbd0] dark:border-zinc-800"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="bg-[#faf8f5]/80 dark:bg-[#12141c]/50 p-4 border border-[#e1dbd0]/80 dark:border-zinc-800 text-[10px] md:text-xs font-serif leading-relaxed text-slate-500 text-justify">
            <p className="font-bold font-mono uppercase tracking-wider text-[#800020] mb-1">Ketentuan Dokumen Terbuka (Open Access):</p>
            Hak Cipta Terpelihara © Ahmad Ilham. Esai opini akademis populer ini dirilis untuk disebarkan secara bebas di bawah lisensi Creative Commons Attribution 4.0 International. Penulis mendorong sirkulasi yang jujur dengan mencantumkan nama penulis asli beserta rujukan tautan rujukan secara lengkap dan jelas.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Article Header */}
      <div className="space-y-2 border-b border-[#e1dbd0] dark:border-zinc-850 pb-5">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white">
          Artikel Opini & Catatan Kolumnis
        </h2>
        <p className="text-sm md:text-base text-slate-500 max-w-3xl leading-relaxed font-serif text-justify">
          Rangkaian esai opini populer, pemikiran kritis perguruan tinggi, serta dinamika literasi siber kecerdasan buatan, riset sains terbuka, dan kemajuan kurikulum informatika di Indonesia.
        </p>
      </div>

      {/* Opinion Grid Index */}
      <div className="relative">
        {publishedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publishedArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticleId(art.id)}
                className="bg-white dark:bg-[#12141c] p-6 rounded-none border border-[#e1dbd0] dark:border-zinc-800 hover:border-[#800020] hover:shadow-2xs transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500 pb-2 border-b border-stone-100 dark:border-zinc-850">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-none border text-[#800020] bg-[#800018]/5 border-[#800020]/25 uppercase tracking-widest">
                      {art.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{formatDate(art.publishedAt)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg md:text-xl font-serif font-bold text-slate-900 dark:text-white group-hover:text-[#800020] dark:group-hover:text-red-300 transition-colors leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs md:text-sm font-serif text-stone-500 dark:text-zinc-400 leading-relaxed text-justify line-clamp-3 select-none">
                      {art.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#e1dbd0]/50 dark:border-zinc-900/40">
                  <span className="flex items-center gap-1.5 text-xs text-stone-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    Bahan baca: {art.readingTimeMinutes} menit
                  </span>
                  <span className="flex items-center gap-1 text-xs font-mono font-bold text-[#800020] dark:text-red-300 group-hover:underline">
                    <span>Mulai Membaca</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-[#12141c] rounded-none border border-[#e1dbd0] dark:border-zinc-800 flex flex-col items-center justify-center space-y-3">
            <BookOpen className="w-8 h-8 text-stone-350" />
            <div className="font-serif italic text-stone-400 text-sm">Belum ada publikasi tulisan opini ilmiah populer terpajang saat ini.</div>
          </div>
        )}
      </div>
    </div>
  );
}
