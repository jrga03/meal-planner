import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { ServerStyleSheets } from "@material-ui/styles";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const styledComponentsSheet = new ServerStyleSheet();
    const materialSheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentsSheet.collectStyles(materialSheets.collect(<App { ...props } />))
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {materialSheets.getStyleElement()}
            {styledComponentsSheet.getStyleElement()}
          </>
        )
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="Meal Planner" />
          <meta name="apple-mobile-web-app-title" content="Meal Planner" />
          <meta name="theme-color" content="#607D8B" />
          <meta name="msapplication-navbutton-color" content="#607D8B" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="msapplication-starturl" content="/" />

          <link rel="icon" type="image/png" sizes="48x48" href="/images/icons/icon-48x48.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="48x48" href="/images/icons/icon-48x48.png" />
          <link rel="icon" type="image/png" sizes="72x72" href="/images/icons/icon-72x72.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="72x72" href="/images/icons/icon-72x72.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/images/icons/icon-96x96.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="96x96" href="/images/icons/icon-96x96.png" />
          <link rel="icon" type="image/png" sizes="144x144" href="/images/icons/icon-144x144.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="144x144" href="/images/icons/icon-144x144.png" />
          <link rel="icon" type="image/png" sizes="168x168" href="/images/icons/icon-168x168.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="168x168" href="/images/icons/icon-168x168.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/images/icons/icon-192x192.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="192x192" href="/images/icons/icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="256x256" href="/images/icons/icon-256x256.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="256x256" href="/images/icons/icon-256x256.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/images/icons/icon-512x512.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="512x512" href="/images/icons/icon-512x512.png" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
