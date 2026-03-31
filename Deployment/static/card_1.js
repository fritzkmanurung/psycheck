$(document).ready(function () {
    let currentStep = 1;
    const totalSteps = $(".form-step").length;

    function showStep(step) {
        $(".form-step").removeClass("active");
        $(`.form-step[data-step="${step}"]`).addClass("active");
        validateCurrentStep(); // Selalu validasi saat pindah langkah
        updateProgressBar();
    }

    function validateCurrentStep() {
        const $step = $(`.form-step[data-step="${currentStep}"]`);
        let isValid = true;

        $step.find("input, select").each(function () {
            const val = $(this).val();
            // Cek apakah field kosong atau invalid
            if (!val || val === "" || $(this).is(":invalid")) {
                isValid = false;
            }
            // Khusus input number: pastikan nilainya > 0
            if ($(this).attr("type") === "number" && (isNaN(val) || Number(val) <= 0)) {
                isValid = false;
            }
        });

        // Aktifkan/nonaktifkan tombol Selanjutnya
        $step.find(".next-btn").prop("disabled", !isValid);

        // Aktifkan/nonaktifkan tombol Submit (langkah terakhir)
        $step.find("#submit-btn").prop("disabled", !isValid);
    }

    function updateProgressBar() {
        const $progress = document.getElementById('form-progress');
        const $stepNum = document.getElementById('step-number');
        if ($progress) $progress.value = currentStep;
        if ($stepNum) $stepNum.innerText = `Langkah ${currentStep} dari ${totalSteps}`;
    }

    // Tombol Selanjutnya: hanya bisa diklik jika tidak disabled
    $(".next-btn").click(function () {
        if ($(this).prop("disabled")) return; // Jaga-jaga
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        }
    });

    // Tombol Sebelumnya
    $(".prev-btn").click(function () {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    // Validasi real-time saat user mengisi/memilih
    $("input, select").on("input change", function () {
        validateCurrentStep();
    });

    // Inisialisasi: tampilkan langkah 1 dan validasi
    showStep(currentStep);
});
