const Turn = require('../src/Turn');
const data = require('./data');
const prototypeQuestions = data.prototypeData;
const fillDeck = require('./util').fillDeck;
class Round {
  constructor(deck = []) {
    this.deck = deck
    this.turns = 0;
    this.incorrectGuesses = [];
  }

  returnCurrentCard() {
    if (this.deck !== []) {
      const currentCard = this.deck[0];
      return currentCard;
    } else {
      return false;
    }
  }

  takeTurn(guess) {
    this.turns ++;
    const lastCard = this.deck.shift();
    const currentTurn = new Turn(guess, lastCard);
    if (!currentTurn.evaluateGuess() && lastCard !== undefined) {
      this.incorrectGuesses.push(lastCard.id);
    } 
    return currentTurn.giveFeedback();
  }

  calculatePercentCorrect() {
    if (this.turns > 0) {
      const incorrect = (this.incorrectGuesses.length / this.turns);
      const correct = (1 - incorrect) * 100;
      return correct;
    } else {
      return 0;
    }
  }

  endRound() {
    const percentCorrect = Math.ceil(this.calculatePercentCorrect());
    if (percentCorrect >= 90) {
      this.deck = []; this.incorrectGuesses = []; this.turns = 0;
      console.log(`** Round over! ** You answered ${percentCorrect}% of the questions correctly!
      --------------------------------------------------------------`);
      return `** Round over! ** You answered ${percentCorrect}% of the questions correctly!`;
    } else {
      console.log(`SHUCKS! You missed the goal of 90%. Your score was ${percentCorrect}%, try again!
      --------------------------------------------------------------`);
      fillDeck(this.deck)
      this.incorrectGuesses = []; this.turns = 0;
    }
  }
}
module.exports = Round;