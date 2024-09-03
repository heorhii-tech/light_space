import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../../pages/HomePage";
import ReservationPage from "../../pages/ReservationPage";
import SignUpPage from "../../pages/SignUpPage";
import LoginPage from "../../pages/LoginPage";
import RequireAuth from "../../hoc/RequirAuth";
import MyAccount from "../../pages/MyAccount";
import AboutUs from "../../pages/AboutUs";
import RedirectIfAuthenticated from "../../hoc/RedirectIfAuthenticated";
import ContactPage from "../../pages/ContactPage";

function App(props) {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about_us" element={<AboutUs />} />
            <Route
              path="/reservation"
              element={
                <RequireAuth>
                  <ReservationPage />
                </RequireAuth>
              }
            />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/login"
              element={
                <RedirectIfAuthenticated>
                  <LoginPage />
                </RedirectIfAuthenticated>
              }
            />
            <Route
              path="/my_account"
              element={
                <RequireAuth>
                  <MyAccount />
                </RequireAuth>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
