import "../styles/globals.css";
import firebase from '../firebase';

// initialize firebase
firebase();

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
