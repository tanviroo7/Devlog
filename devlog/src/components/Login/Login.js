import React from 'react';
import { Link } from 'react-router-dom';
// import useFirebase from '../../hooks/useFirebase';
import {useSignInWithGoogle} from 'react-firebase-hooks/auth'
import {getAuth} from 'firebase/auth'
import app from '../../Firebase/Firebase.init';

const auth = getAuth(app);
export const Login = () => {
	const [signInWithGoogle,user] = useSignInWithGoogle(auth);
	

	
	
	return (
		<>
			{/* new component */}
			<>
				{/* component */}
				<div className=' bg-gray-900'>
					<div className='flex justify-center h-screen'>
						<div
							className='hidden bg-cover lg:block lg:w-2/3'
							style={{
								backgroundImage:
									'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
							}}
						>
							<div className='flex items-center h-full px-20 bg-gray-900 bg-opacity-40'>
								<div>
									<h2 className='text-4xl font-bold text-white'>
										Devlog
									</h2>
									<p className='max-w-xl mt-3 text-gray-300'>
										Empowering the tech community, one post
										at a time. 
									</p>
								</div>
							</div>
						</div>
						<div className='flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6'>
							<div className='flex-1'>
								<div className='text-center'>
									<h2 className='text-4xl font-bold text-center text-white'>
										Devlog
									</h2>
									<p className='mt-3 text-gray-300'>
										Sign in with google to access your
										account
									</p>
								</div>
								<div className='mt-8'>
									<div className=' w-76 h-56 rounded-lg  bg-gray-700 bg-opacity-20 m-10 flex flex-col items-center'>
										<div className='mb-5'>
											<Link to='/home'>
												<button
													onClick={() =>
														signInWithGoogle()
													}
													className='btn btn-lg mt-20  bg-black hover:bg-blue-800 '
												>
													<div className='px-4 py-3'>
														<svg
															className='h-6 w-6'
															viewBox='0 0 40 40'
														>
															<path
																d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
																fill='#FFC107'
															/>
															<path
																d='M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z'
																fill='#FF3D00'
															/>
															<path
																d='M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z'
																fill='#4CAF50'
															/>
															<path
																d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
																fill='#1976D2'
															/>
														</svg>
													</div>
												</button>
											</Link>
											{/* <button onClick={handleSignOut} className='px-8 py-3 font-semibold rounded dark:bg-amber-400 dark:text-gray-900'>
							Log out 
						</button> */}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		</>
	);
};
