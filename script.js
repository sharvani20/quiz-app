const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "HighText Machine Language", correct: false },
            { text: "Hyper Tool Multi Language", correct: false },
        ],
    },
    {
        question: "Which language is used for styling?",
        answers: [
            { text: "CSS", correct: true },
            { text: "Python", correct: false },
            { text: "C++", correct: false },
        ],
    },
    {
        question: "Inside which HTML tag do we put JavaScript?",
        answers: [
            { text: "<script>", correct: true },
            { text: "<js>", correct: false },
            { text: "<javascript>", correct: false },
        ],
    },
];
let index = 0;
let score = 0;

const questionBox = document.getElementById("question");
const answersBox = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const quitBtn = document.getElementById("quit-btn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreDisplay = document.getElementById("score");
const container = document.querySelector(".container");
const title = document.getElementById("title");
function showQuestions() {
    clearInterval(timerInterval);
    startTimer();
    nextBtn.style.display = "none";
    quitBtn.style.display = "none";
    answersBox.innerHTML = "";
    const current = questions[index];
    questionBox.innerHTML = current.question;
    current.answers.forEach((ans) => {
        let btn = document.createElement("button");
        btn.textContent = ans.text;
        btn.addEventListener("click", () => {
            selectAnswer(btn, ans.correct);
        });
        answersBox.appendChild(btn);
    });
   
}
function selectAnswer(btn, correct) {
    clearInterval(timerInterval);
    if (correct) {
        score += 1;
        btn.classList.add("correct");
    } else {
        btn.classList.add("wrong");
    }
    Array.from(answersBox.children).forEach((btn) => (btn.disabled = true));
    nextBtn.style.display = "inline-block";
    quitBtn.style.display = "inline-block";
}
function nextQuestion() {
    index++;
    if (index < questions.length) {
        showQuestions();
    } else {
        endQuiz();
    }
}
function endQuiz() {
    clearInterval(timerInterval);

    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    scoreDisplay.textContent = `${score}/${questions.length}`;
    scoreDisplay.classList.add("h1");
}
function Quit() {
    title.classList.add("hide");
    quizBox.classList.add("hide");
    resultBox.classList.add("hide");
    let paragraph = document.createElement("p");
    paragraph.innerHTML = `Thank you for playing`;
    paragraph.classList.add("h1");
    container.appendChild(paragraph);
}
function restartQuiz() {
    index = 0;
    score = 0;
    quizBox.classList.remove("hide");
    resultBox.classList.add("hide");
    showQuestions();
}
let time = 10;
let timerInterval;

function startTimer() {
    time = 10;
    document.getElementById("timer").textContent = `Time Left: ${time}s`;

    timerInterval = setInterval(() => {
        time--;
        document.getElementById("timer").textContent = `Time Left: ${time}s`;

        if (time <= 0) {
            clearInterval(timerInterval);
            nextQuestion();
        }
    }, 1000);
}

showQuestions();
