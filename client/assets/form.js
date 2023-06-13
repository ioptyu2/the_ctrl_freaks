let checkboxes = document.querySelectorAll("input[type=checkbox]");

checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener("change", function() {
    if (this.checked) {
      checkboxes.forEach(function(checkbox) {
        if (checkbox !== this) checkbox.checked = false;
      }, this);
    }
  });
});

const form = document.getElementById('questionForm');
let questionBank = {};

form.addEventListener('submit', function(e) {
    e.preventDefault();

    fetch('http://localhost:3005/questions') 
    .then(response => response.json())
    .then(questions => {
        let question = {
            category: form.category.value,
            id: questions.length + 1,  
            question: form.question.value,
            options: [
                { option: form.option1.value, correct: form.correct1.checked },
                { option: form.option2.value, correct: form.correct2.checked },
                { option: form.option3.value, correct: form.correct3.checked },
                { option: form.option4.value, correct: form.correct4.checked }
            ],
            explanation: form.explanation.value
        };

        addQuestion(question);
    }); 
    e.target.reset(); 
});

async function addQuestion(question) {
    try {
        const response = await fetch('http://localhost:3005/questions/add', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(question)
        });

        if (response.ok) {
            const data = await response.json();
            questionBank[data.id] = data;
        } else {
            throw (`There is an error: ${response.status}`);
        }
    } catch (e) {
        console.log(e);
    }
}


