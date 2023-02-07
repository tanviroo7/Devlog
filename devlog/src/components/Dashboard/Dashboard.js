import { getAuth } from 'firebase/auth';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Route, Routes } from 'react-router-dom';
import app from '../../Firebase/Firebase.init';
import useAdmin from '../../hooks/useAdmin';
import Header from '../Header/Header';
import MyArticles from '../../pages/MyArticles/MyArticles'
import ManageArticles from './ManageArticles';


const auth = getAuth(app);
const Dashboard = () => {
    const[user] = useAuthState(auth);
    const [isAdmin] = useAdmin(user?.email);
  return (
		<div className=''>
			<Header></Header>
			{/* sidebar here */}
			<div className='drawer drawer-mobile'>
				<input
					id='my-drawer-2'
					type='checkbox'
					className='drawer-toggle'
				/>
				<div className='drawer-content '>
					{/* <!-- Page content here --> */}
					<Routes>
						<Route index element={<MyArticles />} />
						<Route path='my-articles' element={<MyArticles />} />
						<Route
							path='manage-articles'
							element={<ManageArticles />}
						/>
					</Routes>
					<label
						htmlFor='my-drawer-2'
						className='btn btn-primary drawer-button lg:hidden'
					>
						Open drawer
					</label>
				</div>
				<div className='drawer-side bg-gray-600'>
					<label
						htmlFor='my-drawer-2'
						className='drawer-overlay'
					></label>
					<ul className='menu p-4 w-80 bg-slate-100 text-black font-bold'>
						{/* <!-- Sidebar content here --> */}
						<Link to='/dashboard/my-articles'>
							<li className='border border-2 border-blue-300 rounded-lg mb-3'>
								<p>My Articles</p>
							</li>
						</Link>
						{isAdmin && (
							<Link to='/dashboard/manage-articles'>
								<li className='border border-2 border-blue-300 rounded-lg'>
									<p>Manage Articles</p>
								</li>
							</Link>
						)}
					</ul>
				</div>
			</div>
		</div>
  );
}

export default Dashboard