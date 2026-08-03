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
