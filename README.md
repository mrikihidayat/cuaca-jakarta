# 🌤️ Prakiraan Cuaca Jakarta

Aplikasi cuaca *multiplatform* (Web, Android, iOS) modern yang menyajikan prakiraan cuaca jam-per-jam dan 7 hari untuk wilayah Jakarta. Aplikasi ini dibangun menggunakan kerangka kerja Ionic dan Vue 3, dioptimalkan untuk kinerja dan pengalaman pengguna yang responsif.

---

## 🌟 Fitur Utama

* **Prakiraan Real-time:** Menampilkan suhu saat ini dan data meteorologi terkini di Jakarta.
* **Prakiraan 24 Jam:** Menyajikan data suhu per jam untuk memantau perubahan cuaca secara detail.
* **Prakiraan 7 Hari:** Menyediakan ringkasan suhu tertinggi dan terendah harian selama seminggu ke depan.
* **Visualisasi Suhu:** Menggunakan indikator visual dan kode warna untuk menunjukkan kondisi suhu (Dingin, Normal, Peringatan, Bahaya) berdasarkan ambang batas yang ditentukan.
* **Metadata Lokasi:** Menampilkan koordinat geografis Jakarta (`-6.2°`, `106.8°`) dan zona waktu (`Asia/Jakarta`).
* **Desain Responsif:** Dibangun dengan Ionic/Vue untuk tampilan dan nuansa aplikasi *native* di berbagai perangkat.

---

## 🛠️ Tumpukan Teknologi

Aplikasi ini adalah proyek **Vue-Vite** Ionic, menggunakan:

* **Framework:** [Vue.js 3](https://vuejs.org/)
* **UI/Komponen Seluler:** [Ionic Framework 8](https://ionicframework.com/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
* **Plugin Multiplatform:** [Capacitor](https://capacitorjs.com/) (dengan integrasi `App`, `Haptics`, `Keyboard`, `StatusBar`).
* **Data Cuaca:** [Open-Meteo API](https://open-meteo.com/).
* **HTTP Client:** [Axios](https://axios-http.com/).
* **Unit Testing:** [Vitest](https://vitest.dev/) & [JSDOM](https://github.com/jsdom/jsdom).
* **E2E Testing:** [Cypress](https://www.cypress.io/).

---

## 🚀 Instalasi dan Mulai Cepat

Untuk menjalankan proyek ini di lingkungan pengembangan Anda, ikuti langkah-langkah berikut:

### Prasyarat

* Node.js (direkomendasikan versi 18 atau 20)
* NPM / Yarn / pnpm (digunakan NPM di proyek ini)
* Ionic CLI (`npm install -g @ionic/cli`)

### Langkah-langkah Setup

1.  **Kloning Repositori:**
    ```bash
    git clone mrikihidayat/cuaca-jakarta.git
    cd cuaca-jakarta
    ```

2.  **Instal Dependensi:**
    ```bash
    npm install
    ```

3.  **Jalankan di Web Browser (Mode Dev):**
    ```bash
    npm run dev
    # Aplikasi akan terbuka di http://localhost:5173/
    ```

### Menjalankan di Android/iOS (Menggunakan Capacitor)

1.  **Tambahkan Platform (jika belum ada):**
    ```bash
    npx cap add android
    # atau
    # npx cap add ios
    ```

2.  **Jalankan dengan Live Reload (Direkomendasikan untuk pengembangan):**
    Gunakan skrip kustom untuk menjalankan di Android dengan *live reload* eksternal:
    ```bash
    npm run android
    # Perintah: ionic capacitor run android -l --external
    ```
    Atau untuk *build* dan *copy* ke Android Studio:
    ```bash
    npm run build
    npx cap open android
    ```

---

## 📋 Skrip NPM

Berikut adalah skrip-skrip yang tersedia di `package.json`:

| Skrip | Perintah | Deskripsi |
| :--- | :--- | :--- |
| `dev` | `vite` | Menjalankan server pengembangan lokal (web). |
| `build` | `vue-tsc && vite build` | Membuat *build* produksi, termasuk pemeriksaan tipe TypeScript. |
| `preview` | `vite preview` | Mempratinjau hasil *build* produksi secara lokal. |
| `test:e2e` | `cypress run` | Menjalankan tes *End-to-End* (E2E) menggunakan Cypress. |
| `test:unit` | `vitest` | Menjalankan tes unit (misalnya, untuk memverifikasi judul aplikasi dan status loading). |
| `lint` | `eslint .` | Melakukan analisis statis kode (linting). |
| `android` | `ionic capacitor run android -l --external` | Menjalankan aplikasi Android dengan *live reload* di jaringan lokal. |

---

## 🎨 Desain dan Icon

* **Icon Aplikasi:** Aplikasi menggunakan icon khusus (Globe dan Buku Terbuka) untuk *launcher* Android dan *splash screen* . File-file icon utama dapat ditemukan di direktori `resources/` dan `android/app/src/main/res/`.
* **Warna Tema:** Tema utama aplikasi menggunakan gradien ungu ke biru (`#667eea` ke `#764ba2`).

---

## 🧑‍💻 Kontributor

Proyek ini dibuat dan dikembangkan oleh:

**M.Riki Hidayat - 044713922**.
