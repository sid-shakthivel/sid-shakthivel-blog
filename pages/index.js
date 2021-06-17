import { useContext } from 'react';
import Link from 'next/link';
import { getAllPosts } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';
import indexStyles from '../styles/index.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope as mail } from '@fortawesome/free-solid-svg-icons';
import { faGithub as git } from '@fortawesome/free-brands-svg-icons';

import { lightTheme, darkTheme } from '../components/Theme';

import { ThemeContext } from '../contexts/ThemeContext';

export default function Home({ allPosts }) {
    const themeContext = useContext(ThemeContext);
    return (
        <div
            className={indexStyles.layout}
            style={themeContext.theme === 'dark' ? darkTheme : lightTheme}
        >
            <div className={indexStyles.blogSection}>
                <h1 className={utilStyles.headingXl}>Blog Posts</h1>
                {allPosts.map((post) => {
                    return (
                        <div className={utilStyles.listItem} key={post.id}>
                            <Link href={`/posts/${post.id}`}>
                                <a
                                    className={utilStyles.headingMd}
                                    key={post.id}
                                >
                                    {post.title}
                                </a>
                            </Link>
                            <br />
                            <span className={`${utilStyles.lightText}`}>
                                {post.date}
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className={indexStyles.generalSection}>
                <img
                    src="/images/profile.jpg"
                    className={`${indexStyles.generalSection_image} ${utilStyles.borderCircle}`}
                />
                <h1 className={utilStyles.heading2Xl}>
                    Siddharth Shakthivel GOD
                </h1>
                <div
                    className={indexStyles.generalSection_communicationChannels}
                >
                    <a
                        className={indexStyles.communicationChannels_link}
                        href="https://github.com/sid-shakthivel"
                    >
                        <FontAwesomeIcon
                            icon={git}
                            size="3x"
                            style={
                                themeContext.theme === 'dark'
                                    ? darkTheme
                                    : lightTheme
                            }
                        />
                    </a>
                    <a
                        className={indexStyles.communicationChannels_link}
                        href="mailto: sid.shakthivel@gmail.com"
                    >
                        <FontAwesomeIcon
                            icon={mail}
                            size="3x"
                            style={
                                themeContext.theme === 'dark'
                                    ? darkTheme
                                    : lightTheme
                            }
                        />
                    </a>
                </div>
                <p className={utilStyles.headingMd}>
                    A blog about my programming projects
                </p>
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const allPosts = getAllPosts();
    return {
        props: {
            allPosts,
        },
    };
}
