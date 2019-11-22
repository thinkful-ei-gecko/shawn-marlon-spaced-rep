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
    totalScore: 0,
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    nextWord: '',
  }

  componentDidMount = () => {
    this.setState({
      totalScore: this.context.currentWord.totalScore,
      wordCorrectCount: this.context.currentWord.wordCorrectCount,
      wordIncorrectCount: this.context.currentWord.wordIncorrectCount,
      nextWord: this.context.currentWord.nextWord,
    })
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
      console.log(res)
      this.context.setCurrentWord({
        totalScore: res.totalScore,
        nextWord: res.nextWord,
        wordCorrectCount: res.wordCorrectCount,
        wordIncorrectCount: res.wordIncorrectCount,
        answer: res.translation,
      })
    })
  }

  renderFeedBack = () => {
    if(this.state.isCorrect === true) {
      return (
        <div className='feedback'>
          <h2>You were correct! :D</h2>
          <p>The correct translation was {this.context.currentWord.translation} </p>
        </div>
      )
    }
    else if (this.state.isCorrect === false) {
      return (
        <div className='feedback'>
          <h2>Good try, but but not quite right :(</h2>
          <p>The correct translation was {this.context.currentWord.translation} </p>
        </div>
      )
    }
  }

  handleSubmitAnswer = e => {
    e.preventDefault();
    console.log('Submit fired!')
    this.setState({
      answered: true,
    })
    ApiService.postGuess(this.state)
    .then(res => {
      console.log(res)
      this.setState({
        nextWord: res.nextWord,
        isCorrect: res.isCorrect,
        totalScore: res.totalScore,
        wordCorrectCount: res.wordCorrectCount,
        wordIncorrectCount: res.wordIncorrectCount,
      })
    })
  }

  handleGuessField = (answer) => {
    this.setState({
      guess: answer,
    })
  }

  render() {
    console.log(this.context.currentWord)
    return (
      <>
      {this.renderFeedBack()}
      <h2>Translate the word:</h2>
      <span className='cypress'>{this.state.nextWord}</span>
      <p className='DisplayScore'>Your total score is: {this.state.totalScore}</p>
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
      <p>You have answered this word correctly {this.state.wordCorrectCount} times.</p>
      <p>You have answered this word incorrectly {this.state.wordIncorrectCount} times.</p>
      {this.renderNextButton()}
      </>
    )
  }
}