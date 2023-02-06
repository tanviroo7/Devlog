import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import { ArticleCard } from '../../components/ArticleCard/ArticleCard';
import Header from '../../components/Header/Header';
import './Home.css';
import { Banner } from '../../components/Banner/Banner';
import { getAuth } from 'firebase/auth';
import app from '../../Firebase/Firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import Stats from '../../components/Stats/Stats';
import Lottie from 'lottie-react';
import lottieJson from '../../components/Banner/slide.json';

// import {Login} from '../../components/Login/Login'

const auth = getAuth(app);
const Home = () => {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		fetch('https://devlog-dkju.onrender.com/articles')
			.then((res) => res.json())
			.then((data) => setArticles(data));
	}, []);

	// const [user] = useAuthState(auth);
	return (
		<div className='min-h-[100vh] bg-black'>
			{' '}
			<Header></Header>
			<div className='space-y-20'>
				<Banner></Banner>
				<Lottie
					loop
					animationData={lottieJson}
					play='true'
					className='mx-auto w-[700px] mt-0'
					
				/>
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
		</div>
	);
};

export default Home;
