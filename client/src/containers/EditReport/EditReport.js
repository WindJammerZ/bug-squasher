import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
// import PropTypes from 'prop-types'

import classes from './EditReport.module.css'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import { updateObject, checkValidity, isValidRequest} from '../../shared/utility'
import * as actions from '../../store/actions'
import { UPDATE, TITLE, DESCRIPTION, OWNER } from '../../shared/const'

class EditReport extends Component{
    state = {
        editReportForm: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                },
                value: this.props.reportData.title,
                validation: {
                    required: true
                },
                valid: true,
                touched: false,
                userPermitted: isValidRequest(UPDATE, [TITLE], this.props.userRole)
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                },
                value: this.props.reportData.description,
                validation: {
                    required: true
                },
                valid: true,
                touched: false,
                userPermitted: isValidRequest(UPDATE, [DESCRIPTION], this.props.userRole)
            },
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

    editReportHandler = (event) => {
        event.preventDefault()
        const formData = {}
        
        for(let formElementId in this.state.editReportForm){
            if(this.state.editReportForm[formElementId].userPermitted){
                formData[formElementId] = this.state.editReportForm[formElementId].value
            }
        }

         this.props.onEditReport(this.props.reportData._id, formData, this.props.token)

         this.props.editReportClosed()

    }

    inputChangedHandler = (event, inputId) => {

        const updatedFormElement = updateObject(this.state.editReportForm[inputId],{
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.editReportForm[inputId].validation),
            touched: true
        })

        const updatedEditReportForm = updateObject(this.state.editReportForm,{
            [inputId]: updatedFormElement
        })

        let formIsValid = true

        for(let inputId in updatedEditReportForm){
            formIsValid = updatedEditReportForm[inputId].valid && formIsValid
        }

        this.setState({editReportForm: updatedEditReportForm, formIsValid})

    }

    render() {

        const formElementsArray = []

        for(let key in this.state.editReportForm){
            if(this.state.editReportForm[key].userPermitted){
              formElementsArray.push({
                id: key,
                config: this.state.editReportForm[key]
            })  
            }
            
        }
           
        const form = (
            <form onSubmit={this.editReportHandler}>
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
        )            

        return (
            <div className={classes.EditReport}>
                <h4>Edit Information</h4>
                {form}
                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.editReportHandler}>SUBMIT CHANGES</Button>
                <Button btnType="Danger" disabled={false} clicked={this.props.editReportClosed}>CANCEL</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token != null,
        token: state.auth.token,
        userRole: state.auth.userRole
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onEditReport: (reportId, reportData, token) => dispatch(actions.editReport(reportId, reportData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(EditReport, axios))