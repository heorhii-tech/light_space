import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/user/userSlice";
import MyAccountComp from "../components/my_account_comp/MyAccountComp";

function MyAccount(props) {
  return <MyAccountComp />;
}

export default MyAccount;
