
import type { ResumeData } from './types';

export const initialData: ResumeData = {
  personal: {
    name: "Fadel Muhamad Rifai",
    role: "Web Developer",
    email: "faaadelmr@gmail.com",
    phone: "085156630686",
    location: "Tangerang, Indonesia",
    website: "faaadelmr.dev",
    photo: "https://media.licdn.com/dms/image/v2/D5603AQE3XjaZj8ufbA/profile-displayphoto-scale_400_400/B56Z9trFHsIoAk-/0/1784251438404?e=1785974400&v=beta&t=WgSmm-FAVQUiRAwMVa9X-IoRfMF_7pyEWk1HWOhWwg4",
    description: "Manusia yang entusias dengan website, game, pc dan teknologi lainnya. Suka mempelajari teknologi baru serta membuat sesuatu yang mempermudah pekerjaan ataupun kegiatan yang saya lakukan. I use ai btw",
  },
  experience: [
    {
      id: "exp1",
      company: "ISOmedik",
      role: "IT Junior",
      date: "Feb 2026 - Sekarang",
      description: `- Membuat syntax pemrograman SQL untuk mendukung kebutuhan IT operasional.
- Membuat dashboard dari data report untuk visualisasi data internal.
- Mempelajari teknologi VB.net untuk membantu pemeliharaan sistem pendukung.`,
    },
    {
      id: "exp2",
      company: "ISOmedik",
      role: "Finance Reconcile",
      date: "Okt 2025 - Feb 2026",
      description: `- Melakukan rekonsiliasi data rumah sakit (RS) dengan data transaksi internal perusahaan.
- Mengidentifikasi selisih data dan memastikan keselarasan laporan keuangan medis.`,
    },
    {
      id: "exp3",
      company: "ISOmedik",
      role: "Administration Claim",
      date: "Nov 2023 - Okt 2025",
      description: `- Mengelola proses klaim peserta mulai dari input data awal, pemindaian dokumen, hingga penyimpanan data.
- Menjaga ketertiban administrasi dan integritas berkas data klaim masuk.`,
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "Universitas Dian Nusantara",
      degree: "S.Kom, Ilmu Komputer",
      date: "2022 - Sekarang",
      description: "",
    },
  ],
  projects: [
    {
      id: 'proj1',
      name: 'PDF-adel',
      description: 'Cybernetic PDF toolkit. PDF manipulasi berbasis web untuk memotong, menggabungkan, memutar, menghapus, dan mengatur halaman PDF secara instan langsung di browser tanpa server upload, full local.',
      technologies: 'HTML, JavaScript, Tailwind CSS, PDF-lib',
      link: 'pdf-adel.pages.dev'
    },
    {
      id: 'proj2',
      name: 'BabynumTime',
      description: 'Web app tracker tumbuh kembang bayi untuk mencatat waktu menyusui/minum, penggantian popok, volume ASI ibu, waktu pompa ASI (pumping), serta dilengkapi dengan analisis AI untuk mendeteksi kesehatan BAB bayi.',
      technologies: 'React, Next.js, TypeScript, Tailwind CSS',
      link: 'babynum.vercel.app'
    }
  ],
  skills: "SQL, VB.Net, AI-assisted Coding, Dashboard & Data Visualization, Advanced Excel, Data Reconciliation, Administrasi Klaim",
};
