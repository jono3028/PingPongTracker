/*
 *  Funding Cirle UI /FE test
 *  Task 3
 *  Author: Jonathan Owen
*/

const PlayerList = ["Kerge Kotzher", "Emily M. Mills", "Oronzo Gallo", "Leo Matic", "Nicole C. Lewis", "Feng Yang"];

function getSelectOptions() {
    for (const name of PlayerList) {
        let newOption = document.createElement("option");
        newOption.value = name;

        document.getElementById("playerList")
            .appendChild(newOption);
    }
}

getSelectOptions();

const randomNum = (lowerBound, upperBound) =>
    Math.floor((upperBound - lowerBound + 1) * (Math.random())) + lowerBound;

const getMatches = () => {
    const numRounds = randomNum(2, 5)
    let scores = {scorePlayer1: new Array(numRounds), scorePlayer2: new Array(numRounds)};
    // Generate scores
    for (let round = 0; round < numRounds; round++) {
        let s1 = randomNum(0, 11);
        let s2 = randomNum(0, 11);
        // First to 11 wins, must win by 2
        while (Math.abs(s1 - s2) < 2 || Math.max(s1, s2) < 11) {
            (randomNum(0, 1)) ? s1++ : s2++;
        }
        scores.scorePlayer1[round] = s1;
        scores.scorePlayer2[round] = s2;
    }

    return scores;
}

function AddGame(form) {
    const player1 = form.player1.value;
    const player2 = form.player2.value;

    const table = document.getElementById("game_table");
    const tableChildren = [...table.childNodes];

    let tableRow = document.createElement("tr");
    tableRow.id = `result_${table.lastChild.id + 1}`;
    tableRow.className = "table_row"
    const game = {
        player1,
        player2,
        ...getMatches()
    };
    let data = getGameRow(game);
    data.className = "table_data";

    tableRow.appendChild(data);
    tableRow.appendChild(getDeleteBtn(tableRow.id));
    while (table.firstChild) {
        table.removeChild(table.firstChild)
    }
    table.appendChild(tableRow);
    for (const node of tableChildren) {
        table.appendChild(node);
    }

    form.reset();
}