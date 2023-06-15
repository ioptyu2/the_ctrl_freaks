let checkboxes = document.querySelectorAll("input[type=checkbox]")

checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener("change", function() {
    if (checkbox.checked) {
      checkboxes.forEach(function(otherCheckbox) {
        if (otherCheckbox !== checkbox) otherCheckbox.checked = false
      })
    }
  })
})

const form = document.getElementById('addQuestionForm')
let questionBank = {}

let questionData = null

form.addEventListener('submit', async function(e) {
    e.preventDefault()
    await fetchQuestions()

    let question = {
        category: form.category.value,
        id: questionData.length +1,  
        question: form.question.value,
        options: [
            { option: form.option1.value, correct: form.correct1.checked },
            { option: form.option2.value, correct: form.correct2.checked },
            { option: form.option3.value, correct: form.correct3.checked },
            { option: form.option4.value, correct: form.correct4.checked }
        ],
        explanation: form.explanation.value
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

const deleteForm = document.getElementById('deleteQuestionForm')
const deleteDropdown = document.getElementById('questionSelect')
const selectedQuestionP = document.getElementById('selectedQuestion')

async function getDropdownIds() {
    const response = await fetch('http://localhost:3005/questions')
    const data = await response.json()

    data.forEach((question) => {
        let option = document.createElement('option')
        option.text = question.id
        option.value = question.id
        deleteDropdown.add(option)
    })
}

deleteDropdown.addEventListener('change', async function(e) {
    const response = await fetch(`http://localhost:3005/questions/${e.target.value}`)
    const data = await response.json()

    let selectedQuestion = document.getElementById('selectedQuestion')
    selectedQuestion.textContent = data.question
})

deleteForm.addEventListener('submit', async function(e) {
    e.preventDefault()

    const confirmPrompt = confirm("Are you sure you want to delete this question?");
    if (!confirmPrompt) {
        return
    }

    await fetch(`http://localhost:3005/questions/delete/${deleteDropdown.value}`, {
        method: 'DELETE'
    })

    deleteDropdown.remove(deleteDropdown.selectedIndex)
    let deleteDisplay = document.getElementById('deleteDisplay')
    deleteDisplay.textContent = ''
})

getDropdownIds()



