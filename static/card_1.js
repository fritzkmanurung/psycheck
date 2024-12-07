$(document).ready(function () {
    let currentStep = 1;
    const totalSteps = $(".form-step").length;

    function showStep(step) {
        $(".form-step").removeClass("active");
        $(`.form-step[data-step="${step}"]`).addClass("active");
    }

    function validateInput(step) {
        const $currentStep = $(`.form-step[data-step="${step}"]`);
        let isValid = true;

        $currentStep.find("input, select").each(function () {
            if ($(this).is(":invalid") || !$(this).val()) {
                isValid = false;
            }
        });

        $currentStep.find(".next-btn").prop("disabled", !isValid);
    }

    $(".next-btn").click(function () {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        }
    });

    $(".prev-btn").click(function () {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    $("input, select").on("input change", function () {
        validateInput(currentStep);
    });

    showStep(currentStep); // Initial display
});

document.getElementById('depression-form').addEventListener('submit', function(event) {
    event.preventDefault();
    document.querySelector('.form-step').style.display = 'none';
    document.getElementById('thank-you-message').style.display = 'block';
});

let currentStep = 1;
let totalSteps = 11;

function updateProgressBar() {
    document.getElementById('form-progress').value = currentStep;
    document.getElementById('step-number').innerText = `Step ${currentStep} of ${totalSteps}`;
}

// Event listener untuk tombol next dan previous
document.querySelectorAll('.next-btn').forEach(button => {
    button.addEventListener('click', function() {
        currentStep++;
        updateProgressBar();
    });
});

document.querySelectorAll('.prev-btn').forEach(button => {
    button.addEventListener('click', function() {
        currentStep--;
        updateProgressBar();
    });
});
