import React from 'react'
import { blogCategories } from '../assets/assets'
import { useState } from 'react'
import {motion} from 'motion/react' 
import BlogCard from './BlogCard.jsx'
import { useAppContext } from '../context/AppContext.jsx'

const BlogList = () => {

    const [menu, setMenu] = useState("All")
    const {blogs, input} = useAppContext()

    console.log('Blogs:', blogs);
    console.log('Input:', input);

    // function to filter blogs based on search input
    const filteredBlogs = () => {
        // Return empty array if blogs haven't loaded yet
        if (!blogs || ! Array.isArray(blogs)) {
            return [];
        }
        
        if(input === ""){
            return blogs;
        }
        
        return blogs.filter((blog) => 
            blog?. title?.toLowerCase().includes(input.toLowerCase()) ||
            blog?.description?.toLowerCase().includes(input.toLowerCase()) ||
            blog?.category?. toLowerCase().includes(input.toLowerCase())
        );
    }

  return (
    <div>
        {/* --- blog list --- */}
        <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>

            {blogCategories.map((item) => (
                <div key={item} className='relative'>

                    <button onClick={() => setMenu(item)} className={`cursor-pointer text-gray-500
                        ${menu === item && "text-white px-4 pt-0.5"}`}>
                        {item}
                        {menu === item && (<motion.div layoutId='underline' 
                        transition={{type: 'spring', stiffness: 500, damping: 30}}
                        className="absolute left-0 right-0 top-0 h-7 bg-indigo-600 rounded-full -z-10"></motion.div>)}
                        
                    </button>

                </div>
            ))}

        </div>

        {/* --- blog items --- */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 
        gap-8 mb-24 sm:mx-16 xl:mx-32'>
            {/* Show loading state while blogs are being fetched */}
            {! blogs || blogs.length === 0 ? (
                <div className='col-span-full text-center py-20'>
                    <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
                    <p className='text-gray-500 mt-4'>Loading blogs... </p>
                </div>
            ) : (
                filteredBlogs()
                .filter((blog) => menu === "All" ? true :  blog.category === menu)
                .length === 0 ? (
                    <div className='col-span-full text-center py-20'>
                        <p className='text-gray-500 text-lg'>No blogs found</p>
                    </div>
                ) : (
                    filteredBlogs()
                    .filter((blog) => menu === "All" ? true : blog. category === menu)
                    . map((blog) => <BlogCard blog={blog} key={blog._id} />)
                )
            )}
        </div>

    </div>
  )
}

export default BlogList