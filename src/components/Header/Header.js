import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext
  state = {
    expanded: false,
    loggedIn: false,
  }

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  handleHamburger = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  renderLogoutLink() {
    if(this.state.expanded){
    return (
        <nav>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
     )
    }
  }

  renderLoginLink() {
    if(this.state.expanded){
      return (
        <nav>
          <Link to='/login'>Login</Link>
          {' '}
          <Link to='/register'>Sign up</Link>
        </nav>
      )
    }
  }


  render() {
    console.log(this.context.user.name)
    return (
      <header>
        <h1>
          <Link to='/'>
            spaced repetition
          </Link>
        </h1>
          <p>&#8226;&#8226;&#8226; &#8226;&#9594;&#9594;&#8226; &#8226;&#9594; &#9594;&#8226;&#9594;&#8226;  &#8226; &#9594;&#8226;&#8226;</p>
          <span>{this.context.user.name ? this.context.user.name : null}</span>
          <div className='hamburger-menu'>
            <i class="fas fa-bars" onClick={this.handleHamburger}></i>
            {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
          </div>

      </header>
    );
  }
}

export default Header
