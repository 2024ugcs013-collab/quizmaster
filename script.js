// ======== QUIZ APP SCRIPT =========
const usernameSection = document.getElementById("usernameSection");
const usernameInput = document.getElementById("usernameInput");
const saveUsernameBtn = document.getElementById("saveUsernameBtn");
const userDisplay = document.getElementById("userDisplay");
const leaderboardList = document.getElementById("leaderboardList");
const QUESTIONS_PER_QUIZ = 10;

let username = localStorage.getItem("quiz_username") || "";

// --- HTML Elements ---
const homeSection = document.getElementById("home");
const categorySection = document.getElementById("category");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const homeBtn = document.getElementById("homeBtn");

const categoryBtns = document.querySelectorAll(".categoryBtn");
const categoryTitle = document.getElementById("categoryTitle");

const questionText = document.getElementById("questionText");
const optionsBox = document.getElementById("options");
const progressBar = document.getElementById("progressBar");
const timeDisplay = document.getElementById("time");

const scoreDisplay = document.getElementById("score");
const totalDisplay = document.getElementById("total");
const bestScoreDisplay = document.getElementById("bestScore");

// --- Quiz Data ---
const questions = {
  html: [
    { q: "What does HTML stand for?", options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyper Tool Multi Language"], correct: 1 },
    { q: "Which tag is used to create a hyperlink?", options: ["<a>", "<link>", "<href>", "<hyper>"], correct: 0 },
    { q: "Which HTML tag is used to display an image?", options: ["<img>", "<src>", "<image>", "<picture>"], correct: 0 },
    { q: "Which attribute is used to define inline styles?", options: ["class", "font", "style", "design"], correct: 2 },
    { q: "Which tag is used to define a list item?", options: ["<li>", "<list>", "<item>", "<ul>"], correct: 0 },
    { q: "What is the correct HTML element for inserting a line break?", options: ["<br>", "<break>", "<lb>", "<newline>"], correct: 0 },
    { q: "HTML comments start with?", options: ["<!--", "//", "/*", "**"], correct: 0 },
    { q: "Which tag defines the largest heading?", options: ["<h6>", "<h1>", "<header>", "<h5>"], correct: 1 },
    { q: "Which element represents a table row?", options: ["<td>", "<tr>", "<th>", "<row>"], correct: 1 },
    { q: "Which HTML attribute specifies an alternate text for an image?", options: ["alt", "title", "src", "caption"], correct: 0 }
  ],

  css: [
    { q: "What does CSS stand for?", options: ["Cascading Style Sheets", "Colorful Style Sheets", "Creative Styling Syntax", "Computer Styled Section"], correct: 0 },
    { q: "Which property changes text color?", options: ["font-color", "text-color", "color", "text-style"], correct: 2 },
    { q: "Which is used to change background color?", options: ["background-color", "bgcolor", "color-background", "background-style"], correct: 0 },
    { q: "How do you select an element with id 'main'?", options: [".main", "#main", "*main", "main"], correct: 1 },
    { q: "Which property is used to make text bold?", options: ["font-style", "font-weight", "bold", "text-weight"], correct: 1 },
    { q: "How do you add comments in CSS?", options: ["// comment", "<!-- comment -->", "/* comment */", "-- comment --"], correct: 2 },
    { q: "What does the z-index property do?", options: ["Changes transparency", "Changes stacking order", "Changes text size", "Aligns text"], correct: 1 },
    { q: "Which CSS property controls the text size?", options: ["font-size", "text-size", "size", "font-style"], correct: 0 },
    { q: "Which is the correct syntax to make all paragraphs bold?", options: ["p {font-weight:bold;}", "p {text:bold;}", "paragraph {bold;}", "p {font:bold;}"], correct: 0 },
    { q: "Which value of position property makes element fixed?", options: ["static", "absolute", "relative", "fixed"], correct: 3 }
  ],

  javascript: [
    { q: "Which keyword is used to declare a variable?", options: ["var", "let", "const", "All of the above"], correct: 3 },
    { q: "Inside which HTML element do we put JavaScript?", options: ["<js>", "<script>", "<javascript>", "<code>"], correct: 1 },
    { q: "How do you write 'Hello World' in an alert box?", options: ["alert('Hello World');", "msg('Hello World');", "msgBox('Hello World');", "print('Hello World');"], correct: 0 },
    { q: "Which operator is used to assign a value to a variable?", options: ["-", "x", "=", "=="], correct: 2 },
    { q: "How do you create a function in JavaScript?", options: ["function = myFunction()", "function myFunction()", "create myFunction()", "def myFunction()"], correct: 1 },
    { q: "Which symbol is used for comments?", options: ["//", "/* */", "#", "--"], correct: 0 },
    { q: "How do you call a function named myFunction?", options: ["call myFunction()", "myFunction()", "execute myFunction", "Run.myFunction"], correct: 1 },
    { q: "Which built-in method converts a string to uppercase?", options: ["toUpperCase()", "upper()", "changeCase()", "convertUpper()"], correct: 0 },
    { q: "How do you find the length of a string?", options: ["len()", "count()", "length", "size()"], correct: 2 },
    { q: "How to write an IF statement in JavaScript?", options: ["if i = 5", "if (i == 5)", "if i == 5 then", "if i = 5 then"], correct: 1 }
  ],

  general: [
    { q: "What is the capital of India?", options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"], correct: 1 },
    { q: "Who wrote 'Ramayana'?", options: ["Valmiki", "Tulsidas", "Vyasa", "Kalidasa"], correct: 0 },
    { q: "What planet is known as the Red Planet?", options: ["Mars", "Venus", "Earth", "Jupiter"], correct: 0 },
    { q: "How many continents are there?", options: ["5", "6", "7", "8"], correct: 2 },
    { q: "Which gas do humans breathe in?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: 0 },
    { q: "What is H2O?", options: ["Hydrogen", "Oxygen", "Water", "Salt"], correct: 2 },
    { q: "Which ocean is the largest?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], correct: 1 },
    { q: "Who invented the light bulb?", options: ["Einstein", "Newton", "Edison", "Tesla"], correct: 2 },
    { q: "Which country is called the Land of Rising Sun?", options: ["India", "Japan", "China", "Korea"], correct: 1 },
    { q: "What is the national currency of India?", options: ["Dollar", "Euro", "Rupee", "Yen"], correct: 2 }
  ]
};

// --- Variables ---
let currentCategory = "";
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

// --- Event Listeners ---
startBtn.addEventListener("click", () => {
  homeSection.classList.add("hidden");

  if (username) {
    categorySection.classList.remove("hidden");
  } else {
    usernameSection.classList.remove("hidden");
  }
});
saveUsernameBtn.addEventListener("click", () => {
  const name = usernameInput.value.trim();

  if (!name) {
    alert("Please enter your name");
    return;
  }

  username = name;
  localStorage.setItem("quiz_username", username);

  usernameSection.classList.add("hidden");
  categorySection.classList.remove("hidden");
});


categoryBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    currentCategory = btn.dataset.category;
    categoryTitle.textContent = currentCategory.toUpperCase() + " Quiz";
    const shuffledQuestions = shuffleArray(questions[currentCategory]);
currentQuestions = shuffledQuestions.slice(0, QUESTIONS_PER_QUIZ);
startQuiz();

  });
});

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < currentQuestions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

restartBtn.addEventListener("click", () => {
  resultSection.classList.add("hidden");
  categorySection.classList.remove("hidden");
});

homeBtn.addEventListener("click", () => {
  resultSection.classList.add("hidden");
  homeSection.classList.remove("hidden");
});

// --- Functions ---
function shuffleArray(array) {
  const shuffled = [...array]; // copy, not mutate original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
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
  timeLeft = 10;
  updateTimer();
  timer = setInterval(countDown, 1000);

  nextBtn.classList.remove("show");
  const q = currentQuestions[currentIndex];
  questionText.textContent = `${currentIndex + 1}. ${q.q}`;
  optionsBox.innerHTML = "";

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.classList.add("option");
    div.textContent = opt;
    div.addEventListener("click", () => selectOption(div, i));
    optionsBox.appendChild(div);
  });

  const progress = ((currentIndex + 1) / currentQuestions.length) * 100;

  progressBar.style.width = `${progress}%`;
}

function selectOption(selected, index) {
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

  nextBtn.classList.add("show");
}

function countDown() {
  timeLeft--;
  updateTimer();
  if (timeLeft <= 0) {
    clearInterval(timer);
    autoMoveNext();
  }
}

function updateTimer() {
  timeDisplay.textContent = timeLeft;
}

function autoMoveNext() {
  const q = currentQuestions[currentIndex];
  const options = document.querySelectorAll(".option");
  options[q.correct].classList.add("correct");
  nextBtn.classList.add("show");
}

function endQuiz() {
    userDisplay.textContent = username;

  clearInterval(timer);
  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  const best = localStorage.getItem(currentCategory + "_best") || 0;
  const bestScore = Math.max(score, best);
  localStorage.setItem(currentCategory + "_best", bestScore);
updateLeaderboard();
renderLeaderboard();

  scoreDisplay.textContent = score;
  totalDisplay.textContent = currentQuestions.length;
  bestScoreDisplay.textContent = bestScore;

  progressBar.style.width = "100%";
}
function getLeaderboard() {
  return JSON.parse(localStorage.getItem("quiz_leaderboard")) || [];
}

function saveLeaderboard(data) {
  localStorage.setItem("quiz_leaderboard", JSON.stringify(data));
}
function updateLeaderboard() {
  let leaderboard = getLeaderboard();

  leaderboard.push({
    name: username,
    score: score,
    category: currentCategory
  });

  leaderboard.sort((a, b) => b.score - a.score);

  leaderboard = leaderboard.slice(0, 10);

  saveLeaderboard(leaderboard);
}
function renderLeaderboard() {
  const leaderboard = getLeaderboard();
  leaderboardList.innerHTML = "";

  leaderboard.forEach((entry, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${index + 1}. ${entry.name} (${entry.category})</span>
      <strong>${entry.score}</strong>
    `;
    leaderboardList.appendChild(li);
  });
}