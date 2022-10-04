import React from "react";
import { useDispatch } from "react-redux";
import "../login/LoginForm.scss";
import { useFormik } from "formik";
import axios from "axios";
import { validationSchema } from "./ResetPasswordValidationSchema";

const ResetPassword = ({ setSuccessChange }) => {
  const dispatch = useDispatch();
  // Call data
  const onSubmit = async (values) => {
    const { ...data } = values;

    const response = await axios
      .post("/api/auth/reset-password", data)
      .catch((error) => {
        if (error && error.response) {
          dispatch({
            type: "RESSET_PASSWORD_ERROR",
            payload: error.response.data,
          });
        }
      });

    if (response && response.data) {
      if (response.data.message.length < 50) {
        dispatch({
          type: "RESSET_PASSWORD_ERROR",
          payload: response.data.message,
        });
      } else {
        dispatch({ type: "TOGGLE_LOGIN_FORM", payload: "signin" });
        setSuccessChange(true);
      }
    }
  };

  // Handle data from formik form
  const formik = useFormik({
    initialValues: { email: "", password: "", newPassword: "" },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="login-form__wrapper__form-group">
          {/* {errorState !== "" ? <div className="error">{errorState}</div> : ""} */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error"> {formik.errors.email} </div>
          ) : (
            ""
          )}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error"> {formik.errors.password} </div>
          ) : (
            ""
          )}
          <input
            name="newPassword"
            type="password"
            placeholder="New password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="error"> {formik.errors.newPassword} </div>
          ) : (
            ""
          )}
        </div>
        <button type="submit" className="login-form__wrapper__top__btn">
          Change Password
        </button>
      </form>
    </>
  );
};

export default ResetPassword;
