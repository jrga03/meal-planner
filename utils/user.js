import React, { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext({ user: null, loading: true, logout: () => {} });

export const fetchUser = async () => {
  const res = await fetch("/api/auth/me");
  return res.ok ? await res.json() : null;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(useContext(UserContext));

  useEffect(() => {
    async function fetchUserData() {
      const fetchedUser = await fetchUser();
      setUser({
        user: fetchedUser,
        loading: false
      });
    }

    fetchUserData();
  }, []);

  function logout() {
    setUser({ user: null, loading: true });
  }

  const value = {
    ...user,
    logout
  };

  return <UserContext.Provider value={ value }>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node
};
