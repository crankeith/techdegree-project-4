/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let newGame;

document.querySelector('#btn__reset')
    .addEventListener('click', () => {
        newGame = new Game();
        newGame.startGame();
    });

document.querySelector('#qwerty')
    .addEventListener('click', (e) => {
        if(e.target.className === 'key'){
            newGame.handleInteraction(e.target);
        }
    });