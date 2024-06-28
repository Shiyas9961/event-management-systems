import React, { createContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "../axios";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [authTokens, setAuthTokens] = useState(() => {
        const token = localStorage.getItem('authTokens')
        return token ? JSON.parse(token) : null
    })

    const [user, setUser] = useState(() => {
        const tokens = localStorage.getItem('authTokens')

        if (tokens) {
            const decodedToken = JSON.parse(atob(tokens.split('.')[1]))
            return decodedToken.user_id
        }
        else {
            return null
        }
    })

    const navigate = useNavigate()

    const login = async (username, password) => {
        const response = await axios.post('/api/token/', { username, password });
            if (response.status === 200) {
            setAuthTokens(response.data);
            setUser(jwtDecode(response.data.access));
            localStorage.setItem('authTokens', JSON.stringify(response.data));
            navigate('/events');
        } else {
            alert('Something went wrong!');
        }
    }
    const updateToken = async () => {
        const response = await axios.post('/api/token/refresh/', { refresh: authTokens?.refresh });
        if (response.status === 200) {
          setAuthTokens(response.data);
          setUser(jwtDecode(response.data.access));
          localStorage.setItem('authTokens', JSON.stringify(response.data));
        } else {
          logout();
        }
      };

    const logout = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    useEffect(() => {
        if (authTokens) {
          const decoded = jwtDecode(authTokens.access);
          console.log(decoded)
          if (decoded.exp * 1000 < Date.now()) {
            logout();
          } else {
            setTimeout(updateToken, (decoded.exp * 1000 - Date.now()) - 60000);
          }
        }
        //react-hooks/exhaustive-deps
      }, [authTokens, updateToken])

    const contextVal = {
        user,
        authTokens,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={contextVal}>
            {children}
        </AuthContext.Provider>
    )
}
