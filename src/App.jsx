import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/Homepage.jsx';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './pages/LoginPage.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        {/* <NavSection></NavSection> */}
        <Routes>
          <Route  path="/" element={<HomePage/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          {/* <Route path='/signup' element={<Signup/>}></Route>
          <Route  path="/sidebar" element={<SideBarPage/>}></Route>
          <Route  path="/profile" element={<ProfilePage/>}></Route>
          <Route  path="/profileupdate" element={<ProfileUpdatePage/>}></Route>
          <Route  path="/sell" element={<SellItemPage/>}></Route>
          <Route  path="/lend" element={<LendItemPage/>}></Route>
          <Route  path="/history" element={<History/>}></Route>
          <Route  path="/sold" element={<SoldPage/>}></Route>
          <Route  path="/lent" element={<LentPage/>}></Route>
          <Route  path="/purchased" element={<PurchasedPage/>}></Route>
          <Route  path="/borrowed" element={<BorrowedPage/>}></Route>
          <Route  path="/products" element={<Product/>}></Route>
          <Route  path="/cart" element={<CartProducts/>}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
