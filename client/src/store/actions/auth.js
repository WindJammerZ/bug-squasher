import * as actionTypes from './actionTypes'
import axios from '../../axios-reports'

const TOKEN = 'token'
const EXPIRATION_DATE = 'expirationDate'
const USER_ID = 'userId'
const USER_NAME = 'userName'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId, userName, userRole) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        userName: userName,
        userRole: userRole
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const signup = (signupData) => {
    return dispatch => {
        dispatch(authStart())
        const url = `/api/users/`

        axios.post(url, signupData)
            .then(res => {
                localStorage.setItem(TOKEN, res.data.token)
                dispatch(authSuccess(res.data.token, res.data.user._id, res.data.user.name, res.data.user.role))
            }).catch(e => {
                dispatch(authFail(e))
            })
    }

}

export const logout = (filter = '') => {
    const token = localStorage.getItem(TOKEN)

    if (token) {
        const url = `/api/users/logout${filter}`
        const data = {}
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        axios.post(url, data, config)
            .then(res => {
                localStorage.removeItem(TOKEN)
                localStorage.removeItem(EXPIRATION_DATE)
                localStorage.removeItem(USER_ID)
                localStorage.removeItem(USER_NAME)
            }).catch(e => {
                console.log(e)
            })
    }
    return {
        type: actionTypes.AUTH_LOGOUT
    }

}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart())

        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = `/api/users/login`

        //TODO fix expirationDate
        axios.post(url, authData)
            .then(res => {
                // console.log(res)
                const {
                    _id,
                    name,
                    role
                } = res.data.user
                const token = res.data.token
                // const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                localStorage.setItem(TOKEN, token)
                // localStorage.setItem(EXPIRATION_DATE, expirationDate)
                // localStorage.setItem(USER_ID, _id)
                // localStorage.setItem(USER_NAME, name)
                // localStorage.setItem(USER_ROLE, role)
                // console.log(localStorage)
                dispatch(authSuccess(token, _id, name, role))
                // dispatch(checkAuthTimeout(res.data.expiresIn))
            }).catch(e => {
                // console.log(e)
                dispatch(authFail(e))
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

//TODO fix expirationDate
export const authCheckState = () => {
    return dispatch => {
        dispatch(authStart())
        const token = localStorage.getItem(TOKEN)
        if (!token) {
            dispatch(logout())
        } else {
            const url = `/api/users/me`
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }

            axios.get(url, config)
                .then(res => {
                    dispatch(authSuccess(token, res.data._id, res.data.name, res.data.role))
                })
                .catch(e => {
                    dispatch(authFail(e))
                })
            // const expirationDate = new Date(localStorage.getItem(EXPIRATION_DATE))
            // if (expirationDate <= new Date()) {
            //     dispatch(logout())
            // } else {
            // const userID = localStorage.getItem(USER_ID)
            // const userName = localStorage.getItem(USER_NAME)
            // dispatch(authSuccess(token, userID, userName))
            // dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime) / 1000))
            // }
        }
    }
}