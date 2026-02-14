import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Styles/loginForm.css";


export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [emailEntered, setEmailEntered] = useState(false);

  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter email");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email }
      );

      const res_data = response.data.otp;

      console.log("OTP for testing purposes:", res_data.otp);

      if (response.status === 200) {
        
        setEmailEntered(true);
        alert("OTP sent to email");

      }
    } catch (err) {
      alert("Failed to send OTP");
      console.log(err.response?.data || err.message);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    if (!OTP) {
      alert("Please enter OTP");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/verify-otp",
        { email, otp: OTP }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", "student");
        localStorage.setItem("studentEmail", email);
        alert("Login successful");
        navigate("/student-dashboard");
      }
    } catch (err) {
      alert("Invalid OTP");
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <form
      className="loginForm"
      style={{ marginTop: "200px", width: "500px", height: "auto" }}
    >

      <div className="formElements" id="login1">
        <h5>Email ID</h5>
        <input
          type="email"
          value={email}
          placeholder="johndoe@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {emailEntered && (
        <div className="formElements" id="login1">
          <h5>Enter OTP</h5>
          <input
            type="text"
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
          />
        </div>
      )}

      {!emailEntered ? (
        <button onClick={handleEmailSubmit}>Send OTP</button>
      ) : (
        <button onClick={handleOTPSubmit}>Verify OTP</button>
      )}
    </form>
  );
}
