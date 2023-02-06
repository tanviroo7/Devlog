import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import app from '../../Firebase/Firebase.init';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app);

const AddArticle = () => {
	const navigate = useNavigate();
	const editor = useRef('');
	const [editorContent, setEditorContent] = useState('');
	const [user] = useAuthState(auth);

	const [isUploading, setIsUploading] = useState(false);
	const [image, setImage] = useState();

	const handleUploadImage = async () => {
		const data = new FormData();
		data.append('image', image);

		const res = await fetch(
			`https://api.imgbb.com/1/upload?expiration=9999999999&key=05749c065f7f6e743925c74319af2059`,
			{
				method: 'POST',
				body: data,
			}
		);
		const json = await res.json();

		return json.data.url;
	};

	const handleAddArticle = async (event) => {
		setIsUploading(true);
		event.preventDefault();
		const img = await handleUploadImage();
		const title = event.target.title.value;
		const description = editorContent;

		const category = event.target.category.value;
		const author = user?.displayName;
		const authorImg = user?.photoURL;
		const email = user?.email;
		const article = {
			title,
			description,
			category,
			img,
			author,
			authorImg,
			email,
		};

		fetch('https://devlog-dkju.onrender.com/articles', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(article),
		})
			.then((res) => res.json())
			.then((data) => {
				alert('Added successfully');
				setEditorContent('');
				navigate('/');
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setIsUploading(false);
			});
		event.target.reset();

		console.log(article);

		// // Send the data to the server
		// axios
		// 	.post('http://localhost:4000/items', { title, description })
		// 	.then(() => {
		// 		// Clear the form fields
		// 		setTitle('');
		// 		setDescription('');
		// 	});
	};
	return (
		<div className='bg-gray-600 overflow-hidden'> 
			<Header></Header>
			<div className='w-6/12 m-auto mt-2 mb-5 '>
				<h1 className='bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl'>
					Add Article
				</h1>
				<form
					className='flex flex-col justify-between space-y-4'
					onSubmit={handleAddArticle}
				>
					<div className='flex flex-col space-y-2'>
						<label
							htmlFor='message'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Title
						</label>
						<input
							type='text'
							name='title'
							// value={title}
							// onChange={(event) => setTitle(event.target.value)}
							placeholder='Title'
							className='input input-bordered input-info min-w-full '
						/>
					</div>

					<div className='flex flex-col space-y-2'>
						<label
							htmlFor='message'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Description
						</label>

						<div className='input input-bordered border-[2px] rounded-md input-info h-fit p-0 overflow-hidden'>
							<JoditEditor
								// ref={editor}
								style={{ width: '100%' }}
								type='text'
								name='description'
								value={editorContent}
								onBlur={(newContent) =>
									setEditorContent(newContent)
								}
							/>
						</div>
					</div>
					<div className='flex flex-col space-y-2'>
						<label
							htmlFor='message'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Article Category
						</label>
						<input
							type='text'
							name='category'
							placeholder='Type category here'
							className='input input-bordered input-info  min-w-full mb-5'
						/>
					</div>
					<div className='flex flex-col space-y-2'>
						<label
							for='file-upload'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Article Image
						</label>
						{/* <input
							type='text'
							name='img'
							placeholder='Input Image URL'
							className='input input-bordered input-info min-w-full mb-7'
						/> */}
						<input
							className='file-input file-input-bordered file-input-info w-full max-w-2xl mb-5'
							type='file'
							name='img'
							onChange={(e) => setImage(e.target.files[0])}
							id=''
						/>
					</div>

					<button
						type='submit'
						className={`block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto btn disabled:opacity:10 ${
							isUploading && 'loading'
						}`}
						disabled={isUploading}
					>
						Submit
					</button>
					{isUploading && (
						<div className='loading'>loading..........</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default AddArticle;
