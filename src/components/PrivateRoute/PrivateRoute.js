import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

class PrivateRoute extends Component {
  render() {
    const { authedUser } = this.props;
    if (authedUser) {
      return (
        <Route {...this.props} />
      )
    } else {
      return (
        <Redirect to="/" />
      )
    }
  }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(PrivateRoute)