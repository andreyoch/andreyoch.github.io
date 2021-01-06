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
    function receiveTurn(line, cell, side,playerNameWhoMakeTurn) {
        line--;
        cell--;
        let turn;
        side === 'X' ? turn = 'X' : turn = 'O';
        _board[line][cell] = turn;
        game.showBoard();
        console.log(`${playerNameWhoMakeTurn} make turn`)
    }

    return {showBoard, receiveTurn,showBoardArray};


})()

function player(name, side) {
    function getName() {
        return name;
    }

    function getSide() {
        return side;
    }

    function makeTurn(line, cell) {
        game.receiveTurn(line, cell, side,name)
    }

    return {getName, getSide, makeTurn}
}

const player1 = player('Andrew', 'X');
const player2 = player('Computer', 'O')
game.showBoard()
player1.makeTurn(1, 3);
player2.makeTurn(2, 2)
player1.makeTurn(2, 3)
player2.makeTurn(3, 3)
player1.makeTurn(3,1)
player2.makeTurn(1,1)
game.showBoardArray()
