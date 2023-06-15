
const scoreboardTable = document.getElementById("scoreboard");
const backButtonElement = document.getElementById("button");
async function fetchScores() {
    fetch("http://localhost:3005/scores")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error fetching scores");
            }
            return response.json();
        })
        .then((data) => {
            data.forEach((scoreData) => {
                addRow(scoreData.playerName, scoreData.score);
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

function addRow(playerName, score) {
    const newRow = document.createElement("tr");

    const playerNameCell = document.createElement("td");
    const scoreCell = document.createElement("td");

    playerNameCell.textContent = playerName;
    scoreCell.textContent = score;

    newRow.appendChild(playerNameCell);
    newRow.appendChild(scoreCell);

    scoreboardTable.querySelector("tbody").appendChild(newRow);
}


backButtonElement.addEventListener("click", () => {
    window.location.href = "../client/index.html";
});


fetchScores();

