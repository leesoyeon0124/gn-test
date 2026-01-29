document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    const nameInput = document.getElementById('name');
    const birthdateInput = document.getElementById('birthdate');
    const phoneInput = document.getElementById('phone');
    const submitButton = document.querySelector('.btn-primary');

    // 초기 상태: 버튼 비활성화
    submitButton.disabled = true;
    submitButton.style.opacity = '0.5';
    submitButton.style.cursor = 'not-allowed';

    function checkInputs() {
        const nameValue = nameInput.value.trim();
        const birthdateValue = birthdateInput.value.trim();
        const phoneValue = phoneInput.value.trim();

        // 유효성 검사 규칙
        const isNameValid = nameValue.length >= 2;
        const isBirthdateValid = /^\d{6}$/.test(birthdateValue); // 숫자 6자리 정규식
        const isPhoneValid = /^\d{10,11}$/.test(phoneValue); // 숫자 10~11자리

        if (isNameValid && isBirthdateValid && isPhoneValid) {
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

    // 폼 제출 시 (검사 시작하기 버튼 클릭)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // 기본 제출 동작 막기

        const nameValue = nameInput.value.trim();
        const birthdateValue = birthdateInput.value.trim();
        const phoneValue = phoneInput.value.trim();

        // 데이터 초기화 (새로운 응시자)
        localStorage.removeItem('gnFit_answers');
        localStorage.removeItem('gnFit_section');

        // 저장
        localStorage.setItem('applicantName', nameValue);
        localStorage.setItem('applicantBirthdate', birthdateValue);
        localStorage.setItem('applicantPhone', phoneValue);

        // 페이지 이동 (알림 없음)
        window.location.href = 'instruction.html';
    });
});
