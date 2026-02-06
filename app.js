// ============================================
// CCNA Master - Main Application Logic
// Quiz Engine & Progress Tracking
// ============================================

// Application State
let currentView = 'dashboard';
let quizState = {
    active: false,
    mode: 'practice', // 'exam' or 'practice'
    questions: [],
    currentIndex: 0,
    answers: {},
    score: 0,
    startTime: null,
    timerInterval: null,
    selectedDomain: null,
    showingExplanation: false,
    timeLimit: null // in seconds, null for practice mode
};

// Domain configuration
const domains = {
    'network-fundamentals': { name: 'Network Fundamentals', weight: 20, color: '#00d4ff' },
    'network-access': { name: 'Network Access', weight: 20, color: '#a855f7' },
    'ip-connectivity': { name: 'IP Connectivity', weight: 25, color: '#00ff88' },
    'ip-services': { name: 'IP Services', weight: 10, color: '#ffa502' },
    'security-fundamentals': { name: 'Security Fundamentals', weight: 15, color: '#ff4757' },
    'automation': { name: 'Automation & Programmability', weight: 10, color: '#3b82f6' }
};

// Progress tracking (persisted to localStorage)
let progress = {
    totalCorrect: 0,
    totalAnswered: 0,
    domainScores: {},
    questionHistory: {}
};

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    setupNavigation();
    updateDashboardStats();
    initLab();
});

// Load progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('ccnaMasterProgress');
    if (saved) {
        try {
            progress = JSON.parse(saved);
        } catch (e) {
            console.error('Failed to load progress:', e);
        }
    }
    updateScoreDisplay();
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('ccnaMasterProgress', JSON.stringify(progress));
    updateScoreDisplay();
}

// Update score display in header
function updateScoreDisplay() {
    const scoreEl = document.getElementById('totalScore');
    if (scoreEl) {
        scoreEl.textContent = progress.totalCorrect;
    }
}

// ============================================
// Navigation
// ============================================

function setupNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            if (view) {
                switchView(view);
            }
        });
    });
}

function switchView(viewId) {
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === viewId);
    });

    // Update views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.toggle('active', view.id === viewId);
    });

    currentView = viewId;

    // If switching to lab, reinitialize
    if (viewId === 'lab') {
        setTimeout(() => {
            loadScenario(currentScenario || 'basic-topology');
        }, 100);
    }
}

// ============================================
// Dashboard
// ============================================

function updateDashboardStats() {
    // Update domain progress cards
    Object.keys(domains).forEach(domainId => {
        const domainQuestions = questionBank.filter(q => q.domain === domainId);
        const answered = Object.keys(progress.questionHistory).filter(id => {
            const q = questionBank.find(question => question.id == id);
            return q && q.domain === domainId;
        }).length;

        const correct = Object.keys(progress.questionHistory).filter(id => {
            const q = questionBank.find(question => question.id == id);
            return q && q.domain === domainId && progress.questionHistory[id];
        }).length;

        // Update progress bar
        const progressFill = document.querySelector(`.progress-fill[data-domain="${domainId}"]`);
        if (progressFill) {
            const percentage = domainQuestions.length > 0 ? (answered / domainQuestions.length) * 100 : 0;
            progressFill.style.width = `${percentage}%`;
        }

        // Update progress text
        const card = document.querySelector(`.domain-card[data-domain="${domainId}"]`);
        if (card) {
            const progressText = card.querySelector('.progress-text');
            if (progressText) {
                progressText.textContent = `${correct}/${domainQuestions.length} correct`;
            }
        }
    });
}

// ============================================
// Quiz Engine
// ============================================

function startQuiz(domainFilter = null) {
    // Filter questions by domain if specified
    let questions = [...questionBank];
    if (domainFilter) {
        questions = questions.filter(q => q.domain === domainFilter);
    }

    // Shuffle questions
    questions = shuffleArray(questions);

    // Limit to reasonable number for a practice session
    const maxQuestions = Math.min(questions.length, 20);
    questions = questions.slice(0, maxQuestions);

    // Initialize quiz state
    quizState = {
        active: true,
        questions: questions,
        currentIndex: 0,
        answers: {},
        score: 0,
        startTime: Date.now(),
        timerInterval: null,
        selectedDomain: domainFilter,
        showingExplanation: false
    };

    // Switch to quiz view
    switchView('quiz');

    // Update quiz info
    document.getElementById('totalQuestions').textContent = questions.length;
    document.getElementById('currentDomain').textContent = domainFilter
        ? domains[domainFilter]?.name || 'Selected Domain'
        : 'All Domains';

    // Start timer
    startTimer();

    // Show first question
    showQuestion(0);

    // Hide completion card
    document.getElementById('quizComplete').classList.add('hidden');
    document.getElementById('questionCard').classList.remove('hidden');
}

function showQuestion(index) {
    const question = quizState.questions[index];
    if (!question) return;

    quizState.currentIndex = index;
    quizState.showingExplanation = false;

    // Update progress
    document.getElementById('currentQuestion').textContent = index + 1;
    document.getElementById('qNum').textContent = index + 1;
    const progressPercent = ((index) / quizState.questions.length) * 100;
    document.getElementById('quizProgressFill').style.width = `${progressPercent}%`;

    // Update domain badge
    document.getElementById('currentDomain').textContent = question.domainName;

    // Show question text
    document.getElementById('questionText').innerHTML = question.question;

    // Generate answer options
    const answersGrid = document.getElementById('answersGrid');
    answersGrid.innerHTML = '';

    question.options.forEach(option => {
        const optionEl = document.createElement('div');
        optionEl.className = 'answer-option';
        optionEl.dataset.letter = option.letter;

        // Check if already answered
        const previousAnswer = quizState.answers[question.id];
        if (previousAnswer) {
            optionEl.classList.add('disabled');
            if (option.letter === question.correct) {
                optionEl.classList.add('correct');
            } else if (option.letter === previousAnswer) {
                optionEl.classList.add('incorrect');
            }
        }

        optionEl.innerHTML = `
            <span class="answer-letter">${option.letter}</span>
            <span class="answer-text">${option.text}</span>
            <span class="answer-result"></span>
        `;

        if (!previousAnswer) {
            optionEl.addEventListener('click', () => selectAnswer(option.letter));
        }

        answersGrid.appendChild(optionEl);
    });

    // Update buttons
    document.getElementById('submitBtn').disabled = !quizState.answers[question.id] && !document.querySelector('.answer-option.selected');
    document.getElementById('viewLabBtn').disabled = !question.labScenario;

    // Reset button visibility - show submit, hide next
    document.getElementById('submitBtn').classList.remove('hidden');
    document.getElementById('nextBtn').classList.add('hidden');

    // Hide inline feedback
    document.getElementById('inlineFeedback').classList.add('hidden');

    // Show question card
    document.getElementById('questionCard').classList.remove('hidden');
}

function selectAnswer(letter) {
    if (quizState.showingExplanation) return;

    const question = quizState.questions[quizState.currentIndex];
    if (quizState.answers[question.id]) return; // Already answered

    // Remove previous selection
    document.querySelectorAll('.answer-option').forEach(opt => {
        opt.classList.remove('selected');
    });

    // Select new answer
    const selectedOption = document.querySelector(`.answer-option[data-letter="${letter}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }

    // Enable submit button
    document.getElementById('submitBtn').disabled = false;
}

function submitAnswer() {
    const question = quizState.questions[quizState.currentIndex];
    const selectedOption = document.querySelector('.answer-option.selected');

    if (!selectedOption) return;

    const selectedLetter = selectedOption.dataset.letter;
    const isCorrect = selectedLetter === question.correct;

    // Record answer
    quizState.answers[question.id] = selectedLetter;
    if (isCorrect) {
        quizState.score++;
    }

    // Update progress
    progress.totalAnswered++;
    if (isCorrect) {
        progress.totalCorrect++;
    }
    progress.questionHistory[question.id] = isCorrect;

    // Update domain scores
    if (!progress.domainScores[question.domain]) {
        progress.domainScores[question.domain] = { correct: 0, total: 0 };
    }
    progress.domainScores[question.domain].total++;
    if (isCorrect) {
        progress.domainScores[question.domain].correct++;
    }

    saveProgress();
    updateDashboardStats();

    // Show visual feedback
    document.querySelectorAll('.answer-option').forEach(opt => {
        opt.classList.add('disabled');
        const letter = opt.dataset.letter;

        if (letter === question.correct) {
            opt.classList.add('correct');
            opt.querySelector('.answer-result').innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="check">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            `;
        } else if (letter === selectedLetter && !isCorrect) {
            opt.classList.add('incorrect');
            opt.querySelector('.answer-result').innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="cross">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            `;
        }
    });

    // Show explanation
    showExplanation(question, isCorrect);

    // Disable submit button
    document.getElementById('submitBtn').disabled = true;
}

function showExplanation(question, isCorrect) {
    quizState.showingExplanation = true;

    const inlineFeedback = document.getElementById('inlineFeedback');
    const header = document.getElementById('feedbackHeader');
    const content = document.getElementById('feedbackContent');
    const details = document.getElementById('feedbackDetails');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    // Update header
    header.className = `feedback-header ${isCorrect ? 'correct' : 'incorrect'}`;
    header.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${isCorrect
            ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
            : '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'
        }
        </svg>
        <span>${isCorrect ? 'Correct!' : 'Incorrect'}</span>
    `;

    // Main explanation
    content.innerHTML = `<strong>Explanation:</strong><br>${question.explanation}`;

    // Option-by-option breakdown
    let detailsHtml = '<div class="answer-breakdown"><strong>Answer Analysis:</strong>';
    question.options.forEach(option => {
        const isCorrectOption = option.letter === question.correct;
        detailsHtml += `
            <div class="option-explanation ${isCorrectOption ? 'correct-answer' : 'wrong-answer'}">
                <span class="option-letter">${option.letter}</span>
                <div>
                    <span style="color: var(--text-primary)">${option.text}</span><br>
                    <span style="color: var(--text-secondary); font-size: 0.85rem;">${question.optionExplanations[option.letter]}</span>
                </div>
            </div>
        `;
    });
    detailsHtml += '</div>';
    details.innerHTML = detailsHtml;

    // Update button visibility - hide submit, show next
    submitBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');

    // Update next button text
    if (quizState.currentIndex >= quizState.questions.length - 1) {
        nextBtn.innerHTML = `
            Finish Quiz
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
        `;
    } else {
        nextBtn.innerHTML = `
            Next Question
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
            </svg>
        `;
    }

    // Show the inline feedback with animation
    inlineFeedback.classList.remove('hidden');

    // Scroll smoothly to the feedback
    setTimeout(() => {
        inlineFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

function nextQuestion() {
    if (quizState.currentIndex >= quizState.questions.length - 1) {
        // Quiz complete
        finishQuiz();
    } else {
        showQuestion(quizState.currentIndex + 1);
    }
}

function finishQuiz() {
    // Stop timer
    if (quizState.timerInterval) {
        clearInterval(quizState.timerInterval);
    }

    // Hide question card
    document.getElementById('questionCard').classList.add('hidden');

    // Show completion card
    const completeCard = document.getElementById('quizComplete');
    completeCard.classList.remove('hidden');

    // Update score display
    document.getElementById('finalScore').textContent = quizState.score;
    document.getElementById('finalTotal').textContent = quizState.questions.length;

    const percentage = Math.round((quizState.score / quizState.questions.length) * 100);
    document.getElementById('scorePercentage').textContent = `${percentage}% Correct`;

    // Update completion icon based on score
    const completeIcon = completeCard.querySelector('.complete-icon');
    if (percentage >= 80) {
        completeIcon.style.background = 'linear-gradient(135deg, #00ff88, #059669)';
    } else if (percentage >= 60) {
        completeIcon.style.background = 'linear-gradient(135deg, #ffa502, #d97706)';
    } else {
        completeIcon.style.background = 'linear-gradient(135deg, #ff4757, #dc2626)';
    }

    // Domain breakdown
    const breakdown = document.getElementById('domainBreakdown');
    let breakdownHtml = '';

    Object.keys(domains).forEach(domainId => {
        const domainQuestions = quizState.questions.filter(q => q.domain === domainId);
        if (domainQuestions.length > 0) {
            const correct = domainQuestions.filter(q => quizState.answers[q.id] === q.correct).length;
            breakdownHtml += `
                <div class="domain-score">
                    <div class="domain-score-header">
                        <span class="domain-score-name">${domains[domainId].name}</span>
                        <span class="domain-score-value">${correct}/${domainQuestions.length}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(correct / domainQuestions.length) * 100}%; background: ${domains[domainId].color}"></div>
                    </div>
                </div>
            `;
        }
    });
    breakdown.innerHTML = breakdownHtml;

    // Show toast
    if (percentage >= 80) {
        showToast('Excellent work! You passed! 🎉', 'success');
    } else if (percentage >= 60) {
        showToast('Good effort! Keep practicing! 💪', 'info');
    } else {
        showToast('Keep studying! You\'ll get there! 📚', 'info');
    }
}

function restartQuiz() {
    startQuiz(quizState.selectedDomain);
}

function reviewMissed() {
    // Filter to only missed questions
    const missedQuestions = quizState.questions.filter(q =>
        quizState.answers[q.id] && quizState.answers[q.id] !== q.correct
    );

    if (missedQuestions.length === 0) {
        showToast('No missed questions to review!', 'success');
        return;
    }

    // Start a new quiz with just the missed questions
    quizState = {
        active: true,
        questions: missedQuestions,
        currentIndex: 0,
        answers: {},
        score: 0,
        startTime: Date.now(),
        timerInterval: null,
        selectedDomain: quizState.selectedDomain,
        showingExplanation: false
    };

    document.getElementById('totalQuestions').textContent = missedQuestions.length;
    document.getElementById('currentDomain').textContent = 'Review: Missed Questions';

    startTimer();
    showQuestion(0);

    document.getElementById('quizComplete').classList.add('hidden');
    document.getElementById('questionCard').classList.remove('hidden');

    // Reset button visibility for new quiz
    document.getElementById('submitBtn').classList.remove('hidden');
    document.getElementById('nextBtn').classList.add('hidden');
}

// ============================================
// Timer
// ============================================

function startTimer() {
    if (quizState.timerInterval) {
        clearInterval(quizState.timerInterval);
    }

    quizState.startTime = Date.now();
    updateTimerDisplay();

    quizState.timerInterval = setInterval(updateTimerDisplay, 1000);
}

function updateTimerDisplay() {
    const elapsed = Math.floor((Date.now() - quizState.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

    document.getElementById('timerDisplay').textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// ============================================
// Lab Integration
// ============================================

function viewInLab() {
    const question = quizState.questions[quizState.currentIndex];
    if (question && question.labScenario) {
        loadLabFromQuiz(question.labScenario);
    }
}

function openLab() {
    switchView('lab');
}

// ============================================
// Toast Notifications
// ============================================

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = '';
    switch (type) {
        case 'success':
            icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
            break;
        case 'error':
            icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
            break;
        default:
            icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    }

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    // Remove after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Add toast out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes toastOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100%); }
    }
`;
document.head.appendChild(style);

// ============================================
// Utility Functions
// ============================================

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Domain card click handlers
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.domain-card').forEach(card => {
        card.addEventListener('click', () => {
            const domain = card.dataset.domain;
            if (domain) {
                startQuiz(domain);
            }
        });
    });
});

// Reset progress (for development)
function resetProgress() {
    progress = {
        totalCorrect: 0,
        totalAnswered: 0,
        domainScores: {},
        questionHistory: {}
    };
    saveProgress();
    updateDashboardStats();
    showToast('Progress reset', 'info');
}

// ============================================
// Quiz Mode Modal
// ============================================

function showQuizModeModal() {
    document.getElementById('quizModeModal').classList.remove('hidden');
}

function closeQuizModeModal() {
    document.getElementById('quizModeModal').classList.add('hidden');
}

function startQuizWithMode(mode) {
    const domainFilter = document.getElementById('domainFilter').value || null;
    closeQuizModeModal();

    // Get questions
    let questions = [...questionBank];
    if (domainFilter) {
        questions = questions.filter(q => q.domain === domainFilter);
    }

    // Shuffle
    questions = shuffleArray(questions);

    // Set question count based on mode
    let maxQuestions;
    let timeLimit = null;

    if (mode === 'exam') {
        // Exam mode: 100 questions (or all if less), 120 min timer
        maxQuestions = Math.min(questions.length, 100);
        timeLimit = 120 * 60; // 120 minutes in seconds
    } else {
        // Practice mode: 20 questions, no timer
        maxQuestions = Math.min(questions.length, 20);
        timeLimit = null;
    }

    questions = questions.slice(0, maxQuestions);

    // Initialize quiz state
    quizState = {
        active: true,
        mode: mode,
        questions: questions,
        currentIndex: 0,
        answers: {},
        score: 0,
        startTime: Date.now(),
        timerInterval: null,
        selectedDomain: domainFilter,
        showingExplanation: false,
        timeLimit: timeLimit
    };

    // Switch to quiz view
    switchView('quiz');

    // Update quiz info
    document.getElementById('totalQuestions').textContent = questions.length;
    document.getElementById('currentDomain').textContent = domainFilter
        ? domains[domainFilter]?.name || 'Selected Domain'
        : 'All Domains';

    // Update timer visibility based on mode
    const timerEl = document.getElementById('quizTimer');
    if (mode === 'practice') {
        timerEl.classList.add('hidden-timer');
        document.getElementById('timerDisplay').textContent = '∞';
    } else {
        timerEl.classList.remove('hidden-timer');
        startExamTimer();
    }

    // Show first question
    showQuestion(0);

    // Hide completion card
    document.getElementById('quizComplete').classList.add('hidden');
    document.getElementById('questionCard').classList.remove('hidden');

    // Reset button visibility for new quiz
    document.getElementById('submitBtn').classList.remove('hidden');
    document.getElementById('nextBtn').classList.add('hidden');

    // Show mode toast
    if (mode === 'exam') {
        showToast('📝 Exam Mode: 120 minutes to complete', 'info');
    } else {
        showToast('📚 Practice Mode: Take your time, learn the material', 'info');
    }
}

function startExamTimer() {
    if (quizState.timerInterval) {
        clearInterval(quizState.timerInterval);
    }

    quizState.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - quizState.startTime) / 1000);
        const remaining = quizState.timeLimit - elapsed;

        if (remaining <= 0) {
            // Time's up!
            clearInterval(quizState.timerInterval);
            showToast('⏰ Time\'s up!', 'error');
            finishQuiz();
            return;
        }

        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;

        document.getElementById('timerDisplay').textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Warning at 10 minutes
        if (remaining === 600) {
            showToast('⚠️ 10 minutes remaining!', 'info');
        }
        // Warning at 5 minutes
        if (remaining === 300) {
            showToast('⚠️ 5 minutes remaining!', 'info');
        }
    }, 1000);
}

// Update domain card click to show modal instead
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.domain-card').forEach(card => {
        card.addEventListener('click', () => {
            const domain = card.dataset.domain;
            if (domain) {
                document.getElementById('domainFilter').value = domain;
                showQuizModeModal();
            }
        });
    });
});
