import { getAuth, updateProfile } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import app from '../../Firebase/Firebase.init';
import Header from '../Header/Header';
import { toast } from 'react-toastify';
const auth = getAuth(app);
const UserProfile = () => {
	const [user] = useAuthState(auth);
	const [isEditing, setIsEditing] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [image, setImage] = useState(null);
	const [displayName, setDisplayName] = useState(user?.displayName);
    console.log(user)

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

        console.log(json)

        if(json.status_code === 400) {
            setIsUploading(false);
           toast.warning(json.error.message, {
				position: 'bottom-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
           return null;
        }

		return json.data.url;
	};

	const handleUpdateProfile = async () => {
        setIsUploading(true);
		let photoURL = user?.photoURL;
		if (image) {
			photoURL = await handleUploadImage();
		}

		if(photoURL === null) return;

		if (!displayName) {
			setDisplayName(user?.displayName);
		}
		updateProfile(auth.currentUser, {
			photoURL,
			displayName,
		})
			.then((result) => {
				console.log(result);

				setIsEditing(false);
				toast.success('Information Updated', {
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
			})
			.finally(() => {
				setIsUploading(false);
			});
	};
	return (
		<div className='bg-gray-600 h-screen overflow-hidden'>
			<div className='bg-gray-600 h-screen w-full space-y-[40px]'>
				<Header></Header>
				<div
					className='flex flex-col justify-start items-center
                 h-full'
				>
					<h1 className='text-center mb-7 mt-5 bg-gradient-to-r from-blue-300 via-green-300 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl '>
						User Information
					</h1>
					{!isEditing ? (
						<div className='border-2 bg-gray-200 rounded-lg drop-shadow w-[700px] h-[500px] flex flex-col justify-center items-center'>
							<div className='flex flex-col space-y-6 justify-center items-center '>
								<img
									src={user?.photoURL}
									className='w-[100px] h-[100px] rounded-full object-cover'
									alt=''
								/>
								<p className='text-gray-700 font-bold'>
									Name: {user?.displayName}
								</p>
								<p className='text-gray-700 font-bold'> Email: {user?.email}</p>
								<button
									onClick={() => setIsEditing(true)}
									className='px-4 py-2 rounded-lg bg-blue-400 text-white'
								>
									Edit Profile
								</button>
							</div>
						</div>
					) : (
						<>
							<div className='border-2 bg-gray-200 rounded-lg drop-shadow w-[700px] h-[500px] flex flex-col justify-center items-center'>
								<div className='flex flex-col space-y-6 justify-center items-center '>
									<input
										className='file-input file-input-bordered file-input-info w-full max-w-2xl mb-5'
										type='file'
										name='img'
										onChange={(e) =>
											setImage(e.target.files[0])
										}
										id=''
									/>
									<div className='text-center'>
										<label
											htmlFor='message'
											className='block text-sm font-medium text-gray-900 dark:text-white'
										>
											Name
										</label>
										<input
											type='text'
											name='name'
											value={displayName}
											placeholder='Enter Name'
											className='input input-bordered input-info min-w-full '
											onChange={(e) =>
												setDisplayName(e.target.value)
											}
										/>
									</div>
									<p className='text-black'> {user?.email}</p>
									<button
										onClick={handleUpdateProfile}
										disabled={isUploading}
										className='px-4 py-2 rounded-lg bg-blue-400 text-white disabled:opacity-10'
									>
										{isUploading
											? 'Saving....'
											: 'Save Profile'}
									</button>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
