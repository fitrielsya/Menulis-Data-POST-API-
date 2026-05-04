const formTambah = document.getElementById('form-tambah');
const tbodyBarang = document.getElementById('data-barang');

// 1. Fungsi untuk mengambil dan menampilkan data ke tabel
function getBarang() {
    fetch('../api-toko/ambil_barang.php')
    .then(response => response.json())
    .then(data => {
        // Kosongkan isi tabel HTML terlebih dahulu
        tbodyBarang.innerHTML = '';

        // Cek jika database kosong
        if(data.length === 0) {
            tbodyBarang.innerHTML = '<tr><td colspan="2" style="text-align: center;">Belum ada data barang</td></tr>';
            return;
        }

        // Looping data dari database dan masukkan ke tabel HTML
        data.forEach(barang => {
            const barisHTML = `
                <tr>
                    <td>${barang.nama_barang}</td>
                    <td>Rp ${parseInt(barang.harga).toLocaleString('id-ID')}</td>
                </tr>
            `;
            tbodyBarang.innerHTML += barisHTML;
        });
    })
    .catch(error => {
        console.error('Error mengambil data:', error);
        tbodyBarang.innerHTML = '<tr><td colspan="2" style="text-align: center; color: red;">Gagal memuat data</td></tr>';
    });
}

// 2. Event Listener saat form disubmit (Menyimpan data)
formTambah.addEventListener('submit', function(e) {
    // Mencegah browser Reload/Blinking
    e.preventDefault(); 

    // Tangkap data form
    const formData = new FormData(this);

    // Kirim data ke PHP (Koki)
    fetch('../api-toko/tambah_barang.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === "sukses") {
            // Tampilkan notifikasi
            alert(data.pesan);
            
            // Kosongkan form input
            formTambah.reset(); 
            
            // Panggil ulang fungsi getBarang agar tabel langsung terupdate (SPA feeling)
            getBarang();
        } else {
            alert(data.pesan);
        }
    })
    .catch(error => {
        console.error('Terjadi kesalahan API:', error);
        alert('Gagal menyambung ke server.');
    });
});

// 3. Panggil fungsi tampil tabel pertama kali saat web dibuka
getBarang();