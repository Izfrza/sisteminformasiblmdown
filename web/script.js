// Data storage (in a real application, this would be a database)
let newsData = JSON.parse(localStorage.getItem('schoolNews')) || [
    {
        id: 1,
        title: "Penerimaan Peserta Didik Baru Tahun 2023",
        content: "SMA Negeri 1 Maju Jaya membuka pendaftaran untuk peserta didik baru tahun ajaran 2023/2024. Pendaftaran dibuka dari tanggal 1 Maret hingga 30 April 2023. Kami menyediakan jalur prestasi, jalur zonasi, dan jalur afirmasi. Segera daftarkan diri Anda dan raih masa depan cerah bersama kami!",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: "2023-02-15",
        status: "published"
    },
    {
        id: 2,
        title: "Siswa SMA Negeri 1 Maju Jaya Juara Olimpiade Matematika",
        content: "Siswa kami, Ahmad Fauzi, berhasil meraih medali emas dalam Olimpiade Matematika Tingkat Nasional yang diselenggarakan di Jakarta. Ini adalah tahun ketiga berturut-turut sekolah kita memenangkan medali emas. Selamat kepada Ahmad dan tim pembimbing!",
        image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: "2023-02-10",
        status: "published"
    },
    {
        id: 3,
        title: "Kunjungan Studi Banding dari Sekolah Tetangga",
        content: "SMA 1 Maju Jaya menerima kunjungan studi banding dari delegasi SMA Harapan Bangsa. Mereka sangat tertarik dengan program unggulan di bidang robotika dan tata kelola perpustakaan digital kami. Kami berbagi pengalaman terbaik dalam mengelola sekolah berbasis teknologi.",
        image: "https://images.unsplash.com/photo-1560785477-d435f29f041d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: "2023-02-01",
        status: "published"
    }
];

let galleryData = JSON.parse(localStorage.getItem('schoolGallery')) || [
    {
        id: 1,
        title: "Kegiatan Upacara Bendera",
        image: "https://images.unsplash.com/photo-1588072432836-100b94eb52c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: "2023-02-17"
    },
    {
        id: 2,
        title: "Praktikum Kimia Kelas XI",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: "2023-02-15"
    },
    {
        id: 3,
        title: "Kegiatan Ekstrakurikuler Pramuka",
        image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: "2023-02-12"
    },
    {
        id: 4,
        title: "Perayaan Hari Kemerdekaan",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: "2023-02-08"
    }
];

// DATA PENGATURAN BARU
let settingsData = JSON.parse(localStorage.getItem('schoolSettings')) || {
    name: "SMA Negeri 1 Maju Jaya",
    address: "Jl. Pendidikan No. 123, Kelurahan Maju Jaya, Kecamatan Cerdas, Kota Pintar",
    phone: "(021) 1234-5678",
    email: "info@sman1majujaya.sch.id",
    vision: "Menjadi sekolah unggulan yang menghasilkan lulusan berkarakter, berprestasi, dan mampu bersaing di era global.",
    mission: "Menyelenggarakan pendidikan yang berkualitas dan berkarakter\nMengembangkan potensi peserta didik secara optimal\nMendorong inovasi dalam pembelajaran\nMenjalin kerjasama dengan masyarakat dan dunia usaha",
    totalStudents: 1250, 
};

// BARU: Data Guru
let teachersData = JSON.parse(localStorage.getItem('schoolTeachers')) || [
    { id: 1, name: "Dr. Budi Santoso, M.Pd.", subject: "Kepala Sekolah" },
    { id: 2, name: "Ibu Rita Wati, S.Si.", subject: "Kimia" },
    { id: 3, name: "Bapak Taufik Hidayat, S.Pd.", subject: "Bahasa Inggris" },
    { id: 4, name: "Ibu Nurul Aini, S.Hum.", subject: "Sejarah" },
    { id: 5, name: "Bapak Chandra Wijaya, S.Kom.", subject: "Informatika" },
];

let isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
let resetCode = null;

// Helper Functions
function saveNewsData() {
    localStorage.setItem('schoolNews', JSON.stringify(newsData));
}

function saveGalleryData() {
    localStorage.setItem('schoolGallery', JSON.stringify(galleryData));
}

function saveSettingsData() {
    localStorage.setItem('schoolSettings', JSON.stringify(settingsData));
}

function saveTeachersData() {
    localStorage.setItem('schoolTeachers', JSON.stringify(teachersData));
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

function showAlert(message, type = 'info') {
    // Implementasi sederhana alert. Di lingkungan nyata gunakan Toast atau sejenisnya.
    alert(`${type.toUpperCase()}: ${message}`);
}

// FUNGSI PENTING #1: Load Stats untuk Frontend & Modal Guru
function loadSchoolStats() {
    teachersData = JSON.parse(localStorage.getItem('schoolTeachers')) || [];
    settingsData = JSON.parse(localStorage.getItem('schoolSettings')) || { totalStudents: 0 };
    
    // Load Total Siswa
    const totalSiswaElement = document.getElementById('total-siswa');
    if (totalSiswaElement) {
        totalSiswaElement.textContent = `${settingsData.totalStudents || 0} Siswa`;
    }
    
    // Load Total Guru (berdasarkan jumlah data guru)
    const totalGuruElement = document.getElementById('total-guru');
    if (totalGuruElement) {
        totalGuruElement.textContent = `${teachersData.length} Guru`;
    }

    // Populate the Guru table in the frontend modal
    const guruTableBody = document.querySelector('#guruModal #guru-table tbody');
    if (guruTableBody) {
        guruTableBody.innerHTML = '';
        teachersData.forEach((teacher, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${teacher.name}</td>
                    <td>${teacher.subject}</td>
                    <td><span class="text-muted">Aksi hanya di Admin Panel</span></td>
                </tr>
            `;
            guruTableBody.innerHTML += row;
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (isLoggedIn) {
        showAdminPanel();
    } else {
        showFrontend();
    }
    
    // Load data for frontend
    loadNews();
    loadGallery();
    loadSettings();
    loadSchoolStats(); // Panggil fungsi untuk memuat statistik sekolah
    
    // Load data for admin panel jika sudah login
    if (isLoggedIn) {
        loadAdminData();
    }
    
    // Setup event listeners
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        login();
    });
});

// =========================================================
// FUNGSI NAVIGASI HALAMAN (Diperbarui untuk halaman penuh)
// =========================================================

// Show frontend website
function showFrontend() {
    document.getElementById('frontend-app').style.display = 'block';
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'none';
    // Sembunyikan halaman penuh
    document.getElementById('all-news-page').style.display = 'none';
    document.getElementById('all-gallery-page').style.display = 'none';
    // Pastikan Berita & Galeri di Beranda terload
    loadNews();
    loadGallery();
    // Scroll to top
    window.scrollTo(0, 0);
}

// Show All News Page (FUNGSI BARU)
function showAllNewsPage() {
    document.getElementById('frontend-app').style.display = 'none';
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'none';
    document.getElementById('all-news-page').style.display = 'block';
    document.getElementById('all-gallery-page').style.display = 'none';
    loadAllNews();
    // Scroll to top
    window.scrollTo(0, 0);
}

// Show All Gallery Page (FUNGSI BARU)
function showAllGalleryPage() {
    document.getElementById('frontend-app').style.display = 'none';
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'none';
    document.getElementById('all-news-page').style.display = 'none';
    document.getElementById('all-gallery-page').style.display = 'block';
    loadAllGallery();
    // Scroll to top
    window.scrollTo(0, 0);
}

// Show admin login
function showAdminLogin() {
    document.getElementById('frontend-app').style.display = 'none';
    document.getElementById('admin-login').style.display = 'block';
    document.getElementById('admin-panel').style.display = 'none';
    document.getElementById('all-news-page').style.display = 'none';
    document.getElementById('all-gallery-page').style.display = 'none';
}

// Show admin panel
function showAdminPanel() {
    document.getElementById('frontend-app').style.display = 'none';
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    document.getElementById('all-news-page').style.display = 'none';
    document.getElementById('all-gallery-page').style.display = 'none';
    loadAdminData();
}

// Login function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple authentication
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminLoggedIn', 'true');
        isLoggedIn = true;
        showAdminPanel();
        showAlert('Login berhasil!', 'success');
    } else {
        showAlert('Username atau password salah!', 'error');
    }
}

// Logout function
function logout() {
    localStorage.setItem('adminLoggedIn', 'false');
    isLoggedIn = false;
    showFrontend();
    showAlert('Anda telah logout.', 'info');
}

// =========================================================
// FUNGSI LOAD DATA FRONTEND
// =========================================================

// Load news for frontend (Hanya 3 berita terbaru)
function loadNews() {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return;
    newsContainer.innerHTML = '';
    
    // Filter hanya berita published, lalu urutkan berdasarkan tanggal (terbaru pertama)
    const publishedNews = newsData.filter(n => n.status === 'published');
    const sortedNews = [...publishedNews].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display only the latest 3 news
    const latestNews = sortedNews.slice(0, 3);
    latestNews.forEach(news => {
        // Hapus tombol "Baca Selengkapnya", buat seluruh kartu dapat diklik
        const newsCard = `
            <div class="col-md-4 mb-4">
                <div class="card news-card h-100 clickable-card" onclick="viewNewsDetail(${news.id})" data-bs-toggle="modal" data-bs-target="#newsDetailModal">
                    <img src="${news.image}" class="card-img-top" alt="${news.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text flex-grow-1">${news.content.substring(0, 100)}...</p>
                        <small class="text-muted mt-2">${formatDate(news.date)}</small>
                    </div>
                </div>
            </div>
        `;
        newsContainer.innerHTML += newsCard;
    });
}

// Load ALL news for the separate news page (FUNGSI BARU)
function loadAllNews() {
    const newsContainer = document.getElementById('all-news-container');
    if (!newsContainer) return;
    newsContainer.innerHTML = '';

    const publishedNews = newsData.filter(n => n.status === 'published');
    const sortedNews = [...publishedNews].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedNews.forEach(news => {
        const newsCard = `
            <div class="col-md-4 mb-4">
                <div class="card news-card h-100 clickable-card" onclick="viewNewsDetail(${news.id})" data-bs-toggle="modal" data-bs-target="#newsDetailModal">
                    <img src="${news.image}" class="card-img-top" alt="${news.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text flex-grow-1">${news.content.substring(0, 150)}...</p>
                        <small class="text-muted mt-2">${formatDate(news.date)}</small>
                    </div>
                </div>
            </div>
        `;
        newsContainer.innerHTML += newsCard;
    });
}

// Function to show news detail in modal (FUNGSI BARU)
function viewNewsDetail(newsId) {
    const news = newsData.find(n => n.id === newsId);
    if (!news) return;

    const detailBody = document.getElementById('newsDetailBody');
    const detailTitle = document.getElementById('newsDetailModalLabel');

    detailTitle.textContent = news.title;
    detailBody.innerHTML = `
        <img src="${news.image}" class="img-fluid mb-3" alt="${news.title}" style="max-height: 400px; width: 100%; object-fit: cover;">
        <p class="text-muted mb-3"><i class="fas fa-calendar-alt me-2"></i>${formatDate(news.date)}</p>
        <p style="white-space: pre-wrap; text-align: justify;">${news.content}</p>
    `;
}


// Load gallery for frontend (Hanya 6 foto terbaru)
function loadGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) return;
    galleryContainer.innerHTML = '';
    // Sort gallery by date (newest first)
    const sortedGallery = [...galleryData].sort((a, b) => new Date(b.date) - new Date(a.date));
    // Display only the latest 6 gallery items
    const latestGallery = sortedGallery.slice(0, 6);
    latestGallery.forEach(item => {
        const galleryItem = `
            <div class="col-md-4">
                <div class="gallery-item clickable-card" onclick="viewGalleryDetail('${item.image}', '${item.title}')" data-bs-toggle="modal" data-bs-target="#galleryViewModal">
                    <img src="${item.image}" class="img-fluid" alt="${item.title}">
                    <div class="gallery-overlay">
                        <h5 class="text-white">${item.title}</h5>
                    </div>
                </div>
            </div>
        `;
        galleryContainer.innerHTML += galleryItem;
    });
}

// Load ALL gallery items for the separate gallery page (FUNGSI BARU)
function loadAllGallery() {
    const galleryContainer = document.getElementById('all-gallery-container');
    if (!galleryContainer) return;
    galleryContainer.innerHTML = '';
    
    const sortedGallery = [...galleryData].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedGallery.forEach(item => {
        const galleryItem = `
            <div class="col-md-4 col-lg-3 mb-4">
                <div class="gallery-item clickable-card" onclick="viewGalleryDetail('${item.image}', '${item.title}')" data-bs-toggle="modal" data-bs-target="#galleryViewModal">
                    <img src="${item.image}" class="img-fluid" alt="${item.title}">
                    <div class="gallery-overlay">
                        <h5 class="text-white">${item.title}</h5>
                    </div>
                </div>
            </div>
        `;
        galleryContainer.innerHTML += galleryItem;
    });
}

// Function to show gallery detail in modal (FUNGSI BARU)
function viewGalleryDetail(imageSrc, title) {
    document.getElementById('galleryViewImage').src = imageSrc;
    document.getElementById('galleryViewTitle').textContent = title;
    document.getElementById('galleryViewModalLabel').textContent = title;
}


// FUNGSI PENTING #2: Memuat Data Pengaturan ke Frontend & Admin Form
function loadSettings() {
    // Memuat ke formulir di panel admin
    const schoolNameInput = document.getElementById('schoolName');
    if (schoolNameInput) schoolNameInput.value = settingsData.name;
    const schoolAddressInput = document.getElementById('schoolAddress');
    if (schoolAddressInput) schoolAddressInput.value = settingsData.address;
    const schoolPhoneInput = document.getElementById('schoolPhone');
    if (schoolPhoneInput) schoolPhoneInput.value = settingsData.phone;
    const schoolEmailInput = document.getElementById('schoolEmail');
    if (schoolEmailInput) schoolEmailInput.value = settingsData.email;
    const schoolVisionInput = document.getElementById('schoolVision');
    if (schoolVisionInput) schoolVisionInput.value = settingsData.vision;
    const schoolMissionInput = document.getElementById('schoolMission');
    if (schoolMissionInput) schoolMissionInput.value = settingsData.mission;

    // Memuat ke input total siswa di admin panel
    const totalStudentsInput = document.getElementById('totalStudentsInput');
    if (totalStudentsInput) totalStudentsInput.value = settingsData.totalStudents || 0;

    // Memuat ke frontend website
    const navbarBrand = document.querySelector('.navbar-brand');
    if (navbarBrand) navbarBrand.innerHTML = `<i class="fas fa-school me-2"></i>${settingsData.name}`;
    const homeTitle = document.querySelector('#home h1');
    if (homeTitle) homeTitle.textContent = settingsData.name;
    const visionElement = document.querySelector('#profile h5:nth-of-type(1) + p');
    if (visionElement) visionElement.textContent = settingsData.vision;
    
    // Update Misi (handle newlines)
    const missionElement = document.querySelector('#profile h5:nth-of-type(2) + ul');
    if (missionElement) {
        missionElement.innerHTML = settingsData.mission.split('\n')
            .map(m => `<li>${m}</li>`)
            .join('');
    }

    // Update Kontak di frontend
    const addressElement = document.querySelector('#contact .mb-4:nth-child(1) p');
    if (addressElement) addressElement.textContent = settingsData.address;
    const phoneElement = document.querySelector('#contact .mb-4:nth-child(2) p');
    if (phoneElement) phoneElement.textContent = settingsData.phone;
    const emailElement = document.querySelector('#contact .mb-4:nth-child(3) p');
    if (emailElement) emailElement.textContent = settingsData.email;
}

// ... Sisa fungsi Admin Panel (dibiarkan utuh)
// =========================================================
// FUNGSI ADMINISTRASI (Admin Panel)
// =========================================================

function loadAdminData() {
    loadDashboardStats();
    loadTeachersAdmin();
    loadNewsAdmin();
    loadGalleryAdmin();
    loadSettings();
}

function loadDashboardStats() {
    const totalNews = newsData.length;
    const totalGallery = galleryData.length;
    const totalTeachers = teachersData.length;

    document.getElementById('dashboard-total-news').textContent = totalNews;
    document.getElementById('dashboard-total-gallery').textContent = totalGallery;
    document.getElementById('dashboard-total-teachers').textContent = totalTeachers;

    const latestNews = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    const latestGallery = [...galleryData].sort((a, b) => new Date(b.date) - new Date(a.date))[0];

    document.getElementById('latest-news-title').textContent = latestNews ? latestNews.title : 'Tidak ada data.';
    document.getElementById('latest-gallery-title').textContent = latestGallery ? latestGallery.title : 'Tidak ada data.';
}

// Settings
function saveSettings() {
    settingsData.name = document.getElementById('schoolName').value;
    settingsData.address = document.getElementById('schoolAddress').value;
    settingsData.phone = document.getElementById('schoolPhone').value;
    settingsData.email = document.getElementById('schoolEmail').value;
    settingsData.vision = document.getElementById('schoolVision').value;
    settingsData.mission = document.getElementById('schoolMission').value;

    saveSettingsData();
    loadSettings();
    showAlert('Pengaturan berhasil disimpan!', 'success');
}

function saveSchoolStats() {
    const totalStudentsInput = document.getElementById('totalStudentsInput');
    settingsData.totalStudents = parseInt(totalStudentsInput.value) || 0;
    
    saveSettingsData();
    loadSchoolStats();
    loadDashboardStats();
    showAlert('Statistik sekolah berhasil disimpan!', 'success');
}


// Teachers Management
function loadTeachersAdmin() {
    const teacherTableBody = document.querySelector('#teachers-table tbody');
    if (!teacherTableBody) return;
    teacherTableBody.innerHTML = '';

    teachersData.forEach(teacher => {
        const row = `
            <tr>
                <td>${teacher.id}</td>
                <td>${teacher.name}</td>
                <td>${teacher.subject}</td>
                <td>
                    <button class="btn btn-sm btn-info me-2" onclick="editTeacher(${teacher.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteTeacher(${teacher.id})">Hapus</button>
                </td>
            </tr>
        `;
        teacherTableBody.innerHTML += row;
    });
}

function addTeacher() {
    const name = document.getElementById('teacherName').value;
    const subject = document.getElementById('teacherSubject').value;
    
    const newId = teachersData.length ? Math.max(...teachersData.map(t => t.id)) + 1 : 1;
    
    teachersData.push({ id: newId, name, subject });
    saveTeachersData();
    loadTeachersAdmin();
    loadSchoolStats();
    loadDashboardStats();
    
    // Clear form and close modal
    document.getElementById('addTeacherForm').reset();
    const modalElement = document.getElementById('addTeacherModal');
    const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modal.hide();
    showAlert('Data guru berhasil ditambahkan!', 'success');
}

function editTeacher(id) {
    const teacher = teachersData.find(t => t.id === id);
    if (!teacher) return;
    
    document.getElementById('editTeacherId').value = teacher.id;
    document.getElementById('editTeacherName').value = teacher.name;
    document.getElementById('editTeacherSubject').value = teacher.subject;
    
    const modalElement = document.getElementById('editTeacherModal');
    const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modal.show();
}

function updateTeacher() {
    const id = parseInt(document.getElementById('editTeacherId').value);
    const name = document.getElementById('editTeacherName').value;
    const subject = document.getElementById('editTeacherSubject').value;
    
    const index = teachersData.findIndex(t => t.id === id);
    if (index !== -1) {
        teachersData[index] = { id, name, subject };
        saveTeachersData();
        loadTeachersAdmin();
        loadSchoolStats();
        
        // Close modal
        const modalElement = document.getElementById('editTeacherModal');
        const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modal.hide();
        showAlert('Data guru berhasil diperbarui!', 'success');
    }
}

function deleteTeacher(id) {
    if (confirm('Yakin ingin menghapus data guru ini?')) {
        teachersData = teachersData.filter(t => t.id !== id);
        saveTeachersData();
        loadTeachersAdmin();
        loadSchoolStats();
        loadDashboardStats();
        showAlert('Data guru berhasil dihapus!', 'success');
    }
}


// News Management
function loadNewsAdmin() {
    const newsTableBody = document.querySelector('#news-admin-table tbody');
    if (!newsTableBody) return;
    newsTableBody.innerHTML = '';

    const sortedNews = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedNews.forEach(news => {
        const statusClass = news.status === 'published' ? 'bg-primary' : 'bg-secondary';
        const row = `
            <tr>
                <td>${news.id}</td>
                <td>${news.title.substring(0, 50)}...</td>
                <td>${formatDate(news.date)}</td>
                <td><span class="badge ${statusClass}">${news.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-info me-2" onclick="editNews(${news.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteNews(${news.id})">Hapus</button>
                </td>
            </tr>
        `;
        newsTableBody.innerHTML += row;
    });
}

function addNews() {
    const title = document.getElementById('newsTitle').value;
    const content = document.getElementById('newsContent').value;
    const date = document.getElementById('newsDate').value;
    const status = document.getElementById('newsStatus').value;
    const imageSource = document.getElementById('newsImageSource').value;
    
    let image = '';
    
    if (imageSource === 'url') {
        image = document.getElementById('newsImage').value;
        if (!image) {
             showAlert('URL Gambar harus diisi!', 'error');
             return;
        }
    } else {
        const fileInput = document.getElementById('newsImageFile');
        if (fileInput.files.length > 0) {
            // Dalam aplikasi nyata, ini akan menjadi proses upload server.
            // Untuk simulasi, kita akan menggunakan FileReader.
            const reader = new FileReader();
            reader.onload = function(e) {
                const newId = newsData.length ? Math.max(...newsData.map(n => n.id)) + 1 : 1;
                newsData.push({ id: newId, title, content, date, status, image: e.target.result });
                saveNewsData();
                loadNewsAdmin();
                loadNews();
                loadDashboardStats();
                
                // Clear form and close modal
                document.getElementById('addNewsForm').reset();
                document.getElementById('newsUploadPreview').style.display = 'none';
                const modalElement = document.getElementById('addNewsModal');
                const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
                modal.hide();
                showAlert('Berita berhasil ditambahkan!', 'success');
            };
            reader.readAsDataURL(fileInput.files[0]);
            return; // Exit here to wait for FileReader
        } else {
            showAlert('File gambar harus diunggah!', 'error');
            return;
        }
    }

    const newId = newsData.length ? Math.max(...newsData.map(n => n.id)) + 1 : 1;
    newsData.push({ id: newId, title, content, date, status, image });
    saveNewsData();
    loadNewsAdmin();
    loadNews();
    loadDashboardStats();
    
    // Clear form and close modal
    document.getElementById('addNewsForm').reset();
    document.getElementById('newsUploadPreview').style.display = 'none';
    const modalElement = document.getElementById('addNewsModal');
    const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modal.hide();
    showAlert('Berita berhasil ditambahkan!', 'success');
}

function editNews(id) {
    const news = newsData.find(n => n.id === id);
    if (!news) return;
    
    document.getElementById('editNewsId').value = news.id;
    document.getElementById('editNewsTitle').value = news.title;
    document.getElementById('editNewsContent').value = news.content;
    document.getElementById('editNewsDate').value = news.date;
    document.getElementById('editNewsStatus').value = news.status;
    document.getElementById('currentNewsImagePreview').src = news.image;
    
    // Reset image inputs
    document.getElementById('editNewsImageSource').value = 'url';
    toggleEditNewsImageInput();
    document.getElementById('editNewsImage').value = news.image;
    document.getElementById('editNewsImageFile').value = '';
    document.getElementById('editNewsUploadPreview').style.display = 'none';
    
    const modalElement = document.getElementById('editNewsModal');
    const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modal.show();
}

function updateNews() {
    const id = parseInt(document.getElementById('editNewsId').value);
    const title = document.getElementById('editNewsTitle').value;
    const content = document.getElementById('editNewsContent').value;
    const date = document.getElementById('editNewsDate').value;
    const status = document.getElementById('editNewsStatus').value;
    const imageSource = document.getElementById('editNewsImageSource').value;
    
    const index = newsData.findIndex(n => n.id === id);
    if (index === -1) return;

    let newImage = newsData[index].image; // Keep old image by default
    
    if (imageSource === 'url') {
        const urlInput = document.getElementById('editNewsImage').value;
        if (urlInput) {
            newImage = urlInput;
        }
        finalizeUpdate();
    } else {
        const fileInput = document.getElementById('editNewsImageFile');
        if (fileInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                newImage = e.target.result;
                finalizeUpdate();
            };
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            finalizeUpdate(); // No new file uploaded, keep old image
        }
    }
    
    function finalizeUpdate() {
        newsData[index] = { id, title, content, date, status, image: newImage };
        saveNewsData();
        loadNewsAdmin();
        loadNews();
        loadDashboardStats();
        
        // Close modal
        const modalElement = document.getElementById('editNewsModal');
        const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modal.hide();
        showAlert('Berita berhasil diperbarui!', 'success');
    }
}

function deleteNews(id) {
    if (confirm('Yakin ingin menghapus berita ini?')) {
        newsData = newsData.filter(n => n.id !== id);
        saveNewsData();
        loadNewsAdmin();
        loadNews();
        loadDashboardStats();
        showAlert('Berita berhasil dihapus!', 'success');
    }
}


// Gallery Management
function loadGalleryAdmin() {
    const galleryTableBody = document.querySelector('#gallery-admin-table tbody');
    if (!galleryTableBody) return;
    galleryTableBody.innerHTML = '';

    const sortedGallery = [...galleryData].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedGallery.forEach(item => {
        const row = `
            <tr>
                <td>${item.id}</td>
                <td>${item.title.substring(0, 50)}...</td>
                <td>${formatDate(item.date)}</td>
                <td>
                    <button class="btn btn-sm btn-info me-2" onclick="editGalleryItem(${item.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteGalleryItem(${item.id})">Hapus</button>
                </td>
            </tr>
        `;
        galleryTableBody.innerHTML += row;
    });
}

function addGalleryItem() {
    const title = document.getElementById('galleryTitle').value;
    const date = document.getElementById('galleryDate').value;
    const imageSource = document.getElementById('galleryImageSource').value;
    
    let image = '';
    
    if (imageSource === 'url') {
        image = document.getElementById('galleryImage').value;
        if (!image) {
             showAlert('URL Gambar harus diisi!', 'error');
             return;
        }
    } else {
        const fileInput = document.getElementById('galleryImageFile');
        if (fileInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const newId = galleryData.length ? Math.max(...galleryData.map(g => g.id)) + 1 : 1;
                galleryData.push({ id: newId, title, date, image: e.target.result });
                saveGalleryData();
                loadGalleryAdmin();
                loadGallery();
                loadDashboardStats();
                
                // Clear form and close modal
                document.getElementById('addGalleryForm').reset();
                document.getElementById('uploadPreview').style.display = 'none';
                const modalElement = document.getElementById('addGalleryModal');
                const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
                modal.hide();
                showAlert('Foto galeri berhasil ditambahkan!', 'success');
            };
            reader.readAsDataURL(fileInput.files[0]);
            return; // Exit here to wait for FileReader
        } else {
            showAlert('File gambar harus diunggah!', 'error');
            return;
        }
    }

    const newId = galleryData.length ? Math.max(...galleryData.map(g => g.id)) + 1 : 1;
    galleryData.push({ id: newId, title, date, image });
    saveGalleryData();
    loadGalleryAdmin();
    loadGallery();
    loadDashboardStats();
    
    // Clear form and close modal
    document.getElementById('addGalleryForm').reset();
    document.getElementById('uploadPreview').style.display = 'none';
    const modalElement = document.getElementById('addGalleryModal');
    const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modal.hide();
    showAlert('Foto galeri berhasil ditambahkan!', 'success');
}

function editGalleryItem(id) {
    const item = galleryData.find(g => g.id === id);
    if (!item) return;
    
    document.getElementById('editGalleryId').value = item.id;
    document.getElementById('editGalleryTitle').value = item.title;
    document.getElementById('editGalleryDate').value = item.date;
    document.getElementById('currentGalleryImagePreview').src = item.image;
    document.getElementById('editGalleryImage').value = ''; // Reset URL input
    
    const modalElement = document.getElementById('editGalleryModal');
    const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modal.show();
}

function updateGalleryItem() {
    const id = parseInt(document.getElementById('editGalleryId').value);
    const title = document.getElementById('editGalleryTitle').value;
    const date = document.getElementById('editGalleryDate').value;
    const newImageURL = document.getElementById('editGalleryImage').value;
    
    const index = galleryData.findIndex(g => g.id === id);
    if (index === -1) return;

    let newImage = galleryData[index].image;
    if (newImageURL) {
        newImage = newImageURL;
    }
    
    galleryData[index] = { id, title, date, image: newImage };
    saveGalleryData();
    loadGalleryAdmin();
    loadGallery();
    loadDashboardStats();
    
    // Close modal
    const modalElement = document.getElementById('editGalleryModal');
    const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modal.hide();
    showAlert('Foto galeri berhasil diperbarui!', 'success');
}

function deleteGalleryItem(id) {
    if (confirm('Yakin ingin menghapus foto galeri ini?')) {
        galleryData = galleryData.filter(g => g.id !== id);
        saveGalleryData();
        loadGalleryAdmin();
        loadGallery();
        loadDashboardStats();
        showAlert('Foto galeri berhasil dihapus!', 'success');
    }
}


// Image Input Toggles (News)
function toggleNewsImageInput() {
    const source = document.getElementById('newsImageSource').value;
    const urlInput = document.getElementById('newsImageUrl');
    const uploadInput = document.getElementById('newsImageUpload');
    const urlInputEl = document.getElementById('newsImage');
    const fileInputEl = document.getElementById('newsImageFile');
    
    if (source === 'url') {
        urlInput.style.display = 'block';
        uploadInput.style.display = 'none';
        urlInputEl.required = true;
        fileInputEl.required = false;
    } else {
        urlInput.style.display = 'none';
        uploadInput.style.display = 'block';
        urlInputEl.required = false;
        fileInputEl.required = true;
    }
}

function previewNewsUploadImage(input) {
    const preview = document.getElementById('newsUploadPreview');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        reader.readAsDataURL(input.files[0]);
    } else {
        preview.style.display = 'none';
    }
}

function toggleEditNewsImageInput() {
    const source = document.getElementById('editNewsImageSource').value;
    const urlInput = document.getElementById('editNewsImageUrl');
    const uploadInput = document.getElementById('editNewsImageUpload');
    const preview = document.getElementById('editNewsUploadPreview');
    const urlInputEl = document.getElementById('editNewsImage');
    const fileInputEl = document.getElementById('editNewsImageFile');
    
    if (source === 'url') {
        urlInput.style.display = 'block';
        uploadInput.style.display = 'none';
        preview.style.display = 'none';
        urlInputEl.value = document.getElementById('currentNewsImagePreview').src;
        fileInputEl.value = '';
    } else {
        urlInput.style.display = 'none';
        uploadInput.style.display = 'block';
        urlInputEl.value = '';
        preview.style.display = 'none';
    }
}

function previewEditNewsUploadImage(input) {
    const preview = document.getElementById('editNewsUploadPreview');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        reader.readAsDataURL(input.files[0]);
    } else {
        preview.style.display = 'none';
    }
}


// Image Input Toggles (Gallery)
function toggleImageInput() {
    const source = document.getElementById('galleryImageSource').value;
    const urlInput = document.getElementById('galleryImageUrl');
    const uploadInput = document.getElementById('galleryImageUpload');
    const preview = document.getElementById('uploadPreview');
    const urlInputEl = document.getElementById('galleryImage');
    const fileInputEl = document.getElementById('galleryImageFile');
    
    if (source === 'url') {
        urlInput.style.display = 'block';
        uploadInput.style.display = 'none';
        preview.style.display = 'none';
        urlInputEl.required = true;
        fileInputEl.required = false;
    } else {
        urlInput.style.display = 'none';
        uploadInput.style.display = 'block';
        preview.style.display = 'block';
        urlInputEl.required = false;
        fileInputEl.required = true;
    }
}

function previewUploadImage(input) {
    const preview = document.getElementById('uploadPreview');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        reader.readAsDataURL(input.files[0]);
    } else {
        preview.style.display = 'none';
    }
}

// Password Reset Functions (Dibiarkan utuh)
function showResetPasswordModal() {
    document.getElementById('requestResetForm').style.display = 'block';
    document.getElementById('verifyCodeForm').style.display = 'none';
    document.getElementById('resetUsername').value = '';
    
    const resetPasswordModalElement = document.getElementById('resetPasswordModal');
    const resetPasswordModal = bootstrap.Modal.getInstance(resetPasswordModalElement) || new bootstrap.Modal(resetPasswordModalElement);
    resetPasswordModal.show();
}

function showRequestResetForm() {
    document.getElementById('requestResetForm').style.display = 'block';
    document.getElementById('verifyCodeForm').style.display = 'none';
}

function requestPasswordReset() {
    const username = document.getElementById('resetUsername').value;
    
    if (username === 'admin') {
        // Simulasi pengiriman kode ke email
        resetCode = '123456'; // Kode simulasi
        document.getElementById('verifyCodeForm').style.display = 'block';
        document.getElementById('requestResetForm').style.display = 'none';
        document.getElementById('verificationCode').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmNewPassword').value = '';
        showAlert('Kode verifikasi simulasi 123456 telah dibuat.', 'info');
    } else {
        showAlert('Username tidak ditemukan.', 'error');
    }
}

function verifyAndResetPassword() {
    const code = document.getElementById('verificationCode').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;
    
    if (!code || !newPassword || !confirmNewPassword) {
        showAlert('Harap isi semua field!', 'error');
        return;
    }
    
    if (code !== resetCode) {
        showAlert('Kode verifikasi salah!', 'error');
        return;
    }
    
    if (newPassword !== confirmNewPassword) {
        showAlert('Password baru dan konfirmasi password tidak cocok!', 'error');
        return;
    }
    
    // Check password strength
    // Harus memiliki minimal 8 karakter, termasuk huruf besar, huruf kecil, angka, dan simbol.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        showAlert('Password harus memiliki minimal 8 karakter, termasuk huruf besar, huruf kecil, angka, dan simbol.', 'error');
        return;
    }
    
    // In a real application, this would update the password in the database
    // Karena kita tidak punya backend, kita hanya menampilkan alert
    showAlert('Password berhasil direset! Silakan login dengan password baru (gunakan admin123).', 'success');
    
    const resetPasswordModalElement = document.getElementById('resetPasswordModal');
    const resetPasswordModal = bootstrap.Modal.getInstance(resetPasswordModalElement) || new bootstrap.Modal(resetPasswordModalElement);
    if (resetPasswordModal) resetPasswordModal.hide();
    
    // Reset form
    document.getElementById('requestResetForm').style.display = 'block';
    document.getElementById('verifyCodeForm').style.display = 'none';
}