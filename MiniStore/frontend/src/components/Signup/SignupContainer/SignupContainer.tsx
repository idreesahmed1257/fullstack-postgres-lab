import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../../services/auth.service";
import styles from "../../Login/LoginContainer/loginContainer.module.scss";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupFormInputs, signupSchema } from "./signup.helper";

const SignupContainer = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      await toast.promise(signupService(data.name, data.email, data.password), {
        loading: "Signing up...",
        success: "Signup successful!",
        error: "Signup failed.",
      });

      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Create an Account</h1>
        <p className={styles.subtitle}>Sign up to get started</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.inputLabel}>
              Full Name
            </label>
            <input id="name" type="text" placeholder="John Doe" className={styles.inputField} {...register("name")} />
            {errors.name && <p className={styles.errorMsg}>{errors.name.message}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.inputLabel}>
              Email Address
            </label>
            <input id="email" type="email" placeholder="you@example.com" className={styles.inputField} {...register("email")} />
            {errors.email && <p className={styles.errorMsg}>{errors.email.message}</p>}
          </div>

          <div className={styles.inputGroup} style={{ position: "relative" }}>
            <label htmlFor="password" className={styles.inputLabel}>
              Password
            </label>
            <input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" className={styles.inputField} style={{ paddingRight: "40px" }} {...register("password")} />
            {errors.password && <p className={styles.errorMsg}>{errors.password.message}</p>}
            <div
              onClick={toggleShowPassword}
              style={{
                position: "absolute",
                right: "10px",
                top: "38px",
                cursor: "pointer",
                color: "#994D80",
                userSelect: "none",
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </div>
          </div>

          <div className={styles.inputGroup} style={{ position: "relative" }}>
            <label htmlFor="confirmPassword" className={styles.inputLabel}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              className={styles.inputField}
              style={{ paddingRight: "40px" }}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p className={styles.errorMsg}>{errors.confirmPassword.message}</p>}
            <div
              onClick={toggleShowPassword}
              style={{
                position: "absolute",
                right: "10px",
                top: "38px",
                cursor: "pointer",
                color: "#994D80",
                userSelect: "none",
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </div>
          </div>

          <button type="submit" className={styles.loginButton} disabled={isSubmitting}>
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className={styles.alreadyAccount}>
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </div>
      </div>
    </div>
  );
};

export default SignupContainer;
