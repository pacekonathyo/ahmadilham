/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Copy, Check, Github, Terminal, Globe, HelpCircle } from 'lucide-react';

export default function GithubPagesGuide() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: "1. Siapkan Repositori di GitHub",
      content: "Buat repositori baru di akun GitHub Anda:\n- Masuk ke GitHub, klik 'New Repository'\n- Beri nama repositori, misalkan: 'ahmadilham' atau 'ahmadilham.github.io'\n- Atur tipe sebagai 'Public' (Penting agar dapat diakses publik oleh GitHub Pages)\n- Jangan centang README, .gitignore, atau Lisensi agar repositori tetap bersih sejak awal.",
      cmd: ""
    },
    {
      title: "2. Tambahkan Paket gh-pages ke Proyek Anda",
      content: "Paket 'gh-pages' digunakan untuk menyusun draf rilis ke cabang 'gh-pages' secara otomatis di repositori GitHub.",
      cmd: "npm install gh-pages --save-dev"
    },
    {
      title: "3. Konfigurasi package.json",
      content: "Buka file 'package.json' di komputer Anda, lalu sisipkan kunci 'homepage' di bagian paling atas (sejajar dengan 'name') serta skrip deploy di dalam objek 'scripts':\n\n- Tentukan alamat beranda:\n  \"homepage\": \"https://<username-github>.github.io/<nama-repo>\"\n  (Contoh jika nama user 'ahmadilham-unimus' dan repo 'portofolio-riset'):\n  \"homepage\": \"https://ahmadilham-unimus.github.io/portofolio-riset\"\n\n- Sisipkan pre-deploy & deploy di scripts:\n  \"scripts\": {\n    \"predeploy\": \"npm run build\",\n    \"deploy\": \"gh-pages -d dist\"\n  }",
      cmd: `"homepage": "https://ahmadilham-unimus.github.io/portofolio-riset",\n"scripts": {\n  "predeploy": "npm run build",\n  "deploy": "gh-pages -d dist"\n}`
    },
    {
      title: "4. Jalankan Perintah Deploy",
      content: "Buka jendela terminal Anda di folder proyek ini, jalankan perintah git berikut untuk merekatkan remote URL GitHub serta mendorong rilis static ke internet secara instan:",
      cmd: "git init\ngit add .\ngit commit -m \"Inisialisasi Blog Ahmad Ilham\"\ngit remote add origin https://github.com/<username-github>/<nama-repo>.git\ngit branch -M main\nnpm run deploy"
    },
    {
      title: "5. Aktifkan Fitur Pages di Dasbor GitHub",
      content: "Setelah perintah selesai, masuk ke repositori Anda di situs GitHub:\n- Klik tab 'Settings' di bagian atas\n- Pilih menu 'Pages' di sidebar kiri\n- Di bagian 'Build and deployment', pastikan 'Source' diatur ke 'Deploy from a branch'\n- Atur 'Branch' ke 'gh-pages' dan direktori ke '/ (root)'\n- Klik Save. Selamat! Situs web akademis Anda akan online berkala dalam 1-2 menit.",
      cmd: ""
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Guide Header */}
      <div className="space-y-2 border-b border-[#e1dbd0] dark:border-zinc-850 pb-5">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Github className="w-7 h-7 text-[#1c2a44] rounded-none shrink-0" />
          Panduan Publikasi & Hosting GitHub Pages
        </h2>
        <p className="text-sm md:text-base text-slate-500 leading-relaxed font-serif text-justify">
          Arsitektur blog ini dirancang sepenuhnya di sisi klien (*client-side-only*). Hal ini membuat seluruh muatan portofolio riset dan artikel Markdown Anda **100% kompatibel dan gratis untuk dihosting di layanan GitHub Pages**.
        </p>
      </div>

      {/* Info Warning Bar */}
      <div className="p-5 rounded-none bg-stone-100/60 dark:bg-zinc-900/50 border border-[#e1dbd0] dark:border-zinc-800 flex items-start gap-4">
        <HelpCircle className="w-5 h-5 text-[#800020] dark:text-red-300 shrink-0 mt-0.5" />
        <div className="text-xs md:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-serif text-justify">
          <span className="font-bold text-slate-950 dark:text-white">Tips Penting Backup Data:</span> Setiap draf tulisan atau makalah yang Anda utak-atik di panel CMS tersimpan di memori browser lokal (*localStorage*). Sebelum mengunduh kode atau mematikan tab browser, pastikan Anda masuk ke tab <span className="font-bold text-[#800020] dark:text-red-305 underline">CMS Administrator → Backup & Pemulihan</span> untuk mengekspor berkas <code className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 font-mono text-xs rounded-none border border-[#e1dbd0] dark:border-zinc-700">backup_blog.json</code> agar dapat diimpor kembali dengan mudah.
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#12141c] p-6 rounded-none border border-[#e1dbd0] dark:border-zinc-800 space-y-4 shadow-2xs"
          >
            {/* Header Title with Badge Number */}
            <h3 className="text-base md:text-lg font-serif font-bold text-slate-950 dark:text-white flex items-center gap-3">
              <span className="w-7 h-7 rounded-none bg-[#1c2a44] text-white font-mono flex items-center justify-center text-xs font-bold border border-[#1c2a44] shrink-0">
                0{idx + 1}
              </span>
              {step.title}
            </h3>

            {/* Step text content description */}
            <div className="p-1 text-sm font-serif text-slate-600 dark:text-zinc-305 leading-relaxed space-y-2 whitespace-pre-wrap text-justify">
              {step.content}
            </div>

            {/* Code Box Command if available */}
            {step.cmd && (
              <div className="relative rounded-none overflow-hidden border border-[#e1dbd0] dark:border-zinc-800 bg-[#0c0e12] text-slate-350 font-mono text-xs md:text-sm leading-relaxed mt-2 p-1">
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#12141c] border-b border-[#e1dbd0]/40 dark:border-zinc-800 text-slate-400 text-2xs select-none">
                  <span className="flex items-center gap-1 font-bold">
                    <Terminal className="w-3.5 h-3.5" />
                    SALINAN TERMINAL / PERINTAH
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(step.cmd, idx)}
                    className="p-1 rounded-none bg-stone-900/50 hover:bg-stone-900 border border-stone-800 text-slate-400 hover:text-white transition-all flex items-center gap-1 cursor-pointer font-bold font-mono text-[10px]"
                    title="Salin Perintah"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">TERCOPY</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>COPY CMD</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto select-all max-h-[300px] text-zinc-300">
                  <code>{step.cmd}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Static Footer */}
      <div className="text-center py-6 border-t border-[#e1dbd0] dark:border-zinc-850">
        <p className="text-xs text-slate-400 font-mono flex items-center justify-center gap-1">
          <Globe className="w-3.5 h-3.5" />
          Situs portofolio • Hak Cipta Akademis © Ahmad Ilham S.Kom., M.Cs. • Universitas Muhammadiyah Semarang
        </p>
      </div>
    </div>
  );
}
