import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import styles from "../styles/app.module.scss";
import "../styles/global.scss";
import { ContextProvider } from '../contexts/Context';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider >
      <div className={styles.wrapper}>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>    
      </div>
      <Footer />
    </ContextProvider>
  )
}

export default MyApp
