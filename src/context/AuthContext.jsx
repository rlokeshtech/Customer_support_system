import { createContext, useContext, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const savedUser = localStorage.getItem("userInfo");

  const [userInfo, setUserInfo] = useState(
    savedUser ? JSON.parse(savedUser) : null
  );

  const login = async (email, password) => {
    const { data } = await API.post("/api/auth/login", { email, password });

    localStorage.setItem("userInfo", JSON.stringify(data));
    setUserInfo(data);

    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await API.post("/api/auth/register", {
      name,
      email,
      password,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
    setUserInfo(data);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);