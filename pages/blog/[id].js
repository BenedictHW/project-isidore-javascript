import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import styles from "../../components/layout.module.css";
import Link from "next/link";

export default function Post({ postData }) {
  return (
    <Layout blogPage>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingArticle}>{postData.title}</h1>
        <hr />
        <Link href="/">
          <a>
            <img
              src="/images/profile.jpg"
              className={`${styles.headerAuthorBlogProfile} ${utilStyles.borderCircle}`}
              alt="Hanshen Wang Photo"
            />
          </a>
        </Link>
        <h2 className={utilStyles.articleMetadata}>
          <Link href="/">
            <a className={utilStyles.colorInherit}>Hanshen Wang</a>
          </Link>
        </h2>
        <div className={utilStyles.articleMetadata}>
          <Date dateString={postData.date} />
        </div>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
