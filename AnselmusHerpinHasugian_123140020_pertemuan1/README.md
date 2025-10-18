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

## Cara menjalankan Aplikasi 
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


