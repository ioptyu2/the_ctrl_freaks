const scoreboardTable = document.getElementById("scoreboard");

const urlParams = new URLSearchParams(window.location.search);
const playerName = urlParams.get("name");
const score = urlParams.get("score");

const newRow = document.createElement("tr");
const tableBody = scoreboardTable.querySelector("tbody");

const playerNameCell = document.createElement("td");
const scoreCell = document.createElement("td");

playerNameCell.textContent = playerName;
scoreCell.textContent = score;

newRow.appendChild(playerNameCell);
newRow.appendChild(scoreCell);

tableBody.appendChild(newRow);

