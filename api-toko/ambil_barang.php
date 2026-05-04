<?php
header('Content-Type: application/json');

$koneksi = new mysqli("localhost", "root", "", "db_toko");

// Ambil semua data barang, urutkan dari yang terbaru (ID terbesar ke terkecil)
$query = "SELECT * FROM tabel_barang ORDER BY id DESC";
$hasil = $koneksi->query($query);

$data_barang = [];

if ($hasil->num_rows > 0) {
    while($baris = $hasil->fetch_assoc()) {
        $data_barang[] = $baris;
    }
}

// Kembalikan dalam bentuk Array JSON
echo json_encode($data_barang);

$koneksi->close();
?>