import React from "react";
import type { AppProps } from "next/app";
import { styleReset } from "react95";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";
import Script from "next/script";

const GlobalStyles = createGlobalStyle`
  ${styleReset} 
  @font-face {
    font-family: "MS Sans Serif";
    src: url('/fonts/ms_sans_serif.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: "MS Sans Serif";
    src: url('/fonts/ms_sans_serif_bold.woff2') format('woff2');
    font-weight: 800;
    font-style: normal;
  }
  body {
    font-family: "MS Sans Serif", sans-serif;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7KSJK5DB2H"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-7KSJK5DB2H');
          `}
        </Script>
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}
