import axios from 'axios'
import { Redirect } from 'react-router-dom'
import {
    CHANGE_DESCRIPTION, 
    STORE_EDITOR_STATE, 
    SAVE_DATA_EDITOR,
    GET_TOPIC_DATA,
    EDITOR_DATA_BY_ID,
    GET_MY_TOPIC,
    CLEAR_EDITOR_STATE,
    CLEAR_EDITOR_DETAIL,
    UPDATE_EDITOR_DATA
} from './types'
import { 
    POST_DATA_EDITOR, 
    GET_ALL_TOPIC, 
    GET_EDITOR_DATA, 
    SEARCH_TOPIC, 
    SEARCH_MY_TOPIC,
    UPDATE_EDITOR_DATA_API,
    DELETE_MY_TOPIC,
    POST_COMMENT,
    GET_COMMENT
} from '../api'

export const changeDescription = description => {
    return {
        type: CHANGE_DESCRIPTION,
        payload: description
    }
}

export const storeEditorState = editorState => {
    return {
        type: STORE_EDITOR_STATE,
        payload: editorState
    }
}

export const clearEditorState = () => {
    return {
        type: CLEAR_EDITOR_STATE
    }
}

export const clearEditorDetail = () => {
    return {
        type: CLEAR_EDITOR_DETAIL
    }
}

export const updateEditorData = (_id, editorSate, title, tags) => dispatch => {
    return axios.post(UPDATE_EDITOR_DATA_API, {
        'editorRaw': editorSate,
        'title': title,
        'tags': tags,
        '_id': _id
    }).catch(error => {
        console.log(error)
    })
}

export const saveDataFromEditor = (editorSate, title, tags, ownerId, ownerName) => {
    return function(dispatch) {
        return axios.post(POST_DATA_EDITOR, {
            'editorRaw': editorSate,
            'title': title,
            'ownerId': ownerId,
            'ownerName': ownerName,
            'tags': tags
        }, {
            headers: { "Authorization": localStorage.getItem('key') }
        }).catch(error => {
            console.log(error)
        })
    }
}

export const allTopic = topics => {
    return {
        type: GET_TOPIC_DATA,
        payload: topics
    }
}

export const getAllEditorData = () => dispatch => {
    return axios.get(GET_ALL_TOPIC).then(response => {
        dispatch(allTopic(response.data.editor))
    }).catch(error => {
        console.log(error)
    })
}

export const detailDisplayById = editorData => {
    return {
        type: EDITOR_DATA_BY_ID,
        payload: editorData
    }
}

export const getEditorById = id => dispatch => {
    console.log('9')
    
    return axios.post(GET_EDITOR_DATA, {
        '_id': id
    }).then(response => {
        dispatch(detailDisplayById(response.data.editor))
        console.log(response.data.editor.owner.ownerId)
    }).catch(error => {
        console.log(error)
    })

    
}

export const searchTopic = search => dispatch => {
    console.log('Search 1 ')
    return axios.post(SEARCH_TOPIC, {
        'searchText': search
    }).then(response => {
        dispatch(allTopic(response.data.topic))
    }).catch(error => {
        console.log(error)
    })
}

export const searchMyTopic = id => dispatch => {

    console.log('Search 2 : ' + id)
    return axios.post(SEARCH_MY_TOPIC, {
        'id': id
    }).then(response => {
        return dispatch(myTopicDispatch(response.data.topics))
    }).catch(error => {
        console.log(error)
    })
}

export const myTopicDispatch = topics => {
    return {
        type: GET_MY_TOPIC,
        payload: topics
    }
}

export const deleteMyTopic = id => dispatch => {
    
    console.log('Delete 1 : ' + id )

    return axios.post(DELETE_MY_TOPIC,{
        'id' : id
    }).then(response => {
        return dispatch(myTopicDispatch(response.data.topics))
    }).catch(error => {
        console.log(error)
    })

}


export const saveComment = (comment, userName, _id) => {
    console.log('Action')
    console.log('Topic Id :' + _id)
    console.log('Save Comment by : ' + userName)

    return function (dispatch){
        return axios.post(POST_COMMENT, {
            'text': comment,
            'commentOwner': userName,
            '_id' : _id
        }).then(response => {
            return dispatch(detailDisplayById(response.data.editor))
        }).catch(error => {
            console.log(error)
        })
    
    }
}


