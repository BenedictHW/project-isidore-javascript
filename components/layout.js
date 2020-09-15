import React from "react";
import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const name = "Hanshen Wang";
export const siteTitle = "HanshenWang.com";

export default function Layout({ children, home, notesPage, blogPage }) {
  return (
    <React.Fragment>
      <Navbar className={styles.colorNavbar} sticky="top">
        <NavDropdown
          /* https://stackoverflow.com/questions/43479577/add-a-image-to-react-bootstrap-dropdown */
          title={
            <svg viewBox="0 0 100 80" width="20" height="20">
              <rect width="100" height="15"></rect>
              <rect y="30" width="100" height="15"></rect>
              <rect y="60" width="100" height="15"></rect>
            </svg>
          }
          className={styles.hamburgerNav}
        >
          <NavDropdown.Item href="/about" className={styles.hamburgerNav}>
            About
          </NavDropdown.Item>
          <NavDropdown.Item href="/work" className={styles.hamburgerNav}>
            Work
          </NavDropdown.Item>
          <NavDropdown.Item href="/blog" className={styles.hamburgerNav}>
            Blog
          </NavDropdown.Item>
          <NavDropdown.Item href="/contact" className={styles.hamburgerNav}>
            Contact
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/" className={styles.hamburgerNav}>
            Home Page
          </NavDropdown.Item>
        </NavDropdown>
        <Navbar.Brand href="/" className={utilStyles.headingNavbar}>
          Hanshen Wang
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/about" className={styles.titleNavbar}>
              About
            </Nav.Link>
            <Nav.Link href="/work" className={styles.titleNavbar}>
              Work
            </Nav.Link>
            <Nav.Link href="/blog" className={styles.titleNavbar}>
              Blog
            </Nav.Link>
            <Nav.Link href="/contact" className={styles.titleNavbar}>
              Contact
            </Nav.Link>
            {notesPage && (
              <Nav.Link href="#top" className={utilStyles.headingNavbar}>
                <img
                  src="/images/uparrow.svg"
                  width="20"
                  height="20"
                  /* className="d-inline-block align-top" */
                  alt="Goto Top"
                />
              </Nav.Link>
            )}
            {blogPage && (
              <Nav.Link href="#top" className={utilStyles.headingNavbar}>
                <img
                  src="/images/uparrow.svg"
                  width="20"
                  height="20"
                  /* className="d-inline-block align-top" */
                  alt="Goto Top"
                />
              </Nav.Link>
            )}
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
        /* https://stackoverflow.com/questions/50970773/change-color-background-color-of-navdropdown-in-react-bootstrap */
        div.dropdown-menu.show {
          background-color: #eee8d5; // for drop down menu color
        }
      `}</style>
    </React.Fragment>
  );
}
