import React from 'react'
import { useRef } from 'react'
import {assets} from '../assets/assets.js'
import { useAppContext } from '../context/AppContext.jsx'

const Header = () => {

  // function to handle form submission
  const {setInput, input} = useAppContext();

  // on submit, set the input in context
  const inputRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  }

  // function to clear the search input
  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  }

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">

        <div className='text-center my-20 mb-8'>

            <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-blue-300 rounded-full text-sm text-blue-600 bg-blue-100/60 font-medium'>
                <p>Ai Feature Integrated</p>
                <img src={assets.star_icon} className="inline-block w-4" alt="" />
            </div>

            <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-800'>There is no spoon. <br /> Just <span className='text-blue-600'>code</span>.</h1>
            <p className='my-6 sm:my-8 max-w-2xl m-auto mx-sm:text-xs text-gray-700'>Peeling back the simulation. Yantra bridges the gap between high-level theory and raw code. Exploring the architecture of AI, one algorithm at a time.</p>

            <form onSubmit={onSubmitHandler} className='flex items-center w-11/12 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
                <input ref={inputRef} type="text" placeholder='Search for blogs' className='flex-1 px-3 py-2 sm:px-4 sm:py-3 ' required />
                <button type='submit' className='bg-indigo-500 text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer'>Search</button>
            </form>
        </div>

        <div className='text-center'>
          {
          input && <button onClick={onClear} className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'>
            Clear Search
          </button>
          }
        </div>

        <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50'/>
    </div>
  )
}

export default Header