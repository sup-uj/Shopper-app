import { useNavigate } from 'react-router-dom';

function Sbar() {
   const navigate = useNavigate();
   async function Homefunc() {
      navigate("/");
   }
   async function lendfunc() {
      navigate("/lend");
   }
   async function sellfunc() {
      navigate("/sell");
   }

   async function pffunc() {
      navigate("/profile");
   }
   async function Historyfunc() {
      navigate("/history");
   }

   async function Soldfunc() {
      navigate("/sold");
   }

   async function Purchasedfunc() {
      navigate("/purchased");
   }
   async function Lentfunc() {
      navigate("/lent");
   }
   async function Borrowedfunc() {
      navigate("/borrowed");
   }
   

   return (

      <div className='mt-[75px]'>
         <div id="drawer-navigation" className="fixed  " aria-labelledby="drawer-navigation-label">
            <div className="py-4 overflow-y-auto">
               <ul className="space-y-2 font-medium">
                  <li>
                     <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                           <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                        </svg>
                        {/* <span className="flex-1 ms-3 whitespace-nowrap"></span> */}
                        <button onClick={pffunc} id="ProfileBtn" className="block text-black bg-primary-0 hover:bg-primary-0 font-medium rounded-lg text-sm px-12 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="button">User Profile</button>
                     </a>
                  </li>

                  <li>
                     <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                           <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                           <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                        </svg>
                        <button id="dashboard" className="block text-black bg-primary-0 hover:bg-primary-0 font-medium rounded-lg text-sm px-12 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="button">Dashboard</button>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                           <path stroke="currentColor" d="m1 1 4 4 4-4" />
                        </svg>
                     </button>
                     <ul>
                        <li>
                           <button onClick={Historyfunc} id="history" className=" hover:bg-gray-100 block text-black bg-primary-0 hover:bg-primary-0 font-medium rounded-lg text-sm px-20 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="button">History</button>
                        </li>
                        <li>
                           <button onClick={Soldfunc} id="sold" className=" hover:bg-gray-100 block text-black bg-primary-0 hover:bg-primary-0 font-medium rounded-lg text-sm px-20 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="button">Sold</button>
                        </li>
                        <li>
                           <button onClick={Purchasedfunc} id="purchased" className=" hover:bg-gray-100 block text-black bg-primary-0 hover:bg-primary-0 font-medium rounded-lg text-sm px-20 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="button">Purchased</button>
                        </li>
                        <li>
                           <button onClick={Lentfunc} id="lent" className=" hover:bg-gray-100 block text-black bg-primary-0 hover:bg-primary-0 font-medium rounded-lg text-sm px-20 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="button">Lent</button>
                        </li>
                        <li>
                           <button onClick={Borrowedfunc} id="borrowed" className=" hover:bg-gray-100 block text-black bg-primary-0 hover:bg-primary-0 font-medium rounded-lg text-sm px-20 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="button">Borrowed</button>
                        </li>

                     </ul>
                  </li>
                  <li>
                     <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                           <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" /> </svg>
                        {/* <span className="flex-1 ms-0 whitespace-nowrap"></span> */}
                        <button onClick={sellfunc} id="SellButton" className="block text-black bg-primary-0 hover:bg-primary-0 font-medium rounded-lg text-sm px-12 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="button">Sell Product</button>
                     </a>
                  </li>
                  <li>
                     <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                           <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                        </svg>
                        <button onClick={lendfunc} id="LendButton" className="block text-black bg-primary-0 hover:bg-primary-0 font-medium rounded-lg text-sm px-12 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="button">Lend Product</button>
                     </a>
                  </li>
               </ul>
            </div>
         </div>



      </div>
   )
}

export default Sbar