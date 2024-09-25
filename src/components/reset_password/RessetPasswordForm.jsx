import { useForm } from "react-hook-form";
import React from "react";
export default function ResetPasswordForm({ handlePasswordReset, className }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handlePasswordReset(data);
    reset();
  };

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Email" {...register("email", { required: true })} />

      {errors.email && <span>This field is required</span>}

      <button type="submit" className="primary-button button">
        Submit
      </button>
    </form>
  );
}
