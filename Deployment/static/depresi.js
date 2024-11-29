let currentQuestionIndex = 0;
let occupation = "";
let gender = "";
let userAnswers = [];

const studentQuestions = [
    { question: "Anda kuliah dimana?", type: "input" },
    { question: "Dimana tempat tinggal anda?", type: "input" },
    { question: "Berapa Usia anda?", type: "input" },
    { question: "Berapa IPK anda?", type: "input" },
    { 
        question: "Seberapa sering Anda merasa tidak termotivasi untuk menghadiri kelas atau menyelesaikan tugas-tugas kuliah?", 
        type: "choice",
        options: ["a. Tidak pernah", "b. Kadang-kadang", "c. Sering", "d. Hampir setiap hari"]
    },
    { 
        question: "Apakah Anda merasa cemas atau tertekan tentang hasil akademik Anda?", 
        type: "choice",
        options: ["a. Tidak pernah", "b. Jarang", "c. Sering", "d. Selalu"]
    },
    { 
        question: "Seberapa sering Anda merasa lelah bahkan setelah tidur yang cukup?", 
        type: "choice",
        options: ["a. Tidak pernah", "b. Jarang", "c. Sering", "d. Selalu"]
    },
    { 
        question: "Apakah Anda merasa kesulitan untuk berkonsentrasi selama perkuliahan atau saat belajar?", 
        type: "choice",
        options: ["a. Tidak pernah", "b. Jarang", "c. Sering", "d. Hampir setiap kali"]
    },
    { 
        question: "Seberapa sering Anda merasa sedih atau tidak bergairah tanpa alasan yang jelas?", 
        type: "choice",
        options: ["a. Tidak pernah", "b. Kadang-kadang", "c. Sering", "d. Hampir setiap hari"]
    }
];

const workerQuestions = [
    { question: "Apa pekerjaan anda?", type: "input" },
    { question: "Berapa gaji anda?", type: "input" },
    { question: "Berapa jam anda tidur setiap harinya?", type: "input" },
    { 
        question: "Seberapa sering Anda merasa terbebani dengan tugas pekerjaan sehingga memengaruhi suasana hati Anda?", 
        type: "choice",
        options: ["a. Tidak pernah", "b. Jarang", "c. Sering", "d. Hampir setiap hari"]
    },
    { 
        question: "Apakah Anda merasa tidak puas dengan pencapaian Anda di tempat kerja?", 
        type: "choice",
        options: ["a. Tidak pernah", "b. Jarang", "c. Sering", "d. Hampir selalu"]
    },
    { 
        question: "Seberapa sering Anda merasa sulit untuk bangun di pagi hari dan memulai aktivitas kerja?", 
        type: "choice",
        options: ["a. Tidak pernah", "b. Kadang-kadang", "c. Sering", "d. Hampir setiap hari"]
    },
    { 
        question: "Apakah Anda merasa mudah marah atau frustrasi dengan rekan kerja atau atasan Anda?", 
        type: "choice",
        options: ["a. Tidak pernah", "b. Jarang", "c. Sering", "d. Selalu"]
    },
    { 
        question: "Seberapa sering Anda merasa kehilangan minat dalam pekerjaan yang sebelumnya Anda nikmati?", 
        type: "choice",
        options: ["a. Tidak pernah", "b. Kadang-kadang", "c. Sering", "d. Hampir setiap saat"]
    }
];

function selectGender(selectedGender) {
    gender = selectedGender;
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <h1 class="mb-3" style="color: #A26769;">Next Step</h1>
        <p class="mb-4">Apakah kamu pekerja atau mahasiswa?</p>
        <div class="row justify-content-center">
            <div class="col-md-3 mb-4">
                <button class="btn btn-primary btn-lg btn-block" onclick="selectOccupation('Mahasiswa')">Mahasiswa</button>
            </div>
            <div class="col-md-3 mb-4">
                <button class="btn btn-secondary btn-lg btn-block" onclick="selectOccupation('Pekerja')">Pekerja</button>
            </div>
        </div>
    `;
}

window.addEventListener("beforeunload", function (e) {
    // Pastikan event listener hanya aktif pada halaman "Next Step" dan seterusnya
    if (currentQuestionIndex > 0 || occupation) {
        // Browser menampilkan pesan konfirmasi default
        e.preventDefault(); // Standar untuk beberapa browser
        e.returnValue = ''; // Diperlukan untuk Chrome
    }
});

function selectOccupation(selectedOccupation) {
    occupation = selectedOccupation;
    currentQuestionIndex = 0;
    displayNextQuestion();
}

function displayNextQuestion() {
    const mainContent = document.getElementById('main-content');
    const questions = occupation === 'Mahasiswa' ? studentQuestions : workerQuestions;

    // Hitung persentase progress
    const progressPercentage = ((currentQuestionIndex / questions.length) * 100).toFixed(2);

    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        const previousAnswer = userAnswers[currentQuestionIndex] || ''; // Ambil jawaban sebelumnya jika ada

        mainContent.innerHTML = `
            <!-- Progress Bar dengan penanda x/y -->
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span style="color: #28a745; font-weight: bold;">Pertanyaan ${currentQuestionIndex + 1} / ${questions.length}</span>
                <div class="progress" style="flex-grow: 1; height: 20px; margin-left: 10px; background-color: #f0f0f0; border-radius: 10px;">
                    <div class="progress-bar" role="progressbar" style="width: ${progressPercentage}%; background-color: #28a745;" aria-valuenow="${progressPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
            <!-- Question Content -->
            <h1 class="mb-3" style="color: #A26769;">Question ${currentQuestionIndex + 1}</h1>
            <p class="mb-4">${currentQuestion.question}</p>
            <div class="row justify-content-center">
                ${currentQuestion.type === "input" ? `
                    <div class="col-md-6 mb-4">
                        <input type="text" class="form-control" placeholder="Jawaban Anda" id="answerInput" value="${previousAnswer}" oninput="toggleNextButton()" onkeypress="checkEnter(event)">
                    </div>
                ` : `
                    ${currentQuestion.options.map(option => `
                        <div class="col-md-3 mb-2">
                            <button class="btn ${previousAnswer === option ? 'btn-primary' : 'btn-outline-primary'} btn-block option-button" onclick="selectOption('${option}')">${option}</button>
                        </div>
                    `).join('')}
                `}
            </div>
            <!-- Navigation Buttons -->
            <div class="d-flex justify-content-between mt-3">
                ${currentQuestionIndex > 0 ? `
                    <button class="btn btn-secondary" onclick="goBack()">
                        <i class="fas fa-arrow-left"></i> Kembali
                    </button>
                ` : ''}
                <button id="nextButton" class="btn btn-primary" onclick="submitAnswer()" ${previousAnswer === '' ? 'disabled' : ''}>
                    Lanjut <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;

        // Fokuskan input secara otomatis jika tipe pertanyaan adalah "input"
        if (currentQuestion.type === "input") {
            setTimeout(() => {
                document.getElementById('answerInput').focus();
            }, 0);
        }

        // Nonaktifkan tombol lanjut untuk pertanyaan pilihan ganda sampai jawaban dipilih
        if (currentQuestion.type === "choice") {
            document.getElementById('nextButton').disabled = true;
        }
    } else {
        mainContent.innerHTML = `
            <!-- Progress Bar (Full) dengan penanda x/y -->
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span style="color: #28a745; font-weight: bold;">Pertanyaan ${questions.length} / ${questions.length}</span>
                <div class="progress" style="flex-grow: 1; height: 20px; margin-left: 10px; background-color: #f0f0f0; border-radius: 10px;">
                    <div class="progress-bar" role="progressbar" style="width: 100%; background-color: #28a745;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
            <h1 class="mb-3" style="color: #A26769;">Thank you!</h1>
            <p class="mb-4">Anda telah menyelesaikan semua pertanyaan.</p>
            <button class="btn btn-success" onclick="showLoading(); showUserAnswers();">Tampilkan Hasil</button>
            <div class="d-flex justify-content-between mt-3">
                <button class="btn btn-secondary" onclick="goBack()">
                    <i class="fas fa-arrow-left"></i> Kembali
                </button>
            </div>
        `;
    }
}

function toggleNextButton() {
    const answerInput = document.getElementById('answerInput').value;
    document.getElementById('nextButton').disabled = answerInput.trim() === '';
}


function selectOption(option) {
    userAnswers[currentQuestionIndex] = option;
    console.log(`Jawaban ke-${currentQuestionIndex + 1}: ${option}`);

    // Pilih opsi dan lanjutkan ke pertanyaan berikutnya secara otomatis
    currentQuestionIndex++;
    displayNextQuestion();
}

function checkEnter(event) {
    if (event.key === "Enter") {
        submitAnswer();
    }
}

function goBack() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayNextQuestion();
    }
}

function submitAnswer() {
    const answerInput = document.getElementById('answerInput').value;
    if (answerInput.trim() !== "") {
        userAnswers[currentQuestionIndex] = answerInput; // Simpan jawaban pengguna
        console.log(`Jawaban ke-${currentQuestionIndex + 1}: ${answerInput}`);
        currentQuestionIndex++;
        displayNextQuestion();
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan!',
            text: 'Silakan isi jawaban Anda sebelum melanjutkan.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        });
    }
}


function submitChoice(answer) {
    userAnswers.push(answer);
    console.log(`Jawaban ke-${currentQuestionIndex + 1}: ${answer}`);
    currentQuestionIndex++;
    displayNextQuestion();
}

function showLoading() {
    $('#loadingModal').modal('show');
    setTimeout(() => {
        $('#loadingModal').modal('hide');

        const depressionLevel = Math.floor(Math.random() * 5) + 1;
        let resultText = '';
        let imagePath = '';
        let adviceText = '';

        switch (depressionLevel) {
            case 1:
                resultText = 'Tidak Depresi';
                imagePath = gender === 'Female' ? 'img/0f.png' : 'img/0m.png';
                adviceText = 'Pertahankan gaya hidup sehat dan tetap menjaga keseimbangan antara aktivitas dan istirahat.';
                break;
            case 2:
                resultText = 'Depresi Ringan';
                imagePath = gender === 'Female' ? 'img/1f.png' : 'img/1m.png';
                adviceText = 'Cobalah berolahraga ringan dan bicarakan perasaan Anda kepada teman atau keluarga.';
                break;
            case 3:
                resultText = 'Depresi Sedang';
                imagePath = gender === 'Female' ? 'img/2f.png' : 'img/2m.png';
                adviceText = 'Pertimbangkan untuk berkonsultasi dengan seorang konselor atau terapis untuk mendapatkan dukungan.';
                break;
            case 4:
                resultText = 'Depresi Berat';
                imagePath = gender === 'Female' ? 'img/3f.png' : 'img/3m.png';
                adviceText = 'Disarankan untuk segera mencari bantuan dari profesional kesehatan mental.';
                break;
            case 5:
                resultText = 'Depresi Sangat Berat';
                imagePath = gender === 'Female' ? 'img/4f.png' : 'img/4m.png';
                adviceText = 'Penting untuk segera mendapatkan bantuan dari spesialis kesehatan mental. Jangan menunda untuk mencari dukungan.';
                break;
            default:
                resultText = 'Hasil Tidak Terdeteksi';
                imagePath = '';
                adviceText = 'Mohon coba lagi atau hubungi ahli jika Anda merasa tidak nyaman.';
        }

        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="card mx-auto mb-4" style="max-width: 500px; border-color: #A26769;">
                <div class="card-body text-center">
                    <h2 class="card-title" style="color: #A26769;">Hasil Anda</h2>
                    <p class="card-text">Tingkat depresi Anda: <strong>${resultText}</strong></p>
                    <div class="text-center">
                        <img src="${imagePath}" alt="Hasil Tingkat Depresi" class="img-fluid mb-3" style="max-width: 300px;">
                    </div>
                </div>
            </div>
            <div class="card mx-auto mb-3" style="max-width: 500px; border-color: #A26769;">
                <div class="card-body">
                    <h4 class="card-title" style="color: #A26769;">Saran</h4>
                    <p class="card-text">${adviceText}</p>
                </div>
            </div>
            <div class="card mx-auto mb-3" style="max-width: 500px; border-color: #A26769;">
                <div class="card-body">
                    <h4 class="card-title" style="color: #A26769;">Informasi Pengguna</h4>
                    <p><strong>Jenis Kelamin:</strong> ${gender === 'Male' ? 'Laki-laki' : 'Perempuan'}</p>
                    <p><strong>Status:</strong> ${occupation}</p>
                </div>
            </div>
            <div class="card mx-auto mb-3" style="max-width: 500px; border-color: #A26769;">
                <div class="card-body">
                    <h4 class="card-title" style="color: #A26769;">Jawaban Anda</h4>
                    <ul class="list-group">
                        ${userAnswers.map((answer, index) => `<li class="list-group-item">Jawaban ${index + 1}: ${answer}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;        
    }, 3000);
}
