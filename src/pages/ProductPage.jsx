import { React, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavSection from '../components/nav';
import Category from '../components/categories';
import { useState } from 'react';
const Product = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])
    const [products, setproducts] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:3000/get-product';
        axios.get(url).then((result) => {
            // console.log(result);
            if (result.data.products) {
                setproducts(result.data.products)
            }
        }).catch((err) => {
            console.log(err);
            alert('Server error');
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
        // settemp_pdt(products);
        // console.log('products', products);
        // console.log('temp', temp_pdt);
        // let filteredPdts = products.filter((item) => {
        //   if (item.name.toLowerCase().includes(search.toLowerCase()) || item.price.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())) {
        //     return item;
        //   }
        // })
        // console.log('filtered',filteredPdts);
        // settemp_pdt(filteredPdts);
        // console.log('temp_pdt',temp_pdt);
    
        const url = 'http://localhost:3000/search?search='+search;
        axios.get(url)
            .then((res) => {
                // console.log(res); 
                settemp_pdt(res.data.products)
                // if (res.data.message) {
                //     alert('Item added.')
                // }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    
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
    const Addcart = (productId,e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');

        if (!userId) {
            alert('Please Login first.')
            return;
        }

        const url = 'http://localhost:3000/add-cart';
        const data = { userId, productId }
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Item added.')
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }

    const details=(id)=>{
        navigate('/productdetails/'+id);
    }

    const handleOpenRazorpay=(data)=>{
        const options = {
            key: 'rzp_test_LQiyGHbGt01Yn1',
            amount: Number(data.amount),
            currency: data.currency,
            order_id: data.id,
            name: 'MNNIT SHOPPERS',//
            description: 'XYZ',//
            handler: function (response) {
                console.log(response, "1")
                
            }

        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const payment=(amount,e)=>{
        e.stopPropagation();
        const _data = { amount: amount }
        axios.post('http://localhost:3000/orders', _data)
            .then(res => {
                console.log(res.data, "2")
                handleOpenRazorpay(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <>
            <NavSection search={search} searchItem={searchItem} click={click} />
            <Category  filters={filters}/>
            <div className='flex justify-center flex-wrap gap-2 mt-[133px]'>
                {/* {temp_pdt&&temp_pdt.length==0&&<h1 className='font-size-[40px]'>No Match</h1>} */}
                {temp_pdt && temp_pdt.length > 0 && temp_pdt.map((item, index) => {
                    return (
                        <div onClick={()=>details(item._id)}
                        className="hover:cursor-pointer w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <img height=''
                                    className="p-8 rounded-t-lg"
                                    src={'http://localhost:3000/' + item.image}
                                    alt="product image"
                                />
                            <div className="px-5 pb-5">
                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white items-center justify-center">
                                        <span >{item.name}</span> | {item.category}

                                    </h5>
                                <div className="flex items-center justify-between">
                                    <span className=" text-3xl font-bold text-gray-900 dark:text-white">Rs.{item.price}</span>
                                </div>
                                <div className="flex items-center justify-center gap-2 mt-4">
                                <span
                                        style={{ cursor: 'pointer' }}
                                        onClick={(e) => {
                                            Addcart(item._id,e);
                                        }}
                                        to='/cart'
                                        className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                                    >
                                        Add to cart
                                    </span>
                                    <span
                                        style={{ cursor: 'pointer' }}
                                        onClick={(e) => {
                                            payment(item.price,e);
                                        }}
                                        to='/cart'
                                        className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Buy Now
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>

    )


}

export default Product
