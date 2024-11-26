import { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // to navigate user to where they came from before login

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const errRef = useRef();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      try {
        const response = await axios.post(
          "/auth/login",
          JSON.stringify({ email, password }),
          {
            headers: {
              "Content-Type": "application/json",
              withCredentials: true,
            },
          }
        );
        console.log(JSON.stringify(response?.data));
        const accessToken = response.data.token;
        console.log(accessToken);
        setAuth({ email, password, accessToken });
        setEmail("");
        setPassword("");
        navigate(from, { replace: true });
      } catch (err) {
        if (!err?.response) {
          console.log("No Server Response");
          setError("No Server Response");
        } else if (err.response?.status === 400) {
          console.log("Missing Username or Password");
          setError("Missing Username or Password");
        } else if (err.response?.status === 401) {
          console.log("Unauthorized");
          setError("Unauthorized");
        } else {
          console.log("Login Failed");
          setError("Login Failed");
        }
        setTimeout(() => setError(""), 3000);
      }
    } else {
      alert("invalid email");
      return;
    }
  };

  return (
    <>
      <p
        ref={errRef}
        className={error ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {error}
      </p>
      <div className="background">
        <div className="shape"></div>
        <div className="triangle"></div>
        <div className="square"></div>
      </div>
      <form onSubmit={handleLogin}>
        <h3>Login Here</h3>

        <label>Username</label>
        <input
          type="text"
          placeholder="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button>Log In</button>
        <div className="social">
          <div className="go">
            <i className="fab fa-google"></i> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div>
          <div className="fb">
            <i className=""></i> <Link to="/register">Register</Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
