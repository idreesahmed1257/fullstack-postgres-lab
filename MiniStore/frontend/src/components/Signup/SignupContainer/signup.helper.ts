import * as Yup from "yup";

export interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signupSchema = Yup.object().shape({
  name: Yup.string().min(3, "Full name must be at least 3 characters").required("Full name is required"),
  email: Yup.string().email("Please enter a valid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});
