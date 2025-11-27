import React from "react";
import "./../css/Auth.css";
const Auth = () => {
  return (
    <div className="auth-row">
      <button type="button" className="auth-btn">
        Signup
      </button>
      <button type="button" className="auth-btn auth-btn-primary">
        Login
      </button>
    </div>
  );
};

export default Auth;
