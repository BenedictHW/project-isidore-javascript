import React from "react";
import Head from "next/head";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { Button, Carousel, Container, Row, Col } from "react-bootstrap";
// https://www.npmjs.com/package/react-typist-loop
import Typist from "react-typist";
// https://github.com/jstejada/react-typist/issues/6
import BgFade from "../components/slideshow";

const words = [
  "Hello!",
  "Bonjour,",
  "你好",
  "¡Hola!",
  "Здравствуйте",
  "Welcome!",
  "Salve",
  "こんにちは",
  "Guten Tag",
  "Olá!",
  "Good Day,",
  "여보세요",
  "Halløj",
  "नमस्ते",
  "שלום",
  "Hey there,",
  "Dzień dobry",
  "Χαίρετε",
  "مرحبا ",
  "Dia dhuit",
];

for (let i = 20; i < 40; i++) {
  words[i] = words[i - 20];
}

export default function IndexPage() {
  return (
    <React.Fragment>
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
        <title>HanshenWang.com</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <BgFade />
      <Container className="portfolioContent">
        <Row>
          <Col>
            <img
              src="/images/profile.jpg"
              className="portfolioProfile"
              alt={"Author Profile Picture"}
            />
          </Col>
          <Col>
            <Typist>
              {words.map((word, i) => (
                <span key={word} className={utilStyles.heading2Xl}>
                  {word}
                  <Typist.Backspace count={word.length} delay={2000} />
                </span>
              ))}
            </Typist>
            <br></br>
            <h1 className={utilStyles.headingPortfolio}>
              I’m Hanshen. <br /> Nice to meet you.
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="portfolioIntro">
              Welcome to my personal website! This website was built with
              <a
                className="portfolioLink"
                href="https://nextjs.org"
                target="_blank"
              >
                {" "}
                Next.js{" "}
              </a>{" "}
              and React. My resume can be found under the work tab. I hope you
              find what you're looking for, and may the wind be always at your
              back.
            </h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button className="portfolioButton" variant="outline-light">
              <Link href={"/about"}>
                <h2 className={utilStyles.headingLg}>About</h2>
              </Link>
            </Button>
          </Col>
          <Col>
            <Button className="portfolioButton" variant="outline-light">
              <Link href={"/work"}>
                <h2 className={utilStyles.headingLg}>Work</h2>
              </Link>
            </Button>
          </Col>
          <Col>
            <Button className="portfolioButton" variant="outline-light">
              <Link href={"/blog"}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
              </Link>
            </Button>
          </Col>
          <Col>
            <Button className="portfolioButton" variant="outline-light">
              <Link href={"/contact"}>
                <h2 className={utilStyles.headingLg}>Contact</h2>
              </Link>
            </Button>
          </Col>
        </Row>
      </Container>
      <style jsx global>{`
        /* https://css-tricks.com/perfect-full-page-background-image/ */

        .backgroundImage {
          /* Set rules to fill background */
          min-height: 100%;
          min-width: 1024px;

          /* Set up proportionate scaling */
          width: 100%;
          height: auto;

          /* Set up positioning */
          position: fixed;
          top: 0;
          left: 0;
          z-index: -2;
        }
        .bg {
          /* Set rules to fill background */
          min-height: 100%;
          min-width: 1024px;

          /* Set up proportionate scaling */
          width: 100%;
          height: auto;

          /* Set up positioning */
          position: fixed;
          top: 0;
          left: 0;
        }
        @media screen and (max-width: 1024px) {
          /* Specific to this particular image */
          .bg {
            left: 50%;
            margin-left: -512px; /* 50% */
          }
        }
        html,
        body {
          background-color: #fff32100;
        }
        .portfolioProfile {
          width: 175px;
          height: 175px;
          margin: 0rem 3rem 1rem 3rem;
          border-radius: 9999px;
        }
        /* https://css-tricks.com/forums/topic/horizontal-centering-of-an-absolute-element/ */
        .portfolioContent {
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          max-width: 48rem;
          z-index: 1000;
          padding: 3rem 3rem;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 80px;
        }
        .portfolioIntro {
          font-family: "Merriweather", serif;
          font-weight: 900;
          font-style: Italic;
          font-size: 1.2rem;
          margin: 2rem 0rem;
        }
        .portfolioLink {
          color: cyan;
        }
        .portfolioButton {
          margin: 1rem 0rem;
        }
        h1 {
          color: white;
        }
        h2 {
          color: white;
        }
        h3 {
          color: white;
        }
        span {
          color: white;
        }
        .Typist .Cursor {
          display: inline-block;
          font-size: 2.5rem;
        }
        .Typist .Cursor--blinking {
          opacity: 1;
          animation: blink 1s linear infinite;
        }

        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </React.Fragment>
  );
}
