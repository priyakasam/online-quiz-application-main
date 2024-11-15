const questions = [
    {
        question: "The Maurya Empire, one of the largest empires in ancient India, was founded by which ruler?",
        answers: {
            A: " Chandragupta Maurya ",
            B: " Ashoka ",
            C: " Shivaji ",
            D: " Akbar "
        },
        correctAnswer: "A"
    },
    {
        question: "Which famous ancient structure in Egypt is known for its association with the pharaohs and served as a tomb for them?",
        answers: {
            A: " Taj Mahal ",
            B: " Pyramids of Giza  ",
            C: " Parthenon ",
            D: " Great Wall of China "
        },
        correctAnswer: "B"
    },
    {
        question: "Which ancient civilization is known for its contributions to mathematics, including the concept of zero and the decimal system?",
        answers: {
            A: " Ancient Greece ",
            B: " Egyptian Civilization ",
            C: " Roman Civilzation ",
            D: " Indus Valley Civilization"
        },
        correctAnswer: "D"
    },
    {
        question: "Who is often credited with discovering America in 1492 while searching for a western route to Asia?",
        answers: {
            A: " Vasco da Gama ",
            B: " Christopher Columbus ",
            C: " Ferdinand Magellan ",
            D: " Marco Polo"
        },
        correctAnswer: "B"
    },
    {
        question: "In which year did Mahatma Gandhi lead the famous Dandi March as part of the civil disobedience movement against British colonial rule?",
        answers: {
            A: " 1919",
            B: " 1942 ",
            C: " 1930 ",
            D: " 1922"
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