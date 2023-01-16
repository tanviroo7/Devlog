import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import { ArticleCard } from '../../components/ArticleCard/ArticleCard';
import Header from '../../components/Header/Header';
import './Home.css';
import { Banner } from '../../components/Banner/Banner';
import { getAuth } from 'firebase/auth';
import app from '../../Firebase/Firebase.init';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useState } from 'react';
import Stats from '../../components/Stats/Stats';
// import {Login} from '../../components/Login/Login'

const auth = getAuth(app);
const Home = () => {
     const [articles, setArticles] = useState([]);

		useEffect(() => {
			fetch('http://localhost:4000/articles')
				.then((res) => res.json())
				.then((data) => setArticles(data));
		}, []);
	
	// const [user] = useAuthState(auth);
	return (
		<div className='min-h-[100vh] bg-black'>
			{' '}
			<Header></Header>
			<Banner></Banner>
			<Stats></Stats>
			{/* Dynamic data load */}
			<div className=' grid grid-cols-3 gap-4 place-items-center mb-5'>
				{articles.map((article) => (
					<ArticleCard
						article={article}
						key={article._id}
					></ArticleCard>
				))}
			</div>
			<Footer></Footer>
		</div>
	);
};

export default Home;
