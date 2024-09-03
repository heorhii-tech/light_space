import React, { useEffect } from "react";
import Form from "../../components/form/Form";
import useLogin from "../../hooks/useLogin";
import AutoRedirect from "../autoRedirect/AutoRedirect";
import useMyAcc from "../../hooks/useMyAcc";

function Login(props) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    logined,
    contextHolder,
  } = useLogin();

  return (
    <div>
      {contextHolder}
      <Form
        setEmail={setEmail}
        setPassword={setPassword}
        type={`login`}
        hide={true}
        handleSubmit={handleLogin}
        email={email}
        password={password}
      />

      {logined && <AutoRedirect to={"/"} delay={0} />}
    </div>
  );
}

export default Login;
