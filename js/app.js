/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let newGame;

const resetButton = document.querySelector('#btn__reset');

//Start new game when button is pressed
resetButton.addEventListener('click', () => {
        newGame = new Game();
        newGame.startGame();
});

//Enables keyboard use for game by listening to keypresses on letters
document.addEventListener('keydown', (event) => {
    const keys = document.querySelectorAll('.key');
    const keyPressed = event.key.toLowerCase();
    const regex = /[a-z]/;

    if(regex.test(keyPressed)){
        for(let i = 0; i < keys.length; i++){
            if(keys[i].textContent === keyPressed){
                newGame.handleInteraction(keys[i]);
            }
        }
    }
});

//Listens for clicks on the on-screen keyboard
document.querySelector('#qwerty')
    .addEventListener('click', (e) => {
        if(e.target.className === 'key'){
            newGame.handleInteraction(e.target);
        }
    });

