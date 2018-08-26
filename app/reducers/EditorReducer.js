import { 
    CHANGE_DESCRIPTION, 
    STORE_EDITOR_STATE, 
    SAVE_DATA_EDITOR,
    GET_TOPIC_DATA,
    EDITOR_DATA_BY_ID,
    GET_MY_TOPIC,
    CLEAR_EDITOR_STATE,
    CLEAR_EDITOR_DETAIL
} from '../actions/types'
import { EditorState, convertToRaw } from 'draft-js'
import { Map, fromJS } from 'immutable'

const INITIAL_STATE = Map({
    description: '',
    editorState: convertToRaw(EditorState.createEmpty().getCurrentContent()),
    editorData: {},
    allTopic: [],
    detailDisplay: {
        _id: 0,
        tags: [],
        editorRaw: convertToRaw(EditorState.createEmpty().getCurrentContent())
    },
    myTopics: [],
    comment: [],
})

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_DESCRIPTION:
            return state.set('description', action.payload)
        case STORE_EDITOR_STATE:
            return state.set('editorState', action.payload)
        case SAVE_DATA_EDITOR:
            return state.set('editorData', action.payload)
        case GET_TOPIC_DATA:
            return state.set('allTopic', action.payload)
        case EDITOR_DATA_BY_ID:
            return state.set('detailDisplay', action.payload)
        case GET_MY_TOPIC:
            return state.set('myTopics', action.payload)
        case CLEAR_EDITOR_STATE:
            return state.set('editorState', INITIAL_STATE.get('editorState'))
        case CLEAR_EDITOR_DETAIL:
            return state.set('detailDisplay', INITIAL_STATE.get('detailDisplay'))
            case GET_MY_TOPIC:
            return state.set('commentTopic', action.payload)
            // case DELETE_TOPIC:
        //     return state.set('deleteTopic', action.payload)
      
        

        default:
            return state
    }
}
