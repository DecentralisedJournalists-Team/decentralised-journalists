'use client';
import { NearContext } from '@/context';
import { useContext, useState } from 'react';
import Hero from '@/components/hero';
import { ImSpinner9 } from 'react-icons/im';

import { ArticleContract } from '@/config';

// Contract that the app will interact with
const CONTRACT = ArticleContract;

export default function Create() {
    const { signedAccountId, wallet } = useContext(NearContext);

    const [status, setStatus] = useState(true);

    const uploadArticle = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const author = signedAccountId;
        const content = e.target.content.value;
        const created_at = new Date().toISOString();
        const articles = await wallet.viewMethod({ contractId: CONTRACT, method: 'get_all_articles' });
        const articleId = articles.length + 1;
        const article = { articleId, title, author, content, created_at };
        await wallet.callMethod({ contractId: CONTRACT, method: 'add_article', args: { article } });
        document.getElementById('article-form').reset();
        await fetch ('https://us-east-2.aws.neurelo.com/rest/blockchain_story/__one', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.NEXT_PUBLIC_API_KEY
            },
            body: JSON.stringify(
                {
                    title: title,
                    author_id: author,
                    text: content,
                }
            )
        })
        document.getElementById('submit-button').disabled = true;
        document.getElementById('submit-button').style.cursor = 'not-allowed';
        document.getElementById('submit-button').style.backgroundColor = 'gray';
        document.getElementById('submit-text').innerHTML = 'Submitted';
        setStatus(true);
    }

    return (
        <>
            {signedAccountId ?
                <div className='flex flex-col items-center justify-center main'>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl'>Submit an Article</h1>
                    <form id='article-form' onSubmit={uploadArticle} className='flex flex-col items-center justify-center py-6 my-8 w-full'>
                        <label
                            htmlFor='title'
                            className='self-start w-[90%] md:w-4/5 lg:w-1/2 mx-auto text-lg lg:text-2xl pt-2'
                        >
                            Article Title
                        </label>
                        <input
                            type='text'
                            id='title'
                            name='title'
                            placeholder='Article Title'
                            className='w-[90%] md:w-4/5 lg:w-1/2 mx-auto py-2 px-2.5 my-2 border-2 border-gray-700 rounded-md mb-4'
                            required
                        />

                        <label
                            htmlFor='author'
                            className='self-start w-[90%] md:w-4/5 lg:w-1/2 mx-auto text-lg lg:text-2xl pt-2'
                        >
                            Author
                        </label>
                        <input
                            type='text'
                            id='author'
                            name='author'
                            defaultValue={signedAccountId}
                            className='w-[90%] md:w-4/5 lg:w-1/2 mx-auto py-2 px-2.5 my-2 border-2 border-gray-700 rounded-md mb-4 bg-gray-400 opacity-80'
                            readOnly
                            required
                        />

                        <label
                            htmlFor='content'
                            className='self-start w-[90%] md:w-4/5 lg:w-1/2 mx-auto text-lg lg:text-2xl pt-2'
                        >
                            Content
                        </label>
                        <textarea
                            id='content'
                            name='content'
                            placeholder='Article Content'
                            className='article w-[90%] md:w-4/5 lg:w-1/2 min-h-36 xl:min-h-56 mx-auto py-2 px-2.5 my-2 border-2 border-gray-700 rounded-md mb-4'
                            required
                        />

                        <button
                            id='submit-button'
                            type='submit'
                            className='bg-gray-950 text-white rounded-md py-2.5 px-5 border-gray-700 mt-4 ease-in-out duration-350 hover:scale-105'
                            onClick={() => setStatus(false)}
                        >
                            <p id="submit-text" className={`${!status && 'hidden'} text-white`}>Submit</p>
                            <ImSpinner9 className={`${status && 'hidden'} animate-spin text-white`} />
                        </button>
                    </form>
                </div>
                :
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl'>Please Login to Submit an Article</h1>
                    <Hero />
                </div>
            }
        </>

    );
}
