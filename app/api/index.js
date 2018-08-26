// let API_URL = 'http://codewiki.fd.ise.shibaura-it.ac.jp'

let API_URL = 'http://127.0.0.1:3000'

export const POST_DATA_EDITOR = `${API_URL}/api/saveEditor`
export const GET_ALL_TOPIC = `${API_URL}/api/getAllTopic`
export const GET_EDITOR_DATA = `${API_URL}/api/getEditorData`
export const GET_USER_DATA_API = `${API_URL}/api/userData`
export const SEARCH_TOPIC = `${API_URL}/api/searchTopic`
export const SEARCH_MY_TOPIC = `${API_URL}/api/searchMyTopic`
export const UPDATE_EDITOR_DATA_API = `${API_URL}/api/updateEditorData`
export const DELETE_MY_TOPIC = `${API_URL}/api/deleteMyTopic`

export const POST_COMMENT = `${API_URL}/api/saveComment`
export const GET_COMMENT = `${API_URL}/api/getComment`

export const POST_SIGNIN = `${API_URL}/auth/login`
export const POST_SIGNUP = `${API_URL}/auth/register`
