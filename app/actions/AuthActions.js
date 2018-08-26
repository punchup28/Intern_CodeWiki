import axios from 'axios'
import { POST_SIGNIN, POST_SIGNUP, GET_USER_DATA_API } from '../api'
import { GET_USER_DATA, USER_LOGOUT } from './types'

export const signIn = (username, password) => {
    return dispatch => {
        return axios.post(POST_SIGNIN, {
            "username": username,
            "password": password
        }).then(response => {
            localStorage.setItem('key', response.data.token)
            dispatch(saveUserData(response.data.user))
        }).catch(err => {
            console.log(err)
        })
    }
}

export const saveUserData = user => {
    return {
        type: GET_USER_DATA,
        payload: user
    }
}

export const signUp = (username, email, password) => {
    return dispatch => {
        return axios.post(POST_SIGNUP, {
            'username': username,
            'email': email,
            'password': password
        }).then(response => {
            localStorage.setItem('key', response.data.token)
            dispatch(saveUserData(response.data.user))
        }).catch(err => {
            console.log(err)
        })
    }
}

export const checkUser = () => {
    return dispatch => {
        return axios.post(GET_USER_DATA_API, null, {
            headers: { "Authorization": localStorage.getItem('key') }
        }).then(response => {
            dispatch(saveUserData(response.data.user))
        })
    }
}
export const signOut = () => dispatch => {
    localStorage.clear()
    return dispatch(dispatchLogout())
}

export const dispatchLogout = () => {
    return {
        type: USER_LOGOUT
    }
}