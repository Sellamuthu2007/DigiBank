import { use } from 'react'
import './Institution_Dashboard.css'
import { useNavigate } from 'react-router-dom'

export default function Institution_dashboard(){
  const navigate = useNavigate();
  return (
    <>
      <div class = 'institution-header' id='h-20'>
        <div><h4>IIT Madras</h4></div>
        <div class = 'header-profile'>
          <div><i class="bi bi-person-check"></i></div>
          <div><p>Profile</p></div>
        </div>
      </div>
      <div className="institution-Dashboard" id = 'h-80'>
        <div className = "dashboard-component" onClick = {()=> navigate('/institution-upload')}>
            <div>
              <div><i class="bi bi-upload"></i></div>
              <div><p>Upload Certificate</p></div>
            </div>
        </div>  
        <div className = "dashboard-component" onClick = {()=> navigate('/institution-stastics')}>
            <div>
              <div><i class="bi bi-graph-up-arrow"></i></div>
              <div><p>Show Stastics of Certificate</p></div>
            </div>
        </div>  
        <div className = "dashboard-component" onClick = {()=> navigate('/institution-incoming-request')}>
            <div>
              <div><i class="bi bi-bell"></i></div>
              <div><p>Incoming Request</p></div>
            </div>
        </div>  
        <div className = "dashboard-component" onClick = {()=> navigate('/institution-revoke')}>
            <div>
              <div> <i class="bi bi-shield"></i></div>
              <div><p>Revoke the certificate Issued</p></div>
            </div>
        </div>  
              
      </div>    
    </>
  )
}