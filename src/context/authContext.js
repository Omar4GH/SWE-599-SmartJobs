import axios from "axios";
import { createContext, useEffect, useState } from "react";
import _axios from "../api/_axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("ls_user") || null)
  );

  const login = async (inputs) => {
    const res = await _axios.post("auth/login",inputs);
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
   await _axios.post("auth/logout");
    setCurrentUser(null);
  };

  const handleTokenLogin = async (token) => {
    try {
      const res = await _axios.post("auth/token-login", { token });
      setCurrentUser(res.data);
      console.log("Looged with Token :", res.data);
    } catch (error) {
      console.error("Error during token login:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("ls_user", JSON.stringify(currentUser));
  }, [currentUser]);
  return (
    <AuthContext.Provider value={{ currentUser, login, logout,handleTokenLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
