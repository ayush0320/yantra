import React from 'react'

const Newsletter = () => {
  return (
    <div className='flex flex-col item-center jusity-center text-center space-y-2 my-20'>

        <h1 className='md:text-4xl text-2xl font-semibold'>Jack Into the Mainframe</h1>
        <p className='md:text-lg text-gray-500 pb-8'>Weekly deep dives, implementation guides, and the unfiltered truth about how modern AI actually works.</p>

        <form className='flex items-center mx-auto max-w-2xl w-full md:h-13 h-12'>
            <input className='border border-gray-300 h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500' type="text" placeholder='Enter email id' required />
            <button type="submit" className='md:px-12 px-8 h-full text-white bg-indigo-500 hover:bg-indigo-600 transition-all cursor-pointer rounded-md rounded-l-none'>Subscribe</button>
        </form>

    </div>
  )
}

export default Newsletter