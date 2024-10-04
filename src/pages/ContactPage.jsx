import React, { useEffect } from "react";

import { contactPageText, contactsInfoData } from "../constants/constants";
import InformationBlock from "../components/information_block/InformationBlock";
import Title from "../components/common/texts/Title";

function ContactPage(props) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <section className="contact-page">
      <div className="contact-page__wrapper">
        <Title text={`OUR CONTACTS`} />
        <InformationBlock
          subTitle={contactPageText}
          data={contactsInfoData}
          className={`our_contacts_infoBlock_wrapper`}
          classNameCard={`contacts_card`}
        />
      </div>
    </section>
  );
}

export default ContactPage;
