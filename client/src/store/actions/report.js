import axios from '../../axios-reports'
import * as actionTypes from './actionTypes'
import {
    setupAPIData
} from '../../shared/utility'

export const addReportStart = () => {
    return {
        type: actionTypes.ADD_REPORT_START
    }
}

export const addReportFinished = () => {
    return {
        type: actionTypes.ADD_REPORT_FINISHED
    }
}

export const addReport = (reportData, token = null) => {
    return dispatch => {

        const url = `/api/reports/`
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        axios.post(url, reportData, config)
            .then(res => {
                dispatch(reportAddSuccess(res.data))
                const reloadReportsURLFilter = ''
                dispatch(getReports(reloadReportsURLFilter, token))

            })
            .catch(e => {
                dispatch(reportAddFail(e))
            })

    }
}

export const closeReport = (reportId, token = null) => {
    return dispatch => {

        const url = `/api/reports/close/${reportId}`
        const data = {}
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        axios.patch(url, data, config)
            .then(res => {
                dispatch(closeReportSuccess())
                const reloadReportsURLFilter = ''
                dispatch(getReports(reloadReportsURLFilter, token))
            })
            .catch(e => {
                dispatch(closeReportFail(e))
            })
    }
}

export const closeReportStart = () => {
    return {
        type: actionTypes.CLOSE_REPORT_START
    }
}

export const closeReportFail = (error) => {
    return {
        type: actionTypes.CLOSE_REPORT_FAIL,
        error: error
    }
}

export const closeReportSuccess = () => {
    return {
        type: actionTypes.CLOSE_REPORT_SUCCESS
    }
}

export const closeReportFinish = () => {
    return {
        type: actionTypes.CLOSE_REPORT_FINISH
    }
}

export const deleteReport = (reportId, token = null) => {
    return dispatch => {

        const url = `/api/reports/${reportId}`
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        axios.delete(url, config)
            .then(res => {
                dispatch(deleteReportSuccess())
                const reloadReportsURLFilter = ''
                dispatch(getReports(reloadReportsURLFilter, token))

            })
            .catch(e => {
                dispatch(deleteReportFail(e))
            })
    }
}

export const deleteReportStart = () => {
    return {
        type: actionTypes.DELETE_REPORT_START
    }
}

export const deleteReportFail = (error) => {
    return {
        type: actionTypes.DELETE_REPORT_FAIL,
        error: error
    }
}

export const deleteReportSuccess = () => {
    return {
        type: actionTypes.DELETE_REPORT_SUCCESS
    }
}

export const deleteReportFinished = () => {
    return {
        type: actionTypes.DELETE_REPORT_FINISH
    }
}

export const initEditReportStart = () => {
    return {
        type: actionTypes.INIT_EDIT_REPORT_START
    }
}

export const initEditReportFinish = () => {
    return {
        type: actionTypes.INIT_EDIT_REPORT_FINISH
    }
}

export const initAssignReportStart = () => {
    return {
        type: actionTypes.INIT_ASSIGN_REPORT_START
    }
}

export const initAssignReportFinish = () => {
    return {
        type: actionTypes.INIT_ASSIGN_REPORT_FINISH
    }
}

export const getReports = (filter = '', token = null) => {
    return dispatch => {
        dispatch(setReportLoading())

        let url = `/api/reports/${filter}`
        const data = {}
        const config = setupAPIData(data, token)

        axios.get(url, config)
            .then(res => {
                dispatch(reportLoadSuccess(res.data))
            })
            .catch(e => {
                dispatch(reportLoadFail(e))
            })
    }
}

export const reportAddSuccess = () => {
    return {
        type: actionTypes.ADD_REPORT_SUCCESS
    }
}

export const reportAddFail = (error) => {
    return {
        type: actionTypes.ADD_REPORT_FAIL,
        error: error
    }
}

export const reportLoadSuccess = (reportData) => {
    return {
        type: actionTypes.REPORT_LOADING_SUCCESS,
        payload: reportData
    }
}

export const reportLoadFail = (error) => {
    return {
        type: actionTypes.REPORT_LOADING_FAIL,
        error: error
    }
}

export const setReportLoading = () => {
    return {
        type: actionTypes.REPORT_LOADING
    }
}