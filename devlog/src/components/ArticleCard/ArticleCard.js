import React from 'react';
import { Link } from 'react-router-dom';

export const ArticleCard = (props) => {
	const { img, title, description, _id, category,author,authorImg } = props.article;
	const newDescription = description.slice(0,25) +'....';
	return (
		<div className='card w-80 glass h-96  bg-black'>
			<figure>
				<img src={img} alt='article image' />
			</figure>
			<div className='card-body h-56'>
				<h2 className='card-title text-white'>{title}</h2>
				<p
					className='text-white'
					dangerouslySetInnerHTML={{ __html: newDescription }}
				></p>
				<div className='grid grid-cols-2 mt-2 '>
					<div className='avatar grid grid-rows-2 gr'>
						<div className='w-12 rounded-full'>
							<img src={authorImg} />
						</div>
						<span>
							<p className='text-white'>{author}</p>
						</span>
					</div>
					<div className='card-actions justify-end'>
						<Link to={`/article-list/${_id}`}>
							<button className=' rounded border border-blue-600 bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto'>
								Read now!
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
