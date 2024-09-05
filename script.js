const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        a: "<script>",
        b: "<style>",
        c: "<css>",
        d: "<link>",
        correct: "b",
    },
    {
        question: "Which property is used to change the background color?",
        a: "bgcolor",
        b: "background-color",
        c: "color",
        d: "background",
        correct: "b",
    },
    {
        question: "Which method is used to add an event listener in JavaScript?",
        a: "addEventListener()",
        b: "attachEvent()",
        c: "on()",
        d: "bind()",
        correct: "a",
    },
    {
        question: "What does DOM stand for?",
        a: "Document Object Model",
        b: "Data Object Model",
        c: "Document Oriented Model",
        d: "Dynamic Object Model",
        correct: "a",
    },
    {
        question: "What is the correct syntax for referring to an external script called 'script.js'?",
        a: "<script src='script.js'>",
        b: "<script href='script.js'>",
        c: "<script name='script.js'>",
        d: "<script link='script.js'>",
        correct: "a",
    },
    {
        question: "How do you select an element with the id 'example' using JavaScript?",
        a: "document.getElementById('example')",
        b: "document.querySelector('#example')",
        c: "document.select('#example')",
        d: "document.getElementByName('example')",
        correct: "a",
    },
];

const quiz = document.getElementById("quiz");
const answerElements = document.querySelectorAll(".answer");
const questionElement = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");
const timerElement = document.getElementById("timer");
const progressElement = document.getElementById("progress");

let currentQuiz = 0;
let score = 0;
let timer;
const totalTime = 26; // Time for each question in seconds

const deselectAnswers = () => {
    answerElements.forEach((answer) => (answer.checked = false));
};

const getSelected = () => {
    let answer;
    answerElements.forEach((answerElement) => {
        if (answerElement.checked) answer = answerElement.id;
    });
    return answer;
};

const loadQuiz = () => {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionElement.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    
    startTimer(); // Start the timer when a new question is loaded
};

const startTimer = () => {
    let timeLeft = totalTime;
    timerElement.innerText = `Time Left: ${timeLeft}s`;
    progressElement.style.width = `0%`;
    
    const updateTimer = () => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleSubmit(); // Automatically submit when time is up
        } else {
            timeLeft--;
            timerElement.innerText = `Time Left: ${timeLeft}s`;
            progressElement.style.width = `${((totalTime - timeLeft) / totalTime) * 100}%`;
        }
    };

    updateTimer(); // Initial call to set the timer display
    timer = setInterval(updateTimer, 1000);
};

const handleSubmit = () => {
    clearInterval(timer); // Stop the timer when an answer is submitted or time is up

    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) score++;
    }
    
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        // Fade out transition for question change
        quiz.style.opacity = '0';
        setTimeout(() => {
            loadQuiz();
            quiz.style.opacity = '1';
        }, 500); // 500ms fade out duration
    } else {
        quiz.innerHTML = `
            <h2>You answered ${score}/${quizData.length} questions correctly</h2>
            <button onclick="location.reload()">Play Again</button>
        `;
    }
};

// Add event listener for submit button
submitButton.addEventListener("click", handleSubmit);

// Initialize quiz and start timer
loadQuiz();


