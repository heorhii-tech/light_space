import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useState, React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/user/userSlice";

import { message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const useLogin = () => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [verify, setVerify] = useState(``);
  const [errorMes, setErrorMes] = useState(``);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [relocatePath, setRelocatePath] = useState(``);
  const [loginMesForNext, setLoginMesForNext] = useState(``);

  const location = useLocation();
  const dispatch = useDispatch();

  const auth = getAuth();
  useEffect(() => {
    const path = location.state?.from?.pathname;
    console.log(path);
    switch (path) {
      case `/my_account`:
        setLoginMesForNext(`PLEASE LOGIN TO OPEN YOUR ACCOUNT`);
        break;
      case `/reservation`:
        setLoginMesForNext(`PLEASE LOG IN FOR RESERVATION`);
        break;
    }
  }, [location]);

  useEffect(() => {
    if (loginMesForNext) {
      messageApi.open({
        type: "warning",
        content: loginMesForNext,
      });
    }
  }, [loginMesForNext]);

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
  useEffect(() => {
    const headerElement = document.getElementById("header");
    if (headerElement) {
      headerElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    verify,
    errorMes,
    contextHolder,
    loading,
    relocatePath,
  };
};

export default useLogin;
