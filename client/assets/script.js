const questions = {
    "questions": [
        {
            "question": "Which of the following is NOT a renewable resource?",
            "options": [
                {
                    "option": "Solar energy",
                    "correct": false
                },
                {
                    "option": "Wind energy",
                    "correct": false
                },
                {
                    "option": "Fossil fuels",
                    "correct": true
                },
                {
                    "option": "Hydroelectric power",
                    "correct": false
                }
            ]
        },
        {
            "question": "What is the capital city of Australia?",
            "options": [
                {
                    "option": "Sydney",
                    "correct": false
                },
                {
                    "option": "Melbourne",
                    "correct": false
                },
                {
                    "option": "Canberra",
                    "correct": true
                },
                {
                    "option": "Perth",
                    "correct": false
                }
            ]
        }
    ]
}

const questionElement = document.getElementById("question");
const answerElement = document.querySelector("#answer-buttons");
const nextButton = document.getElementById("next-btn");

let score = 0;
let currentQuestionIndex = 0;

const showQuestion = () => {
    let currentQuestion = questions.questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.textContent = `${questionNo}. ${currentQuestion.question}`;

}

const fetchQuestion = async () => {

}


showQuestion();