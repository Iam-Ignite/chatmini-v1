
import React, { useRef, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import {
	auth,
	db,
	storage,
} from '../component/utils/firebase';
import {
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [fileName, setFileName] = useState(
		'Add chat profile pic here',
	);
	const emailRef = useRef();
	const passwordRef = useRef();
	const displayNameRef = useRef();
	const fileRef = useRef(null);
	const navigate = useNavigate();

	const fileN = () => {
		setFileName(fileRef.current.files[0].name);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const displayName = displayNameRef.current.value;
		const file = fileRef.current.files[0];

		setLoading(true);
		try {
			const res = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);

			const storageRef = ref(storage, displayName);
			const uploadTask = uploadBytesResumable(
				storageRef,
				file,
			);
			uploadTask.on(
				(error) => {
					console.log('first problem', error);
					setError(true);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(
						async (downloadURL) => {
							await updateProfile(res.user, {
								displayName,
								photoURL: downloadURL,
							});
							await setDoc(doc(db, 'users', res.user.uid), {
								uid: res.user.uid,
								displayName,
								email,
								photoURL: downloadURL,
							});
							await setDoc(
								doc(db, 'userChats', res.user.uid),
								{},
							);
							setLoading(false);
							navigate('/');
						},
					);
				},
			);
		} catch (err) {
			setError(true);
			console.log('problem', err);
		}
	};

	return (
		<div className='h-screen bg-cover bg-no-repeat bg-mm md:flex justify-center'>
			<div className=' h-screen bg-cover px-20 w-full md:w-[40vw]  hidden bg-no-repeat bg-bb md:flex flex-col items-center justify-center'>
				<h1 className='text-5xl font-bold text-white'>
					Welcome Back!
				</h1>
				<p className='text-xl text-center my-3 font-light text-white'>
					To keep in touch with you friends Please login
					with your personal info{' '}
				</p>
				<Link
					to='/login'
					className='text-3xl font-normal mt-5 rounded-md px-10 py-2 w-1/2 text-center text-white border '>
					Login
				</Link>
			</div>

			<div className='md:p-10 flex md:w-[60vw] overflow-x-auto h-screen p-5 flex-col items-center '>
				<h1 className='md:text-5xl text-xl mt-0 md:mt-6 font-bold'>
					Create Account
				</h1>
				<p className='text-lg text-center font-normal'>
					Get started with an account on Friends
				</p>
				<form
					onSubmit={onSubmit}
					className='flex flex-col justify-between'>
					<div className="my-3 bg-white max-w-lg justify-center cursor-pointer w-full h-14 flex items-center rounded-md px-5 py-4'">
						<img
							src='/images/Google logo.svg'
							className='h-8 mr-3'
							alt=''
						/>
						<span className='text-lg'>
							Continue with Google
						</span>
					</div>
					<div className='flex justify-center relative flex-col items-center'>
						<span className='bg-[#BFC8CC]  rounded-full z-20 p-1 px-1.5 text-white text-center'>
							OR
						</span>
						<div className='bg-[#BFC8CC] h-[2px] w-96 bottom-3 absolute '></div>
					</div>
					<label
						htmlFor='file'
						className='md:my-3 my2 bg-white max-w-lg cursor-pointer w-full border-dashed border border-black flex items-center rounded-md px-4 md:px-5 py-3 md:py-4'>
						<img
							src='/images/addpic.svg'
							alt=''
							className='h-6'
						/>
						<p className='ml-3 text-gray-400 text-sm'>
							{fileName.substring(0, 25)}
						</p>
					</label>
					<input
						id='file'
						hidden
						onChange={fileN}
						type='file'
						ref={fileRef}
					/>
					<label
						htmlFor=''
						className='md:my-3 my-2 max-w-lg w-full bg-white rounded-lg md:px-5 px-3 md:py-2 py-1 flex border border-[#222] items-center'>
						<img
							src='/images/profile.svg'
							className='h-6'
							alt='pic'
						/>
						<input
							className='outline-none bg-white w-full px-3 py-2'
							type='text'
							placeholder='Username'
							ref={displayNameRef}
						/>
					</label>
					<label
						htmlFor=''
						className='md:my-3 my-2 max-w-lg w-full bg-white rounded-lg md:px-5 px-3 md:py-2 py-1 flex border border-[#222] items-center'>
						<img
							src='/images/email.svg'
							alt='email'
							className='h-4'
						/>
						<input
							className='outline-none bg-white w-full px-3 py-2'
							type='email'
							placeholder='Email'
							ref={emailRef}
						/>
					</label>
					<label
						htmlFor=''
						className='mt-3 max-w-lg w-full bg-white rounded-lg px-5 py-2 flex border border-[#6a6a6a] items-center'>
						<img
							src='/images/password.svg'
							className='h-6'
							alt=''
						/>
						<input
							className='outline-none bg-white w-full px-3 py-2'
							type='Password'
							placeholder='Password'
							ref={passwordRef}
						/>
					</label>
					<p>6 or more characters</p>
					{error && <span>Something went wrong</span>}
					<b className='md:py-5 py-2'>
						By registering you agree to our{' '}
						<span className='text-[#00B4D8]'>Terms</span>{' '}
						and{' '}
						<span className='text-[#00B4D8]'>
							Conditions
						</span>
					</b>
					{!loading ? (
						<>
							<button className='text-xl font-normal rounded-lg md:px-10 py-3 md:py-4 bg-[#00B4D8] text-center text-white border'>
								Sign Up
							</button>
							<Link
								to='/login'
								className='text-xl  mt-4 font-medium rounded-lg px-9  block md:hidden  py-3  md:py-4 border-[#00B4D8] text-center text-[#00B4D8] border'>
								Sign in
							</Link>
						</>
					) : (<>
					{error ? (
                      <>
					  	<button className='text-xl font-normal rounded-lg px-10 py-3 md:py-4 bg-[#00B4D8] text-center text-white border'>
								Sign Up
							</button>
							<Link
								to='/login'
								className='text-xl  mt-4 font-medium rounded-lg px-9  sms:block hidden  py-4 border-[#00B4D8] text-center text-[#00B4D8] border'>
								Sign in
							</Link>
					  </>
					):(

						<>
							<div className='bg-[#2222223b] absolute h-screen w-screen left-0 top-0 z-50'></div>
							<button
								type='button'
								className='text-xl font-normal py-3 md:py-3 rounded-lg px-10  bg-[#58ddf7ec] text-center text-white border '
								disabled>
								Signing...
							</button>
						</>
					)
						
					}
					</>
					)}
				</form>
			</div>
			<p className='absolute mt-2 mx-2 md:right-10 bottom-4'>
				&copy; 2023 Friends signup form. All right reserved
				| Design by{' '}
				<span className='text-[#00B4D8]'>Deityui</span>
			</p>
		</div>
	);
}
