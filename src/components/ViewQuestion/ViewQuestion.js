import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionPoll from '../QuestionPoll/QuestionPoll'
import QuestionSave from '../QuestionSave/QuestionSave'

export class ViewQuestion extends Component {
    render() {
        const { question, error } = this.props
        if (error) {
            return (
                <div className="container py-4">
                    <div className="px-lg-5 mx-lg-5">
                        <p className="mb-0 p-4 text-center border border-secondary">Invalid Question.</p>
                    </div>
                </div>
            )
        }
        return (
            <div className="container py-4">
                <div className="px-lg-5 mx-lg-5">
                    {
                        question.answered
                            ? (
                                <QuestionPoll question={question} />
                            )
                            : (
                                <QuestionSave question={question} />
                            )
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps({users, questions, authedUser}, ownProps) {
    const question_id = ownProps.match.params.id
    const validQuestionId = Object.keys(questions).indexOf(question_id) !== -1 ? true : false
    if (validQuestionId) {
        return {
            question: {
                id: questions[question_id]['id'],
                options: [
                    {
                        ...questions[question_id].optionOne,
                        active: questions[question_id].optionOne.votes.indexOf(authedUser) >= 0 ? true : false,
                        votesCount: questions[question_id].optionOne.votes.length,
                        percentage: Number(((questions[question_id].optionOne.votes.length / (questions[question_id].optionOne.votes.length + questions[question_id].optionTwo.votes.length)) * 100)).toFixed()
                    },
                    {
                        ...questions[question_id].optionTwo,
                        active: questions[question_id].optionTwo.votes.indexOf(authedUser) >= 0 ? true : false,
                        votesCount: questions[question_id].optionTwo.votes.length,
                        percentage: Number(((questions[question_id].optionTwo.votes.length / (questions[question_id].optionOne.votes.length + questions[question_id].optionTwo.votes.length)) * 100)).toFixed()
                    },
                ],
                totalVotesCount: (questions[question_id].optionOne.votes.length) + (questions[question_id].optionTwo.votes.length),
                author: users[questions[question_id]['author']]['name'],
                avatarURL: users[questions[question_id]['author']]['avatarURL'],
                answered: Object.keys(users[authedUser]['answers']).indexOf(question_id) !== -1 ? true : false
            },
            error: false
        }
    }
    return {
        error: true
    }
}

export default connect(mapStateToProps)(ViewQuestion)
