const express = require('express')
const router = new express.Router
const auth = require('../middleware/auth')
const Report = require('../models/report')
const User = require('../models/user')
const {
    ADMINISTRATOR,
    DEVELOPER_USER,
    GENERAL_USER,
    CREATE,
    UPDATE,
    DELETE
} = require('../utils/consts')

const {
    USER_ROLES,
    CRUD_OPERATIONS,
    USER_FIELDS,
    REPORT_FIELDS,
    CRUD_PERMISSIONS,
    UPDATES_PERMISSIONS
} = require('../utils/consts')

const {
    ASSIGNED,
    OWNER,
    STATUS
} = require('../utils/consts')

const {
    isValidRole
} = require('../utils/utility')

//Report creation
//@user: all
router.post('/', auth, async (req, res) => {

    const admin = await User.findOne({
        role: ADMINISTRATOR
    })



    if (!admin) {
        throw new Error(`Not able to complete this operation.  Please contact administrator.  Adminstrator is not assigned.`)
    }

    const report = new Report({
        ...req.body,
        // owner: admin._id,
        owner: {
            name: admin.name,
            id: admin._id
        },
        // creator: req.user._id
        creator: {
            name: req.user.name,
            id: req.user._id
        }
    })

    try {
        await report.save()
        res.status(201).send(report)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Read all reports
//@user: all
//example usage:
//GET /reports?status=closed
router.get('/', async (req, res) => {
    try {
        const reports = await Report.find({}, null, {
            ...createSearchOptions(req)
        })
        res.send(reports)
    } catch (e) {
        res.status(500).send()
    }
})

//Read all reports associated with me (creator/owner)
//@user: all
//example usage:
//GET /reports?status=closed
router.get('/me', auth, async (req, res) => {

    try {
        await req.user
            .populate({
                path: 'creator'

            })
            .populate({
                path: 'owner'
            })
            .execPopulate()

        const sendReq = removeDuplicateObjectsByID([...req.user.creator, ...req.user.owner])
        res.send(sendReq)
    } catch (e) {
        res.status(500).send()
    }

})

//Read specific report
//@user: all
router.get('/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const report = await Report.findOne({
            _id
        })

        if (!task) {
            return res.status(404).send()
        }

        res.send(report)
    } catch (e) {
        res.status(500).send()

    }
})

//Update report fields
//@user: all
router.patch('/edit_fields/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const userRole = req.user.role
    let newOwner = {}
    const operation = UPDATE
    const validRequest = isValidRequest(operation, updates, userRole)

    if (!validRequest.requestValid) {
        return res.status(400).send({
            message: validRequest.msg
        })
    }

    try {
        const report = await Report.findOne({
            _id: req.params.id
        })

        if (!report) {
            return res.status(404).send()
        }

        if (updates.includes(OWNER)) {
            newOwner = await User.findById({
                _id: req.body.owner
            })
        }

        updates.forEach((update) => {
            if (update === OWNER) {
                report[ASSIGNED] = true
                report[STATUS] = `Assigned`
                // const newOwner = await User.findById({
                //     _id: req.body._id
                // })
                report[OWNER] = {
                    name: newOwner.name,
                    id: newOwner._id
                }
                return
            }
            report[update] = req.body[update]
        })

        await report.save()
        res.send(report)

    } catch (e) {
        res.status(400).send(e)
    }
})

//Assign an owner to a report
//@user: maintenance/developer
router.patch('/assign/:id', auth, async (req, res) => {
    const userRole = req.user.role
    const userId = req.user._id
    const userToFind = await User.findById({
        _id: req.body[OWNER]
    })
    const userToAssign = {
        name: userToFind.name,
        id: userToFind._id
    }
    const operation = UPDATE
    const updatesKeys = [ASSIGNED, OWNER, STATUS]

    const updatesValues = [true, userToAssign, "Assigned"]

    const editsToApply = updatesValues.reduce((acc, cur, i) => {
        return {
            ...acc,
            [updatesKeys[i]]: cur
        }
    }, {})

    const validRequest = isValidRequest(operation, updatesKeys, userRole)
    const canUpdate = isValidAssignment(userRole, userId, userToAssign.id)

    if (!validRequest.requestValid) {
        return res.status(400).send({
            message: validRequest.msg
        })
    }

    if (!canUpdate) {
        return res.status(400).send({
            message: "Cannot perform this update to assigning owner.  Contact your adminstrator."
        })
    }


    try {
        const report = await Report.findOne({
            _id: req.params.id
        })

        if (!report) {
            return res.status(404).send()
        }

        updatesKeys.forEach((update) => {

            if (update === OWNER) {
                report[OWNER] = {
                    ...userToAssign
                }
                return
            }

            report[update] = editsToApply[update]
        })

        await report.save()
        res.send(report)

    } catch (e) {
        res.status(400).send(e)
    }

})

//Close out a report
//@user: maintenance/developer
router.patch('/close/:id', auth, async (req, res) => {
    const updates = [STATUS]
    const userRole = req.user.role
    const operation = UPDATE
    const status = 'closed'

    const validRequest = isValidRequest(operation, updates, userRole)

    if (!validRequest.requestValid) {
        return res.status(400).send({
            message: validRequest.msg
        })
    }

    try {
        const report = await Report.findOne({
            _id: req.params.id
        })

        if (!report) {
            return res.status(404).send()
        }
        updates.forEach((update) => report[update] = status)

        await report.save()
        res.send(report)

    } catch (e) {
        res.status(400).send(e)
    }

})

//Report delete
//@user:  maintenance/developer
router.delete('/:id', auth, async (req, res) => {
    const userRole = req.user.role
    const operation = DELETE
    const updates = []
    const validRequest = isValidRequest(operation, updates, userRole)

    if (!validRequest.requestValid) {
        return res.status(400).send({
            message: validRequest.msg
        })
    }

    try {
        const report = await Report.findOneAndDelete({
            _id: req.params.id
        })

        if (!report) {
            return res.status(404).send()
        }

        res.send(report)
    } catch (e) {
        return res.status(500).send()
    }
})

//HELPER FUNCTIONS
const isValidEdit = (allowedEdits, edits) => {
    return edits.every((edit) => allowedEdits.includes(edit))
}

const isValidOperation = (allowedOperation, operation) => {
    return allowedOperation.includes(operation)
}

const isValidRequest = (operation, updates, userRole) => {

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

    if (userRole === 'administrator') {
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

    return returnObject

}

const isValidAssignment = (userRole, userId, userToAssign) => {

    switch (userRole) {
        case ADMINISTRATOR:
            return true
        case DEVELOPER_USER:
            break
        case GENERAL_USER:
            return false
        default:
            return false
    }

    if (userId.equals(userToAssign)) {
        return true
    }

    return false

}

const createSearchOptions = (req) => {
    const options = {}
    const sort = {}

    if (req.query.status) {
        match.status = req.query.status
    }

    if (req.query.sortBy) {
        const terms = req.query.sortBy.split(':')
        sort[terms[0]] = terms[1] === 'desc' ? -1 : 1
    }

    return [options, sort]
}

const removeDuplicateObjectsByID = (arrayToFilter) => {
    const newArray = arrayToFilter.filter((element, index, currentArray) => currentArray.findIndex(currentElement => currentElement._id.toString() === element._id.toString()) === index)
    newArray.sort((a, b) => a.createdAt - b.createdAt)
    return newArray
}

module.exports = router