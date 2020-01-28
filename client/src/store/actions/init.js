import axios from '../../axios-reports'
import * as actionTypes from './actionTypes'

import {
    multiQueryURL
} from '../../shared/utility'

const ADMINISTRATOR = 'administrator'
const DEVELOPER_USER = 'developer'
// const GENERAL_USER = 'general'


export const initApp = () => {
    return dispatch => {
        dispatch(initAppStart())
        dispatch(getRole([ADMINISTRATOR, DEVELOPER_USER]))
    }
}

export const initAppStart = () => {
    return {
        type: actionTypes.INIT_APP_START
    }
}

export const initAppFail = (error) => {
    return {
        type: actionTypes.INIT_APP_FAIL,
        error: error
    }
}

export const initAppSuccess = () => {
    return {
        type: actionTypes.INIT_APP_SUCCESS
    }
}

export const getRole = (userRoles) => {
    return dispatch => {

        const url = `/users/role`
        let queryArray = []

        userRoles.forEach(userRole => queryArray.push(Object.assign({}, {
            searchTerm: 'role',
            searchValue: userRole
        })))

        const fullURL = multiQueryURL(url, queryArray)
        const config = {}

        return axios.get(fullURL, config)
            .then(res => {
                dispatch(getRoleSuccess(res.data))
                dispatch(initAppSuccess())
            })
            .catch(e => {
                dispatch(getRoleFail(e))
                dispatch(initAppFail())
            })
    }
}

export const getRoleSuccess = (owners) => {
    return {
        type: actionTypes.GET_ROLE_SUCCESS,
        payload: owners
    }
}

export const getRoleFail = (error) => {
    return {
        type: actionTypes.GET_ROLE_FAIL,
        error: error
    }
}