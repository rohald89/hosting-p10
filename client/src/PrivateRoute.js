import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const PrivateRoute = (props) => {
    const targetRoute = useLocation()
    console.log(targetRoute.pathname)
    return (
        // If there is an authenticated user, continue to render the outlet routes
        // If no auth user, redirect to the signin page
        props.context.authenticatedUser ? <Outlet /> : <Navigate to="/signin" replace={true} state={{ targetRoute: targetRoute.pathname }} />
    )
}

export default PrivateRoute