import React, { useEffect } from 'react'
import { assets, dashboard_data} from '../../assets/assets'
import { useState } from 'react'

const Dashboard = () => {

  // State to hold dashboard data
  const [dashboardDadta, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })

  // Function to fetch dashboard data (simulated here with static data)
  // In a real application, this would involve an API call
  const fetchDashboardData = async () => {
    setDashboardData(dashboard_data);
  }

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);


  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>

      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded
        shadow curson-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_1} alt="Dashboard Icon 1" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardDadta.blogs}</p>
            <p className='text-gray-400'>Blogs</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Dashboard