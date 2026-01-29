import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Styles/loginForm.css";

export default function UserLogin() {
  let [email, setEmail] = useState("");
  let [pwd1, setPwd1] = useState("");

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !pwd1) {
      alert("Please fill all the fields");
      return;
    }

    const data = {
      email: email,
      password: pwd1,
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
