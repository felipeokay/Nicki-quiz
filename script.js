
// Created a boolean to make answers true or false when user selects their answer
const questions = [
    {
        questions: "How many albums has Nicki Minaj released?",
        answers: [
            {text: "One", correct: false},
            {text: "Two", correct: false},
            {text: "Four", correct: true},
            {text: "She has only released EPs", correct: false},
        ]
    },
    {
        questions: "When will PF2 be released?",
        answers: [
            {text: "November 17th, 2023", correct: true},
            {text: "Tomorrow", correct: false},
            {text: "October 31st, 2023", correct: false},
            {text: "December 26th, 2023", correct: false},
        ]
    },
    {
        questions: "Which song is about pigs flying?",
        answers: [
            {text: "Want some more", correct: true},
            {text: "Super Bass", correct: false},
            {text: "Big difference", correct: false},
            {text: "Bodak Yellow", correct: false},
        ]
    }, 
    {
        questions: "Which artist has Nicki NOT collaborated with?",
        answers: [
            {text: "Lil Baby", correct: false},
            {text: "Romeo Santos", correct: false},
            {text: "Madonna", correct: false},
            {text: "Aretha Franklin", correct: true},
        ]
    },
    {
        questions: "Who has the booming system?",
        answers: [
            {text: "Drake", correct: false},
            {text: "The boys", correct: true},
            {text: "Best-Buy", correct: false},
            {text: "The girls", correct: false},
        ]
    }
];

// getElementById was used to target buttons and questions when working with functions
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.questions;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

// Removed 'Answer' text that was first included in html to only display actual answers
function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

// Created functions to display score and play again button
function showScore(){
    resetState();
    questionElement.innerHTML = 'You scored ${score} out of ${questions.length}!';
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

// Call function to 'start quiz'
startQuiz();
