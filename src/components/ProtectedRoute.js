import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProtectedRoute = ({ isAuth, accessLevel, component: Component, ...rest }) => {
    return <Route { ...rest } render={(props) => {
        if(isAuth && !accessLevel) {
            <Component/>
        } else if(isAuth && isAuth[0].accessType === accessLevel) {
            return <Component/>
        } else {
            toast.warning('¡No tienes permiso para acceder! ⚠️')
            return <Redirect to={{ pathname: '/', state: { from: props.location } }}/>
        }
    }}/>
}

export default ProtectedRoute
