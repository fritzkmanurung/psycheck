document.getElementById('depression-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Mencegah form untuk submit secara default

    // Menangkap nilai input dari form
    const data = {
        input: [
            parseInt(document.getElementById('age').value),                          // Age
            parseInt(document.getElementById('workStudyHours').value),               // Work/Study Hours
            parseInt(document.getElementById('financialStress').value),             // Financial Stress
            parseInt(document.getElementById('gender').value),                      // Gender
            parseInt(document.getElementById('workStudyStatus').value),             // Working Status (Student/Professional)
            parseInt(document.getElementById('sleepDuration').value),               // Sleep Duration
            parseInt(document.getElementById('dietaryHabits').value),               // Dietary Habits
            parseInt(document.getElementById('suicidalThoughts').value),            // Suicidal Thoughts
            parseInt(document.getElementById('familyHistory').value)                // Family History
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

        // Pastikan response dari server valid
        if (!response.ok) {
            throw new Error('Failed to get a valid response from the server');
        }

        // Parse respons JSON
        const result = await response.json();
        console.log(result); // Log the response for debugging

        // Tentukan hasil prediksi
        const prediction = result.prediction === 1 ? "Depression Detected" : "No Depression Detected";

        // Menampilkan hasil prediksi pada halaman
        document.getElementById('result').innerHTML = `
            <div class="alert alert-info">${prediction}</div>
        `;

        // Reset form setelah pengiriman (opsional)
        document.getElementById('depression-form').reset();

    } catch (error) {
        // Menangani error jika request gagal
        console.error('Error:', error);
        document.getElementById('result').innerHTML = `
            <div class="alert alert-danger">Error making prediction. Please try again.</div>
        `;
    }
});
