<?php
header('Content-Type: application/json');

// Koneksi ke Database
$koneksi = new mysqli("localhost", "root", "", "db_toko");

if ($koneksi->connect_error) {
    die(json_encode(["status" => "gagal", "pesan" => "Koneksi database gagal!"]));
}

// Tangkap data dari POST
$nama_barang = isset($_POST['nama_barang']) ? $_POST['nama_barang'] : '';
$harga       = isset($_POST['harga']) ? $_POST['harga'] : 0;

// Keamanan dasar mencegah SQL Injection
$nama_barang = $koneksi->real_escape_string($nama_barang);
$harga       = (int)$harga;

// Query Simpan ke Database
$query = "INSERT INTO tabel_barang (nama_barang, harga) VALUES ('$nama_barang', $harga)";

if ($koneksi->query($query) === TRUE) {
    echo json_encode([
        "status" => "sukses",
        "pesan"  => "Barang '$nama_barang' berhasil disimpan ke database!"
    ]);
} else {
    echo json_encode([
        "status" => "gagal",
        "pesan"  => "Gagal menyimpan data: " . $koneksi->error
    ]);
}

$koneksi->close();
?>