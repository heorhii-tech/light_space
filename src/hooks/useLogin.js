import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useState, React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/user/userSlice";
import { auth } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { message } from "antd";

const useLogin = () => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [verify, setVerify] = useState(``);
  const [errorMes, setErrorMes] = useState(``);
  const [logined, setLogined] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();


  const auth = getAuth();
  useEffect(() => {
    if (errorMes) {
      messageApi.open({
        type: "error",
        content: errorMes,
      });
    }
  }, [errorMes]);
  useEffect(() => {
    if (verify) {
      messageApi.open({
        type: "error",
        content: verify,
      });
    }
  }, [verify]);



  const handleLogin = (e) => {
    e.preventDefault();

    setErrorMes(``);
    setVerify(``);
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        onAuthStateChanged(auth, (user) => {
          if (user.emailVerified) {
            dispatch(
              setUser({
                token: user.accessToken,
                email: user.email,
                uid: user.uid,
              })
            );

            setEmail(``);
            setPassword(``);
            setLogined(true);
          } else {
            setVerify(`Please verify your email`);
            setLoading(false);
          }
          setLoading(false);
        });
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === `Firebase: Error (auth/invalid-credential).`) {
          setErrorMes(`invalid password or email.Please try again`);
          setLoading(false);
        }
      });
  };
 

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    verify,
    errorMes,
    logined,
    contextHolder,
    loading,
  };
};

export default useLogin;
