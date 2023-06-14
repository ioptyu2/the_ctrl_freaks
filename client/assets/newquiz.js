const questionElement = document.getElementById("question");
const answerElement = document.querySelector("#answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const playElement = document.getElementById("play");
const textElement = document.getElementById("text");
const inputElement = document.getElementById("input");
const submitElement = document.getElementById("submit");

let questionData = null;
let currentQuestionIndex = 0;
let score = 0;
let playerName = null;

const backButton = document.createElement("button");
backButton.textContent = "Back to Home";
backButton.setAttribute("id", "next-btn");
backButton.addEventListener("click", () => {
    window.location.href = "../client/index.html";
});
document.body.appendChild(backButton);

async function fetchQuestions() {
    try {
        const response = await fetch('http://localhost:3005/questions/easy');
        if (!response.ok) {
            console.log(`Error fetching JSON:`, response.status);
        }
        const data = await response.json();
        questionData = data;
        console.log(questionData);
    } catch (err) {
        console.log(err);
    }
}

const showQuestion = () => {

    // Removes all previous buttons (if any) to create new buttons
    answerElement.innerHTML = "";
    resultElement.textContent = "";
    playElement.innerHTML = "";
    textElement.innerHTML = "";
    // inputElement.innerHTML = "";
    // submitElement.innerHTML = "";

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

const restartQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    questionElement.style.display = "block";
    answerElement.style.display = "block";
    nextButton.style.display = "block";
}


const nextBtn = () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questionData.length) {
        showQuestion();
        nextButton.disabled = true;
    } else {
        resultElement.innerHTML = `You scored ${score} out of ${questionData.length}!`;
        const playButton = document.createElement("button");
        playButton.textContent = "Play again?";
        playButton.setAttribute("id", "next-btn");
        playElement.appendChild(playButton);

        textElement.innerHTML = `Would you like to submit your score?`;

        const nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("placeholder", "Enter your name");
        nameInput.setAttribute("id", "name-input");
        inputElement.appendChild(nameInput);

        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        submitButton.setAttribute("id", "next-btn");
        submitElement.appendChild(submitButton);

        submitButton.addEventListener("click", submitScore);

        questionElement.style.display = "none";
        answerElement.style.display = "none";
        nextButton.style.display = "none";

        playButton.addEventListener("click", restartQuiz);
    }
};

function submitScore(e) {
    e.preventDefault();
    playerName = document.getElementById("name-input").value;
    let newUrl = new URL('../client/scoreboard.html', window.location.href);

    console.log(playerName);
    newUrl.searchParams.append("name", playerName);
    newUrl.searchParams.append("score", score);
    window.location.href = newUrl.href;

    // window.location.href = `../client/scoreboard.html?name=${playerName}&score=${score}`;
}


nextButton.addEventListener("click", nextBtn);
nextButton.disabled = true;

const initQuiz = async () => {
    await fetchQuestions();
    showQuestion();
};

initQuiz();

