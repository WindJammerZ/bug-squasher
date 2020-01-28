import * as actionTypes from '../actions/actionTypes'
import {
    updateObject
} from '../../shared/utility'

const initialState = {
    owners: [],
    appLoading: false,
    appLoaded: false,
    error: null
}

const initAppStart = (state, action) => {
    return updateObject(state, {
        appLoading: true,
        appLoaded: false
    })
}

const initAppFail = (state, action) => {
    return updateObject(state, {
        appLoading: false,
        appLoaded: false,
        error: action.error
    })
}

const initAppSuccess = (state, action) => {
    return updateObject(state, {
        appLoading: false,
        appLoaded: true
    })
}

const getRoleFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    })
}

const getRoleSuccess = (state, action) => {
    return updateObject(state, {
        owners: action.payload.map(owner => ({
            value: owner._id,
            displayValue: owner.name
        }))
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_APP_START:
            return initAppStart(state, action)
        case actionTypes.INIT_APP_FAIL:
            return initAppFail(state, action)
        case actionTypes.INIT_APP_SUCCESS:
            return initAppSuccess(state, action)
        case actionTypes.GET_ROLE_FAIL:
            return getRoleFail(state, action)
        case actionTypes.GET_ROLE_SUCCESS:
            return getRoleSuccess(state, action)
        default:
            return state
    }
}

export default reducer