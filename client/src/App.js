import React, { Fragment } from "react";
import Home from "./components/Home";
import ContactsState from "./context/Contacts/ContactsState";
import About from "./components/About";
import AuthState from "./context/auth/AuthState";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
const App = () => {
  return (
    <AuthState>
      <ContactsState>
        <Fragment>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
            </Switch>
          </div>
        </Fragment>
      </ContactsState>
    </AuthState>
  );
};

export default App;
