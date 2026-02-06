import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../Styles/Student_page_css/Student_dashboard.css'
import StudentWallet_View from '../../components/student/StudentWallet_View'
import { useState } from 'react'

const Student_dashboard = () => {
        const navigate = useNavigate()

        React.useEffect(() => {
          const userType = localStorage.getItem('userType')
          if (!userType || userType !== 'student') {
            navigate('/')
          }
        }, [navigate])

        const handleLogout = () => {
          // Clear auth token from localStorage
          localStorage.removeItem('token')
          localStorage.removeItem('userType')
          
          // Navigate to landing page
          navigate('/')
        }
        
        const [isSidebarOpen, setIsSidebarOpen] = useState(true);

        const toggleSidebar = () => {
          setIsSidebarOpen(!isSidebarOpen);
        };


  return (
    <>
      <div className='student-dashboard-layout'>
        <div className={`student-dashboard-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
           <h3>Menu</h3>
           <ul>
              <li>Dashboard</li>
              <li>My Certificate Wallet</li>
              <li>Request & Approval</li>
              <li>Activity History</li>
              <li>Institution Directory</li>
              <li>Settings & Security</li>
              <li>Help & Support</li>
              <li onClick={handleLogout}>Logout</li>
           </ul>
        </div>


        <div className='student-dashboard-content'>
          <div className='student-dashboard-nav'>
            <div className='nav-left'>
                 <nav>Student Dashboard</nav>
                  <i className="bi bi-list" onClick={toggleSidebar}></i>
            </div>

            <div className='nav-right'>
                   <i className="pr bi bi-person-square"></i>
                  <button className='btn btn-primary' onClick={handleLogout}>Log out</button>
            </div>

          </div>

          <div className='student-dashboard-stats'>
            <div className='stat-card'>
              <h3>Total Certificates</h3>
              <p>15</p>
            </div>
            <div className='stat-card'>
              <h3>Verified Certificates</h3>  
              <p>10</p>
            </div>
            <div className='stat-card'>
              <h3>Pending Certificates</h3>
              <p>5</p>
            </div>
            <div className='stat-card'>
              <h3>shared with Employer</h3>
              <p>0</p>
            </div>
          </div>

          <div className='student-dashboard-actions'>
            <div className='action-card'>
                <h4>Request Certificates</h4>
            </div>
            <div className='action-card'>
                <h4>My Certificates</h4>
            </div>
              <div className='action-card'>
                <h4>Share Certificate</h4>
              </div>
              <div className='action-card'>
                <h4>Verify Certificate</h4>
              </div>
              <div className='action-card'>
                <h4>Pending Approvals</h4>
              </div>
              <div className='action-card'>
                <h4>Institution Message</h4>
              </div>
          </div>

          <div className='student-dashboard-wallet-row'>
                <div className='student-dashboard-wallet-left'>
                  <StudentWallet_View/>
                </div>
                <div className='student-dashboard-wallet-right'>
                  <h2>Notifications</h2>
                  <p>No new notifications</p>
                </div>
          </div>
        </div>
      </div>
       
    </>
  )
}

export default Student_dashboard