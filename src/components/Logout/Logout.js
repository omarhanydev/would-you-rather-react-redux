import { Component } from 'react';
import { connect } from 'react-redux';
import { unsetAuthedUser } from '../../actions/authedUser';

class Logout extends Component {
    componentDidMount() {
      this.props.dispatch(unsetAuthedUser())
      this.props.history.replace('/')
    }
    render() {
        return false;
    }
}

export default connect()(Logout);
