const scoreboardTable = document.getElementById("scoreboard");
const backButtonElement = document.getElementById("button");
const subtitleElement = document.getElementById("subtitle");
const titleElement = document.getElementById("title");
let rank = 1;

titleElement.style.visibility = "hidden";
scoreboardTable.style.visibility = "hidden";

async function fetchScores() {
    fetch("http://localhost:3005/scores")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error fetching scores");
            }
            return response.json();
        })
        .then((data) => {
            if (data.length > 0) {
                subtitleElement.style.display = "none";
                titleElement.style.visibility = "visible";
                scoreboardTable.style.visibility = "visible";

                data.forEach((scoreData) => {
                    addRow(scoreData.playerName, scoreData.score);
                });
            } else {
                subtitleElement.style.visibility = "visible";
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function addRow(playerName, score) {
    const newRow = document.createElement("tr");

    const playerRankCell = document.createElement("td");
    const playerNameCell = document.createElement("td");
    const scoreCell = document.createElement("td");

    playerRankCell.textContent = rank;
    playerNameCell.textContent = playerName;
    scoreCell.textContent = score;

    newRow.appendChild(playerRankCell);
    newRow.appendChild(playerNameCell);
    newRow.appendChild(scoreCell);

    scoreboardTable.querySelector("tbody").appendChild(newRow);

    rank++;
}

backButtonElement.addEventListener("click", () => {
    window.location.href = "../client/index.html";
});

fetchScores();
