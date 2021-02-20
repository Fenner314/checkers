// =========
// Game data 
// =========
const board = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
]

// parses id's and returns the index of that piece's place on the board
let findPiece = (id) => {
    let parsed = parseInt(id);
    return board.indexOf(parsed);
};
// =============
// DOM referenes
// =============
const cells = document.querySelectorAll("td");
let redPieces = document.querySelectorAll("p");
let blackPieces = document.querySelectorAll("span")
const redTurnText = document.querySelectorAll(".red-turn");
const blackTurntext = document.querySelectorAll(".black-turn");
const divider = document.querySelector("#divider")

// =================
// player properties
// =================
let turn = true;
let redScore = 12;
let blackScore = 12;
let playerPieces;

let selectedPiece = {
    id: -1,
    index: -1,
    isKing: false,
    spaceSeven: false,
    spaceNine: false,
    spaceFourteen: false,
    spaceEighteen: false,
    spaceMinusSeven: false,
    spaceMinusNine: false,
    spaceMinusFourteen: false,
    spaceMinusEighteen: false
}

// ==============
// Event listener
// ============== 

// initialize event listeners on pieces
function giveClick() {
    if (turn) {
        for (let i = 0; i < redPieces.length; i++) {
            redPieces[i].addEventListener("click", getPieces);
        }
    } else {
        for (let i = 0; i < blackPieces.length; i++) {
            blackPieces[i].addEventListener("click", getPieces);
        }
    }
}

// ==============
// Function chain
// ============== 

// holds the length of the players piece count
function getPieces() {
    if (turn) {
        playerPieces = redPieces;
    } else {
        playerPieces = blackPieces;
    }
    removeCellonclick();
    resetBorders();
}

// removes possible moves from old selected piece (* this is needed because the user might re-select a piece *)
function removeCellonclick() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("onclick");
    }
}

// resets borders to default
function resetBorders() {
    for (let i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = "1px solid white";
    }
    resetSelectedPieceProperties();
    getSelectedPiece();
}

// resets selected piece properties
function resetSelectedPieceProperties() {
    selectedPiece.id = -1;
    selectedPiece.id = -1;
    selectedPiece.isKing = false;
    selectedPiece.spaceSeven = false;
    selectedPiece.spaceNine = false;
    selectedPiece.spaceFourteen = false;
    selectedPiece.spaceEighteen = false;
    selectedPiece.spaceMinusSeven = false;
    selectedPiece.spaceMinusNine = false;
    selectedPiece.spaceMinusFourteen = false;
    selectedPiece.spaceMinusEighteen = false;
}

// gets ID and index of the board cell its on
function getSelectedPiece() {
    selectedPiece.id = parseInt(event.target.id);
    selectedPiece.index = findPiece(selectedPiece.id);
    isPieceKing();
}

// checks if selected piece is a king
function isPieceKing() {
    if (document.getElementById(selectedPiece.id).classList.contains("king")) {
        selectedPiece.isKing = true;
    } else {
        selectedPiece.isKing = false;
    }
    getAvailableSpaces();
}

// gets the moves that the selected piece can make
function getAvailableSpaces() {
    if (board[selectedPiece.index + 7] === null && 
        cells[selectedPiece.index + 7].classList.contains("noPieceHere") !== true) {
        selectedPiece.spaceSeven = true;
    }
    if (board[selectedPiece.index + 9] === null && 
        cells[selectedPiece.index + 9].classList.contains("noPieceHere") !== true) {
        selectedPiece.spaceNine = true;
    }
    if (board[selectedPiece.index - 7] === null && 
        cells[selectedPiece.index - 7].classList.contains("noPieceHere") !== true) {
        selectedPiece.spaceMinusSeven = true;
    }
    if (board[selectedPiece.index - 9] === null && 
        cells[selectedPiece.index - 9].classList.contains("noPieceHere") !== true) {
        selectedPiece.spaceMinusNine = true;
    }
    checkAvailableJumpSpaces();
}

// gets the moves that the selected piece can jump
function checkAvailableJumpSpaces() {
    if (turn) {
        if (board[selectedPiece.index + 14] === null 
        && cells[selectedPiece.index + 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.index + 7] >= 12) {
            selectedPiece.spaceFourteen = true;
        }
        if (board[selectedPiece.index + 18] === null 
        && cells[selectedPiece.index + 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.index + 9] >= 12) {
            selectedPiece.spaceEighteen = true;
        }
        if (board[selectedPiece.index - 14] === null 
        && cells[selectedPiece.index - 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.index - 7] >= 12) {
            selectedPiece.spaceMinusFourteen = true;
        }
        if (board[selectedPiece.index - 18] === null 
        && cells[selectedPiece.index - 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.index - 9] >= 12) {
            selectedPiece.spaceMinusEighteen = true;
        }
    } else {
        if (board[selectedPiece.index + 14] === null 
        && cells[selectedPiece.index + 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.index + 7] < 12 && board[selectedPiece.index + 7] !== null) {
            selectedPiece.spaceFourteen = true;
        }
        if (board[selectedPiece.index + 18] === null 
        && cells[selectedPiece.index + 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.index + 9] < 12 && board[selectedPiece.index + 9] !== null) {
            selectedPiece.spaceEighteen = true;
        }
        if (board[selectedPiece.index - 14] === null && cells[selectedPiece.index - 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.index - 7] < 12 
        && board[selectedPiece.index - 7] !== null) {
            selectedPiece.spaceMinusFourteen = true;
        }
        if (board[selectedPiece.index - 18] === null && cells[selectedPiece.index - 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.index - 9] < 12
        && board[selectedPiece.index - 9] !== null) {
            selectedPiece.spaceMinusEighteen = true;
        }
    }
    checkPieceConditions();
}

// restricts movement if the piece is a king
function checkPieceConditions() {
    if (selectedPiece.isKing) {
        givePieceBorder();
    } else {
        if (turn) {
            selectedPiece.spaceMinusSeven = false;
            selectedPiece.spaceMinusNine = false;
            selectedPiece.spaceMinusFourteen = false;
            selectedPiece.spaceMinusEighteen = false;
        } else {
            selectedPiece.spaceSeven = false;
            selectedPiece.spaceNine = false;
            selectedPiece.spaceFourteen = false;
            selectedPiece.spaceEighteen = false;
        }
        givePieceBorder();
    }
}

// gives the piece a green highlight for the user (showing its movable)
function givePieceBorder() {
    if (selectedPiece.spaceSeven || selectedPiece.spaceNine || selectedPiece.spaceFourteen || selectedPiece.spaceEighteen
    || selectedPiece.spaceMinusSeven || selectedPiece.spaceMinusNine || selectedPiece.spaceMinusFourteen || selectedPiece.spaceMinusEighteen) {
        document.getElementById(selectedPiece.id).style.border = "1px solid green";
        giveCellsClick();
    } else {
        return;
    }
}

// gives the cells on the board a 'click' bassed on the possible moves
function giveCellsClick() {
    if (selectedPiece.spaceSeven) {
        cells[selectedPiece.index + 7].setAttribute("onclick", "makeMove(7)");
    }
    if (selectedPiece.spaceNine) {
        cells[selectedPiece.index + 9].setAttribute("onclick", "makeMove(9)");
    }
    if (selectedPiece.spaceFourteen) {
        cells[selectedPiece.index + 14].setAttribute("onclick", "makeMove(14)");
    }
    if (selectedPiece.spaceEighteen) {
        cells[selectedPiece.index + 18].setAttribute("onclick", "makeMove(18)");
    }
    if (selectedPiece.spaceMinusSeven) {
        cells[selectedPiece.index - 7].setAttribute("onclick", "makeMove(-7)");
    }
    if (selectedPiece.spaceMinusNine) {
        cells[selectedPiece.index - 9].setAttribute("onclick", "makeMove(-9)");
    }
    if (selectedPiece.spaceMinusFourteen) {
        cells[selectedPiece.index - 14].setAttribute("onclick", "makeMove(-14)");
    }
    if (selectedPiece.spaceMinusEighteen) {
        cells[selectedPiece.index - 18].setAttribute("onclick", "makeMove(-18)");
    }
}

/* v when the cell is clicked v */

// makes the move that was clicked
function makeMove(number) {
    document.getElementById(selectedPiece.id).remove();
    cells[selectedPiece.index].innerHTML = "";
    if (turn) {
        if (selectedPiece.isKing) {
            cells[selectedPiece.index + number].innerHTML = `<p class="red-piece king" id="${selectedPiece.id}"></p>`;
            redPieces = document.querySelectorAll("p");
        } else {
            cells[selectedPiece.index + number].innerHTML = `<p class="red-piece" id="${selectedPiece.id}"></p>`;
            redPieces = document.querySelectorAll("p");
        }
    } else {
        if (selectedPiece.isKing) {
            cells[selectedPiece.index + number].innerHTML = `<span class="black-piece king" id="${selectedPiece.id}"></span>`;
            blackPieces = document.querySelectorAll("span");
        } else {
            cells[selectedPiece.index + number].innerHTML = `<span class="black-piece" id="${selectedPiece.id}"></span>`;
            blackPieces = document.querySelectorAll("span");
        }
    }

    let indexOfPiece = selectedPiece.index
    if (number === 14 || number === -14 || number === 18 || number === -18) {
        changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
    } else {
        changeData(indexOfPiece, indexOfPiece + number);
    }
}

// Changes the board data
function changeData(index, modifiedIndex, removePiece) {
    board[index] = null;
    board[modifiedIndex] = parseInt(selectedPiece.id);
    if (turn && selectedPiece.id < 12 && modifiedIndex >= 57) {
        document.getElementById(selectedPiece.id).classList.add("king")
    }
    if (!turn && selectedPiece.id >= 12 && modifiedIndex <= 7) {
        document.getElementById(selectedPiece.id).classList.add("king");
    }
    if (removePiece) {
        board[removePiece] = null;
        if (turn && selectedPiece.id < 12) {
            cells[removePiece].innerHTML = "";
            blackScore--
        }
        if (!turn && selectedPiece.id >= 12) {
            cells[removePiece].innerHTML = "";
            redScore--
        }
    }
    resetSelectedPieceProperties();
    removeCellonclick();
    removeEventListeners();
}

// removes the 'onClick' event listeners for pieces
function removeEventListeners() {
    if (turn) {
        for (let i = 0; i < redPieces.length; i++) {
            redPieces[i].removeEventListener("click", getPieces);
        }
    } else {
        for (let i = 0; i < blackPieces.length; i++) {
            blackPieces[i].removeEventListener("click", getPieces);
        }
    }
    checkForWin();
}

// Checks for a win
function checkForWin() {
    if (blackScore === 0) {
        divider.style.display = "none";
        for (let i = 0; i < redTurnText.length; i++) {
            redTurnText[i].style.color = "black";
            blackTurntext[i].style.display = "none";
            redTurnText[i].textContent = "RED WINS!";
        }
    } else if (redScore === 0) {
        divider.style.display = "none";
        for (let i = 0; i < blackTurntext.length; i++) {            
            blackTurntext[i].style.color = "black";
            redTurnText[i].style.display = "none";
            blackTurntext[i].textContent = "BLACK WINS!";
        }
    }
    changePlayer();
}

// Switches players turn
function changePlayer() {
    if (turn) {
        turn = false;
        for (let i = 0; i < redTurnText.length; i++) {
            redTurnText[i].style.color = "lightGrey";
            blackTurntext[i].style.color = "black";
        }
    } else {
        turn = true;
        for (let i = 0; i < blackTurntext.length; i++) {
            blackTurntext[i].style.color = "lightGrey";
            redTurnText[i].style.color = "black";
        }
    }
    giveClick();
}

giveClick();