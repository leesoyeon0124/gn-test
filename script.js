// script.js - Simplified Login Logic
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const birth = document.getElementById('birth').value;
    const agree = document.getElementById('agree').checked;

    // 1. 초기화 (이전 기록 삭제)
    localStorage.clear();

    // 2. 입력 정보 저장
    localStorage.setItem('applicantName', name);
    localStorage.setItem('applicantBirthdate', birth);
    localStorage.setItem('applicantPhone', phone);
    localStorage.setItem('applicantAgree', agree ? 'Y' : 'N');

    // 3. 안내 페이지로 이동
    window.location.href = 'instruction.html';
});