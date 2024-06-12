import NavSection from '../components/nav.jsx'
import Sbar from "../components/sidebar.jsx"
import SellItem from '../components/sellItem.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



const SellItemPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <NavSection />
      <div className="flex mt-[73px]">
        <div className="-mt-[73px] w-1/4"><Sbar></Sbar></div>
        <div className="flex w-3/4">
          <div className='ml-[3.5rem]'><SellItem /></div>
        </div>
      </div>
    </>
  )
}

export default SellItemPage