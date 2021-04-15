import { saveQuestion, saveQuestionAnswer, getQuestions } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

function addQuestionAnswer(payload) {
    return {
        type: ADD_QUESTION_ANSWER,
        payload
    }
}

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
        .then((question) => dispatch(addQuestion(question)))
        .then(() => dispatch(hideLoading()))
    }
}

export function handleAddQuestionAnswer(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        return saveQuestionAnswer({
            authedUser,
            qid,
            answer
        })
        .then((payload) => dispatch(addQuestionAnswer(payload)))
        .then(() => dispatch(hideLoading()))
    }
}

export function handleReceiveQuestions () {
    return (dispatch) => {
        dispatch(showLoading())
        return getQuestions()
        .then((questions) => {
            dispatch(receiveQuestions(questions))
            dispatch(hideLoading())
        })
    }
}