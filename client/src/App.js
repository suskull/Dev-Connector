import React, {useEffect} from "react";
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
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles"
function App() {
  useEffect(() => {
    store.dispatch(getAuthUser())
  }, [])
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
            <Route exact path='/profiles' component={Profiles} />
           <PrivateRoute exact path='/dashboard' component={DashBoard} />
           <PrivateRoute exact path='/create-profile' component={CreateProfile} />
           <PrivateRoute exact path='/edit-profile' component={EditProfile} />
           <PrivateRoute exact path='/add-experience' component={AddExperience} />
           <PrivateRoute exact path='/add-education' component={AddEducation} />


          </Switch>
        </section>
      </>
    </Router>
    </Provider>
    
  );
}

export default App;
