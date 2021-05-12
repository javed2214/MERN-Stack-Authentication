import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import AuthContext from '../context/AuthContext'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const { getLoggedIn } = useContext(AuthContext)
    const history = useHistory()

    const login = async (e) => {
        e.preventDefault()
        const loginUser = {
            email,
            password
        }
        const resp = await axios.post('http://localhost:9000/api/login', loginUser)
        if(resp.data.success === true){
            await getLoggedIn()
            history.push('/')
            setMessage('Login Successfull')
        } else{
            setError('Invalid Email or Password')
        }
        setEmail('')
        setPassword('')
        setTimeout(() => {
            setError('')
            setMessage('')
        }, 1500)
    }

    return(
        <div>
        <h3>Login</h3>
        <br />
            <form onSubmit={login}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br /><br />
                <button className="btn red">Login</button> <br /><br />
                <div style={{ color: 'green' }}>{message}</div>
                <div style={{ color: 'red' }}>{error}</div>
            </form>
        </div>
    )
}

export default Login