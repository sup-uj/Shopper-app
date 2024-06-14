import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Label, FileInput } from 'flowbite-react';
import category from './category';


function SellItem() {
    const navigate = useNavigate();
    async function Sidebarfunc() {
        navigate("/sidebar");
    }

    const [name, setname] = useState('');
    const [category, setcategory] = useState('');
    const [price, setprice] = useState('');
    const [quantity, setquantity] = useState('');
    const [description, setdescription] = useState('');
    const [image, setimage] = useState('');

    const abc = () => {
        console.log("clicked");
        // const formdata = {
        //     name:"",
        //     category:"",
        //     price:"",
        //     quantity:"",
        //     description:"",
        //     image:""
        // }
        // formdata.name=name;
        // formdata.category=category;
        // formdata.price=price;
        // formdata.quantity=quantity;
        // formdata.description=description;
        // formdata.image=image;

        const formdata = new FormData();
        formdata.append('name', name);
        formdata.append('category', category);
        formdata.append('price', price);
        formdata.append('quantity', quantity);
        formdata.append('description', description);
        formdata.append('image', image);
        formdata.append('userId', localStorage.getItem('userId'));
        // console.log(formdata.name);
        const url = 'http://localhost:3000/sell';
        // console.log("clicked");
        // console.log(check);
        // const res=await axios({
        //     method: 'post',
        //     url: url,
        //     headers: {}, 
        //     data: {
        //       foo: formdata, // This is the body part
        //     }
        // });
        // console.log(res.data.res);
        console.log(formdata);
        axios.post(url, formdata).then((result) => {
            console.log(result);
            if (result.data.message) {
                alert(result.data.message);
                navigate('/')
            }

        }).catch((err) => {
            console.log(err);
            // alert('Server error');
        })
    }

    return (
        <div>
            <div id="SellBtn" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden justify-center items-center w-full md:inset-0 h-modal md:h-full">
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-center items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Sell Product
                            </h3>
                        </div>
                        {/* <form action="#"> */}
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text" value={name}
                                        onChange={(e) => {
                                            setname(e.target.value)
                                        }}
                                        name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" />
                                </div>
                                <div>
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                    <select id="category" value={category}
                                        onChange={(e) => {
                                            setcategory(e.target.value)
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option selected="">Select category</option>
                                        <option value="Furniture">Furniture</option>
                                        <option value="Stationary">Stationary</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Books">Books</option>
                                        <option value="Coolers">Coolers</option>
                                        <option value="Cycle">Cycle</option>
                                        {/* {
                                            category && category.length > 0 && category.map((item, index) => {
                                                return (
                                                    <option key={'option' + index}>{item}</option>
                                                )
                                            })
                                        } */}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                    <input type="number" value={price}
                                        onChange={(e) => {
                                            setprice(e.target.value)
                                        }}
                                        name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rs.2999" required="" />
                                </div>

                                <div>
                                    <label htmlFor="qunatity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                    <input type="number" value={quantity}
                                        onChange={(e) => {
                                            setquantity(e.target.value)
                                        }}
                                        name="quantity" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1" required="" />
                                </div>

                            </div>
                            <div>
                                <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Image</label>
                                <div className="flex w-full items-center justify-center">
                                    <Label
                                        htmlFor="dropzone-file"
                                        className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                    >
                                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                            <svg
                                                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeWidth="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <FileInput onChange={(e) => {
                                            setimage(e.target.files[0]);
                                        }} id="dropzone-file" className="hidden" />
                                    </Label>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea value={description}
                                    onChange={(e) => {
                                        setdescription(e.target.value);
                                    }}
                                    id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write product description here"></textarea>
                            </div>
                        </div>
                        <button onClick={abc} type="submit" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" ></path></svg>
                            Add new product
                        </button>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellItem
