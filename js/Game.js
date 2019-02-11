/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor(){
        this.missed = 0;
        this.phrases = [new Phrase('Cowabunga'), new Phrase('Shell Shocked'), new Phrase('Turtle Power'), new Phrase('Heroes in a half shell'), new Phrase('Splinter')];
        this.activePhrase = null; //This is the Phrase object that’s currently in play. The initial value is null. Within the startGame() method, this property will be set to the Phrase object returned from a call to the getRandomPhrase() method.
    }

    /**
     * Hides the start screen overlay, calls the getRandomPhrase() method, and sets the activePhrase property with the chosen phrase.
     * It also adds that phrase to the board by calling the addPhraseToDisplay() method on the active Phrase object.
     */
    startGame(){
        document.querySelector("#overlay").style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    /**
     * this method randomly retrieves one of the phrases stored in the phrases array and returns it.
     */
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)]
    }

    /**
     * this method controls most of the game logic. It checks to see if the button clicked by the player matches a letter in the phrase, and then directs the game based on a correct or incorrect guess. This method should:
     * Disable the selected letter’s onscreen keyboard button.
     * If the phrase does not include the guessed letter, add the wrong CSS class to the selected letter's keyboard button and call the removeLife() method.
     * If the phrase includes the guessed letter, add the chosen CSS class to the selected letter's keyboard button, call the showMatchedLetter() method on the phrase, and then call the checkForWin() method. If the player has won the game, also call the gameOver() method.
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
     * this method removes a life from the scoreboard, by replacing one of the liveHeart.png images with a lostHeart.png image (found in the images folder) and increments the missed property.
     * If the player has five missed guesses (i.e they're out of lives), then end the game by calling the gameOver() method.
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
     * this method checks to see if the player has revealed all of the letters in the active phrase.
     */
    checkForWin(){
        const guessedLetters = this.activePhrase.shownLetters;
        console.log('guessletters ' + guessedLetters);
        const lettersLeft = this.activePhrase.phrase.replace(/\s/g, '').split('')
            .filter(letter => guessedLetters.indexOf(letter) === -1 );

        console.log(lettersLeft);
        console.log('letters left ' + lettersLeft.length);
        console.log(lettersLeft.length < 1);
        return lettersLeft.length < 1;
    }

    /**
     * this method displays the original start screen overlay, and depending on the outcome of the game, updates the overlay h1 element with a friendly win or loss message,
     * and replaces the overlay’s start CSS class with either the win or lose CSS class.
     */

    gameOver(win){

        const overlay = document.querySelector("#overlay");
        const title = document.querySelector(".title");
        overlay.className = ( win ) ? 'win' : 'lose';
        title.textContent = ( win ) ? "You've won! Congratulations" : "You've run out of lives! Try again.";
        overlay.style.display = 'flex';

    }

}