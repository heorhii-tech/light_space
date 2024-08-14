import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useState, React } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/user/userSlice";
import AutoRedirect from "../components/autoRedirect/AutoRedirect";

const useLogin = () => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [verify, setVerify] = useState(``);
  const [error, setError] = useState(``);
  const [logined, setLogined] = useState(false);
  const dispatch = useDispatch();

  const auth = getAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(``);
    setVerify(``);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        onAuthStateChanged(auth, (user) => {
          if (user.emailVerified) {
            dispatch(
              setUser({
                token: user.accessToken,
                name: user.displayName,
                email: user.email,
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
          setError(`invalid password or email.Please try again`);
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
    error,
    logined,
  };
};

export default useLogin;
