import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../Styles/Student_page_css/Student_dashboard.css'

const Student_dashboard = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear auth token from localStorage
    localStorage.removeItem('token')
    
    // Navigate to landing page
    navigate('/')
  }

  return (
    <>
        <div className='student-dashboard-nav'>
          <nav>Student Dashboard</nav>
          <button className='btn btn-primary' onClick={handleLogout}>Log out</button>
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
         
        
    </>
  )
}

export default Student_dashboard