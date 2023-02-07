import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArticleCard } from '../ArticleCard/ArticleCard';
import { Footer } from '../Footer/Footer';
import Header from '../Header/Header';

const AuthorArticles = () => {
	const { email } = useParams();
    const [authorArticles, setAuthorArticles] = useState([]);
	// loading article details
	useEffect(() => {
		fetch(`https://devlog-dkju.onrender.com/articles?email=${email}`)
			.then((res) => res.json())
			.then((data) => {
				setAuthorArticles(data);
			});
	}, []);
	return (
		<div className='bg-gray-500 min-h-screen'>
            <Header></Header>
			<h1 className='text-center mb-7 mt-5 bg-gradient-to-r from-blue-300 via-green-300 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl '>
				
				 <h1>Articles by { authorArticles?.length ? authorArticles[0]?.author : 'Loading...' }</h1> 
			</h1>
			{/* Dynamic data load */}
			<div className=' grid grid-cols-3 gap-4 place-items-center'>
				{authorArticles.map((article) => (
					<ArticleCard
						article={article}
						key={article._id}
					></ArticleCard>
				))}
			</div>
            
		</div>
	);
}

export default AuthorArticles