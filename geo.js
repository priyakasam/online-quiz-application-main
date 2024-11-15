const questions = [
    {
        question: "What is the capital of France?",
        answers: {
            A: " Berlin ",
            B: " Paris ",
            C: " Rome ",
            D: " Madrid "
        },
        correctAnswer: "B"
    },
    {
        question: "Which river is the longest in the world?",
        answers: {
            A: " Amazon ",
            B: " Nile ",
            C: " Mississippi ",
            D: " Yangtze "
        },
        correctAnswer: "B"
    },
    {
        question: "What is the largest desert in the world?",
        answers: {
            A: " Gobi Desert ",
            B: " Arabian Desert ",
            C: " Sahara Desert ",
            D: " Mojave Desert "
        },
        correctAnswer: "C"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: {
            A: " China ",
            B: " Vietnam ",
            C: " South Korea",
            D: " Japan "
        },
        correctAnswer: "D"
    },
    {
        question: "In which continent is the Amazon Rainforest located?",
        answers: {
            A: " South America",
            B: " Asia ",
            C: " Africa",
            D: " Australia "
        },
        correctAnswer: "A"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const answerInputs = document.querySelectorAll("input[type='radio']");
const nextButton = document.getElementById("next-button");
const prevButton = document.querySelector(".prev-button")
const resultContainer = document.querySelector(".result-container");
const scoreDisplay = document.getElementById("score");
const container=document.querySelector(".quiz-container");

function loadQuestion() {
    answerInputs.forEach((input) => {
        input.checked = false;
    });
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;

        for (let i = 0; i < answerInputs.length; i++) {
            const answer = currentQuestion.answers[answerInputs[i].value];
            answerInputs[i].nextSibling.textContent = answer;
        }

        prevButton.disabled = currentQuestionIndex === 0;
    } else {
        showResults();
    }
}

function showResults() {
    container.classList.add("disable");
    questionText.textContent = "Quiz Completed!";
    resultContainer.style.display = "block";
    scoreDisplay.textContent = `Score: ${score} / ${questions.length}`;
}

function checkAnswer() {
    const selectedAnswer = document.querySelector("input[name='answer']:checked");
    if (selectedAnswer) {
        const userAnswer = selectedAnswer.value;
        const currentQuestion = questions[currentQuestionIndex];
        if (userAnswer === currentQuestion.correctAnswer) {
            score++;
        }
        currentQuestionIndex++;
        loadQuestion();
    }
}

function goBack() {
    currentQuestionIndex--;
    loadQuestion();
}
const startButton = document.getElementById('startButton');
if ('webkitSpeechRecognition' in window) {
                    const recognition = new webkitSpeechRecognition();
                    recognition.continuous=true;
                    recognition.lang = 'en-US';
        
                    recognition.onstart = () => {
                        startButton.textContent = 'Listening...';
                    };
        
                    recognition.onend = () => {
                        startButton.textContent = 'Start Listening';
                    };
        
                    recognition.onresult = (event) => {
                        const result = event.results[event.results.length-1][0].transcript.toLowerCase();
                        console.log('You said:', result);
                        if (/[aA]/.test(result)) {
                            const radiobtn=document.getElementById("answerA");
                            radiobtn.checked=true;
                        } else if (/[bB]/.test(result)) {
                            const radiobtn2=document.getElementById("answerB");
                            radiobtn2.checked=true;
                        } else if (/[cC]/.test(result)) {
                            const radiobtn3=document.getElementById("answerC");
                            radiobtn3.checked=true;
                        } else if (/[dD]/.test(result)) {
                            const radiobtn4=document.getElementById("answerD");
                            radiobtn4.checked=true;
                        }else if(/[next]/.test(result)){
                            checkAnswer();
                        } else {
                            alert('Sorry, I didn\'t recognize that option. Please say A, B, or C.');
                        }
                    };
        
                    startButton.addEventListener('click', () => {
                        recognition.start();
                    });
                } else {
                    alert('Speech recognition is not supported in this browser.');
                }
        
        

nextButton.addEventListener("click", checkAnswer);
prevButton.addEventListener("click", goBack);

loadQuestion();
