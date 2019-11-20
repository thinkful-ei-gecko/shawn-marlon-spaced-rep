import React from 'react';
import './Dashboard.css';
import UserContext from '../../contexts/UserContext';
import ApiService from '../../services/api-service';

export default class Dashboard extends React.Component {
  static contextType = UserContext;

  state = {
    languagesExpand: false,
    detailsExpand: false,
    progressExpand: false,
    alphabetExpand: false,
  }

  handleDropDown = (value) => {
    this.setState({
      [value]: !this.state[value]
    })
  }

  generateAlphabet = () => {
    const words = this.props.words
    const convertedWords = words.map(word => word.original.split('').map(char => char === '.' ? '&#8226;': '&#9594;').join(''))
    return words.map(word => {
      return(
        <li key={word.id}>
          <h4>{word.translation}</h4>
          <p>
            {word.original
            .split('')
            .map(char => char === '.' ?'\u2689' : '\u268A')
            .join('')}
          </p>
        </li>
      )
    })
  }

  renderLanguages = () => {
    if(this.state.languagesExpand === true) {
      return (
        <>
        <ul className='languages'>
        <li className='language'>
        <h3 onClick={() => this.handleDropDown('detailsExpand')}>{this.props.language.name}</h3>
         {this.renderLanguageDetails()}
        </li>
        </ul>
        </>
      )
    }
    else {
      return null
    }
  }

  renderLanguageDetails = () => {
    if(this.state.detailsExpand === true) {
      return (
        <ul className='language-details'>
        <li>
          <h3 onClick={() => this.handleDropDown('progressExpand')}>Your Progress</h3>
        </li>
        <li>
        <h3 onClick={() => this.handleDropDown('alphabetExpand')}>Alphabet</h3>
          {this.renderAlphabet()}
        </li>
      </ul>
      )
    }
    else {
      return null;
    }
  }

  renderAlphabet = () => {
    if(this.state.alphabetExpand === true) {
      return (
        <ul className='alphabet'>
          {this.generateAlphabet()}
        </ul>
      )
    }
    else {

    }
  }
  

  render() {
    console.log(this.state)
    return (
      <div className='dashboard'>
        <h2 onClick={() => this.handleDropDown('languagesExpand')}>Your Languages</h2>
        {this.renderLanguages()}
      </div>
    )
  }
}