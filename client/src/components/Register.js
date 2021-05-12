import React, { useContext, useState } from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import { useHistory } from 'react-router'

const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const register = async (e) => {
        e.preventDefault()
        try{
            const registerUser = {
                username,
                email,
                password
            }
            const resp = await axios.post('http://localhost:9000/api/register', registerUser)
            if(resp.data.success && resp.data.success === true){
                setMessage('User Registered Successfully')
            } else{
                setError('Error in Registering User')
            }
            setTimeout(() => {
                setMessage('')
                setError('')
            }, 1500)
            setUsername('')
            setEmail('')
            setPassword('')
        } catch(err){
            console.log('Error in Registering User: ', err)
        }
    }

    return(
        <div>
        <h3>Register</h3>
        <br />
            <form onSubmit={register}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /> <br />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br /><br />
                <button type="submit" className="btn red">Register</button> <br /><br />
                <div style={{ color: 'green' }}>{message}</div>
                <div style={{ color: 'red' }}>{error}</div>
            </form>
        </div>
    )
}

export default Register