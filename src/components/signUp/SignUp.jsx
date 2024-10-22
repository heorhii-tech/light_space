import React from "react";
import useSignUp from "../../hooks/useSignUp";
import Form from "../forms/auth_form/Form";
import { Result } from "antd";
import AutoRedirect from "../autoRedirect/AutoRedirect";
import SpinLoader from "../common/skeletons/SpinLoader";

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
    loading,
  } = useSignUp();

  return (
    <div>
      {loading && <SpinLoader fullscreen={true} />}
      {contextHolder}
      {!registered && (
        <Form
          text={`SIGN UP`}
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
          autoCompleteOff={true}
        />
      )}
      {registered && (
        <div className="result_signup_wrapper">
          <Result
            status="success"
            title="You have been successfully registered. Confirm your account using the link received via email. 
           After 5 seconds you will be redirected to the homepage"
          />
        </div>
      )}
      {registered && <AutoRedirect to={`/`} delay={5000} />}
    </div>
  );
}

export default SignUp;
