import React, { Component } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { handleAddQuestionAnswer, handleReceiveQuestions } from '../../actions/questions'
import { handleReceiveUsers } from '../../actions/users'

export class QuestionPoll extends Component {
    state = {
        selectedOption: ''
    }
    handleChange = (e) => {
        const value = e.target.id
        this.setState({
            selectedOption: value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { selectedOption } = this.state
        const { dispatch, question } = this.props
        dispatch(handleAddQuestionAnswer(question.id, selectedOption))
        dispatch(handleReceiveUsers())
        dispatch(handleReceiveQuestions())
        this.setState(() => ({
            selectedOption: ''
        }))
    }
    render() {
        const { question } = this.props
        return (
            <div className="p-3 border mb-3">
                <Card>
                    <Card.Header className="card-header bg-light text-dark">
                        <div>
                            <h6 className="mb-0 font-weight-bold">
                                {question.author} asks:
                            </h6>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-lg-4 text-center">
                                    <img src={question.avatarURL} alt={question.author} className="avatar-img--size-xl mb-3" />
                                </div>
                                <div className="col-lg-8">
                                    <h6 className="text-muted mb-3">Would you rather ...</h6>
                                    {
                                        question.options.map((option, i) => (
                                            <div className="font-weight-bold border p-2" key={option.text}>
                                                <Form.Check 
                                                    type='radio'
                                                    id={i === 0 ? 'optionOne' : 'optionTwo'}
                                                    name="option"
                                                    onChange={this.handleChange}
                                                    label={option.text}
                                                />
                                            </div>
                                        ))
                                    }
                                    <div className="mt-3">
                                        <Button variant="danger" type="submit" disabled={this.state.selectedOption === ''} block>Submit</Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default connect()(QuestionPoll)
