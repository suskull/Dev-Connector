import React, {useEffect, useState} from "react";
import "./App.css";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import DashBoard from './components/auth/DashBoard'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Provider} from 'react-redux'
import store from "./store";
import Alert from "./components/layout/Alert.jsx";
import { getAuthUser } from "./actions/auth";
import PrivateRoute from "./routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
function App() {
  useEffect(() => {
    store.dispatch(getAuthUser())
  }, [])
  const loginUrl = '/login'
  return (
    <Provider store={store}>
      <Router>
      <>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/Login" component={Login} />
           <PrivateRoute exact path='/dashboard' component={DashBoard} />
           <PrivateRoute exact path='/create-profile' component={CreateProfile} />

          </Switch>
        </section>
      </>
    </Router>
    </Provider>
    
  );
}

export default App;
