const Card = require("./Card");

class Turn {
  constructor(guess, cardInst = new Card()) {
    this.userGuess = guess;
    this.card = cardInst;
  }
  
  returnGuess() {
    return this.userGuess;
  }

  returnCard() {
    return this.card;
  }

  evaluateGuess() {
    if (this.userGuess === this.card.correctAnswer) {
      return true;
    } else {
      return false;
    }
  }

  giveFeedback() {
    if (this.evaluateGuess() === true) {
      return 'correct!';
    } else {
      return 'incorrect!';
    }
  }
}

module.exports = Turn;