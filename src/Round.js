const Turn = require('../src/Turn');
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
      const correct = 1 - incorrect;
      return correct * 100;
    } else {
      return 0;
    }
  }

  endRound() {
    const percentCorrect = Math.ceil(this.calculatePercentCorrect());
    console.log(`** Round over! ** You answered ${percentCorrect}% of the questions correctly!`);
    return `** Round over! ** You answered ${percentCorrect}% of the questions correctly!`;
  }
}
module.exports = Round;