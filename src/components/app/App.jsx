import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import ReservationsPage from "../../pages/ReservationsPage";
import HomePage from "../../pages/HomePage";
import SignUpPage from "../../pages/SignUpPage";
import LoginPage from "../../pages/LoginPage";
import RequireAuth from "../../hoc/RequirAuth";
import MyAccountPage from "../../pages/MyAccountPage";
import AboutUsPage from "../../pages/AboutUsPage";
import RedirectIfAuthenticated from "../../hoc/RedirectIfAuthenticated";
import ContactPage from "../../pages/ContactPage";
import ReservationHistoryPage from "../../pages/ReservationHistoryPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";

function App(props) {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about_us" element={<AboutUsPage />} />

            <Route
              path="/reservation"
              element={
                <RequireAuth>
                  <ReservationsPage />
                </RequireAuth>
              }
            />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/reset_password" element={<ResetPasswordPage />} />
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
                  <MyAccountPage />
                </RequireAuth>
              }
            />
            <Route
              path="/reservations_history"
              element={
                <RequireAuth>
                  <ReservationHistoryPage />
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
