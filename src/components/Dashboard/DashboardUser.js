import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { connect } from 'react-redux';
import QuestionCard from '../QuestionCard/QuestionCard'

class DashboardUser extends Component {
    render() {
        const { answeredQuestions, unansweredQuestions } = this.props;
        console.log(answeredQuestions, unansweredQuestions);
        return (
            <div className="container py-4">
                <div className="px-lg-5 mx-lg-5">
                    <Tabs fill defaultActiveKey="answeredQuestionsTab">
                        <Tab eventKey="answeredQuestionsTab" title="Answered Questions">
                            {
                                answeredQuestions.length ? answeredQuestions.map((question) => (
                                    <QuestionCard question={question} answered={true} key={question.id} />
                                )) : (<p className="mb-0 p-4 text-center border border-secondary">No Questions found.</p>)
                            }
                        </Tab>
                        <Tab eventKey="unansweredQuestionsTab" title="Unanswered Questions">
                            {
                                unansweredQuestions.length ? unansweredQuestions.map((question) => (
                                    <QuestionCard question={question} answered={false} key={question.id} />
                                )) : (<p className="mb-0 p-4 text-center border border-secondary">No Questions found.</p>)
                            }
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}

function mapStateToProps({questions, authedUser, users}) {
    return {
        answeredQuestions: Object.keys(users[authedUser]['answers']).map((question_id, i) => {
            return {
                id: question_id,
                author: users[questions[question_id]['author']]['name'],
                avatarURL: users[questions[question_id]['author']]['avatarURL'],
                timestamp: questions[question_id]['timestamp'],
                answer: questions[question_id][Object.values(users[authedUser]['answers'])[i]]['text']
            }
        }).sort((a, b) => b.timestamp - a.timestamp),
        unansweredQuestions: Object.keys(questions).map((question_id, i) => {
            if (Object.keys(users[authedUser]['answers']).indexOf(question_id) === -1) {
                return {
                    id: question_id,
                    author: users[questions[question_id]['author']]['name'],
                    avatarURL: users[questions[question_id]['author']]['avatarURL'],
                    timestamp: questions[question_id]['timestamp'],
                    optionOne: questions[question_id]['optionOne']['text'],
                    optionTwo: questions[question_id]['optionTwo']['text']
                }
            }
            return undefined
        }).filter(function(item){
            return item !== undefined;
        }).sort((a, b) => b.timestamp - a.timestamp)
    }
}

export default connect(mapStateToProps)(DashboardUser);
