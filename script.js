const tombolkeranjangbaru = document.querySelectorAll('.btn-tambah');

let totalharga = 0;
let daftarBelanja = []; // Ini adalah 'kantong' untuk menyimpan detail barang
let jumlahitem = 0;
let biayatambahan = 0;
let metodepemesanan = 'Dine In';
let metodepembayaran = 'Cash';

const modalProduk = document.getElementById('modal-produk');
const tutupModalProduk = document.querySelector('.tutup-modal-produk');
const gambarModal = document.getElementById('modal-gambar');
const namaModal = document.getElementById('modal-nama');
const hargaTotalModal = document.getElementById('modal-harga-total');
const btnKurang = document.getElementById('btn-kurang');
const btnTambah = document.getElementById('btn-tambah');
const angkaJumlah = document.getElementById('angka-jumlah');

let hargaPerItemSekarang = 0;
let jumlahPilihanSekarang = 1;

tombolkeranjangbaru.forEach(function(tombol) {
    tombol.addEventListener('click', function(e) {
        e.preventDefault(); 
        
        const card = this.parentElement;
        const namaProduk = card.querySelector('h4').innerText;
        const teksHarga = card.querySelector('.harga').innerText;
        const hargaAngka = parseInt(teksHarga.replace(/[^0-9]/g, ''));
        
        const sumberGambar = card.querySelector('img').src;

        jumlahPilihanSekarang = 1;
        hargaPerItemSekarang = hargaAngka;

        gambarModal.src = sumberGambar;
        namaModal.innerText = namaProduk;
        angkaJumlah.innerText = jumlahPilihanSekarang;
        hargaTotalModal.innerText = (hargaPerItemSekarang * jumlahPilihanSekarang).toLocaleString('id-ID');

        modalProduk.style.display = 'flex';
    });
});

tutupModalProduk.addEventListener('click', function() {
    modalProduk.style.display = 'none';
});

btnTambah.addEventListener('click', function() {
    jumlahPilihanSekarang++;
    angkaJumlah.innerText = jumlahPilihanSekarang;
    hargaTotalModal.innerText = (hargaPerItemSekarang * jumlahPilihanSekarang).toLocaleString('id-ID');
});

btnKurang.addEventListener('click', function() {
    if (jumlahPilihanSekarang > 1) { 
        jumlahPilihanSekarang--;
        angkaJumlah.innerText = jumlahPilihanSekarang;
        hargaTotalModal.innerText = (hargaPerItemSekarang * jumlahPilihanSekarang).toLocaleString('id-ID');
    }
});

const btnMasukKeranjang = document.getElementById('btn-masuk-keranjang');
const barKeranjangBawah = document.getElementById('bar-keranjang-bawah');
const barJumlahBarang = document.getElementById('bar-jumlah-barang');
const barTotalHarga = document.getElementById('bar-total-harga');

btnMasukKeranjang.addEventListener('click', function() {
    const namaProduk = namaModal.innerText;
    const harga = hargaPerItemSekarang;
    const jumlah = jumlahPilihanSekarang;
    const gambar = gambarModal.src;

    // Cek apakah barang sudah ada di keranjang
    const indexAda = daftarBelanja.findIndex(item => item.nama === namaProduk);

    if (indexAda > -1) {
        daftarBelanja[indexAda].jumlah += jumlah;
    } else {
        daftarBelanja.push({ nama: namaProduk, harga: harga, jumlah: jumlah, gambar: gambar });
    }

    jumlahitem += jumlah;
    totalharga += (harga * jumlah);

    barJumlahBarang.innerText = `${jumlahitem} BARANG`;
    barTotalHarga.innerText = `Rp ${totalharga.toLocaleString('id-ID')}`;
    barKeranjangBawah.classList.add('bar-bawah-tampil');

    modalProduk.style.display = 'none';
});


const areaScroll = document.querySelector('.grid');
const cards = document.querySelectorAll('.card');

const aturanCCTV = {
    root: null,
    threshold: 0.5 
};

const pemantau = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fokus');
        } else {
            entry.target.classList.remove('fokus');
        }
    });
}, aturanCCTV);

cards.forEach(card => {
    pemantau.observe(card);
});

const btnLogin = document.getElementById('btn-login');
const modalLogin = document.getElementById('modal-login');
const btnTutup = document.getElementById('btn-tutup');
const tempatFrom = document.getElementById('tempat-form');

btnLogin.addEventListener('click', function(e) {
    e.preventDefault();
    modalLogin.style.display = 'flex';
    fetch('login.html')
    .then(response => {
        if (!response.ok) throw new Error('Gagal memuat form login');
        return response.text();
    })
    .then(data => {
        tempatFrom.innerHTML = data;
        aturTombolTukar();
    })
    .catch(error => {
        tempatFrom.innerHTML = '<p style="text-align: center;"> Gagal memuat form login</p>';
        
    });

});

btnTutup.addEventListener('click', function() {
    modalLogin.style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target === modalLogin) {
        modalLogin.style.display = 'none';
    }
});
function aturTombolTukar() {
    const fromLogin = document.querySelector('.login-container');
    const judulLogin = document.querySelector('.login');
    const fromRegister = document.querySelector('.register');
    const linkDaftar = document.getElementById('link-daftar');
    const linkMasuk = document.getElementById('link-masuk');

    if(linkDaftar && linkMasuk) {
        linkDaftar.addEventListener('click', function(e) {
            e.preventDefault();
            fromLogin.style.display = 'none';
            judulLogin.style.display = 'none';
            fromRegister.style.display = 'block';
        });

        linkMasuk.addEventListener('click', function(e) {
            e.preventDefault();
            fromRegister.style.display = 'none';
            fromLogin.style.display = 'block';
            judulLogin.style.display = 'block';
        });
    }
}

const kapsul = document.querySelector('.slider-aktif');

const tombolMenu = document.querySelectorAll('.nav-menu-item');
tombolMenu.forEach(function(tombol) {
    tombol.addEventListener('click', function(e) {
        e.preventDefault();
        const lebarTombol = this.offsetWidth;
        const tinggiTombol = this.offsetHeight;
        const posisiKiri = this.offsetLeft;
        const posisiAtas = this.offsetTop;

        kapsul.style.width = lebarTombol + 'px';
        kapsul.style.height = tinggiTombol + 'px';
        kapsul.style.left = posisiKiri + 'px';
        kapsul.style.top = posisiAtas + 'px';


        tombolMenu.forEach(function(item) {
            item.classList.remove('aktif');
        });
        this.classList.add('aktif');

        const filterKategori = this.getAttribute('data-filter');

        cards.forEach(card => {
            if(card.getAttribute('data-kategori') === filterKategori) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
            });
    });
});

const menuAwal = document.querySelector('.nav-menu-item.aktif');
if (menuAwal) {
    kapsul.style.width = menuAwal.offsetWidth + 'px';
    kapsul.style.height = menuAwal.offsetHeight + 'px';
    kapsul.style.left = menuAwal.offsetLeft + 'px';
    kapsul.style.top = menuAwal.offsetTop + 'px';

    menuAwal.click();
}

// --- FASE 3: LOGIKA KERANJANG BESAR ---
const modalKeranjang = document.getElementById('modal-keranjang');
const btnKembali = document.getElementById('btn-kembali');
const isiKeranjangList = document.getElementById('isi-keranjang-list');
const jumlahItemAtas = document.getElementById('jumlah-item-atas');
const subtotalAngka = document.getElementById('subtotal-angka');
const totalAkhirAngka = document.getElementById('total-akhir-angka');

barKeranjangBawah.addEventListener('click', function() {
    modalKeranjang.style.display = 'flex';
    updateTampilanKeranjang(); 
});

btnKembali.addEventListener('click', function() {
    modalKeranjang.style.display = 'none';
});

function updateTampilanKeranjang() {
    
    jumlahItemAtas.innerText = `${jumlahitem} BARANG`;
    
    const hargaFormatted = `Rp ${totalharga.toLocaleString('id-ID')}`;
    subtotalAngka.innerText = hargaFormatted;
    totalAkhirAngka.innerText = hargaFormatted;

}

function updateTampilanKeranjang() {
    jumlahItemAtas.innerText = `${jumlahitem} BARANG`;
    isiKeranjangList.innerHTML = ''; 

    daftarBelanja.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'item-keranjang';
        div.innerHTML = `
            <img src="${item.gambar}" class="img-item">
            <div class="detail-item">
                <h4>${item.nama}</h4>
                <p>Rp ${item.harga.toLocaleString('id-ID')}</p>
                <div class="kontrol-item">
                    <button class="btn-kecil" onclick="ubahJumlahKeranjang(${index}, -1)">-</button>
                    <span>${item.jumlah}</span>
                    <button class="btn-kecil" onclick="ubahJumlahKeranjang(${index}, 1)">+</button>
                </div>
            </div>
            <div class="harga-item-kanan">
                <span>Rp ${(item.harga * item.jumlah).toLocaleString('id-ID')}</span>
                <button class="btn-hapus" onclick="hapusItem(${index})">🗑️</button>
            </div>
        `;
        isiKeranjangList.appendChild(div);
    });
    const rowbungkus = document.getElementById('row-biaya-bungkus');

    if(metodepemesanan === 'Take Away') {
        biayatambahan = 2000;
        if(rowbungkus) rowbungkus.style.display = 'flex';
    } else {
        biayatambahan = 0;
        if(rowbungkus) rowbungkus.style.display = 'none';
    }

    const totalakhir = totalharga + biayatambahan;

    subtotalAngka.innerText = `Rp ${totalharga.toLocaleString('id-ID')}`;
    totalAkhirAngka.innerText = `Rp ${totalakhir.toLocaleString('id-ID')}`;
}

// Fungsi Tambah/Kurang di dalam keranjang
window.ubahJumlahKeranjang = function(index, delta) {
    if (daftarBelanja[index].jumlah + delta > 0) {
        daftarBelanja[index].jumlah += delta;
        
        jumlahitem += delta;
        totalharga += (daftarBelanja[index].harga * delta);
        
        barJumlahBarang.innerText = `${jumlahitem} BARANG`;
        barTotalHarga.innerText = `Rp ${totalharga.toLocaleString('id-ID')}`;
        updateTampilanKeranjang();
    }
};

// Fungsi Hapus barang
window.hapusItem = function(index) {
    const item = daftarBelanja[index];
    jumlahitem -= item.jumlah;
    totalharga -= (item.harga * item.jumlah);
    
    daftarBelanja.splice(index, 1); 
    
    if (daftarBelanja.length === 0) {
        barKeranjangBawah.classList.remove('bar-bawah-tampil');
        modalKeranjang.style.display = 'none';
    }
    
    barJumlahBarang.innerText = `${jumlahitem} BARANG`;
    barTotalHarga.innerText = `Rp ${totalharga.toLocaleString('id-ID')}`;
    updateTampilanKeranjang();
};

//--- LOGIKA TOGGLE TAKE AWAY ---
document.addEventListener('click', function(e) {
    const target = e.target.closest('.container-opsi-metode .tombol-opsi');
    if (target) {
        const semuaOpsi = document.querySelectorAll('.container-opsi-metode .tombol-opsi');
        semuaOpsi.forEach(btn => btn.classList.remove('aktif'));
        target.classList.add('aktif');

        console.log("ID yang terdeteksi:", target.id);

        if (target.id === 'btn-take-away') {
            metodepemesanan = "Take Away";
            biayatambahan = 2000;
        } else {
            metodepemesanan = "Dine In";
            biayatambahan = 0;
        }   

        console.log("Metode final:", metodepemesanan);

        updateTampilanKeranjang();
    } 
});

// --- BAGIAN CHECKOUT ---
document.querySelectorAll('input[name="metode-bayar"]').forEach(input => {
    input.addEventListener('click', function() {
    
    if (this.checked) {
        metodepembayaran = this.id === 'btn-bayar-Qris' ? 'Qris' : 'Cash';
        console.log("Metode pembayaran dipilih:", metodepembayaran);
    }
});
});

function bukaModalCheckout() {
    const kontainerItemStruk = document.getElementById('daftar-item-struk');
    const inputCatatan = document.querySelector('.input-catatan')?.value || "-";

    kontainerItemStruk.innerHTML = ""; 
    
    // 1. Tampilkan barang-barang
    daftarBelanja.forEach(item => {
        kontainerItemStruk.innerHTML += `
            <p style="display: flex; justify-content: space-between; margin: 5px 0;">
                <span>${item.nama} x${item.jumlah}</span>
                <span>Rp ${(item.harga * item.jumlah).toLocaleString('id-ID')}</span>
            </p>`;
    });

    // TAMBAH BIAYA TAKE AWAY
    if (metodepemesanan === 'Take Away') {
        kontainerItemStruk.innerHTML += `
            <p style="display: flex; justify-content: space-between; color: #e67e22; font-style: italic; border-top: 1px dashed #ddd; padding-top: 5px;">
                <span>Biaya Bungkus</span>
                <span>Rp 2.000</span>
            </p>`;
    }

    document.getElementById('struk-metode-pesan').innerText = metodepemesanan;
    document.getElementById('struk-metode-bayar').innerText = metodepembayaran;
    document.getElementById('struk-catatan').innerText = inputCatatan;
    
    const totalFinal = totalharga + biayatambahan;
    document.getElementById('struk-total-harga').innerText = `Rp ${totalFinal.toLocaleString('id-ID')}`;

    document.getElementById('modal-struk').style.display = 'flex';
}

function tutupModal() {
    document.getElementById('modal-struk').style.display = 'none';
}
