import type { Language } from './types';

export type TranslationKey =
    // Section Headers (Resume Preview & Templates)
    | 'profile'
    | 'about'
    | 'summary'
    | 'experience'
    | 'education'
    | 'skills'
    | 'projects'
    | 'contact'
    | 'workHistory'
    | 'expertise'
    | 'portfolio'
    // Navigation & Tabs
    | 'appDescription'
    | 'aiReWrite'
    | 'content'
    | 'style'
    // Editor Form Sections
    | 'personalDetails'
    | 'workExperience'
    | 'projectsSection'
    | 'skillsSection'
    // Form Labels
    | 'profilePhoto'
    | 'changePicture'
    | 'removePicture'
    | 'fullName'
    | 'jobTitleRole'
    | 'emailAddress'
    | 'phoneNumber'
    | 'locationCityCountry'
    | 'websitePortfolio'
    | 'professionalSummary'
    | 'company'
    | 'jobRole'
    | 'datePeriod'
    | 'description'
    | 'institution'
    | 'degreeField'
    | 'projectName'
    | 'technologiesUsed'
    | 'projectUrl'
    | 'skillsCommaSeparated'
    // Form Buttons & Actions
    | 'addExperience'
    | 'removeExperience'
    | 'addEducation'
    | 'removeEducation'
    | 'addProject'
    | 'removeProject'
    // Style Panel
    | 'textColor'
    | 'backgroundColor'
    | 'accentColor'
    | 'fontFamily'
    | 'selectPresetFont'
    | 'customFontInputLabel'
    | 'fontNotFoundWarning'
    | 'template'
    // AI Assist Panel
    | 'aiReWriteTitle'
    | 'aiReWriteDescription'
    | 'selectAiModel'
    | 'uploadCvFile'
    | 'reWriteWithAi'
    | 'analyzingProcessing'
    | 'formatNotSupportedTitle'
    | 'formatNotSupportedDesc'
    | 'aiSuccessTitle'
    | 'aiSuccessDesc'
    // PDF Preview & Download Panel
    | 'downloadPdf'
    | 'generatingPdf'
    | 'loadingPreview'
    | 'previewNotice'
    | 'paperNotice'
    // Resign Builder Translations
    | 'resignBuilderTitle'
    | 'resignBuilderDesc'
    | 'resignBannerTitle'
    | 'resignBannerDesc'
    | 'senderInfo'
    | 'recipientInfo'
    | 'resignDatesAndReason'
    | 'recipientName'
    | 'recipientRole'
    | 'companyName'
    | 'letterCity'
    | 'letterDate'
    | 'locationDate'
    | 'lastWorkingDay'
    | 'reasonLabel'
    | 'reasonPlaceholder'
    | 'closingMessageLabel'
    | 'closingMessagePlaceholder'
    | 'printDownloadResignPdf'
    | 'resignPreviewNotice'
    | 'dearSalutation'
    | 'subjectResign'
    | 'salutation'
    | 'resignParagraph1'
    | 'resignParagraph1Mid'
    | 'resignParagraph1At'
    | 'resignParagraph1End'
    | 'resignParagraph2Prefix'
    | 'resignParagraph3Default'
    | 'resignParagraph4'
    | 'sincerely';

type Translations = {
    [key in Language]: {
        [k in TranslationKey]: string;
    };
};

export const translations: Translations = {
    en: {
        // Section Headers
        profile: 'Profile',
        about: 'About',
        summary: 'Summary',
        experience: 'Experience',
        education: 'Education',
        skills: 'Skills',
        projects: 'Projects',
        contact: 'Contact',
        workHistory: 'Work History',
        expertise: 'Expertise',
        portfolio: 'Portfolio',
        // Navigation & Tabs
        appDescription: 'Resume builder with AI Rewriter',
        aiReWrite: 'AI Re-Write',
        content: 'Content',
        style: 'Style',
        // Editor Form Sections
        personalDetails: 'Personal Details',
        workExperience: 'Work Experience',
        projectsSection: 'Projects',
        skillsSection: 'Skills',
        // Form Labels
        profilePhoto: 'Profile Photo',
        changePicture: 'Change Picture',
        removePicture: 'Remove Picture',
        fullName: 'Full Name',
        jobTitleRole: 'Job Title / Role',
        emailAddress: 'Email Address',
        phoneNumber: 'Phone Number',
        locationCityCountry: 'Location (City, Country)',
        websitePortfolio: 'Website / Portfolio URL',
        professionalSummary: 'Professional Summary',
        company: 'Company',
        jobRole: 'Job Role',
        datePeriod: 'Date / Period',
        description: 'Description',
        institution: 'School / University',
        degreeField: 'Degree / Field of Study',
        projectName: 'Project Name',
        technologiesUsed: 'Technologies Used',
        projectUrl: 'Project Link / URL',
        skillsCommaSeparated: 'Skills (comma separated)',
        // Form Buttons & Actions
        addExperience: 'Add Experience',
        removeExperience: 'Remove Experience',
        addEducation: 'Add Education',
        removeEducation: 'Remove Education',
        addProject: 'Add Project',
        removeProject: 'Remove Project',
        // Style Panel
        textColor: 'Text Color',
        backgroundColor: 'Background Color',
        accentColor: 'Accent Color',
        fontFamily: 'Font',
        selectPresetFont: 'Select a preset font family',
        customFontInputLabel: 'Paste custom Google Font name',
        fontNotFoundWarning: 'Font not found',
        template: 'Template',
        // AI Assist Panel
        aiReWriteTitle: 'AI Resume Scanner & Re-Write',
        aiReWriteDescription: 'Upload your current resume (PDF/Image) to extract information into Lunga editor instantly using AI.',
        selectAiModel: 'Select AI Model',
        uploadCvFile: 'Upload CV (PDF or Image)',
        reWriteWithAi: 'Re-Write with AI',
        analyzingProcessing: 'Analyzing...',
        formatNotSupportedTitle: 'File Format Not Supported',
        formatNotSupportedDesc: 'Supported formats: PDF, PNG, JPG/JPEG, WEBP, BMP, and PNM.',
        aiSuccessTitle: 'Success!',
        aiSuccessDesc: 'Resume analyzed successfully. Your CV has been updated.',
        // PDF Preview & Download Panel
        downloadPdf: 'Download PDF',
        generatingPdf: 'Generating PDF...',
        loadingPreview: 'Loading Preview...',
        previewNotice: 'Your resume preview is shown above. Click "Download PDF" to save a print-ready version.',
        paperNotice: 'For best results, use standard A4 paper when printing your resume.',
        // Resign Builder Translations
        resignBuilderTitle: 'Lunga Resign Builder',
        resignBuilderDesc: 'Create a Resignation Letter',
        resignBannerTitle: 'Think Twice.. Finding a Job These Days is Tough! ⚠️',
        resignBannerDesc: 'Before resigning, take a moment to reflect. Remember your financial commitments, the smiles of your family at home, and the people around you. Stay strong and keep fighting! Because after hardship comes ease. If your decision is truly final, proceed to draft your resignation letter.',
        senderInfo: 'Your Details (Sender)',
        recipientInfo: 'Manager & Company Details',
        resignDatesAndReason: 'Date & Reason for Resignation',
        recipientName: 'Manager / HRD Name',
        recipientRole: 'Recipient Title / Role',
        companyName: 'Company Name',
        letterCity: 'City / Location',
        letterDate: 'Letter Date',
        locationDate: 'City & Date',
        lastWorkingDay: 'Last Working Day',
        reasonLabel: 'Primary Reason for Leaving',
        reasonPlaceholder: 'Select resignation reason...',
        closingMessageLabel: 'Appreciation & Farewell Message',
        closingMessagePlaceholder: 'Write your appreciation message or additional notes to the company...',
        printDownloadResignPdf: 'Print / Download Resign Letter PDF',
        resignPreviewNotice: 'Resignation Letter Preview',
        dearSalutation: 'To:',
        subjectResign: 'Subject: Resignation Letter',
        salutation: 'Dear Sir/Madam,',
        resignParagraph1: 'Through this letter, I,',
        resignParagraph1Mid: 'currently serving as',
        resignParagraph1At: 'at',
        resignParagraph1End: 'would like to submit my formal resignation from this position. My last working day will be on',
        resignParagraph2Prefix: 'The primary reason for my resignation is to',
        resignParagraph3Default: 'I express my sincere gratitude for the guidance, trust, and incredible opportunities provided to me during my tenure with the company.',
        resignParagraph4: 'I remain committed to maintaining professionalism and ensuring a smooth transition and handover process until my last day. Thank you for your understanding and support.',
        sincerely: 'Sincerely,',
    },
    id: {
        // Section Headers
        profile: 'Profil',
        about: 'Tentang',
        summary: 'Ringkasan',
        experience: 'Pengalaman',
        education: 'Pendidikan',
        skills: 'Keahlian',
        projects: 'Proyek',
        contact: 'Kontak',
        workHistory: 'Riwayat Kerja',
        expertise: 'Keahlian',
        portfolio: 'Portofolio',
        // Navigation & Tabs
        appDescription: 'Pembuat resume dengan Penulis Ulang AI',
        aiReWrite: 'AI Re-Write',
        content: 'Konten',
        style: 'Gaya',
        // Editor Form Sections
        personalDetails: 'Data Diri',
        workExperience: 'Pengalaman Kerja',
        projectsSection: 'Proyek',
        skillsSection: 'Keahlian',
        // Form Labels
        profilePhoto: 'Foto Profil',
        changePicture: 'Ubah Foto',
        removePicture: 'Hapus Foto',
        fullName: 'Nama Lengkap',
        jobTitleRole: 'Judul Pekerjaan / Peran',
        emailAddress: 'Alamat Email',
        phoneNumber: 'Nomor Telepon',
        locationCityCountry: 'Lokasi (Kota, Negara)',
        websitePortfolio: 'Situs Web / Portofolio',
        professionalSummary: 'Ringkasan Profesional',
        company: 'Perusahaan',
        jobRole: 'Peran / Jabatan',
        datePeriod: 'Tanggal / Periode',
        description: 'Deskripsi',
        institution: 'Sekolah / Universitas',
        degreeField: 'Gelar / Bidang Studi',
        projectName: 'Nama Proyek',
        technologiesUsed: 'Teknologi yang Digunakan',
        projectUrl: 'Tautan / URL Proyek',
        skillsCommaSeparated: 'Keahlian (dipisahkan koma)',
        // Form Buttons & Actions
        addExperience: 'Tambah Pengalaman',
        removeExperience: 'Hapus Pengalaman',
        addEducation: 'Tambah Pendidikan',
        removeEducation: 'Hapus Pendidikan',
        addProject: 'Tambah Proyek',
        removeProject: 'Hapus Proyek',
        // Style Panel
        textColor: 'Warna Teks',
        backgroundColor: 'Warna Latar',
        accentColor: 'Warna Aksen',
        fontFamily: 'Jenis Huruf',
        selectPresetFont: 'Pilih jenis huruf bawaan',
        customFontInputLabel: 'Tempel nama Google Font kustom',
        fontNotFoundWarning: 'Font tidak ditemukan',
        template: 'Templat',
        // AI Assist Panel
        aiReWriteTitle: 'AI Pemindai & Penulis Ulang Resume',
        aiReWriteDescription: 'Unggah resume Anda saat ini (PDF/Gambar) untuk mengekstrak informasi ke editor Lunga secara instan menggunakan AI.',
        selectAiModel: 'Pilih Model AI',
        uploadCvFile: 'Unggah CV (PDF atau Gambar)',
        reWriteWithAi: 'Tulis Ulang dengan AI',
        analyzingProcessing: 'Menganalisis...',
        formatNotSupportedTitle: 'Format Berkas Tidak Didukung',
        formatNotSupportedDesc: 'Format yang didukung: PDF, PNG, JPG/JPEG, WEBP, BMP, dan PNM.',
        aiSuccessTitle: 'Berhasil!',
        aiSuccessDesc: 'Resume berhasil dianalisis. CV Anda telah diperbarui.',
        // PDF Preview & Download Panel
        downloadPdf: 'Unduh PDF',
        generatingPdf: 'Membuat PDF...',
        loadingPreview: 'Memuat Pratinjau...',
        previewNotice: 'Pratinjau CV Anda ditampilkan di atas. Klik "Unduh PDF" untuk menyimpan versi siap cetak.',
        paperNotice: 'Untuk hasil terbaik, gunakan kertas A4 standar saat mencetak CV Anda.',
        // Resign Builder Translations
        resignBuilderTitle: 'Lunga Resign Builder',
        resignBuilderDesc: 'Buat Surat Pengunduran Diri',
        resignBannerTitle: 'Pikir-Pikir Lagi.. Jadi WNI Sekarang Cari Kerja Itu Susah! ⚠️',
        resignBannerDesc: 'Sebelum resign, coba renungkan baik-baik. Ingat cicilan, ingat senyum keluarga di rumah, dan orang-orang sekitar. Tetap semangat bertahan! Karena dibalik kesusahan maka ada kemudahan. Kalau keputusanmu sudah benar-benar bulat, baru lanjutkan buat surat resign nya.',
        senderInfo: 'Identitas Anda (Pengirim)',
        recipientInfo: 'Atasan & Perusahaan',
        resignDatesAndReason: 'Tanggal & Alasan Resign',
        recipientName: 'Nama Atasan / HRD',
        recipientRole: 'Jabatan Penerima',
        companyName: 'Nama Perusahaan',
        letterCity: 'Kota Surat',
        letterDate: 'Tanggal Surat',
        locationDate: 'Kota & Tanggal Surat',
        lastWorkingDay: 'Hari Terakhir Bekerja (Last Working Day)',
        reasonLabel: 'Alasan Utama Resign',
        reasonPlaceholder: 'Pilih alasan resign...',
        closingMessageLabel: 'Pesan Ucapan Terima Kasih & Penutup',
        closingMessagePlaceholder: 'Tuliskan ucapan terima kasih atau pesan tambahan untuk perusahaan...',
        printDownloadResignPdf: 'Cetak / Unduh PDF Surat Resign',
        resignPreviewNotice: 'Pratinjau Surat Resign',
        dearSalutation: 'Kepada Yth.',
        subjectResign: 'Perihal: Surat Pengunduran Diri (Resign)',
        salutation: 'Dengan hormat,',
        resignParagraph1: 'Melalui surat ini, saya',
        resignParagraph1Mid: 'yang saat ini menjabat sebagai',
        resignParagraph1At: 'di',
        resignParagraph1End: 'bermaksud untuk mengajukan pengunduran diri dari posisi dan jabatan tersebut. Hari terakhir saya bekerja secara efektif adalah pada tanggal',
        resignParagraph2Prefix: 'Adapun alasan pengunduran diri saya ini adalah untuk',
        resignParagraph3Default: 'Saya mengucapkan terima kasih yang sebesar-besarnya atas bimbingan, kepercayaan, serta kesempatan luar biasa yang telah diberikan kepada saya selama bergabung dan berkembang bersama tim perusahaan.',
        resignParagraph4: 'Saya berkomitmen untuk tetap menjaga profesionalisme dan siap membimbing proses serah terima pekerjaan (handover) hingga tanggal efektif pengunduran diri saya. Demikian surat pengunduran diri ini saya buat dengan penuh kesadaran dan tanpa paksaan dari pihak manapun.',
        sincerely: 'Hormat saya,',
    },
};

export function t(language: Language, key: TranslationKey): string {
    return translations[language]?.[key] ?? translations['en'][key] ?? key;
}

