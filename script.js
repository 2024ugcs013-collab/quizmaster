// ======== QUIZ APP SCRIPT =========

// -------- Username --------
const usernameSection = document.getElementById("usernameSection");
const usernameInput = document.getElementById("usernameInput");
const saveUsernameBtn = document.getElementById("saveUsernameBtn");
const userDisplay = document.getElementById("userDisplay");
const leaderboardList = document.getElementById("leaderboardList");

const QUESTIONS_PER_QUIZ = 10;
let username = localStorage.getItem("quiz_username") || "";

// -------- Sections --------
const homeSection = document.getElementById("home");
const categorySection = document.getElementById("category");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");

// -------- Buttons --------
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const homeBtn = document.getElementById("homeBtn");
const categoryBtns = document.querySelectorAll(".categoryBtn");

// -------- Quiz UI --------
const categoryTitle = document.getElementById("categoryTitle");
const questionText = document.getElementById("questionText");
const optionsBox = document.getElementById("options");
const progressBar = document.getElementById("progressBar");
const timeDisplay = document.getElementById("time");

// -------- Result --------
const scoreDisplay = document.getElementById("score");
const totalDisplay = document.getElementById("total");
const bestScoreDisplay = document.getElementById("bestScore");

// -------- Quiz Data (UNCHANGED) --------
const questions = /* SAME QUESTIONS OBJECT YOU ALREADY HAVE */;

// -------- State --------
let currentCategory = "";
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let timer = null;
let timeLeft = 10;
let answered = false;

// ================= EVENTS =================

startBtn.onclick = () => {
  homeSection.classList.add("hidden");
  username ? categorySection.classList.remove("hidden")
           : usernameSection.classList.remove("hidden");
};

saveUsernameBtn.onclick = () => {
  const name = usernameInput.value.trim();
  if (!name) return alert("Enter your name");

  username = name;
  localStorage.setItem("quiz_username", username);
  usernameSection.classList.add("hidden");
  categorySection.classList.remove("hidden");
};

categoryBtns.forEach(btn => {
  btn.onclick = () => {
    currentCategory = btn.dataset.category;
    categoryTitle.textContent = currentCategory.toUpperCase() + " QUIZ";
    currentQuestions = shuffleArray(questions[currentCategory]).slice(0, QUESTIONS_PER_QUIZ);
    startQuiz();
  };
});

nextBtn.onclick = () => {
  currentIndex++;
  currentIndex < currentQuestions.length ? showQuestion() : endQuiz();
};

restartBtn.onclick = () => {
  resultSection.classList.add("hidden");
  categorySection.classList.remove("hidden");
};

homeBtn.onclick = () => {
  resultSection.classList.add("hidden");
  homeSection.classList.remove("hidden");
};

// ================= FUNCTIONS =================

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function startQuiz() {
  categorySection.classList.add("hidden");
  quizSection.classList.remove("hidden");

  score = 0;
  currentIndex = 0;
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  answered = false;

  timeLeft = 10;
  timeDisplay.textContent = timeLeft;

  nextBtn.classList.remove("show");
  optionsBox.innerHTML = "";

  const q = currentQuestions[currentIndex];
  questionText.textContent = `${currentIndex + 1}. ${q.q}`;

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt;
    div.onclick = () => selectOption(div, i);
    optionsBox.appendChild(div);
  });

  progressBar.style.width =
    ((currentIndex + 1) / currentQuestions.length) * 100 + "%";

  timer = setInterval(countDown, 1000);
}

function selectOption(selected, index) {
  if (answered) return;
  answered = true;

  clearInterval(timer);
  const q = currentQuestions[currentIndex];
  const options = document.querySelectorAll(".option");

  options.forEach(opt => opt.style.pointerEvents = "none");

  if (index === q.correct) {
    selected.classList.add("correct");
    score++;
  } else {
    selected.classList.add("wrong");
    options[q.correct].classList.add("correct");
  }

  showNext();
}

function countDown() {
  timeLeft--;
  timeDisplay.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timer);
    autoReveal();
  }
}

function autoReveal() {
  if (answered) return;
  answered = true;

  const q = currentQuestions[currentIndex];
  const options = document.querySelectorAll(".option");

  options.forEach(opt => opt.style.pointerEvents = "none");
  options[q.correct].classList.add("correct");

  showNext();
}

function showNext() {
  nextBtn.classList.add("show");
}

function endQuiz() {
  clearInterval(timer);

  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  userDisplay.textContent = username;
  scoreDisplay.textContent = score;
  totalDisplay.textContent = currentQuestions.length;

  const best = Math.max(
    score,
    localStorage.getItem(currentCategory + "_best") || 0
  );
  localStorage.setItem(currentCategory + "_best", best);
  bestScoreDisplay.textContent = best;

  updateLeaderboard();
  renderLeaderboard();
}

// ================= LEADERBOARD =================

function getLeaderboard() {
  return JSON.parse(localStorage.getItem("quiz_leaderboard")) || [];
}

function updateLeaderboard() {
  const data = getLeaderboard();
  data.push({ name: username, score, category: currentCategory });
  data.sort((a, b) => b.score - a.score);
  localStorage.setItem("quiz_leaderboard", JSON.stringify(data.slice(0, 10)));
}

function renderLeaderboard() {
  leaderboardList.innerHTML = "";
  getLeaderboard().forEach((e, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${i + 1}. ${e.name} (${e.category})</span><strong>${e.score}</strong>`;
    leaderboardList.appendChild(li);
  });
}
