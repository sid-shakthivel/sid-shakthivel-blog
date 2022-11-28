import '../styles/global.css';

import Head from 'next/head';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
    return (
        <Layout>
            <Head>
                <title>Sid Blog</title>
            </Head>
            <Component {...pageProps} />
        </Layout>
    );
}
