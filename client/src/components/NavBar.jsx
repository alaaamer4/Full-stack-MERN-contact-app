import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";
import ContactContext from "../context/Contacts/ContactsContext";
const NavBar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logOut, loadUser } = authContext;
  const contactContext = useContext(ContactContext);
  const { clearContacts } = contactContext;

  useEffect(() => {
    loadUser();
  }, []);
  const handelLogout = () => {
    logOut();
    clearContacts();
  };
  return isAuthenticated ? (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <span>hello {user && user.name}</span>
          <Link onClick={handelLogout} to="/login">
            {" "}
            <i className="fas fa-sign-out-alt"></i>{" "}
            <span className="hide-sm">Log Out</span>
          </Link>
        </li>
      </ul>
    </div>
  ) : (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Log In</Link>
        </li>
      </ul>
    </div>
  );
};

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

NavBar.defaultProps = {
  title: "Contactor",
  icon: "fas fa-id-card-alt",
};

export default NavBar;
