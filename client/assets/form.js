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

form.addEventListener('submit', function(e) {
    e.preventDefault()

    console.log(form.category.value)
    console.log(form.question.value)
    console.log(form.explanation.value)
    console.log(form.option1.value)

    let question = {
        category: form.category.value,
        id: Date.now(),  
        question: form.question.value,
        options: [
            { option: form.option1.value, correct: form.correct1.checked },
            { option: form.option2.value, correct: form.correct2.checked },
            { option: form.option3.value, correct: form.correct3.checked },
            { option: form.option4.value, correct: form.correct4.checked }
        ],
        explanation: form.explanation.value
    }
    console.log(question)
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


