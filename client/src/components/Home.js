import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {

    const [username, setUsername] = useState('')

    const getUserData = async () => {
        const resp = await axios.post('http://localhost:9000/api/user')
        setUsername(resp.data.user.username)
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <div>
            <h2>Home Page</h2>
            <h4>Welcome {username}</h4>
            <p>The data here is Private</p>
        </div>
    )
}

export default Home
