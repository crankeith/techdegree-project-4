/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase){
        this.phrase = phrase.toLowerCase();
        this.shownLetters = [];
    }

    /**
     *  this adds letter placeholders to the display when the game starts. Each letter is presented by an empty box, one li element for each letter.
     See the example_phrase_html.txt file for an example of what the rendered HTML for a phrase should look like when the game starts, including any id or class attributes needed.
     When the player correctly guesses a letter, the empty box is replaced with the matched letter (see the showMatchedLetter() method below).
     Make sure the phrase displayed on the screen uses the letter CSS class for letters and the space CSS class for spaces.
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
     * checks to see if the letter selected by the player matches a letter in the phrase.
     */

    checkLetter(letter){
        return this.phrase.indexOf(letter) > -1
    }

    /**
     * reveals the letter(s) on the board that matches the player's selection.
     * To reveal the matching letter(s), select all of the letter DOM elements that have a CSS class name that matches the selected letter and replace
     * each selected element's hide CSS class with the show CSS class.
     */

    showMatchedLetter(letter){
        const letterBoxes = document.getElementsByClassName(letter);

        for(let i = 0; i < letterBoxes.length; i++){
            letterBoxes[i].classList.replace('hide', 'show');
        }

        this.shownLetters.push(letter);
    }
}