const game = (() => {
    let _board = [['', '', ''], ['', '', ''], ['', '', '']];

    function getBoard() {
        return _board;
    }

    function setBoard(boardArray) {
        _board = boardArray;
    }

    function clearBoardArray() {
        const _clearBoardArray = _board.map(array1 => array1.map(value => value = ''));
        setBoard(_clearBoardArray);
    }


    function checkWinner(side) {
        //If first line equal
        if (_board[0][0] === side && _board[0][1] === side && _board[0][2] === side) {
            return true;
            //If first column equal
        } else if (_board[0][0] === side && _board[1][0] === side && _board[2][0] === side) {
            return true;
            //If second column equal
        } else if (_board[0][1] === side && _board[1][1] === side && _board[2][1] === side) {
            return true;
            //If third column equal
        } else if (_board[0][2] === side && _board[1][2] === side && _board[2][2] === side) {
            return true;
            //If second line equal
        } else if (_board[1][0] === side && _board[1][1] === side && _board[1][2] === side) {
            return true;
            //If third line equal
        } else if (_board[2][0] === side && _board[2][1] === side && _board[2][2] === side) {
            return true;
            //If equal from top to bottom
        } else if (_board[0][0] === side && _board[1][1] === side && _board[2][2] === side) {
            return true;
            //If equal from bottom to top
        } else if (_board[0][2] === side && _board[1][1] === side && _board[2][0] === side) {
            return true;
        }
    }

    const makeTurn = function listenToTurn(cell) {
        return function () {
            console.log(cell);
            const userSide = player1.getSide();
            const name = player1.getName();
            const lineNumber = parseInt(cell.parentElement.classList[1]) - 1;
            const cellNumber = parseInt(cell.classList[1]) - 1;
            const board = game.getBoard();
            board[lineNumber][cellNumber] = userSide;
            game.setBoard(board);
            const userSelectedCell = document.querySelector(`#cell-${lineNumber}${cellNumber}`);
            if (userSide === 'X') {
                userSelectedCell.style = 'background: url("../images/cross.png") no-repeat center';
            } else {
                userSelectedCell.style = 'background: url("../images/ellipse.png") no-repeat center';
            }
            if (game.checkWinner(userSide)) {
                endRound(name);
            } else {
                computerTurn(userSide);
            }
        }

    }
    return {getBoard, checkWinner, setBoard, clearBoardArray, makeTurn};


})()

function player() {
    let _name;
    let _side;

    function getSide() {
        return _side;
    }

    function setSide(side) {
        _side = side;
    }

    function getName() {
        return _name;
    }

    function setName(name) {
        _name = name;
    }

    return {getName, getSide, setName, setSide}
}

const player1 = player();


document.addEventListener('DOMContentLoaded', main);

function main() {
    listenToTypeOfGame()
}

function playRound() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.style = 'background : ;');
    cells.forEach(cell => cell.addEventListener('click', game.makeTurn(cell)), {once: true});
}

function listenToTypeOfGame() {
    const gameTypeButtons = document.querySelectorAll('.button-row_button');
    gameTypeButtons.forEach(btn => btn.addEventListener('click', () => {
        if (btn.textContent === 'Single Player') {
            singlePlayer();
        } else {
            multiPlayer();
        }
        const welcomeScreen = document.querySelector('.welcome-screen');
        welcomeScreen.style = 'display: none';
    }))

}

function singlePlayer() {
    const enterNameScreen = document.querySelector('.single-player-name_enter');
    enterNameScreen.style = 'display: block';
    const singlePlayerNextBtn = document.querySelector('.single-player_next-btn');
    singlePlayerNextBtn.addEventListener('click', () => {
        const playerName = document.querySelector('.name-input').value;
        enterNameScreen.style = 'display: none';
        const pickASideScreen = document.querySelector('.pick-a-side');
        pickASideScreen.style = 'display: block';
        const playBtn = document.querySelector('.pick-a-side_btn');
        playBtn.addEventListener('click', () => {
            let side;
            //If cross selected return true,if ellipse return false
            const selectedSide = document.querySelector('.buttons-row_button').checked;
            if (selectedSide) {
                side = 'X';
            } else {
                side = 'O';
            }
            pickASideScreen.style = 'display: none';
            const gameBoard = document.querySelector('.game-board');
            gameBoard.style = 'display: block';
            player1.setName(playerName);
            player1.setSide(side);
            playRound(side, playerName);
        })
    })
}

function multiPlayer() {

}

function computerTurn(userSide) {
    const board = game.getBoard();
    let lineNumber;
    let cellNumber;
    let condition = true;
    let computerSide;
    while (condition) {
        //Generate a random number for line and cell,and check,if cell not empty-repeat
        lineNumber = Math.floor((Math.random() * (3)));
        cellNumber = Math.floor((Math.random() * (3)));
        if (!board[lineNumber][cellNumber]) {
            //Update value in array
            if (userSide === 'X') {
                computerSide = '0'
                board[lineNumber][cellNumber] = computerSide;
            } else {
                computerSide = 'X';
                board[lineNumber][cellNumber] = computerSide;
            }
            condition = false;
            game.setBoard(board);
        }
    }

    const computerSelectedCell = document.querySelector(`#cell-${lineNumber}${cellNumber}`);
    if (userSide === 'X') {
        computerSelectedCell.style = 'background: url("../images/ellipse.png") no-repeat center';

    } else {
        computerSelectedCell.style = 'background: url("../images/cross.png") no-repeat center';
    }
    if (game.checkWinner(computerSide)) {
        endRound();
    }

}

function endRound(winner) {
    const cells = document.querySelectorAll('.cell');
    const nextRoundBtn = document.querySelector('.next-round-btn_container');
    const winnerText = document.querySelector('.game-board_whose-won-round');
    nextRoundBtn.style = 'display: block';
    winnerText.textContent = `${winner} win the round!`
    cells.forEach(cell => cell.removeEventListener('click', game.makeTurn));
    nextRoundBtn.addEventListener('click', () => {
        winnerText.textContent = '';
        playRound();
    });
    game.clearBoardArray();

}

