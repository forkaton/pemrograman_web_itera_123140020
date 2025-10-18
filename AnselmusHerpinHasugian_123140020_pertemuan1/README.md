# Manajemen Tugas Mahasiswa

Aplikasi web sederhana untuk membantu mahasiswa mengelola tugas akademik.
Tema: Neon (ungu), interaktif, dan menyimpan data secara lokal menggunakan `localStorage`.

## Fitur singkat
- Tambah tugas baru (Nama tugas, Mata Kuliah, Deadline (DD/MM/YYYY))
- Edit tugas
- Tandai tugas selesai / belum selesai
- Hapus tugas
- Pencarian teks (pada nama tugas & mata kuliah)
- Filter berdasarkan status (Semua / Belum Selesai / Selesai)
- Filter berdasarkan Mata Kuliah (dropdown terisi otomatis dari data)
- Menampilkan jumlah tugas yang belum selesai
- Validasi form: nama dan mata kuliah wajib, deadline harus berformat `DD/MM/YYYY`, tanggal valid dan tidak boleh sebelum hari ini
- Persistensi data menggunakan `localStorage`

## Screenshot
> Catatan: tambahkan tiga screenshot di folder `screenshots/` (atau letakkan gambar di repository). Berikut adalah placeholder yang bisa Anda ganti:

1. screenshots/list-and-form.png — menampilkan form input dan daftar tugas
2. screenshots/edit-task.png — menampilkan mode edit (form terisi) dan tombol simpan
3. screenshots/filters-and-stats.png — menampilkan filter status, filter mata kuliah, dan statistik tugas belum selesai

(Simpan file gambar ke folder `screenshots/` dengan nama di atas agar README menampilkan gambar)

## Cara menjalankan
1. Pastikan Anda memiliki browser modern (Chrome, Firefox, Edge).
2. Buka folder proyek: `d:\Pengweb_RA_Ansel\AnselmusHerpinHasugian_123140020_pertemuan1`
3. Buka file `index.html` di browser (double-click atau klik kanan → Open with > browser).
4. Interaksi:
	 - Isi Nama Tugas, Mata Kuliah, dan Deadline (DD/MM/YYYY) lalu klik "➕ Tambah Tugas".
	 - Gunakan tombol ✏️ untuk mengedit, ✅/↩️ untuk toggle selesai, 🗑️ untuk menghapus.
	 - Gunakan kotak pencarian dan dropdown filter untuk menyaring tugas.

## Struktur file
- `index.html` — markup utama, form input, filter, dan container daftar tugas
- `style.css` — styling (tema neon ungu, layout responsif, animasi kecil)
- `script.js` — logika aplikasi: CRUD tasks, localStorage, validasi, filter, render

## Implementasi teknis
### Penyimpanan data (localStorage)
- Data tugas disimpan dalam array `tasks` di memori.
- Saat aplikasi mulai, data dimuat dari localStorage:
```js
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
```
- Setelah setiap perubahan (create, update, toggle, delete), data disimpan kembali:
```js
function saveTasks() {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}
```
- Untuk memudahkan sorting berdasarkan tanggal, setiap tugas menyimpan properti `isoDate` (format `YYYY-MM-DD`) yang dihasilkan dari input `DD/MM/YYYY`.
- Ada fungsi migrasi (`migrateTasksIfNeeded`) yang memastikan data lama tetap kompatibel (menambahkan `courseNormalized` dan `isoDate` bila perlu).

### Validasi form
- Validasi dilakukan sebelum menyimpan data:
	- `taskName` tidak boleh kosong
	- `courseName` tidak boleh kosong
	- Deadline harus ada dan berformat `DD/MM/YYYY`
	- Tanggal harus valid (mis. 31/02 tidak valid)
	- Deadline tidak boleh berada di masa lalu (harus >= hari ini)
- Validasi ada di `validateTaskInput(name, course, deadline)` di `script.js`. Jika gagal, aplikasi menampilkan `alert()` dengan pesan validasi.

## Pengujian singkat
- Tambah tugas valid → muncul di daftar dan tersimpan di `localStorage`.
- Edit tugas → perubahan tersimpan.
- Toggle selesai dan delete → berfungsi dan memperbarui penyimpanan.
- Filter dan pencarian → menampilkan subset tugas sesuai kriteria.

## Catatan & rekomendasi
- Dropdown Mata Kuliah dinormalisasi (case-insensitive) untuk menghindari duplikat karena kapitalisasi. Namun data asli tetap disimpan di properti `course`.
- Jika Anda ingin pesan validasi tampil lebih halus (bukan `alert`), saya bisa ganti menjadi notifikasi in-page.
- Jika Anda butuh sorting tambahan (mis. sort by deadline/name/status), saya bisa menambah kontrol UI.

---
Jika Anda mau, saya bisa menambahkan file `screenshots/` dengan contoh gambar (perlu Anda sediakan screenshot dari browser), atau saya bisa mengganti `alert` menjadi notifikasi di halaman. Mana yang mau saya bantu selanjutnya?