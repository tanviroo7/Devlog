import React from 'react';
import { Link } from 'react-router-dom';
import app from '../../Firebase/Firebase.init';
import {getAuth,signOut} from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
// import useFirebase from '../../hooks/useFirebase';


const auth = getAuth(app)
const Header = () => {
	// const {user,handleSignOut} = useFirebase();
	const [user] = useAuthState(auth);
	const name = user?.displayName;
	const photo = user?.photoURL
	
	return (
		<header className='p-4 dark:bg-black dark:text-gray-100'>
			<div className='container flex justify-between h-16 mx-auto '>
				<div className='flex'>
					<Link to='/' className='flex items-center p-2'>
						<p className='bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent p-2 rounded-lg text-bold text-3xl'>
							Devlog
						</p>
					</Link>

					<ul className='items-stretch hidden space-x-3 lg:flex'>
						<li className='flex'>
							<Link
								to='/my-articles'
								className='flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-blue-400 font-bold'
							>
								My Articles
							</Link>
						</li>

						<li className='flex'>
							<Link
								to='/add-article'
								className='flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-blue-400  font-bold'
							>
								Create Article
							</Link>
						</li>
						<li className='flex'>
							<Link
								to='/article-list'
								className='flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-blue-400  font-bold'
							>
								All Articles
							</Link>
						</li>
					</ul>
				</div>

				<div className='items-center flex-shrink-0 hidden lg:flex'>
					<span className='mr-5 text-blue-300 font-semibold font-mono'>
						{user?.displayName && user.displayName}
					</span>
					<div className=' avatar   w-11 mr-4 '>
						<img
							className=' rounded-full  '
							referrerPolicy='no-referrer'
							src={photo}
							alt=''
						/>
					</div>
					{user?.uid ? (
						<button
							onClick={() => signOut(auth)}
							className='block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto'
						>
							Log Out
						</button>
					) : (
						<Link to='/login'>
							<button className='block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto'>
								Log in
							</button>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
