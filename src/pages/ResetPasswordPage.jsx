import React from "react";
import ResetPasswordForm from "../components/reset_password/RessetPasswordForm";
import useResetPassword from "../hooks/useResetPassword";
import SpinLoader from "../components/common/skeletons/SpinLoader";
import Title from "../components/common/texts/Title";
import Description from "../components/common/texts/Description";

function ResetPasswordPage(props) {
  const { handlePasswordReset, loading } = useResetPassword();
  return (
    <div className="reset_password_page_wrapper">
      {loading && <SpinLoader />}
      <Title text={`Password recovery`} />
      <Description
        text={`Enter your email and we will send you a link to recover your password`}
      />
      <ResetPasswordForm handlePasswordReset={handlePasswordReset} />
    </div>
  );
}

export default ResetPasswordPage;
