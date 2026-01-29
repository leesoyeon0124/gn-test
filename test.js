// test.js (TEST VERSION: 10 Questions Only)

// === CONFIG: Google Apps Script Web App URL ===
// [중요] 배포 후 생성된 URL을 아래 따옴표 안에 붙여넣으세요.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby1RrZtd9rzLM6w0c4DzGhY_OOO_RkqHRW7-fPDUHL63uZMri_BtsXyYdjNY-wSnvVQ/exec";

// === 1. Data (10 Items Only for Testing) ===
const allQuestions = [
    // [SECTION 1] 1~10: 주도적 능력
    { id: 1, category: "주도적 능력", optionA: "주어진 가이드라인을 철저히 준수한다.", optionB: "더 나은 결과물을 위해 새로운 방식을 제안한다." },
    { id: 2, category: "주도적 능력", optionA: "문제가 생기면 즉시 보고하고 지침을 기다린다.", optionB: "문제 해결을 위해 내가 할 수 있는 대안을 먼저 찾는다." },
    { id: 3, category: "주도적 능력", optionA: "익숙한 업무를 실수 없이 처리하는 편이다.", optionB: "생소한 업무라도 먼저 손들어 맡아보는 편이다." },
    { id: 4, category: "주도적 능력", optionA: "팀의 목표에 맞춰 내 보조를 맞춘다.", optionB: "우리 팀에 필요한 일이 무엇인지 먼저 찾아 제안한다." },
    { id: 5, category: "주도적 능력", optionA: "결정된 사항에 대해 효율적으로 실행한다.", optionB: "결정되기 전 단계에서 의견을 적극적으로 개진한다." },
    { id: 6, category: "주도적 능력", optionA: "안정적인 업무 환경에서 성과가 잘 나온다.", optionB: "변화가 많고 주도권이 있는 환경에서 활력이 생긴다." },
    { id: 7, category: "주도적 능력", optionA: "타인의 피드백을 수용하여 개선한다.", optionB: "스스로 개선점을 찾아 꾸준히 자기계발을 한다." },
    { id: 8, category: "주도적 능력", optionA: "업무 마감 기한을 엄수하는 것에 집중한다.", optionB: "마감 전이라도 미리 업무를 시작해 여유를 확보한다." },
    { id: 9, category: "주도적 능력", optionA: "시키는 일을 완벽하게 해내는 것이 실력이다.", optionB: "스스로 할 일을 찾아 성과를 내는 것이 실력이다." },
    { id: 10, category: "주도적 능력", optionA: "조직의 전통과 관행을 존중한다.", optionB: "불합리한 관행이 있다면 개선하려고 시도한다." }
];

// Configuration (1 Section x 10 Questions)
const SECTIONS = [
    { start: 1, end: 10, name: "Section 1", colorVar: "--section-1-color", className: "section-1" }
];

let currentSectionIndex = 0;
let userAnswers = {};

// === 2. DOM Elements ===
const questionListEl = document.getElementById('question-list');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const bodyEl = document.body;

// === 3. Initialization ===
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    renderSection(currentSectionIndex);
});

// === 4. Core Functions ===

function renderSection(sectionIdx) {
    const sectionConfig = SECTIONS[sectionIdx];

    // 1. Update UI Theme
    document.documentElement.style.setProperty('--theme-color', `var(${sectionConfig.colorVar})`);
    bodyEl.className = sectionConfig.className;

    // 2. Filter Questions for this section
    const sectionQuestions = allQuestions.filter(q => q.id >= sectionConfig.start && q.id <= sectionConfig.end);

    // 3. Render HTML
    questionListEl.innerHTML = sectionQuestions.map(q => createQuestionHTML(q)).join('');

    // 4. Restore Answers & Update Progress
    updateProgressUI();
}

function createQuestionHTML(q) {
    const savedAnswer = userAnswers[q.id];
    const isASelected = savedAnswer === 'A' ? 'selected' : '';
    const isBSelected = savedAnswer === 'B' ? 'selected' : '';

    return `
    <div class="question-item" id="q-card-${q.id}">
        <div class="question-header">
            <span class="q-number">Q${q.id}.</span> 
        </div>
        <div class="options-grid">
            <label class="option-card ${isASelected}" onclick="selectAnswer(${q.id}, 'A')">
                <input type="radio" name="q${q.id}" value="A" class="option-input" ${savedAnswer === 'A' ? 'checked' : ''}>
                <span class="option-text">${q.optionA}</span>
            </label>
            <label class="option-card ${isBSelected}" onclick="selectAnswer(${q.id}, 'B')">
                <input type="radio" name="q${q.id}" value="B" class="option-input" ${savedAnswer === 'B' ? 'checked' : ''}>
                <span class="option-text">${q.optionB}</span>
            </label>
        </div>
    </div>
    `;
}

// Global function
window.selectAnswer = function (qId, value) {
    userAnswers[qId] = value;

    const card = document.getElementById(`q-card-${qId}`);
    const labels = card.querySelectorAll('.option-card');
    labels.forEach(label => {
        if (label.querySelector('input').value === value) {
            label.classList.add('selected');
        } else {
            label.classList.remove('selected');
        }
    });

    updateProgressUI();
    saveProgress();
};

function updateProgressUI() {
    const sectionConfig = SECTIONS[currentSectionIndex];
    const totalQuestions = 10; // Modified for Test Version
    const answeredCount = Object.keys(userAnswers).length;

    // Update global progress bar
    const percentage = (answeredCount / totalQuestions) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${answeredCount} / ${totalQuestions}`;

    // Check if current section is complete
    const sectionQuestions = allQuestions.filter(q => q.id >= sectionConfig.start && q.id <= sectionConfig.end);
    const sectionAnsweredCount = sectionQuestions.filter(q => userAnswers[q.id]).length;

    const isSectionComplete = sectionQuestions.length > 0 && sectionAnsweredCount === sectionQuestions.length;

    // Button State
    if (isSectionComplete) {
        nextBtn.disabled = false;

        // If last section, show submit button
        if (currentSectionIndex === SECTIONS.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
            submitBtn.textContent = '제출하기'; // Fixed text
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
            nextBtn.textContent = '다음';
        }
    } else {
        nextBtn.disabled = true;
        nextBtn.textContent = '다음';
        submitBtn.style.display = 'none';
        nextBtn.style.display = 'inline-block';
    }
}

function saveProgress() {
    localStorage.setItem('gnFit_answers', JSON.stringify(userAnswers));
    localStorage.setItem('gnFit_section', currentSectionIndex);
}

function loadProgress() {
    const savedAnswers = localStorage.getItem('gnFit_answers');
    if (savedAnswers) {
        userAnswers = JSON.parse(savedAnswers);
    }

    const savedSection = localStorage.getItem('gnFit_section');
    if (savedSection) {
        currentSectionIndex = parseInt(savedSection, 10);
    }
}

// === 5. Navigation Handlers ===

nextBtn.addEventListener('click', () => {
    saveProgress();

    if (currentSectionIndex < SECTIONS.length - 1) {
        currentSectionIndex++;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        renderSection(currentSectionIndex);
    }
});

// === 6. Submission with GAS ===
submitBtn.addEventListener('click', async () => {
    saveProgress();

    // 1. Data Preparation
    const name = localStorage.getItem('applicantName');
    const birthdate = localStorage.getItem('applicantBirthdate');
    const phone = localStorage.getItem('applicantPhone');
    const answers = JSON.parse(localStorage.getItem('gnFit_answers') || '{}');
    const timestamp = new Date().toLocaleString();
    const record = {
        name,
        birthdate,
        phone,
        answers,
        timestamp
    };

    // 2. Save to Local Admin DB (Backup)
    const db = JSON.parse(localStorage.getItem('gnFit_db') || '[]');
    db.push(record);
    localStorage.setItem('gnFit_db', JSON.stringify(db));

    // 3. Send to Google Sheets (GAS)
    if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL.startsWith("https://script.google.com")) {
        // Show Loading
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) loadingOverlay.style.display = 'flex';

        try {
            // Send Data using fetch
            // 'no-cors' mode is opaque, so we cannot read the response, but it avoids CORS errors.
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache', // Ensure fresh request
                keepalive: true, // Important for sending data even if page navigates
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(record)
            });

            // Artificial Delay for User Experience (to show "Sending...")
            await new Promise(r => setTimeout(r, 2000));

        } catch (error) {
            console.error("Google Sheet Transfer Error:", error);
            // Even if it fails, we proceed because we have local backup
            alert("전송 중 일시적인 문제가 발생했으나, 로컬 저장소에 안전하게 기록되었습니다.");
        }
    } else {
        console.warn("GAS URL Not Configured Correctly");
        // Just fake loading procedure
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) loadingOverlay.style.display = 'flex';
        await new Promise(r => setTimeout(r, 1000));
    }

    // Redirect to Result Page
    window.location.href = 'result.html';
});
