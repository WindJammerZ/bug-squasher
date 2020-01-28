import React from 'react'
import classes from './ReportItem.module.css'

const reportItem = (props) => {

    const reportItemClass = props.status === 'closed' ? [classes.ReportItem, classes.ReportItemClosed].join(' ') : classes.ReportItem

    return (
        <li className={reportItemClass} onClick={() => props.reportPageShow(props.id)}>

            <div className={classes.ReportItemTextArea} >
                <div className={[classes.ReportItemText, classes.ReportItemText_Title].join(' ')}>{props.title}</div>
                <div className={[classes.ReportItemText, classes.ReportItemText_Description].join(' ')}>{props.description}</div>
                <div className={[classes.ReportItemText, classes.ReportItemText_Status].join(' ')}>{props.status}</div>
            </div>

        </li>
    )
}


export default reportItem