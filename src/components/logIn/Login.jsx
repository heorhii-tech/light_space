import React from "react";

import Form from "../../components/form/Form";
import useLogin from "../../hooks/useLogin";
import AutoRedirect from "../autoRedirect/AutoRedirect";
function Login(props) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    verify,
    logined,
    error,
  } = useLogin();
  return (
    <div>
      <Form
        setEmail={setEmail}
        setPassword={setPassword}
        type={`login`}
        hide={true}
        handleSubmit={handleLogin}
        email={email}
        password={password}
      />
      {error}
      {verify}
      {logined && <AutoRedirect to={"/"} delay={0} />}
    </div>
  );
}

export default Login;
