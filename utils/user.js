import React, { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import useSWR from "swr";
import Fetch from "utils/request";

export const UserContext = createContext({ user: null, loading: true, logout: () => {} });

export const fetchUser = async () => {
  const res = await fetch("/api/auth/me");
  return res.ok ? await res.json() : null;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(useContext(UserContext).user);
  const [loading, setLoading] = useState(useContext(UserContext).loading);
  const { data, isValidating } = useSWR("/api/auth/me", Fetch, {
    onErrorRetry: (error) => {
      if (error.status === 401) return;
    }
  });

  useEffect(() => {
    setUser(data);
    setLoading(isValidating);
  }, [data, isValidating]);

  function logout() {
    setUser(null);
    setLoading(true);
  }

  const value = {
    user,
    loading,
    logout
  };

  return <UserContext.Provider value={ value }>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node
};
