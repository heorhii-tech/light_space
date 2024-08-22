import React, { useEffect } from "react";
import { Button, message, Space } from "antd";
import Form from "../../components/form/Form";
import useLogin from "../../hooks/useLogin";
import AutoRedirect from "../autoRedirect/AutoRedirect";

function Login(props) {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    verify,
    logined,
    errorMes,
  } = useLogin();
  useEffect(() => {
    if (errorMes) {
      messageApi.open({
        type: "error",
        content: errorMes,
      });
    }
  }, [errorMes]);

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

      {verify}
      {logined && <AutoRedirect to={"/"} delay={0} />}
    </div>
  );
}

export default Login;
