import React from 'react'
import {assets} from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'

const Navbar = () => {

  // useNavigate hook to programmatically navigate between routes
  // onClick on the logo will navigate to the home page
  // const navigate = useNavigate();

  const { navigate, token } = useAppContext();

  return (
    <div className="flex justify-between item-center py-5 mx-8 sm:mx-20 xl:mx-32">
    <img onClick={() => navigate('/')} src={assets.logo} alt="logo" className='w-32 sm:w-44 '/>

    <button onClick={() => navigate('/admin')} className="flex pr-30 items-center bg-indigo-500 hover:bg-indigo-600 text-white gap-2 rounded-full font-medium w-32 h-12 py-3 px-8 my-0">
     {token ? "Dashbaoard": "Login"}
      <img src={assets.arrow} alt="arrow" className='w-3'/>
    </button>

    </div>
  )
}

export default Navbar