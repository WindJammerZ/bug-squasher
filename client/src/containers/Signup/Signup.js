import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from '../../axios-reports'
import Button from '../../components/UI/Button/Button'
import classes from './Signup.module.css'
import Input from '../../components/UI/Input/Input'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import {updateObject, checkValidity} from '../../shared/utility'

class Signup extends Component {

    state = {
        signupForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
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
    

    signupHandler = (event) => {
        event.preventDefault()
        const formData = {}

        for (let formElementIdentifier in this.state.signupForm){
            formData[formElementIdentifier] = this.state.signupForm[formElementIdentifier].value
        }
        
        this.props.onSignup(formData)

    }

    signupClosedHandler = (event) => {
        event.preventDefault()
        this.setState({
            exitForm: true
        })

        this.props.onSetAuthRedirectPath('/')
    }

    signupHandlerClosed

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedFormElement = updateObject(this.state.signupForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.signupForm[inputIdentifier].validation),
            touched: true 
        });

        const updatedSignupForm = updateObject(this.state.signupForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true

        for (let inputIdentifier in updatedSignupForm){
            formIsValid = updatedSignupForm[inputIdentifier].valid && formIsValid
        }

        this.setState({signupForm:updatedSignupForm, formIsValid: formIsValid})
    }

    render() {

        const formElementsArray = []

        for(let key in this.state.signupForm){
            formElementsArray.push({
                id: key,
                config: this.state.signupForm[key]
            })
        }

        let form = (
            <form onSubmit={this.signupHandler}>
                <h4>Signup Below!</h4>
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
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <div className={classes.ButtonLayout}>
                    <Button btnType='Success' disabled={!this.state.formIsValid}>SIGNUP</Button>
                    <Button btnType='Danger' disabled={false} clicked={this.signupClosedHandler}>CANCEL</Button>
                </div>
            </form>
        );

        let errorMessage = null;

        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        };

        let authRedirect = null;

        if(this.props.isAuthenticated || this.state.exitForm){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.SignupForm}>
                {authRedirect}
                {errorMessage}
                {form}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignup: (signupData) => dispatch(actions.signup(signupData)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Signup, axios))