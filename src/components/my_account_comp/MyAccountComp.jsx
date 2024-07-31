import React from "react";

import useMyAccount from "../../hooks/useMyaccount";
import { useSelector } from "react-redux";

function MyAccountComp(props) {
  const { handleUpdateProfile, setName, handleUnLogin, name } = useMyAccount();
  const user = useSelector((state) => state.user);
  return (
    <div className="account_wrapper">
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>{user.tel}</p>
      <div className="change_name">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button onClick={handleUpdateProfile}>Change name</button>
      </div>
      <button onClick={handleUnLogin}>Exit</button>
    </div>
  );
}

export default MyAccountComp;
