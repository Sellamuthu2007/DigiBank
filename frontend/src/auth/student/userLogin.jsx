import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Styles/loginForm.css";

export default function UserLogin() {
  let [email, setEmail] = useState("");
  let [OTP, setOTP] = useState("");

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !OTP) {
      alert("Please fill all the fields");
      return;
    }

    const data = {
      email: email,
      OTP : OTP,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        alert("Login Successful");
        console.log(response.data);
        navigate("/");
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <>
      <form
        className="loginForm"
        style={{ marginTop: "200px", width: "500px", height: "170px" }}
      >
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
            <h5>Enter OTP</h5>
          </div>
          <div>
            <input
              type="password"
              name="OTP"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
            />
          </div>
        </div>
        <button
          id="login1"
          style={{
            marginLeft: "190px",
            width: "100px",
            marginTop: "0px",
          }}
          onClick={(e) => handleLogin(e)}
        >
          Login
        </button>
      </form>
    </>
  );
}
