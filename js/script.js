const board = (() => {
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
    return {getBoard,setBoard,clearBoardArray}
})()

const game = (() => {
    let _round = 0;
    let _turnNumber = 0;

    function getRoundNumber() {
        return _round;
    }

    function setRoundNumber(numberOfRounds) {
        _round = numberOfRounds;
    }

    function updateRoundNumber() {
        _round++;
    }

    function getTurnNumber() {
        return _turnNumber;
    }

    function setTurnNumber(turnNumber) {
        _turnNumber = turnNumber;
    }

    function updateTurnNumber() {
        _turnNumber++;
    }

    function checkWinner(side) {
        const boardArray = board.getBoard();
        //If first line equal
        if (boardArray[0][0] === side && boardArray[0][1] === side && boardArray[0][2] === side) {
            return true;
            //If first column equal
        } else if (boardArray[0][0] === side && boardArray[1][0] === side && boardArray[2][0] === side) {
            return true;
            //If second column equal
        } else if (boardArray[0][1] === side && boardArray[1][1] === side && boardArray[2][1] === side) {
            return true;
            //If third column equal
        } else if (boardArray[0][2] === side && boardArray[1][2] === side && boardArray[2][2] === side) {
            return true;
            //If second line equal
        } else if (boardArray[1][0] === side && boardArray[1][1] === side && boardArray[1][2] === side) {
            return true;
            //If third line equal
        } else if (boardArray[2][0] === side && boardArray[2][1] === side && boardArray[2][2] === side) {
            return true;
            //If equal from top to bottom
        } else if (boardArray[0][0] === side && boardArray[1][1] === side && boardArray[2][2] === side) {
            return true;
            //If equal from bottom to top
        } else if (boardArray[0][2] === side && boardArray[1][1] === side && boardArray[2][0] === side) {
            return true;
        }
    }

    function makeTurn(e) {
        game.updateTurnNumber();
        const cell = e.target; // return a cell on which user click (html element)
        const userSide = player1.getSide();
        const name = player1.getName();
        const lineNumber = parseInt(cell.parentElement.classList[1]) - 1;
        const cellNumber = parseInt(cell.classList[1]) - 1;
        const boardArray = board.getBoard();
        boardArray[lineNumber][cellNumber] = userSide;
        board.setBoard(boardArray);
        const userSelectedCell = document.querySelector(`#cell-${lineNumber}${cellNumber}`);
        cell.removeEventListener('click', game.makeTurn);
        if (userSide === 'X') {
            userSelectedCell.style = 'background: url("../images/cross.png") no-repeat center';
        } else {
            userSelectedCell.style = 'background: url("../images/ellipse.png") no-repeat center';
        }
        if (game.checkWinner(userSide)) {
            player1.updateScore();
            endRound(name,'single-player');
        } else if (game.getTurnNumber() === 9) {
            draw('single-player');
        } else {
            computerTurn(userSide);
        }
    }
    function makeTurnM(e) {
        game.updateTurnNumber();
        const cell = e.target; //
        let userSide;
        let name;
        let whoTurn;
        if (whoseTurn() === 'playerOne') {
            whoTurn = player1;
            userSide = player1.getSide();
            name = player1.getName();
        } else {
            whoTurn = player2;
            userSide = player2.getSide();
            name = player2.getName()
        }
        cell.removeEventListener('click', makeTurnM);
        const lineNumber = parseInt(cell.parentElement.classList[1]) - 1;
        const cellNumber = parseInt(cell.classList[1]) - 1;
        const boardArray = board.getBoard();
        boardArray[lineNumber][cellNumber] = userSide;
        board.setBoard(boardArray);
        const userSelectedCell = document.querySelector(`#cell-${lineNumber}${cellNumber}`);
        cell.removeEventListener('click', game.makeTurn);
        if (userSide === 'X') {
            userSelectedCell.style = 'background: url("../images/cross.png") no-repeat center';
        } else {
            userSelectedCell.style = 'background: url("../images/ellipse.png") no-repeat center';
        }
        if (game.checkWinner(userSide)) {
            if (whoTurn === player1) {
                player1.updateScore();
                endRound(name,'multiplayer');
            } else {
                player2.updateScore();
                endRound(name,'multiplayer');
            }
        } else if (game.getTurnNumber() === 9) {
            game.draw('multiplayer');
        }
    }
    function playRound(typeOfGame) {
        updateGameResult();
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.style = 'background : ;');
        if(typeOfGame === 'multiplayer') {
            const whoseTurn = document.querySelector('.game-board_whose-turn');
            whoseTurn.textContent = `${player1.getName()} turn`;
            cells.forEach(cell => cell.addEventListener('click', makeTurnM))
        } else {
            cells.forEach(cell => cell.addEventListener('click', game.makeTurn));
        }

    }
    function whoseTurn() {
        const whoseTurnTitle = document.querySelector('.game-board_whose-turn');
        const whoseTurn = whoseTurnTitle.textContent;
        if (whoseTurn.includes(`${player1.getName()}`)) {
            whoseTurnTitle.textContent = `${player2.getName()} turn`
            return 'playerOne';
        } else {
            whoseTurnTitle.textContent = `${player1.getName()} turn`
            return 'playerTwo';
        }
    }

    function listenToTypeOfGame() {
        const gameTypeButtons = document.querySelectorAll('.button-row_button');
        gameTypeButtons.forEach(btn => btn.addEventListener('click', () => {
            if (btn.textContent === 'Single Player') {
                player2.setName('Computer');
                singlePlayer();
            } else {
                multiPlayer();
            }
            const welcomeScreen = document.querySelector('.welcome-screen');
            welcomeScreen.style = 'display: none';
        }, {once: true}))
    }
    function draw(typeOfGame) {
        const cells = document.querySelectorAll('.cell');
        const nextRoundBtn = document.querySelector('.next-round-btn_container');
        const winnerText = document.querySelector('.game-board_whose-won-round');
        winnerText.textContent = 'Draw!';
        nextRoundBtn.style = 'display: block';
        board.clearBoardArray();
        game.updateRoundNumber();
        game.setTurnNumber(0);
        if (typeOfGame === 'multiplayer') {
            cells.forEach(cell => cell.removeEventListener('click', makeTurnM));
        } else {
            cells.forEach(cell => cell.removeEventListener('click', game.makeTurn));
        }
        nextRoundBtn.addEventListener('click', () => {
            winnerText.textContent = '';
            nextRoundBtn.style = 'display: none';
            if (typeOfGame === 'multiplayer') {
                playRound('multiplayer');
            } else {
                playRound('single-player');
            }
        }, {once: true});
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
                game.playRound('single-player');
                updateGameResult()
            }, {once: true})
        })
    }
    function multiPlayer() {
        const enterNameScreen = document.querySelector('.single-player-name_enter');
        enterNameScreen.style = 'display: block';
        const nameEnterHeader = document.querySelector('.single-player_header');
        nameEnterHeader.textContent = 'Enter name for Player 1';
        const nameSubmitBtn = document.querySelector('.single-player_next-btn');
        const nameInput = document.querySelector('.name-input');
        nameInput.value = 'Player 1';
        //Wait for player1 name enter btn click,after that change nameInput placeholder and wait for player2 name enter btn click
        nameSubmitBtn.addEventListener('click', () => {
            const player1Name = nameInput.value;
            player1.setName(player1Name);
            nameEnterHeader.textContent = 'Enter name for Player 2';
            nameInput.value = 'Player 2';
            nameSubmitBtn.addEventListener('click', () => {
                const player2Name = nameInput.value;
                player2.setName(player2Name);
                enterNameScreen.style = 'display: none';
                showPickASideScreenM();
            }, {once: true})
        }, {once: true});
    }
    function computerTurn(userSide) {
        game.updateTurnNumber();
        const boardArray = board.getBoard();
        let lineNumber;
        let cellNumber;
        let condition = true;
        let computerSide;
        while (condition) {
            //Generate a random number for line and cell,and check,if cell not empty-repeat
            lineNumber = Math.floor((Math.random() * (3)));
            cellNumber = Math.floor((Math.random() * (3)));
            if (!boardArray[lineNumber][cellNumber]) {
                //Update value in array
                if (userSide === 'X') {
                    computerSide = '0'
                    boardArray[lineNumber][cellNumber] = computerSide;
                } else {
                    computerSide = 'X';
                    boardArray[lineNumber][cellNumber] = computerSide;
                }
                condition = false;
                board.setBoard(boardArray);
            }
        }

        const computerSelectedCell = document.querySelector(`#cell-${lineNumber}${cellNumber}`);
        computerSelectedCell.removeEventListener('click', game.makeTurn);
        if (userSide === 'X') {
            computerSelectedCell.style = 'background: url("../images/ellipse.png") no-repeat center';

        } else {
            computerSelectedCell.style = 'background: url("../images/cross.png") no-repeat center';
        }
        if (game.checkWinner(computerSide)) {
            player2.updateScore();
            endRound(player2.getName(),'single-player');
        }

    }
    function showPickASideScreenM() {
        const pickASideScreen = document.querySelector('.pick-a-side');
        pickASideScreen.style = 'display: block';
        const pickASideHeader = document.querySelector('.single-player_pick-a-side-header');
        pickASideHeader.textContent = `${player1.getName()} pick a side`;
        const playBtn = document.querySelector('.pick-a-side_btn');
        playBtn.addEventListener('click', () => {
            //If cross selected return true,if ellipse return false
            const selectedSide = document.querySelector('.buttons-row_button').checked;
            if (selectedSide) {
                player1.setSide('X');
                player2.setSide('O');
            } else {
                player1.setSide('O');
                player2.setSide('X');
            }
            pickASideScreen.style = 'display: none';
            const gameBoard = document.querySelector('.game-board');
            gameBoard.style = 'display: block';
            game.playRound('multiplayer');
        }, {once: true});

    }
    function endGame() {
        let winner;
        if (player1.getScore() > player2.getScore()) {
            winner = player1.getName();
        } else {
            winner = player2.getName();
        }
        player1.setScore(0);
        player2.setScore(0);
        game.setRoundNumber(0);
        const gameBoardScreen = document.querySelector('.game-board');
        const gameWinScreen = document.querySelector('.game-win');
        const winnerTitle = document.querySelector('.game-win_header');
        const newGameBtn = document.querySelector('.game-win_new-game-btn');
        const welcomeScreen = document.querySelector('.welcome-screen');
        gameBoardScreen.style = 'display: none';
        gameWinScreen.style = 'display: block';
        winnerTitle.textContent = `${winner} win game!`;
        newGameBtn.addEventListener('click', () => {
            document.location.reload()
            gameWinScreen.style = 'display: none';
            welcomeScreen.style = 'display" block';
            game.listenToTypeOfGame()
        }, {once: true});
    }
    function updateGameResult() {
        const gameResult = document.querySelector('.game-board_header');
        const player1Score = player1.getScore();
        const player1Name = player1.getName();
        const player2Score = player2.getScore();
        const player2Name = player2.getName();
        gameResult.textContent = `${player1Name} ${player1Score} - ${player2Name} ${player2Score}`;
    }
    function endRound(winner,typeOfGame) {
        const cells = document.querySelectorAll('.cell');
        const nextRoundBtn = document.querySelector('.next-round-btn_container');
        const winnerText = document.querySelector('.game-board_whose-won-round');
        nextRoundBtn.style = 'display: block';
        winnerText.textContent = `${winner} win the round!`
        board.clearBoardArray();
        updateGameResult();
        game.updateRoundNumber();
        game.setTurnNumber(0);
        nextRoundBtn.addEventListener('click', () => {
            nextRoundBtn.style = 'display: none';
            winnerText.textContent = '';
            if (game.getRoundNumber() < 5) {
                if(typeOfGame === 'multiplayer') {
                    game.playRound('multiplayer');
                } else {
                    game.playRound('single-player')
                }
            } else {
                endGame();
            }
        }, {once: true});
        if(typeOfGame === 'multiplayer') {
            cells.forEach(cell => cell.removeEventListener('click', game.makeTurnM));
        } else {
            cells.forEach(cell => cell.removeEventListener('click', game.makeTurn));
        }
    }
    return {
        checkWinner,
        makeTurn,
        getRoundNumber,
        updateRoundNumber,
        setRoundNumber,
        getTurnNumber,
        updateTurnNumber,
        setTurnNumber,
        playRound,
        listenToTypeOfGame,
        draw,
        makeTurnM
    };
})()
function player() {
    let _name;
    let _side;
    let _score = 0;

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

    function getScore() {
        return _score;
    }

    function updateScore() {
        _score++;
    }

    function setScore(score) {
        _score = score;
    }

    return {getName, getSide, setName, setSide, getScore, updateScore, setScore}
}

const player1 = player();
const player2 = player();

document.addEventListener('DOMContentLoaded', main);

function main() {
    game.listenToTypeOfGame()
}





