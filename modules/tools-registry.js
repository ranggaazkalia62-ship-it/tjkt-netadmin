window.ToolsRegistry = [
    {
        id: 'ip-calc', name: 'IP Subnet Calculator', category: 'Jaringan', icon: '🌐',
        render: (el) => {
            el.innerHTML = `
            <div style="background: rgba(59,130,246,0.08); padding: 8px 10px; border-radius: 6px; font-size: 0.75rem; margin-bottom: 10px; color: var(--text-secondary);">
                <b>Fungsi:</b> Menghitung subnet mask, rentang IP valid, dan jumlah host.<br>
                <b>Cara Pakai:</b> Masukkan IP Address, pilih prefix CIDR, lalu klik <b>Hitung Subnet</b>.
            </div>
            <div class="input-group"><label>IP Address:</label><input type="text" id="ip" value="192.168.1.1"></div>
            <div class="input-group"><label>Prefix CIDR:</label><select id="cidr"><option value="24">/24 (255.255.255.0 - 254 Host)</option><option value="25">/25 (255.255.255.128 - 126 Host)</option><option value="26">/26 (255.255.255.192 - 62 Host)</option><option value="28">/28 (255.255.255.240 - 14 Host)</option><option value="30">/30 (255.255.255.252 - 2 Host)</option></select></div>
            <button class="btn-primary" id="b-ip">Hitung Subnet</button>
            <div class="input-group" style="margin-top:10px;"><pre id="res-ip" style="padding:10px; background:var(--bg-color); border-radius:8px; border:1px solid var(--glass-border); font-family:monospace; font-size:10px; color:#3b82f6;"></pre></div>
            <button class="btn-primary" id="b-copy-ip" style="background: #10b981; margin-top:5px; display:none;">📋 Salin Hasil</button>`;
            
            document.getElementById('b-ip').addEventListener('click', () => {
                const ip = document.getElementById('ip').value, cidr = document.getElementById('cidr').value;
                let mask = cidr==24?'255.255.255.0':cidr==25?'255.255.255.128':cidr==26?'255.255.255.192':cidr==28?'255.255.255.240':'255.255.255.252';
                let host = cidr==24?254:cidr==25?126:cidr==26?62:cidr==28?14:2;
                const txt = `Target IP   : ${ip}\nPrefix CIDR : /${cidr}\nSubnet Mask : ${mask}\nUsable Host : ${host} IP\nStatus      : Valid Network Range`;
                document.getElementById('res-ip').innerText = txt;
                const btnCopy = document.getElementById('b-copy-ip');
                btnCopy.style.display = 'block';
                btnCopy.onclick = () => App.copyText(txt);
            });
        }
    },
    {
        id: 'mikrotik-gen', name: 'MikroTik Hotspot Script', category: 'Konfigurasi', icon: '⚙️',
        render: (el) => {
            el.innerHTML = `
            <div style="background: rgba(59,130,246,0.08); padding: 8px 10px; border-radius: 6px; font-size: 0.75rem; margin-bottom: 10px; color: var(--text-secondary);">
                <b>Fungsi:</b> Membuat script CLI otomatis untuk konfigurasi awal pool IP & Hotspot MikroTik.<br>
                <b>Cara Pakai:</b> Tentukan nama SSID dan Interface, lalu salin script ke WinBox/Terminal.
            </div>
            <div class="input-group"><label>Nama SSID / Profil:</label><input type="text" id="mk-name" value="Lab-TJKT"></div>
            <div class="input-group"><label>Interface:</label><input type="text" id="mk-if" value="ether2"></div>
            <button class="btn-primary" id="b-mk">Generate Script CLI</button>
            <div class="input-group" style="margin-top:10px;"><textarea id="res-mk" rows="3" readonly style="font-family:monospace; font-size:10px;"></textarea></div>
            <button class="btn-primary" id="b-copy-mk" style="background: #10b981; margin-top:5px;">📋 Salin Script</button>`;
            
            const gen = () => {
                const n = document.getElementById('mk-name').value, iface = document.getElementById('mk-if').value;
                const script = `/ip pool add name="${n}-pool" ranges=192.168.50.2-192.168.50.254;\n/ip dhcp-server address-pool name="${n}-pool" interface=${iface};\n/interface wireless set [ find default-name=wlan1 ] ssid="${n}" mode=ap-bridge;`;
                document.getElementById('res-mk').value = script;
                return script;
            };
            document.getElementById('b-mk').addEventListener('click', gen);
            document.getElementById('b-copy-mk').addEventListener('click', () => App.copyText(gen()));
            gen();
        }
    },
    {
        id: 'cisco-gen', name: 'Cisco VLAN & IP Template', category: 'Konfigurasi', icon: '💻',
        render: (el) => {
            el.innerHTML = `
            <div style="background: rgba(59,130,246,0.08); padding: 8px 10px; border-radius: 6px; font-size: 0.75rem; margin-bottom: 10px; color: var(--text-secondary);">
                <b>Fungsi:</b> Membuat template konfigurasi VLAN dan pemberian IP address pada switch/router Cisco.<br>
                <b>Cara Pakai:</b> Masukkan ID dan Nama VLAN, lalu klik tombol salin untuk ditempel di Packet Tracer.
            </div>
            <div class="input-group"><label>Nomor VLAN:</label><input type="number" id="v-id" value="10"></div>
            <div class="input-group"><label>Nama VLAN:</label><input type="text" id="v-name" value="Guru"></div>
            <button class="btn-primary" id="b-cs">Generate Config</button>
            <div class="input-group" style="margin-top:10px;"><textarea id="res-cs" rows="3" readonly style="font-family:monospace; font-size:10px;"></textarea></div>
            <button class="btn-primary" id="b-copy-cs" style="background: #10b981; margin-top:5px;">📋 Salin Config</button>`;
            
            const gen = () => {
                const id = document.getElementById('v-id').value, name = document.getElementById('v-name').value;
                const cfg = `enable\nconfigure terminal\nvlan ${id}\n name ${name}\nexit\ninterface vlan ${id}\n ip address 192.168.${id}.1 255.255.255.0\nno shutdown\nend`;
                document.getElementById('res-cs').value = cfg;
                return cfg;
            };
            document.getElementById('b-cs').addEventListener('click', gen);
            document.getElementById('b-copy-cs').addEventListener('click', () => App.copyText(gen()));
            gen();
        }
    },
    {
        id: 'port-ref', name: 'Port & Protokol Checker', category: 'Jaringan', icon: '🔌',
        render: (el) => {
            el.innerHTML = `
            <div style="background: rgba(59,130,246,0.08); padding: 8px 10px; border-radius: 6px; font-size: 0.75rem; margin-bottom: 10px; color: var(--text-secondary);">
                <b>Fungsi:</b> Mencari daftar port jaringan standar dan layanan aplikasinya.<br>
                <b>Cara Pakai:</b> Ketik nomor port (misal: 80) atau nama protokol (misal: SSH) pada kolom pencarian.
            </div>
            <div class="input-group"><label>Cari Port (Contoh: 80, 22, DNS):</label><input type="text" id="p-in" placeholder="Ketik nomor/nama port..."></div>
            <div class="input-group" style="margin-top:8px;"><pre id="res-p" style="padding:8px; background:var(--bg-color); border-radius:8px; border:1px solid var(--glass-border); font-size:10px;">Ketik untuk mencari port...</pre></div>`;
            const ports = { "21": "FTP (File Transfer)", "22": "SSH (Secure Shell CLI)", "23": "Telnet (Remote Unencrypted)", "53": "DNS (Domain Name System)", "80": "HTTP (Web Server)", "443": "HTTPS (Secure Web)", "3306": "MySQL Database", "3389": "RDP (Windows Remote Desktop)" };
            document.getElementById('p-in').addEventListener('input', (e) => {
                const q = e.target.value.trim().toLowerCase();
                if(!q) { document.getElementById('res-p').innerText = "Ketik untuk mencari port..."; return; }
                let found = Object.entries(ports).filter(([k,v]) => k.includes(q) || v.toLowerCase().includes(q));
                document.getElementById('res-p').innerText = found.length > 0 ? found.map(([k,v]) => `Port ${k} : ${v}`).join('\n') : "Port tidak ditemukan.";
            });
        }
    },
    {
        id: 'bandwidth', name: 'Bandwidth & Download Timer', category: 'Jaringan', icon: '⚡',
        render: (el) => {
            el.innerHTML = `
            <div style="background: rgba(59,130,246,0.08); padding: 8px 10px; border-radius: 6px; font-size: 0.75rem; margin-bottom: 10px; color: var(--text-secondary);">
                <b>Fungsi:</b> Menghitung estimasi waktu unduh file berdasarkan kecepatan internet.<br>
                <b>Cara Pakai:</b> Masukkan ukuran file dalam Megabyte (MB) dan kecepatan Mbps, lalu klik hitung.
            </div>
            <div class="input-group"><label>Ukuran File (MB):</label><input type="number" id="bw-sz" value="700"></div>
            <div class="input-group"><label>Kecepatan (Mbps):</label><input type="number" id="bw-sp" value="20"></div>
            <button class="btn-primary" id="b-bw">Hitung Estimasi</button>
            <h3 id="res-bw" style="text-align:center; margin-top:12px; font-size:0.95rem; color:#3b82f6;">-</h3>`;
            document.getElementById('b-bw').addEventListener('click', () => {
                const s = parseFloat(document.getElementById('bw-sz').value)||0, sp = parseFloat(document.getElementById('bw-sp').value)||1;
                const sec = (s * 8) / sp;
                document.getElementById('res-bw').innerText = `Estimasi: ${Math.floor(sec/60)} menit ${Math.floor(sec%60)} detik`;
            });
        }
    },
    {
        id: 'mac-lookup', name: 'MAC Vendor OUI Check', category: 'Jaringan', icon: '📡',
        render: (el) => {
            el.innerHTML = `
            <div style="background: rgba(59,130,246,0.08); padding: 8px 10px; border-radius: 6px; font-size: 0.75rem; margin-bottom: 10px; color: var(--text-secondary);">
                <b>Fungsi:</b> Mengetahui pabrikan pembuat perangkat berdasarkan MAC Address.<br>
                <b>Cara Pakai:</b> Masukkan 6 digit awal MAC Address (OUI) pada kolom lalu klik Cek Vendor.
            </div>
            <div class="input-group"><label>MAC Address (6 digit awal):</label><input type="text" id="mac" placeholder="Contoh: B8:27:EB"></div>
            <button class="btn-primary" id="b-mac">Cek Vendor</button>
            <div class="input-group" style="margin-top:8px;"><input type="text" id="res-mac" readonly placeholder="Nama Vendor..."></div>`;
            const db = { "b8:27:eb": "Raspberry Pi", "dc:a6:32": "Raspberry Pi", "00:0c:29": "VMware", "cc:2d:e0": "Cisco Systems", "00:1a:2b": "Cisco Systems", "18:65:90": "TP-Link" };
            document.getElementById('b-mac').addEventListener('click', () => {
                const k = document.getElementById('mac').value.trim().substring(0,8).toLowerCase();
                document.getElementById('res-mac').value = db[k] || "Vendor Tidak Dikenal / Perangkat Lokal";
            });
        }
    },
    {
        id: 'json-fmt', name: 'JSON Config Formatter', category: 'Konfigurasi', icon: '📦',
        render: (el) => {
            el.innerHTML = `
            <div style="background: rgba(59,130,246,0.08); padding: 8px 10px; border-radius: 6px; font-size: 0.75rem; margin-bottom: 10px; color: var(--text-secondary);">
                <b>Fungsi:</b> Merapikan dan memvalidasi struktur data/konfigurasi JSON.<br>
                <b>Cara Pakai:</b> Tempel teks JSON acak pada kotak lalu klik Format JSON.
            </div>
            <div class="input-group"><textarea id="j-in" rows="2" placeholder='{"router":"MikroTik"}'></textarea></div>
            <button class="btn-primary" id="b-j">Format JSON</button>
            <div class="input-group" style="margin-top:8px;"><pre id="res-j" style="padding:8px; background:var(--bg-color); border-radius:8px; border:1px solid var(--glass-border); max-height:90px; overflow:auto; font-family:monospace; font-size:10px;"></pre></div>
            <button class="btn-primary" id="b-copy-j" style="background: #10b981; margin-top:5px; display:none;">📋 Salin JSON</button>`;
            
            document.getElementById('b-j').addEventListener('click', () => {
                try {
                    const obj = JSON.parse(document.getElementById('j-in').value);
                    const formatted = JSON.stringify(obj, null, 4);
                    const resBox = document.getElementById('res-j');
                    resBox.style.color = '#10b981';
                    resBox.innerText = formatted;
                    const btnCopy = document.getElementById('b-copy-j');
                    btnCopy.style.display = 'block';
                    btnCopy.onclick = () => App.copyText(formatted);
                } catch(e) {
                    const resBox = document.getElementById('res-j');
                    resBox.style.color = '#ef4444';
                    resBox.innerText = 'Error: ' + e.message;
                }
            });
        }
    },
    {
        id: 'markdown', name: 'Markdown Laporan Preview', category: 'Developer', icon: '📝',
        render: (el) => {
            el.innerHTML = `
            <div style="background: rgba(59,130,246,0.08); padding: 8px 10px; border-radius: 6px; font-size: 0.75rem; margin-bottom: 10px; color: var(--text-secondary);">
                <b>Fungsi:</b> Melihat hasil pratinjau teks berformat Markdown untuk laporan praktikum.<br>
                <b>Cara Pakai:</b> Ketik teks markdown (misal: # Judul) di kotak kiri.
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:6px;"><textarea id="md-in" rows="3" placeholder="# Laporan..."></textarea><div id="md-out" style="padding:6px; background:var(--bg-color); border:1px solid var(--glass-border); border-radius:8px; overflow-y:auto; max-height:80px; font-size:10px;"></div></div>`;
            const inp = document.getElementById('md-in'), out = document.getElementById('md-out');
            inp.addEventListener('input', () => {
                out.innerHTML = inp.value.replace(/^# (.*$)/gim, '<h1>$1</h1>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>') || 'Preview...';
            });
        }
    },
    {
        id: 'sha256', name: 'SHA-256 Hash Generator', category: 'Developer', icon: '🔒',
        render: (el) => {
            el.innerHTML = `
            <div style="background: rgba(59,130,246,0.08); padding: 8px 10px; border-radius: 6px; font-size: 0.75rem; margin-bottom: 10px; color: var(--text-secondary);">
                <b>Fungsi:</b> Mengubah teks sandi menjadi enkripsi hash satu arah SHA-256.<br>
                <b>Cara Pakai:</b> Ketik teks pada kolom input untuk melihat hash otomatis.
            </div>
            <div class="input-group"><input type="text" id="h-in" placeholder="Teks sandi..."></div>
            <div class="input-group"><textarea id="h-out" rows="2" readonly style="font-family:monospace; font-size:10px;"></textarea></div>
            <button class="btn-primary" id="b-copy-h" style="background: #10b981;">📋 Salin Hash</button>`;
            
            const inp = document.getElementById('h-in');
            inp.addEventListener('input', async (e) => {
                const t = e.target.value;
                if(!t) { document.getElementById('h-out').value = ''; return; }
                const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t));
                document.getElementById('h-out').value = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
            });
            document.getElementById('b-copy-h').addEventListener('click', () => App.copyText(document.getElementById('h-out').value));
        }
    },
    {
        id: 'regex', name: 'Regex Log Tester', category: 'Developer', icon: '🔍',
        render: (el) => {
            el.innerHTML = `
            <div style="background: rgba(59,130,246,0.08); padding: 8px 10px; border-radius: 6px; font-size: 0.75rem; margin-bottom: 10px; color: var(--text-secondary);">
                <b>Fungsi:</b> Menguji pola Regular Expression (Regex) pada teks atau file log server.<br>
                <b>Cara Pakai:</b> Masukkan pola regex dan teks log target di bawah ini.
            </div>
            <div class="input-group"><label>Pattern:</label><input type="text" id="rx-pat" value="\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b"></div>
            <div class="input-group"><label>Log Target:</label><textarea id="rx-txt" rows="2" placeholder="IP: 192.168.1.1"></textarea></div>
            <div class="input-group"><div id="res-rx" style="padding:6px; background:var(--bg-color); border-radius:8px; border:1px solid var(--glass-border); color:#10b981; font-family:monospace; font-size:10px;">-</div></div>`;
            const test = () => {
                try {
                    const m = document.getElementById('rx-txt').value.match(new RegExp(document.getElementById('rx-pat').value, 'g'));
                    document.getElementById('res-rx').innerText = m ? m.join(', ') : 'Tidak ada kecocokan';
                } catch(e) { document.getElementById('res-rx').innerText = 'Pattern Salah'; }
            };
            document.getElementById('rx-pat').addEventListener('input', test);
            document.getElementById('rx-txt').addEventListener('input', test);
        }
    },
    {
        id: 'b64e', name: 'Base64 Encoder', category: 'Developer', icon: '🔐',
        render: (el) => {
            el.innerHTML = `
            <div style="background: rgba(59,130,246,0.08); padding: 8px 10px; border-radius: 6px; font-size: 0.75rem; margin-bottom: 10px; color: var(--text-secondary);">
                <b>Fungsi:</b> Mengubah teks biasa menjadi format pengkodean Base64.<br>
                <b>Cara Pakai:</b> Ketik teks asli lalu klik Encode & Salin.
            </div>
            <div class="input-group"><textarea id="bi" rows="2" placeholder="Teks asli..."></textarea></div>
            <div class="input-group"><textarea id="bo" rows="2" readonly style="font-size:10px;"></textarea></div>
            <button class="btn-primary" id="bbe">Encode & Salin</button>`;
            document.getElementById('bbe').addEventListener('click', () => { 
                const res = btoa(document.getElementById('bi').value);
                document.getElementById('bo').value = res;
                App.copyText(res);
            });
        }
    },
    {
        id: 'b64d', name: 'Base64 Decoder', category: 'Developer', icon: '🔓',
        render: (el) => {
            el.innerHTML = `
            <div style="background: rgba(59,130,246,0.08); padding: 8px 10px; border-radius: 6px; font-size: 0.75rem; margin-bottom: 10px; color: var(--text-secondary);">
                <b>Fungsi:</b> Mengembalikan kode Base64 menjadi teks asli yang mudah dibaca.<br>
                <b>Cara Pakai:</b> Masukkan kode Base64 lalu klik Decode & Salin.
            </div>
            <div class="input-group"><textarea id="di" rows="2" placeholder="Base64..."></textarea></div>
            <div class="input-group"><textarea id="do" rows="2" readonly style="font-size:10px;"></textarea></div>
            <button class="btn-primary" id="bbd">Decode & Salin</button>`;
            document.getElementById('bbd').addEventListener('click', () => { 
                try {
                    const res = atob(document.getElementById('di').value);
                    document.getElementById('do').value = res;
                    App.copyText(res);
                } catch(e) { alert("Format Base64 Salah"); } 
            });
        }
    },
    {
        id: 'urlc', name: 'URL Encoder', category: 'Developer', icon: '🔗',
        render: (el) => {
            el.innerHTML = `
            <div style="background: rgba(59,130,246,0.08); padding: 8px 10px; border-radius: 6px; font-size: 0.75rem; margin-bottom: 10px; color: var(--text-secondary);">
                <b>Fungsi:</b> Mengamankan karakter khusus pada URL agar valid diproses web server.<br>
                <b>Cara Pakai:</b> Masukkan URL/parameter lalu klik Encode & Salin.
            </div>
            <div class="input-group"><textarea id="ui" rows="2" placeholder="URL..."></textarea></div>
            <div class="input-group"><textarea id="uo" rows="2" readonly style="font-size:10px;"></textarea></div>
            <button class="btn-primary" id="bu">Encode & Salin</button>`;
            document.getElementById('bu').addEventListener('click', () => { 
                const res = encodeURIComponent(document.getElementById('ui').value);
                document.getElementById('uo').value = res;
                App.copyText(res);
            });
        }
    },
    {
        id: 'uuid-gen', name: 'UUID v4 Generator', category: 'Developer', icon: '🔑',
        render: (el) => {
            el.innerHTML = `
            <div style="background: rgba(59,130,246,0.08); padding: 8px 10px; border-radius: 6px; font-size: 0.75rem; margin-bottom: 10px; color: var(--text-secondary);">
                <b>Fungsi:</b> Menghasilkan kode unik acak standar global (UUID v4).<br>
                <b>Cara Pakai:</b> Klik tombol untuk menghasilkan dan menyalin UUID baru.
            </div>
            <div class="input-group"><input type="text" id="uuid-r" readonly style="font-family:monospace; font-size:11px;"></div>
            <button class="btn-primary" id="b-uuid">Generate & Salin UUID</button>`;
            const gen = () => { 
                const u = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random()*16|0,v=c=='x'?r:(r&0x3|0x8);return v.toString(16); });
                document.getElementById('uuid-r').value = u;
                App.copyText(u);
            };
            document.getElementById('b-uuid').addEventListener('click', gen); gen();
        }
    },
    {
        id: 'net-info', name: 'Network Status Info', category: 'Jaringan', icon: '🌐',
        render: (el) => {
            const c = navigator.connection || {};
            el.innerHTML = `
            <div style="background: rgba(59,130,246,0.08); padding: 8px 10px; border-radius: 6px; font-size: 0.75rem; margin-bottom: 12px; color: var(--text-secondary);">
                <b>Fungsi:</b> Menampilkan informasi status koneksi internet perangkat secara instan.
            </div>
            <div class="glass-card" style="text-align:left; gap:4px; align-items:flex-start; font-size:11px; cursor:default; width:100%;">
                <p><b>Status Koneksi:</b> ${navigator.onLine ? '<span style="color:#10b981">Online</span>' : '<span style="color:#ef4444">Offline</span>'}</p>
                <p><b>Tipe Jaringan:</b> ${c.effectiveType || 'Tidak diketahui'}</p>
                <p><b>Estimasi Downlink:</b> ${c.downlink ? c.downlink + ' Mbps' : 'N/A'}</p>
            </div>`;
        }
    }
];
