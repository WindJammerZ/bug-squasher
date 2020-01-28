import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {!props.isAuthenticated
                ? null
                : <li>Hello, {props.userName}</li>}
        {!props.isAuthenticated
            ?<React.Fragment>
                <NavigationItem link='/login'>LOGIN</NavigationItem>
                <NavigationItem link='/signup'>SIGNUP</NavigationItem>
            </React.Fragment>

            :<React.Fragment>
                <NavigationItem link='/logout'>LOGOUT</NavigationItem>
                <NavigationItem link='/logoutAll'>LOGOUT ALL</NavigationItem>
                </React.Fragment>}
    </ul>
)

export default navigationItems