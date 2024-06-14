import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/hero.jsx';
import NavSection from '../components/nav.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import Category from '../Components/Categories.js';

const HomePage = () => {

  //for auth
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
      console.log(result);
      if (result.data.products) {
        setproducts(result.data.products)
      }
    }).catch((err) => {
      console.log(err);
      alert('Server error');
    })
  }, [])
  // console.log('products',products);
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

  const filters=(val)=>{
    // console.log('val',val);
    // console.log('temp1', temp_pdt);
    // settemp_pdt(products);
    // console.log('products', products);
    // console.log('temp', temp_pdt);
    let filteredPdts = products.filter((item) => {
      if (item.category==val) {
        return item;
      }
    })
    console.log('filtered',filteredPdts);
    settemp_pdt(filteredPdts);
    console.log('temp_pdt',temp_pdt);

  }
  
  const Addcart = (productId) => {
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

  return (
    <>
      <NavSection search={search} searchItem={searchItem} click={click} />
      {/* <Category filters={filters} /> */}
      <HeroSection ></HeroSection>
      <div className='flex justify-center flex-wrap gap-2 mt-[10px]'> 
        {temp_pdt && temp_pdt.length > 0 && temp_pdt.map((item, index) => {
          return (
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img height=''
                  className="p-8 rounded-t-lg"
                  src={'http://localhost:3000/' + item.image}
                  alt="product image"
                />
              </a>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    <span >{item.name}</span> | {item.category}

                  </h5>
                </a>
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
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">Rs.{item.price}</span>
                  <a
                    href="#"
                    onClick={() => {
                        Addcart(item._id);
                    }}
                    to='/cart'
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* <Carousel></Carousel>*/}
    </>
  )
}

export default HomePage