import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/Contacts/ContactsContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;
  const [text, setText] = useState("");

  const handelChange = (e) => {
    setText(e.target.value);
    filterContacts(e.target.value);
    if (e.target.value === "") {
      clearFilter();
    }
  };
  console.log(text);
  return (
    <form>
      <input
        type="text"
        value={text}
        placeholder="Filter Contacts"
        onChange={handelChange}
      />
    </form>
  );
};
export default ContactFilter;
