import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedNotesData } from "../lib/convertNotes";
import Link from "next/link";
import Date from "../components/date";

export default function NotesIndex({ allNotesData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <section className={`${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingMd}>
          <h1>Notes</h1>
        </h2>
        {/* Remove this when you upload your first notes !!! */}
        <p>No notes yet, check back later!</p>
        <ul className={utilStyles.list}>
          {allNotesData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/notes/${id}`}>
                <a className={utilStyles.headingLg}>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.articleMetadata}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allNotesData = getSortedNotesData();
  return {
    props: {
      allNotesData,
    },
  };
}
