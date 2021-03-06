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
  const context = useContext(UserContext);
  const [user, setUser] = useState(context.user);
  const [loading, setLoading] = useState(context.loading);
  const { data, error } = useSWR("/api/auth/me", Fetch, {
    onErrorRetry: (error) => {
      if (error.status === 401) return;
    }
  });

  useEffect(() => {
    setUser(data);
    setLoading(!data && !error);
  }, [data, error]);

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
