import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import { components } from 'react-select';
import { setAuthedUser } from '../../actions/authedUser';

const SingleValue = (props) => {
    return (
        <components.SingleValue {...props}>
        <div className="d-flex align-items-center">
            <img src={props.data.avatarURL} className="avatar-img--size-sm mr-2" alt={props.data.value} />
            <p className="mb-0">{props.data.name}</p>
        </div>
        </components.SingleValue>
    );
};

const Option = (props) => {
    return (
        <components.Option {...props}>
        <div className="d-flex align-items-center">
            <img src={props.data.avatarURL} className="avatar-img--size-sm mr-2" alt={props.data.value} />
            <p className="mb-0">{props.data.name}</p>
        </div>
        </components.Option>
    );
};

class DashboardLogin extends Component {
    state = {
        activeOption: null
    }
    componentDidMount (){
        const { options } = this.props
        this.setState(() => ({
            activeOption: options[1]
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const userId = this.state.activeOption.value
        this.props.dispatch(setAuthedUser(userId))
    }
    handleChange = (e) => {
        this.setState(() => ({
            activeOption: e
        }))
    }
    render() {
        const { activeOption } = this.state
        const { options } = this.props
        return (
            <div className="container py-4">
                <div className="px-lg-5 mx-lg-5">
                    <form onSubmit={this.handleSubmit}>
                        <Card>
                            <Card.Header><h5 className="mb-0 font-weight-bold">Welcome to Would You Rather Game!</h5></Card.Header>
                                <Card.Body>
                                    <Card.Title className="mb-3">Please sign in to continue</Card.Title>
                                    <div>
                                        <Select options={options} isSearchable={false} value={activeOption}  onChange={this.handleChange} components={{ Option, SingleValue }} />
                                    </div>
                                </Card.Body>
                            <Card.Footer className="text-muted">
                                <Button block variant="danger" type="submit" disabled={this.state.activeOption === ''}>Login</Button>
                            </Card.Footer>
                        </Card>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    const options = []
    for (var key of Object.keys(users)) {
        options.push({
            avatarURL: users[key]['avatarURL'],
            name: users[key]['name'],
            value: key
        })
    }
    return {
        options
    }
}

export default connect(mapStateToProps)(DashboardLogin);
