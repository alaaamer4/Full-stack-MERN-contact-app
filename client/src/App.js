import React, { Fragment } from "react";
import Home from "./components/Home";
import ContactsState from "./context/Contacts/ContactsState";
import About from "./components/About";
import AuthState from "./context/auth/AuthState";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AlertState from "./context/alerts/AlertState";
import Alerts from "./components/alerts/Alerts";
import SetToken from "./utils/SetToken";

if (localStorage.token) {
  SetToken(localStorage.token);
}
const App = () => {
  return (
    <AuthState>
      <ContactsState>
        <AlertState>
          <Fragment>
            <NavBar />
            <div className="container">
              <Alerts />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
              </Switch>
            </div>
          </Fragment>
        </AlertState>
      </ContactsState>
    </AuthState>
  );
};

export default App;
