import axios from 'axios'
import React, { useState, useEffect, createContext } from 'react'

const AuthContext = createContext()

const AuthContextProvider = (props) => {

    const [loggedIn, setLoggedIn] = useState(undefined)

    const getLoggedIn = async () => {
        const resp = await axios.get('http://localhost:9000/api/loggedin')
        console.log(resp.data)
        setLoggedIn(resp.data)
    }

    useEffect(() => {
        getLoggedIn()
    }, [])

    return(
        <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext
export {AuthContextProvider}