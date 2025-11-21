# Sistem Manajemen Perpustakaan Sederhana
# Nama  : Anselmus Herpin Hasugian
# NIM   : 123140020
# Kelas : RA
# Praktikum 5 - Python OOP

from abc import ABC, abstractmethod

# --- 1. ABSTRACT CLASS (Konsep Abstraction) ---
class LibraryItem(ABC):
    """
    Abstract Base Class untuk semua item perpustakaan.
    Mewajibkan subclass untuk mengimplementasikan method abstrak.
    """
    def __init__(self, title, item_id):
        # --- 2. ENCAPSULATION (Protected & Private Attributes) ---
        self._title = title          # Protected attribute (bisa diakses subclass)
        self.__item_id = item_id     # Private attribute (hanya bisa diakses class ini)

    # --- 3. PROPERTY DECORATOR (Getter untuk encapsulation) ---
    @property
    def item_id(self):
        """Mengambil ID item (aksesor untuk private attribute)."""
        return self.__item_id

    @property
    def title(self):
        """Mengambil judul item."""
        return self._title

    # Method Abstract (Polymorphism: Subclass WAJIB membuat isinya sendiri)
    @abstractmethod
    def info(self):
        pass

# --- 4. INHERITANCE (Pewarisan) ---
class Book(LibraryItem):
    """Subclass untuk merepresentasikan Buku."""
    def __init__(self, title, item_id, author, genre):
        super().__init__(title, item_id)
        self.author = author
        self.genre = genre

    # Implementasi method abstract (Polymorphism)
    def info(self):
        return f"[Buku] ID: {self.item_id} | Judul: {self.title} | Penulis: {self.author} | Genre: {self.genre}"

class Magazine(LibraryItem):
    """Subclass untuk merepresentasikan Majalah."""
    def __init__(self, title, item_id, issue_number, publisher):
        super().__init__(title, item_id)
        self.issue_number = issue_number
        self.publisher = publisher

    # Implementasi method abstract (Polymorphism)
    def info(self):
        return f"[Majalah] ID: {self.item_id} | Judul: {self.title} | Edisi: {self.issue_number} | Penerbit: {self.publisher}"

# --- Class Library untuk Manajemen ---
class Library:
    """Class untuk mengelola koleksi perpustakaan."""
    def __init__(self):
        self.__items = []  # Private list untuk menyimpan item

    def add_item(self, item):
        """Menambahkan item (Buku/Majalah) ke perpustakaan."""
        if isinstance(item, LibraryItem):
            self.__items.append(item)
            print(f"Berhasil menambahkan: {item.title}")
        else:
            print("Item tidak valid!")

    def show_items(self):
        """Menampilkan semua item yang tersedia."""
        print("\n--- Daftar Koleksi Perpustakaan ---")
        if not self.__items:
            print("Perpustakaan kosong.")
        else:
            for item in self.__items:
                # Polymorphism in action: memanggil .info() yang berbeda tiap objek
                print(item.info())
        print("-----------------------------------")

    def search_item(self, keyword):
        """Mencari item berdasarkan judul atau ID."""
        print(f"\nMencari dengan kata kunci: '{keyword}'...")
        found = False
        for item in self.__items:
            # Mencari kecocokan di title atau item_id
            if keyword.lower() in item.title.lower() or keyword == str(item.item_id):
                print(f"Ditemukan: {item.info()}")
                found = True
        
        if not found:
            print("Item tidak ditemukan.")

# --- MAIN PROGRAM ---
def main():
    # Membuat Objek Perpustakaan
    perpustakaan_itera = Library()

    # Membuat Objek Buku dan Majalah
    buku1 = Book("Belajar Python OOP", 101, "Guido van Rossum", "Edukasi")
    buku2 = Book("Laskar Pelangi", 102, "Andrea Hirata", "Novel")
    majalah1 = Magazine("Tech Asia", 201, "Vol. 55", "Tech Media")

    # Menambahkan item ke library
    print("--- Menambahkan Item ---")
    perpustakaan_itera.add_item(buku1)
    perpustakaan_itera.add_item(buku2)
    perpustakaan_itera.add_item(majalah1)

    # Menampilkan semua item
    perpustakaan_itera.show_items()

    # Mencari item
    perpustakaan_itera.search_item("Python")  # Cari berdasarkan judul
    perpustakaan_itera.search_item("102")     # Cari berdasarkan ID
    perpustakaan_itera.search_item("Komik")   # Item tidak ada

if __name__ == "__main__":
    main()