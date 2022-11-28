import { useContext } from 'react';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Link from 'next/link';
import utilStyles from '../../styles/utils.module.css';
import postStyles from '../../styles/Post.module.css';
import { getAllPosts } from '../../lib/posts';
import indexStyles from '../../styles/index.module.css';

import { ThemeContext } from '../../contexts/ThemeContext';

import { lightTheme, darkTheme } from '../../components/Theme';

export default function Post({ postData, allPosts }) {
    const themeContext = useContext(ThemeContext);
    return (
        <div
            className={indexStyles.layout}
            style={themeContext.theme === 'dark' ? darkTheme : lightTheme}>

            <div className={indexStyles.postList}>
                <h1 className={utilStyles.headingXl}>Blog Posts</h1>
                {allPosts.map((post) => {
                    return (
                        <div className={utilStyles.listItem} key={post.id}>
                            <Link href={`/posts/${post.id}`}>
                                <a
                                    className={utilStyles.headingMd}
                                    key={post.id}
                                    style={{ color: themeContext.theme == "dark" ? "#4e9af7" : '#026ff3'  }}
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

            <div
            className={postStyles.postSection}
            style={themeContext.theme === 'dark' ? darkTheme : lightTheme}
            >
                <div className={postStyles.postInformation}>
                    <h1 className={utilStyles.heading2Xl}>{postData.title}</h1>
                    <h3 className={`${utilStyles.lightText}`}>{postData.date}</h3>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: postData.htmlContent,
                        }}
                    ></div>
                    <Link href={`/`}>
                        <a className={utilStyles.headingMd}>← Main</a>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

/*
    Prerenders this page at built time as page can be cached as basically just static
*/
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    const allPosts = getAllPosts();

    return {
        props: {
            postData,
            allPosts
        },
    };
}
