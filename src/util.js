const inquirer = require('inquirer');
const prototypeQuestions = require('./data').prototypeData;
const Card = require('./Card');
  
const genList = (round) => {
    if (round.deck[0] !== undefined) {
      let card = round.returnCurrentCard() || round.deck[0];
      let choices = card.answers.map((answer, index) => {
        return {
          key: index,
          value: answer
        }
      });
      return {
        type: 'rawlist',
        message: card.question,
        name: 'answers',
        choices: choices
      };
    } else {
      return;
    }
  }

  const getRound = (round) => {
    return Promise.resolve(round);
  }
  
  const confirmUpdate = (id, round) => {
    const feedback = round.takeTurn(id);
    return {
      name: 'feedback',
      message: `Your answer of ${id} is ${feedback}`
    }
  };
  
  async function main(round) {
    const currentRound = await getRound(round);
    const getAnswer = await inquirer.prompt(genList(currentRound));
    const getConfirm = await inquirer.prompt(confirmUpdate(getAnswer.answers, round));
    
    if (!round.returnCurrentCard()) {
      round.endRound();
      if(round.deck !== []) {
        main(round);
      }     
    } else if(round.returnCurrentCard()) {
      main(round);
    }
  };

  const fillDeck = (deck) => {
    prototypeQuestions.forEach(flashcard => {
      const newCard = new Card(flashcard.id, 
        flashcard.question, 
        flashcard.answers, 
        flashcard.correctAnswer);
        deck.push(newCard);
    })
  }

  module.exports = {
    genList,
    getRound,
    confirmUpdate,
    main,
    fillDeck
  }
