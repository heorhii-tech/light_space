import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Form({
  type,
  handleSubmit,
  hide,
  email,
  setEmail,
  name,
  setName,
  tel,
  setTel,
  password,
  setPassword,
}) {
  return (
    <div className="auth_form_wrapper">
      <form
        className={type === "login" ? `login_form` : `signup_form`}
        onSubmit={handleSubmit}
      >
        <div className="form_inputs_wrapper">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            minLength={8}
          />

          {!hide && (
            <input
              type="tel"
              pattern="[0-9]{10}"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              placeholder="0638699561"
              name="phone"
            />
          )}

          {!hide && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          )}
        </div>
        <p className={type === `login` ? `res_password` : `hidde`}>
          Forgot your password?
        </p>
        <div className="buttons_wrapper">
          <button type="submit">
            {type === "login" ? "LOG IN" : "SIGN UP"}
          </button>
          {type === `login` ? (
            <Link to="/signup">CREATE ACCOUNT</Link>
          ) : (
            <Link to="/login">LOGIN</Link>
          )}
        </div>
      </form>
    </div>
  );
}

export default Form;
