import React, { useContext, Fragment } from "react";
import ContactItem from "./ContactItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactsContext from "../../context/Contacts/ContactsContext";

function Contact() {
  const contactContext = useContext(ContactsContext);
  const { contacts, filtered } = contactContext;
  if (contacts.length === 0) {
    return <h3>Please Add Contacts</h3>;
  }
  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((contact) => (
              <CSSTransition timeout={500} key={contact.id} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition timeout={500} key={contact.id} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
}

export default Contact;
