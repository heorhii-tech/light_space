import { useEffect, useState, React } from "react";
import { auth } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { db } from "../firebaseConfig";
import { message } from "antd";

const useSignUp = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [error, setError] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: name,
        tel: tel,
        createdAt: new Date(),
      });

      setPassword("");
      setRegistered(true);
      setEmail("");
      setLoading(false);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email already is used");
        setLoading(false);
      } else {
        console.log(error);
        setError("An error occurred during sign up");
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

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
    loading,
  };
};

export default useSignUp;
