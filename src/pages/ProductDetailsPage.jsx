import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavSection from "../components/nav";

const ProductDetails = () => {
    const [product, setproduct] = useState()
    const [user, setuser] = useState()
    
    // const [user, setuser] = useState()
    // console.log(user, "userrrrr")
    const p = useParams()
    // console.log(p);
    // console.log(p.pId);

    useEffect(() => {
        const url = 'http://localhost:3000/productdetails/' + p.pId;
        axios.get(url)
            .then((res) => {
                // console.log(res);
                // return;
                if (res.data.product) {
                    setproduct(res.data.product)
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [])


    // const handleContact = (addedBy) => {
    //     console.log('id', addedBy)
    //     const url = API_URL + '/get-user/' + addedBy;
    //     axios.get(url)
    //         .then((res) => {
    //             if (res.data.user) {
    //                 setuser(res.data.user)
    //             }
    //         })
    //         .catch((err) => {
    //             alert('Server Err.')
    //         })
    // }

    const Contact = (addedby) => {
        console.log('id', addedby)
        // return;
        const url = 'http://localhost:3000/get-user/' + addedby;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setuser(res.data.user)
                }
                
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }



    return (<>
        <NavSection></NavSection>
        PRODUCT DETAILS :
        <div >
            {product && <div className="mt-[45px] d-flex justify-content-between flex-wrap">
                <div>
                    <img width="400px" height="200px" src={'http://localhost:3000' + '/' + product.image} alt="" />
                    <h6> Product Details : </h6>
                    {product.description}
                </div>
                <div>
                    <h3 className="m-2 price-text"> Rs. {product.price} /- </h3>
                    <p className="m-2"> {product.name}  | {product.category} </p>
                    <p className="m-2 text-success"> {product.description} </p>
                    {product.addedby &&
                        <button className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={() => Contact(product.addedby)}>
                            SHOW CONTACT DETAILS
                        </button>}
                    {user&&user.username&&<h4 className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{user.username}</h4>}

                </div>
            </div>}
        </div>
    </>

    )
}

export default ProductDetails
