import React from 'react';
import { Button } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import cart_icon from "../assets/cart_icon.png"


const NavSection = (props) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MNNIT SHOPPERS</span>
                </Link>
                <div className="flex gap-3 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Link to='/cart' className='flex item-center gap-0'>

                        <img src={cart_icon} alt="" />
                        <div className="gap-0 w-[22px] h-[22px] flex justify-center items-center mt-[-3px] ml-[-5px] rounded-[11px] text-14 bg-red-500 text-white">
                            0
                        </div>
                    </Link>
                    {!localStorage.getItem('token') ? <Button color="light"><Link to='/login'>Login</Link></Button> : <Button color="light" onClick={logout}>Logout</Button>}

                    {!localStorage.getItem('token') ? <button type="button" className="mt-0 mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><Link to='/signup'>Sign Up</Link>

                    </button> : <></>}

                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">

                    <div className="relative text-gray-600 focus-within:text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                                    <path d="M21 21l-6-6M9 2a7 7 0 110 14 7 7 0 010-14z"></path>
                                </svg>
                            </button>
                        </span>
                        <input
                            value={props && props.search}
                            onChange={(e) => {
                                props.searchItem && props.searchItem(e.target.value);
                            }}
                            type="search"
                            name="search"
                            placeholder="Search..."
                            className="py-2 pl-10 pr-4 border border-gray-300 rounded-tl-md rounded-bl-md focus:outline-none focus:border-gray-500"
                        />
                        <button
                            onClick={() => {
                                props.click && props.click()
                            }}
                            type="button" className=" h-[42px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-tr-md rounded-br-md rounded-bl-none rounded-tl-none text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search

                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default NavSection;