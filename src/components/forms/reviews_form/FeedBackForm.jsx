import React from "react";
import { useForm } from "react-hook-form";
import PrimaryButton from "../../common/buttons/PrimaryButton";
import ButtonUniversal from "../../common/buttons/ButtonUniversal";

function FeedBackForm({ handleReviewSubmit, className }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    handleReviewSubmit(data);
    reset();
  };

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      {/* Name Field */}
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          placeholder="Enter your name"
          required
          {...register("name")}
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          required
          {...register("email", {
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Invalid email address",
            },
          })}
        />
      </div>

      {/* Gender Selection Field */}
      <div className="gender-input-container">
        <label htmlFor="gender">Gender</label>
        <select id="gender" {...register("gender")}>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Date Selection Field */}
      <div className="date-input-container">
        <label htmlFor="date">Select visited time</label>
        <input
          type="datetime-local"
          className="date-input"
          id="date"
          placeholder="Select date"
          {...register("date")}
        />
        {/* span to open input date onClick */}
        <span
          className="calendar-overlay"
          onClick={() => {
            const dateInput = document.getElementById("date");
            if (dateInput.showPicker) {
              dateInput.showPicker();
            } else {
              dateInput.focus();
            }
          }}
        ></span>
      </div>

      {/* Review Field */}
      <div className="textearea-input-container">
        <label htmlFor="review">Message</label>
        <textarea
          id="review"
          placeholder="Enter your review"
          {...register("review", { required: "Review is required" })}
        />
        {errors.review && <span>{errors.review.message}</span>}
      </div>
      <fieldset className="checkbox-input-container">
        <input
          id="personal"
          type="checkbox"
          required
          {...register("personal-data")}
        />
        <label htmlFor="personal">Approved for personal data processing</label>
      </fieldset>

      <ButtonUniversal
        title={`Submit`}
        type={`submit`}
        className={"primary-button button"}
      />
    </form>
  );
}

export default FeedBackForm;
