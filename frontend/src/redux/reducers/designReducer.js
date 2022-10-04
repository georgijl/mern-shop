import * as actionTypes from "../constants/designConstants";

export const DesignReducer = (
  state = {
    payment: false,
    error: "",
    toggle: "",
    open: "",
    success: "",
    payed: "",
    username: "",
    show: "",
    userId: "",
  },
  action
) => {
  switch (action.type) {
    case actionTypes.SHOW_PAYMENT:
      return { ...state, payment: true };
    case actionTypes:
      return { ...state, error: action.payload };
    case actionTypes.TOGGLE_LOGIN_FORM:
      return { ...state, toggle: action.payload };
    case actionTypes.OPEN_LOGIN_FORM:
      return { ...state, open: action.payload };
    case actionTypes.SUCCESS_PAYMENT:
      return { ...state, success: action.payload };
    case actionTypes.SUCCESS_PAYMENT_MESSAGE:
      return { ...state, payed: action.payload };
    case actionTypes.USER_NAME:
      return { ...state, username: action.payload };
    case actionTypes.SHOW:
      return { ...state, show: action.payload };
    case actionTypes.USER_TOKEN_ID:
      return { ...state, userId: action.payload };
    default:
      return state;
  }
};
