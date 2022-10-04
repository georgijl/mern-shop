import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../login/LoginForm.scss";
import { useFormik } from "formik";
import axios from "axios";
import { Redirect } from "react-router-dom";

//Components
import ResetPassword from "../resetPassword/ResetPassword";
import { validationSchema } from "./LoginValidationSchema";

const LoginForm = ({ isExpanded, setExpanded, setHideLogin }) => {
  const [success, setSuccess] = useState(false);
  const [successChange, setSuccessChange] = useState(false);

  const dispatch = useDispatch();
  const wrong = useSelector((state) => state.condition.error);
  const active = useSelector((state) => state.condition.toggle);

  // Call data
  const onSubmit = async (values) => {
    const { ...data } = values;

    const response = await axios
      .post("/api/auth/login", data)
      .catch((error) => {
        if (error && error.response) {
          dispatch({
            type: "RESSET_PASSWORD_ERROR",
            payload: error.response.data,
          });
        }
      });

    if (response && response.data) {
      formik.resetForm();
      setSuccess(true);
      localStorage.setItem("token", response.data);
      dispatch({ type: "TOGGLE_LOGIN_FORM", payload: "form-close" });
    }
    dispatch({ type: "USER_NAME", payload: data.name });
  };

  // Handle data from formik form
  const formik = useFormik({
    initialValues: { name: "", password: "" },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  const loginFormTransition = ["login-form__wrapper__top__back"];

  if (isExpanded) loginFormTransition.push("form-transition");

  return (
    <>
      {active === "signin" || active === "change-password" ? (
        <div>
          <div className="login-form__wrapper__top">
            <div className="login-form__wrapper__top__header">
              <h2>Login</h2>
              <div
                className="close-btn"
                onClick={() => {
                  dispatch({
                    type: "TOGGLE_LOGIN_FORM",
                    payload: "from-close",
                  });
                }}
              >
                x
              </div>
            </div>
            <p className="login-form__wrapper__top__login">
              Please login to continue!
            </p>
            <div className={loginFormTransition.join(" ")}></div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            onClick={() => {
              setSuccessChange(false);
            }}
          >
            <div className="wrong-data">{wrong !== "" ? wrong : ""} </div>
            <div className="success-register">
              {successChange && "Your password is changed successful"}
            </div>
            {success && <Redirect to="/cart">{setHideLogin(true)}</Redirect>}
            {active === "signin" ? (
              <>
                <div className="login-form__wrapper__form-group">
                  <input
                    name="name"
                    type="name"
                    placeholder="User name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="error"> {formik.errors.name} </div>
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
                </div>
                <div>
                  <p
                    className="login-form__wrapper__top__forgot"
                    onClick={() => {
                      dispatch({
                        type: "TOGGLE_LOGIN_FORM",
                        payload: "change-password",
                      });
                    }}
                  >
                    Forget your password?
                  </p>
                </div>
                <button type="submit" className="login-form__wrapper__top__btn">
                  Signin
                </button>
              </>
            ) : (
              ""
            )}
          </form>
          {active === "change-password" ? (
            <ResetPassword setSuccessChange={setSuccessChange} />
          ) : (
            ""
          )}
          <div>
            <p className="login-form__wrapper__top__new-acc">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setExpanded(true);
                  dispatch({ type: "TOGGLE_LOGIN_FORM", payload: "signup" });
                }}
              >
                Signup
              </span>
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default LoginForm;
