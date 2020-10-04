import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import styled from "styled-components";
import Header from "containers/Header";
import "../styles/globals.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eaeaea;
  height: 100vh;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  height: calc(100% - 56px);
  padding-top: 56px;

  @media screen and (orientation: landscape) {
    height: calc(100% - 48px);
    padding-top: 48px;
  }

  @media screen and (min-width: 600px) {
    height: calc(100% - 64px);
    padding-top: 64px;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
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
      <Header />
      <ContentWrapper>
        <Component {...pageProps} />
      </ContentWrapper>
    </Container>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default MyApp;
