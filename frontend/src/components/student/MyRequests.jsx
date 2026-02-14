import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Styles/Components.css';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const studentEmail = localStorage.getItem('studentEmail');
    try {
      const response = await axios.get(`http://localhost:3000/api/certificates/student-requests/${studentEmail}`);
      setRequests(response.data.requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>My Certificate Requests</h3>
      
      {requests.length === 0 ? (
        <p>No requests yet</p>
      ) : (
        <div>
          {requests.map((req) => (
            <div
              key={req._id}
              style={{
                border: '1px solid #ccc',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '5px',
              }}
            >
              <p><strong>Certificate Type:</strong> {req.certificateType}</p>
              <p><strong>Institution:</strong> {req.institutionEmail}</p>
              <p><strong>Status:</strong> <span style={{ 
                color: req.status === 'approved' ? 'green' : req.status === 'rejected' ? 'red' : 'orange' 
              }}>{req.status}</span></p>
              <p><strong>Description:</strong> {req.description}</p>
              <p><strong>Requested on:</strong> {new Date(req.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
