import axios from 'axios';
import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Header from '../../components/Header/Header';
import MyArticleCard from '../../components/MyArticleCard/MyArticleCard';
import app from '../../Firebase/Firebase.init';
import Lottie from 'lottie-react';
import lottieJson from './95348-coding-boy.json';
import { Link } from 'react-router-dom';

const auth = getAuth(app);
const MyArticles = () => {
	const [user] = useAuthState(auth);
	

	const [myArticles, setMyArticles] = useState([]);
	

	useEffect(() => {
		// fetch(`https://devlog-dkju.onrender.com/articles/tanvir`)
		// .then((res) => res.json())
		// .then((data) => setMyArticles(data));
		axios
			.get(`https://devlog-dkju.onrender.com/my-articles/${user?.email}`)
			.then((response) => {
				console.log(response.data);
				setMyArticles(response.data);
				
			})
			.catch((error) => {
				console.log(error);
			});
	}, [user?.email]);

	return (
		<div className=' h-screen'>
			<div className=''>
				
				<h1 className='text-center bg-gradient-to-r from-blue-300 via-green-300 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl '>
					{' '}
					My Articles{' '}
				</h1>
				{myArticles.length === 0 && (
					<div className='flex flex-col justify-center'>
						<h1 className='text-center mt-5 text-3xl'>
							You have no articles yet!
						</h1>
						<Link
							to='/add-article'
							className='btn btn-accent mx-auto mt-4'
						>
							Create Article Now
						</Link>
						<Lottie
							loop
							animationData={lottieJson}
							play
							className='mx-auto w-[700px] mt-0'
						/>
					</div>
				)}
				{myArticles.map((myArticle) => (
					<MyArticleCard
						myArticle={myArticle}
						myArticles={myArticles}
						setMyArticles={setMyArticles}
						key={myArticle._id}
					></MyArticleCard>
				))}
			</div>
		</div>
	);
};

export default MyArticles;
