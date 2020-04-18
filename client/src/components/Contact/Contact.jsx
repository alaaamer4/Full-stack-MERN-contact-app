import React, { useContext, Fragment } from "react";
import ContactItem from "./ContactItem";
import ContactsContext from "../../context/Contacts/ContactsContext";
function Contact() {
  const contactContext = useContext(ContactsContext);
  const { contacts } = contactContext;
  return (
    <Fragment>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </Fragment>
  );
}

export default Contact;
