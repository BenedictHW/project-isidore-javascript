// bootstrap.min.css is the same as bootstrap.css. It is minified to reduce file size.
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
