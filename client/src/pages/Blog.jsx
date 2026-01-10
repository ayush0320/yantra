import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {assets, blog_data, comments_data} from '../assets/assets.js'
import Navbar from '../components/Navbar.jsx';
import Moment from 'moment';
import Footer from '../components/Footer.jsx';
import Loader from '../components/Loader.jsx';
import { useAppContext } from '../context/AppContext.jsx';
import { toast } from 'react-hot-toast';

const Blog = () => {

  const {id} = useParams();

  const {axios} = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  // fetch blog data
  const fetchBlogData = async () => {
    try{
      const {data} = await axios.get(`api/blogs/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    }
    catch(error){
      toast.error(error.message);
    }
  }

  // fetch comments
  const fetchComments = async () => {
    try{
      const {data} = await axios.post(`api/blog/comments`, {blogId: id});
      data.success ? setComments(data.comments) : toast.error(data.message);
    }
    catch(error){
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(`api/blog/add-comment`, {blog: id, name, content});
      data.success ? (toast.success(data.message), setName(''), setContent('')) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground} alt="" className='absolute -top-30 -z-1 opacity-50' />

      <Navbar />
        
        <div className='text-center mt-20 text-gray-600'>
          <p className='text-indigo-900 py-4 font-medium'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
          <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
          <h2 className='my-5 max-w-lg mx-auto truncate'>{data.subTitle}</h2>
          <p className='inline-block py-1 px-4 mb-6 text-sm bg-blue-100/40 font-medium text-indigo-900 border rounded-full border-blue-300'>Ethan Hunt</p>
        </div>

        {/* --- description --- */}
        <div className=' max-w-5xl md:mx-auto my-10 mt-6'>

          <img src={data.image} alt="blog" className='rounded-3xl mb-5'/>
          <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{__html: data.description}}></div>

          {/* --- comment section --- */}
          <div className='mt-24 mb-10 max-w-3xl mx-auto'>
            <p className='font-semibold mb-4'>Comments ({comments.length})</p>

            <div className='flex flex-col gap-4 mt-4 '>
              {comments.map((item, index) => (
                
                <div key={index} className='relative bg-gray-100/60 border border-gray-300 rounded text-gray-600 max-w-xl p-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <img src={assets.user_icon} alt="" className='w-6'/>
                    <p className='font-medium'>{item.name}</p>
                  </div>
                  <p className='text-sm  max-w-md ml-8' >{item.content}</p>
                  <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>
                    {Moment(item.createdAt).fromNow()}
                  </div>
                </div>

              ))}
            </div>
          </div>

          {/* --- comment box --- */}
          <div className='max-w-3xl mx-auto'>
            <p className='font-semibold mb-4'>Add a comment</p>

            <form action="" className='flex flex-col items-start gap-4 max-w-lg'>
              <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='Name' className='w-full p-2 border border-gray-300 rounded outline-none' required/>

              <textarea onChange={(e) => setComment(e.target.value)} value={comment} placeholder='Comment' className='w-full p-2 border border-gray-300 rounded outline-none h-48' required></textarea>

              <button type='submit' className='bg-indigo-500 text-white px-4 py-2 rounded mt-2 hover:scale-105 transition-all cursor-pointer text-white'>Post</button>
            </form>
          </div>

          {/* --- social media icons --- */}
          <div className='my-24 max-w-3xl mx-auto'>
            <p className='font-semibold my-4'>Share this article</p>
            <div className='flex'>
              <img src={assets.facebook_icon} alt="Facebook" width={50} />
              <img src={assets.twitter_icon} alt="Twitter" width={50} />
              <img src={assets.instagram_icon} alt="Instagram" width={50} />
            </div>
          </div>


        </div>

    <Footer />

    </div>
  ) : <Loader />;
}

export default Blog