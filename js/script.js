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
            //If first column equal
        } else if (_board[0][0] === side && _board[1][0] === side && _board[2][0] === side) {
            game.showWinner(side);
            //If second column equal
        } else if (_board[0][1] === side && _board[1][1] === side && _board[2][1] === side) {
            game.showWinner(side);
            //If third column equal
        } else if (_board[0][2] === side && _board[1][2] === side && _board[2][2] === side) {
            game.showWinner(side)
            //If second line equal
        } else if (_board[1][0] === side && _board[1][1] === side && _board[1][2] === side) {
            game.showWinner(side);
            //If third line equal
        } else if (_board[2][0] === side && _board[2][1] === side && _board[2][2] === side) {
            game.showWinner(side);
            //If equal from top to bottom
        } else if (_board[0][0] === side && _board[1][1] === side && _board[2][2] === side) {
            game.showWinner(side);
            //If equal from bottom to top
        } else if (_board[0][2] === side && _board[1][1] === side && _board[2][0] === side) {
            game.showWinner(side)
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

function playRound(side,name) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('click',(e) => {
        const lineNumber = parseInt(cell.parentElement.classList[1]) - 1;
        const cellNumber = parseInt(cell.classList[1]) - 1;
        const board = game.getBoard();
        board[lineNumber][cellNumber] = side;
        game.setBoard(board);
        const cellHtml = document.querySelector(`#cell-${lineNumber}${cellNumber}`);
        if(side === 'X') {
            cellHtml.style = 'background: url("../images/cross.png") no-repeat center';
        } else {
            cellHtml.style = 'background: url("../images/ellipse.png") no-repeat center';
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

