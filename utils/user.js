import React, { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext({ user: null, loading: true });

export const fetchUser = async () => {
  const res = await fetch("/api/me");
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

  return <UserContext.Provider value={ user }>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node
};
