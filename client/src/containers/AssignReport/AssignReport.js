import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import classes from './AssignReport.module.css'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import { updateObject, checkValidity, isValidRequest} from '../../shared/utility'
import * as actions from '../../store/actions'
import { DEVELOPER_USER, ADMINISTRATOR, UPDATE, OWNER } from '../../shared/const'

class AssignReport extends Component{
    state = {
        assignReportForm: {
            owner: {
                elementType: 'select',
                elementConfig: {
                    options: this.props.owners
                },
                value: this.props.reportData.owner,
                displayValue: this.props.owner,
                validation: {
                    required: true
                },
                valid: true,
                touched: false,
                userPermitted: isValidRequest(UPDATE, [OWNER], this.props.userRole)
            }
        },
        formIsValid: true
    }

    assignReportHandler = (event) => {
        event.preventDefault()
        const formData = {}
       
        for(let formElementId in this.state.assignReportForm){
            if(this.props.userRole === ADMINISTRATOR){
                formData[formElementId] = this.state.assignReportForm[formElementId].value
            }else{
                // formData[formElementId] = this.props.owners.find(element => element.value === this.props.userId).value
                formData[formElementId] = this.props.userId
            }
        }

        this.props.onAssignReport(this.props.reportData._id, formData, this.props.token)

        this.props.assignReportClosed()

    }

    inputChangedHandler = (event, inputId) => {

        const updatedFormElement = updateObject(this.state.assignReportForm[inputId],{
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.assignReportForm[inputId].validation),
            touched: true
        })

        const updatedAssignReportForm = updateObject(this.state.assignReportForm,{
            [inputId]: updatedFormElement
        })

        let formIsValid = true

        for(let inputId in updatedAssignReportForm){
            formIsValid = updatedAssignReportForm[inputId].valid && formIsValid
        }

        this.setState({assignReportForm: updatedAssignReportForm, formIsValid})

    }

    formUpdate = () => {


        const formElementsArray = []

        for(let key in this.state.assignReportForm){
            if(this.state.assignReportForm[key].userPermitted){
              formElementsArray.push({
                id: key,
                config: this.state.assignReportForm[key]
            })  
            }
            
        }

        switch(this.props.userRole){
            case ADMINISTRATOR:
                return (
                    <React.Fragment>
                         <h2>Assign Report to a User</h2>

                         <form onSubmit={this.assignReportHandler}>
                            {formElementsArray.map(formElement => (
                                <Input
                                    key={formElement.id}
                                    label={formElement.id}
                                    elementType={formElement.config.elementType}
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value}
                                    invalid={!formElement.config.valid}
                                    shouldValidate={formElement.config.validation}
                                    touched={formElement.config.touched}
                                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                />
                            ))}                
                        </form> 
                    </React.Fragment>)

            case DEVELOPER_USER:
                return (
                    <React.Fragment>
                        <h2>Assign Yourself to this report?</h2>

                         <form onSubmit={this.assignReportHandler}>

                        </form>
                    </React.Fragment>

                )
            default:
                return null
        }
    }

    render() {

        let form = this.formUpdate()              

        return (
            <div className={classes.AssignReport}>
                {form}
                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.assignReportHandler}>CONTINUE</Button>
                <Button btnType="Danger" disabled={false} clicked={this.props.assignReportClosed}>CANCEL</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token != null,
        token: state.auth.token,
        userRole: state.auth.userRole,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAssignReport: (reportId, reportData, token) => dispatch(actions.assignReport(reportId, reportData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(AssignReport, axios))