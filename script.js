const tombolkeranjangbaru = document.querySelectorAll('.btn-tambah');

let totalharga = 0;
let daftarBelanja = []; // Ini adalah 'kantong' untuk menyimpan detail barang
let jumlahitem = 0;
let biayatambahan = 0;
let metodepemesanan = 'Dine In';

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

    // Hitung total catatan utama
    jumlahitem += jumlah;
    totalharga += (harga * jumlah);

    // Update tampilan bar bawah
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
