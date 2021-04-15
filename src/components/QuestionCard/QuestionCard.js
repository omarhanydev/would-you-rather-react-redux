import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Card } from 'react-bootstrap'

export class QuestionCard extends Component {
    render() {
        const { question } = this.props
        const { answered } = this.props
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
                        <div className="row">
                            <div className="col-lg-4 text-center">
                                <img src={question.avatarURL} alt={question.author} className="avatar-img--size-xl mb-3" />
                            </div>
                            <div className="col-lg-8">
                                <h6 className="text-muted">Would you rather</h6>
                                {
                                    answered 
                                        ? (
                                            <p>{question.answer}</p>
                                        )
                                        : (
                                            <ul>
                                                <li>{question.optionOne}</li>
                                                <li>{question.optionTwo}</li>
                                            </ul>
                                        )
                                }
                                <LinkContainer to={`/questions/${question.id}`}>
                                    <Button variant="outline-danger" size="sm" block>{answered ? 'View Answers' : 'Answer'}</Button>
                                </LinkContainer>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default QuestionCard
