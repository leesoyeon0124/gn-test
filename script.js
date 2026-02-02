const scriptURL = 'https://script.google.com/macros/s/AKfycbxzvJmeRmGC_oWgqTaUEv9SaXAM765_OFCGU35t53fW0CZJo4aAuZ8dEsOG8sj3fxeD/exec';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const birth = document.getElementById('birth').value;

    // 1. 기기 기반 차단
    if (localStorage.getItem('survey_completed') === 'true') {
        alert('이미 응시가 완료된 기기입니다.');
        return;
    }

    // 버튼 비활성화 (여러 번 클릭 방지)
    const loginBtn = e.target.querySelector('button');
    const originalBtnText = loginBtn.innerText;
    loginBtn.disabled = true;
    loginBtn.innerText = '확인 중...';

    try {
        // 2. 실시간 연락처 중복 체크
        const response = await fetch(`${scriptURL}?phone=${phone}`);
        const data = await response.json();

        if (data.result === 'already_exists') {
            alert('이미 응시 완료된 연락처입니다. 재응시가 필요한 경우 담당자에게 문의하세요.');
            loginBtn.disabled = false;
            loginBtn.innerText = originalBtnText;
        } else {
            // 3. 타이머 리셋 및 정보 저장
            localStorage.removeItem('gnFit_startTime');
            localStorage.setItem('gnFit_user', JSON.stringify({ name, phone, birth }));
            localStorage.setItem('gnFit_startTime', Date.now().toString());

            window.location.href = 'test.html';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('네트워크 연결을 확인해주세요. (구글 스크립트 배포 설정을 확인해 보세요)');
        loginBtn.disabled = false;
        loginBtn.innerText = originalBtnText;
    }
});