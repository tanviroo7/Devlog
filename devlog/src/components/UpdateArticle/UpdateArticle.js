import { getAuth } from 'firebase/auth';
import JoditEditor from 'jodit-react';
import React, { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom'
import app from '../../Firebase/Firebase.init';
import Header from '../Header/Header';


const auth = getAuth(app);
const UpdateArticle = () => {
    const editor = useRef('');
	const [editorContent, setEditorContent] = useState('');
	// const [user] = useAuthState(auth);
    const {id} = useParams();
    const [articleDetails, setArticleDetails] = useState({});
	
    
    useEffect(() => {
		fetch(`http://localhost:4000/articles/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setArticleDetails(data);
				
			});
	}, []);
    //update article 
    const handleTitleChange = e => {
        const updatedTitle = e.target.value;
        const updatedArticle = {
            title:updatedTitle, 
            description:articleDetails.description,
            category:articleDetails.category,
            img:articleDetails.img
        };
        setArticleDetails(updatedArticle);
    };
    const handleDescriptionChange = (e) => {
        
		if (typeof(updatedDescription) != 'undefined'){
            const updatedDescription = e.target.value;
          const updatedArticle = { ...articleDetails };
			updatedArticle.description = updatedDescription;
			setArticleDetails(updatedArticle);
        }
    };
    const handleCategoryChange = (e) => {
        const updatedCategory = e.target.value;
		const updatedArticle = { ...articleDetails };
		updatedArticle.category = updatedCategory;
		setArticleDetails(updatedArticle);
    };
    const handleImgChange = (e) => {
         const updatedImg = e.target.value;
			const updatedArticle = { ...articleDetails };
			updatedArticle.img = updatedImg;
			setArticleDetails(updatedArticle);
    };
    const handleUpdateArticle = e =>{
        e.preventDefault();
        const url = `http://localhost:4000/article/${id}`;
        fetch(url,{
            method:'PUT',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(articleDetails)
        })
        .then( res => res.json())
        .then(data => {
            if (data.modifiedCount > 0){
                alert('Updated Successfully')
            }
        })

    }
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
							onChange={handleDescriptionChange}
							value={articleDetails.description || ''}
							onBlur={(newContent) =>
								setEditorContent(newContent)
							}
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
							value={articleDetails.category || ''}
							name='category'
							onChange={handleCategoryChange}
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
							value={articleDetails.img || ''}
							name='img'
							onChange={handleImgChange}
							placeholder='Input Image URL'
							className='input input-bordered input-info min-w-full mb-7'
						/>
					</>

					<button
						type='submit'
						value='Update'
						className='block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto'
					>
						Submit
					</button>
				</form>
			</div>
		</div>
  );
}

export default UpdateArticle