const scoreboardDiv = document.getElementById("scoreboard");

const urlParams = new URLSearchParams(window.location.search);
const playerName = urlParams.get("name");
const score = urlParams.get("score");

const playerScore = document.createElement("p");
playerScore.textContent = `Player: ${playerName}, Score: ${score}`;
scoreboardDiv.appendChild(playerScore);
