import {
    ADMINISTRATOR
} from './const'

const {
    CREATE,
    UPDATE
} = require('./const')

const {
    USER_ROLES,
    CRUD_OPERATIONS,
    REPORT_FIELDS,
    CRUD_PERMISSIONS,
    UPDATES_PERMISSIONS
} = require('./const')

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidity = (value, rules) => {
    let isValid = true
    if (!rules) {
        return true
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid
}

export const setupAPIData = (data, token = null) => {

    if (token) {
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                data
            }
        }
    }

    return null
}

//HELPER FUNCTIONS
const isValidEdit = (allowedEdits, edits) => {
    return edits.every((edit) => allowedEdits.includes(edit))
}

const isValidRole = (allowedRoles, userRole) => {
    return (allowedRoles.includes(userRole) || (userRole === ADMINISTRATOR))
}

const isValidOperation = (allowedOperation, operation) => {
    return allowedOperation.includes(operation)
}

export const isValidRequest = (operation, updates, userRole) => {

    let allowableFlag = false
    let userValid = isValidRole(USER_ROLES, userRole)
    let operationValid = isValidOperation(CRUD_OPERATIONS, operation)
    let updateValid = isValidEdit(REPORT_FIELDS, updates)
    let returnObject = {
        requestValid: false,
        msg: ''
    }

    if (!userValid || !operationValid) {
        returnObject.msg = `Invalid user or operation.  Please correct and try again.`
        return returnObject
    }

    if (operation === UPDATE || operation === CREATE) {
        if (!updateValid) {
            returnObject.msg = `Invalid operation.  Please correct and try again.`
            return returnObject
        }
    }

    if (userRole === ADMINISTRATOR) {
        returnObject.requestValid = true
        returnObject.msg = 'Administrator control.'
        return returnObject
    }

    const flagObj = CRUD_PERMISSIONS.find(permission => permission.allowedRole === userRole)
    let canDoUpdate = flagObj.allowedOperations.includes(operation)
    let updatesFlag = true
    if (operation === UPDATE) {
        const updateFlagObj = UPDATES_PERMISSIONS.find(permission => permission.allowedRole === userRole)
        updatesFlag = true

        updates.forEach((update) => {
            const updateIsAllowed = updateFlagObj.allowedUpdates.includes(update)
            updatesFlag = updateIsAllowed && updatesFlag
        })
    }

    allowableFlag = canDoUpdate && updatesFlag

    returnObject.requestValid = allowableFlag

    if (!allowableFlag) {
        returnObject.msg = `Invalid operation.  You do not have permission to perform this operation.  Please contact your administrator.`
    } else {
        returnObject.msg = `Valid operation.`
    }

    return returnObject.requestValid

}

export const multiQueryURL = (url, queries) => {
    let queryString = url + '?'

    queries.forEach(query => queryString += `&${query.searchTerm}=${query.searchValue}`)

    return queryString
}