import React, {Component} from 'react'
import { connect } from 'react-redux'

import classes from './Layout.module.css'

import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems'

class Layout extends Component {

render(){
    return(
        <React.Fragment>
            <NavigationItems
                userName={this.props.userName}
                isAuthenticated={this.props.isAuthenticated}/>
            <main className={classes.Content}> {this.props.children} </main>
        </React.Fragment>
    )
}

}

const MapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userName: state.auth.userName
    }
}

const MapDispatchToProps = null

export default connect(MapStateToProps, MapDispatchToProps)(Layout)