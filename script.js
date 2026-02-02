// [SECURITY] Google Apps Script URL for duplicate check
// NOTE: Make sure this matches the URL in test.js
const GOOGLE_SCRIPT_URL_CHECK = "https://script.google.com/macros/s/AKfycby1RrZtd9rzLM6w0c4DzGhY_OOO_RkqHRW7-fPDUHL63uZMri_BtsXyYdjNY-wSnvVQ/exec";

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    const nameInput = document.getElementById('name');
    const birthdateInput = document.getElementById('birthdate');
    const phoneInput = document.getElementById('phone');
    const agreeCheckbox = document.getElementById('agree');
    const submitButton = document.querySelector('.btn-primary');
    const inputs = [nameInput, birthdateInput, phoneInput, agreeCheckbox, submitButton];

    // 1. [Device Block] Check if already completed on this device
    if (localStorage.getItem('gnFit_complete') === 'true') {
        alert("이미 응시 완료된 기기입니다. 재접속할 수 없습니다.");
        inputs.forEach(el => el.disabled = true);
        submitButton.textContent = "응시 완료됨";
        submitButton.style.backgroundColor = "#ccc";
        submitButton.style.cursor = "not-allowed";
        return; // Stop initialization
    }

    // 초기 상태: 버튼 비활성화
    submitButton.disabled = true;
    submitButton.style.opacity = '0.5';
    submitButton.style.cursor = 'not-allowed';

    function checkInputs() {
        if (localStorage.getItem('gnFit_complete') === 'true') return;

        const nameValue = nameInput.value.trim();
        const birthdateValue = birthdateInput.value.trim();
        const phoneValue = phoneInput.value.trim();
        const isAgreed = agreeCheckbox.checked;

        const isNameValid = nameValue.length >= 2;
        const isBirthdateValid = /^\d{6}$/.test(birthdateValue);
        const isPhoneValid = /^\d{10,11}$/.test(phoneValue);

        if (isNameValid && isBirthdateValid && isPhoneValid && isAgreed) {
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            submitButton.style.cursor = 'pointer';
        } else {
            submitButton.disabled = true;
            submitButton.style.opacity = '0.5';
            submitButton.style.cursor = 'not-allowed';
        }
    }

    // 입력값이 변할 때마다 유효성 검사 실행
    nameInput.addEventListener('input', checkInputs);

    birthdateInput.addEventListener('input', (e) => {
        // 숫자만 입력되도록 처리
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
        checkInputs();
    });

    phoneInput.addEventListener('input', (e) => {
        // 숫자만 입력되도록 처리
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
        checkInputs();
    });

    agreeCheckbox.addEventListener('change', checkInputs);

    // 2. [Real-time Check & Login]
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameValue = nameInput.value.trim();
        const birthdateValue = birthdateInput.value.trim();
        const phoneValue = phoneInput.value.trim();

        // UI Feedback during check
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = "확인 중...";

        try {
            // Check for duplicates in Google Sheets
            if (GOOGLE_SCRIPT_URL_CHECK && GOOGLE_SCRIPT_URL_CHECK.startsWith("https")) {
                const checkUrl = `${GOOGLE_SCRIPT_URL_CHECK}?phone=${encodeURIComponent(phoneValue)}`;

                // Note: Apps Script must be deployed as "Anyone" for this to work without CORS errors on simple GET requests returning JSON.
                // If CORS issues persist, we might catch the error and proceed, but strict blocking requires CORS support.
                const response = await fetch(checkUrl);
                const resultData = await response.json();

                if (resultData.result === 'already_exists') {
                    alert("이미 응시 완료된 연락처입니다. 재응시가 필요한 경우 담당자에게 문의하세요.");
                    submitButton.textContent = originalText;
                    checkInputs(); // Re-enable if valid inputs remain
                    return; // Stop login
                }
            }
        } catch (error) {
            console.warn("Duplicate check failed (network/CORS), proceeding locally:", error);
            // Optionally: alert("서버 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."); return;
            // For now, allow proceeding if check fails to avoid blocking valid users during outages.
        }

        // Proceed to Login
        // Clear previous session data except device flag
        localStorage.removeItem('gnFit_answers');
        localStorage.removeItem('gnFit_section');

        localStorage.setItem('applicantName', nameValue);
        localStorage.setItem('applicantBirthdate', birthdateValue);
        localStorage.setItem('applicantPhone', phoneValue);
        localStorage.setItem('applicantAgree', 'Y');

        // [New] Reset Timer on Login
        localStorage.setItem('gnFit_startTime', Date.now().toString());

        window.location.href = 'instruction.html';
    });
});
