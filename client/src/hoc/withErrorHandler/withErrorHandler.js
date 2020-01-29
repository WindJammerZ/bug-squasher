import React, {
    Component
} from 'react'
import Modal from '../../components/UI/Modal/Modal'
import classes from './withErrorHandler.module.css'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        constructor(props) {
            super(props)
            this.state = {
                error: null
            }

            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                })
                return req
            })

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error: error.response.data
                })
                return Promise.reject(error.response)
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            })
        }

        render() {
            return (
            <React.Fragment>
                <Modal
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                    <div className={classes.ErrorMsg}>
                        {this.state.error ? this.state.error.message : null}
                    </div>
                </Modal>
                <WrappedComponent {...this.props}/>
            </React.Fragment>
            )
        }
    }
}

export default withErrorHandler