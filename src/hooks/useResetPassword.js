import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { message } from "antd"; // Можно использовать Ant Design для сообщений

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const handlePasswordReset = (data) => {
    setLoading(true);

    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        message.success("Password reset email sent!");
      })
      .catch((error) => {
        message.error("Error sending password reset email: " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    handlePasswordReset,
    loading,
  };
};

export default useResetPassword;
