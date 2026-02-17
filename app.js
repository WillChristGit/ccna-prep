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

    // Initialize based on view
    if (viewId === 'lab') {
        setTimeout(() => {
            loadScenario(currentScenario || 'basic-topology');
        }, 100);
    } else if (viewId === 'flashcards') {
        loadFlashcards();
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

// ============================================
// Flash Cards System
// ============================================

const fcState = {
    currentDomain: 'all',
    currentSubsection: null,
    currentIndex: 0,
    cards: [],
    subsections: [],
    reviewedCards: new Set(),
    cardProgress: {},
    currentCardViewed: false
};

const fcQuizState = {
    mode: 'study',
    score: 0,
    total: 0,
    currentQuestion: null,
    questionNumber: 0,
    totalQuestions: 10,
    answeredQuestions: [],
    quizCards: []
};

const fcMatchState = {
    mode: 'matching',
    score: 0,
    attempts: 0,
    matches: [],
    selectedTerm: null,
    selectedDef: null,
    timer: null,
    startTime: null,
    gameCards: [],
    shuffledDefs: []
};

const fcDomainNames = {
    'Network Fundamentals': 'Network Fundamentals',
    'Network Access': 'Network Access',
    'IP Connectivity': 'IP Connectivity',
    'IP Services': 'IP Services',
    'Security Fundamentals': 'Security Fundamentals',
    'Automation': 'Automation & Programmability'
};

const fcDomainMap = {
    'Network Fundamentals': 'network-fundamentals',
    'Network Access': 'network-access',
    'IP Connectivity': 'ip-connectivity',
    'IP Services': 'ip-services',
    'Security Fundamentals': 'security-fundamentals',
    'Automation': 'automation'
};

function initFlashcards() {
    initCardProgress();
    loadFlashcards();
    setupFlashcardEvents();
    setupFcDomainCards();
    showFcCards();
    updateFcProgressStats();
}

function loadFlashcards() {
    let cards = [...flashcardBank];
    
    if (fcState.currentDomain !== 'all') {
        cards = cards.filter(c => {
            const mappedDomain = fcDomainMap[c.domain];
            return mappedDomain === fcState.currentDomain;
        });
    }
    
    fcState.cards = cards;
    
    const subsections = [...new Set(cards.map(c => c.subsection))].sort();
    fcState.subsections = subsections;
    
    fcState.currentIndex = 0;
    fcState.currentSubsection = subsections[0] || null;
    
    renderFcSubsections();
    renderFcIndicators();
    updateFcCard();
    updateFcStats();
    
    // Ensure study mode is active on initial load
    if (!fcQuizState.mode) {
        setFcMode('study');
    }
}

function renderFcSubsections() {
    const tabsContainer = document.getElementById('fcSubsectionTabs');
    if (!tabsContainer) return;
    
    tabsContainer.innerHTML = fcState.subsections.map((sub, idx) => `
        <button class="fc-subsection-tab ${sub === fcState.currentSubsection ? 'active' : ''}" 
                data-subsection="${sub}" onclick="filterFcBySubsection('${sub}')">
            ${sub}
        </button>
    `).join('');
}

function filterFcBySubsection(subsection) {
    fcState.currentSubsection = subsection;
    
    const filteredCards = fcState.cards.filter(c => c.subsection === subsection);
    
    document.querySelectorAll('.fc-subsection-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.subsection === subsection);
    });
    
    fcState.currentIndex = 0;
    hideDifficultyButtons();
    renderFcIndicators();
    updateFcCard();
}

function renderFcIndicators() {
    const container = document.getElementById('fcIndicators');
    if (!container) return;
    
    let cardsToShow = fcState.cards;
    if (fcState.currentSubsection) {
        cardsToShow = cardsToShow.filter(c => c.subsection === fcState.currentSubsection);
    }
    
    container.innerHTML = cardsToShow.map((_, idx) => `
        <div class="fc-indicator ${idx === fcState.currentIndex ? 'active' : ''}"></div>
    `).join('');
}

function updateFcCard() {
    let cardsToShow = fcState.cards;
    if (fcState.currentSubsection) {
        cardsToShow = cardsToShow.filter(c => c.subsection === fcState.currentSubsection);
    }
    
    const card = cardsToShow[fcState.currentIndex];
    if (!card) return;
    
    const fcCard = document.getElementById('flashcard');
    const fcDomain = document.getElementById('fcDomain');
    const fcSubsection = document.getElementById('fcSubsection');
    const fcTerm = document.getElementById('fcTerm');
    const fcDefinition = document.getElementById('fcDefinition');
    const fcExample = document.getElementById('fcExample');
    
    fcCard.classList.remove('flipped');
    fcDomain.textContent = fcDomainNames[card.domain] || card.domain;
    fcSubsection.textContent = card.subsection;
    fcTerm.textContent = card.term;
    fcDefinition.textContent = card.definition;
    fcExample.textContent = card.example || '';
    fcExample.style.display = card.example ? 'block' : 'none';
    
    updateFcStats();
    
    const indicators = document.querySelectorAll('.fc-indicator');
    indicators.forEach((ind, idx) => {
        ind.classList.toggle('active', idx === fcState.currentIndex);
    });
}

function updateFcStats() {
    const countEl = document.getElementById('fcCardCount');
    if (!countEl) return;
    
    let cardsToShow = fcState.cards;
    if (fcState.currentSubsection) {
        cardsToShow = cardsToShow.filter(c => c.subsection === fcState.currentSubsection);
    }
    
    countEl.textContent = `${fcState.currentIndex + 1} / ${cardsToShow.length}`;
}

function setupFlashcardEvents() {
    const fcCard = document.getElementById('flashcard');
    if (fcCard) {
        fcCard.addEventListener('click', () => {
            fcCard.classList.toggle('flipped');
            
            const cardId = getCurrentFcCardId();
            if (cardId) {
                fcState.reviewedCards.add(cardId);
                
                if (!fcState.currentCardViewed && fcCard.classList.contains('flipped')) {
                    fcState.currentCardViewed = true;
                    updateCardProgressUI();
                }
            }
        });
    }
}

function getCurrentFcCardId() {
    let cardsToShow = fcState.cards;
    if (fcState.currentSubsection) {
        cardsToShow = cardsToShow.filter(c => c.subsection === fcState.currentSubsection);
    }
    const card = cardsToShow[fcState.currentIndex];
    return card ? card.id : null;
}

function fcNextCard() {
    let cardsToShow = fcState.cards;
    if (fcState.currentSubsection) {
        cardsToShow = cardsToShow.filter(c => c.subsection === fcState.currentSubsection);
    }
    
    if (fcState.currentIndex < cardsToShow.length - 1) {
        fcState.currentIndex++;
        hideDifficultyButtons();
        updateFcCard();
    } else {
        if (fcState.currentSubsection) {
            const currentIdx = fcState.subsections.indexOf(fcState.currentSubsection);
            if (currentIdx < fcState.subsections.length - 1) {
                filterFcBySubsection(fcState.subsections[currentIdx + 1]);
            }
        }
    }
}

function fcPrevCard() {
    if (fcState.currentIndex > 0) {
        fcState.currentIndex--;
        hideDifficultyButtons();
        updateFcCard();
    } else {
        if (fcState.currentSubsection) {
            const currentIdx = fcState.subsections.indexOf(fcState.currentSubsection);
            if (currentIdx > 0) {
                filterFcBySubsection(fcState.subsections[currentIdx - 1]);
                let cardsToShow = fcState.cards.filter(c => c.subsection === fcState.currentSubsection);
                fcState.currentIndex = cardsToShow.length - 1;
                hideDifficultyButtons();
                updateFcCard();
            }
        }
    }
}

function setupFcDomainCards() {
    document.querySelectorAll('.fc-domain-card').forEach(card => {
        card.addEventListener('click', () => {
            const domain = card.dataset.domain;
            if (domain) {
                fcState.currentDomain = domain;
                
                document.querySelectorAll('.fc-domain-card').forEach(c => {
                    c.classList.toggle('active', c.dataset.domain === domain);
                });
                
                loadFlashcards();
                showFcCards();
            }
        });
    });
}

function showFcCards() {
    loadFlashcards();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (currentView === 'flashcards') {
        const fcCard = document.getElementById('flashcard');
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            fcCard.classList.toggle('flipped');
            const cardId = getCurrentFcCardId();
            if (cardId) {
                fcState.reviewedCards.add(cardId);
                if (!fcState.currentCardViewed && fcCard.classList.contains('flipped')) {
                    fcState.currentCardViewed = true;
                    updateCardProgressUI();
                }
            }
        } else if (e.key === 'ArrowRight' || e.key === 'n') {
            fcNextCard();
        } else if (e.key === 'ArrowLeft' || e.key === 'p') {
            fcPrevCard();
        } else if (e.key === 'r') {
            shuffleFlashcards();
        } else if (e.key === 's') {
            speakFlashcard();
        } else if (e.key === '1') {
            if (fcState.currentCardViewed) rateCard(1);
        } else if (e.key === '2') {
            if (fcState.currentCardViewed) rateCard(3);
        } else if (e.key === '3') {
            if (fcState.currentCardViewed) rateCard(4);
        } else if (e.key === '4') {
            if (fcState.currentCardViewed) rateCard(5);
        }
    } else if (currentView === 'quiz' && quizState.active) {
        if (e.key === 'Enter' && !document.getElementById('submitBtn').disabled) {
            if (!document.getElementById('nextBtn').classList.contains('hidden')) {
                nextQuestion();
            } else {
                submitAnswer();
            }
        }
    }
});

function shuffleFlashcards() {
    const cards = fcState.cards;
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    fcState.currentIndex = 0;
    fcState.currentSubsection = null;
    renderFcSubsections();
    renderFcIndicators();
    updateFcCard();
    showToast('Cards shuffled!', 'info');
}

// ============================================
// Text-to-Speech (TTS) for Flash Cards
// ============================================

let ttsSupported = false;

function initTTS() {
    ttsSupported = 'speechSynthesis' in window;
    if (!ttsSupported) {
        console.warn('Text-to-speech not supported in this browser');
    }
}

function getCurrentFlashcard() {
    let cardsToShow = fcState.cards;
    if (fcState.currentSubsection) {
        cardsToShow = cardsToShow.filter(c => c.subsection === fcState.currentSubsection);
    }
    return cardsToShow[fcState.currentIndex];
}

function isFlashcardFlipped() {
    const fcCard = document.getElementById('flashcard');
    return fcCard && fcCard.classList.contains('flipped');
}

function speakTerm() {
    if (!ttsSupported) {
        showToast('Text-to-speech not supported in this browser', 'error');
        return;
    }

    window.speechSynthesis.cancel();

    const card = getCurrentFlashcard();
    if (!card || !card.term) {
        showToast('No card to speak', 'error');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(card.term);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onerror = (event) => {
        console.error('TTS Error:', event.error);
        showToast('Error speaking term', 'error');
    };

    window.speechSynthesis.speak(utterance);
}

function speakDefinition() {
    if (!ttsSupported) {
        showToast('Text-to-speech not supported in this browser', 'error');
        return;
    }

    window.speechSynthesis.cancel();

    const card = getCurrentFlashcard();
    if (!card || !card.definition) {
        showToast('No definition to speak', 'error');
        return;
    }

    let textToSpeak = card.definition;
    if (card.example) {
        textToSpeak += '. Example: ' + card.example;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onerror = (event) => {
        console.error('TTS Error:', event.error);
        showToast('Error speaking definition', 'error');
    };

    window.speechSynthesis.speak(utterance);
}

function speakFlashcard() {
    if (isFlashcardFlipped()) {
        speakDefinition();
    } else {
        speakTerm();
    }
}

function stopSpeaking() {
    if (ttsSupported) {
        window.speechSynthesis.cancel();
    }
}

// ============================================
// Spaced Repetition System (SM-2)
// ============================================

function initCardProgress() {
    const saved = localStorage.getItem('ccnaCardProgress');
    if (saved) {
        try {
            fcState.cardProgress = JSON.parse(saved);
        } catch (e) {
            console.error('Failed to load card progress:', e);
            fcState.cardProgress = {};
        }
    }
}

function saveCardProgress() {
    localStorage.setItem('ccnaCardProgress', JSON.stringify(fcState.cardProgress));
}

function rateCard(rating) {
    const cardId = getCurrentFcCardId();
    if (!cardId) return;

    const now = Date.now();
    let progress = fcState.cardProgress[cardId] || {
        easeFactor: 2.5,
        interval: 0,
        nextReview: now,
        reviewCount: 0,
        lastRating: null
    };

    const q = rating;

    if (q < 3) {
        progress.interval = 1;
        progress.easeFactor = Math.max(1.3, progress.easeFactor - 0.2);
    } else {
        if (progress.reviewCount === 0) {
            progress.interval = 1;
        } else if (progress.reviewCount === 1) {
            progress.interval = 6;
        } else {
            progress.interval = Math.round(progress.interval * progress.easeFactor);
        }
        progress.easeFactor = progress.easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
        progress.easeFactor = Math.max(1.3, progress.easeFactor);
    }

    progress.nextReview = now + (progress.interval * 24 * 60 * 60 * 1000);
    progress.reviewCount++;
    progress.lastRating = rating;

    fcState.cardProgress[cardId] = progress;
    saveCardProgress();

    hideDifficultyButtons();
    fcNextCard();
    updateFcProgressStats();
}

function getCardsForReview() {
    const now = Date.now();
    const cardsWithProgress = fcState.cards.map(card => {
        const progress = fcState.cardProgress[card.id];
        return {
            ...card,
            progress: progress,
            due: !progress || progress.nextReview <= now
        };
    });

    cardsWithProgress.sort((a, b) => {
        if (a.due && !b.due) return -1;
        if (!a.due && b.due) return 1;
        if (a.due && b.due) {
            return a.progress.nextReview - b.progress.nextReview;
        }
        return 0;
    });

    return cardsWithProgress;
}

function updateCardProgressUI() {
    const buttonsContainer = document.getElementById('difficultyButtons');
    if (!buttonsContainer) return;

    buttonsContainer.classList.remove('hidden');
}

function hideDifficultyButtons() {
    const buttonsContainer = document.getElementById('difficultyButtons');
    if (buttonsContainer) {
        buttonsContainer.classList.add('hidden');
    }
    fcState.currentCardViewed = false;
}

function updateFcProgressStats() {
    const dueCountEl = document.getElementById('fcDueCount');
    if (!dueCountEl) return;

    const cards = getCardsForReview();
    const dueCount = cards.filter(c => c.due).length;
    dueCountEl.textContent = dueCount;
}

// ============================================
// Flash Card Quiz Mode
// ============================================

// ============================================
// Flash Card Mode Toggle (Study/Quiz/Matching)
// ============================================

function setFcMode(mode) {
    const studyContainer = document.getElementById('flashcardWrapper');
    const quizContainer = document.getElementById('fcQuizContainer');
    const quizResults = document.getElementById('fcQuizResults');
    const matchingContainer = document.getElementById('fcMatchingContainer');
    const matchingModal = document.getElementById('fcMatchModal');
    
    document.querySelectorAll('.fc-mode-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('fcStudyBtn').classList.remove('active');
    document.getElementById('fcQuizBtn').classList.remove('active');
    document.getElementById('fcMatchBtn').classList.remove('active');
    
    hideDifficultyButtons();
    
    if (mode === 'study') {
        fcQuizState.mode = 'study';
        document.getElementById('fcStudyBtn').classList.add('active');
        
        studyContainer.classList.remove('hidden');
        quizContainer.classList.add('hidden');
        quizResults.classList.add('hidden');
        matchingContainer.classList.add('hidden');
        matchingModal.classList.add('hidden');
        
        if (fcMatchState.timer) {
            clearInterval(fcMatchState.timer);
            fcMatchState.timer = null;
        }
    } else if (mode === 'quiz') {
        fcQuizState.mode = 'quiz';
        document.getElementById('fcQuizBtn').classList.add('active');
        
        studyContainer.classList.add('hidden');
        quizResults.classList.add('hidden');
        matchingContainer.classList.add('hidden');
        matchingModal.classList.add('hidden');
        
        if (fcMatchState.timer) {
            clearInterval(fcMatchState.timer);
            fcMatchState.timer = null;
        }
        
        quizContainer.classList.remove('hidden');
        startFcQuiz();
    } else if (mode === 'matching') {
        fcMatchState.mode = 'matching';
        document.getElementById('fcMatchBtn').classList.add('active');
        
        studyContainer.classList.add('hidden');
        quizContainer.classList.add('hidden');
        quizResults.classList.add('hidden');
        matchingModal.classList.add('hidden');
        
        matchingContainer.classList.remove('hidden');
        
        showMatchingStartScreen();
    }
}

function toggleFcMode() {
    if (fcQuizState.mode === 'study') {
        setFcMode('quiz');
    } else {
        setFcMode('study');
    }
}

function startFcQuiz() {
    let cards = [...flashcardBank];
    
    if (fcState.currentDomain !== 'all') {
        cards = cards.filter(c => {
            const mappedDomain = fcDomainMap[c.domain];
            return mappedDomain === fcState.currentDomain;
        });
    }
    
    cards = shuffleArray(cards).slice(0, fcQuizState.totalQuestions);
    
    fcQuizState.score = 0;
    fcQuizState.total = cards.length;
    fcQuizState.questionNumber = 0;
    fcQuizState.answeredQuestions = [];
    
    const quizResults = document.getElementById('fcQuizResults');
    quizResults.classList.add('hidden');
    
    fcQuizState.currentQuestion = cards[0];
    fcQuizState.quizCards = cards;
    fcQuizQuestion();
}

function fcQuizQuestion() {
    const question = fcQuizState.currentQuestion;
    if (!question) return;
    
    const questionNum = document.getElementById('fcQuizQuestionNum');
    const questionTotal = document.getElementById('fcQuizTotal');
    const questionText = document.getElementById('fcQuizQuestionText');
    const optionsContainer = document.getElementById('fcQuizOptions');
    
    questionNum.textContent = fcQuizState.questionNumber + 1;
    questionTotal.textContent = fcQuizState.total;
    
    const progressFill = document.getElementById('fcQuizProgressFill');
    if (progressFill) {
        const progressPercent = (fcQuizState.questionNumber / fcQuizState.total) * 100;
        progressFill.style.width = `${progressPercent}%`;
    }
    
    const isTermQuestion = Math.random() > 0.5;
    
    if (isTermQuestion) {
        questionText.textContent = `What is the definition of: "${question.term}"?`;
    } else {
        questionText.textContent = `Which term matches this definition?\n\n"${question.definition}"`;
    }
    
    let cards = [...flashcardBank];
    if (fcState.currentDomain !== 'all') {
        cards = cards.filter(c => {
            const mappedDomain = fcDomainMap[c.domain];
            return mappedDomain === fcState.currentDomain;
        });
    }
    
    const usedIds = fcQuizState.answeredQuestions.map(a => a.question.id);
    usedIds.push(question.id);
    
    const distractors = shuffleArray(cards.filter(c => !usedIds.includes(c.id))).slice(0, 3);
    const allOptions = shuffleArray([question, ...distractors]);
    
    optionsContainer.innerHTML = '';
    
    allOptions.forEach((option) => {
        const optionEl = document.createElement('div');
        optionEl.className = 'fc-quiz-option';
        optionEl.dataset.id = option.id;
        
        if (isTermQuestion) {
            optionEl.textContent = option.definition;
        } else {
            optionEl.textContent = option.term;
        }
        
        optionEl.addEventListener('click', () => selectFcQuizAnswer(option.id, isTermQuestion));
        optionsContainer.appendChild(optionEl);
    });
}

function selectFcQuizAnswer(selectedId, isTermQuestion) {
    const question = fcQuizState.currentQuestion;
    const options = document.querySelectorAll('.fc-quiz-option');
    const isCorrect = selectedId === question.id;
    
    options.forEach(opt => {
        opt.classList.add('disabled');
        const optId = parseInt(opt.dataset.id);
        
        if (optId === question.id) {
            opt.classList.add('correct');
        } else if (optId === selectedId && !isCorrect) {
            opt.classList.add('incorrect');
        }
    });
    
    fcQuizState.answeredQuestions.push({
        question: question,
        selectedId: selectedId,
        correct: isCorrect
    });
    
    if (isCorrect) {
        fcQuizState.score++;
    }
    
    fcQuizState.questionNumber++;
    
    setTimeout(() => {
        if (fcQuizState.questionNumber < fcQuizState.total) {
            const usedIds = fcQuizState.answeredQuestions.map(a => a.question.id);
            let cards = [...flashcardBank];
            
            if (fcState.currentDomain !== 'all') {
                cards = cards.filter(c => {
                    const mappedDomain = fcDomainMap[c.domain];
                    return mappedDomain === fcState.currentDomain;
                });
            }
            
            const availableCards = cards.filter(c => !usedIds.includes(c.id));
            
            if (availableCards.length > 0) {
                fcQuizState.currentQuestion = availableCards[Math.floor(Math.random() * availableCards.length)];
            }
            
            fcQuizQuestion();
        } else {
            showFcQuizResults();
        }
    }, 1500);
}

function showFcQuizResults() {
    const quizContainer = document.getElementById('fcQuizContainer');
    const quizResults = document.getElementById('fcQuizResults');
    
    quizContainer.classList.add('hidden');
    quizResults.classList.remove('hidden');
    
    const finalScore = document.getElementById('fcFinalScore');
    const finalTotal = document.getElementById('fcFinalTotal');
    const scorePercent = document.getElementById('fcScorePercent');
    
    finalScore.textContent = fcQuizState.score;
    finalTotal.textContent = fcQuizState.total;
    
    const percentage = Math.round((fcQuizState.score / fcQuizState.total) * 100);
    scorePercent.textContent = `${percentage}% Correct`;
    
    const resultsIcon = document.getElementById('fcResultsIcon');
    if (percentage >= 80) {
        resultsIcon.style.background = 'linear-gradient(135deg, #00ff88, #059669)';
    } else if (percentage >= 60) {
        resultsIcon.style.background = 'linear-gradient(135deg, #ffa502, #d97706)';
    } else {
        resultsIcon.style.background = 'linear-gradient(135deg, #ff4757, #dc2626)';
    }
    
    if (percentage >= 80) {
        showToast('Excellent! You passed the quiz!', 'success');
    } else if (percentage >= 60) {
        showToast('Good effort! Keep practicing!', 'info');
    } else {
        showToast('Keep studying! You\'ll get there!', 'info');
    }
}

function retryFcQuiz() {
    const quizContainer = document.getElementById('fcQuizContainer');
    const quizResults = document.getElementById('fcQuizResults');
    
    quizResults.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    
    startFcQuiz();
}

// ============================================
// Flash Card Matching Game
// ============================================

function startMatchingGame() {
    console.log('startMatchingGame called');
    
    let cards = [...flashcardBank];
    
    if (fcState.currentDomain !== 'all') {
        cards = cards.filter(c => {
            const mappedDomain = fcDomainMap[c.domain];
            return mappedDomain === fcState.currentDomain;
        });
    }
    
    console.log('Available cards:', cards.length);
    
    if (cards.length < 8) {
        showToast('Not enough flashcards for matching game. Need at least 8 cards.', 'error');
        return;
    }
    
    const numCards = 8;
    cards = shuffleArray(cards).slice(0, numCards);
    
    const shuffledDefs = shuffleArray([...cards]);
    
    fcMatchState = {
        mode: 'matching',
        score: 0,
        attempts: 0,
        matches: [],
        selectedTerm: null,
        selectedDef: null,
        timer: null,
        startTime: null,
        gameCards: cards,
        shuffledDefs: shuffledDefs
    };
    
    const startScreen = document.getElementById('fcMatchingStart');
    const gameScreen = document.getElementById('fcMatchingGame');
    const modal = document.getElementById('fcMatchModal');
    
    if (startScreen) startScreen.classList.add('hidden');
    if (gameScreen) gameScreen.classList.remove('hidden');
    if (modal) modal.classList.add('hidden');
    
    console.log('Rendering matching game');
    renderMatchingGame();
    startMatchingTimer();
    
    document.getElementById('fcMatchScore').textContent = '0';
    document.getElementById('fcMatchCount').textContent = '0';
    document.getElementById('fcMatchTotal').textContent = numCards;
}

function showMatchingStartScreen() {
    let cards = [...flashcardBank];
    
    if (fcState.currentDomain !== 'all') {
        cards = cards.filter(c => {
            const mappedDomain = fcDomainMap[c.domain];
            return mappedDomain === fcState.currentDomain;
        });
    }
    
    const availableCount = cards.length;
    document.getElementById('fcMatchCardsAvailable').textContent = availableCount;
    
    // Show start screen, hide game screen
    document.getElementById('fcMatchingStart').classList.remove('hidden');
    document.getElementById('fcMatchingGame').classList.add('hidden');
    document.getElementById('fcMatchModal').classList.add('hidden');
    
    // Enable/disable start button
    const startBtn = document.querySelector('#fcMatchingStart .btn-primary');
    if (startBtn) {
        if (availableCount < 8) {
            startBtn.disabled = true;
            startBtn.innerHTML = 'Not Enough Cards';
        } else {
            startBtn.disabled = false;
            startBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                Start Matching Game
            `;
        }
    }
    
    if (fcMatchState.timer) {
        clearInterval(fcMatchState.timer);
        fcMatchState.timer = null;
    }
}

function startMatchingTimer() {
    if (fcMatchState.timer) {
        clearInterval(fcMatchState.timer);
    }
    
    fcMatchState.startTime = Date.now();
    
    const timerEl = document.getElementById('fcMatchTimer');
    if (timerEl) {
        timerEl.textContent = '00:00';
    }
    
    fcMatchState.timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - fcMatchState.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        
        const timerEl = document.getElementById('fcMatchTimer');
        if (timerEl) {
            timerEl.textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

function renderMatchingGame() {
    const termsList = document.getElementById('fcMatchTermsList');
    const defsList = document.getElementById('fcMatchDefsList');
    
    if (!termsList || !defsList) {
        console.error('Matching game elements not found');
        return;
    }
    
    termsList.innerHTML = fcMatchState.gameCards.map(card => `
        <div class="fc-match-card" data-id="${card.id}" data-type="term" onclick="handleTermClick(${card.id})">
            <span class="fc-match-term">${card.term}</span>
        </div>
    `).join('');
    
    defsList.innerHTML = fcMatchState.shuffledDefs.map(card => `
        <div class="fc-match-card" data-id="${card.id}" data-type="def" onclick="handleDefClick(${card.id})">
            <span class="fc-match-def">${card.definition}</span>
        </div>
    `).join('');
}

function handleTermClick(cardId) {
    if (fcMatchState.matches.includes(cardId)) return;
    if (fcMatchState.selectedTerm === cardId) return;
    
    const termCards = document.querySelectorAll('#fcMatchTermsList .fc-match-card');
    termCards.forEach(card => {
        card.classList.remove('selected');
    });
    
    const clickedCard = document.querySelector(`#fcMatchTermsList .fc-match-card[data-id="${cardId}"]`);
    if (clickedCard) {
        clickedCard.classList.add('selected');
    }
    
    fcMatchState.selectedTerm = cardId;
    
    if (fcMatchState.selectedDef !== null) {
        checkMatch();
    }
}

function handleDefClick(cardId) {
    if (fcMatchState.matches.includes(cardId)) return;
    if (fcMatchState.selectedDef === cardId) return;
    
    const defCards = document.querySelectorAll('#fcMatchDefsList .fc-match-card');
    defCards.forEach(card => {
        card.classList.remove('selected');
    });
    
    const clickedCard = document.querySelector(`#fcMatchDefsList .fc-match-card[data-id="${cardId}"]`);
    if (clickedCard) {
        clickedCard.classList.add('selected');
    }
    
    fcMatchState.selectedDef = cardId;
    
    if (fcMatchState.selectedTerm !== null) {
        checkMatch();
    }
}

function checkMatch() {
    if (fcMatchState.selectedTerm === null || fcMatchState.selectedDef === null) return;
    
    const termId = fcMatchState.selectedTerm;
    const defId = fcMatchState.selectedDef;
    
    fcMatchState.attempts++;
    
    const termCard = document.querySelector(`#fcMatchTermsList .fc-match-card[data-id="${termId}"]`);
    const defCard = document.querySelector(`#fcMatchDefsList .fc-match-card[data-id="${defId}"]`);
    
    if (!termCard || !defCard) {
        fcMatchState.selectedTerm = null;
        fcMatchState.selectedDef = null;
        return;
    }
    
    if (termId === defId) {
        fcMatchState.score++;
        fcMatchState.matches.push(termId);
        
        termCard.classList.remove('selected');
        termCard.classList.add('correct', 'matched');
        
        defCard.classList.remove('selected');
        defCard.classList.add('correct', 'matched');
        
        document.getElementById('fcMatchScore').textContent = fcMatchState.score;
        document.getElementById('fcMatchCount').textContent = fcMatchState.matches.length;
        
        if (fcMatchState.matches.length === fcMatchState.gameCards.length) {
            setTimeout(() => {
                showMatchResults();
            }, 500);
        }
    } else {
        termCard.classList.add('incorrect');
        defCard.classList.add('incorrect');
        
        setTimeout(() => {
            termCard.classList.remove('selected', 'incorrect');
            defCard.classList.remove('selected', 'incorrect');
        }, 600);
    }
    
    fcMatchState.selectedTerm = null;
    fcMatchState.selectedDef = null;
}

function showMatchResults() {
    if (fcMatchState.timer) {
        clearInterval(fcMatchState.timer);
        fcMatchState.timer = null;
    }
    
    const elapsed = Math.floor((Date.now() - fcMatchState.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    document.getElementById('fcMatchFinalScore').textContent = fcMatchState.score;
    document.getElementById('fcMatchFinalTime').textContent = timeStr;
    document.getElementById('fcMatchAttempts').textContent = fcMatchState.attempts;
    
    const gameScreen = document.getElementById('fcMatchingGame');
    if (gameScreen) {
        gameScreen.classList.add('hidden');
    }
    
    const modal = document.getElementById('fcMatchModal');
    modal.classList.remove('hidden');
    
    const percentage = (fcMatchState.score / fcMatchState.gameCards.length) * 100;
    
    if (percentage >= 80) {
        showToast('Excellent! You matched all terms!', 'success');
    } else if (percentage >= 60) {
        showToast('Good job! Keep practicing!', 'info');
    } else {
        showToast('Keep studying! You\'ll get better!', 'info');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initFlashcards();
    initTTS();
});
