/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */


class Game {
    constructor(){
        this.missed = 0;
        this.phrases = [new Phrase('Cowabunga'), new Phrase('Shell Shocked'), new Phrase('Turtle Power'), new Phrase('Heroes in a half shell'), new Phrase('Splinter')];
        this.activePhrase = null;
    }

    /**
     * Hides overlay and calls necessary methods to begin the game
     */
    startGame(){
        document.querySelector("#overlay").style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    /**
     * Retrieves a random phrase from the phrases property
     * @returns {Object} - A Phrase object
     */
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)]
    }

    /**
     * Updates the button clicked and the letter boxes depending on if guess was right and checks for win
     * @param {Object} button - The letter button that was clicked
     */
    handleInteraction(button){
        const letter = button.textContent;
        button.setAttribute('disabled', true);
        if(this.activePhrase.checkLetter(letter)){
            //Correct
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(letter);
            if(this.checkForWin()){
                this.gameOver(true);
            }
        } else {
            //Incorrect
            button.classList.add('wrong');
            this.removeLife();
        }
    }

    /**
     * Changes the heart image to an empty heart image to illustrate a "lost life"
     */

    removeLife() {
        const heartsRemaining = document.querySelectorAll('[src="images/liveHeart.png"]');
        heartsRemaining[heartsRemaining.length - 1].setAttribute('src', 'images/lostHeart.png');
        this.missed += 1;
        if(this.missed === 5){
            this.gameOver(false);
        }
    }

    /**
     * Checks to see if the user has won by comparing the letters shown to letters left
     * @returns {boolean}
     */
    checkForWin(){
        const guessedLetters = this.activePhrase.shownLetters;
        const lettersLeft = this.activePhrase.phrase.replace(/\s/g, '').split('')
            .filter(letter => guessedLetters.indexOf(letter) === -1 );
        return lettersLeft.length < 1;
    }

    /**
     * Ends the game by showing the overlay and reseting all elements to their original state
     * @param {Boolean} win - A boolean to indicate whether the user won (true) or lost (false)
     */

    gameOver(win){

        const overlay = document.querySelector("#overlay");
        const title = document.querySelector(".title");
        overlay.className = ( win ) ? 'win' : 'lose';
        title.textContent = ( win ) ? "You've won! Congratulations" : "You've run out of lives! Try again.";
        overlay.style.display = 'flex';

        //Reset Game

        //remove letter boxes
        const phrase = document.querySelector('#phrase ul');
        for(let i = phrase.childNodes.length-1; i >= 0; i--){
            phrase.removeChild(phrase.childNodes[i]);
        }
        //reset classes on keys
        const keys = document.querySelectorAll('.key');
        keys.forEach((key) => {
            key.setAttribute('disabled', false);
            key.classList.remove('chosen', 'wrong');
        });

        //reset lives
        const hearts = document.querySelectorAll('.tries img');
        hearts.forEach(( heart ) => {
            heart.setAttribute('src', 'images/liveHeart.png');
        });

    }

}