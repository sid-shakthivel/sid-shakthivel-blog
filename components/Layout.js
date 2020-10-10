import Head from 'next/head';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Siddharth';
export const siteTitle = 'blog';

const Layout = ({ children, home }) => (
    <div className={styles.container}>
        <Head>
            <link rel="icon" href="/favicon/ico" />
        </Head>

        <header className={styles.header}>
            {home ? (
                <>
                    <img
                        src="/images/profile.jpg"
                        className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                    />
                    <h1 className={utilStyles.heading2XL}>{name}</h1>
                </>
            ) : (
                <>
                    <Link href="/">
                        <a>
                            <img
                                src="/images/profile.jpg"
                                className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                            />
                        </a>
                    </Link>
                    <h2 className={utilStyles.headingLg}>
                        <Link href="/">
                            <a className={utilStyles.colorInherit}>{name}</a>
                        </Link>
                    </h2>
                </>
            )}
        </header>
        <main>{children}</main>
        {!home && (
            <div className={styles.backToHome}>
                <Link href="/">
                    <a>← Back to home</a>
                </Link>
            </div>
        )}
    </div>
);

export default Layout;
