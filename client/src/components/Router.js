import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './Navbar'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import AuthContext from '../context/AuthContext'

const Router = () => {

    const { loggedIn } = useContext(AuthContext)

    return(
        <BrowserRouter>
            <Navbar />
            <div className="container">
                <Switch>
                    { loggedIn === false && 
                        <>
                            <Route exact path='/register' component={Register} />
                            <Route exact path='/login' component={Login} />
                        </>
                    }
                    { loggedIn === true ? <Route exact path='/' component={Home} /> : <Redirect to='/login' /> }
                    { loggedIn === true ? <Redirect to='/' /> : <Redirect to='/login' /> }
                </Switch>
            </div>
        </BrowserRouter>
    )
}
export default Router;
