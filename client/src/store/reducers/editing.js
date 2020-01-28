import * as actionTypes from '../actions/actionTypes'
import {
    updateObject
} from '../../shared/utility'

const initialState = {
    reportData: {},
    owner: null,
    loadingReport: false,
    loadingOwner: false,
    loadingOwners: false,
    assigning: false,
    readyToAssign: false,
    assignSuccess: false,
    editing: false,
    readyToEdit: false,
    editSuccess: false,
    error: null
}

const getOwnerStart = (state, action) => {
    return updateObject(state, {
        loadingOnwer: true
    })
}

const getOwnerFail = (state, action) => {
    return updateObject(state, {
        loadingOnwer: false,
        error: action.error
    })
}

const getOwnerSuccess = (state, action) => {
    return updateObject(state, {
        owner: action.payload,
        loadingOwner: false
    })
}

const assignReportStart = (state, action) => {
    return updateObject(state, {
        assigning: true,
        readyToAssign: true,
        assignSuccess: false
    })
}

const assignReportSuccess = (state, action) => {
    return updateObject(state, {
        assigning: false,
        readyToAssign: false,
        assignSuccess: true
    })
}

const assignReportFail = (state, action) => {
    return updateObject(state, {
        assigning: false,
        assignSuccess: false,
        error: action.error
    })
}

const assignReportFinished = (state, action) => {
    return updateObject(state, {
        assignSuccess: true
    })
}

const editReportStart = (state, action) => {
    return updateObject(state, {
        editing: true,
        readyToEdit: true,
        editSuccess: false
    })
}

const editReportSuccess = (state, action) => {
    return updateObject(state, {
        editing: false,
        readyToEdit: false,
        editSuccess: true
    })
}

const editReportFail = (state, action) => {
    return updateObject(state, {
        editing: false,
        readyToEdit: false,
        editSuccess: false,
        error: action.error
    })
}

const editReportFinished = (state, action) => {
    return updateObject(state, {
        readyToEdit: false,
        editSuccess: true
    })
}

const fetchReportToEdit = (state, action) => {
    return updateObject(state, {
        reportData: action.payload
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_OWNER_START:
            return getOwnerStart(state, action)
        case actionTypes.GET_OWNER_FAIL:
            return getOwnerFail(state, action)
        case actionTypes.GET_OWNER_SUCCESS:
            return getOwnerSuccess(state, action)
        case actionTypes.ASSIGN_REPORT_START:
            return assignReportStart(state, action)
        case actionTypes.ASSIGN_REPORT_SUCCESS:
            return assignReportSuccess(state, action)
        case actionTypes.ASSIGN_REPORT_FAIL:
            return assignReportFail(state, action)
        case actionTypes.ASSIGN_REPORT_FINISHED:
            return assignReportFinished(state, action)
        case actionTypes.EDIT_REPORT_START:
            return editReportStart(state, action)
        case actionTypes.EDIT_REPORT_SUCCESS:
            return editReportSuccess(state, action)
        case actionTypes.EDIT_REPORT_FAIL:
            return editReportFail(state, action)
        case actionTypes.EDIT_REPORT_FINISHED:
            return editReportFinished(state, action)
        case actionTypes.FETCH_REPORT_TO_EDIT:
            return fetchReportToEdit(state, action)
        default:
            return state
    }
}

export default reducer