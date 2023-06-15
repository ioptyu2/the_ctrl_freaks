let checkboxes = document.querySelectorAll("input[type=checkbox]");
const addForm = document.getElementById('addQuestionForm');
const editForm = document.getElementById("editQuestionForm");
let questionBank = {};
let questionData = null;
const settingsButton = document.getElementById("buttons");
const editButton = document.getElementById("edit");
const editSelect = document.getElementById("editSelectId"); 
const selectForm = document.getElementById("selectForm")

addForm.style.display = "none";
editForm.style.display = "none";
selectForm.style.display = "none";

settingsButton.addEventListener("click", (e) => {
    let settings = e.target.id
    settingsButton.style.display = "none"
    document.getElementById(`${settings}QuestionForm`).style.display = "block"
    if(settings == "edit"){
        selectForm.style.display = "block"
    }
})

editButton.addEventListener("click", addSelect())

async function addSelect() {
    const res = await fetch("http://localhost:3005/questions")
    const data = await res.json()

    data.forEach((question) => {
        let option = document.createElement("option")
        option.text = question.id
        option.value = question.id
        editSelect.add(option)
    })
}

editSelect.addEventListener("change", async function(e) {
    const response = await fetch(`http://localhost:3005/questions/${e.target.value}`)
    const data = await response.json()
    editForm.question.value = data.question

    data.options.forEach(function(options, index) {
        editForm.elements[`option${index + 1}`].value = data.options[index].option
        if(options.correct == true){
           editForm.elements[`correct${index + 1}`].checked = true
        }else{
            editForm.elements[`correct${index + 1}`].checked = false
        }
    })
    editForm.category.value = data.category
    editForm.explanation.value = data.explanation
})

editForm.addEventListener('submit', async function(e) {
    e.preventDefault()

    let question = {
        category: editForm.category.value,
        id: editSelect.value,  
        question: editForm.question.value,
        options: [
            { option: editForm.option1.value, correct: editForm.correct1.checked },
            { option: editForm.option2.value, correct: editForm.correct2.checked },
            { option: editForm.option3.value, correct: editForm.correct3.checked },
            { option: editForm.option4.value, correct: editForm.correct4.checked }
        ],
        explanation: editForm.explanation.value
    }
    console.log(question)
    editQuestion(question)
    e.target.reset()
})

async function editQuestion(question){
    try {
        const response = await fetch('http://localhost:3005/questions/edit', { 
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(question)
        })

        if (response.ok) {
            const data = await response.json()

        } else {
            throw (`There is an error: ${response.status}`)
        }
    } catch (e) {
        console.log(e)
    }
}

checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener("change", function() {
    if (checkbox.checked) {
      checkboxes.forEach(function(otherCheckbox) {
        if (otherCheckbox !== checkbox) otherCheckbox.checked = false
      })
    }
  })
})

addForm.addEventListener('submit', async function(e) {
    e.preventDefault()
    await fetchQuestions()

    let question = {
        category: addForm.category.value,
        id: questionData.length +1,  
        question: addForm.question.value,
        options: [
            { option: addForm.option1.value, correct: addForm.correct1.checked },
            { option: addForm.option2.value, correct: addForm.correct2.checked },
            { option: addForm.option3.value, correct: addForm.correct3.checked },
            { option: addForm.option4.value, correct: addForm.correct4.checked }
        ],
        explanation: addForm.explanation.value
    }
    
    addQuestion(question)
    e.target.reset()
})

async function addQuestion(question) {
    try {
        const response = await fetch('http://localhost:3005/questions/add', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(question)
        })

        if (response.ok) {
            const data = await response.json()
            questionBank[data.id] = data
        } else {
            throw (`There is an error: ${response.status}`)
        }
    } catch (e) {
        console.log(e)
    }
}

async function fetchQuestions() {
    try {
        const response = await fetch('http://localhost:3005/questions');
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


