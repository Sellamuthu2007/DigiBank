import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../Styles/Student_page_css/Student_dashboard.css'
import StudentWallet_View from '../../components/student/StudentWallet_View'
import MyCertificates from '../../components/student/MyCertificates'
import RequestCertificate from '../../components/student/RequestCertificate'
import ShareCertificate from '../../components/student/ShareCertificate'
import MyRequests from '../../components/student/MyRequests'
import { useState } from 'react'

const Student_dashboard = () => {
        const navigate = useNavigate()
        const [activeView, setActiveView] = useState('dashboard')

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
          localStorage.removeItem('studentEmail')
          
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
              <li onClick={() => setActiveView('dashboard')}>Dashboard</li>
              <li onClick={() => setActiveView('certificates')}>My Certificates</li>
              <li onClick={() => setActiveView('request')}>Request Certificate</li>
              <li onClick={() => setActiveView('requests')}>My Requests</li>
              <li onClick={() => setActiveView('share')}>Share Certificate</li>
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

          {activeView === 'dashboard' && (
            <>
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
                <div className='action-card' onClick={() => setActiveView('request')}>
                    <h4>Request Certificates</h4>
                </div>
                <div className='action-card' onClick={() => setActiveView('certificates')}>
                    <h4>My Certificates</h4>
                </div>
                  <div className='action-card' onClick={() => setActiveView('share')}>
                    <h4>Share Certificate</h4>
                  </div>
                  <div className='action-card' onClick={() => setActiveView('requests')}>
                    <h4>Pending Approvals</h4>
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
            </>
          )}

          {activeView === 'certificates' && <MyCertificates />}
          {activeView === 'request' && <RequestCertificate />}
          {activeView === 'share' && <ShareCertificate />}
          {activeView === 'requests' && <MyRequests />}
        </div>
      </div>
       
    </>
  )
}

export default Student_dashboard