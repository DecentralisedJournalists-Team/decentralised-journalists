'use client'
import { useState, useEffect } from 'react'

export default function article({ params }) {
    const [article, setArticle] = useState({})
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const data = await fetch("https://us-east-2.aws.neurelo.com/rest/blockchain_story",
                    {
                        headers: {
                            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
                        }
                    }
                );
                const fetchedArticle = await data.json();
                const articleData = await fetchedArticles.data;
                setArticle(articleData);
                console.log(fetchedArticle)
                // console.log(articleData)
            } catch (error) {
                console.log(`Error fetching articles: ${error}`);
            }
        }
        fetchArticle();
    }, []);
    console.log(article);
    return (
        <>
            {/* {article.map((article, index) => {
                return (
                    <ArticlePreview key={index} article={article} />
                );
            })} */}
            Article {params.id}
        </>
    );
}