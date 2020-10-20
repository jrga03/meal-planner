import React, { useState, useEffect, useMemo, createContext, useContext } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  StylesProvider
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import styled, { ThemeProvider } from "styled-components";

import muiTheme from "theme";
import { UserProvider } from "utils/user";

const PALETT_TYPE_KEY = "PALETT_TYPE";

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
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [paletteType, setPaletteType] = useState(useContext(PaletteContext).paletteType);
  const isDark = paletteType === "dark";

  useEffect(() => {
    const themeType = prefersDarkMode ? "dark" : "light";
    const storedPreference = localStorage.getItem(PALETT_TYPE_KEY);
    setPaletteType(storedPreference || themeType);
  }, [prefersDarkMode]);

  const theme = useMemo(() => {
    let createdTheme = createMuiTheme(muiTheme(paletteType));
    createdTheme = responsiveFontSizes(createdTheme);
    return createdTheme;
  }, [paletteType]);

  const handleUpdatePalette = (type) => {
    localStorage.setItem(PALETT_TYPE_KEY, type);
    setPaletteType(type);
  };

  const paletteProviderValue = {
    paletteType,
    setPaletteType: handleUpdatePalette,
    isDark
  };

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={ theme }>
        <ThemeProvider theme={ theme }>
          <PaletteContext.Provider value={ paletteProviderValue }>
            <UserProvider>
              <CssBaseline />
              <Container>
                <Head>
                  <title>Meal Planner</title>
                  <link rel="manifest" href="manifest.json" />
                  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
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
