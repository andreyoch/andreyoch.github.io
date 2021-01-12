const game = (() => {
    let _board = [['', '', ''], ['', '', ''], ['', '', '']];

    function getBoard() {
        return _board;
    }

    function setBoard(boardArray) {
        _board = boardArray;
    }


    function checkWinner(side) {
        //If first line equal
        if (_board[0][0] === side && _board[0][1] === side && _board[0][2] === side) {
            game.showWinner(side);
            return true;
            //If first column equal
        } else if (_board[0][0] === side && _board[1][0] === side && _board[2][0] === side) {
            game.showWinner(side);
            return true;
            //If second column equal
        } else if (_board[0][1] === side && _board[1][1] === side && _board[2][1] === side) {
            game.showWinner(side);
            return true;
            //If third column equal
        } else if (_board[0][2] === side && _board[1][2] === side && _board[2][2] === side) {
            game.showWinner(side)
            return true;
            //If second line equal
        } else if (_board[1][0] === side && _board[1][1] === side && _board[1][2] === side) {
            game.showWinner(side);
            return true;
            //If third line equal
        } else if (_board[2][0] === side && _board[2][1] === side && _board[2][2] === side) {
            game.showWinner(side);
            return true;
            //If equal from top to bottom
        } else if (_board[0][0] === side && _board[1][1] === side && _board[2][2] === side) {
            game.showWinner(side);
            return true;
            //If equal from bottom to top
        } else if (_board[0][2] === side && _board[1][1] === side && _board[2][0] === side) {
            game.showWinner(side);
            return true;
        }
    }

    function showWinner(side) {
        if (side === 'X') {
            console.log(`${player1.getName()} win!`)
        } else {
            console.log(`${player2.getName()} win!`);
        }
    }

    function receiveTurn(line, cell, side, playerNameWhoMadeTurn) {
        line--;
        cell--;
        let turn;
        side === 'X' ? turn = 'X' : turn = 'O';
        _board[line][cell] = turn;
        game.checkWinner(side);
        console.log(`${playerNameWhoMadeTurn} made turn`)
    }


    return {getBoard, receiveTurn, checkWinner, showWinner,setBoard};


})()

function player(name, side) {
    function getName() {
        return name;
    }

    function getSide() {
        return side;
    }

    function makeTurn(line, cell) {
        game.receiveTurn(line, cell, side, name)
    }

    return {getName, makeTurn}
}

const player1 = player('Andrew', 'X');
const player2 = player('Computer', 'O')


document.addEventListener('DOMContentLoaded',main);

function main (){
    listenToTypeOfGame()
}

function playRound(userSide,name) {

    let playerScore = 0;
    let computerScore = 0;
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.style = 'background : ;');
    cells.forEach(cell => cell.addEventListener('click',(e) => {
        const lineNumber = parseInt(cell.parentElement.classList[1]) - 1;
        const cellNumber = parseInt(cell.classList[1]) - 1;
        const board = game.getBoard();
        board[lineNumber][cellNumber] = userSide;
        game.setBoard(board);
        const userSelectedCell = document.querySelector(`#cell-${lineNumber}${cellNumber}`);
        if(userSide === 'X') {
            userSelectedCell.style = 'background: url("../images/cross.png") no-repeat center';
        } else {
            userSelectedCell.style = 'background: url("../images/ellipse.png") no-repeat center';
        }
        if(game.checkWinner(userSide)) {
        endRound(name);
        } else {
            computerTurn(userSide);
        }
    }));
}

function listenToTypeOfGame () {
    const gameTypeBtns  = document.querySelectorAll('.button-row_button');
    gameTypeBtns.forEach(btn => btn.addEventListener('click',(e) => {
        if(btn.textContent === 'Single Player') {
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
    singlePlayerNextBtn.addEventListener('click',(e) => {
        const playerName = document.querySelector('.name-input').value;
        enterNameScreen.style = 'display: none';
        const pickASideScreen = document.querySelector('.pick-a-side');
        pickASideScreen.style = 'display: block';
        const playBtn = document.querySelector('.pick-a-side_btn');
        playBtn.addEventListener('click',e => {
            let side;
            //If cross selected return true,if ellipse return false
            const selectedSide = document.querySelector('.buttons-row_button').checked;
            if(selectedSide) {
                side = 'X';
            } else {
                side = 'O';
            }
            pickASideScreen.style = 'display: none';
            const gameBoard = document.querySelector('.game-board');
            gameBoard.style = 'display: block';
            playRound(side,playerName);
        })
    })
}

function multiPlayer() {

}

function computerTurn (userSide) {
    const board = game.getBoard();
    let lineNumber;
    let cellNumber;
    let condition = true;
    let computerSide;
    while(condition) {
        //Generate a random number for line and cell,and check,if cell not empty-repeat
         lineNumber = Math.floor((Math.random() * (3)));
         cellNumber = Math.floor((Math.random() * (3)));
         if(!board[lineNumber][cellNumber]){
             //Update value in array
             if(userSide === 'X') {
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
    if(userSide === 'X') {
        computerSelectedCell.style = 'background: url("../images/ellipse.png") no-repeat center';

    } else {
        computerSelectedCell.style = 'background: url("../images/cross.png") no-repeat center';
    }
    if(game.checkWinner(computerSide)){
        endRound();
    }

}

function endRound(winner) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.removeEventListener('click'));
    const nextRoundBtn = document.querySelector('.next-round-btn_container');
    const winnerText = document.querySelector('.game-board_whose-won-round');
    nextRoundBtn.style = 'display: block';
    winnerText.textContent = `${winner} win the round!`

    nextRoundBtn.addEventListener('click',(e) => {
        winnerText.textContent = '';
        playRound();
    });
}

