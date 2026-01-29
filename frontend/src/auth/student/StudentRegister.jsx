import React, { useState } from "react";
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

  const sendOTP = () => {
    if (form.mobile.length !== 10) {
      alert("Enter valid mobile number");
      return;
    }
    setForm({ ...form, otpSent: true });
    alert("OTP sent");
  };
  
  const verifyOTP = () => {
    if (form.otp.length !== 6) {
      alert("Enter 6-digit OTP");
      return;
    }
    setForm({ ...form, otpVerified: true });
    alert("Mobile verified");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.otpVerified || !form.agree) {
      alert("Please verify OTP and agree to terms");
      return;
    }

    alert("Account created successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Student Registration</h2>
      <p>Certificates are issued only by verified institutions.</p>

      <input
        type="text"
        name="name"
        placeholder="Full name"
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
        placeholder="Email (optional)"
        value={form.email}
        onChange={handleChange}
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

          <button
            type="button"
            onClick={verifyOTP}
            disabled={form.otpVerified}
          >
            {form.otpVerified ? "Verified ✓" : "Verify OTP"}
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
