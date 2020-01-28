import React, {Component} from 'react'
import axios from 'axios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'

import classes from './CloseReport.module.css'

import Button from '../../components/UI/Button/Button'
import * as actions from '../../store/actions/report'

class CloseReport extends Component{

    closeReportHandler = () => {

         this.props.onCloseReport(this.props.id, this.props.token)
         this.props.closeReportClosed()

    }

     render() {

        return (
            <div className={classes.CloseReport}>
                <h2>Are you sure you want to close out this report?</h2>
                <Button btnType="Success" disabled={false} clicked={this.closeReportHandler}>CONTINUE</Button>
                 <Button btnType="Danger" disabled={false} clicked={this.props.closeReportClosed}>CANCEL</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token != null,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onCloseReport: (reportId, token) => dispatch(actions.closeReport(reportId, token))
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(CloseReport,axios))