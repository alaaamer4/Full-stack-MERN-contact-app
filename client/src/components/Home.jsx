import React, { useContext, useEffect } from "react";
import AlertContext from "../context/alerts/AlertContext";
import { Redirect } from "react-router-dom";
import ContactForm from "./Contact/ContactForm";
import ContactContext from "../context/Contacts/ContactsContext";
import Contact from "./Contact/Contact";
import ContactFilter from "./Contact/ContactFilter";
import AuthContext from "../context/auth/AuthContext";
const Home = () => {
  const contactContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { error } = contactContext;
  const { loadUser, isAuthenticated } = authContext;
  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
    }
    loadUser();
  }, [error]);

  return isAuthenticated ? (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contact />
      </div>
    </div>
  ) : localStorage.getItem("token") === null ? (
    <Redirect to="/login" />
  ) : (
    <div className="container">
      <h1>Loading ...</h1>
    </div>
  );
};

export default Home;
