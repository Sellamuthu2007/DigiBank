import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "../../Styles/loginForm.css";

export default function OrganizationRegister() {
  let [name, setName] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [email, setEmail] = useState("");
  let [pwd1, setPwd1] = useState("");
  let [pwd2, setPwd2] = useState("");
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!name || !phoneNumber || !email || !pwd1) {
      alert("Please fill all the fields");
      return;
    }

    const data = {
      name,
      phoneNumber,
      email,
      password: pwd1,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        data,
      );

      if (response.status === 201) {
        alert("Registration Successful");
        navigate("/institution-register");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="loginForm">
        <div className="formElements" style={{ marginTop: "30px" }} id="login1">
          <div>
            <h5>Name</h5>
          </div>
          <div>
            <input
              type="text"
              value={name}
              placeholder="johndoe"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="formElements" id="login1">
          <div>
            <h5>Phone Number</h5>
          </div>
          <div>
            <input
              type="url"
              value={phoneNumber}
              placeholder="+91 9789123456"
              name="phoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="formElements" id="login1">
          <div>
            <h5>Email ID </h5>
          </div>
          <div>
            <input
              type="email"
              value={email}
              name="email"
              placeholder="johndeo123@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="formElements" id="login1">
          <div>
            <h5>Password</h5>
          </div>
          <div>
            <input
              type="password"
              name="pwd1"
              value={pwd1}
              onChange={(e) => setPwd1(e.target.value)}
            />
          </div>
        </div>
        <div className="formElements" id="login1">
          <div>
            <h5>Confirm Password </h5>
          </div>
          <div>
            <input
              type="password"
              name="pwd2"
              value={pwd2}
              onChange={(e) => setPwd2(e.target.value)}
            />
          </div>
        </div>
        {pwd1 !== pwd2 && (
          <p style={{ color: "red", marginLeft: "50px" }} id="login1">
            Password doesn't match
          </p>
        )}
        <p style={{ marginLeft: "200px", marginTop: "5px" }} id="login1">
          Already have Account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/user-login")}
          >
            Login
          </span>
        </p>

        <button
          id="login1"
          style={{
            marginLeft: "200px",
          }}
          onClick={(e) => handleLogin(e)}
        >
          Submit
        </button>
      </form>
    </>
  );
}
