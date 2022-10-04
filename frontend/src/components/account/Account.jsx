import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./login/LoginForm.scss";

// Components
import LoginForm from "./login/LoginForm";
import RegisterForm from "./register/Register";

function Account({ loginToggle, setLoginToggle, setHideLogin }) {
  const active = useSelector((state) => state.condition.toggle);

  const [isExpanded, setExpanded] = useState(false);

  const loginFormClass = ["login-form"];

  if (active !== "form-close" && active !== "") loginFormClass.push("form");
  if (active === "from-close") loginFormClass.pop("form");
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div className={loginFormClass.join(" ")}>
      <div className="login-form__wrapper">
        <RegisterForm
          loginToggle={loginToggle}
          setLoginToggle={setLoginToggle}
          isExpanded={isExpanded}
          setExpanded={setExpanded}
        />
        <LoginForm
          loginToggle={loginToggle}
          setLoginToggle={setLoginToggle}
          isExpanded={isExpanded}
          setExpanded={setExpanded}
          setHideLogin={setHideLogin}
        />
      </div>
    </div>
  );
}

export default Account;
