import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import Logout from './Logout'

const Navbar = () => {

    const {loggedIn} = useContext(AuthContext)
    console.log(loggedIn)

    return(
        <div>
            <nav> 
                <div className="nav-wrapper" style={{backgroundColor: '#850000'}}>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    { loggedIn === false && (
                        <>
                        <li><Link to='/register'>Register</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                        </>
                    )
                    }
                    {loggedIn === true && <li><Logout /></li>}
                </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar