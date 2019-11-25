import React, { Component } from 'react'
import Learn from '../../components/Learn/Learn';
import ApiService from '../../services/api-service';
import UserContext from '../../contexts/UserContext';



class LearningRoute extends Component {
  static contextType = UserContext;

  componentDidMount() {
    ApiService.getLanguageHead()
    .then(res => {
      this.context.updateNextWord(res.nextWord)
      this.context.updateWordCorrectCount(res.wordCorrectCount)
      this.context.updateWordIncorrectCount(res.wordIncorrectCount)
      this.context.updateTotalScore(res.totalScore)
      this.context.updateAnswer(res.translation)
      this.context.updateIsCorrect(res.isCorrect)
    })
  }

  render() {
    console.log(this.context.currentWord)
    return (
      <section className='learn'>
       <Learn />
      </section>
    );
  }
}

export default LearningRoute
