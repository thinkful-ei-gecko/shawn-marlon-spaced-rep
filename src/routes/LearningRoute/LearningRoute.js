import React, { Component } from 'react'
import Learn from '../../components/Learn/Learn';
import ApiService from '../../services/api-service';
import UserContext from '../../contexts/UserContext';



class LearningRoute extends Component {
  static contextType = UserContext;

  componentDidMount() {
    ApiService.getLanguageHead()
    .then(res => {
      console.log(res)
      this.context.setCurrentWord({
        totalScore: res.total_score,
        nextWord: res.nextWord,
        wordCorrectCount: res.wordCorrectCount,
        wordIncorrectCount: res.wordIncorrectCount,
        answer: res.translation,
      })
    })
  }

  renderLearn () {
    if(Object.keys(this.context.currentWord).length) {
      return (
        <Learn currentWord={this.context.currentWord}/>
      )
    }
    else {
      return null;
    }
  }

  render() {
    console.log(this.context.currentWord)
    return (
      <section className='learn'>
       {this.renderLearn()}
      </section>
    );
  }
}

export default LearningRoute
