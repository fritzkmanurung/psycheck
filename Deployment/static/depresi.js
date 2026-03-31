document.getElementById('depression-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Menangkap nilai input dari form
    const data = {
        input: [
            Number(document.getElementById('gender').value),
            Number(document.getElementById('age').value),
            Number(document.getElementById('workingOrStudent').value),
            Number(document.getElementById('sleepDuration').value),
            Number(document.getElementById('dietaryHabits').value),
            Number(document.getElementById('suicidalThoughts').value),
            Number(document.getElementById('workStudyHours').value),
            Number(document.getElementById('financialStress').value),
            Number(document.getElementById('familyHistory').value),
            Number(document.getElementById('jobStudySatisfaction').value),
            Number(document.getElementById('workAcademicPressure').value),
        ]
    };

    // Sembunyikan animasi berjalan & tampilkan loading
    const walkingAnimation = document.getElementById('walking-animation');
    if (walkingAnimation) walkingAnimation.style.display = 'none';

    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<div class="alert alert-info"><i class="fas fa-spinner fa-spin"></i> Sedang menganalisis data Anda...</div>`;
    }

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to get a valid response from the server');
        }

        const result = await response.json();

        // Tentukan hasil prediksi berdasarkan probabilitas
        let probValue = result.probability !== undefined ? result.probability : result.prediction;
        let score = Math.round(probValue * 100);
        let predictionText = "";
        let alertClass = "";
        let emoji = "";
        let tips = [];

        if (probValue >= 0.70) {
            emoji = "🔴";
            alertClass = "alert-danger";
            predictionText = `Indikasi Depresi Kuat (${score}%)`;
            tips = [
                "Sangat disarankan untuk segera berkonsultasi dengan profesional kesehatan mental.",
                "Kurangi beban kerja atau akademik secara bertahap.",
                "Bicarakan perasaan Anda dengan orang yang Anda percaya.",
                "Hubungi layanan bantuan kesehatan mental: <strong>119 ext. 8</strong>"
            ];
        } else if (probValue >= 0.40) {
            emoji = "🟡";
            alertClass = "alert-warning";
            predictionText = `Indikasi Stres Sedang (${score}%)`;
            tips = [
                "Jaga pola tidur yang teratur (7-8 jam per malam).",
                "Luangkan waktu untuk aktivitas yang Anda nikmati.",
                "Pertimbangkan untuk berbicara dengan konselor jika tekanan berlanjut.",
                "Olahraga ringan 30 menit sehari dapat membantu mengurangi stres."
            ];
        } else {
            emoji = "🟢";
            alertClass = "alert-success";
            predictionText = `Kondisi Mental Stabil (${score}%)`;
            tips = [
                "Teruslah pertahankan gaya hidup sehat Anda!",
                "Tetap jaga keseimbangan antara kerja dan istirahat.",
                "Luangkan waktu untuk bersosialisasi dengan orang terdekat.",
                "Rutinkan olahraga dan konsumsi makanan bergizi."
            ];
        }

        // Bangun tips list
        let tipsHtml = tips.map(t => `<li>${t}</li>`).join('');

        resultDiv.innerHTML = `
            <div class="alert ${alertClass}" style="text-align: left;">
                <h5 style="text-align: center; margin-bottom: 12px;">${emoji} <strong>${predictionText}</strong></h5>
                <hr>
                <p style="font-weight: 600; margin-bottom: 8px;">💡 Saran untuk Anda:</p>
                <ul style="padding-left: 20px; margin-bottom: 0;">${tipsHtml}</ul>
            </div>
        `;

        // ——— UI: Sembunyikan form, tampilkan pesan terima kasih ———
        const form = document.getElementById('depression-form');
        form.style.transition = 'opacity 0.5s ease';
        form.style.opacity = '0';

        setTimeout(() => {
            form.style.display = 'none';

            // Hapus progress bar & title
            const progressEl = document.getElementById('progress-container');
            const titleEl = document.getElementById('titlecard');
            if (progressEl) progressEl.remove();
            if (titleEl) titleEl.remove();

            // Tampilkan halaman "terima kasih" yang lebih hidup
            const cardBody = form.closest('.card-body');
            const thankYou = document.createElement('div');
            thankYou.id = 'thank-you-section';
            thankYou.style.cssText = 'text-align: center; animation: fadeInStep 0.5s ease-out forwards;';
            thankYou.innerHTML = `
                <div style="font-size: 4rem; margin-bottom: 16px;">🌿</div>
                <h3 style="color: var(--sage-dark); font-weight: 700; margin-bottom: 10px;">Terima kasih telah mengisi formulir!</h3>
                <p style="color: var(--text-muted); line-height: 1.7; max-width: 400px; margin: 0 auto 24px;">
                    Data Anda telah berhasil dianalisis oleh model <em>Machine Learning</em> kami. 
                    Silakan lihat hasil prediksi pada kartu di sebelah kanan.
                </p>
                <div style="background: var(--sage-light); border-radius: 12px; padding: 16px; margin-bottom: 24px; border: 1px solid var(--sand-beige);">
                    <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted);">
                        ⚠️ <em>Disclaimer: Hasil ini bersifat prediksi awal berbasis data dan <strong>bukan diagnosis medis</strong>. 
                        Untuk evaluasi resmi, silakan konsultasikan dengan tenaga profesional.</em>
                    </p>
                </div>
                <button class="btn btn-primary" onclick="window.location.href='/'">
                    <i class="fas fa-redo-alt" style="margin-right: 8px;"></i> Isi Formulir Lagi
                </button>
            `;
            cardBody.appendChild(thankYou);
        }, 500);

    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = `
            <div class="alert alert-danger">
                <strong>Terjadi kesalahan.</strong><br>Gagal mendapatkan prediksi dari server. Silakan coba lagi.
            </div>
        `;
    }
});
