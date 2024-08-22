import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/user/userSlice";
import MyAccountComp from "../components/my_account_comp/MyAccountComp";

function MyAccount(props) {
  return (
    <section className="my_account_section">
      <MyAccountComp />
    </section>
  );
}

export default MyAccount;
