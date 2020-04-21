import React from "react";
import { Link } from "react-router-dom";
function About() {
  return (
    <div className="container">
      <h3>this app was designed to help you to manage your contacts </h3>
      <Link to="/register"> Register </Link>
    </div>
  );
}

export default About;
