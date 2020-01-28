import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import axios from '../../axios-reports'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

import classes from './Auth.module.css'
import * as actions from '../../store/actions/auth'
import {updateObject, checkValidity} from '../../shared/utility'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Auth extends Component{

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Please enter your email address...'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        exitForm: false
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        })

        let formIsValid = true

        for(let controlName in updatedControls){
            formIsValid = updatedControls[controlName].valid && formIsValid
        }

        this.setState({controls:updatedControls, formIsValid})
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value)
    }

    authClosedHandler = (event) => {
        event.preventDefault()
        this.props.onSetAuthRedirectPath('/')
        this.setState({
            exitForm: true
        })
    }

    render(){

        const formElementsArray = []

        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = (
            <form onSubmit={this.submitHandler}>
                <h4>Please Login Below!</h4>
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
                        changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
                ))}
                <div className={classes.ButtonLayout}>
                    <Button btnType='Success' disabled={!this.state.formIsValid}>SUBMIT</Button>
                    <Button btnType='Danger' disabled={false} clicked={this.authClosedHandler}>CANCEL</Button>
                </div>
         </form>
        )

        let errorMsg = null

        if(this.props.error){
            errorMsg = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null

        if(this.props.isAuthenticated || this.state.exitForm){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMsg}
                {form}
                {/* <div className={classes.ButtonLayout}>
                    <Button btnType='Success' disabled={!this.state.formIsValid}>SUBMIT</Button>
                    <Button btnType='Danger' disabled={false} clicked={this.authClosedHandler}>CANCEL</Button>
                </div> */}
        </div>
        )
    }
}

const MapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const MapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(withErrorHandler(Auth, axios))