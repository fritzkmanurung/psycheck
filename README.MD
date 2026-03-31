<div align="center">
  <img src="Document/img/hero-banner.png" alt="PsyCheck Mental Health Hero Banner" width="100%">
  
  <br>
  
  # **PsyCheck: Modern Mental Health Detection**
  
  [![Python](https://img.shields.io/badge/Python-3.x-blue.svg)](https://www.python.org/)
  [![XGBoost](https://img.shields.io/badge/XGBoost-2.1.3-brightgreen.svg)](https://xgboost.readthedocs.io/)
  [![Flask](https://img.shields.io/badge/Flask-Web_-lightgray.svg)](https://flask.palletsprojects.com/)
  [![Aesthetic](https://img.shields.io/badge/Design-Sage_Green_Premium-8CA38D.svg)](#)
  
  Sistem cerdas berbasis **CRISP-DM** untuk deteksi dini risiko depresi dengan antarmuka modern, interaktif, dan premium.
</div>

---

## 🆕 **Pembaruan Utama (Major Updates)**
Proyek ini telah melalui fase **Revitalisasi Total** untuk meningkatkan fungsionalitas dan pengalaman pengguna:

- 🚀 **Konsolidasi Arsitektur:** Migrasi dari 15+ file HTML yang terfragmentasi menjadi satu sistem **Single-Template** yang efisien dan cepat (Depresi.html).
- 🎨 **Revolusi Visual:** Transformasi total ke tema **Sage Green Premium** dengan desain minimalis yang menenangkan.
- 🖼️ **Sistem Ilustrasi Kustom:** Penempatan 11+ ilustrasi vektor unik yang menggabungkan estetika modern dengan sentuhan **Humor** untuk mengurangi stigma saat mengisi survei.
- 🧠 **Smart Logic Upgrade:** Peningkatan algoritma menggunakan **XGBoost Probability Analysis** yang memberikan hasil dinamis (Risiko Rendah, Sedang, hingga Tinggi).

---

## **1. Business Understanding**
### 🎯 **Objektif Bisnis**
Kesehatan mental adalah prioritas global. Proyek ini bertujuan untuk mengenali **faktor utama risiko depresi** berdasarkan pola kebiasaan individu, jam kerja/belajar, stres finansial, dan riwayat keluarga. Solusi ini dirancang sebagai alat bantu deteksi awal yang intuitif dan tidak intimidatif.

---

## **2. Data Understanding**
### 📊 **Deskripsi Dataset**
Dataset diperoleh dari survei anonim dengan fokus pada orang dewasa. Terdiri dari **141.000 baris data latih** dan **20 variabel** kunci, termasuk:
- **Kebiasaan:** Durasi Tidur, Pola Makan.
- **Tekanan:** Tekanan Akademik/Kerja, Stres Finansial.
- **Kesehatan Mental:** Pikiran Bunuh Diri, Riwayat Keluarga.

---

## **3. Modelling & Evaluation**
Setelah mengevaluasi berbagai algoritma (NN, Random Forest, XGBoost), **XGBoost** dipilih sebagai model produksi karena akurasinya yang superior dalam menangani interaksi fitur tak linear.

---

## **4. Deployment**
Model diintegrasikan ke dalam aplikasi web **Flask** interaktif yang memproses input pengguna secara *real-time*.

### 💻 Tampilan Aplikasi Baru
<div align="center">
  <img src="Document/img/app-screenshot.png" alt="Aplikasi PsyCheck Baru" width="85%">
</div>

---

## 🛠️ **Instruksi Menjalankan Proyek**

### **Persyaratan Sistem**
* Python 3.9+
* Browser Modern (Chrome/Edge/Firefox)

### **Langkah Instalasi**
1. **Masuk ke folder proyek:**
   ```bash
   cd Project-Data-Mining-Explore-Mental-Health
   ```
2. **Aktifkan Virtual Environment:**
   ```powershell
   # Windows
   .\venv\Scripts\activate
   ```
3. **Instal Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

### **Menjalankan Aplikasi**
1. **Masuk ke folder Deployment:**
   ```bash
   cd Deployment
   ```
2. **Jalankan server:**
   ```bash
   python app.py
   ```
3. **Akses alamat:** 👉 `http://127.0.0.1:8080/`

---
<div align="center">
  <p><i>Dikembangkan dengan pendekatan CRISP-DM & Estetika Modern Minimalis.</i></p>
</div>
