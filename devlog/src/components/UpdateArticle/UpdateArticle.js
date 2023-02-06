import { getAuth } from 'firebase/auth';
import JoditEditor from 'jodit-react';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import app from '../../Firebase/Firebase.init';
import Header from '../Header/Header';

const auth = getAuth(app);
const UpdateArticle = () => {
	const navigate = useNavigate();
	const editor = useRef('');
	const [editorContent, setEditorContent] = useState('');

	const [isUploading, setIsUploading] = useState(false);
	const [image, setImage] = useState(null);
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
	// const [user] = useAuthState(auth);
	const { id } = useParams();
	const [articleDetails, setArticleDetails] = useState({});

	useEffect(() => {
		fetch(`https://devlog-dkju.onrender.com/articles/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setArticleDetails(data);
				setEditorContent(data.description);
			});
	}, []);
	//update article
	const handleTitleChange = (e) => {
		const updatedTitle = e.target.value;
		const updatedArticle = {
			title: updatedTitle,
			description: articleDetails.description,
			category: articleDetails.category,
			img: articleDetails.img,
		};
		setArticleDetails(updatedArticle);
	};

	const handleCategoryChange = (e) => {
		const updatedCategory = e.target.value;
		const updatedArticle = { ...articleDetails };
		updatedArticle.category = updatedCategory;
		setArticleDetails(updatedArticle);
	};

	const handleUpdateArticle = async (e) => {
		setIsUploading(true);
		e.preventDefault();
		const articleData = { ...articleDetails };
		if (image) {
			articleData.img = await handleUploadImage();
		}
		articleData.description = editorContent;
		console.log('submitted');
		const url = `https://devlog-dkju.onrender.com/article/${id}`;
		fetch(url, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(articleData),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount > 0) {
					alert('Updated Successfully');
					navigate('/');
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setIsUploading(false);
			});
	};
	return (
		<div>
			<Header></Header>
			<div className='w-6/12 m-auto mt-2 mb-5 '>
				<h1 className='bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl'>
					Update Article <span></span>
					{articleDetails.title || 'Article has not loaded yet'}
				</h1>
				<form onSubmit={handleUpdateArticle}>
					<>
						<label
							htmlFor='message'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Title
						</label>
						<input
							type='text'
							onChange={handleTitleChange}
							value={articleDetails.title || ''}
							name='title'
							// value={title}
							// onChange={(event) => setTitle(event.target.value)}
							placeholder='Title'
							className='input input-bordered input-info min-w-full '
						/>
					</>

					<>
						<label
							htmlFor='message'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Description
						</label>

						<div className='input input-bordered border-[2px] rounded-md input-info h-fit p-0 overflow-hidden'>
							<JoditEditor
								ref={editor}
								type='text'
								name='description'
								value={editorContent}
								onBlur={(newContent) =>
									setEditorContent(newContent)
								}
							/>
						</div>
					</>
					<>
						<label
							htmlFor='message'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Article Category
						</label>
						<input
							type='text'
							value={articleDetails.category || ''}
							name='category'
							onChange={handleCategoryChange}
							placeholder='Type category here'
							className='input input-bordered input-info  min-w-full'
						/>
					</>
					<>
						<label
							htmlFor='message'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Article Image
						</label>
						<input
							className='file-input file-input-bordered file-input-info w-full max-w-2xl mb-5'
							type='file'
							name='img'
							onChange={(e) => setImage(e.target.files[0])}
							placeholder='Input Image URL'
						/>
					</>

					<button
						type='submit'
						value='Update'
						disabled={isUploading}
						className='block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto disabled:opacity-10'
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

export default UpdateArticle;
