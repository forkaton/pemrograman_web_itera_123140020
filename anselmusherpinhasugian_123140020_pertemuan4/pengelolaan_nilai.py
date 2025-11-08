# Program Pengelolaan Data Nilai Mahasiswa
# Nama  : Anselmus Herpin Hasugian
# NIM   : 123140020
# Kelas : RA
# Praktikum 4 - Pengembangan Web

# 1. Struktur Data Awal
# List berisi 5 dictionary data mahasiswa
data_mahasiswa = [
    {
        'nama': 'Budi Santoso',
        'nim': '123140001',
        'nilai_uts': 80,
        'nilai_uas': 85,
        'nilai_tugas': 90
    },
    {
        'nama': 'Citra Lestari',
        'nim': '123140002',
        'nilai_uts': 70,
        'nilai_uas': 75,
        'nilai_tugas': 80
    },
    {
        'nama': 'Doni Firmansyah',
        'nim': '123140003',
        'nilai_uts': 50,
        'nilai_uas': 55,
        'nilai_tugas': 60
    },
    {
        'nama': 'Eka Putri',
        'nim': '123140004',
        'nilai_uts': 90,
        'nilai_uas': 95,
        'nilai_tugas': 100
    },
    {
        'nama': 'Fajar Nugroho',
        'nim': '123140005',
        'nilai_uts': 65,
        'nilai_uas': 70,
        'nilai_tugas': 70
    }
]

# 2. Fungsi-Fungsi yang Diperlukan

def hitung_nilai_akhir(uts, uas, tugas):
    """Menghitung nilai akhir berdasarkan bobot."""
    return (0.30 * uts) + (0.40 * uas) + (0.30 * tugas)

def tentukan_grade(nilai_akhir):
    """Menentukan grade berdasarkan nilai akhir."""
    if nilai_akhir >= 80:
        return 'A'
    elif nilai_akhir >= 70:
        return 'B'
    elif nilai_akhir >= 60:
        return 'C'
    elif nilai_akhir >= 50:
        return 'D'
    else:
        return 'E'

def proses_data_mahasiswa(data_list):
    """Mengolah data awal untuk menambahkan nilai akhir dan grade."""
    for mhs in data_list:
        mhs['nilai_akhir'] = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        mhs['grade'] = tentukan_grade(mhs['nilai_akhir'])

def tampilkan_data(data_list):
    """Menampilkan data mahasiswa dalam format tabel."""
    if not data_list:
        print("Tidak ada data untuk ditampilkan.")
        return

    print("\n" + "=" * 82)
    print(f"| {'No':<3} | {'Nama':<25} | {'NIM':<10} | {'UTS':>5} | {'UAS':>5} | {'Tugas':>5} | {'Akhir':>6} | {'Grade':>5} |")
    print("=" * 82)
    
    for i, mhs in enumerate(data_list, 1):
        print(f"| {i:<3} | {mhs['nama']:<25} | {mhs['nim']:<10} | {mhs['nilai_uts']:>5} | {mhs['nilai_uas']:>5} | {mhs['nilai_tugas']:>5} | {mhs['nilai_akhir']:>6.2f} | {mhs['grade']:>5} |")
    
    print("-" * 82)

def cari_nilai_tertinggi(data_list):
    """Mencari mahasiswa dengan nilai akhir tertinggi."""
    if not data_list:
        print("Data kosong.")
        return
    
    tertinggi = max(data_list, key=lambda mhs: mhs['nilai_akhir'])
    print("\nMahasiswa dengan nilai tertinggi:")
    print(f"Nama: {tertinggi['nama']} (NIM: {tertinggi['nim']}) - Nilai Akhir: {tertinggi['nilai_akhir']:.2f} (Grade: {tertinggi['grade']})")

def cari_nilai_terendah(data_list):
    """Mencari mahasiswa dengan nilai akhir terendah."""
    if not data_list:
        print("Data kosong.")
        return
        
    terendah = min(data_list, key=lambda mhs: mhs['nilai_akhir'])
    print("\nMahasiswa dengan nilai terendah:")
    print(f"Nama: {terendah['nama']} (NIM: {terendah['nim']}) - Nilai Akhir: {terendah['nilai_akhir']:.2f} (Grade: {terendah['grade']})")

# 3. Fungsi Fitur Tambahan

def input_data_baru(data_list):
    """Memasukkan data mahasiswa baru dari input pengguna."""
    print("\nMasukkan Data Mahasiswa Baru:")
    nama = input("Nama: ")
    nim = input("NIM: ")
    
    # Validasi input nilai
    while True:
        try:
            nilai_uts = float(input("Nilai UTS: "))
            nilai_uas = float(input("Nilai UAS: "))
            nilai_tugas = float(input("Nilai Tugas: "))
            break
        except ValueError:
            print("Input nilai tidak valid. Harap masukkan angka.")

    # Hitung nilai akhir dan grade
    nilai_akhir = hitung_nilai_akhir(nilai_uts, nilai_uas, nilai_tugas)
    grade = tentukan_grade(nilai_akhir)
    
    # Tambahkan ke list
    data_list.append({
        'nama': nama,
        'nim': nim,
        'nilai_uts': nilai_uts,
        'nilai_uas': nilai_uas,
        'nilai_tugas': nilai_tugas,
        'nilai_akhir': nilai_akhir,
        'grade': grade
    })
    print(f"Data mahasiswa {nama} berhasil ditambahkan.")

def filter_mahasiswa_by_grade(data_list):
    """Menampilkan mahasiswa berdasarkan filter grade."""
    grade_input = input("Masukkan Grade yang ingin difilter (A/B/C/D/E): ").upper()
    if grade_input not in ['A', 'B', 'C', 'D', 'E']:
        print("Grade tidak valid.")
        return
        
    filtered_list = [mhs for mhs in data_list if mhs['grade'] == grade_input]
    
    if filtered_list:
        print(f"\nDaftar Mahasiswa dengan Grade {grade_input}:")
        tampilkan_data(filtered_list)
    else:
        print(f"Tidak ada mahasiswa dengan grade {grade_input}.")

def hitung_rata_rata_kelas(data_list):
    """Menghitung rata-rata nilai akhir seluruh kelas."""
    if not data_list:
        print("Data kosong.")
        return
        
    total_nilai = sum(mhs['nilai_akhir'] for mhs in data_list)
    rata_rata = total_nilai / len(data_list)
    print(f"\nRata-rata nilai akhir kelas: {rata_rata:.2f}")

# 4. Fungsi Utama (Main Menu)
def main():
    """Fungsi utama untuk menjalankan program."""
    # Proses data awal saat program pertama kali berjalan
    proses_data_mahasiswa(data_mahasiswa)
    
    while True:
        print("\n--- Program Pengelolaan Data Nilai Mahasiswa ---")
        print("1. Tampilkan Data Mahasiswa")
        print("2. Tambah Data Mahasiswa")
        print("3. Cari Nilai Tertinggi")
        print("4. Cari Nilai Terendah")
        print("5. Filter Mahasiswa Berdasarkan Grade")
        print("6. Hitung Rata-rata Nilai Kelas")
        print("7. Keluar")
        
        pilihan = input("Masukkan pilihan Anda (1-7): ")
        
        if pilihan == '1':
            tampilkan_data(data_mahasiswa)
        elif pilihan == '2':
            input_data_baru(data_mahasiswa)
        elif pilihan == '3':
            cari_nilai_tertinggi(data_mahasiswa)
        elif pilihan == '4':
            cari_nilai_terendah(data_mahasiswa)
        elif pilihan == '5':
            filter_mahasiswa_by_grade(data_mahasiswa)
        elif pilihan == '6':
            hitung_rata_rata_kelas(data_mahasiswa)
        elif pilihan == '7':
            print("Terima kasih telah menggunakan program ini. Sampai jumpa!")
            break
        else:
            print("Pilihan tidak valid. Silakan masukkan angka 1-7.")

# 5. Eksekusi Program
if __name__ == "__main__":
    main()