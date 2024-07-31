import React, { useEffect } from "react";

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
    <form className="auth_form" onSubmit={handleSubmit}>
      <h2>{type === "login" ? "Login" : "Sign Up"}</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value.toLowerCase())}
        placeholder="Email"
        required
        style={{ textTransform: "lowercase" }}
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
      <button  type="submit">{type === "login" ? "Login" : "Sign Up"}</button>
    </form>
  );
}

export default Form;
