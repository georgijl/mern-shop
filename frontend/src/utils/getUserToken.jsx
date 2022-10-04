import jwt from "jwt-decode";

export const getUser = (token) => {
  const user = jwt(token);

  return user._id;
};
