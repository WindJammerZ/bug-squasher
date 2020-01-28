import React from 'react'
import classes from './ReportHeader.module.css'

const reportHeader = (props) => {

    return (
        <li className={classes.ReportHeader}>
            <div className={classes.ReportHeaderAligner}>

                <div className={[classes.ReportItemText, classes.ReportHeaderText_Title].join(' ')}>{props.title}</div>
                <div className={[classes.ReportItemText, classes.ReportHeaderText_Description].join(' ')}>{props.description}</div>
                <div className={[classes.ReportItemText, classes.ReportHeaderText_Status].join(' ')}>{props.status}</div>
            </div>
        </li>
    )
}


export default reportHeader