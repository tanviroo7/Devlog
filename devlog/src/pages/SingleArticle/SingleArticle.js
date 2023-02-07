import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { toast } from 'react-toastify';
import { MdDeleteOutline } from 'react-icons/md';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';

// Import Swiper styles
import 'swiper/css';
import { getAuth } from 'firebase/auth';
import app from '../../Firebase/Firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';

const auth = getAuth(app);

const SingleArticle = () => {
	const [user] = useAuthState(auth);
	const [articleDetails, setArticleDetails] = useState({});
	const [category, setCategory] = useState(null);
	const [categoryItems, setCategoryItems] = useState([]);
	const [currentcomment, setCurrentComment] = useState('');
	const [isCommenting, setIsCommenting] = useState(false);
	const [articleComments, setArticleComments] = useState([]);
	const [triggerFetching, setTriggerFetching] = useState(true);
	const { id } = useParams();

	// loading article details
	useEffect(() => {
		fetch(`https://devlog-dkju.onrender.com/articles/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setArticleDetails(data);
				setCategory(data.category);
			});
	}, [id]);
	// fetching comments
	useEffect(() => {
		if (triggerFetching) {
			axios
				.get(`https://devlog-dkju.onrender.com/comments/${id}`)
				.then((response) => {
					// Clear the form fields
					setArticleComments(response.data);
					setTriggerFetching(false);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [triggerFetching]);
	// loading category items
	useEffect(() => {
		if (category) {
			fetch(
				`https://devlog-dkju.onrender.com/articles?category=${category}`
			)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setCategoryItems(() => {
						return data.filter((item) => String(item._id) !== id);
					});
				});
		}
	}, [category]);

	// comments
	const handleAddComment = async (event) => {
		event.preventDefault();
		const comment = {};
		comment.commentDetails = currentcomment;
		comment.name = user?.displayName;
		comment.img = user?.photoURL;
		comment.email = user?.email;
		comment.articleId = id;

		console.log(comment);
		setIsCommenting(true);

		// Send the comment to the server
		axios
			.post('https://devlog-dkju.onrender.com/addcomment', comment)
			.then((response) => {
				// Clear the form fields
				event.target.reset();
				console.log(response.data);
				setTriggerFetching(true);
				toast.success('Comment Added', {
					position: 'bottom-right',
					autoClose: 1500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				setCurrentComment('');
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setIsCommenting(false);
			});
	};
	const handleCommentDelete = (id) => {
		const proceed = window.confirm('Are you sure you want to Delete?');
		if (proceed) {
			axios
				.delete(`https://devlog-dkju.onrender.com/comment/${id}`)
				.then((response) => {
					setTriggerFetching(true);
					toast.success('Comment Deleted', {
						position: 'bottom-right',
						autoClose: 1500,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const handleVoting = (action) => {
		let newVotes = [];
		if (!articleDetails?.votes) {
			newVotes = [user?.uid];
		} else if (action === 'upvote') {
			if (articleDetails?.votes?.includes(user?.uid)) {
				return;
			}
			newVotes = [...articleDetails?.votes, user?.uid];
		} else if(action === 'downvote') {
			const updatedVotes = articleDetails?.votes?.filter(vote => String(vote) !== String(user?.uid))
			newVotes = [...updatedVotes];
		}
		console.log(newVotes);
		// Send the vote to the server
		axios
			.put('https://devlog-dkju.onrender.com/updatevotes', {
				newVotes,
				article_id: id,
			})
			.then((response) => {
				console.log(response.data);
				toast.success(`${action} successful!`, {
					position: 'bottom-right',
					autoClose: 1500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				setArticleDetails((prevArticleDetails) => {
					return { ...prevArticleDetails, votes: newVotes };
				});
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				// setIsCommenting(false);
			});
	};

	return (
		<div>
			<Header></Header>
			{categoryItems.length > 0 && (
				<h3 className='bg-white text-center font-semibold text-2xl pt-4'>
					Related Articles
				</h3>
			)}
			<div className='p-4 bg-white'>
				<Swiper
					spaceBetween={50}
					slidesPerView={3}
					modules={[Autoplay]}
					autoplay={{
						delay: 1000,
						disableOnInteraction: false,
					}}
				>
					{!categoryItems.length
						? null
						: categoryItems.map((item, itemIdx) => (
								<SwiperSlide key={itemIdx}>
									<Link to={`/article-list/${item?._id}`}>
										<article
											style={{
												background: `linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.5)), url(${item?.img}) center/cover no-repeat`,
											}}
											className='rounded-lg drop-shadow h-[200px] overflow-hidden'
										>
											<div className='w-full h-full backdrop-blur-sm  flex justify-center items-center space-y-2'>
												<h4 className='text-xl text-white w-10/12 text-center font-bold '>
													{item.title}
												</h4>
											</div>
										</article>
									</Link>
								</SwiperSlide>
						  ))}
				</Swiper>
			</div>
			<article className='min-h-screen bg-white p-6  sm:p-8'>
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
					<div className='sm:ml-8 w-full'>
						<div className='flex justify-between'>
							<div>
								<strong className='rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white'>
									<span>#</span>
									{articleDetails.category}
								</strong>{' '}
							</div>
							{/* voting the article */}
							<div className='flex justify-center items-end space-x-4'>
								<div>
									<p className='text-center font-bold text-orange-400'>
										Likes
									</p>
									<h3 className='border border-2 rounded px-4  text-orange-300 drop-shadow-md'>
										{articleDetails?.votes
											? articleDetails?.votes?.length
											: 0}
									</h3>
								</div>
								<div>
									{articleDetails?.votes?.includes(
										user?.uid
									) ? (
										<button
											onClick={() =>
												handleVoting('downvote')
											}
											className=' text-lg'
										>
											<FcLikePlaceholder />
										</button>
									) : (
										<button
											onClick={() =>
												handleVoting('upvote')
											}
											className='text-red-500 text-lg'
										>
											<FcLike />
										</button>
									)}
								</div>
							</div>
						</div>

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
									4:00 minutes
								</p>
							</div>
							<span
								className='hidden sm:block'
								aria-hidden='true'
							>
								·
							</span>
							<Link to={`/author-articles/${articleDetails.email}`}>
								<span className='mt-2 text-lg font-medium text-gray-500 sm:mt-0 '>
									<p
										href=''
										className=' hover:text-black'
									>
										{articleDetails.author}
									</p>
								</span>
							</Link>
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
			<div className='space-y-4 flex flex-col'>
				<hr />
				{articleComments.length > 0 && (
					<h4 className='text-xl font-bold text-center'>
						All comments
					</h4>
				)}
				<hr />
				{articleComments.length > 0 ? (
					<div className='p-4 space-y-2'>
						{articleComments.map((comment) => (
							<article
								key={comment._id}
								className='flex items-center space-x-2 bg-white drop-shadow rounded-lg p-2 relative'
							>
								<img
									className='w-[40px] h-[40px] rounded-full object-cover'
									src={comment?.img}
									alt=''
								/>
								<div className='space-y-2 p-2'>
									<h4 className='text-medium text-base'>
										{comment?.name}
									</h4>
									<p className='text-sm text-gray-500'>
										{comment?.commentDetails}
									</p>
								</div>
								{user && user?.email === comment?.email ? (
									<button
										onClick={() =>
											handleCommentDelete(comment?._id)
										}
										className='absolute top-5 right-5 p-1 border border-red-700 text-red-700 rounded-lg'
									>
										<MdDeleteOutline size={16} />
									</button>
								) : null}
							</article>
						))}
					</div>
				) : null}
			</div>
			{/* add comment */}
			{user ? (
				<div className='bg-gray-200 w-full p-4'>
					<hr />
					<h1 className='text-gray-500 text-xl text-center mb-10 uppercase'>
						Add A Comment
					</h1>
					<form
						onSubmit={handleAddComment}
						className='flex flex-col space-y-2'
					>
						<textarea
							value={currentcomment}
							onChange={(e) => setCurrentComment(e.target.value)}
							className='textarea textarea-info w-full '
							placeholder='Write Comment....'
						></textarea>
						<button
							type='submit'
							className='self-end block w-full rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto btn disabled:opacity:10'
							disabled={isCommenting}
						>
							{isCommenting ? 'Posting...' : 'Post Comment'}
						</button>
					</form>
				</div>
			) : null}
		</div>
	);
};

export default SingleArticle;
