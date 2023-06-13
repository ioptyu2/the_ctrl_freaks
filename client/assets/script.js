//example object

const questions = {
    "questions": [
        {
            "category": "easy",
            "id": 1,
            "question": "Which of the following is NOT a renewable resource?",
            "options": [
                { "option": "Solar energy", "correct": false },
                { "option": "Wind energy", "correct": false },
                { "option": "Fossil fuels", "correct": true },
                { "option": "Hydroelectric power", "correct": false }
            ],
            "explanation": "Fossil fuels are not a renewable resource - they cannot be replenished in a short period of time."
        },
        {
            "category": "easy",
            "id": 2,
            "question": "What is the capital city of Australia?",
            "options": [
                { "option": "Sydney", "correct": false },
                { "option": "Melbourne", "correct": false },
                { "option": "Canberra", "correct": true },
                { "option": "Perth", "correct": false }
            ],
            "explanation": "The capital city of Australia is Canberra."
        }

    ]
};

//selecting the HTML elements

const questionElement = document.getElementById("question");
const answerElement = document.querySelector("#answer-buttons");
const nextButton = document.getElementById("next-btn");

//defining score and question index variables

let score = 0;
let currentQuestionIndex = 0;

const showQuestion = () => {
    //removes all previous buttons (if any) to create new buttons

    answerElement.innerHTML = "";

    //adds current question
    const currentQuestion = questions.questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.textContent = `${questionNo}. ${currentQuestion.question}`;

    //loops through options array and creates button for each option

    currentQuestion.options.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerHTML = answer.option;
        button.classList.add("btn"); //to add styling
        button.dataset.index = index; //to add each button's index
        answerElement.appendChild(button);
        button.addEventListener("click", selectAnswer);
    });
};

const selectAnswer = (e) => {

    const selectedBtn = e.target;
    const selectedOptionIndex = parseInt(selectedBtn.dataset.index); //uses index data attribute
    const currentQuestion = questions.questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options[selectedOptionIndex];

    if (selectedOption.correct) {
        selectedBtn.classList.add("correct"); //adds green highlight styling
        score++;
    } else {
        selectedBtn.classList.add("incorrect"); //add red highlight styling
    }


    const disableButtons = document.querySelectorAll("#answer-buttons button");
    disableButtons.forEach((button) => {
        button.disabled = true;
    });

    nextButton.disabled = false;
};

const nextBtn = () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.questions.length) {
        showQuestion();
        nextButton.disabled = true;
    } else {
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `You scored ${score} out of ${questions.questions.length}!`;


        questionElement.style.display = "none";
        answerElement.style.display = "none";
        nextButton.style.display = "none";
    }
};

nextButton.addEventListener("click", nextBtn);


showQuestion();
nextButton.disabled = true;
