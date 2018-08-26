import thunk from 'redux-thunk'
import { createStore, compose, applyMiddleware } from 'redux'
import reducer from '../reducers'
import logger from 'redux-logger'

exports.configureStore = () => {
    let middlewares = [ thunk ]

    if (process.env.NODE_ENV !== 'production') { [...middlewares, logger] }
    
    let store = createStore(reducer, applyMiddleware(...middlewares))

    
    return store
}