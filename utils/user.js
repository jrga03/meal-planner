import React, { createContext, useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import fetch from "isomorphic-unfetch";

// Use a global to save the user, so we don't have to fetch it again after page navigations
let userState;

const User = createContext({ user: null, loading: false });

export const fetchUser = async () => {
  if (userState) {
    return userState;
  }

  const res = await fetch("/api/me");
  userState = res.ok ? await res.json() : null;
  return userState;
};

export const UserProvider = ({ value, children }) => {
  const { user } = value;

  // If the user was fetched in SSR add it to userState so we don't fetch it again
  useEffect(() => {
    if (!userState && user) {
      userState = user;
    }
  }, [user]);

  return <User.Provider value={ value }>{children}</User.Provider>;
};

UserProvider.propTypes = {
  value: PropTypes.object,
  children: PropTypes.node
};

export const useUser = () => useContext(User);

export const useFetchUser = () => {
  const [data, setUser] = useState({
    user: userState || null,
    loading: userState === undefined
  });

  useEffect(() => {
    if (userState !== undefined) {
      return;
    }

    let isMounted = true;

    fetchUser().then((user) => {
      // Only set the user if the component is still mounted
      if (isMounted) {
        setUser({ user, loading: false });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [userState]); // eslint-disable-line react-hooks/exhaustive-deps

  return data;
};
