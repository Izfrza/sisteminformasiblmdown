// Data storage (in a real application, this would be a database)
let newsData = JSON.parse(localStorage.getItem('schoolNews')) || [
    {
        id: 1,
        title: "Penerimaan Peserta Didik Baru Tahun 2023",
        content: "SMA Negeri 1 Maju Jaya membuka pendaftaran untuk peserta didik baru tahun ajaran 2023/2024. Pendaftaran dibuka dari tanggal 1 Maret hingga 30 April 2023.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: "2023-02-15",
        status: "published"
    },
    {
        id: 2,
        title: "Siswa SMA Negeri 1 Maju Jaya Juara Olimpiade Matematika",
        content: "Siswa kami, Ahmad Fauzi, berhasil meraih medali emas dalam Olimpiade Matematika Tingkat Nasional yang diselenggarakan di Jakarta.",
        image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: "2023-02-10",
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
    mission: "Menyelenggarakan pendidikan yang berkualitas dan berkarakter\nMengembangkan potensi peserta didik secara optimal\nMendorong inovasi dalam pembelajaran\nMenjalin kerjasama dengan masyarakat dan dunia usaha"
};

let isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
let resetCode = null;

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
    
    // Load data for admin panel
    if (isLoggedIn) {
        loadAdminData();
    }
    
    // Panggil fungsi untuk memuat pengaturan saat halaman dimuat
    loadSettings();

    // Setup event listeners
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        login();
    });
    
    document.getElementById('settingsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveSettings();
    });
});

// FUNGSI BARU UNTUK MENGELOLA INPUT GAMBAR BERITA
function toggleNewsImageInput() {
    const source = document.getElementById('newsImageSource').value;
    const urlInput = document.getElementById('newsImageUrl');
    const uploadInput = document.getElementById('newsImageUpload');
    const preview = document.getElementById('newsUploadPreview');
    
    if (source === 'url') {
        urlInput.style.display = 'block';
        uploadInput.style.display = 'none';
        preview.style.display = 'none';
    } else {
        urlInput.style.display = 'none';
        uploadInput.style.display = 'block';
        preview.style.display = 'block';
    }
}

// FUNGSI BARU UNTUK PRATINJAU GAMBAR BERITA
function previewNewsUploadImage(input) {
    const preview = document.getElementById('newsUploadPreview');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

// FUNGSI BARU UNTUK MENGELOLA INPUT EDIT GAMBAR BERITA
function toggleEditNewsImageInput() {
    const source = document.getElementById('editNewsImageSource').value;
    const urlInput = document.getElementById('editNewsImageUrl');
    const uploadInput = document.getElementById('editNewsImageUpload');
    const preview = document.getElementById('editNewsUploadPreview');
    
    if (source === 'url') {
        urlInput.style.display = 'block';
        uploadInput.style.display = 'none';
        preview.style.display = 'none';
    } else {
        urlInput.style.display = 'none';
        uploadInput.style.display = 'block';
        preview.style.display = 'block';
    }
}

// FUNGSI BARU UNTUK PRATINJAU GAMBAR BERITA SAAT DIEDIT
function previewEditNewsUploadImage(input) {
    const preview = document.getElementById('editNewsUploadPreview');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}


// Toggle between URL and upload inputs (untuk galeri)
function toggleImageInput() {
    const source = document.getElementById('galleryImageSource').value;
    const urlInput = document.getElementById('galleryImageUrl');
    const uploadInput = document.getElementById('galleryImageUpload');
    const preview = document.getElementById('uploadPreview');
    
    if (source === 'url') {
        urlInput.style.display = 'block';
        uploadInput.style.display = 'none';
        preview.style.display = 'none';
    } else {
        urlInput.style.display = 'none';
        uploadInput.style.display = 'block';
        preview.style.display = 'block';
    }
}

// Preview uploaded image (untuk galeri)
function previewUploadImage(input) {
    const preview = document.getElementById('uploadPreview');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Show frontend website
function showFrontend() {
    document.getElementById('frontend-app').style.display = 'block';
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'none';
}

// Show admin login
function showAdminLogin() {
    document.getElementById('frontend-app').style.display = 'none';
    document.getElementById('admin-login').style.display = 'block';
    document.getElementById('admin-panel').style.display = 'none';
}

// Show admin panel
function showAdminPanel() {
    document.getElementById('frontend-app').style.display = 'none';
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    loadAdminData();
}

// Login function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple authentication (in a real application, this would be server-side)
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

// Load news for frontend
function loadNews() {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    
    // Sort news by date (newest first)
    const sortedNews = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display only the latest 3 news
    const latestNews = sortedNews.slice(0, 3);
    
    latestNews.forEach(news => {
        const newsCard = `
            <div class="col-md-4">
                <div class="card news-card">
                    <img src="${news.image}" class="card-img-top" alt="${news.title}">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text">${news.content.substring(0, 100)}...</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">${formatDate(news.date)}</small>
                            <a href="#" class="btn btn-sm btn-primary">Baca Selengkapnya</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        newsContainer.innerHTML += newsCard;
    });
}

// Load gallery for frontend
function loadGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    galleryContainer.innerHTML = '';
    
    // Sort gallery by date (newest first)
    const sortedGallery = [...galleryData].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display only the latest 6 gallery items
    const latestGallery = sortedGallery.slice(0, 6);
    
    latestGallery.forEach(item => {
        const galleryItem = `
            <div class="col-md-4">
                <div class="gallery-item">
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

// FUNGSI BARU UNTUK MEMUAT DATA PENGATURAN
function loadSettings() {
    // Memuat ke formulir di panel admin
    document.getElementById('schoolName').value = settingsData.name;
    document.getElementById('schoolAddress').value = settingsData.address;
    document.getElementById('schoolPhone').value = settingsData.phone;
    document.getElementById('schoolEmail').value = settingsData.email;
    document.getElementById('schoolVision').value = settingsData.vision;
    document.getElementById('schoolMission').value = settingsData.mission;

    // Memuat ke frontend website
    document.querySelector('.navbar-brand').innerHTML = `<i class="fas fa-school me-2"></i>${settingsData.name}`;
    document.querySelector('#home h1').textContent = settingsData.name;
    document.querySelector('#profile h5:nth-of-type(1) + p').textContent = settingsData.vision;
    document.querySelector('#profile h5:nth-of-type(2) + ul').innerHTML = settingsData.mission.split('\n').map(m => `<li>${m}</li>`).join('');
    document.querySelector('#contact .mb-4:nth-child(1) p').textContent = settingsData.address;
    document.querySelector('#contact .mb-4:nth-child(2) p').textContent = settingsData.phone;
    document.querySelector('#contact .mb-4:nth-child(3) p').textContent = settingsData.email;
}

// Load data for admin panel
function loadAdminData() {
    // Update counts
    document.getElementById('news-count').textContent = newsData.length;
    document.getElementById('gallery-count').textContent = galleryData.length;
    
    // Load news table
    const newsTableBody = document.getElementById('news-table-body');
    newsTableBody.innerHTML = '';
    
    newsData.forEach((news, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${news.title}</td>
                <td><img src="${news.image}" alt="${news.title}" style="width: 80px; height: 60px; object-fit: cover;"></td>
                <td>${formatDate(news.date)}</td>
                <td><span class="badge badge-primary">${news.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="editNews(${news.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteNews(${news.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        newsTableBody.innerHTML += row;
    });
    
    // Load gallery table
    const galleryTableBody = document.getElementById('gallery-table-body');
    galleryTableBody.innerHTML = '';
    
    galleryData.forEach((item, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${item.image}" alt="${item.title}" style="width: 80px; height: 60px; object-fit: cover;"></td>
                <td>${item.title}</td>
                <td>${formatDate(item.date)}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="editGalleryItem(${item.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteGalleryItem(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        galleryTableBody.innerHTML += row;
    });
    
    // Load recent news for dashboard
    const recentNewsList = document.getElementById('recent-news-list');
    recentNewsList.innerHTML = '';
    
    const sortedNews = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));
    const recentNews = sortedNews.slice(0, 5);
    
    recentNews.forEach(news => {
        const newsItem = `
            <div class="d-flex mb-3">
                <img src="${news.image}" alt="${news.title}" style="width: 60px; height: 60px; object-fit: cover;" class="me-3">
                <div>
                    <h6 class="mb-1">${news.title}</h6>
                    <small class="text-muted">${formatDate(news.date)}</small>
                </div>
            </div>
        `;
        recentNewsList.innerHTML += newsItem;
    });
    
    // Load recent gallery for dashboard
    const recentGalleryList = document.getElementById('recent-gallery-list');
    recentGalleryList.innerHTML = '';
    
    const sortedGallery = [...galleryData].sort((a, b) => new Date(b.date) - new Date(a.date));
    const recentGallery = sortedGallery.slice(0, 5);
    
    recentGallery.forEach(item => {
        const galleryItem = `
            <div class="d-flex mb-3">
                <img src="${item.image}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: cover;" class="me-3">
                <div>
                    <h6 class="mb-1">${item.title}</h6>
                    <small class="text-muted">${formatDate(item.date)}</small>
                </div>
            </div>
        `;
        recentGalleryList.innerHTML += galleryItem;
    });
}

// FUNGSI addNews YANG SUDAH DIUBAH
function addNews() {
    const title = document.getElementById('newsTitle').value;
    const content = document.getElementById('newsContent').value;
    const source = document.getElementById('newsImageSource').value;
    const date = document.getElementById('newsDate').value;
    let image = '';
    
    if (source === 'url') {
        image = document.getElementById('newsImageUrl').value;
        saveNewsItem(title, content, image, date);
    } else {
        const fileInput = document.getElementById('newsImageUpload');
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                image = e.target.result;
                saveNewsItem(title, content, image, date);
            }
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            showAlert('Harap pilih file gambar!', 'error');
        }
    }
}

// Add gallery item function
function addGalleryItem() {
    const title = document.getElementById('galleryTitle').value;
    const source = document.getElementById('galleryImageSource').value;
    const date = document.getElementById('galleryDate').value;
    let image = '';
    
    if (source === 'url') {
        image = document.getElementById('galleryImageUrl').value;
    } else {
        // Handle file upload
        const fileInput = document.getElementById('galleryImageUpload');
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                image = e.target.result;
                saveGalleryItem(title, image, date);
            }
            
            reader.readAsDataURL(fileInput.files[0]);
            return; // Exit early, will continue in callback
        } else {
            showAlert('Harap pilih file gambar!', 'error');
            return;
        }
    }
    
    saveGalleryItem(title, image, date);
}

// Save news item (helper function)
function saveNewsItem(title, content, image, date) {
    if (title && content && date && image) {
        const newNews = {
            id: newsData.length > 0 ? Math.max(...newsData.map(n => n.id)) + 1 : 1,
            title,
            content,
            image,
            date,
            status: 'published'
        };
        
        newsData.push(newNews);
        localStorage.setItem('schoolNews', JSON.stringify(newsData));
        
        // Close modal and reset form
        const modal = bootstrap.Modal.getInstance(document.getElementById('addNewsModal'));
        modal.hide();
        document.getElementById('addNewsForm').reset();
        document.getElementById('newsUploadPreview').style.display = 'none';
        
        // Reload data
        loadNews();
        loadAdminData();
        
        showAlert('Berita berhasil ditambahkan!', 'success');
    } else {
        showAlert('Harap isi semua field yang diperlukan!', 'error');
    }
}


// Save gallery item (helper function)
function saveGalleryItem(title, image, date) {
    if (title && image && date) {
        const newItem = {
            id: galleryData.length > 0 ? Math.max(...galleryData.map(g => g.id)) + 1 : 1,
            title,
            image,
            date
        };
        
        galleryData.push(newItem);
        localStorage.setItem('schoolGallery', JSON.stringify(galleryData));
        
        // Close modal and reset form
        const modal = bootstrap.Modal.getInstance(document.getElementById('addGalleryModal'));
        modal.hide();
        document.getElementById('addGalleryForm').reset();
        document.getElementById('uploadPreview').style.display = 'none';
        
        // Reload data
        loadGallery();
        loadAdminData();
        
        showAlert('Foto berhasil ditambahkan ke galeri!', 'success');
    } else {
        showAlert('Harap isi semua field yang diperlukan!', 'error');
    }
}

// Edit news function
function editNews(id) {
    const news = newsData.find(n => n.id === id);
    if (news) {
        document.getElementById('editNewsId').value = news.id;
        document.getElementById('editNewsTitle').value = news.title;
        document.getElementById('editNewsContent').value = news.content;

        // Atur input gambar berdasarkan format gambar yang ada
        const editNewsImageSource = document.getElementById('editNewsImageSource');
        const editNewsImageUrl = document.getElementById('editNewsImageUrl');
        const editNewsImageUpload = document.getElementById('editNewsImageUpload');
        const editNewsUploadPreview = document.getElementById('editNewsUploadPreview');

        if (news.image.startsWith('data:image')) {
            // Gambar diunggah (base64)
            editNewsImageSource.value = 'upload';
            editNewsImageUrl.style.display = 'none';
            editNewsImageUpload.style.display = 'block';
            editNewsUploadPreview.src = news.image;
            editNewsUploadPreview.style.display = 'block';
        } else {
            // Gambar dari URL
            editNewsImageSource.value = 'url';
            editNewsImageUrl.value = news.image;
            editNewsImageUrl.style.display = 'block';
            editNewsImageUpload.style.display = 'none';
            editNewsUploadPreview.style.display = 'none';
        }

        document.getElementById('editNewsDate').value = news.date;
        
        const modal = new bootstrap.Modal(document.getElementById('editNewsModal'));
        modal.show();
    }
}

// FUNGSI updateNews YANG SUDAH DIUBAH
function updateNews() {
    const id = parseInt(document.getElementById('editNewsId').value);
    const title = document.getElementById('editNewsTitle').value;
    const content = document.getElementById('editNewsContent').value;
    const source = document.getElementById('editNewsImageSource').value;
    const date = document.getElementById('editNewsDate').value;
    
    let image = '';
    if (source === 'url') {
        image = document.getElementById('editNewsImageUrl').value;
        updateNewsItem(id, title, content, image, date);
    } else {
        const fileInput = document.getElementById('editNewsImageUpload');
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                image = e.target.result;
                updateNewsItem(id, title, content, image, date);
            }
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            // Jika tidak ada file baru diunggah, gunakan gambar yang sudah ada
            const existingNews = newsData.find(n => n.id === id);
            image = existingNews.image;
            updateNewsItem(id, title, content, image, date);
        }
    }
}

function updateNewsItem(id, title, content, image, date) {
    if (title && content && date) {
        const index = newsData.findIndex(n => n.id === id);
        if (index !== -1) {
            newsData[index] = {
                ...newsData[index],
                title,
                content,
                image,
                date
            };
            
            localStorage.setItem('schoolNews', JSON.stringify(newsData));
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('editNewsModal'));
            modal.hide();
            
            // Reload data
            loadNews();
            loadAdminData();
            
            showAlert('Berita berhasil diperbarui!', 'success');
        }
    } else {
        showAlert('Harap isi semua field yang diperlukan!', 'error');
    }
}


// Delete news function
function deleteNews(id) {
    if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
        newsData = newsData.filter(n => n.id !== id);
        localStorage.setItem('schoolNews', JSON.stringify(newsData));
        
        // Reload data
        loadNews();
        loadAdminData();
        
        showAlert('Berita berhasil dihapus!', 'success');
    }
}

// Edit gallery item function
function editGalleryItem(id) {
    const item = galleryData.find(g => g.id === id);
    if (item) {
        document.getElementById('editGalleryId').value = item.id;
        document.getElementById('editGalleryTitle').value = item.title;
        document.getElementById('editGalleryImage').value = item.image;
        document.getElementById('editGalleryDate').value = item.date;
        
        const modal = new bootstrap.Modal(document.getElementById('editGalleryModal'));
        modal.show();
    }
}

// Update gallery item function
function updateGalleryItem() {
    const id = parseInt(document.getElementById('editGalleryId').value);
    const title = document.getElementById('editGalleryTitle').value;
    const image = document.getElementById('editGalleryImage').value;
    const date = document.getElementById('editGalleryDate').value;
    
    if (title && image && date) {
        const index = galleryData.findIndex(g => g.id === id);
        if (index !== -1) {
            galleryData[index] = {
                ...galleryData[index],
                title,
                image,
                date
            };
            
            localStorage.setItem('schoolGallery', JSON.stringify(galleryData));
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('editGalleryModal'));
            modal.hide();
            
            // Reload data
            loadGallery();
            loadAdminData();
            
            showAlert('Foto galeri berhasil diperbarui!', 'success');
        }
    } else {
        showAlert('Harap isi semua field yang diperlukan!', 'error');
    }
}

// Delete gallery item function
function deleteGalleryItem(id) {
    if (confirm('Apakah Anda yakin ingin menghapus foto ini dari galeri?')) {
        galleryData = galleryData.filter(g => g.id !== id);
        localStorage.setItem('schoolGallery', JSON.stringify(galleryData));
        
        // Reload data
        loadGallery();
        loadAdminData();
        
        showAlert('Foto berhasil dihapus dari galeri!', 'success');
    }
}

// FUNGSI saveSettings YANG SUDAH DIUBAH
function saveSettings() {
    // Ambil nilai dari input form
    settingsData.name = document.getElementById('schoolName').value;
    settingsData.address = document.getElementById('schoolAddress').value;
    settingsData.phone = document.getElementById('schoolPhone').value;
    settingsData.email = document.getElementById('schoolEmail').value;
    settingsData.vision = document.getElementById('schoolVision').value;
    settingsData.mission = document.getElementById('schoolMission').value;

    // Simpan data ke localStorage
    localStorage.setItem('schoolSettings', JSON.stringify(settingsData));
    
    // Perbarui tampilan di frontend
    loadSettings();
    
    showAlert('Pengaturan berhasil disimpan!', 'success');
}

// Format date function
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Show alert function
function showAlert(message, type) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to page
    document.body.appendChild(alertDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 5000);
}

// Show reset password modal
function showResetPasswordModal() {
    const resetPasswordModal = new bootstrap.Modal(document.getElementById('resetPasswordModal'));
    resetPasswordModal.show();
    document.getElementById('requestResetForm').style.display = 'block';
    document.getElementById('verifyResetForm').style.display = 'none';
    document.getElementById('resetPhone').value = '';
    document.getElementById('verificationCode').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmNewPassword').value = '';
}

// Request password reset
function requestPasswordReset() {
    const phone = document.getElementById('resetPhone').value;
    const registeredPhone = '0895402357182'; // Nomor HP terdaftar
    
    if (!phone) {
        showAlert('Nomor telepon tidak boleh kosong!', 'error');
        return;
    }
    
    if (phone !== registeredPhone) {
        showAlert('Nomor telepon tidak terdaftar!', 'error');
        return;
    }
    
    // Generate random 6-digit code
    resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // In a real application, this code would be sent via SMS
    // For demo purposes, we'll just show it in an alert
    showAlert(`Kode verifikasi telah dikirim ke ${phone}. Kode: ${resetCode}`, 'success');
    
    document.getElementById('requestResetForm').style.display = 'none';
    document.getElementById('verifyResetForm').style.display = 'block';
}

// Submit password reset
function submitPasswordReset() {
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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        showAlert('Password harus memiliki minimal 8 karakter, termasuk huruf besar, huruf kecil, angka, dan simbol.', 'error');
        return;
    }
    
    // In a real application, this would update the password in the database
    showAlert('Password berhasil direset! Silakan login dengan password baru.', 'success');
    
    const resetPasswordModal = bootstrap.Modal.getInstance(document.getElementById('resetPasswordModal'));
    resetPasswordModal.hide();
    
    // Reset form
    document.getElementById('requestResetForm').style.display = 'block';
    document.getElementById('verifyResetForm').style.display = 'none';
    resetCode = null;
}