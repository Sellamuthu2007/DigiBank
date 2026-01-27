import React, { useState } from "react";
import axios from "axios";
import "../../Styles/StudentRegiter.css";

const StudentRegister = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    otp: "",
    otpSent: false,
    otpVerified: false,
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const sendOTP = async () => {
    if (!form.email || !form.mobile || !form.name) {
      alert("Fill all required fields");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        username: form.name,
        email: form.email,
        phone: form.mobile,
      });

      setForm({ ...form, otpSent: true });
      alert("OTP sent (check backend console)");
    } catch (err) {
      alert(err.response?.data?.message || "OTP send failed");
    }
  };

  const verifyOTP = async () => {
    if (form.otp.length !== 6) {
      alert("Enter 6-digit OTP");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/auth/verify-otp", {
        email: form.email,
        otp: form.otp,
      });

      setForm({ ...form, otpVerified: true });
      alert("OTP verified");
    } catch (err) {
      alert("Invalid OTP" + (err.response?.data?.message || ""));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.otpVerified || !form.agree) {
      alert("Verify OTP & accept terms");
      return;
    }

    alert("Student registered successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Student Registration</h2>
      <p>Certificates are issued only by verified institutions.</p>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        type="tel"
        name="mobile"
        placeholder="Mobile Number"
        value={form.mobile}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      {!form.otpSent ? (
        <button type="button" onClick={sendOTP}>
          Send OTP
        </button>
      ) : (
        <>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={form.otp}
            onChange={handleChange}
          />
          <button type="button" onClick={verifyOTP}>
            Verify OTP
          </button>
        </>
      )}

      <label>
        <input
          type="checkbox"
          name="agree"
          checked={form.agree}
          onChange={handleChange}
        />
        I agree that I cannot upload certificates myself
      </label>

      <button type="submit" disabled={!form.otpVerified || !form.agree}>
        Create Account
      </button>
    </form>
  );
};

export default StudentRegister;