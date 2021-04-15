import React, { Component } from 'react'
import { connect } from 'react-redux';
import DashboardLogin from './DashboardLogin'
import DashboardUser from './DashboardUser'

class Dashboard extends Component {
    render() {
        return (
            <div>
                {
                    this.props.user !== null
                    ? (
                        <DashboardUser />
                    )
                    : (
                        <DashboardLogin />
                    )
                }
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users }) {
    return {
        user: authedUser && users && users[authedUser]
            ? {
                id: users[authedUser]['id'],
            }
            : null
    }
}

export default connect(mapStateToProps)(Dashboard);