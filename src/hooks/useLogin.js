import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useState, React } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/user/userSlice";
import { auth } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { db } from "../firebaseConfig";

const useLogin = () => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [verify, setVerify] = useState(``);
  const [errorMes, setErrorMes] = useState(``);
  const [logined, setLogined] = useState(false);

  const dispatch = useDispatch();

  const auth = getAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    setErrorMes(``);
    setVerify(``);

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
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === `Firebase: Error (auth/invalid-credential).`) {
          setErrorMes(`invalid password or email.Please try again`);
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
  };
};

export default useLogin;
