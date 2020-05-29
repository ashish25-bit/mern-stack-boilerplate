import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layouts/Header'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Dashboard from './components/layouts/Dashboard'
import PrivateRoute from './components/routes/PrivateRoute'

import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken' 

// redux
import { Provider } from 'react-redux'
import store from './store'

const App = ({ isAuthenticated }) => {

  useEffect(() => {
    setAuthToken(localStorage.token)
    store.dispatch(loadUser())
  },[])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <Switch>
            <Route exact path='/' component={Signup} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App
