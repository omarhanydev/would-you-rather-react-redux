import React, { Component } from 'react'
import { Card, Alert, ProgressBar, Badge } from 'react-bootstrap'

export class QuestionPoll extends Component {
    render() {
        const { question } = this.props
        return (
            <div className="p-3 border mb-3">
                <Card>
                    <Card.Header className="card-header bg-light text-dark">
                        <div>
                            <h6 className="mb-0 font-weight-bold">
                                Asked by {question.author}
                            </h6>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div className="row">
                            <div className="col-lg-4 text-center">
                                <img src={question.avatarURL} alt={question.author} className="avatar-img--size-xl mb-3" />
                            </div>
                            <div className="col-lg-8">
                                <h6 className="text-muted">Results:</h6>
                                {
                                    question.options.map((option) => (
                                        <Alert variant={option.active ? 'success' : 'secondary'} key={option.text}>
                                            <div className="row align-items-center">
                                                <div className="col-lg-7">
                                                    <p className="mb-0">{option.text}</p>
                                                    {option.active && (<p className="mb-0"><Badge variant="dark">Your Vote</Badge></p>)}
                                                </div>
                                                <div className="col-lg-5 d-inline-flex align-items-center">
                                                    <div className="flex-fill">
                                                        <ProgressBar variant="dark" now={option.percentage} label={`${option.percentage}%`} />
                                                    </div>
                                                    <small className="pl-2">{option.votesCount} / {question.totalVotesCount} votes</small>
                                                </div>
                                            </div>
                                        </Alert>
                                    ))
                                }
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default QuestionPoll
