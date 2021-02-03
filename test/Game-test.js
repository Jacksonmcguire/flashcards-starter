const chai = require('chai');
const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Game = require('../src/Game');
const Round = require('../src/Round');
const Turn = require('../src/Turn');
const expect = chai.expect;

describe('Game', () => {
  it('should keep track of the current round', () => {
    const game = new Game();
    expect(game.currentRound).to.be.instanceof(Round);
  })
  describe('Start', () => {
    it('should create cards', () => {
      const game = new Game();
      game.start();
      expect(game.currentRound.deck[0]).to.be.instanceof(Card);
    })

    it('should put those cards in a deck', () => {
      const game = new Game();
      game.start();
      expect(game.currentRound.deck).to.not.have.length(0);
    })

    it('should create a new round using the deck', () => {
      const game = new Game();
      const beforeStart = game.currentRound;
      const afterStart = game.start();
      expect(beforeStart).to.not.equal(afterStart);
      expect(afterStart).to.be.instanceof(Round);
    })
  })
})
