
const questionElement = document.getElementById("question");
const answerElement = document.querySelector("#answer-buttons");
const nextButton = document.getElementById("next-btn");
const difficultyButton = document.getElementById("buttons")
let questionData = null;
let currentQuestionIndex = 0;
let score = 0;
let difficulty = ""


async function fetchQuestions() {
    try {
        const response = await fetch(`http://localhost:3005/questions/${difficulty}`);
        if (!response.ok) {
            console.log(`Error fetching JSON:`, response.status);
        }
        const data = await response.json();
        questionData = data;
    } catch (err) {
        console.log(err);
    }
}

const showQuestion = () => {

    // Removes all previous buttons (if any) to create new buttons
    answerElement.innerHTML = "";

    // Adds current question
    const currentQuestion = questionData[currentQuestionIndex];
    console.log(currentQuestion);
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    // Loops through options array and creates button for each option
    currentQuestion.options.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerHTML = answer.option;
        button.classList.add("btn"); // Adds styling
        button.dataset.index = index; // Adds each button's index
        answerElement.appendChild(button);
        button.addEventListener("click", selectAnswer);
    });
};

const selectAnswer = (e) => {
    const selectedBtn = e.target;
    const selectedOptionIndex = parseInt(selectedBtn.dataset.index); // Uses index data attribute
    const currentQuestion = questionData[currentQuestionIndex];
    const selectedOption = currentQuestion.options[selectedOptionIndex];

    if (selectedOption.correct) {
        selectedBtn.classList.add("correct"); // Adds green highlight styling
        score++;
    } else {
        selectedBtn.classList.add("incorrect"); // Adds red highlight styling
    }

    const disableButtons = document.querySelectorAll("#answer-buttons button");
    disableButtons.forEach((button) => {
        button.disabled = true;
    });

    const nextButton = document.getElementById("next-btn");
    nextButton.disabled = false;
};

const nextBtn = () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questionData.length) {
        showQuestion();
        const nextButton = document.getElementById("next-btn");
        nextButton.disabled = true;
    } else {
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `You scored ${score} out of ${questionData.length}!`;

        questionElement.style.display = "none";
        answerElement.style.display = "none";
        nextButton.style.display = "none";
    }
};

const selectDifficulty = () => {
    nextButton.style.display = "block"
    difficultyButton.style.display = "none"
    initQuiz()
}

//when difficulty button is clicked, store the difficulty for use in fetchQuestions
difficultyButton.addEventListener("click", (e) => {
    difficulty = e.target.id
    selectDifficulty()
})

nextButton.style.display = "none"
nextButton.addEventListener("click", nextBtn);
nextButton.disabled = true;


const initQuiz = async () => {
    await fetchQuestions();
    showQuestion();
};
