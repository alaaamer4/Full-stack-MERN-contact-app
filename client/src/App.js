import React from "react";
import Home from "./components/Home";
import ContactsState from "./context/Contacts/ContactsState";
import About from "./components/About";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
function App() {
  return (
    <ContactsState>
      <NavBar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </ContactsState>
  );
}

export default App;
