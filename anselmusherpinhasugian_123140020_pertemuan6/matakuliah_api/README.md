# Aplikasi Manajemen Matakuliah (Pyramid Framework)

**Nama:** Anselmus Herpin Hasugian
**NIM:** 123140020
**Kelas:** RA

## Deskripsi Proyek
Aplikasi API sederhana berbasis Pyramid Framework dan PostgreSQL untuk mengelola data matakuliah (CRUD).

## Cara Instalasi & Menjalankan

1.  **Aktifkan Virtual Environment:**
    ```bash
    source ../venv/bin/activate  # atau .\..\venv\Scripts\activate di Windows
    ```
2.  **Install Dependencies:**
    ```bash
    pip install -e .
    ```
3.  **Konfigurasi Database:**
    Pastikan `development.ini` pada bagian `sqlalchemy.url` sudah sesuai dengan kredensial PostgreSQL Anda.
4.  **Migrasi Database:**
    ```bash
    alembic -c development.ini upgrade head
    ```
5.  **Jalankan Server:**
    ```bash
    pserve development.ini
    ```

## API Endpoints

### 1. Get All Matakuliah
Mengambil semua data matakuliah.
* **URL:** `/api/matakuliah`
* **Method:** `GET`
* **Response:**
    ```json
    {
        "matakuliahs": [
            {
                "id": 1,
                "kode_mk": "IF101",
                "nama_mk": "Pemrograman Web",
                "sks": 3,
                "semester": 4
            }
        ]
    }
    ```

### 2. Get One Matakuliah
Mengambil detail satu matakuliah berdasarkan ID.
* **URL:** `/api/matakuliah/{id}`
* **Method:** `GET`
* **Contoh Request:** `/api/matakuliah/1`
* **Response:**
    ```json
    {
        "id": 1,
        "kode_mk": "IF101",
        "nama_mk": "Pemrograman Web",
        "sks": 3,
        "semester": 4
    }
    ```

### 3. Add Matakuliah
Menambahkan matakuliah baru.
* **URL:** `/api/matakuliah`
* **Method:** `POST`
* **Body (JSON):**
    ```json
    {
        "kode_mk": "IF202",
        "nama_mk": "Sistem Operasi",
        "sks": 3,
        "semester": 4
    }
    ```
* **Response:**
    ```json
    {
        "message": "Success",
        "data": { ... }
    }
    ```

### 4. Update Matakuliah
Mengupdate data matakuliah yang sudah ada.
* **URL:** `/api/matakuliah/{id}`
* **Method:** `PUT`
* **Body (JSON):**
    ```json
    {
        "nama_mk": "Sistem Operasi Lanjut",
        "sks": 4
    }
    ```
* **Response:**
    ```json
    {
        "message": "Updated",
        "data": { ... }
    }
    ```

### 5. Delete Matakuliah
Menghapus data matakuliah.
* **URL:** `/api/matakuliah/{id}`
* **Method:** `DELETE`
* **Response:**
    ```json
    {
        "message": "Deleted"
    }
    ```

## Testing (CURL)
Contoh perintah untuk menambah data:
```bash
curl -X POST http://localhost:6543/api/matakuliah -H "Content-Type: application/json" -d "{\"kode_mk\": \"IF101\", \"nama_mk\": \"Pemrograman Web\", \"sks\": 3, \"semester\": 4}"