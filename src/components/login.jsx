import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'


const LoginSection = () => {
    const navigate=useNavigate();
    const [username ,setusername] =useState('');
    const [password ,setpassword] =useState('');

    const handleApi = ()=>{
        console.log({username,password});
        // return;
        const url='http://localhost:3000/login';
        const data={username,password};
        axios.post(url,data).then((result)=>{
            console.log(result.data);
            if(result.data.message){
                alert(result.data.message);
                if(result.data.token){
                    localStorage.setItem('token',result.data.token);
                    navigate('/');
                }
            }

        }).catch((err)=>{
            console.log(err);
            alert('Server error');
        })
    }

    return (
        <div className='mt-[10rem]'>
            <div className="max-w-sm mx-auto bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <div className="mb-5 ">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e)=>{
                            setusername(e.target.value)
                        }}
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="abc"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e)=>{
                            setpassword(e.target.value)
                        }}
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        placeholder='***'
                    />
                </div>
                {/* <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input
                            id="remember"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                            required
                        />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Remember me
                    </label>
                </div> */}
                <div className='flex item-center gap-3 justify-center'>
                    <button onClick={handleApi}

                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Login
                    </button>
                    <Button color="light"><Link to='/signup'>SignUp</Link></Button>
                </div>

            </div>
        </div>
    );
};

export default LoginSection;
