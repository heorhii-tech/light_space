import React from "react";
import { Link, NavLink } from "react-router-dom";
import Title from "../../common/texts/Title";
import ButtonUniversal from "../../common/buttons/ButtonUniversal";
import SecondaryButton from "../../common/buttons/SecondaryButton";

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
  text,
}) {
  return (
    <div className="auth_form_wrapper">
      <form
        className={type === "login" ? `login_form` : `signup_form`}
        onSubmit={handleSubmit}
      >
        <Title text={text} />
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
          <NavLink to={`/reset_password`}>Forgot your password?</NavLink>
        </p>
        <div className="buttons_wrapper">
          <ButtonUniversal
            type="submit"
            title={type === "login" ? "LOG IN" : "SIGN UP"}
          ></ButtonUniversal>

          <SecondaryButton
            text={type === "login" ? "CREATE ACCOUNT" : "LOG IN"}
            link={type === "login" ? "/signup" : "/login"}
          />
        </div>
      </form>
    </div>
  );
}

export default Form;
