import React from "react";
import ContactForm from "./Contact/ContactForm";
import Contact from "./Contact/Contact";
function Home() {
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <Contact />
      </div>
    </div>
  );
}

export default Home;
