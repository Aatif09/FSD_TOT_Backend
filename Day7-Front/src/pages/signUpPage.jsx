import { useState } from "react";
import { Link } from 'react-router-dom';
const SignUpPage = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const handleSendOtp = async (e) => {
    try {
      e.preventDefault();

      const email = e.target.email.value;
      console.log(email)
      if (!isOtpSent) {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/v1/otps",
          {
            method: "POST",
            body: JSON.stringify({ email: email }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        const resObj = await response.json();
        if (resObj.status === "Success") {
          setIsOtpSent(true);
        }
        else {
          alert(resObj.message);
        }
      }
      else {
        console.log("UserCreation");
        const otp = e.target.otp.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/v1/users",
          {
            method: "POST",
            body: JSON.stringify({ email, otp, password }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        const resObj = await response.json();
        if (resObj.status === "success") {
          alert(resObj.message);
        }
        else {
          alert(resObj.message);
        }
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSendOtp}>
        <div>
          <label>Email</label>
          <input name="email" type="text" />
        </div>
        {!isOtpSent ? (
          <button >Send OTP</button>
        ) : (
          <div>
            <div>
              <label>OTP</label>
              <input name="otp" type="text"></input>
            </div>
            <div>
              <label>Password</label>
              <input name="password" type="password" />
            </div>
            <div>
              <label>Confirm Password</label>
              <input name="confirmPassword" type="password"></input>
            </div>
            <button>Register</button>

          </div>
        )}
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default SignUpPage;