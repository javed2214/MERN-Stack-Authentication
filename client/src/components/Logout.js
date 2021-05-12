import axios from 'axios'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Logout = () => {

    const history = useHistory()

    const { getLoggedIn } = useContext(AuthContext)

    const logOut = async () => {
        const resp = await axios.get('http://localhost:9000/api/logout')
        await getLoggedIn()
        history.push('/login')
    }

    return(
        <button style={{ marginRight: '15px' }} className="btn " onClick={logOut}>Logout</button>
    )
}

export default Logout