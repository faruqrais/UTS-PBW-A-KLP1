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
