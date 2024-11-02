import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserData(decodedToken);
    }
    setLoading(false);
  }, []);

  const login = (token, navigate) => {
    const decodedToken = jwtDecode(token);
    if (decodedToken) {
      localStorage.setItem("token", token);
      setUserData(decodedToken);
      navigate("/menu");
    } else {
      navigate("/unauthorized");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ userData, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
