const questions = [
    {
        question: "If 3 pencils cost 15 cents, how much do 8 pencils cost?",
        answers: {
            A: " 20 cents ",
            B: " 10 cents ",
            C: " 40 cents ",
            D: " 45 cents "
        },
        correctAnswer: "C"
    },
    {
        question: "If a car travels 180 miles in 3 hours, what is its average speed in miles per hour (mph)?",
        answers: {
            A: " 90 mph ",
            B: " 120 mph ",
            C: " 45 mph ",
            D: " 60 mph "
        },
        correctAnswer: "D"
    },
    {
        question: "If the price of a book is reduced by 20%, and the new price is $16, what was the original price of the book?",
        answers: {
            A: " $18",
            B: " $24",
            C: " $20",
            D: " $32"
        },
        correctAnswer: "B"
    },
    {
        question: "A garden is in the shape of a square with a side length of 10 meters. If a path of uniform width 1 meter is built around the garden, what is the area of the path?",
        answers: {
            A: " 99 sq. meters ",
            B: " 100 sq. meters ",
            C: " 121 sq. meters ",
            D: " 144 sq. meters "
        },
        correctAnswer: "C"
    },
    {
        question: " The sum of ages of 5 children born at the intervals of 3 years each is 50 years. What is the age of the youngest child?",
        answers: {
            A: " 4 years ",
            B: " 6 years ",
            C: " 12 years ",
            D: " 8 years "
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