import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Login.scss";

const LoginNav = ({ setLoginToggle, hideLogin }) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.condition.username);

  const [opened, setOpened] = useState(false);
  const handleOpened = () => setOpened((s) => !s);
  const handleLogout = () => {
    window.location.reload(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="user-wrapper">
      {!hideLogin ? (
        <div
          className="user-login"
          onClick={() =>
            dispatch({ type: "TOGGLE_LOGIN_FORM", payload: "signin" })
          }
        >
          Login
        </div>
      ) : (
        <div
          className="user-login-success"
          onClick={() => {
            setLoginToggle(true);
          }}
        >
          {username}
          <i className="fas fa-cogs" onClick={handleOpened}></i>
          {opened && (
            <div className="settings-menu">
              <i
                className="fas fa-sign-out-alt fa-2x"
                onClick={handleLogout}
              ></i>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginNav;
