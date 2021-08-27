// gameboard Object
function Gameboard() {
    this.board = new Array(0,0,0,0,0,0,0,0,0),
    this.clearGameBoard = function() {
        this.board = [0,0,0,0,0,0,0,0,0]
        // clear the GUII
        const GUI = document.querySelectorAll('.ghost')

        // loop to go through and remove them
        for (let i = 0; i < GUI.length; i++){

            GUI[i].remove()
        }
    }
}

// player Factory Function
const player = (name, avatar) => {
    return { name, avatar };
};

// gameplay Object
function Play(){
    this.turn = 1,
    this.gameActive = 1,
    this.gameOver = function () {
        // getting DOM Element
        const gameOverEl = document.querySelector('.gameOver');

        // editing CSS to make the game over screen visible
        gameOverEl.style.display = 'flex';
    },
    this.turns = function() {
        let places = round.board;
        let openSpaces = [];

        places.forEach(function(place){
            if(place == 0){
                openSpaces.push(place);
            } 
    });

        if (openSpaces.length < 1){ 
            const GOh2 = document.getElementById('game-over-h2');
            console.log('it is a tie!');
            GOh2.innerText = "Game Over, it's a tie";
            gamePlay.gameOver();
        } 

        return openSpaces.length;
    },
    this.updatePlayerAvatar = function() {
        // get the element with the .active class
        const activeClassEl = document.querySelector('.active')
        // get element that we need to set the active class on
        const inactiveClassEl = document.querySelector('.inactive')

        // remove the .active class from the chosen element and add .inactive
        activeClassEl.classList.remove('active')
        activeClassEl.classList.add('inactive')

        /// remove the .inactive class from the chosen element and add .active
        inactiveClassEl.classList.add('active')
        inactiveClassEl.classList.remove('inactive')
    },
    this.updateGameBoardGUI = function(pick, player) {
        const guiLocation = document.getElementById(pick)

            // creating new image element and adding it to the GUI
            const newImg = document.createElement('img')
            newImg.src = `./images/ghost_${player}.svg`
            newImg.classList.add('ghost')

            guiLocation.appendChild(newImg)
    },
    this.computerPlay = function() {
        // check for gameActie state
        if(gamePlay.gameActive == 1 ){
        
            // make sure it is the players turn
            if(gamePlay.turn == 2){
                // random math function for the computer's pick
                let compPick = Math.floor(Math.random() * 10);

            
                // making sure the compPick is not already taken
                if(round.board[compPick] == 0){

                    // log the pick
                    round.board[compPick] = 2;

                    // update the gameboard GUI
                    gamePlay.updateGameBoardGUI(compPick, playerTwo.avatar);

                    // check for winner
                    gamePlay.checkWinner();

                    // make it the players turn
                    gamePlay.turn = 1;

                } else {
                    gamePlay.computerPlay();
                }
            }
        }
    },
    this.checkWinner = function() {
        // variable to control in return
        let i;
        // check rows:
        if(round.board[0] == round.board[1] && round.board[1] == round.board[2]){
            i = gamePlay.whoWins(round.board[0])
        } else if (round.board[3] == round.board[4] && round.board[4] == round.board[5]){
            i = gamePlay.whoWins(round.board[3])
        } else if (round.board[6] == round.board[7] && round.board[7] == round.board[8]){
            i = gamePlay.whoWins(round.board[6])
        }

        // check columns
        if(round.board[0] == round.board[3] && round.board[3] == round.board[6]){
            i = gamePlay.whoWins(round.board[0])
        } else if(round.board[1] == round.board[4] && round.board[4] == round.board[7]){
            i = gamePlay.whoWins(round.board[1])
        } else if(round.board[2] == round.board[5] && round.board[5] == round.board[8]){
            i = gamePlay.whoWins(round.board[2])
        }

        // check diagnoals
        if(round.board[0] == round.board[4] && round.board[4] == round.board[8]){
            i = gamePlay.whoWins(round.board[0])
        } else if(round.board[2] == round.board[4] && round.board[4] == round.board[6]){
            i = gamePlay.whoWins(round.board[2])
        }
    },

    this.whoWins= function(winner){
        const GOh2 = document.getElementById('game-over-h2');
        if (winner == 1){
            // modify gamePlay.turn to prevent additional game play
            gamePlay.gameActive = 0;
            GOh2.innerText = 'Game Over, you Win!';
            gamePlay.gameOver();
            // return 1;
        } else if (winner == 2) {
            // modify gamePlay.turn to prevent additional game play
            gamePlay.gameActive = 0;
            GOh2.innerText = 'Game Over, you Lose!';
            gamePlay.gameOver();
        } 
    }
}

// user picking spot to play
document.querySelector('.game-board').addEventListener('click', (e) => {
    // check for gameActie state
    if(gamePlay.gameActive == 1 ){

        // make sure it is the players turn
        if(gamePlay.turn == 1){

            
            // check to see if selected spot is already taken
            if(round.board[e.target.id] ==  0 ){    

                // log the pick
                round.board[e.target.id] = 1;

                // update the gameboard GUI
                gamePlay.updateGameBoardGUI(e.target.id, playerOne.avatar);

                // check for winner
                gamePlay.checkWinner();

                // make it the computer's turn
                gamePlay.turn = 2;

                // check if all of the spots have been taken
                if(gamePlay.turns() > 0){
                    // trigger for computer to pick
                    gamePlay.computerPlay();
                }
            }
        }    
    }    
}); 

// updating avator on user-selected change
document.getElementById('ghost-red').addEventListener('click', (e) => {
    if(playerOne.avatar != 'red'){
        playerOne.avatar = 'red';
        playerTwo.avatar = 'blue';
        
        //update the .active and inactive classes
        gamePlay.updatePlayerAvatar();

        round.clearGameBoard();
    }
});

// updating avator on user-selected change
document.getElementById('ghost-blue').addEventListener('click', (e) => {
    if(playerOne.avatar != 'blue'){
        playerOne.avatar = 'blue';
        playerTwo.avatar = 'red';

        //update the .active and .inactive classes
        gamePlay.updatePlayerAvatar();
        
        round.clearGameBoard();
    }
});

document.getElementById('play-again').addEventListener('click', () =>{
    // remove class for gameOver
    // getting DOM Element
    const gameOverEl = document.querySelector('.gameOver');

    // editing CSS to make the game over screen visible
    gameOverEl.style.display = 'none';
    
    
    // gameActive = 1 to allow gameplay
    gamePlay.gameActive = 1;
    
    // clear board
    round.clearGameBoard();
    location.reload();
    
});

// by default, the player will be blue and the computer will be red
const playerOne = player('Player1', 'blue');
const playerTwo = player('Computer', 'red');

// creating a new Play Object
const gamePlay = new Play();

// creating a new Gameboard Object
const round = new Gameboard();