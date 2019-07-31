import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import useAuth from './Auth/useAuth';
import firebase, { FirebaseContext } from '../firebase';
import Header from './Header';

import ForgotPassword from './Auth/ForgotPassword';
import Login from './Auth/Login';

import CreateJob from './Link/CreateJob';

const App = () => {
    const user = useAuth()
    return (
        <BrowserRouter>
        <FirebaseContext.Provider value={{ user, firebase }}>
            <div className="app-container">
                <Header />
                <div className="route-container">
                    <Switch>
                        {/* <Route exact path="/" /> */}
                        <Route path="/login" component={Login}/>
                        <Route path="/forgot" component={ForgotPassword}/>
                        <Route path="/create" component={CreateJob}/>
                    </Switch>
                </div>
            </div>
        </FirebaseContext.Provider> 
    </BrowserRouter>
    )
    
}
export default App;
