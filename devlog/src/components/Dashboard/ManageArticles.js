import axios from 'axios';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import app from '../../Firebase/Firebase.init';

const auth = getAuth(app);
const ManageArticles = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
	const [allArticles, setAllArticles] = useState([]);
    
    // const newDescription = description.slice(0, 25) + '....';
    
    // Fetching all articles for admin
	useEffect(() => {
		axios
			.get(`http://localhost:4000/articles`)
			.then((response) => {
				console.log(response.data);
				setAllArticles(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [user?.email]);

    // Deleting Any Article from here 
    const handleDelete = (id) => {
		const proceed = window.confirm('Are you sure you want to Delete?');
		if (proceed) {
			const url = `http://localhost:4000/article/${id}`;
			fetch(url, {
				method: 'DELETE',
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.deletedCount > 0) {
						toast.success('Deleted Successfully', {
							position: 'bottom-right',
							autoClose: 1500,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						});
                        
						navigate('/dashboard');
					}
				})
		}
	};
  return (
		<div className=''>
			<div className='w-72 '>
				<table className='table '>
					{/* <!-- head --> */}
					<thead>
						<tr>
							<th></th>
							<th>Author Name</th>
							<th>Article Title</th>
							<th>Delete</th>
							<th>Details</th>
						</tr>
					</thead>
					<tbody>
						{/* <!-- row 1 --> */}
						{allArticles.map((article, i) => (
							<tr>
								<th></th>
								<td>
									<div className='flex items-center space-x-3'>
										<div className='avatar'>
											<div className='mask mask-squircle w-12 h-12'>
												<img
													src={article?.authorImg}
													alt='author'
												/>
											</div>
										</div>
										<div>
											<div className='font-bold'>
												{article?.author}
											</div>
											<div className='text-sm opacity-50'>
												{article?.email}
											</div>
										</div>
									</div>
								</td>
								<td>
									{article?.title.slice(0, 35)}....
									<br />
									<span className='badge badge-ghost badge-sm'>
										{article?.category}
									</span>
								</td>
								<td>
									{' '}
									<button
										onClick={() =>
											handleDelete(article?._id)
										}
										className='btn btn-error btn-xs'
									>
										Delete
									</button>
								</td>
								<th>
									<Link to={`/article-list/${article?._id}`}>
										<button className='btn btn-accent btn-xs'>
											View Article
										</button>
									</Link>
								</th>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
  );
}

export default ManageArticles