import React, {
    Component
} from 'react'
import {
    connect
} from 'react-redux'

import classes from './AddReport.module.css'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import {
    updateObject,
    checkValidity
} from '../../shared/utility'
import * as actions from '../../store/actions/report'

class AddReport extends Component {
    state = {
        addReportForm: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Title for bug...'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Description...'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

    addReportHandler = (event) => {
        event.preventDefault()
        const formData = {}

        for (let formElementId in this.state.addReportForm) {
            formData[formElementId] = this.state.addReportForm[formElementId].value
        }

        this.props.onAddReport(formData, this.props.token)

        this.props.addReportClosed()

    }

    inputChangedHandler = (event, inputId) => {

        const updatedFormElement = updateObject(this.state.addReportForm[inputId], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.addReportForm[inputId].validation),
            touched: true
        })

        const updatedAddReportForm = updateObject(this.state.addReportForm, {
            [inputId]: updatedFormElement
        })

        let formIsValid = true

        for (let inputId in updatedAddReportForm) {
            formIsValid = updatedAddReportForm[inputId].valid && formIsValid
        }

        this.setState({
            addReportForm: updatedAddReportForm,
            formIsValid
        })

    }

    render() {

        const formElementsArray = []

        for (let key in this.state.addReportForm) {
            formElementsArray.push({
                id: key,
                config: this.state.addReportForm[key]
            })
        }

        let form = (
            <form
                onSubmit={this.addReportHandler}>
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
                ))
            }
            </form>
        )

        return (
            <div className={classes.AddReport}>
                <h4>Enter Bug Information</h4>
                {form}
                <Button
                    btnType="Success"
                    disabled={!this.state.formIsValid}
                    clicked={this.addReportHandler}>ADD REPORT
                </Button>
                <Button
                    btnType="Danger"
                    disabled={false}
                    clicked={this.props.addReportClosed}>CANCEL
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddReport: (reportData, token) => dispatch(actions.addReport(reportData, token))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReport)