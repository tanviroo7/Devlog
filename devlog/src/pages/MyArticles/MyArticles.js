import axios from 'axios';
import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import MyArticleCard from '../../components/MyArticleCard/MyArticleCard';
import app from '../../Firebase/Firebase.init';

const auth = getAuth(app);
const MyArticles = () => {
	const [user] = useAuthState(auth);

	const [myArticles, setMyArticles] = useState([]);

	useEffect(() => {
		// fetch(`http://localhost:4000/articles/tanvir`)
		// .then((res) => res.json())
		// .then((data) => setMyArticles(data));
		axios
			.get(`http://localhost:4000/my-articles/${user?.email}`)
			.then((response) => {
				console.log(response.data);
        setMyArticles(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [user?.email]);

	return (
		<div className='bg-black'>
			<h1 className=' text-center text-5xl mb-5  '> My Articles </h1>
			{myArticles.map((myArticle) => (
				<MyArticleCard
					myArticle={myArticle}
          myArticles={myArticles}
          setMyArticles={setMyArticles}
					key={myArticle._id}
				></MyArticleCard>
			))}
		</div>
	);
};

export default MyArticles;
