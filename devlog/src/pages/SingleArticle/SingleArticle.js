import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const SingleArticle = () => {
	const [articleDetails, setArticleDetails] = useState({});
	const [category, setCategory] = useState(null);
	const [categoryItems, setCategoryItems] = useState([]);
	const { id } = useParams();
	useEffect(() => {
		fetch(`http://localhost:4000/articles/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setArticleDetails(data);
				setCategory(data.category);
			});
	}, []);
	useEffect(() => {
		if(category) {
			fetch(`http://localhost:4000/articles?category=${category}`)
				.then((res) => res.json())
				.then((data) => {
					console.log(data)
					setCategoryItems(data);
				});
		}
	}, [category]);
	// const newData = articleDetails.find((data) => data._id === id);
	// console.log(newData);
	return (
		<div>
			<article className='rounded-xl min-h-screen bg-white p-6 ring ring-indigo-50 sm:p-8'>
				<div className='flex items-start'>
					<div
						className='hidden sm:grid sm:h-20 sm:w-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500'
						aria-hidden='true'
					>
						<div className='flex items-center gap-1'>
							<img
								className='rounded-full'
								src={articleDetails.authorImg}
								alt=''
							/>
						</div>
					</div>
					<div className='sm:ml-8'>
						<strong className='rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white'>
							<span>#</span>
							{articleDetails.category}
						</strong>{' '}
						<span className='mt-4 sm:flex sm:items-center sm:gap-2'>
							<div className='flex items-center text-gray-500'>
								<svg
									className='h-4 w-4'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
									/>
								</svg>
								<p className='ml-1 text-xs font-medium'>
									48:32 minutes
								</p>
							</div>
							<span
								className='hidden sm:block'
								aria-hidden='true'
							>
								·
							</span>
							<span className='mt-2 text-xs font-medium text-gray-500 sm:mt-0 '>
								<p
									href=''
									className='underline hover:text-gray-700'
								>
									{articleDetails.author}
								</p>
							</span>
						</span>
						<h3 className='mt-4 text-lg font-medium sm:text-xl text-black'>
							<Link href='' className='hover:underline'>
								{articleDetails.title}
							</Link>
						</h3>
					</div>
				</div>
				<div>
					<p
						className='mt-1 text-sm text-gray-700 object-center mx-auto'
						dangerouslySetInnerHTML={{
							__html: articleDetails.description,
						}}
					></p>
				</div>
			</article>
		</div>
	);
};

export default SingleArticle;
