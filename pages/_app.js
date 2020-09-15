// bootstrap.min.css is the same as bootstrap.css. It is minified to reduce file size.
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";
import App from "next/app";
import React from "react";
import { PageTransition } from "next-page-transitions";

// https://github.com/illinois/next-page-transitions
export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <React.Fragment>
        <PageTransition timeout={300} classNames="page-transition">
          <Component {...pageProps} key={router.route} />
        </PageTransition>
        <style jsx global>{`
          .page-transition-enter {
            opacity: 0;
          }
          .page-transition-enter-active {
            opacity: 1;
            transition: opacity 300ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity 300ms;
          }
        `}</style>
      </React.Fragment>
    );
  }
}
