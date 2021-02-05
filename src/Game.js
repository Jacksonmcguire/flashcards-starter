const prototypeQuestions = require('./data').prototypeData;
const Deck = require('./Deck');
const Round = require('./Round');
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
    util.fillDeck(cards);
    this.currentRound = new Round(cards);
    this.printMessage(); 
    this.printQuestion(this.currentRound);
    return this.currentRound;
  }
}

module.exports = Game;
