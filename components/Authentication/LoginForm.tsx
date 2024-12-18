'use client'

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import CommunityComponentCSS from '../../style/Home.module.css';
import { UserAPI } from '@/APIcalling/userAPI';
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const LoginForm: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVasibility, setPasswordVasibility] = useState(true);


  const handleUserLogin = async () => {
    const userData = {
      email: email, password: password
    }
    await UserAPI.handleUserLogin(userData).then(res => {
      if (res.data.code === 11000) {
        toast.error('This email is already exists! Try another one.', {
          autoClose: 2000,
        });
      } else {
        if (res?.data?.error === 'User not found' || res?.data?.error === 'Invalid password') {
          toast.error(res?.data?.error, {
            autoClose: 2000,
          });
        } else {
          toast.success('Login Successful!', {
            autoClose: 2000,
          });
          localStorage.setItem("legalEstateUser", JSON.stringify(res));
          window.location.reload()
          router.push('/dashboard');
        }
      }
    })
  }

  const [error, setError] = useState('');
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 6 characters long and include letters, numbers, and special characters.');
    } else {
      setError('');
    }
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };


  return (
    <div style={{
      borderRadius: "5px",
      background: "black",
      backgroundSize: "100%",
      backgroundRepeat: "repeat",
    }} className='mt-[100px]'>

      <img className={`${CommunityComponentCSS.loginUserAvatar} block mx-auto mt-[-100px]`} src="https://i.ibb.co/vdbSRwB/8380015.png" alt="Image" />

      <div className='mb-6'>
        <h2 className='text-2xl mb-2 lg:text-5xl md:text-3xl text-white flex justify-center'>Login Form</h2>
        <p style={{ color: 'white' }} className='flex justify-center mx-2 md:mx-3 lg:mx-4'>
          Welcome to Legal Estate! Please log in to your account. We do appreciate your decision to stay connected with us.</p>

        <p style={{ color: 'white' }} className='flex justify-center mx-2 md:mx-3 lg:mx-4'>
          We are glad to have you back!</p>
      </div>

      <div className='p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5'>
        <div>
          <h1 className='mb-1'>Email Address<span className='text-red-700 text-xl pt-1'> *</span></h1>
          <div className={`flex items-center`}>
            <input onChange={(e) => setEmail(e.target.value)}
              style={{
                borderRadius: "4px",
                background: 'white',
              }}
              placeholder="Type your email address"
              className="w-full h-[45px] focus:outline-none border-0 pl-1 text-black pl-2"
              type="email"
              name=""
              id=""
            />
          </div>
        </div>


        <div className='mt-4'>
          <h1 className='mb-1'>Password <span className='text-red-700 text-xl pt-1'> *</span></h1>
          <div style={{
            borderRadius: "4px",
            background: 'white',
          }} className={`flex items-center px-2`} >
            <input onChange={handleChangePassword}
              placeholder="Type your password"
              className="w-full h-[45px] focus:outline-none border-0 pl-1 text-black bg-white"
              type={passwordVasibility ? 'password' : 'text'}
              name=""
              id=""
            />
            {
              passwordVasibility ? <IoEye onClick={() => setPasswordVasibility(!passwordVasibility)} color={'black'} size={25}></IoEye> : <IoEyeOff onClick={() => setPasswordVasibility(!passwordVasibility)} color={'black'} size={25}></IoEyeOff>
            }

          </div>
          {error && <p className="text-red-700 mt-1">{error}</p>}
        </div>

        <div className='my-4 flex justify-end'>
          <button onClick={handleUserLogin} className={`btn border-0 btn-md w-[200px] normal-case ${CommunityComponentCSS.orderExtraItemButton}`}>Login</button>
        </div>

        <div className='flex justify-center'>
          <p onClick={() => router.push('/signup')}>New here? <span className='underline text-white hover:cursor-pointer'>Sign up</span></p>
        </div>

      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default LoginForm;