import styles from "../../Login/LoginContainer/loginContainer.module.scss";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signupService } from "../../../services/auth.service";
import toast from "react-hot-toast";

const SignupContainer = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      await toast.promise(signupService(name, email, password), {
        loading: "Signin up...",
        success: "Signup successful!",
        error: "Signup failed.",
      });

      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleClickLogin = () => {
    navigate("/login");
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Create an Account</h1>
        <p className={styles.subtitle}>Sign up to get started</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.inputLabel}>
              Email Address
            </label>
            <input id="email" type="email" placeholder="you@example.com" className={styles.inputField} required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.inputLabel}>
              Full Name
            </label>
            <input id="name" type="name" placeholder="John Doe" className={styles.inputField} required value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className={styles.inputGroup} style={{ position: "relative" }}>
            <label htmlFor="password" className={styles.inputLabel}>
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={styles.inputField}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingRight: "40px" }} // space for toggle icon
            />
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
              aria-label={showPassword ? "Hide password" : "Show password"}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleShowPassword();
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </div>
          </div>

          <div className={styles.inputGroup} style={{ position: "relative" }}>
            <label htmlFor="confirm-password" className={styles.inputLabel}>
              Conform Password
            </label>
            <input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={styles.inputField}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ paddingRight: "40px" }} // space for toggle icon
            />
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
              aria-label={showPassword ? "Hide password" : "Show password"}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleShowPassword();
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </div>
          </div>

          <button type="submit" className={styles.loginButton}>
            Sign Up
          </button>
        </form>

        <div className={styles.alreadyAccount}>
          Already have an account? <span onClick={handleClickLogin}>Login</span>
        </div>
      </div>
    </div>
  );
};

export default SignupContainer;
