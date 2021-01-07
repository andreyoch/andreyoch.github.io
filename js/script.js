const game = (() => {
    let _board = [['', '', ''], ['', '', ''], ['', '', '']];

    function showBoard() {
        console.log(`
        ${_board[0]}
        ${_board[1]}
        ${_board[2]}`)
    }

    function showBoardArray() {
        console.log(_board);
    }

    function checkWinner() {
        //If first line equal
        if ((_board[0][0] === _board[0][1]) && _board[0][2] === _board[0][0]) {
            game.showWinner(_board[0][0]);
            //If first column equal
        } else if ((_board[0][0] === _board[1][0]) && _board[2][0] === _board[0][0]) {
            game.showWinner(_board[0][0]);
            //If second column equal
        } else if ((_board[0][1] === _board[1][1]) && _board[2][1] === _board[0][1]) {
            game.showWinner(_board[0][1]);
            //If third column equal
        } else if ((_board[0][2] === _board[1][2]) && _board[2][2] === _board[0][2]) {
            game.showWinner(_board[0][2])
            //If second line equal
        } else if ((_board[1][0] === _board[1][1]) && _board[1][2] === _board[1][0]) {
            game.showWinner(_board[1][0]);
            //If third line equal
        } else if ((_board[2][0] === _board[2][1]) && _board[2][2] === _board[2][0]) {
            game.showWinner(_board[2][0]);
            //If equal from top to bottom
        } else if ((_board[0][0] === _board[1][1]) && _board[2][2] === _board[0][0]) {
            game.showWinner(_board[0][0]);
            //If equal from bottom to top
        } else if ((_board[0][2] === _board[1][1]) && _board[2][1] === _board[0][2]) {
            game.showWinner(_board[0][2])
        }
    }

    function showWinner(side) {
        if (side === 'X') {
            console.log(`${player1.getName()} win!`)
        } else {
            console.log(`${player2.getName()} win!`);
        }
    }

    function receiveTurn(line, cell, side, playerNameWhoMakeTurn) {
        line--;
        cell--;
        let turn;
        side === 'X' ? turn = 'X' : turn = 'O';
        _board[line][cell] = turn;
        game.showBoard();
        game.checkWinner();
        console.log(`${playerNameWhoMakeTurn} make turn`)
    }

    return {showBoard, receiveTurn, showBoardArray, checkWinner, showWinner};


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

    return {getName, getSide, makeTurn}
}

const player1 = player('Andrew', 'X');
const player2 = player('Computer', 'O')
game.showBoard()
player2.makeTurn(1, 1)
player2.makeTurn(1, 2)
player2.makeTurn(1, 3)
