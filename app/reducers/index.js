import { combineReducers } from 'redux'
import EditorReducer from './EditorReducer'
import AuthReducer from './AuthReducer'

export default combineReducers({
    editor: EditorReducer,
    auth: AuthReducer,
})