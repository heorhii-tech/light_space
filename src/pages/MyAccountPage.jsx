import React from "react";
import MyAccountComp from "../components/my_account_comp/MyAccountComp";

function MyAccountPage(props) {
  return (
    <section className="my-account">
      <div className="extra-header__background"></div>
      <MyAccountComp />
    </section>
  );
}

export default MyAccountPage;
