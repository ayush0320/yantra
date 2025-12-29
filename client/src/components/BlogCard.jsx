import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({blog}) => {

  const {title, description, category, image, _id} = blog;
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (

    <div onClick={()=> navigate(`/blog/${_id}`)}
    className='w-full rounded-lg overflow-hidden shadow hover:scale-105 hover:shadow-lg hover:shadow-blue-300 transition-all duration-200 cursor-pointer mb-10'>

      {! imageError && image ?  (
        <img 
          src={image} 
          alt={title} 
          className='w-full h-48 object-cover' 
          onError={handleImageError}
        />
      ) : (
        <div className='w-full h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center'>
          <span className='text-white text-4xl font-bold'>{title?. charAt(0).toUpperCase()}</span>
        </div>
      )}

      <span className='ml-5 mt-4 px-3 py-1 inline-block bg-indigo-200 rounded-full text-xs text-indigo-800' >
        {category}
      </span>

      <div className='p-5'>
        <h5 className='mb-2 font-medium text-lg text-gray-800'>{title}</h5>
        <p className='mb-3 text-sm text-gray-600' dangerouslySetInnerHTML={{
          "__html":  description?. slice(0, 80) || ''
        }}></p>
      </div>

    </div>

  )
}

export default BlogCard