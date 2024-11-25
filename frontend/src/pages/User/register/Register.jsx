import React, { useState} from "react"
import axios from "axios";


const Register = () => {
  const [email, setEmail] = useState("")
  const [pw, setPw] = useState("")
  const [confPw, setConfPw] = useState("")
  const [err, setErr] = useState("")
  
  // validate email format
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleClick = async (event) => {
    event.preventDefault()

    // validate email and password
    if (!validateEmail(email)) {
      setErr("Invalid email")
      console.log("Invalid email")
      return
    }

    if (pw != confPw) {
      setErr("Password does not match")
      console.log("Password does not match")
      return
    }

    // post to backend
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {email: email, password: pw})
      console.log("Registered successfully:")
      console.log(response.data)
      
    } catch(err) {
      console.log(err)
    }
    setErr("")
    
  }


  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form>
        <h3>Register</h3>

        <label htmlFor="email">Email</label>
        <input 
          value={email} 
          onChange={(event) => setEmail(event.target.value)} 
          type="email" 
          placeholder="JohnDoe@gmail.com" 
          id="email"
        />

        <label htmlFor="pw">Password</label>
        <input 
          value={pw} 
          onChange={(event) => setPw(event.target.value)} 
          type="password" 
          id = "pw"
        />

        <label htmlFor="confPw">Confirm Password</label>
        <input 
          value={confPw} 
          onChange={(event) => setConfPw(event.target.value)} 
          type="password" 
          id = "confPw"
        />

        {err && <p style={{ color: "red" }}>{err}</p>}

        <button onClick={handleClick} type="submit">Register</button>
        <div className="social">
          <h4> LOGIN </h4>
        </div>
      </form>
    </>
  );
};

export default Register;
