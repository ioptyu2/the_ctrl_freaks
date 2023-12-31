# the_ctrl_freaks
# Geobyte
![Screenshot of Geobyte quiz homepage](https://raw.githubusercontent.com/ioptyu2/the_ctrl_freaks/dhiviya/Geobyte_ss.png)

## Project Description
GEOBYTE is an educational app which tests students on their geographical knowledge. It targets Key Stage 3 students.

### Key Features
The app consists of the following features:
* A homepage 
* Quizzes of varying difficulty
* A scoreboard which logs the results of a quiz if desired - this allows students to track their progress.
* A settings page

## Installation & Usage

### Installation
* Open the terminal
* Use git command `git clone` followed by the project URL 
* Navigate to 'the_ctrl_freaks/server' directory
* In the terminal, install relevant packages with `npm install --save-dev` 
* Navigate back to 'the_ctrl_freaks' directory
* Use the git command `code .` to open in VS Code

### Usage
* Navigate to 'the_ctrl_freaks/server' directory.
* Use git command `npm run dev` to run server.
* Open index.html with live server extension.

## Technologies
* HTML
* CSS
* JavaScript
* Node
* Express
* Git and Git Hub

## Process
* Broke down the logic by writing out basic functions required to create quiz.
* Created HTML and CSS files for index/quiz/scoreboard/settings pages.
* Created server by establishing GET/POST/DELETE/PATCH requests.
* Created async functions to fetch quiz data from server:
    
    `async function fetchQuestions() {
    try {
        const response = await fetch('http://localhost:3005/questions/${difficulty}');
        if (!response.ok) {
            console.log('Error fetching JSON:', response.status);
        }
        const data = await response.json();
        questionData = getRandomSample(data, 5);
        console.log(questionData);
    } catch (err) {
        console.log(err);
    }
}`

* Created functions for quiz features. 
* Created functions for settings features.
* Created functions for scoreboard features.

## Wins & Challenges

### Wins
* Managed to implement an async function that fetches a total of five objects containing the relevant information.
* Created a dynamic quiz page which goes through the difficulty levels, the quiz questions and then displays the results page.
* Created a function that allows you to submit your name and score, and then directs you to the scoreboard.
* Created a settings page where you can dynamically create, edit and delete questions.

### Challenges
* Several instances of variable scope limitations.

## Bugs
* When server is restarted, data is lost.
* Layout is only suited for particular screen size - lacks responsiveness.
* No error pages to provide appropriate error messages to the user when requests fail.
* No input validation - users can submit blank values to scoreboard.
* UI/UX bugs e.g. layout inconsistency.

## Future Features
* Create user profiles and accounts.
* Create school accounts with privileges e.g. creating/editing/deleting quizzes.
* Add rewards for users.
* Implement quizzes of various geographical topics.
* Implement category selection for those topics. 
* Add timers on quizzes. 
* Add a hint system.
* When user clicks on quiz option, provide more information about correct answer in order to further their understanding of topic.
* Implement an adaptive difficulty system which adjusts difficulty level appropriate for user based on prior performance in quizzes.

## License
* MIT Licence


