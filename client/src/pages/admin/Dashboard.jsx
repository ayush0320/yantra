import React, { useEffect } from 'react'
import { assets, dashboard_data} from '../../assets/assets'
import { useState } from 'react'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

  // State to hold dashboard data
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })

  const {axios} = useAppContext();

  const fetchDashboard = async () => {
    try {
      const {data} = await axios.get('/api/admin/dashboard');
      data.success ? setDashboardData(data.dashboardData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Function to fetch dashboard data (simulated here with static data)
  // In a real application, this would involve an API call
  // const fetchDashboardData = async () => {
  //   setDashboardData(dashboard_data);
  // }

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboard();
  }, []);


  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>

      <div className='flex flex-wrap gap-4'>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded
        shadow curson-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_1} alt="Dashboard Icon 1" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
            <p className='text-gray-400'>Blogs</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded
        shadow curson-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_2} alt="Dashboard Icon 1" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.comments}</p>
            <p className='text-gray-400'>Comments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded
        shadow curson-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_3} alt="Dashboard Icon 1" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
            <p className='text-gray-400'>Drafts</p>
          </div>
        </div>

      </div>

      <div>
        <div className='flex items-center gap-3 m-4 mt-6 text-gray-700'>
          <img src={assets.dashboard_icon_4} alt="Dashboard Icon 4" />
          <p>Latest Blogs</p>
        </div>

        <div>
          <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
            <table className='w-full text-sm text-gray-500'>
              <thead className='text-xs text-gray-600 text-left uppercase'>
                <tr>
                  <th scope="col" className='px-2 py-4 xl:px-6'>#</th>
                  <th scope="col" className='px-2 py-4'>Blogs</th>
                  <th scope="col" className='px-2 py-4 max-sm:hidden'>Date</th>
                  <th scope="col" className='px-2 py-4 max-sm:hidden'>Status</th>
                  <th scope="col" className='px-2 py-4'>Actions</th>
                </tr>
              </thead>

              <tbody>
                {dashboardData.recentBlogs.map((blog, index) => {
                  return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
                })}
              </tbody>

            </table>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard