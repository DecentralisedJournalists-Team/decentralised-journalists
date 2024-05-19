'use client';
import { NearContext } from '@/context';
import { useContext } from 'react';
import Hero from '@/components/hero';

export default function Create() {
    const { signedAccountId } = useContext(NearContext);

    return (
        <>
            {signedAccountId ?
                <div className='flex flex-col items-center justify-center main'>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl'>Submit an Article</h1>
                    <form className='flex flex-col items-center justify-center py-6 my-8 w-full'>
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
                            type='submit'
                            className='bg-gray-950 text-white rounded-md py-2.5 px-5 border-gray-700 mt-4 ease-in-out duration-350 hover:scale-105'
                        >
                            Submit
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
