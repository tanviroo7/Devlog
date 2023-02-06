import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEdit, FaRegTrashAlt, FaArrowRight } from 'react-icons/fa';

const MyArticleCard = (props) => {
	const navigate = useNavigate();
	const {
		img,
		title,
		description,
		_id,
		category,
		author,
		authorImg,
		setMyArticles,
		myArticles,
	} = props.myArticle;
	const newDescription = description.slice(0, 30) + '....';

	const handleDelete = (id) => {
		const proceed = window.confirm('Are you sure you want to Delete?');
		if (proceed) {
			const url = `https://devlog-dkju.onrender.com/article/${id}`;
			fetch(url, {
				method: 'DELETE',
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.deletedCount > 0) {
						alert('Deleted successfully');
						// const remainingArticles = myArticles.filter(
						// 	(Article) => Article._id !== id
						// );
						// setMyArticles(remainingArticles);

						navigate('/');
					}
				});
		}
	};

	return (
		<section className='  '>
			<div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-4 lg:px-8 '>
				<div className=''>
					<article className='p-6   rounded-lg border  shadow-md bg-gray-800 border-gray-700'>
						<div className=' grid grid-cols-3   mb-5 text-gray-500'>
							<span className='rounded border border-indigo-500 bg-indigo-500 px-3 py-1 text-[10px] font-extralight text-white justify-self-start'>
								<span>#</span>
								{category}
							</span>
							<Link to={`/update-article/${_id}`}>
								<button className='text-lg text-white   hover:cursor-pointer ml-96 pl-56'>
									<FaRegEdit></FaRegEdit>
								</button>
							</Link>
							<button
								onClick={() => handleDelete(_id)}
								className='text-base text-white   hover:cursor-pointer justify-self-end '
							>
								<FaRegTrashAlt></FaRegTrashAlt>
							</button>
						</div>

						<h2 className='mb-2 text-2xl font-bold tracking-tight  text-white'>
							{title}
						</h2>

						<div className='flex justify-between items-center'>
							<div className='flex items-center space-x-4'>
								<img
									className='w-8 h-8 rounded-full '
									src={authorImg}
									alt={author}
								/>
								<span className='font-medium text-white'>
									{author}
								</span>
							</div>
							<Link
								to={`/article-list/${_id}`}
								className='inline-flex items-center font-medium  text-white hover:underline'
							>
								Read more <span className='ml-2 text-white'></span>
								<span>
									<FaArrowRight></FaArrowRight>
								</span>
							</Link>
						</div>
					</article>
				</div>
			</div>
		</section>
	);
};

export default MyArticleCard;
