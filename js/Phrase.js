/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase){
        this.phrase = phrase.toLowerCase();
        this.shownLetters = [];
    }

    /**
     * Iterates through each letter of the phrase to add letter boxes to the DOM
     */

    addPhraseToDisplay(){
        const phraseSection = document.querySelector('#phrase ul');
        const letters = this.phrase.split('');

        letters.forEach(letter => {
            const letterBox = document.createElement('li');
            if(letter === ' '){
                letterBox.classList.add('space');
            } else {
                letterBox.classList.add('hide','letter',letter);
                letterBox.textContent = letter;
            }
            phraseSection.appendChild(letterBox);
        })
    }

    /**
     * Checks to see if the letter selected by the player matches a letter in the phrase
     * @param {String} letter - The letter the user selected
     * @returns {boolean} - Returns true/false if the letter exists in the phrase
     */

    checkLetter(letter){
        return this.phrase.indexOf(letter) > -1
    }

    /**
     * Reveals the letter(s) on the board that matches the player's selection.
     * @param {String} letter - The letter to display on the board
     */

    showMatchedLetter(letter){
        const letterBoxes = document.getElementsByClassName(letter);

        for(let i = 0; i < letterBoxes.length; i++){
            letterBoxes[i].classList.replace('hide', 'show');
        }

        this.shownLetters.push(letter);
    }
}