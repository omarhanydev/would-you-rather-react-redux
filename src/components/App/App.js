import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import HeaderNavbar from "../HeaderNavbar/HeaderNavbar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import Dashboard from '../Dashboard/Dashboard';
import Leaderboard from '../Leaderboard/Leaderboard';
import AddQuestion from '../AddQuestion/AddQuestion';
import { handleInitialData } from '../../actions/shared';
import Logout from '../Logout/Logout';
import ViewQuestion from '../ViewQuestion/ViewQuestion';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

class App extends Component {
  state = {
    loading: true
  }
  componentDidMount() {
    this.props.dispatch(handleInitialData()).then(() => {
      this.setState({loading: false})
    })
  }
  render() {
    return (
      <Fragment>
        <LoadingBar />
        <Router>
            {
              this.state.loading === true
              ? null
              : <Fragment>
                <HeaderNavbar />
                <Switch>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/leaderboard' component={Leaderboard} />
                  <PrivateRoute path='/add' component={AddQuestion} />
                  <PrivateRoute path='/questions/:id' component={ViewQuestion} />
                  <PrivateRoute path='/logout' component={Logout} />
                  <Route path="*">
                    <p>Not Found</p>
                  </Route>
                </Switch>
              </Fragment>
            }
        </Router>
      </Fragment>
    )
  }
}

export default connect()(App);