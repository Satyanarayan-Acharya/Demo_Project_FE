import React from "react";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }: any) => {
  const token = localStorage.getItem("token_dummy");
  if (!token) {
    window.location.href="/"
    return
  }
  return children
};

export default PrivateRoute;