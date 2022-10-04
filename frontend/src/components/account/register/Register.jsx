import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import "../login/LoginForm.scss";
import axios from "axios";
import { validationSchema } from "./RegisterValidationSchema";

function RegisterForm({ setExpanded }) {
  const dispatch = useDispatch();
  const wrong = useSelector((state) => state.condition.error);
  const active = useSelector((state) => state.condition.toggle);
  const [success, setSuccess] = useState(null);
  const loginFormTransition = ["login-form__wrapper__top__back"];

  if (active !== "form-close" && active !== "")
    loginFormTransition.push("form-transition");

  if (active === "from-close") loginFormTransition.pop("form-transition");

  // Call data
  const onSubmit = async (values) => {
    const { ...data } = values;

    const response = await axios
      .post("/api/auth/register", data)
      .catch((error) => {
        if (error && error.response) {
          dispatch({
            type: "RESSET_PASSWORD_ERROR",
            payload: error.response.data,
          });
        }
      });
    if (response && response.data) {
      setSuccess("success");
      formik.resetForm();
    }
  };
  const clickHandler = () => {
    setExpanded(true);
    dispatch({ type: "TOGGLE_LOGIN_FORM", payload: "signin" });
  };

  // Handle data from formik form
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <>
      {active === "signup" ? (
        <>
          <div className="login-form__wrapper__top">
            <div className="login-form__wrapper__top__header">
              <h2>Create Account</h2>
              <div
                className="close-btn"
                onClick={() =>
                  dispatch({ type: "TOGGLE_LOGIN_FORM", payload: "form-close" })
                }
              >
                x
              </div>
            </div>
            <p className="login-form__wrapper__top__login">
              Please sign-up to continue!
            </p>
            <div className={loginFormTransition.join(" ")}></div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="wrong-data">{wrong && wrong} </div>
            <div className="success-register">
              {success === "success"
                ? "Success registeration, please login in your profile"
                : ""}{" "}
            </div>
            <div className="login-form__wrapper__par">
              <div className="login-form__wrapper__form-group">
                <input
                  name="name"
                  type="name"
                  placeholder="Username"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
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
              </div>
            </div>
            <button className="login-form__wrapper__top__btn" type="submit">
              Signup
            </button>
            <div>
              <p className="login-form__wrapper__top__new-acc">
                Don't have an account?{" "}
                <span onClick={clickHandler}>Signin</span>
              </p>
            </div>
          </form>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default RegisterForm;
