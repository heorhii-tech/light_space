import React, { useEffect } from "react";
import Form from "../forms/auth_form/Form";
import useLogin from "../../hooks/useLogin";
import AutoRedirect from "../autoRedirect/AutoRedirect";

import SpinLoader from "../common/skeletons/SpinLoader";

function Login(props) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    contextHolder,
    loading,
  } = useLogin();
  return (
    <>
      {contextHolder}
      {loading && <SpinLoader />}

      <Form
        setEmail={setEmail}
        setPassword={setPassword}
        type={`login`}
        hide={true}
        handleSubmit={handleLogin}
        email={email}
        password={password}
        text={`LOG IN`}
      />
    </>
  );
}

export default Login;
