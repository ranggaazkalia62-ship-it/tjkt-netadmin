// --- Fitur Dark/Light Mode Toggle ---
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Otomatis terapkan tema terakhir saat halaman dibuka
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }
});

// --- Fitur Fungsional: IP Subnet Calculator Sederhana ---
function hitungSubnet() {
    let cidr = prompt("Masukkan CIDR Prefix (contoh ketik: 24, 25, 26, 27, atau 28):");
    if (!cidr) return;
    
    let mask, totalHost;
    switch (cidr.trim()) {
        case "24":
            mask = "255.255.255.0";
            totalHost = "254 Host";
            break;
        case "25":
            mask = "255.255.255.128";
            totalHost = "126 Host";
            break;
        case "26":
            mask = "255.255.255.192";
            totalHost = "62 Host";
            break;
        case "27":
            mask = "255.255.255.224";
            totalHost = "30 Host";
            break;
        case "28":
            mask = "255.255.255.240";
            totalHost = "14 Host";
            break;
        default:
            mask = "Subnet Custom /" + cidr;
            totalHost = "Cek kalkulasi standar";
    }
    
    alert("Hasil Kalkulasi Subnet (/" + cidr + "):\n- Subnet Mask: " + mask + "\n- Total Host Usable: " + totalHost);
}
// --- 1. Fitur Pencarian & Local Storage ---
const searchInput = document.querySelector('input[type="text"]');
const toolCards = document.querySelectorAll('.card'); // Pastikan kelas kartu tool di HTML kamu menggunakan .card atau sesuaikan

if (searchInput) {
    // Ambil riwayat pencarian terakhir dari Local Storage
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
        searchInput.value = lastSearch;
        filterTools(lastSearch);
    }

    // Jalankan pencarian saat mengetik & simpan ke Local Storage
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        localStorage.setItem('lastSearch', keyword);
        filterTools(keyword);
    });
}

function filterTools(keyword) {
    toolCards.forEach(card => {
        const title = card.innerText.toLowerCase();
        if (title.includes(keyword)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// --- 2. Fitur Fungsional: Base64 Encoder / Decoder ---
function bukaBase64Tool() {
    let pilihan = prompt("Pilih mode:\n1. Encode (Ubah ke Base64)\n2. Decode (Ubah dari Base64)\n(Ketik angka 1 atau 2)");
    
    if (pilihan === "1") {
        let teks = prompt("Masukkan teks yang mau di-encode:");
        if (teks) {
            let hasil = btoa(teks);
            alert("Hasil Encode:\n" + hasil);
            localStorage.setItem('lastBase64Result', hasil);
        }
    } else if (pilihan === "2") {
        let teks = prompt("Masukkan kode Base64 yang mau di-decode:");
        if (teks) {
            try {
                let hasil = atob(teks);
                alert("Hasil Decode:\n" + hasil);
                localStorage.setItem('lastBase64Result', hasil);
            } catch (e) {
                alert("Format Base64 tidak valid!");
            }
        }
    }
}
function sapaPengguna() {
    const teks = document.getElementById("pesan");
    teks.innerHTML = "Asyik! Website kamu sekarang sudah interaktif dan keren! 🚀";
}
const App = {
    currentCategory: 'All',
    searchQuery: '',
    init: () => {
        App.renderHub();
        document.getElementById('themeToggle').addEventListener('click', () => {
            const h = document.documentElement;
            const next = h.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            h.setAttribute('data-theme', next);
        });
    },
    renderHub: () => {
        const categories = ['All', 'Jaringan', 'Konfigurasi', 'Developer'];
        const filtered = window.ToolsRegistry.filter(t => {
            const matchCat = App.currentCategory === 'All' || t.category === App.currentCategory;
            const matchSearch = t.name.toLowerCase().includes(App.searchQuery.toLowerCase()) || t.category.toLowerCase().includes(App.searchQuery.toLowerCase());
            return matchCat && matchSearch;
        });

        document.getElementById('viewContainer').innerHTML = `
            <div style="margin-bottom: 15px;">
                <h2 style="font-size: 1.25rem; margin-bottom: 3px;">TJKT NetAdmin Hub</h2>
                <p style="color: var(--text-secondary); font-size: 0.8rem;">15 Pro Tools Jaringan & Sistem dengan Panduan Praktikum.</p>
            </div>
            
            <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); padding: 10px 12px; border-radius: 8px; margin-bottom: 15px; font-size: 0.78rem; color: var(--text-primary); line-height: 1.4;">
                <b>💡 Tips:</b> Pilih tool sesuai kebutuhan praktikum. Setiap tool sudah dilengkapi penjelasan fungsi dan cara pakai di dalamnya.
            </div>

            <div style="margin-bottom: 15px; display: flex; flex-direction: column; gap: 8px;">
                <input type="text" id="searchInput" placeholder="🔍 Cari tool (contoh: Subnet, MikroTik, VLAN)..." value="${App.searchQuery}" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--glass-border); background: var(--bg-color); color: var(--text-primary); outline: none; font-size: 0.85rem;">
                <div style="display: flex; gap: 5px; overflow-x: auto; padding-bottom: 2px;">
                    ${categories.map(cat => `
                        <button onclick="App.setCategory('${cat}')" style="padding: 5px 12px; border-radius: 6px; border: 1px solid ${App.currentCategory === cat ? 'var(--primary)' : 'var(--glass-border)'}; background: ${App.currentCategory === cat ? 'var(--primary)' : 'var(--glass-bg)'}; color: ${App.currentCategory === cat ? '#fff' : 'var(--text-primary)'}; font-size: 0.75rem; cursor: pointer; white-space: nowrap;">${cat}</button>
                    `).join('')}
                </div>
            </div>

            <div class="tools-grid">
                ${filtered.length > 0 ? filtered.map(t => `
                    <div class="glass-card" onclick="App.openTool('${t.id}')">
                        <div class="icon">${t.icon}</div>
                        <div>
                            <h4>${t.name}</h4>
                            <small>${t.category}</small>
                        </div>
                    </div>
                `).join('') : '<p style="grid-column: span 2; text-align:center; color: var(--text-secondary); padding: 20px; font-size:0.85rem;">Tool tidak ditemukan...</p>'}
            </div>
        `;

        document.getElementById('searchInput').addEventListener('input', (e) => {
            App.searchQuery = e.target.value;
            App.renderHub();
        });
    },
    setCategory: (cat) => {
        App.currentCategory = cat;
        App.renderHub();
    },
    openTool: (id) => {
        const t = window.ToolsRegistry.find(x => x.id === id);
        if(!t) return;
        document.getElementById('viewContainer').innerHTML = `
            <button class="btn-primary" style="width: auto; margin-bottom: 15px; padding: 6px 12px; font-size: 0.8rem;" onclick="App.renderHub()">← Kembali ke Menu</button>
            <div class="tool-ui">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px; border-bottom: 1px solid var(--glass-border); padding-bottom: 10px;">
                    <span style="font-size: 1.4rem; background: rgba(59,130,246,0.1); padding: 5px; border-radius: 6px;">${t.icon}</span>
                    <div>
                        <h2 style="font-size: 1rem;">${t.name}</h2>
                        <small style="color: var(--text-secondary); font-size: 0.70rem;">Kategori: ${t.category}</small>
                    </div>
                </div>
                <div id="tool-canvas"></div>
            </div>
        `;
        t.render(document.getElementById('tool-canvas'));
    },
    copyText: (text) => {
        navigator.clipboard.writeText(text).then(() => {
            let toast = document.createElement('div');
            toast.innerText = '📋 Berhasil disalin ke Clipboard!';
            toast.style.cssText = 'position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: #10b981; color: #fff; padding: 8px 16px; border-radius: 8px; font-size: 0.8rem; z-index: 1000; box-shadow: 0 4px 12px rgba(0,0,0,0.3);';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
        });
    }
};
window.onload = App.init;
