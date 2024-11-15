const questions = [
    {
        question: "Which part of the Indian Constitution contains the Directive Principles of State Policy?",
        answers: {
            A: " Part I",
            B: " Part II",
            C: " Part III",
            D: " Part IV"
        },
        correctAnswer: "D"
    },
    {
        question: "What is the maximum number of members that can be appointed to the Rajya Sabha by the President of India?",
        answers: {
            A: " 12",
            B: " 10",
            C: " 14",
            D: " 16"
        },
        correctAnswer: "A"
    },
    {
        question: "Who is the head of the executive branch of the Indian government?",
        answers: {
            A: " Prime Minister ",
            B: " Speaker of the Lok Sabha ",
            C: " Chief Justice of India ",
            D: " President "
        },
        correctAnswer: "A"
    },
    {
        question: "Who has the authority to proclaim a financial emergency in India?",
        answers: {
            A: " Chief Justice of India",
            B: " Prime Minister ",
            C: " President ",
            D: " Comptroller and Auditor General "
        },
        correctAnswer: "C"
    },
    {
        question: "In which year was the Goods and Services Tax (GST) introduced in India to replace various indirect taxes?",
        answers: {
            A: " 2020 ",
            B: " 2017 ",
            C: " 2010 ",
            D: " 2015 "
        },
        correctAnswer: "B"
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
    const audio = new Audio();
    audio.src = "mouse-click.mp3";
    const selectedAnswer = document.querySelector("input[name='answer']:checked");
    if (selectedAnswer) {
        const userAnswer = selectedAnswer.value;
        const currentQuestion = questions[currentQuestionIndex];
        if (userAnswer === currentQuestion.correctAnswer) {
            score++;
            audio.play();
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