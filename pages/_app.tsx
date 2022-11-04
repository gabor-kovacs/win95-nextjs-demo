import type { AppProps } from "next/app";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/win95";
import original from "react95/dist/themes/original";
import Head from "next/head";
//@ts-ignore 🤫🤫🤫
import { ClippyProvider } from "@react95/clippy";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Frontend Next.js Task</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <ClippyProvider>
          {/*
        //@ts-ignore  */}
          <Component {...pageProps} />;
        </ClippyProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
