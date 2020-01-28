import React from 'react'
import classes from './ReportItemPage.module.css'
import Button from '../UI/Button/Button'

import {
    ADMINISTRATOR,
    DEVELOPER_USER,
    GENERAL_USER
} from '../../shared/const'

const EDIT_BUTTON = 'EDIT_BUTTON'
const ASSIGN_BUTTON = 'ASSIGN_BUTTON'
const CLOSE_BUTTON = 'CLOSE_BUTTON'
const DELETE_BUTTON = 'DELETE_BUTTON'

const arrangeActionButtons = (userRole, buttonName) => {
    switch (userRole) {
        case ADMINISTRATOR:
            return true
        case DEVELOPER_USER:
            switch (buttonName) {
                case EDIT_BUTTON:
                    return true
                case ASSIGN_BUTTON:
                    return true
                case CLOSE_BUTTON:
                    return true
                default:
                    return false
            }
        case GENERAL_USER:
            switch (buttonName) {
                case EDIT_BUTTON:
                    return true
                default:
                    return false
            }
        default:
            return false
    }
}

const disabledButton = (userRole, buttonName, status, assigned, ownerId, userId, creatorId) => {
    switch (userRole) {
        case ADMINISTRATOR:
            if(status === 'closed'){
                if(buttonName === ASSIGN_BUTTON) return true
            }
            return false
        case DEVELOPER_USER:
            if(status === 'closed') return true
            switch (buttonName) {
                case EDIT_BUTTON:
                    if(userId !== ownerId) return true
                    return false
                case ASSIGN_BUTTON:
                    if((assigned && userId !== ownerId) || userId === ownerId) return true
                    return false
                case CLOSE_BUTTON:
                    if(userId !== ownerId) return true
                    return false
                default:
                    return true
            }
        case GENERAL_USER:
            switch (buttonName) {
                case EDIT_BUTTON:
                    if(assigned || userId !== creatorId) return true
                    return false
                default:
                    return true
            }
        default:
            return true
    }
}

const reportItemPage = (props) => {

    const editButton = arrangeActionButtons(props.userRole, EDIT_BUTTON)
        ?   <Button
                btnType='EditButton'
                disabled={disabledButton(props.userRole, EDIT_BUTTON, props.status, props.assigned, props.owner.id, props.user, props.creator.id)}
                clicked = {() => props.reportEdited(props.id)}>EDIT</Button>
        :   null
    const assignButton = arrangeActionButtons(props.userRole, ASSIGN_BUTTON)
        ?   <Button
                btnType='AssignButton'
                disabled={disabledButton(props.userRole, ASSIGN_BUTTON, props.status, props.assigned, props.owner.id, props.user, props.creator.id)}
                clicked={() => props.reportAssigned(props.id)}>ASSIGN</Button>
        :   null
    const closeButton = arrangeActionButtons(props.userRole, CLOSE_BUTTON)
        ?   <Button
                btnType='CloseButton'
                disabled={disabledButton(props.userRole, CLOSE_BUTTON, props.status, props.assigned, props.owner.id, props.user, props.creator.id)}
                clicked={() => props.reportClosed(props.id)}>CLOSE</Button>
        :   null
    const deleteButton = arrangeActionButtons(props.userRole, DELETE_BUTTON)
        ?   <Button
                btnType='DeleteButton'
                disabled={false}
                clicked={() => props.reportRemoved(props.id)}>DELETE</Button>
        :   null

    return (
        <div className={classes.ReportItemPage}>

            <div className={classes.ReportItemPageTextArea}>
                <div className={classes.ReportItemPageText}><strong>Title: </strong>{props.title}</div>
                <div className={classes.ReportItemPageText}><strong>Description: </strong>{props.description}</div>
                <div className={classes.ReportItemPageText}><strong>Status: </strong>{props.status}</div>
                <div className={classes.ReportItemPageText}><strong>Assigned: </strong>{props.assigned ? "Yes":"No"}</div>
                <div className={classes.ReportItemPageText}><strong>Owner: </strong>{props.owner.name}</div>
                <div className={classes.ReportItemPageText}><strong>Creator: </strong>{props.creator.name}</div>
            </div>

            <div className={classes.ActionButtonsArea}>
                {editButton}
                {assignButton}
                {closeButton}
                {deleteButton}
            </div>

        </div>
    )
}

export default reportItemPage