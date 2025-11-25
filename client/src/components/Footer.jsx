import React from 'react'
import {assets} from '../assets/assets.js'
import { footer_data } from '../assets/assets.js'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-indigo-500/3'>
        
        {/* columns */}
        <div className='flex flex-col md:flex-row item-start justify-between gap-10 py-10 border-b border-gray-400 text-gray-500'>

            <div>
                <img src={assets.logo} alt="logo" className='w-32 sm:w-44'/>
                <p className='max-w-[410px] mt-6' >There is no spoon. There is no separation between code and culture, between algorithms and art, between technological advancement and the evolution of human civilization itself. 
                This is Yantra: where we bridge the gap between theory and reality, exploring how humanity and its creations have become inseparable, one innovation at a time.</p>
            </div>

            <div className='flex flex-wrap justify-between md:w-[45%] gap-5 w-full'>
                {footer_data.map((section, index) => (
                    <div key={index} className=''>
                        <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>{section.title}</h3>
                        <ul className='text-sm space-y-1'>
                            {section.links.map((link, i) => (
                                <li className='hover:underline transition' key={i}>
                                    <a href="#">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

        </div>

        <p className='py-4 text-center text-sm md:text-base text-gray-500'>Copyright 2025 © Yantra Deep Dive - All rights reserved.</p>

    </div>


  )
}

export default Footer