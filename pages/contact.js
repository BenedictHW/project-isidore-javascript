import Head from "next/head";
import styles from "../components/layout.module.css";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/date";

export default function Home() {
  return (
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
            <h1>Ways to get in contact</h1>
          </section>
          <section>
            <p>
              Questions, comments, death threats? Don't hesitate to reach out to
              me via email at:
            </p>
            {/* https://stackoverflow.com/questions/483212/effective-method-to-hide-email-from-spam-bots */}
            <a
              href="#"
              className={utilStyles.cryptedmail}
              data-name="hanshen"
              data-domain="hanshenwang"
              data-tld="com"
              onclick="window.location.href = 'mailto:' + this.dataset.name + '@' + this.dataset.domain + '.' + this.dataset.tld; return false;"
            ></a>
          </section>
        </div>
      </div>
      <style jsx global>{`
        .pageFooter {
          position: absolute;
          bottom: 0;
          width: max-content;
          height: 2.5rem;
        }
        .footerText {
          font-size: 0.6rem;
        }
      `}</style>
    </Layout>
  );
}
