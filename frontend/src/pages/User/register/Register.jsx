const Register = () => {
  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form>
        <h3>Register</h3>

        <label>Full Name</label>
        <input type="text" placeholder="Name" id="name" />

        <label>Username</label>
        <input type="text" placeholder="Username" id="username" />

        <label>Password</label>
        <input type="password" placeholder="Password" id="password" />

        <label>Confirm Password</label>
        <input type="password" placeholder="Confirm Password" id="password" />

        <button>Register</button>
        <div className="social">
          <h4> LOGIN </h4>
        </div>
      </form>
    </>
  );
};

export default Register;
