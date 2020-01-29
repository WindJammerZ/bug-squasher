import axios from '../../axios-reports'
import * as actionTypes from './actionTypes'

import {
    getReports
} from './index'

export const getOwner = (ownerId) => {
    return dispatch => {
        dispatch(getOwnerStart())

        const url = `/api/users/owner/${ownerId}`
        const config = {}

        return axios.get(url, config)
            .then(res => {
                dispatch(getOwnerSuccess(res.data.name))
            })
            .catch(e => {
                dispatch(getOwnerFail(e))
            })
    }
}

export const getOwnerStart = () => {
    return {
        type: actionTypes.GET_OWNER_START
    }
}

export const getOwnerSuccess = (userName) => {
    return {
        type: actionTypes.GET_OWNER_SUCCESS,
        ownerName: userName
    }
}

export const getOwnerFail = (error) => {
    return {
        type: actionTypes.GET_OWNER_FAIL,
        error: error
    }
}

export const editReport = (reportId, reportData, token = null) => {
    return dispatch => {
        dispatch(editReportStart())

        const url = `/api/reports/edit_fields/${reportId}`
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }


        axios.patch(url, reportData, config)
            .then(res => {

                dispatch(editReportSuccess())
                const urlReportFilter = ''
                dispatch(getReports(urlReportFilter, token))

            })
            .catch(e => {
                dispatch(editReportFail(e))
            })
    }
}

export const editReportStart = () => {
    return {
        type: actionTypes.EDIT_REPORT_START
    }
}

export const editReportFail = (error) => {
    return {
        type: actionTypes.EDIT_REPORT_FAIL,
        error: error
    }
}

export const editReportSuccess = () => {
    return {
        type: actionTypes.EDIT_REPORT_SUCCESS
    }
}

export const assignReport = (reportId, reportData, token = null) => {
    return dispatch => {

        dispatch(assignReportStart())

        const url = `/api/reports/assign/${reportId}`
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }


        axios.patch(url, reportData, config)
            .then(res => {

                dispatch(assignReportSuccess())

                const urlReportFilter = ''
                dispatch(getReports(urlReportFilter, token))

            })
            .catch(e => {
                dispatch(assignReportFail(e))
            })
    }
}

export const assignReportStart = () => {
    return {
        type: actionTypes.ASSIGN_REPORT_START
    }
}

export const assignReportFail = (error) => {
    return {
        type: actionTypes.ASSIGN_REPORT_FAIL,
        error: error
    }
}

export const assignReportSuccess = () => {
    return {
        type: actionTypes.ASSIGN_REPORT_SUCCESS
    }
}

export const assignReportFinished = () => {
    return {
        type: actionTypes.ASSIGN_REPORT_FINISHED
    }
}

export const fetchReportToEdit = (reportData) => {
    return {
        type: actionTypes.FETCH_REPORT_TO_EDIT,
        payload: reportData
    }
}

export const editReportFinished = () => {
    return {
        type: actionTypes.EDIT_REPORT_FINISHED
    }
}