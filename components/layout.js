import React from "react";
import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { Navbar, Nav } from "react-bootstrap";

const name = "Hanshen Wang";
export const siteTitle = "HanshenWang.com";

export default function Layout({ children, home, notesPage, blogPage }) {
  return (
    <React.Fragment>
      <Navbar className="colorNavbar" sticky="top">
        <Navbar.Brand href="/" className={utilStyles.headingNavbar}>
          Hanshen Wang
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/about" className={utilStyles.titleNavbar}>
              About
            </Nav.Link>
            <Nav.Link href="/work" className={utilStyles.titleNavbar}>
              Work
            </Nav.Link>
            <Nav.Link href="/blog" className={utilStyles.titleNavbar}>
              Blog
            </Nav.Link>
            <Nav.Link href="/contact" className={utilStyles.titleNavbar}>
              Contact
            </Nav.Link>
            <Nav.Link href="#top" className={utilStyles.headingNavbar}>
              Back to Top
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/images/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.now.sh/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <main id="top">{children}</main>
        {blogPage && (
          <div className={styles.backToHome}>
            <Link href="/blog">
              <a>← Back to Articles List</a>
            </Link>
          </div>
        )}
        {notesPage && (
          <div className={styles.backToHome}>
            <Link href="/notes">
              <a>← Back to Notes List</a>
            </Link>
          </div>
        )}
        {home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Back to Home</a>
            </Link>
          </div>
        )}
      </div>
      <style jsx global>{`
        .colorNavbar {
          background-color: #eee8d5;
          /* https://www.sitepoint.com/community/t/can-you-help-me-with-my-navigation-bar/9619/6 */
          overflow: hidden;
        }
      `}</style>
    </React.Fragment>
  );
}
