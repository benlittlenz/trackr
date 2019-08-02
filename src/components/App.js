import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Grid, Image } from 'semantic-ui-react'

import useAuth from './Auth/useAuth';
import firebase, { FirebaseContext } from '../firebase';
import Header from './Header';

import ForgotPassword from './Auth/ForgotPassword';
import Login from './Auth/Login';

import CreateJob from './Link/CreateJob';
import JobList from './Link/JobList';
import JobDetail from './Link/JobDetail';

const App = () => {
    const user = useAuth()
    return (
        <BrowserRouter>
        <FirebaseContext.Provider value={{ user, firebase }}>
        <Grid celled>
            <Grid.Row>
                <Grid.Column width={3}>
                    <Header />
                </Grid.Column>
                <Grid.Column width={12}>
                    <Switch>
                        {/* <Route exact path="/" /> */}
                        <Route path="/login" component={Login}/>
                        <Route path="/forgot" component={ForgotPassword}/>
                        <Route path="/create" component={CreateJob}/>
                        <Route path="/jobs" component={JobList}/>
                        {/* <Route path="/job/:page" component={JobList}/> */}
                        <Route path="/job/:jobId" component={JobDetail}/>
                    </Switch>
                </Grid.Column>
            </Grid.Row>
        </Grid>

        </FirebaseContext.Provider> 
    </BrowserRouter>
    )
    
}
export default App;
