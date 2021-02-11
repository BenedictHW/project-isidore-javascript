import React from "react";
import Head from "next/head";
import styles from "../components/layout.module.css";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/date";

export default function Home() {
  return (
    <React.Fragment>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
        </Head>
        <div>
          <div>
            <section className={utilStyles.headingMd}>
              <h1>Professional Portfolio</h1>
            </section>
            <section>
              <p>
                <a
                  href="https://drive.google.com/file/d/1-D_CkQhgazvBCNr5v3CyxEbHZRXFYXKy/view?usp=sharing"
                  target="_blank"
                >
                  Click this link to view or download my resume (link to Google
                  Drive).
                </a>
                <br />
                Please kindly{" "}
                <Link href="/contact">
                  <a>shoot me an email</a>
                </Link>{" "}
                should the link above be broken.
              </p>
            </section>
            <section className={utilStyles.headingMd}>
              <h1>Side Projects</h1>
            </section>
            <section>
              <p>
                Here one will find my Github repos, my book/course notes (all
                mistakes are mine), and any other miscellaneous items that can
                be used at one's leisure. As with the above,{" "}
                <Link href="/contact">
                  <a>do contact me</a>
                </Link>{" "}
                if something is missing.
              </p>
              <ul>
                <li>
                  <a href="https://github.com/HanshenWang" target="_blank">
                    Github Repositories{" "}
                  </a>
                </li>
                <li>
                  <Link href="/notes">Collected Notes</Link>{" "}
                </li>
              </ul>
            </section>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
}
