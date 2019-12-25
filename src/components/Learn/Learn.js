import React from 'react';
import './Learn.css'
import UserContext from '../../contexts/UserContext';
import ApiService from '../../services/api-service';

export default class Learn extends React.Component {
  static contextType = UserContext;

  state = {
    guess: '',
    answered: false,
  }

  componentDidMount() {
    ApiService.getLanguageHead()
    .then(res => {
      this.context.updateNextWord(res.nextWord)
      this.context.updateWordCorrectCount(res.wordCorrectCount)
      this.context.updateWordIncorrectCount(res.wordIncorrectCount)
      this.context.updateTotalScore(res.total_score)
      this.context.updateAnswer(res.translation)
      this.context.updateIsCorrect(res.isCorrect)
    })
    .then(() => {
      this.setState({
        totalScore: this.context.totalScore,
        correctScore: this.context.wordCorrectCount,
        incorrectScore: this.context.wordIncorrectCount,
      })
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

  handleNextButton = () => {
    this.setState({
      answered: false,
      isCorrect: null,
      totalScore: this.context.totalScore,
      correctScore: this.context.wordCorrectCount,
      incorrectScore: this.context.wordIncorrectCount,
    })
    ApiService.getLanguageHead()
    .then(res => {
      this.context.updateNextWord(res.nextWord)
      this.context.updateWordCorrectCount(res.wordCorrectCount)
      this.context.updateWordIncorrectCount(res.wordIncorrectCount)
      this.context.updateTotalScore(res.total_score)
      this.context.updateAnswer(res.translation)
      this.context.updateIsCorrect(res.isCorrect)
    })
  }

  renderFeedBack = () => {
    if(this.context.isCorrect === true) {
      return (
        <div className='feedback'>
          <h2>You were correct! :D</h2>
          <p>The correct translation was {this.context.answer} </p>
        </div>
      )
    }
    else if (this.context.isCorrect === false) {
      return (
        <div className='feedback'>
          <h2>Good try, but but not quite right :(</h2>
          <p>The correct translation was {this.context.answer} </p>
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
    ApiService.postGuess({guess: this.state.guess})
    .then(res => {
      this.context.updateWordCorrectCount(res.wordCorrectCount)
      this.context.updateWordIncorrectCount(res.wordIncorrectCount)
      this.context.updateTotalScore(res.total_score)
      this.context.updateAnswer(res.answer)
      this.context.updateIsCorrect(res.isCorrect)
      if(res.isCorrect) {
        this.setState({
          totalScore: this.state.totalScore +1,
          correctScore: this.state.correctScore + 1}
          )
      }
      else {
        this.setState({incorrectScore: this.state.incorrectScore + 1})
      }
      })
  }

  handleGuessField = (answer) => {
    this.setState({
      guess: answer,
    })
  }

  render() {
    const { totalScore, wordCorrectCount, wordIncorrectCount, nextWord, isCorrect, answer} = this.context;
    return (
      <>
      {this.renderFeedBack()}
      <h2>Translate the word:</h2>
      <span className='cypress'>{nextWord}</span>
      <p className='DisplayScore'>
        Your total score is: {this.state.totalScore}
      </p>
      <p className='current-word'>
        {nextWord
            .split('')
            .map(char => char === '.' ?'\u2689' : '\u268A')
            .join('')}
      </p>

      <form onSubmit={this.handleSubmitAnswer}>
      <label for='learn-guess-input'>What's the translation for this word?</label>
      <input type='text' id='learn-guess-input' onChange={e => this.handleGuessField(e.target.value)} required></input>
      {this.renderSubmitButton()}
      </form>
      <p id='correct'>You have answered this word correctly {this.state.correctScore} times.</p>
      <p id='incorrect'>You have answered this word incorrectly {this.state.incorrectScore} times.</p>
      {this.renderNextButton()}
      </>
    )
  }
}