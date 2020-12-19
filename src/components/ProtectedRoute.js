import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProtectedRoute = ({ isAuth: isAuth, component: Component, ...rest }) => {
    return <Route { ...rest } render={(props) => {
        if(isAuth) {
            return <Component/>
        } else {
            toast.warning('¡No tienes permiso para acceder! ⚠️')
            return <Redirect to={{ pathname: '/', state: { from: props.location } }}/>
        }
    }}/>
}

export default ProtectedRoute
