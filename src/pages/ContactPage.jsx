import React from "react";
import TextBlock from "../components/text_block/TextBlock";
import { contactPageText, contactsInfoData } from "../constants/constants";
import InformationBlock from "../components/information_block/InformationBlock";

function ContactPage(props) {
  return (
    <section className="contact-page">
      <div className="contact-page__wrapper">
        <TextBlock data={contactPageText} />
        <InformationBlock
          data={contactsInfoData}
          className={`our_contacts_infoBlock_wrapper`}
          classNameCard={`contacts_card`}
        />
      </div>
    </section>
  );
}

export default ContactPage;
