document.getElementById('depresi-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Mencegah form untuk submit secara default

    // Menangkap nilai input dari form
    const data = {
        input: []
    };

    const professionType = document.getElementById('workingProfessionalOrStudent').value;
    
    // Ambil nilai dari form student
    if (professionType === 'student') {
        data.input.push(
            parseFloat(document.getElementById('student-age').value),
            parseFloat(document.getElementById('academicPressure').value),
            parseFloat(document.getElementById('cgpa').value),
            parseFloat(document.getElementById('studySatisfaction').value),
            parseFloat(document.getElementById('workStudyHours').value),
            parseFloat(document.getElementById('financialStress').value),
            document.getElementById('student-gender').value,
            document.getElementById('sleepDuration').value,
            document.getElementById('dietaryHabits').value,
            document.getElementById('haveYouEverHadSuicidalThoughts').value,
            document.getElementById('familyHistoryofMentalIllnes').value
        );
    }

    // Ambil nilai dari form working professional
    if (professionType === 'working') {
        data.input.push(
            parseFloat(document.getElementById('working-age').value),
            parseFloat(document.getElementById('workPressure').value),
            parseFloat(document.getElementById('jobSatisfaction').value),
            parseFloat(document.getElementById('workStudyHours').value),
            parseFloat(document.getElementById('financialStress').value),
            document.getElementById('working-gender').value,
            document.getElementById('sleepDuration').value,
            document.getElementById('dietaryHabits').value,
            document.getElementById('haveYouEverHadSuicidalThoughts').value,
            document.getElementById('familyHistoryofMentalIllnes').value
        );
    }

    try {
        // Kirim data ke server
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Menunggu respons dari server
        const result = await response.json();

        // Mengecek hasil prediksi
        const prediction = result.prediction === "Depression Detected" ? "Depression Detected" : "No Depression Detected";

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
