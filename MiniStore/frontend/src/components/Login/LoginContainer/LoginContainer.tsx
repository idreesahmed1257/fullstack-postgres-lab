import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "./loginContainer.module.scss";
import apiInterceptor from "../../../services/ApiInterceptor";
import Cookies from "js-cookie";
import { loginSuccess } from "../../../Redux/slice/auth.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Redux/store";
import { loginService } from "../../../services/auth.service";

const LoginContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await toast.promise(loginService(email, password), {
        loading: "Logging in...",
        success: "Login successful!",
        error: "Login failed.",
      });
      const token = response?.data?.data?.token;
      const user = response?.data?.data?.user;

      if (token) {
        Cookies.set("accessToken", token, {
          expires: 7,
          path: "/",
          secure: true,
        });
        dispatch(loginSuccess({ user, token }));
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleClickSignup = () => {
    navigate("/signup");
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Please login to your account</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.inputLabel}>
              Email Address
            </label>
            <input id="email" type="email" placeholder="you@example.com" className={styles.inputField} required value={email} onChange={(e) => setEmail(e.target.value)} />
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

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>

        <div className={styles.alreadyAccount}>
          New to Giftly? <span onClick={handleClickSignup}>Create an Account</span>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
