import React from "react";
import MyAccountComp from "../components/my_account_comp/MyAccountComp";
import useUser from "../hooks/useUser";

function MyAccountPage(props) {
  const {} = useUser();
  return (
    <section className="my-account">
      <div className="extra-header__background"></div>
      <MyAccountComp />
    </section>
  );
}

export default MyAccountPage;
