const Card = require('./Card');
const data = require('./data');
const Round = require('./Round');
const prototypeQuestions = data.prototypeData;
const util = require('./util');

class Game {
  constructor() {
    this.currentRound = new Round();
  }

  start() {
    let cards = [];
    prototypeQuestions.forEach(flashcard => {
      const newCard = new Card
      (flashcard.id, flashcard.question, 
        flashcard.answers, flashcard.correctAnswer);
      cards.push(newCard);
    })
    this.currentRound = new Round(cards);
    return this.currentRound;
  }

  printMessage(deck, round) {
    console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`)
  }

  printQuestion(round) {
    util.main(round);
  }
}

module.exports = Game;