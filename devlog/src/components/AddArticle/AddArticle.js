import React, { useRef, useState } from 'react'
import JoditEditor from 'jodit-react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import app from '../../Firebase/Firebase.init';
import Header from '../Header/Header';



const auth = getAuth(app);
const AddArticle = () => {
  const editor = useRef('');
  const [editorContent, setEditorContent] = useState('');
  const [user] = useAuthState(auth);


  const handleAddArticle = (event) => {
		event.preventDefault();
        const title = event.target.title.value;
        const description = editorContent;
		
        const category = event.target.category.value;
        const img = event.target.img.value;
		const author = user?.displayName;
		const authorImg= user?.photoURL;
		const email = user?.email;
		const article = {title,description,category,img,author,authorImg,email};

		fetch('http://localhost:4000/articles',{
			method:'POST',
			headers:{
				'content-type':'application/json'
			},
			body: JSON.stringify(article),
		})
		.then(res=>res.json())
		.then(data => {
			setEditorContent('');
		})
		.catch(err => console.log(err))
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
		<div>
			<Header></Header>
			<div className='w-6/12 m-auto mt-2 mb-5 '>
				<h1 className='bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl'>
					Add Article
				</h1>
				<form onSubmit={handleAddArticle}>
					<>
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
							className='input input-bordered input-warning min-w-full '
						/>
					</>

					<>
						<label
							htmlFor='message'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Description
						</label>

						<JoditEditor
							// ref={editor}
							type='text'
							name='description'
							value={editorContent}
							onBlur={(newContent) => setEditorContent(newContent)}
						/>
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
							name='category'
							placeholder='Type category here'
							className='input input-bordered input-accent  min-w-full'
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
							type='text'
							name='img'
							placeholder='Input Image URL'
							className='input input-bordered input-info min-w-full mb-7'
						/>
					</>

					<button
						type='submit'
						className='block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto'
					>
						Submit
					</button>
				</form>
			</div>
		</div>
  );
}

export default AddArticle