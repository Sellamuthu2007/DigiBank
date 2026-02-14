import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Styles/loginForm.css";

export default function OrganizationLogin() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter email");
      return;
    }

    if (!password) {
      alert("Please enter password");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/organization-login",
        { email , password}
      );


      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("organizationToken", token);
        localStorage.setItem("userType", "organization");
        console.log(token)
        alert("Login successful");
        navigate("/organization-dashboard");
      }
    } catch (err) {
      console.log('Full error:', err);
      console.log('Error response:', err.response?.data);
      alert(err.response?.data?.message || "Login failed");
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
        <div className="formElements" id="login1">
          <h5>Enter password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>

        <button onClick={handleSubmit}>Login</button>
    </form>
  );
}
