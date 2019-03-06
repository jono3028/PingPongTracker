/*
 *  Funding Cirle UI /FE test
 *  Task 3
 *  Author: Jonathan Owen
*/ 

// import AddGame from "addGame.js";
const _gameData = {
    games: [
        {
            player1: "Kerge Kotzher",
            player2: "Emily M. Mills",
            scorePlayer1: [11, 11, 11, 9, 7, 11],
            scorePlayer2: [7, 9, 3, 11, 11, 8]
        },
        {
            player1: "Oronzo Gallo",
            player2: "Leo Matic",
            scorePlayer1: [3, 7, 0],
            scorePlayer2: [11, 11, 6]
        },
        {
            player1: "Nicole C. Lewis",
            player2: "Feng Yang",
            scorePlayer1: [6, 14, 4],
            scorePlayer2: [11, 12, 11]
        }
    ]
}


const getGameRow = (game) => {
    let tableData = document.createElement("td");
    tableData.className = "score_table_result";
    tableData.appendChild(getGame(game));
    tableData.appendChild(getGameRounds(game.scorePlayer1, game.scorePlayer2));
    
    return tableData
}

const getGame = (game) => {
    const player1Avatar = getAvatar(game.player1Avatar);
    const player2Avatar = getAvatar(game.player2Avatar);;
    const score = getScore(game.scorePlayer1, game.scorePlayer2);
    const text = document.createTextNode(`${game.player1} ${score.score1} - ${score.score2} ${game.player2}`);
    const player1Win = score.score1 > score.score2;

    let final = document.createElement("div");
    final.className = "result_score";
    let headerText = document.createElement("h2");
    headerText.appendChild(text);

    final.appendChild(getWinNotifier(player1Win));
    final.appendChild(player1Avatar);
    final.appendChild(headerText);
    final.appendChild(player2Avatar);
    final.appendChild(getWinNotifier(!player1Win));

    return final
}

const getScore = (player1, player2) => {
    score1 = score2 = 0;

    for (let idx = 0; idx < player1.length; idx++) {
        if (player1[idx] > player2[idx]) {
            score1++;
        } else {
            score2++;
        }
    }

    return {score1, score2};
}
const getAvatar = (imgPath) => {
    let avatar = document.createElement("img")
    avatar.className = "player_Avatar"
    avatar.src = (imgPath === undefined) ? "../img/avatar.png" : imgPath;
    avatar.alt = "Player Image"

    return avatar;
}

const getWinNotifier = (win) => {
    let winNotifier = document.createElement("span");
    winNotifier.className = (win) ? "green_dot" : "no_dot";

    return winNotifier;
}

const getGameRounds = (scores1, scores2) => {
    let gamesString = ""
    for (let idx = 0; idx < scores1.length; idx++) {
        gamesString += `${scores1[idx]} - ${scores2[idx]}`
        if (idx < scores1.length - 1) {
            gamesString += " | ";
        }
    }
    const textNode = document.createTextNode(gamesString);
    let games = document.createElement("div");
    games.className = "result_rounds";
    games.appendChild(textNode);

    return games;
}


function getGamesTable() {
    let table = document.createElement("table");
    table.id = "game_table";
    let idx = 0;
    
    for (const game of _gameData.games) {
        let tableRow = document.createElement("tr");
        tableRow.id = `result_${++idx}`;
        tableRow.className = "table_row"
        let data = getGameRow(game);
        data.className = "table_data";
        tableRow.appendChild(data);
        tableRow.appendChild(getDeleteBtn(tableRow.id));
        table.appendChild(tableRow);
        
    }
    
    let tableContainer = document.getElementById("score_table");
    tableContainer.appendChild(table);
}

const getDeleteBtn = (rowId) => {
    let deleteBtn = document.createElement("img");
    deleteBtn.className = "delete_btn";
    deleteBtn.src = "../img/trash.png";
    deleteBtn.data = rowId;
    deleteBtn.onclick = deleteRow;

    let td = document.createElement("td");
    td.appendChild(deleteBtn);

    return td;
}

function deleteRow(btn) {
    const tr = document.getElementById(btn.target.data);
    tr.parentElement.removeChild(tr);
}

getGamesTable();
