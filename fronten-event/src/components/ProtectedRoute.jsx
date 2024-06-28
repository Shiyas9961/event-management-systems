import React, { useContext } from 'react'
import { AuthContext } from '../context/authcontext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext)

    return user ? children : <Navigate to={'/login'} />
}

export default ProtectedRoute