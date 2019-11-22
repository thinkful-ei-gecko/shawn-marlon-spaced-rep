import React from 'react';
import './Learn.css'
import UserContext from '../../contexts/UserContext';
import ApiService from '../../services/api-service';

export default class Learn extends React.Component {
  static contextType = UserContext;

  state = {
    guess: '',
    answered: false,
    isCorrect: null,
  }

  renderNextButton = () => {
    if(this.state.answered) {
      return (
        <button id='next-button' onClick={this.handleNextButton}>Try another word!</button>
      )
    }
    else {
      return null;
    }
  }

  renderSubmitButton = () => {
    if(this.state.answered === false) {
      return (
        <button type='submit' id='submit-button'>Submit your answer</button>
      )
    }
    else {
      return null;
    }
  }

  handleNextButton = e => {
    e.preventDefault();
    this.setState({
      answered: false,
      isCorrect: null
    })
    ApiService.getLanguageHead()
    .then(res => {
      this.context.setCurrentWord({
        totalScore: res.totalScore,
        nextWord: res.nextWord,
        wordCorrectCount: res.wordCorrectCount,
        wordIncorrectCount: res.wordIncorrectCount,
        answer: res.answer,
      })
    })
  }

  renderFeedBack = () => {
    if(this.state.isCorrect === true) {
      return (
        <div className='feedback'>
          <h2>You were correct! :D</h2>
          <p>The correct translation for {this.context.currentWord.answer} was  </p>
        </div>
      )
    }
    else if (this.state.isCorrect === false) {
      return (
        <div className='feedback'>
          <h2>Good try, but but not quite right :(</h2>
          <p>The correct translation for {this.context.currentWord.answer} was  </p>
        </div>
      )
    }
  }

  handleSubmitAnswer = e => {
    e.preventDefault();
    this.setState({
      answered: true,
    })
    ApiService.postGuess(this.state)
    .then(res => {
      this.setState({
        isCorrect: res.isCorrect,
      })
    })
  }

  handleGuessField = (answer) => {
    this.setState({
      guess: answer,
    })
  }

  render() {
    return (
      <>
      {this.renderFeedBack()}
      <h2>Translate the word:</h2>
      <p>Your total score is: {this.context.currentWord.totalScore}</p>
      <p className='current-word'>
        {this.context.currentWord.nextWord
            .split('')
            .map(char => char === '.' ?'\u2689' : '\u268A')
            .join('')}
      </p>
      <form onSubmit={this.handleSubmitAnswer}>
      <label for='learn-guess-input'>What's the translation for this word?</label>
      <input type='text' id='learn-guess-input' onChange={e => this.handleGuessField(e.target.value)} required></input>
      {this.renderSubmitButton()}
      </form>
      <p>You have answered this word correctly {this.context.currentWord.wordCorrectCount} times.</p>
      <p>You have answered this word incorrectly {this.context.currentWord.wordIncorrectCount} times.</p>
      {this.renderNextButton()}
      </>
    )
  }
}