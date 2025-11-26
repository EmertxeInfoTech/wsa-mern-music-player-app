import React from "react";

const Auth = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: 16,
        width: "100%",
        backgroundColor: "red",
        marginBottom: "16px",
      }}
    >
      <button type="button" style={{ padding: "5px", borderRadius: "5px" }}>
        Signup
      </button>
      <button
        type="button"
        style={{
          padding: "5px",
          borderRadius: "5px",
          backgroundColor: "rgb(0, 255, 255)",
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Auth;
