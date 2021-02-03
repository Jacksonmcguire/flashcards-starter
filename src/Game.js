const Card = require('./Card');
const data = require('./data');
const Deck = require('./Deck');
const Round = require('./Round');
const prototypeQuestions = data.prototypeData;
const util = require('./util');

class Game {
  constructor() {
    this.currentRound = new Round();
  }

  
  printMessage(deck = new Deck(this.currentRound.deck), round) {
    console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
    -----------------------------------------------------------------------`)
  }
  
  printQuestion(round) {
    util.main(round);
  }

  start() {
    let cards = [];
    prototypeQuestions.forEach(flashcard => {
      const newCard = new Card(flashcard.id, 
        flashcard.question, 
        flashcard.answers, 
        flashcard.correctAnswer);
      cards.push(newCard);
    })
    this.currentRound = new Round(cards);
    this.printMessage(); this.printQuestion(this.currentRound);
    return this.currentRound;
  }
}

module.exports = Game;