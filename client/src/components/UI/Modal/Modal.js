import React, { Component } from 'react'
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'
import Button from '../Button/Button'

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.show !== this.props.show || nextProps.children !== this.props.children)

    }

    render() {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={
                        {
                            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                            opacity: this.props.show ? '1' : '0'
                        }
                    }>
                    <div
                        className={classes.ExitButtonArea}>
                         <Button 
                            btnType='ExitButton'
                            clicked={this.props.modalClosed}>X</Button>
                    </div>
                    {this.props.children}
                </div>

            </React.Fragment>
        )
    }
}

export default Modal