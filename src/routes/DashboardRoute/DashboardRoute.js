import React, { Component } from 'react'
import './DashboardRoute.css'
import UserContext from '../../contexts/UserContext'
import ApiService from '../../services/api-service'
import Dashboard from '../../components/Dashboard/Dashboard'

class DashboardRoute extends Component {
static contextType = UserContext;


  render() {
    console.log(this.context.userDetails)
    return (
      <section className='dashboard'>
        {this.renderDashboard()}
      </section>
    );
  }
}

export default DashboardRoute
