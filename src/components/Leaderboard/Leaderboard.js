import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';

class Leaderboard extends Component {
    render() {
        const { topUsers } = this.props
        return (
            <div className="container py-4">
                <div className="px-lg-5 mx-lg-5">
                    {
                        topUsers.map((user, i) => {
                            let iconColor = '';
                            switch(i) {
                                case 0:
                                iconColor = '#FFD700';
                                break;
                                case 1:
                                iconColor = 'green';
                                break;
                                default:
                                iconColor = 'gray';
                            }
                            return (
                            <div className="mb-3" key={user.id}>
                                <Card>
                                    <Card.Header className="card-header card-header--theme-dimmed">
                                        <div className="text-center">
                                            <h6 className="mb-0 font-weight-bold">
                                                <FontAwesomeIcon icon={faTrophy} className="mr-2" style={{width: '30px', color: iconColor}} />
                                                <span>{user.name}</span>
                                            </h6>
                                        </div>
                                    </Card.Header>
                                    <Card.Footer className="text-muted">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="my-2 p-3 border bg-white">
                                                    <h6 className="mb-3 text-muted">Answered Questions:</h6>
                                                    <span className="text-danger font-weight-bold">{user.answers}</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 text-center">
                                                <img src={user.avatarURL} alt={user.name} className="avatar-img--size-xl mb-3" />
                                                <span className="d-block">Score</span>
                                                <span className="text-danger mb-0 h5 font-weight-bold">{user.score}</span>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="my-2 p-3 border bg-white">
                                                    <h6 className="mb-3 text-muted">Created Questions:</h6>
                                                    <span className="text-danger font-weight-bold">{user.questions}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Footer>
                                </Card>
                            </div>
                        )
                        })
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps({users}) {
    return {
        topUsers:   users
                    ? Object.values(users).sort((a, b) => (
                        (Object.values(b.answers).length + Object.values(b.questions).length) - (Object.values(a.answers).length + Object.values(a.questions).length))
                    )
                    .slice(0, 4)
                    .map((user) => ({
                        id: user['id'],
                        name: user['name'],
                        score: Object.values(user['answers']).length + Object.values(user['questions']).length,
                        answers: Object.values(user['answers']).length,
                        questions: Object.values(user['questions']).length,
                        avatarURL: user['avatarURL'],
                    }))
                    : []
    }
}

export default connect(mapStateToProps)(Leaderboard);