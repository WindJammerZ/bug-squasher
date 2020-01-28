import * as actionTypes from '../actions/actionTypes'
import {
    updateObject
} from '../../shared/utility'
import {
    ADDING_REPORT,
    ASSIGNING_REPORT,
    EDITING_REPORT,
    DELETING_REPORT,
    CLOSING_REPORT
} from '../../shared/const'

const initialState = {
    reports: [],
    loading: false,
    reportActionStatus: null
}

const addReportStart = (state, action) => {
    return updateObject(state, {
        reportActionStatus: ADDING_REPORT
    })
}

const addReportFail = (state, action) => {
    return updateObject(state, {
        reportActionStatus: null
    })
}

const addReportSuccess = (state, action) => {
    return updateObject(state, {
        reportActionStatus: null
    })
}

const addReportFinished = (state, action) => {
    return updateObject(state, {
        reportActionStatus: null
    })
}

const closeReportStart = (state, action) => {
    return updateObject(state, {
        reportActionStatus: CLOSING_REPORT
    })
}

const closeReportFail = (state, action) => {
    return updateObject(state, {
        reportActionStatus: null
    })
}

const closeReportSuccess = (state, action) => {
    return updateObject(state, {
        reportActionStatus: null
    })
}

const closeReportFinished = (state, action) => {
    return updateObject(state, {
        reportActionStatus: null
    })
}

const deleteReportStart = (state, action) => {
    return updateObject(state, {
        reportActionStatus: DELETING_REPORT
    })
}

const deleteReportFail = (state, action) => {
    return updateObject(state, {
        reportActionStatus: null
    })
}

const deleteReportFinished = (state, action) => {
    return updateObject(state, {
        reportActionStatus: null
    })
}

const deleteReportSuccess = (state, action) => {
    return updateObject(state, {
        reportActionStatus: null
    })
}

const initAssignReportStart = (state, action) => {
    return updateObject(state, {
        reportActionStatus: ASSIGNING_REPORT
    })
}

const initAssignReportFinished = (state, action) => {
    return updateObject(state, {
        reportActionStatus: null
    })
}

const initEditReportStart = (state, action) => {
    return updateObject(state, {
        reportActionStatus: EDITING_REPORT
    })
}

const initEditReportFinished = (state, action) => {
    return updateObject(state, {
        reportActionStatus: null
    })
}

const reportLoadingFail = (state, action) => {
    return updateObject(state, {
        loading: false
    })
}

const reportLoadingSuccess = (state, action) => {
    return updateObject(state, {
        reports: action.payload,
        loading: false
    })
}

const reportLoading = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_REPORT_START:
            return addReportStart(state, action)
        case actionTypes.ADD_REPORT_FAIL:
            return addReportFail(state, action)
        case actionTypes.ADD_REPORT_SUCCESS:
            return addReportSuccess(state, action)
        case actionTypes.ADD_REPORT_FINISHED:
            return addReportFinished(state, action)
        case actionTypes.CLOSE_REPORT_START:
            return closeReportStart(state, action)
        case actionTypes.CLOSE_REPORT_FAIL:
            return closeReportFail(state, action)
        case actionTypes.CLOSE_REPORT_SUCCESS:
            return closeReportSuccess(state, action)
        case actionTypes.CLOSE_REPORT_FINISH:
            return closeReportFinished(state, action)
        case actionTypes.DELETE_REPORT_START:
            return deleteReportStart(state, action)
        case actionTypes.DELETE_REPORT_FAIL:
            return deleteReportFail(state, action)
        case actionTypes.DELETE_REPORT_FINISH:
            return deleteReportFinished(state, action)
        case actionTypes.DELETE_REPORT_SUCCESS:
            return deleteReportSuccess(state, action)
        case actionTypes.INIT_ASSIGN_REPORT_START:
            return initAssignReportStart(state, action)
        case actionTypes.INIT_ASSIGN_REPORT_FINISH:
            return initAssignReportFinished(state, action)
        case actionTypes.INIT_EDIT_REPORT_START:
            return initEditReportStart(state, action)
        case actionTypes.INIT_EDIT_REPORT_FINISH:
            return initEditReportFinished(state, action)
        case actionTypes.REPORT_LOADING_FAIL:
            return reportLoadingFail(state, action)
        case actionTypes.REPORT_LOADING_SUCCESS:
            return reportLoadingSuccess(state, action)
        case actionTypes.REPORT_LOADING:
            return reportLoading(state, action)
        default:
            return state

    }
}

export default reducer