import React from "react";
import useResetPassword from "../hooks/useResetPassword";
import SpinLoader from "../components/common/skeletons/SpinLoader";
import Title from "../components/common/texts/Title";
import Description from "../components/common/texts/Description";
import ResetPasswordForm from "../components/reset_password/RessetPasswordForm";

function ResetPasswordPage(props) {
  const { handlePasswordReset, loading } = useResetPassword();
  return (
    <>
      <div className="reset-password-page">
        <div className="extra-header__background"></div>
        <div className="reset-password-page__wrapper">
          {loading && <SpinLoader />}
          <Title text={`Password recovery`} />
          <Description
            text={`Enter your email and we will send you a link to recover your password`}
          />
          <ResetPasswordForm
            handlePasswordReset={handlePasswordReset}
            className="reset-password-page__form"
          />
        </div>
      </div>
    </>
  );
}

export default ResetPasswordPage;
