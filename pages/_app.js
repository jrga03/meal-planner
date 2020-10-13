import React, { useState, useEffect, useMemo, createContext, useContext } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider as MuiThemeProvider, createMuiTheme, responsiveFontSizes , StylesProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import styled, { ThemeProvider } from "styled-components";

import muiTheme from "theme";
import { UserProvider, useFetchUser, fetchUser } from "utils/user";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const PaletteContext = createContext({ paletteType: "light" });

function MyApp({ Component, pageProps }) {
  const user = useFetchUser();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [paletteType, setPaletteType] = useState(useContext(PaletteContext).paletteType);
  const isDark = paletteType === "dark";

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user]);

  useEffect(() => {
    const themeType = prefersDarkMode ? "dark" : "light";
    setPaletteType(themeType);
  }, [prefersDarkMode]);

  const theme = useMemo(() => {
    let createdTheme = createMuiTheme(muiTheme(paletteType));
    createdTheme = responsiveFontSizes(createdTheme);
    return createdTheme;
  }, [paletteType]);

  const paletteProviderValue = {
    paletteType,
    setPaletteType,
    isDark
  };

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={ theme }>
        <ThemeProvider theme={ theme }>
          <PaletteContext.Provider value={ paletteProviderValue }>
            <UserProvider value={ user }>
              <CssBaseline />
              <Container>
                <Head>
                  <link rel="manifest" href="manifest.json" />

                  <meta name="mobile-web-app-capable" content="yes" />
                  <meta name="apple-mobile-web-app-capable" content="yes" />
                  <meta name="application-name" content="Meal Planner" />
                  <meta name="apple-mobile-web-app-title" content="Meal Planner" />
                  <meta name="theme-color" content="#607D8B" />
                  <meta name="msapplication-navbutton-color" content="#607D8B" />
                  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                  <meta name="msapplication-starturl" content="/" />
                  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                  <link rel="icon" type="image/png" sizes="48x48" href="images/icons/icon-48x48.png" />
                  <link rel="apple-touch-icon" type="image/png" sizes="48x48" href="images/icons/icon-48x48.png" />
                  <link rel="icon" type="image/png" sizes="72x72" href="images/icons/icon-72x72.png" />
                  <link rel="apple-touch-icon" type="image/png" sizes="72x72" href="images/icons/icon-72x72.png" />
                  <link rel="icon" type="image/png" sizes="96x96" href="images/icons/icon-96x96.png" />
                  <link rel="apple-touch-icon" type="image/png" sizes="96x96" href="images/icons/icon-96x96.png" />
                  <link rel="icon" type="image/png" sizes="144x144" href="images/icons/icon-144x144.png" />
                  <link rel="apple-touch-icon" type="image/png" sizes="144x144" href="images/icons/icon-144x144.png" />
                  <link rel="icon" type="image/png" sizes="168x168" href="images/icons/icon-168x168.png" />
                  <link rel="apple-touch-icon" type="image/png" sizes="168x168" href="images/icons/icon-168x168.png" />
                  <link rel="icon" type="image/png" sizes="192x192" href="images/icons/icon-192x192.png" />
                  <link rel="apple-touch-icon" type="image/png" sizes="192x192" href="images/icons/icon-192x192.png" />
                  <link rel="icon" type="image/png" sizes="256x256" href="images/icons/icon-256x256.png" />
                  <link rel="apple-touch-icon" type="image/png" sizes="256x256" href="images/icons/icon-256x256.png" />
                  <link rel="icon" type="image/png" sizes="512x512" href="images/icons/icon-512x512.png" />
                  <link rel="apple-touch-icon" type="image/png" sizes="512x512" href="images/icons/icon-512x512.png" />
                </Head>
                <Component { ...pageProps } />
              </Container>
            </UserProvider>
          </PaletteContext.Provider>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default MyApp;
