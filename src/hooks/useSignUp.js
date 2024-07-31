import { useEffect, useState, React } from "react";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { message } from "antd";


const useSignUp = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [error, setError] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (error) {
      messageApi.open({
        type: "error",
        content: error,
      });
    }
  }, [error, messageApi]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);
      if (userCredential) {
        await updateProfile(userCredential.user, {
          displayName: name,
          phoneNumber: tel,
        });

        setPassword("");
        setRegistered(true);
        setEmail("");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email already is used");
      } else {
        console.log(error);
        setError("An error occurred during sign up");
      }
    }
  };

  return {
    handleSignUp,
    registered,
    contextHolder,
    setEmail,
    setPassword,
    setName,
    setTel,
    email,
    tel,
    name,
    password,
  };
};

export default useSignUp;
