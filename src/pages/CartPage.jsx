import { React, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavSection from '../components/nav';
import Category from '../components/categories';
import { useState } from 'react';
const Cart = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])
    const [products, setproducts] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:3000/cart';
        let data = { userId: localStorage.getItem('userId') }
        axios.post(url, data)
            .then((res) => {
                if (res.data.products) {
                    setproducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [])

    const [temp_pdt, settemp_pdt] = useState([]);

    useEffect(() => {
        // console.log('useEffect');
        settemp_pdt(products);
    }, [products]);

    const [search, setsearch] = useState('');


    const searchItem = (value) => {
        // console.log(value);
        setsearch(value);
    }

    const click = () => {
        // console.log('clicked');
        // console.log('temp1', temp_pdt);
        settemp_pdt(products);
        // console.log('products', products);
        // console.log('temp', temp_pdt);
        let filteredPdts = products.filter((item) => {
            if (item.name.toLowerCase().includes(search.toLowerCase()) || item.price.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        })
        // console.log('filtered', filteredPdts);
        settemp_pdt(filteredPdts);
        // console.log('temp_pdt', temp_pdt);
    }


    const filters = (val) => {
        // console.log('val',val);
        // console.log('temp1', temp_pdt);
        // settemp_pdt(products);
        // console.log('products', products);
        // console.log('temp', temp_pdt);
        let filteredPdts = products.filter((item) => {
            if (item.category == val) {
                return item;
            }
        })
        console.log('filtered', filteredPdts);
        settemp_pdt(filteredPdts);
        console.log('temp_pdt', temp_pdt);

    }

    // const A=[];
    // const [cartpdt,setcartpdt]=useState(A)
    const Addcart = (value) => {
        console.log('clci')
        console.log('val', value);
        // A.push(value);
        // setcartpdt(A);
        // const data=cartpdt;
        console.log(value.name);
        const formdata = new FormData();
        formdata.append('name', value.name);
        formdata.append('category', value.category);
        formdata.append('price', value.price);
        formdata.append('quantity', value.quantity);
        formdata.append('description', value.description);
        formdata.append('image', value.image);
        console.log(formdata);
        const url = 'http://localhost:3000/add-cart';
        axios.post(url, formdata).then((result) => {
            console.log(result.data);
            if (result.data.message) {
                alert(result.data.message);
                navigate('/cart');
            }

        }).catch((err) => {
            console.log(err);
            alert('Server error');
        })
    }


    return (
        <>
            <NavSection search={search} searchItem={searchItem} click={click} />
            <Category  filters={filters}/>
            <div className='flex justify-center flex-wrap gap-2 mt-[133px]'>
                {temp_pdt && temp_pdt.length > 0 && temp_pdt.map((item, index) => {
                    return (
                        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <img height=''
                                    className="p-8 rounded-t-lg"
                                    src={'http://localhost:3000/' + item.image}
                                    alt="product image"
                                />
                            <div className="px-5 pb-5">
                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                        <span >{item.name}</span> | {item.category}

                                    </h5>
                                <div className="flex items-center mt-2.5 mb-5">
                                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                        <svg
                                            className="w-4 h-4 text-yellow-300"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 22 20"
                                        >
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        {/* Repeat the above SVG for each star */}
                                    </div>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                                        5.0
                                    </span>
                                    
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className=" text-3xl font-bold text-gray-900 dark:text-white">Rs.{item.price}</span>
                                    </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>

    )


}

export default Cart
