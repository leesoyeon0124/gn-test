// test.js - Final Design Restoration (Pagination & Theming)

// [CONFIG] Google Apps Script URL
const scriptURL = "https://script.google.com/macros/s/AKfycbxzvJmeRmGC_oWgqTaUEv9SaXAM765_OFCGU35t53fW0CZJo4aAuZ8dEsOG8sj3fxeD/exec";

// [THEME CONFIG] Section Themes
const SECTIONS = [
    { start: 0, end: 9, themeVar: '--section-1-color', name: 'PART 1' },
    { start: 10, end: 19, themeVar: '--section-2-color', name: 'PART 2' },
    { start: 20, end: 29, themeVar: '--section-3-color', name: 'PART 3' },
    { start: 30, end: 39, themeVar: '--section-1-color', name: 'PART 4' },
    { start: 40, end: 49, themeVar: '--section-2-color', name: 'PART 5' },
    { start: 50, end: 59, themeVar: '--section-3-color', name: 'PART 6' }
];

// [DATA] 60 Questions
const allQuestions = [
    { id: 1, category: "주도적 능력", optionA: "주어진 가이드라인을 완벽히 숙달하는 데 집중한다.", optionB: "효율을 높일 새로운 방법이 있는지 적극적으로 찾는다." },
    { id: 2, category: "주도적 능력", optionA: "상급자의 구체적인 지시를 기다리는 편이다.", optionB: "다음 업무를 예측하여 필요한 것을 미리 준비한다." },
    { id: 3, category: "주도적 능력", optionA: "검증된 안전한 업무 방식을 더 선호한다.", optionB: "새로운 시도를 통해 배울 점을 찾는 것을 즐긴다." },
    { id: 4, category: "주도적 능력", optionA: "정해진 역할 범위를 충실히 지키는 것을 중시한다.", optionB: "필요하다면 역할 밖의 일이라도 팀을 위해 나선다." },
    { id: 5, category: "주도적 능력", optionA: "결정된 사항을 경청하고 기록하는 역할을 선호한다.", optionB: "논의 과정에서 내 아이디어를 적극적으로 제안한다." },
    { id: 6, category: "주도적 능력", optionA: "체계가 잘 잡힌 안정적인 환경에서 능률이 높다.", optionB: "직접 체계를 만들어가야 하는 환경에서 활력이 생긴다." },
    { id: 7, category: "주도적 능력", optionA: "질문을 통해 명확한 답을 확인하고 일을 시작한다.", optionB: "스스로 자료를 찾아보고 나름의 대안을 먼저 만든다." },
    { id: 8, category: "주도적 능력", optionA: "주어진 과업을 오차 없이 수행할 때 보람을 느낀다.", optionB: "스스로 설정한 목표를 달성했을 때 성취감이 더 크다." },
    { id: 9, category: "주도적 능력", optionA: "조직의 전통적인 방식을 존중하며 따르는 편이다.", optionB: "비효율적인 관행은 개선을 제안하려 노력하는 편이다." },
    { id: 10, category: "주도적 능력", optionA: "근무 시간 내에 몰입하여 주어진 일을 끝낸다.", optionB: "업무 외 시간에도 개인의 성장을 위해 고민한다." },

    { id: 11, category: "문제 해결", optionA: "과거 사례를 참고하여 실수를 줄이는 데 집중한다.", optionB: "기존 방식에 의문을 갖고 근본 원인을 다시 분석한다." },
    { id: 12, category: "문제 해결", optionA: "실무적인 경험과 직관을 더 신뢰한다.", optionB: "객관적인 수치와 데이터를 더 신뢰한다." },
    { id: 13, category: "문제 해결", optionA: "실행하며 발생하는 문제를 유연하게 해결한다.", optionB: "실행 전 발생 가능한 모든 변수를 사전에 점검한다." },
    { id: 14, category: "문제 해결", optionA: "한 가지 확실한 해결책을 빠르게 정하는 편이다.", optionB: "여러 대안의 장단점을 면밀히 비교하여 결정한다." },
    { id: 15, category: "문제 해결", optionA: "복잡한 문제는 상사에게 조언을 구하는 것이 낫다.", optionB: "복잡한 문제는 스스로 쪼개어 논리적 구조를 만든다." },
    { id: 16, category: "문제 해결", optionA: "세부적인 디테일과 오류를 잡아내는 데 강하다.", optionB: "전체적인 흐름과 본질을 짚어내는 데 강하다." },
    { id: 17, category: "문제 해결", optionA: "익숙한 도구를 활용해 효율적으로 결과를 낸다.", optionB: "문제에 맞는 새로운 기술이나 도구 도입을 시도한다." },
    { id: 18, category: "문제 해결", optionA: "갈등 발생 시 원만한 합의점을 찾는 데 집중한다.", optionB: "재발 방지를 위해 갈등의 원인을 분석하는 데 집중한다." },
    { id: 19, category: "문제 해결", optionA: "누구나 이해할 수 있는 보편적인 방식으로 해결한다.", optionB: "고정관념을 깨는 독특하고 창의적인 방식으로 접근한다." },
    { id: 20, category: "문제 해결", optionA: "눈앞의 문제를 빠르게 처리하는 것을 우선시한다.", optionB: "시간이 걸려도 근본적인 시스템 개선을 우선시한다." },

    { id: 21, category: "목표 달성", optionA: "달성 가능성이 높은 안정적인 목표를 세운다.", optionB: "실패 위험이 있더라도 도전적인 목표를 세운다." },
    { id: 22, category: "목표 달성", optionA: "주변과 조화를 이루는 적정한 성과를 유지한다.", optionB: "남들보다 앞서는 압도적인 성과를 위해 몰입한다." },
    { id: 23, category: "목표 달성", optionA: "과정에서의 배움이 좋았다면 만족하는 편이다.", optionB: "약속된 결과를 내지 못하면 큰 아쉬움을 느낀다." },
    { id: 24, category: "목표 달성", optionA: "부여된 KPI를 충실히 달성하는 것에 집중한다.", optionB: "스스로 정한 높은 기준에 도달하려 끊임없이 노력한다." },
    { id: 25, category: "목표 달성", optionA: "상황 변화에 따라 목표 수치를 유연하게 조정한다.", optionB: "상황이 변해도 처음 세운 목표를 끝까지 지켜낸다." },
    { id: 26, category: "목표 달성", optionA: "여러 업무를 동시에 무난하게 처리하는 것을 선호한다.", optionB: "한 가지 목표가 정해지면 끝을 볼 때까지 파고든다." },
    { id: 27, category: "목표 달성", optionA: "마감 직전까지 꼼꼼하게 검토하여 완성도를 높인다.", optionB: "마감보다 일찍 업무를 끝내어 처리 속도를 증명한다." },
    { id: 28, category: "목표 달성", optionA: "외부의 인정과 보상이 있을 때 더 힘이 난다.", optionB: "목표 달성 그 자체의 성취감에서 더 큰 힘을 얻는다." },
    { id: 29, category: "목표 달성", optionA: "어려운 과제는 팀원들과 나누어 부담을 덜고 싶다.", optionB: "어려운 과제일수록 내 역량을 시험할 기회로 여낀다." },
    { id: 30, category: "목표 달성", optionA: "에너지를 적절히 안배하여 지치지 않게 일한다.", optionB: "목표 달성을 위해 개인적인 시간과 에너지를 기꺼이 쓴다." },

    { id: 31, category: "소속 영향력", optionA: "내 업무를 완벽히 해내어 팀에 기여하는 편이다.", optionB: "내 일이 바쁘더라도 동료를 돕는 일을 우선한다." },
    { id: 32, category: "소속 영향력", optionA: "팀 내에서 전문성이 뛰어난 동료로 인정받고 싶다.", optionB: "팀 내에서 소통이 잘 되고 유대감이 강한 동료가 되고 싶다." },
    { id: 33, category: "소속 영향력", optionA: "팀의 화합을 위해 내 주장을 굽히는 경우가 많다.", optionB: "팀의 성장을 위해 불편한 반대 의견도 솔직히 낸다." },
    { id: 34, category: "소속 영향력", optionA: "개인 성과가 명확히 드러나는 구조에서 능률이 높다.", optionB: "공동의 목표를 위해 협업하는 구조에서 능률이 높다." },
    { id: 35, category: "소속 영향력", optionA: "주로 뒤에서 묵묵하게 팀을 지원하는 편이다.", optionB: "대체로 앞장서서 동료들에게 활력을 주는 편이다." },
    { id: 36, category: "소속 영향력", optionA: "업무 노하우를 나만의 경쟁력으로 관리한다.", optionB: "업무 노하우를 팀 전체가 알 수 있게 적극 공유한다." },
    { id: 37, category: "소속 영향력", optionA: "개인의 기여도에 따라 개별적으로 보상받길 원한다.", optionB: "팀 전체의 성과에 따라 공동으로 보상받길 원한다." },
    { id: 38, category: "소속 영향력", optionA: "갈등 시 감정이 상하지 않게 거리를 두는 편이다.", optionB: "갈등 당사자와 대면하여 오해를 풀려 노력한다." },
    { id: 39, category: "소속 영향력", optionA: "결정된 방향에 힘을 실어주는 역할을 선호한다.", optionB: "다양한 관점을 제시하여 논의를 확장하는 역할을 선호한다." },
    { id: 40, category: "소속 영향력", optionA: "인간미가 있고 배려심 깊은 동료와 일하고 싶다.", optionB: "실력이 뛰어나 배울 점이 많은 동료와 일하고 싶다." },

    { id: 41, category: "의사소통", optionA: "보고 시 결론부터 명확하고 짧게 말한다.", optionB: "상대가 이해할 수 있게 상세한 배경부터 설명한다." },
    { id: 42, category: "의사소통", optionA: "상대방 주장의 논리적 오류를 잘 찾아내는 편이다.", optionB: "상대방의 말에 공감하며 의도를 먼저 파악하려 한다." },
    { id: 43, category: "의사소통", optionA: "텍스트(메일/메신저)로 기록을 남기며 소통한다.", optionB: "직접 만나서 대화하며 뉘앙스를 파악하는 게 편하다." },
    { id: 44, category: "의사소통", optionA: "잘못된 점은 그 자리에서 명확히 짚고 넘어간다.", optionB: "상대의 체면을 고려해 나중에 따로 조심스레 말한다." },
    { id: 45, category: "의사소통", optionA: "내 생각을 논리적으로 설득하는 데 주력한다.", optionB: "각자의 의견을 경청하고 하나로 정리하는 데 주력한다." },
    { id: 46, category: "의사소통", optionA: "대체로 격식을 갖춘 정중한 언어를 사용한다.", optionB: "주로 수평적이고 솔직한 언어를 사용한다." },
    { id: 47, category: "의사소통", optionA: "전문 용어를 사용하여 정확하게 정보를 전달한다.", optionB: "쉬운 용어로 풀어서 상대방의 이해를 돕는다." },
    { id: 48, category: "의사소통", optionA: "침묵이 흐르는 회의에서 먼저 대화를 주도한다.", optionB: "다른 사람들의 의견이 나올 때까지 차분히 기다린다." },
    { id: 49, category: "의사소통", optionA: "밝은 에너지와 유머로 분위기를 이끄는 편이다.", optionB: "진중하고 신중한 태도로 신뢰감을 주는 편이다." },
    { id: 50, category: "의사소통", optionA: "상급자의 비판을 조언으로 겸허히 수용한다.", optionB: "비판의 내용이 합리적인지 스스로 판단해 본다." },

    { id: 51, category: "조직문화", optionA: "규정과 원칙을 엄격하게 준수하는 문화가 편하다.", optionB: "상황에 따라 유연하게 원칙을 적용하는 문화가 편하다." },
    { id: 52, category: "조직문화", optionA: "개인별 성과에 따라 명확히 보상받는 것이 공정하다.", optionB: "구성원이 화합하며 함께 성장하는 것이 더 공정하다." },
    { id: 53, category: "조직문화", optionA: "회사의 전통과 가치를 계승하는 것이 중요하다.", optionB: "시대 변화에 맞춰 회사의 정체성을 혁신해야 한다." },
    { id: 54, category: "조직문화", optionA: "회사와 사생활을 철저히 구분하는 문화를 원한다.", optionB: "동료와 인간적인 유대감을 끈끈하게 쌓고 싶다." },
    { id: 55, category: "조직문화", optionA: "위계가 명확하여 역할 분담이 확실한 곳이 좋다.", optionB: "직급에 상관없이 수평적으로 소통하는 곳이 좋다." },
    { id: 56, category: "조직문화", optionA: "결과가 좋다면 과정상의 작은 파격은 허용될 수 있다.", optionB: "과정이 투명하고 윤리적이지 않다면 결과도 가치가 없다." },
    { id: 57, category: "조직문화", optionA: "경쟁을 통해 서로 자극받는 분위기에서 성장한다.", optionB: "서로 돕고 응원하며 안정을 느끼는 분위기에서 성장한다." },
    { id: 58, category: "조직문화", optionA: "회사의 목표와 개인의 목표는 별개라고 생각한다.", optionB: "회사의 성공이 곧 나의 성장과 연결된다고 믿는다." },
    { id: 59, category: "조직문화", optionA: "공식적인 회의와 보고를 통해 일하는 것이 편하다.", optionB: "수시로 피드백을 주고받으며 가볍게 일하는 게 편하다." },
    { id: 60, category: "조직문화", optionA: "대체로 외적 규율이 엄격한 곳이 신뢰가 간다.", optionB: "주로 자율 기반으로 성과에만 집중하는 곳이 신뢰가 간다." }
];

// State Variables
let currentSection = 0;
let userAnswers = {};
let timerInterval = null;

// [INIT] Page Load
document.addEventListener('DOMContentLoaded', () => {
    // 1. 타이머 시작
    startTimer();

    // 2. 버튼 이벤트 연결
    document.getElementById('prev-btn').addEventListener('click', goPrevSection);
    document.getElementById('next-btn').addEventListener('click', goNextSection);
    document.getElementById('submit-btn').addEventListener('click', submitFinal);

    // 3. 첫 섹션 렌더링
    renderSection(0);
});

// [UI] Timer Logic
function startTimer() {
    const timerDisplay = document.getElementById('timer-display');
    const startTimeStr = localStorage.getItem('gnFit_startTime');

    // 만약 시작 시간이 없다면 현재 시간으로 설정 (예외 처리)
    let startTime = startTimeStr ? parseInt(startTimeStr) : Date.now();
    if (!startTimeStr) localStorage.setItem('gnFit_startTime', startTime.toString());

    timerInterval = setInterval(() => {
        const now = Date.now();
        const elapsedSec = Math.floor((now - startTime) / 1000);

        const min = Math.floor(elapsedSec / 60).toString().padStart(2, '0');
        const sec = (elapsedSec % 60).toString().padStart(2, '0');

        if (timerDisplay) {
            timerDisplay.textContent = `소요 시간 ${min}:${sec}`;
        }
    }, 1000);
}

// [RENDER] Render Section (10 per page)
function renderSection(sectionIdx) {
    const container = document.getElementById('question-list');
    const section = SECTIONS[sectionIdx];

    // 1. Update Theme
    document.documentElement.style.setProperty('--theme-color', `var(${section.themeVar})`);

    // 2. Update Progress Bar Info
    document.getElementById('progress-text').textContent = `PART ${sectionIdx + 1} / 6`;
    const progressPercent = ((sectionIdx + 1) / 6) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;

    // 3. Render Questions
    let html = '';

    for (let i = section.start; i <= section.end; i++) {
        const q = allQuestions[i];
        const saved = userAnswers[q.id]; // 'A' or 'B'

        html += `
        <div class="question-item">
            <div class="question-header">
                <span class="q-number">Q${q.id}</span>
                <span class="q-text">${q.category}</span>
            </div>
            <div class="options-grid">
                <div class="option-card ${saved === 'A' ? 'selected' : ''}" 
                     onclick="selectOption(${q.id}, 'A')">
                    <input type="radio" name="q${q.id}" value="A" class="option-input" ${saved === 'A' ? 'checked' : ''}>
                    <span class="option-text">${q.optionA}</span>
                </div>
                <div class="option-card ${saved === 'B' ? 'selected' : ''}" 
                     onclick="selectOption(${q.id}, 'B')">
                    <input type="radio" name="q${q.id}" value="B" class="option-input" ${saved === 'B' ? 'checked' : ''}>
                    <span class="option-text">${q.optionB}</span>
                </div>
            </div>
        </div>
        `;
    }

    container.innerHTML = html;

    // 4. Update Buttons
    updateNavButtons(sectionIdx);

    // 5. Scroll to Top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// [ACTION] Handle Option Selection
window.selectOption = function (qId, val) {
    userAnswers[qId] = val;

    // UI Update (find the clicked card and update class)
    // Note: Since rendered via innerHTML, we just re-render or toggle classes?
    // Using simple class toggle for better performance than full re-render
    const qIndex = qId - 1; // ID is 1-based index
    // Find the specific question item in DOM
    // Since we don't have unique IDs on items, we find by q-number text or better yet, re-render is safe enough for 10 items?
    // Let's do a smart toggle.

    // Find the wrapper
    // Because we have multiple q-ids, we need to find the specific input name="q${qId}"
    const inputs = document.getElementsByName(`q${qId}`);
    inputs.forEach(input => {
        const card = input.closest('.option-card');
        if (input.value === val) {
            card.classList.add('selected');
            input.checked = true;
        } else {
            card.classList.remove('selected');
        }
    });

    // Check if current section is complete
    checkSectionComplete();
}

function checkSectionComplete() {
    // Optional: Enable Next button if all done?
    // For now, allow click and validate on click
}

function updateNavButtons(sectionIdx) {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');

    // Prev Button
    if (sectionIdx === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }

    // Next / Submit Buttons
    if (sectionIdx === SECTIONS.length - 1) {
        // Last Page
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }

    // Reset disabled state (re-enabled always, check on click)
    nextBtn.disabled = false;
    submitBtn.disabled = false;
}

// [NAV] Check Completion
function validateSection(sectionIdx) {
    const section = SECTIONS[sectionIdx];
    const missing = [];

    for (let i = section.start; i <= section.end; i++) {
        const qId = allQuestions[i].id;
        if (!userAnswers[qId]) {
            missing.push(qId);
        }
    }

    if (missing.length > 0) {
        alert(`아직 답변하지 않은 문항이 있습니다.\n(Q${missing[0]}번 등)`);

        // Scroll to first missing
        // TODO: Implement scroll to specific item if needed
        return false;
    }
    return true;
}

function goPrevSection() {
    if (currentSection > 0) {
        currentSection--;
        renderSection(currentSection);
    }
}

function goNextSection() {
    if (validateSection(currentSection)) {
        if (currentSection < SECTIONS.length - 1) {
            currentSection++;
            renderSection(currentSection);
        }
    }
}

// [SUBMIT] Final Submission
async function submitFinal() {
    if (!validateSection(currentSection)) return;

    if (!confirm("모든 검사를 마쳤습니다. 제출하시겠습니까?")) return;

    // Stop Timer
    clearInterval(timerInterval);

    // UI Loading
    document.getElementById('submit-btn').textContent = "전송 중...";
    document.getElementById('submit-btn').disabled = true;

    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'flex';

    // Prepare Data
    const name = localStorage.getItem('applicantName');
    const birth = localStorage.getItem('applicantBirthdate');
    const phone = localStorage.getItem('applicantPhone');
    const agree = localStorage.getItem('applicantAgree');

    // Timer Calc
    const startTimeStr = localStorage.getItem('gnFit_startTime');
    let totalTime = 0;
    if (startTimeStr) {
        totalTime = Math.floor((Date.now() - parseInt(startTimeStr)) / 1000);
    }

    const record = {
        name,
        birth,
        phone,
        agree,
        answers: userAnswers,
        totalTime,
        timestamp: new Date().toLocaleString()
    };

    // 1. Local Backup
    try {
        const db = JSON.parse(localStorage.getItem('gnFit_db') || '[]');
        db.push(record);
        localStorage.setItem('gnFit_db', JSON.stringify(db));
    } catch (e) { console.error('Backup failed', e); }

    // 2. G-Sheet Submit
    try {
        await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record)
        });

        // 3. Cleanup & Redirect
        finalizeAndRedirect();

    } catch (error) {
        console.error("Submission Error:", error);
        alert('전송 중 오류가 발생했으나, 데이터는 안전하게 저장되었습니다.');
        finalizeAndRedirect();
    }
}

function finalizeAndRedirect() {
    localStorage.setItem('survey_completed', 'true');
    // Clear Session
    localStorage.removeItem('applicantName');
    localStorage.removeItem('applicantBirthdate');
    localStorage.removeItem('applicantPhone');
    localStorage.removeItem('applicantAgree');
    localStorage.removeItem('gnFit_startTime');

    alert('제출 완료되었습니다. 수고하셨습니다!');
    window.location.href = 'result.html';
}