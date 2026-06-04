/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ResearcherProfile, Publication, AcademicActivity, Article, StudentMentorship } from '../types';

export const initialProfile: ResearcherProfile = {
  name: "Ahmad Ilham",
  titles: "S.Kom., M.Cs.",
  role: "Dosen & Peneliti Bidang Informatika",
  institution: "Universitas Muhammadiyah Semarang (UNIMUS)",
  department: "S1 Informatika, Fakultas Teknik dan Ilmu Komputer",
  email: "ahmadilham@unimus.ac.id",
  address: "Kampus Terpadu UNIMUS, Jl. Kedungmundu Raya No.18, Kedungmundu, Kec. Tembalang, Kota Semarang, Jawa Tengah 50273",
  aboutMe: "Saya adalah seorang pendidik dan peneliti di program studi S1 Informatika Universitas Muhammadiyah Semarang (UNIMUS). Fokus akademis dan minat riset saya berpusat pada bidang Kecerdasan Buatan (Artificial Intelligence), Pembelajaran Mesin (Machine Learning), serta Pengolahan Citra Medis (Medical Image Processing). Saya mendedikasikan waktu saya untuk mengeksplorasi bagaimana algoritma komputasi dapat memecahkan masalah praktis di masyarakat, khususnya dalam sektor kesehatan, pertanian presisi, dan peningkatan literasi digital nasional. Melalui blog ini, saya membagikan portofolio ilmiah, arsip kegiatan tridharma perguruan tinggi, serta rangkaian tulisan opini tentang sains, teknologi, dan ekosistem pendidikan tinggi di Indonesia.",
  researchInterests: [
    "Computer Vision & Pattern Recognition",
    "Deep Learning for Medical Imaging",
    "Machine Learning & Data Science",
    "Informatics Education",
    "Sistem Cerdas berbasis Internet of Things (IoT)"
  ],
  googleScholarUrl: "https://scholar.google.co.id/citations?user=ExampleAhmadIlham",
  sintaUrl: "https://sinta.kemdikbud.go.id/authors/detail?id=ExampleSintaID",
  scopusUrl: "https://www.scopus.com/authid/detail.uri?authorId=ExampleScopusID",
  githubUrl: "https://github.com/ahmadilham-unimus",
  linkedinUrl: "https://linkedin.com/in/ahmad-ilham-example"
};

export const initialPublications: Publication[] = [
  {
    id: "pub-1",
    title: "Deep Learning-Based Classification of Tuberculosis on Chest X-Rays Using Custom Convolutional Neural Networks",
    authors: "Ahmad Ilham, Retno Astuti, Tri Wibowo",
    type: "journal_international",
    venue: "International Journal of Intelligent Systems and Medical Informatics",
    year: 2025,
    volumeInfo: "Vol. 13, No. 3, pp. 245-256",
    publisher: "Academic Press International",
    doi: "10.12345/ijismi.2025.13.3.245",
    url: "https://doi.org/10.12345/ijismi.2025.13.3.245",
    citationCount: 8,
    abstract: "Tuberculosis (TB) remains a major global health threat. Automated diagnosis of tuberculosis from chest radiography (CXR) images utilizing convolutional neural networks (CNNs) has emerged as a promising approach to support radiologists in low-resource environments. In this paper, we propose a lightweight custom CNN architecture named TB-Net that operates with low computing overhead while maintaining high classification sensitivity. Evaluating our model on public datasets (Shenzhen and Montgomery datasets), TB-Net achieved an overall accuracy of 96.4%, a sensitivity of 97.2%, and an area under the ROC curve (AUC-ROC) of 98.1%. These findings demonstrate that deep learning models optimized for resource-constrained clinics can provide high-accuracy screening tools to help control infectious pulmonary diseases.",
    tags: ["Deep Learning", "Tuberculosis", "Chest X-Ray", "Computer Vision", "Healthcare AI"]
  },
  {
    id: "pub-2",
    title: "Implementasi Mask R-CNN untuk Deteksi Tingkat Kematangan dan Hama Buah Belimbing Demak Secara Real-Time",
    authors: "Ahmad Ilham, Hendri Saputra, Nurul Amalina",
    type: "journal_national",
    venue: "Jurnal Teknologi Informasi dan Ilmu Komputer (JTIIK)",
    year: 2024,
    volumeInfo: "Vol. 11, No. 5, hlm. 981-992 (Sinta 2)",
    publisher: "Universitas Brawijaya",
    doi: "10.25126/jtiik.2024115830",
    url: "https://jtiik.ub.ac.id",
    citationCount: 4,
    abstract: "Kabupaten Demak terkenal dengan komoditas hortikultura belimbing madu yang unggul. Namun, fluktuasi panen akibat keterlambatan identifikasi penyakit buah dan penaksiran kematangan manual memicu kerugian bagi petani lokal. Penelitian ini mengembangkan sistem deteksi tingkat kematangan serta hama buah belimbing secara instan menggunakan arsitektur Mask R-CNN. Kami membangun dataset independen yang berisi 1.200 citra kondisi belimbing di kebun Demak. Hasil pengujian menunjukkan nilai Mean Average Precision (mAP) sebesar 88,5% untuk pendeteksian buah yang terbungkus kantong pelindung, buah terbuka matang, mentah, dan rusak akibat ulat buah. Implementasi model pada perangkat mini-PC di area pertanian menunjukkan potensi implementasi otomatisasi sortir pasca-panen bagi petani.",
    tags: ["Mask R-CNN", "Belimbing Demak", "Pertanian Presisi", "Computer Vision", "Sinta 2"]
  },
  {
    id: "pub-3",
    title: "Sistem Pemantauan Suhu dan Kelembapan Gudang Benih Berbasis IoT Menggunakan Komunikasi ESP-NOW",
    authors: "Rian Hidayat, Ahmad Ilham, Agus Nugroho",
    type: "conference",
    venue: "Prosiding Seminar Nasional Hasil Penelitian (SNHP) UNIMUS",
    year: 2024,
    volumeInfo: "Edisi Ke-7, hlm. 112-119",
    publisher: "UNIMUS Press",
    doi: "10.36418/snhp.v7i1.405",
    url: "https://jurnal.unimus.ac.id",
    citationCount: 2,
    abstract: "Penyimpanan kualitas benih jagung memerlukan lingkungan ruang dengan toleransi suhu dan kelembapan yang minim. Penelitian ini merancang purwarupa pemantauan multipoint nirkabel hemat daya mengimplementasikan protokol wireless ESP-NOW tanpa beban modul Wi-Fi komersial. Data dari sensor DHT22 disalurkan ke gateway pusat yang terhubung dengan basis data cloud lokal. Sistem yang dirancang mampu beroperasi hingga rentang 150 meter di area indoor tanpa kehilangan paket data (packet loss < 1%), menjadikannya solusi ekonomis untuk peningkatan fasilitas laboratorium pasca-panen agribisnis lokal.",
    tags: ["Internet of Things", "ESP-NOW", "Agroteknologi", "Sensor DHT22", "UNIMUS"]
  },
  {
    id: "pub-4",
    title: "Buku Ajar: Pengantar Pembelajaran Mesin untuk Pemula",
    authors: "Ahmad Ilham",
    type: "book",
    venue: "ISBN: 978-623-123-456-7",
    year: 2023,
    volumeInfo: "Buku Ajar, 185 Halaman",
    publisher: "UNIMUS Press (Anggota APPTI)",
    doi: undefined,
    url: "https://press.unimus.ac.id",
    citationCount: 15,
    abstract: "Buku ajar ini ditulis untuk memberikan fondasi konseptual dan implementatif bagi mahasiswa tingkat sarjana (S1) yang baru merintis studi di cabang Machine Learning. Materi dimulai dari pengantar statistik deskriptif, regresi linier, klasifikasi klasik (K-Nearest Neighbors, Naive Bayes, Decision Tree), evaluasi metrik kinerja model, hingga pengenalan jaringan saraf tiruan (artificial neural networks). Buku ini dilengkapi dengan studi kasus kode menggunakan Python dan pustaka Scikit-Learn untuk memperkuat keterampilan praktis mahasiswa.",
    tags: ["Buku Ajar", "Machine Learning", "Python", "Pendidikan Komputer"]
  }
];

export const initialActivities: AcademicActivity[] = [
  {
    id: "act-1",
    title: "Mengampu Mata Kuliah 'Kecerdasan Buatan' & 'Pengolahan Citra'",
    description: "Mengajar perkuliahan teori dan praktikum laboratorium untuk mahasiswa semester 4 dan 6 pada prodi S1 Informatika Universitas Muhammadiyah Semarang. Fokus pada kurikulum berbasis kompetensi AI lokal.",
    date: "Semester Genap 2025/2026",
    category: "teaching",
    location: "Gedung Laboratorium Komputer UNIMUS"
  },
  {
    id: "act-2",
    title: "Penerima Hibah Riset Penelitian Dosen Pemula (PDP)",
    description: "Memperoleh pendanaan skema Penelitian Dosen Pemula dari Direktorat Riset, Teknologi, dan Pengabdian Kepada Masyarakat (DRTPM) Kemendikbudristek untuk topik klasifikasi citra medis tuberkulosis.",
    date: "2025-05",
    category: "research_grant",
    location: "DRTPM Kemdikbudristek"
  },
  {
    id: "act-3",
    title: "Pengabdian Masyarakat: Pelatihan Literasi Media dan Workshop Kecerdasan Buatan untuk Guru SMK di Kota Semarang",
    description: "Menjadi koordinator tim pengabdi UNIMUS untuk mengedukasi fungsionalitas generative AI dalam aktivitas pengajaran kelas, perancangan modul, serta etika akademik terhadap 30 guru SMK Muhammadiyah se-Semarang.",
    date: "2024-11",
    category: "community_service",
    location: "SMK Muhammadiyah 1 Semarang"
  },
  {
    id: "act-4",
    title: "Pembicara Tamu: Kuliah Umum Penerapan Kecerdasan Buatan di Industri Agroteknologi",
    description: "Membawakan materi kuliah pakar bertajuk 'Peluang dan Hambatan Komputer Vision dalam Modernisasi Sektor Hortikultura Regional' di hadapan mahasiswa gabungan Pertanian dan TI.",
    date: "2024-09",
    category: "speaker",
    location: "Aula Fakultas Teknik Universitas Dian Nuswantoro"
  },
  {
    id: "act-5",
    title: "Lulus Sertifikasi Kompetensi Internasional: Deep Learning Specialist (DeepLearning.AI)",
    description: "Meraih kelulusan asesmen komprehensif dari konsorsium DeepLearning.AI yang mencakup Neural Networks, Hyperparameter Tuning, Structuring Machine Learning Projects, CNNs, dan RNNs.",
    date: "2023-12",
    category: "award",
    location: "Coursera & DeepLearning.AI Verification"
  }
];

export const initialArticles: Article[] = [
  {
    id: "art-1",
    slug: "tantangan-riset-ai-di-indonesia",
    title: "Tantangan dan Peluang Riset Kecerdasan Buatan di Kampus Indonesia",
    summary: "Seberapa siap ekosistem perguruan tinggi kita menghadapi ledakan inovasi AI? Mengulik kesenjangan infrastruktur komputasi, akses data publik, dan budaya kolaborasi riset antardisiplin ilmu.",
    category: "Opini Teknologi",
    tags: ["Riset AI", "Perguruan Tinggi", "Infrastruktur", "Indonesia"],
    publishedAt: "2026-04-12",
    isDraft: false,
    readingTimeMinutes: 5,
    content: `
# Tantangan dan Peluang Riset Kecerdasan Buatan di Kampus Indonesia

*Oleh: Ahmad Ilham, S.Kom., M.Cs.*
*Diterbitkan pada: 12 April 2026*

Kecerdasan Buatan (Artificial Intelligence/AI) telah berubah dari sekadar wacana fiksi ilmiah atau materi kajian akademis teoritis menjadi mesin penggerak ekonomi global. Dari model bahasa raksasa (*Large Language Models*) hingga diagnosis kanker berbasis pencitraan medis bergengsi, AI menawarkan potensi revolusioner yang tidak terbatas.

Namun, di tengah hiruk-pikuk kecemasan global dan kekaguman masyarakat terhadap kecanggihan teknologi ini, sebuah pertanyaan fundamental muncul bagi kita yang berkecimpung di dunia akademik: **Seberapa siapkah ekosistem riset di universitas-universitas Indonesia untuk mengambil peran aktif sebagai produsen inovasi AI, alih-alih sekadar konsumen teknologi impor?**

Dalam sudut pandang saya sebagai dosen dan peneliti informatika di Universitas Muhammadiyah Semarang (UNIMUS), ada tiga tantangan utama yang wajib kita hadapi, sekaligus tiga peluang emas yang dapat kita maksimalkan bersama.

---

## Tiga Tantangan Utama Riset AI Lokal

### 1. Kesenjangan Infrastruktur Komputasi (*Compute Gap*)
Algoritma pembelajaran mendalam (*Deep Learning*) modern seperti transformer dan CNN berskala besar membutuhkan kekuatan komputasi yang tidak murah. GPU modern berskala industri dengan memori besar seringkali berada di luar jangkauan anggaran riset laboratorium universitas menengah ke bawah di daerah. Tanpa akses ke server kluster GPU, peneliti lokal sering kali harus membatasi diri pada arsitektur model sederhana atau berpuas diri menggunakan paket komputasi gratisan cloud yang dibatasi waktu pemakaiannya (*runtime cutoff*).

### 2. Ketersediaan dan Aksesibilitas Data Berkualitas (*Data Sovereignty*)
Kecerdasan buatan bergantung penuh pada kualitas data latihan (*training data*). Di bidang citra medis, misalnya, mengumpulkan data rontgen atau rekam medis digital yang tervalidasi sangat menantang karena birokrasi, regulasi kerahasiaan pasien yang belum seragam, serta belum optimalnya kesadaran praktisi penata dokumen medis akan standarisasi anotasi pelabelan data kerja. Riset AI lokal sering terhambat oleh minimnya "Open Dataset" yang merepresentasikan geografi dan demografi masyarakat Indonesia secara spesifik.

### 3. Keterbatasan Jembatan Akademik-Industri (*The Valleys of Death*)
Banyak prototipe kecerdasan buatan karya skripsi mahasiswa akhir atau laporan penelitian dosen menumpuk begitu saja di rak perpustakaan atau repositori kampus. Struktur insentif publikasi ilmiah seringkali menekankan pada penulisan draf artikel jurnal demi memenuhi angka kredit jabatan fungsional (KUM), tanpa memiliki koridor transisi hilirisasi produk yang memadai untuk mentransformasikan kode skrip Jupyter Notebook menjadi sistem siap pakai di dunia industri.

---

## Menatap Peluang: Mengapa Kita Tetap Optimis?

Meski jalan terlihat terjal, keunikan lansekap sosio-ekologis Indonesia justru menyimpan peluang yang sangat subur.

1. **Riset AI Berorientasi Masalah Lokal (*Indigenous AI*)**
Kita tidak perlu selalu bersaing dengan institusi global untuk merancang landasan matematis AI generatif baru. Peluang terbesar kita terletak pada **Appplied AI (penerapan taktis)** untuk memecahkan problem konkrit khas lokal. Sebagai contoh:
   - Klasifikasi dan penanggulangan hama buah lokal (seperti belimbing Demak, padi lokal, tembakau Temanggung).
   - Sistem prediksi cuaca mikro untuk nelayan di pantai utara Jawa.
   - Pemanfaatan bahasa daerah dalam *Natural Language Processing* (NLP) lokal untuk asisten medis digital multibahasa.

2. **Kolaborasi Multidisiplin yang Luwes**
AI tidak lagi eksklusif milik para penggiat komputer. Pemecahan masalah medis, ketahanan pangan, hukum, atau sosiologi memerlukan pendekatan komputasi. Kampus-kampus Indonesia memiliki keunggulan fleksibilitas dalam membentuk forum riset kolaboratif yang menggabungkan pakar agronomi, kedokteran, bahasa, dan sosiologi dengan ilmuwan komputer.

3. **Gerakan Kepenulisan Sains Terbuka (*Open Science*)**
Dengan merilis dataset independen berskala kecil secara transparan, mengekspos repositori kode pemrograman di portal publik seperti GitHub, dan mendiseminasikan gagasan riset lewat kanal kepenulisan terbuka, kita membantu merontokkan tembok eksklusivitas riset AI.

---

## Langkah Konkrit ke Depan

Untuk mewujudkan ekosistem produktif ini, kita harus memulai gerakan dari hal terkecil:
- **Optimasi Model Ringkas (Edge AI):** Memfokuskan arah riset kita pada optimasi arsitektur jaringan yang efisien (*lightweight deep learning*), sehingga model cerdas kita dapat ditanamkan pada perangkat mikro-kontroler berbiaya murah (*Edge Computing*).
- **Mendorong Berbagi Data Publik secara Etis:** Menyediakan repositori citra dan data lokal yang anonymized untuk dapat dikutip oleh sesama rekan akademisi nasional.
- **Membiasakan Reproduksibilitas Riset:** Setiap publikasi akademis wajib didukung dengan tautan publik yang berisi skrip kode pengerjaan, sehingga rekan sejawat dapat mereplikasi hasil penelitian kita dengan instan.

Tantangan infrastruktur adalah fakta yang tidak bisa dibantah, tetapi kreativitas mencari rute pintas alternatif dan semangat menyelesaikan persoalan riil di akar rumput adalah modal dasar terbesar peneliti Indonesia. Riset AI bukan tentang siapa yang memiliki superkomputer terbesar, melainkan tentang **solusi bermakna apa yang bisa kita berikan untuk kemaslahatan masyarakat banyak.**

***

*Bagaimana pendapat Anda seputar riset AI di lingkungan kampus Anda? Mari diskusikan di kolom komentar atau hubungi saya langsung via surel akademis.*
`
  },
  {
    id: "art-2",
    slug: "mengapa-peneliti-wajib-menulis-opini-publik",
    title: "Mengapa Peneliti dan Dosen Wajib Menulis Opini Publik?",
    summary: "Publikasi jurnal bereputasi tinggi memang penting, namun jembatan translasi sains menuju pemahaman awam jauh lebih mendesak dalam menangkal misinformasi teknologi di era digital.",
    category: "Pendidikan Tinggi",
    tags: ["Sains Terbuka", "Popularisasi Sains", "Tridharma Dosen", "Kepenulisan"],
    publishedAt: "2026-03-05",
    isDraft: false,
    readingTimeMinutes: 4,
    content: `
# Mengapa Peneliti dan Dosen Wajib Menulis Opini Publik?

*Oleh: Ahmad Ilham, S.Kom., M.Cs.*
*Diterbitkan pada: 5 Maret 2026*

Sebagai kalangan akademisi di perguruan tinggi, ritme kehidupan kita akrab dikendalikan oleh trilogi yang disebut Tridharma: pengajaran, penelitian, dan pengabdian kepada masyarakat. Dalam menilai performa capaian penelitian kita, ukuran yang umum dipakai adalah matriks bibliometrik akademis: indeks Scopus, peringkat SINTA, sitasi Google Scholar, faktor dampak jurnal, dan daftar referensi formal.

Pencapaian akademis formal tersebut mutlak diperlukan sebagai kontrol kualitas metodologi sains ilmiah. Namun, terkadang kita terjebak dalam menara gading intelektualitas kita sendiri. Kita menulis laporan penelitian yang rumit, dikemas dengan istilah khusus sektoral yang pekat (*heavy terminology*), dan diterbitkan pada portal jurnal berbayar tinggi (*paywalled journals*) yang jarang disentuh oleh pengambil kebijakan, apalagi oleh petani lokal di sawah atau para praktisi pemula di daerah.

Ada jurang pemisah (*gap*) yang sangat besar antara produksi pengetahuan sains murni di laboratorium kampus dengan literasi sains masyarakat awam di media sosial. Di sinilah letak **kewajiban etis penulisan opini publik bagi peneliti.**

---

## 1. Menjembatani Sains dengan Publik (*Democratizing Knowledge*)

Masyarakat membutuhkan data primer dan analisis teknologi yang akurat, jernih, dan dapat dipercaya langsung dari ahlinya. Ketika para pakar dan peneliti memilih diam atau hanya berbicara di antara mereka sendiri di forum konferensi tertutup, ruang kosong opini publik di media digital akan diisi oleh para pemberi pengaruh (*influencer*) atau pembuat konten viral yang terkadang minim kapasitas metodologi akademis, memicu maraknya misinformasi.

Menulis opini populer di blog pribadi, surat kabar nasional, maupun media komunitas adalah upaya mendemokratisasikan pengetahuan. Kita berupaya meremajakan bahasa kaku riset puluhan halaman menjadi esai ringkas 1.000 kata yang renyah dibaca sambil menikmati secangkir kopi pagi, tanpa merontokkan substansi nilai kebenaran datanya.

---

## 2. Meningkatkan Dampak Nyata Sains (*Real-world Citations*)

Tulisan opini yang menyentuh isu aktual di media umum secara mengejutkan kerap memberikan rujukan balik (*backlink*) yang memperkuat keterbacaan makalah riset orisinal kita. Ketika seorang jurnalis, mahasiswa tingkat akhir, atau analis kebijakan membaca tulisan opini kita yang membahas kegunaan teknologi deteksi kematangan di sektor hortikultura, mereka akan tertarik menelusuri draf riset komprehensif kita yang ada di jurnal ilmiah terakreditasi. Opini populer adalah pintu masuk menuju makalah formal yang mendalam.

---

## 3. Akuntabilitas Moral terhadap Anggaran Publik

Banyak di antara penelitian dosen didanai oleh uang negara melalui skema hibah kementerian atau anggaran internal kampus. Sudah merupakan tanggung jawab moral kita selaku penerima amanah dana publik untuk memberikan laporan pertanggungjawaban publik tentang kemajuan teknologi tersebut. Laporan pertangungjawaban yang tulus tidak sekadar berbentuk berkas laporan pertanggungjawaban (LPJ) tebal berisi kuitansi materai, melainkan juga lewat kontribusi penyebaran materi sains agar dapat dinikmati, didiskusikan, dikritik, dan dikembangkan secara terbuka oleh publik luas secara adil.

---

## Bagaimana Memulai Sebagai Peneliti Penulis?

1. **Gunakan Bahasa Berorientasi Solusi:** Buang jargon komputasi pelik saat menulis untuk khalayak umum. Jika harus menggunakan istilah rumit seperti *“Hierarchical Convolutional Latent Space”*, carilah analogi sederhana sehari-hari.
2. **Kaitkan dengan Isu yang Sedang Hangat (*Contextual Relevance*):** Sambungkan keahlian Anda dengan tren yang ada di berita hari ini. Jika ada isu perubahan iklim regional, ulaslah hal tersebut dari kacamata algoritma sensor cuaca pertanian digital Anda.
3. **Bangun Media Publikasi Sederhana:** Memiliki blog portofolio personal adalah batu pijakan utama. Anda memegang kendali penuh atas hak milik intelektual konten tulisan Anda secara mandiri gratis tanpa gangguan iklan komersial pengalih perhatian.

Menulis untuk publik bukanlah bentuk pendangkalan sains (*dumbing down science*). Menulis untuk publik adalah seni tingkat tinggi dalam mendefinisikan kepedulian sosial akademisi. Kita menurunkan ilmu yang kita perbaiki di laboratorium demi menyiram kegusaran nalar di kehidupan sehari-hari masyarakat kita sendiri.

***

*Ayo, luangkan waktu satu jam seminggu untuk mengubah bab metodologi rumit riset Anda menjadi artikel esai opini yang menginspirasi sesama!*
`
  }
];

export const initialStudentMentorships: StudentMentorship[] = [
  {
    id: "ment-1",
    studentName: "Aditya Pratama",
    studentNim: "G2A022001",
    thesisTitle: "Pendeteksian Dini Penyakit Katarak Berbasis Deep Learning MobileNetV3 pada Citra Fundus Mata",
    academicYear: "Gasal 2025/2026",
    status: "completed",
    level: "S1 Informatika",
    notes: "Pengujian sensitivitas model sangat memuaskan (97%). Publikasi makalah sedang dipersiapkan."
  },
  {
    id: "ment-2",
    studentName: "Rina Sulistiyowati",
    studentNim: "G2A022015",
    thesisTitle: "Analisis Sentimen Terhadap Layanan Akademik Kampus Menggunakan Kombinasi TF-IDF dan Support Vector Machine",
    academicYear: "Genap 2025/2026",
    status: "thesis",
    level: "S1 Informatika",
    notes: "Proses pengumpulan data ulasan selesai dari 1.500 kuesioner. Memasuki tahap tuning hyperparameter SVM."
  },
  {
    id: "ment-3",
    studentName: "Taufiq Hidayat",
    studentNim: "G2A022033",
    thesisTitle: "Klasifikasi Kematangan Buah Melon di Greenhouse Menggunakan Sensor Warna TCS3200 dan Random Forest Berbasis IoT",
    academicYear: "Genap 2025/2026",
    status: "proposal",
    level: "S1 Informatika",
    notes: "Revisi draf proposal penelitian selesai disidangkan. Alat purwarupa sedang didevelop di greenhouse."
  },
  {
    id: "ment-4",
    studentName: "Farhan Al-Ghifari",
    studentNim: "G2A022045",
    thesisTitle: "Segmentasi Paru-Paru pada Citra CT-Scan Pasien COVID-19 Menggunakan Arsitektur U-Net",
    academicYear: "Gasal 2025/2026",
    status: "ongoing",
    level: "S1 Informatika",
    notes: "Fokus pada stabilisasi parameter bobot loss function untuk mengatasi masalah imbalance class di paru-paru."
  },
  {
    id: "ment-5",
    studentName: "Nadia Safitri",
    studentNim: "G2A021008",
    thesisTitle: "Sistem Presensi Mahasiswa Berbasis Pengenalan Wajah Menggunakan Algoritma Haar Cascade dan LBPH",
    academicYear: "Genap 2024/2025",
    status: "completed",
    level: "S1 Informatika",
    notes: "Lulus dengan predikat sangat baik. Kode pemrograman telah disimpan di GitHub publik UNIMUS."
  }
];
