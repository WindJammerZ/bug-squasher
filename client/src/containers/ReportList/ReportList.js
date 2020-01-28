import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import axios from '../../axios-reports'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import classes from './ReportList.module.css'

import ReportHeader from '../../components/ReportHeader/ReportHeader'
import ReportItem from '../../components/ReportItem/ReportItem'
import ReportItemPage from '../../components/ReportItemPage/ReportItemPage'
import Modal from '../../components/UI/Modal/Modal'
import Button from '../../components/UI/Button/Button'
import AddReport from '../AddReport/AddReport'
import EditReport from '../EditReport/EditReport'
import DeleteReport from '../DeleteReport/DeleteReport'
import CloseReport from '../CloseReport/CloseReport'
import AssignReport from '../AssignReport/AssignReport'
import Spinner from '../../components/UI/Spinner/Spinner'

import * as actions from '../../store/actions/index'

import {CLOSING_REPORT, ASSIGNING_REPORT} from '../../shared/const'
import {ADDING_REPORT, DELETING_REPORT, EDITING_REPORT} from '../../shared/const'

class ReportList extends Component{
 
    state = {
        reportsFilter: '',
        showReportItemPage: false,
        idSelected: null
    }
    
    componentDidMount(){
        this.props.onInitReports()
        this.props.onAppLoad()

    }

    //TODO: optimize rendering with shouldComponentUpdate()
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(`In shouldComponentUpdate()`)
    //     console.log(nextProps)
    //     console.log(nextState)
    //     console.log(nextProps.reports)
    //     console.log(this.props.reports)
    //     return (!this.compareProps(this.props.reports, nextProps.reports))
    // }

    compareProps = (currentArr, nextArr) => {
        let identicalOjb = true
        currentArr.forEach((el, i) => {
            for (var property in el){
                const isSame = nextArr[i][property] === el[property]
                identicalOjb = isSame && identicalOjb
            }
        })
        return identicalOjb
    }

    filterReports = () => {
        switch(this.state.reportsFilter){
            case 'me':
                return this.props.reports.filter(report => report.creator.id === this.props.userId || report.owner.id === this.props.userId)
            case '':
                return this.props.reports
            default:
                return this.props.reports
        }
    }

    reportsFilterHandler = filter => {
        this.setState({
            reportsFilter: filter
        })
    }

    addReportHandler = () => {
        this.props.onAddReportStart()

        this.setState({
            showReportItemPage: false
        })

    }
    
    addReportClosedHandler = () => {
        this.props.onAddReportFinished()
    }

    deleteReportHandler = (reportId) => {
        this.setState({
            idSelected: reportId,
            showReportItemPage: false
        })
        this.props.onDeleteReportStart()
    }

    deleteReportClosedHandler = () => {
        this.setState({
            idSelected: null
        })

        this.props.onDeleteReportFinished()
    }

    editReportHandler = (reportId) => {
        this.setState({
            showReportItemPage: false

        })

        const reportToEdit = this.props.reports.find(report => report._id === reportId)
        this.props.onFetchReportToEdit(reportToEdit)

        this.props.onFindOwner(reportToEdit.owner.id)
        this.props.onEditReportStart()
    }

    editReportClosedHandler = () => {
        this.props.onEditReportFinished()

        if(this.props.editSuccess){
            this.props.onGetReportsClick('', this.props.token)
        }
    }

    closeReportHandler = (reportId) => {
        this.setState({
            idSelected: reportId,
            closingReport: true,
            showReportItemPage: false

        })
        this.props.onCloseReportStart()
    }

    closeReportClosedHandler = () => {
        this.setState({
            idSelected: null,
            closingReport: false
        })

        this.props.onCloseReportFinish()
    }

    assignReportHandler = (reportId) => {
        this.setState({
            showReportItemPage: false
        })

        const reportToEdit = this.props.reports.find(report => report._id === reportId)
        this.props.onFetchReportToEdit(reportToEdit)

        this.props.onFindOwner(reportToEdit.owner.id)
        this.props.onAssignReportStart()
    }

    assignReportClosedHandler = () => {
        this.props.onAssignReportFinished()
        if(this.props.assignSuccess){
            this.props.onGetReportsClick('', this.props.token)
        }
    }

    showReportItemPageHandler = (reportId) => {
        const reportToShow = this.props.reports.find(report => report._id === reportId)
        this.setState({
            showReportItemPage: true,
            reportToShow: reportToShow
        })
    }

    showReportItemPageClosedHandler = () => {
        this.setState({
            showReportItemPage: false,
            reportToShow: null
        })
    }

    render(){
        let panelButtons = null
        let reportsSection =  <Spinner/>
       
        if(this.props.appReady && !this.props.loading){

            const reportsToList = this.filterReports()

            reportsSection = reportsToList.map(report => (
                <ReportItem
                    key={report._id}
                    id={report._id}
                    title={report.title}
                    description={report.description}
                    assigned={report.assigned}
                    status={report.status}
                    creator={report.creator}
                    owner={report.owner}
                    user={this.props.userId}
                    userRole={this.props.userRole}
                    reportPageShow={(id) => {this.showReportItemPageHandler(id)}}
                    reportRemoved={(id) => {this.deleteReportHandler(id)}}
                    reportEdited={(id) => {this.editReportHandler(id)}}
                    reportClosed={(id) => {this.closeReportHandler(id)}}
                    reportAssigned={(id) => {this.assignReportHandler(id)}}
                />
            ))
        }

        // if(this.props.isAuthenticated){
            panelButtons = (
                <div className={classes.ButtonsPanel}>
                    <Button btnType='PanelButton' disabled={!this.props.isAuthenticated} clicked={() => this.reportsFilterHandler('')}>ALL REPORTS</Button>  
                    <Button btnType='PanelButton' disabled={!this.props.isAuthenticated} clicked={() => this.reportsFilterHandler('me')}>MY REPORTS</Button>
                    <Button btnType="PanelButton" disabled={!this.props.isAuthenticated} clicked={this.addReportHandler}>NEW REPORT</Button>
                </div>
            )
        // }

        let addReport = null
        let editReport = null
        let assignReport = null
        let reportItemPage = null

        if(this.props.reportActionStatus === ADDING_REPORT){
            addReport = <AddReport
                addReportClosed={this.addReportClosedHandler}/>
        }

        if(this.props.reportActionStatus === ASSIGNING_REPORT){
            assignReport = <AssignReport
                reportData={this.props.reportToEdit}
                owner={this.props.owner}
                owners={this.props.owners}
                assignReportClosed={this.assignReportClosedHandler}/>
        }

        if(this.props.reportActionStatus === EDITING_REPORT){
            editReport = <EditReport
                reportData={this.props.reportToEdit}
                owner={this.props.owner}
                owners={this.props.owners}
                editReportClosed={this.editReportClosedHandler}/>
        }

        const deleteReport = <DeleteReport
            id={this.state.idSelected}
            deleteReportClosed={this.deleteReportClosedHandler}/>

        const closeReport = <CloseReport
            id={this.state.idSelected}
            closeReportClosed={this.closeReportClosedHandler}/>

        if(this.state.showReportItemPage){
           
            reportItemPage = <ReportItemPage
                id={this.state.reportToShow._id}
                title={this.state.reportToShow.title}
                description={this.state.reportToShow.description}
                assigned={this.state.reportToShow.assigned}
                status={this.state.reportToShow.status}
                creator={this.state.reportToShow.creator}
                owner={this.state.reportToShow.owner}
                user={this.props.userId}
                userRole={this.props.userRole}
                reportExit={() => {this.showReportItemPageClosedHandler()}}
                reportRemoved={(id) => {this.deleteReportHandler(id)}}
                reportEdited={(id) => {this.editReportHandler(id)}}
                reportClosed={(id) => {this.closeReportHandler(id)}}
                reportAssigned={(id) => {this.assignReportHandler(id)}}
            />
        }

        return(
            <React.Fragment>

                <Modal
                    show={this.state.showReportItemPage}
                    modalClosed={this.showReportItemPageClosedHandler}>
                    {reportItemPage}
                </Modal>

                <Modal
                    show={this.props.reportActionStatus === ADDING_REPORT}
                    modalClosed={this.addReportClosedHandler}
                    >
                    {addReport}
                </Modal>

                <Modal
                    show={this.props.reportActionStatus === ASSIGNING_REPORT}
                    modalClosed={this.assignReportClosedHandler}
                >
                    {assignReport}
                </Modal>

                <Modal
                    show={this.props.reportActionStatus === EDITING_REPORT}
                    modalClosed={this.editReportClosedHandler}
                    >
                    {editReport}
                </Modal>

                <Modal
                    show={this.props.reportActionStatus === DELETING_REPORT}
                    modalClosed={this.deleteReportClosedHandler}>
                    {deleteReport}
                </Modal>

                <Modal
                    show={this.props.reportActionStatus === CLOSING_REPORT}
                    modalClosed={this.closeReportClosedHandler}>
                    {closeReport}
                </Modal>

                {panelButtons}

                <ul className={classes.ReportList}>
                    <ReportHeader
                        title='Title'
                        description='Description'
                        status='Status'/>

                     {reportsSection}

                </ul>

            </React.Fragment>

        )
    }
}

ReportList.proptype ={
    getReports: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return{
        reports: state.reports.reports,
        isAuthenticated: state.auth.token != null,
        token: state.auth.token,
        userRole: state.auth.userRole,
        userId: state.auth.userId,
        reportToEdit: state.edit.reportData,
        readyToEdit: state.edit.readyToEdit,
        editSuccess: state.edit.editSuccess,
        editing: state.edit.editing,
        assigning: state.edit.assigning,
        assignSuccess: state.edit.assignSuccess,
        reportActionStatus: state.reports.reportActionStatus,
        owners: state.init.owners,
        appReady: state.init.appLoaded,
        loading: state.reports.loading,
        appLoading: state.init.appLoading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onInitReports: () => dispatch(actions.getReports()),
        onAppLoad: () => dispatch(actions.initApp()),
        onGetReportsClick: (filter, token) => dispatch(actions.getReports(filter, token)),
        onAddReportStart: () => dispatch(actions.addReportStart()),
        onAddReportFinished: () => dispatch(actions.addReportFinished()),
        onEditReportStart: () => dispatch(actions.initEditReportStart()),
        onAssignReportStart: () => dispatch(actions.initAssignReportStart()),
        onDeleteReportStart: () => dispatch(actions.deleteReportStart()),
        onDeleteReportFinished: () => dispatch(actions.deleteReportFinished()),
        onDeleteReportClick: (reportId, token) => dispatch(actions.deleteReport(reportId, token)),
        onFindOwner: (ownerId) => dispatch(actions.getOwner(ownerId)),
        onFindRole: (ownerRole) => dispatch(actions.getRole(ownerRole)),
        onFetchReportToEdit: (reportData) => dispatch(actions.fetchReportToEdit(reportData)),
        onAssignReportFinished: () => dispatch(actions.initAssignReportFinish()),
        onEditReportFinished: () => dispatch(actions.initEditReportFinish()),
        onCloseReportStart: () => dispatch(actions.closeReportStart()),
        onCloseReportFinish: () => dispatch(actions.closeReportFinish())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ReportList, axios))