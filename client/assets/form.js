let checkboxes = document.querySelectorAll("input[type=checkbox]")
const addForm = document.getElementById('addQuestionForm')
let questionBank = {}
let questionData = null

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
            { option: form.option1.value, correct: form.correct1.checked },
            { option: form.option2.value, correct: form.correct2.checked },
            { option: form.option3.value, correct: form.correct3.checked },
            { option: form.option4.value, correct: form.correct4.checked }
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


