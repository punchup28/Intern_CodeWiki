import { Map } from 'immutable'
import { GET_USER_DATA, USER_LOGOUT } from '../actions/types'

const INITIAL_STATE = Map({
    user: {},
    isLoggedIn: false
})

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USER_DATA:
            return state.set('user', action.payload).set('isLoggedIn', true)
        case USER_LOGOUT:
            return state = INITIAL_STATE
        default:
            return state
    }
}