import React from "react";
import ContactForm from "./Contact/ContactForm";
import Contact from "./Contact/Contact";
import ContactFilter from "./Contact/ContactFilter";
function Home() {
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contact />
      </div>
    </div>
  );
}

export default Home;
