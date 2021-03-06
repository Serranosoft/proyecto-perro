import Head from 'next/head';
import Header from '../components/header';
import '../styles/css/common.css';
import Footer from '../components/footer';

function MyApp({ Component, pageProps }) {
    return (
    <>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;500;600;700;800;900&display=swap" rel="stylesheet" /> 
            <meta name="google-site-verification" content="mDr4jX4s19KzRXyYUwYi_BB1gm2cb5AziPGwHqW8yI0" />
            <link rel="icon" href="/img/huella.svg" />
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
    </>)
}

export default MyApp
