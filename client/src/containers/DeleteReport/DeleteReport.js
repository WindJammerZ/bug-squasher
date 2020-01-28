import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import classes from './DeleteReport.module.css'

import Button from '../../components/UI/Button/Button'
import * as actions from '../../store/actions/report'

class DeleteReport extends Component{

    deleteReportHandler = () => {

         this.props.onDeleteReport(this.props.id, this.props.token)
         this.props.deleteReportClosed()

    }

     render() {

        return (
            <div className={classes.DeleteReport}>
                <h2>Are you sure you want to delete this report?</h2>
                <Button btnType="Success" disabled={false} clicked={this.deleteReportHandler}>CONTINUE</Button>
                 <Button btnType="Danger" disabled={false} clicked={this.props.deleteReportClosed}>CANCEL</Button>
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
        onDeleteReport: (reportId, token) => dispatch(actions.deleteReport(reportId, token))
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(DeleteReport,axios))