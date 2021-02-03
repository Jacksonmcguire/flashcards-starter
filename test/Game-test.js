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
    it.skip('should create cards', () => {
      const game = new Game();
      game.start();
      expect(game.currentRound.deck[0]).to.be.instanceof(Card);
    })

    it.skip('should put those cards in a deck', () => {
      const game = new Game();
      game.start();
      expect(game.currentRound.deck).to.not.have.length(0);
    })

    it.skip('should create a new round using the deck', () => {
      const game = new Game();
      const startedGame = game.start();
      expect(game.currentRound).to.not.equal(startedGame.currentRound);
      expect(startedGame.currentRound).to.be.instanceof(Round);
    })
  })
})
