import React, { useState, useContext, useEffect } from "react";
import ContactsContext from "../../context/Contacts/ContactsContext";

const ContactForm = () => {
  const contactContext = useContext(ContactsContext);
  const { addContact, current, clearCurrent, updateContact } = contactContext;

  useEffect(() => {
    if (current !== null) {
      return setContact(current);
    } else {
      return setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [current, contactContext]);
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
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
    clearCurrent();
  };
  const clearContact = () => {
    clearCurrent();
  };
  return (
    <form onSubmit={handelSubmit}>
      <h2>{current ? "Edit Contact" : "Add Contact"}</h2>
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
        <input
          type="submit"
          value={current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary"
        />
      </div>
      {current !== null && (
        <div>
          <button className="btn btn-light btn-block-" onClick={clearContact}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
