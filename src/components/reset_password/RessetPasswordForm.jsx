import { useForm } from "react-hook-form";
import React from "react";
export default function ResetPasswordForm({ handlePasswordReset }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handlePasswordReset(data);
    reset();
  };

  return (
    <form className="reset_password_form" onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Email" {...register("email", { required: true })} />

      {errors.email && <span>This field is required</span>}

      <button type="submit" className="primary-button button">
        Submit
      </button>
    </form>
  );
}
