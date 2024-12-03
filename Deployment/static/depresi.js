document.getElementById('depresi-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Mencegah form untuk submit secara default

    // Menangkap nilai input dari form
    const data = {
        input: [
            parseInt(document.getElementById('age').value),
            parseInt(document.getElementById('workStudyHours').value),
            parseInt(document.getElementById('financialStress').value),
            parseInt(document.getElementById('gender').value),
            parseInt(document.getElementById('workStudyStatus').value),
            parseInt(document.getElementById('sleepDuration').value),
            parseInt(document.getElementById('dietaryHabits').value),
            parseInt(document.getElementById('suicidalThoughts').value),
            parseInt(document.getElementById('familyHistory').value)
        ]
    };

    try {
        // Kirim data ke server
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        const prediction = result.prediction === 1 ? "Depression Detected" : "No Depression Detected";

        // Menampilkan hasil prediksi pada halaman
        document.getElementById('result').innerHTML = `
            <div class="alert alert-info">${prediction}</div>
        `;

        // Reset form setelah pengiriman (opsional)
        document.getElementById('depresi-form').reset();

    } catch (error) {
        // Menangani error jika request gagal
        console.error('Error:', error);
        document.getElementById('result').innerHTML = `
            <div class="alert alert-danger">Error making prediction. Please try again.</div>
        `;
    }
});
