// Memilih semua tombol yang memiliki class "btn-tambah"
const tombolKeranjang = document.querySelectorAll('.btn-tambah');

// Memberikan perintah (event listener) pada setiap tombol
tombolKeranjang.forEach(function(tombol) {
    tombol.addEventListener('click', function() {
        // Mencari nama cupcake dari tag <h4> yang ada di dalam kotak (card) yang sama
        const namaProduk = this.parentElement.querySelector('h4').innerText;
        
        // Memunculkan pop-up notifikasi
        alert("Yay! " + namaProduk + " berhasil ditambahkan ke keranjangmu.");
    });
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