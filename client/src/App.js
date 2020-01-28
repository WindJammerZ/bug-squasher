import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import './App.css';

import * as actions from './store/actions/auth'

import Layout from './hoc/Layout/Layout'
import ReportList from './containers/ReportList/ReportList'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Logout/Logout/Logout'
import LogoutAll from './containers/Logout/LogoutAll/LogoutAll'
import Signup from './containers/Signup/Signup'


class App extends Component {
  
  componentDidMount(){
    this.props.onTryAutoSignup()
  }

  render(){

  let routes = (
    <Switch>
      <Route path="/login" component={Auth} />
      <Route path='/signup' component={Signup} />
      <Route path="/" exact component={ReportList} />
      <Redirect to='/' />
    </Switch>
  )

  if(this.props.isAuthenticated){
    routes = (
      <Switch>
        <Route path='/login' component={Auth} />
        <Route path='/logoutAll' component={LogoutAll} />
        <Route path='/logout' exact component={Logout} />
        <Route path='/' exact component={ReportList} />
      <Redirect to='/' />
    </Switch>
    )
  }

    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))