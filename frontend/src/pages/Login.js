import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit= (e) => {
    e.preventDefault();
  }
  return (
    <div className="container">
      <h2>Login Account</h2>
      <form onSubmit={(e)=> handleSubmit(e)}>
        <div>
          <label htmlfor="email">Email</label>
          <input
            type="email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            name="email"
            placeholder="Email"
          ></input>
        </div>
        <div>
          <label htmlfor="password">Password</label>
          <input
            type="password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            name="password"
            placeholder="password"
          ></input>
        </div>
        <button type="submit">Submit</button>
        <span>
          Dont have an account?<Link to="/register">Register</Link>
        </span>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Login;
