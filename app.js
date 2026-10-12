// Grammar Game: Subject & Predicate Quest
// Interactive logic, selection handling, scoring, sound, background music, and animations

// Procedural Background Music Generator using Web Audio API
class BackgroundMusic {
  constructor(audioCtx) {
    this.audioCtx = audioCtx;
    this.isPlaying = false;
    this.tempo = 108; // BPM
    this.secondsPerBeat = 60.0 / this.tempo;
    this.stepDuration = this.secondsPerBeat / 2; // Eighth-note resolution
    this.currentStep = 0;
    this.nextNoteTime = 0.0;
    this.scheduleAheadTime = 0.15;
    this.timerId = null;

    this.bgmGainNode = null;
    this.initMasterGain();

    // 4-measure chord progressions (C -> G -> Am -> F)
    this.chords = [
      [130.81, 196.00, 261.63, 329.63], // C major (C3, G3, C4, E4)
      [98.00, 146.83, 246.94, 293.66],  // G major (G2, D3, B3, D4)
      [110.00, 164.81, 220.00, 261.63], // A minor (A2, E3, A3, C4)
      [87.31, 130.81, 220.00, 349.23]   // F major (F2, C3, A3, F4)
    ];

    // Bass line for 32 steps (8 steps per bar)
    this.bassPattern = [
      65.41, 0, 0, 0, 98.00, 0, 65.41, 0,
      98.00, 0, 0, 0, 146.83, 0, 98.00, 0,
      110.00, 0, 0, 0, 82.41, 0, 110.00, 0,
      87.31, 0, 0, 0, 130.81, 0, 87.31, 0
    ];

    // Cheerful, mellow marimba / kalimba lead (32 steps)
    this.melodyPattern = [
      329.63, 0, 392.00, 0, 440.00, 523.25, 392.00, 0,
      293.66, 0, 392.00, 0, 493.88, 0, 392.00, 293.66,
      261.63, 0, 329.63, 0, 440.00, 0, 392.00, 329.63,
      349.23, 0, 440.00, 0, 523.25, 392.00, 329.63, 293.66
    ];
  }

  initMasterGain() {
    if (!this.audioCtx) return;
    this.bgmGainNode = this.audioCtx.createGain();
    this.bgmGainNode.gain.setValueAtTime(0.48, this.audioCtx.currentTime); // Louder, clearly audible
    this.bgmGainNode.connect(this.audioCtx.destination);
  }

  playLeadNote(freq, time, duration = 0.22) {
    if (!this.audioCtx || !this.bgmGainNode || !freq) return;
    const osc = this.audioCtx.createOscillator();
    const filter = this.audioCtx.createBiquadFilter();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, time);
    filter.frequency.exponentialRampToValueAtTime(800, time + duration);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(0.32, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmGainNode);

    osc.start(time);
    osc.stop(time + duration);
  }

  playBassNote(freq, time, duration = 0.35) {
    if (!this.audioCtx || !this.bgmGainNode || !freq) return;
    const osc = this.audioCtx.createOscillator();
    const filter = this.audioCtx.createBiquadFilter();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(0.36, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmGainNode);

    osc.start(time);
    osc.stop(time + duration);
  }

  playChordPad(chordFreqs, time, duration = 1.9) {
    if (!this.audioCtx || !this.bgmGainNode || !chordFreqs) return;
    chordFreqs.forEach(freq => {
      const osc = this.audioCtx.createOscillator();
      const filter = this.audioCtx.createBiquadFilter();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1100, time);

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.10, time + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.bgmGainNode);

      osc.start(time);
      osc.stop(time + duration);
    });
  }

  scheduler() {
    if (!this.isPlaying || !this.audioCtx) return;

    while (this.nextNoteTime < this.audioCtx.currentTime + this.scheduleAheadTime) {
      if (this.currentStep % 8 === 0) {
        const chordIndex = Math.floor(this.currentStep / 8) % this.chords.length;
        this.playChordPad(this.chords[chordIndex], this.nextNoteTime);
      }

      const bassNote = this.bassPattern[this.currentStep % this.bassPattern.length];
      if (bassNote) {
        this.playBassNote(bassNote, this.nextNoteTime);
      }

      const melodyNote = this.melodyPattern[this.currentStep % this.melodyPattern.length];
      if (melodyNote) {
        this.playLeadNote(melodyNote, this.nextNoteTime);
      }

      this.nextNoteTime += this.stepDuration;
      this.currentStep = (this.currentStep + 1) % 32;
    }
  }

  start() {
    if (this.isPlaying || !this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    if (!this.bgmGainNode) {
      this.initMasterGain();
    }
    this.isPlaying = true;
    this.nextNoteTime = this.audioCtx.currentTime + 0.05;
    this.timerId = setInterval(() => this.scheduler(), 35);
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  setVolume(vol) {
    if (this.bgmGainNode && this.audioCtx) {
      this.bgmGainNode.gain.setValueAtTime(vol, this.audioCtx.currentTime);
    }
  }
}

class GrammarGame {
  constructor() {
    this.currentLevelIndex = 0;
    this.currentQuestionIndex = 0;
    this.totalScore = 0;
    
    // Track scores and question completion: 4 levels x 5 questions
    this.progress = GAME_DATA.levels.map(level => ({
      levelId: level.id,
      score: 0,
      completedCount: 0,
      questionResults: new Array(level.questions.length).fill(null) // null, 'correct', 'incorrect'
    }));

    // Mutual exclusion: Each word is ONLY circled (Subject) or ONLY underlined (Predicate) or unmarked!
    this.tokenSelections = new Map();
    this.activeTool = 'circle'; // 'circle' (Subject), 'underline' (Predicate), 'eraser'
    this.isSubmitted = false;
    this.isPaused = false;
    this.soundEnabled = true;
    this.musicEnabled = true;
    this.isMouseDown = false;

    // Web Audio Context & BGM
    this.audioCtx = null;
    this.bgm = null;

    // DOM Elements
    this.initDOMElements();
    this.initAudio();
    this.initConfetti();
    this.attachEventListeners();
    this.loadQuestion();
    this.updateStatsUI();
  }

  initDOMElements() {
    this.totalScoreEl = document.getElementById('total-score-val');
    this.scoreBadgeEl = document.getElementById('score-badge');
    this.levelTabsContainer = document.getElementById('level-nav');
    this.questionCounterEl = document.getElementById('question-counter-text');
    this.dotsContainer = document.getElementById('dots-indicator');
    this.levelWorthEl = document.getElementById('level-worth-tag');
    
    // Tools
    this.toolCircleBtn = document.getElementById('tool-circle');
    this.toolUnderlineBtn = document.getElementById('tool-underline');
    this.toolEraserBtn = document.getElementById('tool-eraser');
    
    // Workspace
    this.sentenceContainer = document.getElementById('sentence-tokens');
    this.clearBtn = document.getElementById('btn-clear');
    this.submitBtn = document.getElementById('btn-submit');
    
    // Feedback
    this.feedbackCard = document.getElementById('feedback-card');
    this.feedbackIcon = document.getElementById('feedback-icon');
    this.feedbackTitle = document.getElementById('feedback-title');
    this.feedbackPoints = document.getElementById('feedback-points');
    this.userSubjectText = document.getElementById('user-subject-text');
    this.correctSubjectText = document.getElementById('correct-subject-text');
    this.subjectStatusTag = document.getElementById('subject-status-tag');
    this.userPredicateText = document.getElementById('user-predicate-text');
    this.correctPredicateText = document.getElementById('correct-predicate-text');
    this.predicateStatusTag = document.getElementById('predicate-status-tag');
    this.grammarExplanation = document.getElementById('grammar-explanation');
    this.btnNext = document.getElementById('btn-next');
    this.btnRetry = document.getElementById('btn-retry');
    
    // Level Completion Modal
    this.modalOverlay = document.getElementById('modal-overlay');
    this.modalTitle = document.getElementById('modal-title');
    this.modalDesc = document.getElementById('modal-desc');
    this.modalLevelScore = document.getElementById('modal-level-score');
    this.modalTotalScore = document.getElementById('modal-total-score');
    this.modalNextLevelBtn = document.getElementById('modal-btn-next-level');

    // Pause Controls
    this.btnPause = document.getElementById('btn-pause');
    this.btnResume = document.getElementById('btn-resume');
    this.pauseModalOverlay = document.getElementById('pause-modal-overlay');

    // Start / Welcome screen
    this.startScreenOverlay = document.getElementById('start-screen-overlay');
    this.btnPlayGame = document.getElementById('btn-play-game');
    
    // Sound and Music toggles
    this.audioToggleBtn = document.getElementById('audio-toggle-btn');
    this.musicToggleBtn = document.getElementById('music-toggle-btn');
    this.volumeSlider = document.getElementById('bgm-volume-slider');
  }

  initAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
        this.bgm = new BackgroundMusic(this.audioCtx);
      }
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  ensureAudioContext() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playBeep(freq, type = 'sine', duration = 0.12, gainVal = 0.15) {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.ensureAudioContext();
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {}
  }

  playWordClickSound() {
    this.playBeep(480, 'triangle', 0.06, 0.1);
  }

  playSuccessSound() {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.ensureAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playBeep(freq, 'sine', 0.25, 0.18);
      }, idx * 80);
    });
  }

  playErrorSound() {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.ensureAudioContext();
    this.playBeep(240, 'sawtooth', 0.18, 0.15);
    setTimeout(() => {
      this.playBeep(190, 'sawtooth', 0.25, 0.15);
    }, 120);
  }

  playLevelCompleteSound() {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.ensureAudioContext();
    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playBeep(freq, 'triangle', 0.35, 0.2);
      }, idx * 100);
    });
  }

  initConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    this.confettiCanvas = canvas;
    this.confettiCtx = canvas.getContext('2d');
    this.confettiParticles = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
  }

  triggerConfetti() {
    if (!this.confettiCanvas) return;
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
    for (let i = 0; i < 90; i++) {
      this.confettiParticles.push({
        x: window.innerWidth * 0.5 + (Math.random() * 200 - 100),
        y: window.innerHeight * 0.35,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.9) * 14,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 12,
        alpha: 1
      });
    }

    if (!this.confettiActive) {
      this.confettiActive = true;
      this.renderConfetti();
    }
  }

  renderConfetti() {
    if (!this.confettiActive) return;
    this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
    
    for (let i = this.confettiParticles.length - 1; i >= 0; i--) {
      const p = this.confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.vx *= 0.98; // drag
      p.rotation += p.rSpeed;
      p.alpha -= 0.012;

      this.confettiCtx.save();
      this.confettiCtx.globalAlpha = Math.max(0, p.alpha);
      this.confettiCtx.translate(p.x, p.y);
      this.confettiCtx.rotate((p.rotation * Math.PI) / 180);
      this.confettiCtx.fillStyle = p.color;
      this.confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      this.confettiCtx.restore();

      if (p.alpha <= 0 || p.y > window.innerHeight) {
        this.confettiParticles.splice(i, 1);
      }
    }

    if (this.confettiParticles.length > 0) {
      requestAnimationFrame(() => this.renderConfetti());
    } else {
      this.confettiActive = false;
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
    }
  }

  attachEventListeners() {
    // Tool buttons
    this.toolCircleBtn.addEventListener('click', () => this.setActiveTool('circle'));
    this.toolUnderlineBtn.addEventListener('click', () => this.setActiveTool('underline'));
    this.toolEraserBtn.addEventListener('click', () => this.setActiveTool('eraser'));

    // Secondary buttons
    this.clearBtn.addEventListener('click', () => this.clearSelection());
    this.submitBtn.addEventListener('click', () => this.submitAnswer());
    this.btnNext.addEventListener('click', () => this.nextQuestion());
    if (this.btnRetry) {
      this.btnRetry.addEventListener('click', () => {
        this.isSubmitted = false;
        this.feedbackCard.classList.remove('visible');
        this.btnRetry.style.display = 'none';
        this.clearSelection();
      });
    }

    // Modal buttons
    if (this.modalNextLevelBtn) {
      this.modalNextLevelBtn.addEventListener('click', () => this.advanceToNextLevel());
    }

    // Start Game Button
    if (this.btnPlayGame) {
      this.btnPlayGame.addEventListener('click', () => this.startGame());
    }

    // Pause Controls
    if (this.btnPause) {
      this.btnPause.addEventListener('click', () => this.pauseGame());
    }
    if (this.btnResume) {
      this.btnResume.addEventListener('click', () => this.resumeGame());
    }

    // Audio toggle
    this.audioToggleBtn.addEventListener('click', () => {
      this.soundEnabled = !this.soundEnabled;
      this.audioToggleBtn.textContent = this.soundEnabled ? '🔊' : '🔇';
    });

    // Background Music toggle
    if (this.musicToggleBtn) {
      this.musicToggleBtn.addEventListener('click', () => {
        this.musicEnabled = !this.musicEnabled;
        if (this.musicEnabled) {
          this.ensureAudioContext();
          if (this.bgm) this.bgm.start();
          this.musicToggleBtn.classList.add('active');
          this.musicToggleBtn.textContent = '🎵 Music ON';
        } else {
          if (this.bgm) this.bgm.stop();
          this.musicToggleBtn.classList.remove('active');
          this.musicToggleBtn.textContent = '🎵 Music OFF';
        }
      });
    }

    // Music Volume slider
    if (this.volumeSlider) {
      this.volumeSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        if (this.bgm) {
          this.bgm.setVolume(val * 0.65);
        }
      });
    }

    // Auto-start music smoothly on first user interaction (satisfies browser audio policy)
    const startAudioOnGesture = () => {
      this.ensureAudioContext();
      if (this.musicEnabled && this.bgm && !this.bgm.isPlaying) {
        this.bgm.start();
      }
      document.removeEventListener('click', startAudioOnGesture);
      document.removeEventListener('keydown', startAudioOnGesture);
      document.removeEventListener('touchstart', startAudioOnGesture);
    };
    document.addEventListener('click', startAudioOnGesture);
    document.addEventListener('keydown', startAudioOnGesture);
    document.addEventListener('touchstart', startAudioOnGesture);

    // Global mouse tracking for drag selection
    document.addEventListener('mouseup', () => {
      this.isMouseDown = false;
    });

    // Keyboard shortcuts: 'S' for Subject (circle), 'P' for Predicate (underline), 'E' for eraser, 'Escape' for pause
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.isPaused) {
          this.resumeGame();
        } else {
          this.pauseGame();
        }
        return;
      }
      if (this.isPaused) return;

      if (e.key === 's' || e.key === 'S') this.setActiveTool('circle');
      if (e.key === 'p' || e.key === 'P') this.setActiveTool('underline');
      if (e.key === 'e' || e.key === 'E') this.setActiveTool('eraser');
      if (e.key === 'Enter') {
        if (this.isSubmitted) {
          this.nextQuestion();
        } else {
          this.submitAnswer();
        }
      }
    });
  }

  setActiveTool(tool) {
    this.activeTool = tool;
    this.toolCircleBtn.classList.toggle('active', tool === 'circle');
    this.toolUnderlineBtn.classList.toggle('active', tool === 'underline');
    this.toolEraserBtn.classList.toggle('active', tool === 'eraser');
  }

  getCurrentLevel() {
    return GAME_DATA.levels[this.currentLevelIndex];
  }

  getCurrentQuestion() {
    return this.getCurrentLevel().questions[this.currentQuestionIndex];
  }

  loadQuestion() {
    this.isSubmitted = false;
    this.tokenSelections.clear();

    const currentLevel = this.getCurrentLevel();
    const currentQ = this.getCurrentQuestion();

    // Hide feedback card
    this.feedbackCard.classList.remove('visible');
    if (this.btnRetry) this.btnRetry.style.display = 'none';

    // Update Banner
    this.questionCounterEl.textContent = `Question ${this.currentQuestionIndex + 1} of ${currentLevel.questions.length}`;
    this.levelWorthEl.textContent = `+${currentLevel.pointsPerQuestion} pts per correct answer`;

    // Render Progress Dots for current level
    this.renderDots();

    // Render Sentence Tokens
    this.sentenceContainer.innerHTML = '';
    currentQ.tokens.forEach((token, index) => {
      const tokenEl = document.createElement('div');
      tokenEl.className = 'word-token';
      tokenEl.textContent = token;
      tokenEl.dataset.index = index;

      // Interaction listeners
      tokenEl.addEventListener('mousedown', (e) => {
        e.preventDefault();
        this.isMouseDown = true;
        this.applyToolToToken(index);
      });

      tokenEl.addEventListener('mouseenter', () => {
        if (this.isMouseDown) {
          this.applyToolToToken(index);
        }
      });

      // Touch interaction
      tokenEl.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.applyToolToToken(index);
      });

      this.sentenceContainer.appendChild(tokenEl);
    });

    this.updateTokenVisuals();
    this.updateLevelNavUI();
  }

  applyToolToToken(index) {
    if (this.isSubmitted || this.isPaused) return;

    const currentSelection = this.tokenSelections.get(index);

    if (this.activeTool === 'circle') {
      // If already underlined, do NOT ruin the underline effect!
      if (currentSelection === 'underline') return;
      // Circle the word (Subject). Once circled, it stays circled and protected!
      this.tokenSelections.set(index, 'circle');
    } else if (this.activeTool === 'underline') {
      // If already circled, do NOT ruin the circle effect!
      if (currentSelection === 'circle') return;
      // Underline the word (Predicate). Once underlined, it stays underlined and protected!
      this.tokenSelections.set(index, 'underline');
    } else if (this.activeTool === 'eraser') {
      // Only the Eraser can clear a circle or underline mark
      if (this.tokenSelections.has(index)) {
        this.tokenSelections.delete(index);
      } else {
        return;
      }
    }

    this.playWordClickSound();
    this.updateTokenVisuals();
  }

  updateTokenVisuals() {
    const tokenElements = this.sentenceContainer.querySelectorAll('.word-token');
    let hasSubject = false;
    let hasPredicate = false;

    tokenElements.forEach((el, index) => {
      const tool = this.tokenSelections.get(index);
      const isSub = tool === 'circle';
      const isPred = tool === 'underline';

      el.classList.toggle('is-subject', isSub);
      el.classList.toggle('is-predicate', isPred);

      if (isSub) hasSubject = true;
      if (isPred) hasPredicate = true;
    });

    // Enable/disable submit button styling hint
    this.submitBtn.classList.toggle('disabled', !(hasSubject && hasPredicate));
  }

  clearSelection() {
    if (this.isSubmitted || this.isPaused) return;
    this.tokenSelections.clear();
    this.updateTokenVisuals();
    this.playWordClickSound();
  }

  submitAnswer() {
    if (this.isSubmitted || this.isPaused) return;

    const currentLevel = this.getCurrentLevel();
    const currentQ = this.getCurrentQuestion();

    // Subject = Circled, Predicate = Underlined
    const userSubjectIndices = [];
    const userPredicateIndices = [];

    this.tokenSelections.forEach((mode, index) => {
      if (mode === 'circle') userSubjectIndices.push(index);
      else if (mode === 'underline') userPredicateIndices.push(index);
    });

    userSubjectIndices.sort((a, b) => a - b);
    userPredicateIndices.sort((a, b) => a - b);

    if (userSubjectIndices.length === 0 && userPredicateIndices.length === 0) {
      alert("Please circle the subject and underline the predicate before pressing Submit!");
      return;
    }

    this.isSubmitted = true;

    // Evaluate answers
    const expectedSubject = [...currentQ.subjectIndices].sort((a, b) => a - b);
    const expectedPredicate = [...currentQ.predicateIndices].sort((a, b) => a - b);
    const actualSubject = [...userSubjectIndices];
    const actualPredicate = [...userPredicateIndices];

    const isSubjectCorrect = this.arraysEqual(expectedSubject, actualSubject);
    const isPredicateCorrect = this.arraysEqual(expectedPredicate, actualPredicate);
    const isFullyCorrect = isSubjectCorrect && isPredicateCorrect;

    const pointsToAward = isFullyCorrect ? currentLevel.pointsPerQuestion : 0;

    // Update score and level tracking
    const lvlProgress = this.progress[this.currentLevelIndex];
    if (lvlProgress.questionResults[this.currentQuestionIndex] === null) {
      // First time answering this question
      if (isFullyCorrect) {
        lvlProgress.score += pointsToAward;
        this.totalScore += pointsToAward;
        lvlProgress.questionResults[this.currentQuestionIndex] = 'correct';
      } else {
        lvlProgress.questionResults[this.currentQuestionIndex] = 'incorrect';
      }
      lvlProgress.completedCount++;
    } else {
      // If replaying question
      if (isFullyCorrect && lvlProgress.questionResults[this.currentQuestionIndex] !== 'correct') {
        lvlProgress.score += pointsToAward;
        this.totalScore += pointsToAward;
        lvlProgress.questionResults[this.currentQuestionIndex] = 'correct';
      }
    }

    // Render feedback card
    this.showFeedback(isFullyCorrect, isSubjectCorrect, isPredicateCorrect, pointsToAward, currentQ, actualSubject, actualPredicate);
    this.updateStatsUI();
    this.renderDots();

    // Sound and animation
    if (isFullyCorrect) {
      this.playSuccessSound();
      this.triggerConfetti();
      this.pulseScoreBadge();
    } else {
      this.playErrorSound();
    }

    // Check if level was just completed
    const allAnswered = lvlProgress.questionResults.every(res => res !== null);
    if (allAnswered && lvlProgress.completedCount >= currentLevel.questions.length) {
      // If this was the last question in the level, show modal after brief delay
      if (this.currentQuestionIndex === currentLevel.questions.length - 1) {
        setTimeout(() => {
          this.showLevelCompletedModal();
        }, 1200);
      }
    }
  }

  arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  showFeedback(isFullyCorrect, isSubjectCorrect, isPredicateCorrect, points, question, actualSubIndices, actualPredIndices) {
    // Formulate text for user's selections
    const userSubText = actualSubIndices.length > 0 
      ? actualSubIndices.map(i => question.tokens[i]).join(" ")
      : "(None circled)";
    const userPredText = actualPredIndices.length > 0 
      ? actualPredIndices.map(i => question.tokens[i]).join(" ")
      : "(None underlined)";

    if (isFullyCorrect) {
      this.feedbackIcon.textContent = "🌟";
      this.feedbackTitle.textContent = "Outstanding! Perfect Identification!";
      this.feedbackPoints.className = "feedback-points-awarded points-won";
      this.feedbackPoints.textContent = `+${points} Points Awarded!`;
    } else {
      this.feedbackIcon.textContent = "💡";
      this.feedbackTitle.textContent = "Almost! Check the Details Below:";
      this.feedbackPoints.className = "feedback-points-awarded points-zero";
      this.feedbackPoints.textContent = `0 Points (Both must be correct)`;
    }

    // Subject status
    this.subjectStatusTag.textContent = isSubjectCorrect ? "✓ Correct" : "✗ Needs Review";
    this.subjectStatusTag.className = `review-status-tag ${isSubjectCorrect ? 'correct' : 'incorrect'}`;
    this.userSubjectText.textContent = userSubText;
    this.correctSubjectText.textContent = question.subjectText;

    // Predicate status
    this.predicateStatusTag.textContent = isPredicateCorrect ? "✓ Correct" : "✗ Needs Review";
    this.predicateStatusTag.className = `review-status-tag ${isPredicateCorrect ? 'correct' : 'incorrect'}`;
    this.userPredicateText.textContent = userPredText;
    this.correctPredicateText.textContent = question.predicateText;

    // Explanation
    this.grammarExplanation.innerHTML = `<strong>Grammar Insight:</strong> ${question.explanation}`;

    // Reveal feedback (only show retry button on incorrect answers)
    if (this.btnRetry) {
      this.btnRetry.style.display = isFullyCorrect ? 'none' : 'inline-flex';
    }
    this.feedbackCard.classList.add('visible');
    this.feedbackCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  nextQuestion() {
    const currentLevel = this.getCurrentLevel();
    if (this.currentQuestionIndex < currentLevel.questions.length - 1) {
      this.currentQuestionIndex++;
      this.loadQuestion();
    } else {
      // Reached end of current level
      this.showLevelCompletedModal();
    }
  }

  startGame() {
    if (this.startScreenOverlay) {
      this.startScreenOverlay.classList.remove('visible');
    }
    this.ensureAudioContext();
    if (this.musicEnabled && this.bgm && !this.bgm.isPlaying) {
      this.bgm.start();
    }
    this.playSuccessSound();
  }

  advanceToNextLevel() {
    this.closeModal();
    if (this.currentLevelIndex < GAME_DATA.levels.length - 1) {
      this.currentLevelIndex++;
      this.currentQuestionIndex = 0;
      this.loadQuestion();
      this.updateStatsUI();
    } else {
      // Player completed all 4 levels and pressed "Play Again / Master All Levels 🔄"
      this.restartGame();
    }
  }

  restartGame() {
    this.currentLevelIndex = 0;
    this.currentQuestionIndex = 0;
    this.totalScore = 0;

    // Reset progress tracking for all 4 levels
    this.progress = GAME_DATA.levels.map(level => ({
      levelId: level.id,
      score: 0,
      completedCount: 0,
      questionResults: new Array(level.questions.length).fill(null)
    }));

    this.tokenSelections.clear();
    this.setActiveTool('circle');
    this.closeModal();
    this.loadQuestion();
    this.updateStatsUI();
    this.playLevelCompleteSound();
    this.triggerConfetti();
  }

  showLevelCompletedModal() {
    const lvl = this.getCurrentLevel();
    const progress = this.progress[this.currentLevelIndex];
    const maxScore = lvl.questions.length * lvl.pointsPerQuestion;

    this.modalTitle.textContent = `${lvl.name} Complete!`;
    this.modalDesc.textContent = `You've tackled all 5 sentences in ${lvl.name}. Here is your performance:`;
    this.modalLevelScore.textContent = `${progress.score} / ${maxScore} pts`;
    this.modalTotalScore.textContent = `${this.totalScore} pts`;

    if (this.currentLevelIndex < GAME_DATA.levels.length - 1) {
      const nextLevel = GAME_DATA.levels[this.currentLevelIndex + 1];
      this.modalNextLevelBtn.textContent = `Proceed to ${nextLevel.name} →`;
      this.modalNextLevelBtn.style.display = 'block';
    } else {
      this.modalNextLevelBtn.textContent = `Play Again / Master All Levels 🔄`;
      this.modalNextLevelBtn.style.display = 'block';
    }

    this.playLevelCompleteSound();
    this.modalOverlay.classList.add('visible');
  }

  closeModal() {
    this.modalOverlay.classList.remove('visible');
  }

  pauseGame() {
    if (this.isPaused) return;
    this.isPaused = true;
    if (this.bgm && this.bgm.isPlaying) {
      this.bgm.stop();
      this.wasBgmPlaying = true;
    } else {
      this.wasBgmPlaying = false;
    }
    if (this.pauseModalOverlay) {
      this.pauseModalOverlay.classList.add('visible');
    }
  }

  resumeGame() {
    if (!this.isPaused) return;
    this.isPaused = false;
    if (this.pauseModalOverlay) {
      this.pauseModalOverlay.classList.remove('visible');
    }
    if (this.wasBgmPlaying && this.musicEnabled && this.bgm) {
      this.bgm.start();
    }
  }

  pulseScoreBadge() {
    this.scoreBadgeEl.classList.add('pulse');
    setTimeout(() => {
      this.scoreBadgeEl.classList.remove('pulse');
    }, 400);
  }

  renderDots() {
    const currentLevel = this.getCurrentLevel();
    const lvlProgress = this.progress[this.currentLevelIndex];
    this.dotsContainer.innerHTML = '';

    for (let i = 0; i < currentLevel.questions.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      if (i === this.currentQuestionIndex) {
        dot.classList.add('current');
      }
      const res = lvlProgress.questionResults[i];
      if (res === 'correct') dot.classList.add('correct');
      if (res === 'incorrect') dot.classList.add('incorrect');
      this.dotsContainer.appendChild(dot);
    }
  }

  updateStatsUI() {
    this.totalScoreEl.textContent = this.totalScore;
    this.updateLevelNavUI();
  }

  updateLevelNavUI() {
    GAME_DATA.levels.forEach((lvl, idx) => {
      const tab = document.querySelector(`.level-tab[data-level="${lvl.id}"]`);
      if (!tab) return;

      const isCurrent = idx === this.currentLevelIndex;
      const isCompleted = idx < this.currentLevelIndex;
      const isLocked = idx > this.currentLevelIndex;

      tab.classList.toggle('active', isCurrent);
      tab.classList.toggle('completed', isCompleted);
      tab.classList.toggle('locked', isLocked);

      const prog = this.progress[idx];
      const maxPts = lvl.questions.length * lvl.pointsPerQuestion;
      const scoreSub = tab.querySelector('.level-score-sub');
      if (scoreSub) {
        if (isCompleted) {
          scoreSub.textContent = `✓ Completed (${prog.score} / ${maxPts} pts)`;
        } else if (isCurrent) {
          scoreSub.textContent = `▶ In Progress (${prog.score} / ${maxPts} pts)`;
        } else {
          scoreSub.textContent = `🔒 Locked (${maxPts} pts)`;
        }
      }

      const barFill = tab.querySelector('.level-progress-bar-fill');
      if (barFill) {
        const correctCount = prog.questionResults.filter(r => r === 'correct').length;
        const pct = (correctCount / lvl.questions.length) * 100;
        barFill.style.width = `${pct}%`;
      }
    });
  }
}

// Initialize on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  window.grammarGame = new GrammarGame();
});
