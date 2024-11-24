import { Link } from "react-router-dom";
const Login = () => {
  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form>
        <h3>Login Here</h3>

        <label>Username</label>
        <input type="text" placeholder="Email or Phone" id="username" />

        <label>Password</label>
        <input type="password" placeholder="Password" id="password" />

        <button>Log In</button>
        <div className="social">
          <div className="go">
            <i className="fab fa-google"></i> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div>
          <div className="fb">
            <i className=""></i> <Link>Register</Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
