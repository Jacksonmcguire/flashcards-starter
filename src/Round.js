const Turn = require('../src/Turn');
const Deck = require('./Deck');
const data = require('./data');
const Card = require('./Card');
const prototypeQuestions = data.prototypeData;
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
    if (percentCorrect >= 90) {
      this.deck = []; this.incorrectGuesses = []; this.turns = 0;
      console.log(`** Round over! ** You answered ${percentCorrect}% of the questions correctly!
      --------------------------------------------------------------`);
      return `** Round over! ** You answered ${percentCorrect}% of the questions correctly!`;
    } else {
      console.log(`SHUCKS! You missed the goal of 90%. Your score was ${percentCorrect}%, try again!
      --------------------------------------------------------------`);
      prototypeQuestions.forEach(flashcard => {
        const newCard = new Card(flashcard.id, 
          flashcard.question, 
          flashcard.answers, 
          flashcard.correctAnswer);
        this.deck.push(newCard);
      })
      this.incorrectGuesses = []; this.turns = 0;
    }
  }
}
module.exports = Round;