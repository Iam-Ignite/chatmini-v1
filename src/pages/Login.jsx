/** @format */

import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../component/utils/firebase';

export default function Login() {
	const [errors, setErrors] = useState('');
	const [loading, setLoading] = useState(false);

	const emailRef = useRef();
	const passwordRef = useRef();
	const navigate = useNavigate();

	const onSubmit = async (e) => {
		e.preventDefault();
		const email = emailRef.current.value
		const password = passwordRef.current.value
		setLoading(true);
		try {
			await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			setLoading(false);
			navigate('/');
		} catch (error) {
			setLoading(false);
			setErrors(error.message);
			console.log(error);
		}
	};

	return (
		<div className='h-screen bg-cover bg-no-repeat bg-mm flex sm:justify-center'>
			<div className='p-20 sm:p-0 flex w-[60vw] flex-col items-center justify-center '>
				<h1 className='text-5xl sm:text-xl font-bold'>
					Sign in to your Account
				</h1>
				<p className='text-lg sm:text-sm mt-3 text-center font-normal '>
					To keep connected with friends please login <br />{' '}
					with your personal info
				</p>
				<form
					onSubmit={onSubmit}
					className='flex flex-col mt-5 mb-20 justify-between'>
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
						htmlFor=''
						className='my-3 max-w-lg w-full bg-white rounded-lg px-5 py-2 flex border border-[#222] items-center'>
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
					{errors && <span>{errors}</span>}

					{!loading ? (
						<>
							<button className='text-xl font-normal rounded-lg px-10 py-4 bg-[#00B4D8] text-center text-white border'>
								Login
							</button>
							<Link
								to='/register'
								className='text-xl  mt-4 font-medium rounded-lg px-9  sms:block hidden  py-4 border-[#00B4D8] text-center text-[#00B4D8] border'>
								Sign up
							</Link>
						</>
					) : (
						<>
							<div className='bg-[#2222223b] absolute h-screen w-screen left-0 top-0 z-50'></div>
							<button
								type='button'
								className='text-xl font-normal py-3 rounded-lg px-10  bg-[#58ddf7ec] text-center text-white border '
								disabled>
								Login...
							</button>
						</>
					)}
				</form>
			</div>
			<div className=' h-screen bg-cover px-20 w-[40vw] bg-no-repeat bg-bb flex flex-col items-center justify-center md:hidden'>
				<h1 className='text-5xl sm:text-lg font-bold text-white'>
					Welcome Back!
				</h1>
				<p className='text-xl sm:text-sm text-center my-3 font-light text-white'>
					Enter your personal Details to start your fun
					journey with us
				</p>
				<Link
					to='/register'
					className='text-3xl font-normal mt-5 rounded-md px-10 py-2 w-1/2 text-center text-white border '>
					Sign up
				</Link>
			</div>

			<p className='absolute left-10 bottom-4'>
				&copy; 2023 Friends signup form. All right reserved
				| Design by{' '}
				<span className='text-[#00B4D8]'>Deityui</span>
			</p>
		</div>
	);
}
