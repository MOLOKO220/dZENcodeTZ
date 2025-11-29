import "@/styles/global.scss";
import type { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { storage } from "../storage";
import Wrapper from "component/Wrapper/Wrapper";
import Header from "component/Header/Header";
import Head from "next/head";
import AppLoader from "component/AppLoader/AppLoader";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={storage}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" />
      </Head>

      <AppLoader>
        <Header />
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </AppLoader>
    </Provider>
  );
}
