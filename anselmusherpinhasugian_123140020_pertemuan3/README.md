# Aplikasi Manajemen Buku Pribadi (Praktikum React Dasar)

Aplikasi web berbasis React untuk mencatat koleksi buku pribadi dengan tema Neon Ungu. Dibuat untuk praktikum mata kuliah Pemrograman Aplikasi Web.

## ✏️ Identitas Penyusun

* **Nama:** [Anselmus Herpin Hasugian]
* **NIM:** [123140020]
* **Kelas:** [RB]

---

## 📸 Screenshot Aplikasi

### Halaman Utama (Beranda)
![Screenshot Halaman Home](link_ke_screenshot_home.png)
*(Deskripsi: Halaman utama menampilkan form tambah buku, filter, pencarian, dan daftar buku yang tersimpan.)*

### Halaman Statistik
![Screenshot Halaman Statistik](link_ke_screenshot_stats.png)
*(Deskripsi: Halaman statistik menampilkan jumlah total buku berdasarkan statusnya.)*

---

## 🚀 Instruksi Instalasi dan Menjalankan

1.  Clone repository ini.
2.  Masuk ke folder praktikum:
    ```bash
    cd anselmusherpinhasugian_123140020_pertemuan3
    ```
3.  Instal dependencies:
    ```bash
    npm install
    ```
4.  Jalankan aplikasi:
    ```bash
    npm start
    ```
5.  Buka `http://localhost:3000` di browser Anda.

---

## 🛠️ Penjelasan Fitur React yang Digunakan

* **Component-Based:** Aplikasi dipecah menjadi komponen reusable (Navbar, BookForm, BookList, BookItem, BookControls, StatCard).
* **useState:** Digunakan untuk mengelola state lokal di komponen (contoh: input di `BookForm`).
* **useEffect:** Digunakan di dalam custom hook `useLocalStorage` untuk sinkronisasi state dengan Local Storage.
* **Context API:** Digunakan (`BookContext`) untuk state management global, menampung daftar buku, fungsi CRUD, dan state filter/pencarian.
* **React Router:** Digunakan (`react-router-dom`) untuk navigasi multi-halaman antara `/` (Beranda) dan `/stats` (Statistik).
* **Custom Hooks:**
    1.  `useLocalStorage`: Hook kustom untuk abstraksi logika baca/tulis ke Local Storage secara otomatis.
    2.  `useBookStats`: Hook kustom untuk mengkalkulasi data statistik buku yang ditampilkan di halaman Stats.
* **Error Handling:** Diterapkan di `BookForm` untuk validasi input kosong sebelum *submit*.

---

## 🧪 Laporan Testing

Semua 5 test unit berhasil lolos. Tes ini mencakup rendering Navbar, *error handling* form, tampilan list kosong, dan rendering *search bar*.

![Screenshot Hasil Test](link_ke_screenshot_test.png)
*(Deskripsi: Hasil `npm test` menunjukkan 5 tes berhasil (passed).)*