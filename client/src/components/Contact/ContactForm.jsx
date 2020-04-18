import React, { useState, useContext } from "react";
import ContactsContext from "../../context/Contacts/ContactsContext";

const ContactForm = () => {
  const contactContext = useContext(ContactsContext);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });
  const { name, email, phone, type } = contact;

  const handelChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    contactContext.addContact(contact);
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };
  return (
    <form onSubmit={handelSubmit}>
      <h2>Add Contact</h2>
      <input
        type="text"
        name="name"
        value={name}
        placeholder="Name"
        onChange={handelChange}
      />
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Email"
        onChange={handelChange}
      />
      <input
        type="text"
        name="phone"
        value={phone}
        placeholder="Phone"
        onChange={handelChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={handelChange}
      />
      Personal {"  "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={handelChange}
      />
      Professional {"  "}
      <div>
        <input type="submit" value="Add Contact" className="btn btn-primary" />
      </div>
    </form>
  );
};

export default ContactForm;
