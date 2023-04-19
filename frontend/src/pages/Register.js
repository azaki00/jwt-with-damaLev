import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit= (e) => {
    e.preventDefault();
  }
  return (
    <div className="container">
      <h2>Register Account</h2>
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
          Already have an account?<Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Register;
