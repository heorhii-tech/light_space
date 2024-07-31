import React from "react";
import useSignUp from "../../hooks/useSignUp";
import Form from "../../components/form/Form";
import { Button, Result } from "antd";
import AutoRedirect from "../autoRedirect/AutoRedirect";

function SignUp() {
  const {
    handleSignUp,
    registered,
    contextHolder,
    setEmail,
    setPassword,
    setName,
    setTel,
    email,
    tel,
    password,
    name,
  } = useSignUp();

  return (
    <div>
      {contextHolder}
      {!registered && (
        <Form
          type={`signup`}
          handleSubmit={handleSignUp}
          setEmail={setEmail}
          setPassword={setPassword}
          setName={setName}
          setTel={setTel}
          email={email}
          tel={tel}
          password={password}
          name={name}
        />
      )}
      {registered && (
        <Result
          status="success"
          title="Нou've been successfully registered. Verify your account via the email link"
        />
      )}
      {registered && <AutoRedirect to={`/`} delay={3000} />}
    </div>
  );
}

export default SignUp;
