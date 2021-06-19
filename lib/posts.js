import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postDirectory = path.join(process.cwd(), 'posts');

export function getAllPosts() {
    let posts = fs.readdirSync(postDirectory);

    // posts.shift();

    posts = posts.map((post) => {
        const id = post.split('.').shift();
        const filePath = path.join(postDirectory, post);
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        const fileObj = matter(fileContents);

        return {
            id,
            ...fileObj.data,
        };
    });

    return posts.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });
}

export function getAllPostIds() {
    let posts = fs.readdirSync(postDirectory);
    // posts.shift();
    return posts.map((post) => {
        return {
            params: {
                id: post.split('.').shift(),
            },
        };
    });
}

export async function getPostData(id) {
    const filePath = path.join(postDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(filePath);

    const fileObj = matter(fileContents);

    let htmlContent = await remark().use(html).process(fileObj.content);
    htmlContent = htmlContent.toString();

    return {
        id,
        htmlContent,
        ...fileObj.data,
    };
}
