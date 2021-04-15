import React, { Component } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { handleAddQuestion } from '../../actions/questions';
import { handleReceiveUsers } from '../../actions/users';

class AddQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        redirectToHome: false
    }
    handleChange = (e) => {
        const name = e.target.name
        const text = e.target.value
        const obj = {}
        obj[name] = text
        this.setState(() => (obj))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { optionOneText, optionTwoText } = this.state
        const { dispatch } = this.props
        dispatch(handleAddQuestion(optionOneText, optionTwoText))
        dispatch(handleReceiveUsers())
        this.setState(() => ({
            optionOneText: '',
            optionTwoText: '',
            redirectToHome: true
        }))
    }
    render() {
        const { optionOneText, optionTwoText, redirectToHome } = this.state

        if (redirectToHome === true) {
            return <Redirect to='/' />
        }
        return (
            <div className="container py-4">
                <div className="px-lg-5 mx-lg-5">
                    <form onSubmit={this.handleSubmit}>
                        <Card>
                            <Card.Header><h5 className="mb-0 font-weight-bold">Create New Question</h5></Card.Header>
                                <Card.Body>
                                    <Card.Title className="mb-3">Enter the question</Card.Title>
                                    <div className="my-2 p-3 border">
                                        <h6 className="mb-3 text-muted">Would you rather ...</h6>
                                        <Form.Control value={optionOneText} onChange={this.handleChange} name="optionOneText" className="border-danger" type="text" placeholder="Question One" />
                                        <hr />
                                        <Form.Control value={optionTwoText} onChange={this.handleChange} name="optionTwoText" className="border-danger" type="text" placeholder="Question Two" />
                                    </div>
                                </Card.Body>
                            <Card.Footer className="text-muted">
                                <Button block variant="danger" type="submit" disabled={optionOneText === '' || optionTwoText === ''}>Submit</Button>
                            </Card.Footer>
                        </Card>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(AddQuestion);
