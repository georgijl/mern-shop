import * as yup from "yup";

// Yup validations
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const validationSchema = yup.object({
  email: yup.string().email("Please enter a valid email").required(),
  password: yup.string().required("password is required"),
  newPassword: yup
    .string()
    .matches(PASSWORD_REGEX, "Please enter a strong password")
    .required(),
});
