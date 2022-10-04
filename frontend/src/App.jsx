import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

// Screens
import HomeScreen from "./screens/homeScreen/HomeScreen";
import ProductScreen from "./screens/productScreen/ProductScreen";
import CartScreen from "./screens/cartScreen/CartScreen";

// Components
import Navbar from "./components/navbar/Navbar";
import SideDrawer from "./components/side/SideDrawer";
import Backdrop from "./components/backdrop/Backdrop";
import Account from "./components/account/Account";
import { getUser } from "./utils/getUserToken";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  const [loginToggle, setLoginToggle] = useState(false);
  const [hideLogin, setHideLogin] = useState(false);

  const userId = useSelector((state) => state.condition.userId);

  const getUsername = useCallback(async () => {
    if (!userId) return;

    const response = await axios.get(`/api/auth/user/${userId}`);
    dispatch({
      type: "USER_NAME",
      payload: response.data,
    });
  }, [dispatch, userId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "USER_TOKEN_ID", payload: getUser(token) });
      getUsername();
      setHideLogin(true);
      return;
    }
    setHideLogin(false);
  }, [dispatch, getUsername]);

  return (
    <Router>
      <Navbar
        click={() => dispatch({ type: "SHOW", payload: "show" })}
        setLoginToggle={setLoginToggle}
        hideLogin={hideLogin}
      />
      <Account
        loginToggle={loginToggle}
        setLoginToggle={setLoginToggle}
        hideLogin={hideLogin}
        setHideLogin={setHideLogin}
      />
      <SideDrawer setLoginToggle={setLoginToggle} hideLogin={hideLogin} />
      <Backdrop click={() => dispatch({ type: "SHOW", payload: "hide" })} />
      <main>
        <Switch>
          <Route
            exact
            path="/"
            component={HomeScreen}
            loginToggle={loginToggle}
            setLoginToggle={setLoginToggle}
          />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart" component={CartScreen} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
