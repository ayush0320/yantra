import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {assets} from '../../assets/assets.js'
import Sidebar from '../../components/admin/Sidebar.jsx'

const Layout = () => {

  const navigate = useNavigate();

  const logout = () => {
    navigate('/')
  }

  return (
    <>

    {/* --- navbar --- */}
    <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
      <img onClick={() => navigate('/')} src={assets.logo} alt="" className='w-32 sm:w-40 cursor-pointer'/>
      <button onClick={logout} className='text-sm bg-indigo-600 text-white px-8 py-2 rounded-full cursor-pointer'>Logout</button>
    </div>

    {/* --- side bar --- */}
    <div className='flex h-[calc(100vh-70px)]'>
      <Sidebar />
      <Outlet />
    </div>
    </>
  )
}

export default Layout