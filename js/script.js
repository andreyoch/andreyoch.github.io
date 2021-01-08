const game = (() => {
    let _board = [['', '', ''], ['', '', ''], ['', '', '']];

    function getBoard() {
        return _board;
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
        } else if (_board[0][2] === side && _board[1][1] === side && _board[2][1] === side) {
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


    return {getBoard, receiveTurn, checkWinner, showWinner,};


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
    // showCell();
    showBoard()
}

// function showCell() {
//     const cells = document.querySelectorAll('.cell');
//     cells.forEach(cell => cell.addEventListener('click',(e) => {
//         const lineNumber = cell.parentElement.classList[1];
//         const cellNumber = cell.classList[1]
//         console.log(lineNumber);
//         console.log(cellNumber);
//         cell.textContent = 'O';
//     }));
//
// }
function showBoard() {
    const board = game.getBoard();
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        let lineNumber = parseInt(cell.parentElement.classList[1]);
        const cellNumber = parseInt(cell.classList[1]);
        cell.textContent = board[lineNumber - 1][cellNumber - 1];
    })
}



