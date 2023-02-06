import React from 'react'
import { Link } from 'react-router-dom';

export const Banner = () => {
	
  return (
		
		
		<section className='bg-black text-white'>
			<div style={{minHeight: 'calc(100vh - 108px)'}} className='mx-auto max-w-screen-xl px-4 lg:flex  lg:items-center'>
				<div className='mx-auto max-w-3xl text-center'>
					<h1 className='bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl'>
						STAY CURIOUS
					</h1>
					<p className='mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed'>
						Discover stories, thinking, and expertise from writers
						on latest technology
					</p>
					<div className='mt-8 flex flex-wrap justify-center gap-4'>
						<Link to='/add-article'>
							<button
								className='block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto'
								href='/get-started'
							>
							 Start writing
							</button>
						</Link>
						<button
							className='block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto'
							href='/about'
						>
							Learn More
						</button>
					</div>
				</div>
			</div>
		</section>
  );
}
