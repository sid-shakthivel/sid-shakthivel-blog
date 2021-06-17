import { useContext } from 'react';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Link from 'next/link';
import utilStyles from '../../styles/utils.module.css';
import postStyles from '../../styles/Post.module.css';

import { ThemeContext } from '../../contexts/ThemeContext';

import { lightTheme, darkTheme } from '../../components/Theme';

export default function Post({ postData }) {
    const themeContext = useContext(ThemeContext);
    return (
        <div
            className={postStyles.postSection}
            style={themeContext.theme === 'dark' ? darkTheme : lightTheme}
        >
            <img
                src="/images/profile.jpg"
                className={`${postStyles.postSection_image} ${utilStyles.borderCircle}`}
            />
            <h1 className={utilStyles.headingLg}>Siddharth Shakthivel</h1>
            <div className={postStyles.postInformation}>
                <h1 className={utilStyles.heading2Xl}>{postData.title}</h1>
                <h3 className={`${utilStyles.lightText}`}>{postData.date}</h3>
                <div
                    dangerouslySetInnerHTML={{
                        __html: postData.htmlContent,
                    }}
                ></div>
                <Link href={`/`}>
                    <a className={utilStyles.headingMd}>← Go back</a>
                </Link>
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

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}
