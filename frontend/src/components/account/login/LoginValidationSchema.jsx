import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup
    .string()
    .min(4, "Must be at least 10 characters")
    .max(30, "Must be 30 characters or less")
    .required("username is required"),
  password: yup.string().required("password is required"),
});
