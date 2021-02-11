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
            <h1>The story so far...</h1>
          </section>
          <section>
            <p>
              Hey there. I'm currently a student up in the Great White North.
              Apart from studies and work, I enjoy swimming, piano, and eating
              peanut butter straight from the jar.{" "}
            </p>
            <section className={utilStyles.headingMd}>
              <h1>Why does this website exist?</h1>
            </section>
            <p>
              This website's raison d'etre is partly because of the free time
              granted by the COVID pandemic of 2020-2021. A historic event, and
              my heart goes out to those suffering still. I am under no illusion
              the opportunities my station in life affords me. In the same vein
              of thought, I built this website because the internet -- in its
              current form -- has given me countless graces (and temptations,
              but that's to be expected). So please forgive my amateurish
              writing, for it is my wish that you will take away something of
              use, and pay it forwards.
            </p>
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
