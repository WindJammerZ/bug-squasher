import {
    combineReducers
} from 'redux'
import reportReducer from './report'
import authReducer from './auth'
import editReducer from './editing'
import initReducer from './init'

export default combineReducers({
    reports: reportReducer,
    auth: authReducer,
    edit: editReducer,
    init: initReducer
})