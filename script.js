const sparkleField = document.querySelector(".sparkle-field");
const confettiButton = document.querySelector("#confettiButton");
const noteButton = document.querySelector("#noteButton");
const loveNote = document.querySelector("#loveNote");
const themeToggle = document.querySelector("#themeToggle");
const heroThemeButton = document.querySelector("#heroThemeButton");
const sparkleSoundButton = document.querySelector("#sparkleSoundButton");
const gameStage = document.querySelector("#gameStage");
const gameStartButton = document.querySelector("#gameStartButton");
const gameScore = document.querySelector("#gameScore");
const gameTimer = document.querySelector("#gameTimer");
const gameCombo = document.querySelector("#gameCombo");
const gameMessage = document.querySelector("#gameMessage");
const gameKesane = document.querySelector(".game-kesane");
const quizCategory = document.querySelector("#quizCategory");
const quizMode = document.querySelector("#quizMode");
const quizStartButton = document.querySelector("#quizStartButton");
const quizResetButton = document.querySelector("#quizResetButton");
const quizProgress = document.querySelector("#quizProgress");
const quizScore = document.querySelector("#quizScore");
const quizClock = document.querySelector("#quizClock");
const quizBest = document.querySelector("#quizBest");
const quizCategoryLabel = document.querySelector("#quizCategoryLabel");
const quizSourceLabel = document.querySelector("#quizSourceLabel");
const quizQuestion = document.querySelector("#quizQuestion");
const quizChoices = document.querySelector("#quizChoices");
const quizResultTitle = document.querySelector("#quizResultTitle");
const quizExplanation = document.querySelector("#quizExplanation");
const quizNextButton = document.querySelector("#quizNextButton");
const quizReviewButton = document.querySelector("#quizReviewButton");
const revealElements = document.querySelectorAll(".reveal");
const moonlightSection = document.querySelector(".moonlight-section");

const notes = [
  "Kesane, you are the kind of person who makes ordinary moments feel like they are wrapped in ribbon.",
  "If kindness were a subject in medicine faculty, you would already be the professor.",
  "You have puppy-level happiness, sheep-cloud softness, and main-character sparkle all at once.",
  "Every future patient will be lucky to meet the doctor with such a gentle heart.",
  "You are proof that soft people can still be incredibly strong.",
  "Some people light up a room. You make it feel like home.",
  "Your study era is cute, brave, and absolutely worth cheering for.",
  "Kesane, you are sweeter than a tiny sheep taking a nap under pink clouds."
];

const floatingSymbols = ["&#9825;", "&#10022;", "&#8902;", "&#8728;"];
const storageKey = "kesane-theme";
const quizStorageKey = "kesane-step-quiz-progress";
const problemLabels = [
  "Exam stress",
  "Sleepy lecture",
  "Too much anatomy",
  "Tiny panic",
  "Hard question",
  "No coffee",
  "Long notes",
  "Bad mood",
  "Scary quiz",
  "Late night"
];
const gameDuration = 20;
let gameState = {
  score: 0,
  combo: 0,
  timeLeft: gameDuration,
  isPlaying: false,
  spawnInterval: null,
  timerInterval: null
};
let quizState = {
  questions: [],
  currentIndex: 0,
  correctCount: 0,
  answeredCount: 0,
  selectedIndex: null,
  isActive: false,
  startedAt: null,
  timerInterval: null
};

function getStoredTheme() {
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

function storeTheme(theme) {
  try {
    window.localStorage.setItem(storageKey, theme);
  } catch {
    // The toggle should still work if browser privacy settings block storage.
  }
}

const storedTheme = getStoredTheme();

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function setTheme(isDark, shouldScroll = false) {
  document.body.classList.toggle("dark-theme", isDark);
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeToggle?.setAttribute(
    "aria-label",
    isDark ? "Switch to light day mode" : "Switch to dark moon mode"
  );
  if (heroThemeButton) {
    heroThemeButton.textContent = isDark ? "Sunrise mode" : "Moonlight mode";
  }
  storeTheme(isDark ? "dark" : "light");

  if (isDark && moonlightSection) {
    moonlightSection.classList.add("is-visible");
  }

  if (isDark && shouldScroll && moonlightSection) {
    window.setTimeout(() => {
      moonlightSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 180);
  }
}

function toggleTheme(event) {
  event?.preventDefault();
  setTheme(!document.body.classList.contains("dark-theme"), true);
}

function createSparkles() {
  if (!sparkleField) return;

  for (let index = 0; index < 34; index += 1) {
    const sparkle = document.createElement("span");
    sparkle.style.left = `${randomBetween(0, 100)}%`;
    sparkle.style.animationDelay = `${randomBetween(-9, 0)}s`;
    sparkle.style.animationDuration = `${randomBetween(7, 13)}s`;
    sparkle.style.opacity = randomBetween(0.32, 0.82).toFixed(2);
    sparkle.style.transform = `scale(${randomBetween(0.55, 1.35)})`;
    sparkleField.appendChild(sparkle);
  }
}

function launchHeart(x, y) {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.innerHTML = floatingSymbols[Math.floor(Math.random() * floatingSymbols.length)];
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.fontSize = `${randomBetween(18, 34)}px`;
  heart.style.color = Math.random() > 0.5 ? "#ff8fb8" : "#c291ff";
  document.body.appendChild(heart);

  window.setTimeout(() => {
    heart.remove();
  }, 1700);
}

function burstHearts() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight * 0.62;

  for (let index = 0; index < 24; index += 1) {
    window.setTimeout(() => {
      launchHeart(
        centerX + randomBetween(-180, 180),
        centerY + randomBetween(-80, 100)
      );
    }, index * 35);
  }
}

function fullScreenSparkle() {
  const overlay = document.createElement("div");
  overlay.className = "sparkle-overlay";
  document.body.appendChild(overlay);

  for (let index = 0; index < 120; index += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "screen-sparkle";
    sparkle.innerHTML = floatingSymbols[Math.floor(Math.random() * floatingSymbols.length)];
    sparkle.style.left = `${randomBetween(2, 98)}vw`;
    sparkle.style.top = `${randomBetween(4, 96)}vh`;
    sparkle.style.fontSize = `${randomBetween(16, 42)}px`;
    sparkle.style.color = Math.random() > 0.5 ? "#ff8fb8" : "#c291ff";
    sparkle.style.animationDelay = `${randomBetween(0, 0.8)}s`;
    sparkle.style.animationDuration = `${randomBetween(1.4, 2.4)}s`;
    overlay.appendChild(sparkle);
  }

  window.setTimeout(() => {
    overlay.remove();
  }, 3200);
}

function showNextNote() {
  if (!loveNote) return;

  const currentNote = loveNote.textContent.trim();
  const availableNotes = notes.filter((note) => note !== currentNote);
  const nextNote = availableNotes[Math.floor(Math.random() * availableNotes.length)];

  loveNote.animate(
    [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0, transform: "translateY(12px)" }
    ],
    { duration: 180, easing: "ease-out" }
  ).onfinish = () => {
    loveNote.textContent = nextNote;
    loveNote.animate(
      [
        { opacity: 0, transform: "translateY(-12px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      { duration: 220, easing: "ease-out" }
    );
  };
}

function playSparkleSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const audioContext = new AudioContext();
  const notesToPlay = [659.25, 783.99, 987.77, 1318.51];

  notesToPlay.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const startTime = audioContext.currentTime + index * 0.11;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, startTime);
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.13, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.46);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.5);
  });
}

function getQuizQuestions() {
  return Array.isArray(window.stepOneQuestions) ? window.stepOneQuestions : [];
}

function getStoredQuizProgress() {
  try {
    const savedProgress = window.localStorage.getItem(quizStorageKey);
    if (!savedProgress) {
      return { bestScore: 0, attempted: 0, missedIds: [] };
    }

    const parsedProgress = JSON.parse(savedProgress);
    return {
      bestScore: Number(parsedProgress.bestScore) || 0,
      attempted: Number(parsedProgress.attempted) || 0,
      missedIds: Array.isArray(parsedProgress.missedIds) ? parsedProgress.missedIds : []
    };
  } catch {
    return { bestScore: 0, attempted: 0, missedIds: [] };
  }
}

function storeQuizProgress(progress) {
  try {
    window.localStorage.setItem(quizStorageKey, JSON.stringify(progress));
  } catch {
    // Quiz play should still work if local storage is unavailable.
  }
}

let quizProgressState = getStoredQuizProgress();

function formatQuizTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function shuffleItems(items) {
  const shuffledItems = [...items];
  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledItems[index], shuffledItems[randomIndex]] = [
      shuffledItems[randomIndex],
      shuffledItems[index]
    ];
  }
  return shuffledItems;
}

function getQuizScorePercent() {
  if (quizState.answeredCount === 0) return 0;
  return Math.round((quizState.correctCount / quizState.answeredCount) * 100);
}

function updateQuizDashboard() {
  const totalQuestions = quizState.questions.length;
  const questionNumber = totalQuestions ? Math.min(quizState.currentIndex + 1, totalQuestions) : 0;
  const elapsedSeconds = quizState.startedAt
    ? Math.floor((Date.now() - quizState.startedAt) / 1000)
    : 0;

  if (quizProgress) quizProgress.textContent = `${questionNumber}/${totalQuestions}`;
  if (quizScore) quizScore.textContent = `${getQuizScorePercent()}%`;
  if (quizClock) quizClock.textContent = formatQuizTime(elapsedSeconds);
  if (quizBest) quizBest.textContent = `${quizProgressState.bestScore}%`;
}

function populateQuizCategories() {
  if (!quizCategory) return;

  const categories = [...new Set(getQuizQuestions().map((question) => question.category))].sort();
  quizCategory.innerHTML = '<option value="all">All categories</option>';
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    quizCategory.appendChild(option);
  });
}

function getActiveQuestionPool() {
  const selectedCategory = quizCategory?.value || "all";
  const selectedMode = quizMode?.value || "mixed";
  let questions = getQuizQuestions();

  if (selectedMode === "missed") {
    questions = questions.filter((question) => quizProgressState.missedIds.includes(question.id));
  }

  if (selectedCategory !== "all") {
    questions = questions.filter((question) => question.category === selectedCategory);
  }

  return shuffleItems(questions);
}

function setQuizMessage(title, explanation) {
  if (quizResultTitle) quizResultTitle.textContent = title;
  if (quizExplanation) quizExplanation.textContent = explanation;
}

function renderQuizEmptyState(title, explanation) {
  const existingTimer = quizState.timerInterval;

  quizState.questions = [];
  quizState.currentIndex = 0;
  quizState.correctCount = 0;
  quizState.answeredCount = 0;
  quizState.selectedIndex = null;
  quizState.isActive = false;
  quizState.startedAt = null;
  quizState.timerInterval = null;
  window.clearInterval(existingTimer);

  if (quizCategoryLabel) quizCategoryLabel.textContent = "No question selected";
  if (quizSourceLabel) quizSourceLabel.textContent = "Import-ready";
  if (quizQuestion) quizQuestion.textContent = title;
  if (quizChoices) quizChoices.innerHTML = "";
  if (quizNextButton) quizNextButton.disabled = true;
  setQuizMessage("Quiz paused", explanation);
  updateQuizDashboard();
}

function renderQuizQuestion() {
  const currentQuestion = quizState.questions[quizState.currentIndex];
  if (!currentQuestion || !quizChoices) return;

  quizState.selectedIndex = null;
  if (quizCategoryLabel) quizCategoryLabel.textContent = currentQuestion.category;
  if (quizSourceLabel) {
    quizSourceLabel.textContent =
      currentQuestion.source === "original" ? "Original sample" : currentQuestion.source;
  }
  if (quizQuestion) quizQuestion.textContent = currentQuestion.question;
  if (quizNextButton) quizNextButton.disabled = true;
  setQuizMessage(
    "Choose the best answer",
    "After you answer, the explanation will appear here with the correct reasoning."
  );

  quizChoices.innerHTML = "";
  currentQuestion.choices.forEach((choice, index) => {
    const choiceButton = document.createElement("button");
    const choiceLetter = String.fromCharCode(65 + index);
    const letterElement = document.createElement("span");
    const choiceText = document.createElement("span");

    choiceButton.className = "quiz-choice";
    choiceButton.type = "button";
    letterElement.className = "quiz-choice-letter";
    letterElement.textContent = choiceLetter;
    choiceText.textContent = choice;
    choiceButton.append(letterElement, choiceText);
    choiceButton.addEventListener("click", () => handleQuizAnswer(index));
    quizChoices.appendChild(choiceButton);
  });

  updateQuizDashboard();
}

function updateMissedQuestion(question, wasCorrect) {
  const missedIds = new Set(quizProgressState.missedIds);
  if (wasCorrect) {
    missedIds.delete(question.id);
  } else {
    missedIds.add(question.id);
  }

  quizProgressState = {
    ...quizProgressState,
    attempted: quizProgressState.attempted + 1,
    missedIds: [...missedIds]
  };
  storeQuizProgress(quizProgressState);
}

function handleQuizAnswer(selectedIndex) {
  const currentQuestion = quizState.questions[quizState.currentIndex];
  if (!currentQuestion || quizState.selectedIndex !== null || !quizChoices) return;

  const wasCorrect = selectedIndex === currentQuestion.answerIndex;
  quizState.selectedIndex = selectedIndex;
  quizState.answeredCount += 1;

  if (wasCorrect) {
    quizState.correctCount += 1;
  }

  [...quizChoices.querySelectorAll(".quiz-choice")].forEach((choiceButton, index) => {
    choiceButton.disabled = true;
    if (index === currentQuestion.answerIndex) {
      choiceButton.classList.add("is-correct");
    } else if (index === selectedIndex) {
      choiceButton.classList.add("is-incorrect");
    }
  });

  updateMissedQuestion(currentQuestion, wasCorrect);
  updateQuizDashboard();
  setQuizMessage(wasCorrect ? "Correct" : "Review this concept", currentQuestion.explanation);

  if (quizNextButton) {
    quizNextButton.disabled = false;
    quizNextButton.textContent =
      quizState.currentIndex === quizState.questions.length - 1 ? "Finish quiz" : "Next question";
  }
}

function endQuiz() {
  const finalScore = getQuizScorePercent();
  quizState.isActive = false;
  window.clearInterval(quizState.timerInterval);
  quizProgressState = {
    ...quizProgressState,
    bestScore: Math.max(quizProgressState.bestScore, finalScore)
  };
  storeQuizProgress(quizProgressState);
  updateQuizDashboard();

  if (quizNextButton) quizNextButton.disabled = true;
  setQuizMessage(
    "Quiz complete",
    `Final score: ${finalScore}%. Incorrect questions are saved for review mode.`
  );
}

function startQuiz() {
  const selectedQuestions = getActiveQuestionPool();
  if (!selectedQuestions.length) {
    renderQuizEmptyState(
      "No questions available for this selection.",
      "Try Mixed practice, choose All categories, or add licensed questions to questions.js."
    );
    return;
  }

  window.clearInterval(quizState.timerInterval);
  quizState = {
    questions: selectedQuestions,
    currentIndex: 0,
    correctCount: 0,
    answeredCount: 0,
    selectedIndex: null,
    isActive: true,
    startedAt: Date.now(),
    timerInterval: window.setInterval(updateQuizDashboard, 1000)
  };
  renderQuizQuestion();
}

function showNextQuizQuestion() {
  if (!quizState.questions.length || quizState.selectedIndex === null) return;

  if (quizState.currentIndex >= quizState.questions.length - 1) {
    endQuiz();
    return;
  }

  quizState.currentIndex += 1;
  renderQuizQuestion();
}

function resetQuizProgress() {
  quizProgressState = { bestScore: 0, attempted: 0, missedIds: [] };
  storeQuizProgress(quizProgressState);
  renderQuizEmptyState(
    "Progress reset. Start a fresh quiz when you are ready.",
    "Your best score and missed-question review list were cleared on this browser."
  );
}

function startMissedQuestionReview() {
  if (quizMode) quizMode.value = "missed";
  startQuiz();
}

function initializeQuiz() {
  if (!quizCategory || !quizChoices) return;

  populateQuizCategories();
  renderQuizEmptyState(
    "Choose a category and start the quiz when you are ready.",
    "Answer a question to unlock the explanation and track missed topics for review mode."
  );
}

function updateGameStats() {
  if (gameScore) gameScore.textContent = String(gameState.score);
  if (gameTimer) gameTimer.textContent = String(gameState.timeLeft);
  if (gameCombo) gameCombo.textContent = String(gameState.combo);
}

function clearProblems() {
  gameStage?.querySelectorAll(".problem-bubble").forEach((problem) => problem.remove());
}

function solveProblem(problem) {
  if (!gameState.isPlaying || problem.classList.contains("is-solved")) return;

  gameState.combo += 1;
  gameState.score += 10 + Math.min(gameState.combo * 2, 20);
  problem.classList.add("is-solved");
  problem.textContent = "Solved!";
  gameMessage.textContent = `Kesane solved it! Combo x${gameState.combo}.`;
  gameKesane?.classList.add("is-winning");
  updateGameStats();

  const rect = problem.getBoundingClientRect();
  launchHeart(rect.left + rect.width / 2, rect.top + rect.height / 2);

  window.setTimeout(() => {
    problem.remove();
    gameKesane?.classList.remove("is-winning");
  }, 340);
}

function spawnProblem() {
  if (!gameStage || !gameState.isPlaying) return;

  const activeProblems = gameStage.querySelectorAll(".problem-bubble:not(.is-solved)");
  if (activeProblems.length >= 7) {
    gameState.combo = 0;
    gameMessage.textContent = "The problems are piling up. Save Kesane!";
    updateGameStats();
    return;
  }

  const problem = document.createElement("button");
  const label = problemLabels[Math.floor(Math.random() * problemLabels.length)];
  problem.className = "problem-bubble";
  problem.type = "button";
  problem.textContent = label;
  problem.setAttribute("aria-label", `Solve ${label}`);
  problem.style.left = `${randomBetween(5, 78)}%`;
  problem.style.top = `${randomBetween(8, 58)}%`;
  problem.style.animationDelay = `${randomBetween(-0.7, 0)}s`;
  problem.addEventListener("click", () => solveProblem(problem));
  gameStage.appendChild(problem);

  window.setTimeout(() => {
    if (!gameState.isPlaying || problem.classList.contains("is-solved")) return;
    gameState.combo = 0;
    problem.remove();
    gameMessage.textContent = `${label} escaped. Combo reset, but Kesane keeps going.`;
    updateGameStats();
  }, 2600);
}

function endGame() {
  gameState.isPlaying = false;
  window.clearInterval(gameState.spawnInterval);
  window.clearInterval(gameState.timerInterval);
  gameState.spawnInterval = null;
  gameState.timerInterval = null;
  gameStartButton.textContent = "Play again";
  gameStartButton.disabled = false;
  clearProblems();

  if (gameState.score >= 160) {
    gameMessage.textContent = `Victory! Kesane crushed the problems with ${gameState.score} points.`;
    fullScreenSparkle();
    return;
  }

  gameMessage.textContent = `Round over: ${gameState.score} points. Kesane still wins because she never gives up.`;
}

function startGame() {
  if (!gameStage || gameState.isPlaying) return;

  clearProblems();
  gameState = {
    score: 0,
    combo: 0,
    timeLeft: gameDuration,
    isPlaying: true,
    spawnInterval: null,
    timerInterval: null
  };
  updateGameStats();
  gameMessage.textContent = "Go Kesane! Tap every problem before it disappears.";
  gameStartButton.disabled = true;
  gameStartButton.textContent = "Playing...";
  spawnProblem();
  gameState.spawnInterval = window.setInterval(spawnProblem, 850);
  gameState.timerInterval = window.setInterval(() => {
    gameState.timeLeft -= 1;
    updateGameStats();

    if (gameState.timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function revealOnScroll() {
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

setTheme(storedTheme === "dark");
createSparkles();
initializeQuiz();
revealOnScroll();

confettiButton?.addEventListener("click", fullScreenSparkle);
sparkleSoundButton?.addEventListener("click", () => {
  playSparkleSound();
  burstHearts();
});
gameStartButton?.addEventListener("click", startGame);
quizStartButton?.addEventListener("click", startQuiz);
quizNextButton?.addEventListener("click", showNextQuizQuestion);
quizResetButton?.addEventListener("click", resetQuizProgress);
quizReviewButton?.addEventListener("click", startMissedQuestionReview);
noteButton?.addEventListener("click", () => {
  showNextNote();
  burstHearts();
});

document.addEventListener("click", (event) => {
  if (event.target.closest("#themeToggle, #heroThemeButton")) {
    toggleTheme(event);
    return;
  }

  const isButton = event.target.closest("button, a");
  if (!isButton && Math.random() > 0.55) {
    launchHeart(event.clientX, event.clientY);
  }
});
