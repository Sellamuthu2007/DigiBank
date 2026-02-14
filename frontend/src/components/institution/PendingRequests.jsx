import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Styles/Components.css';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const institutionEmail = localStorage.getItem('institutionEmail');
    
    if (!institutionEmail) {
      console.log('Institution email not found in localStorage');
      return;
    }
    
    try {
      const response = await axios.get(`http://localhost:3000/api/certificates/institution-requests/${institutionEmail}`);
      setRequests(response.data.requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleIssue = (request) => {
    setSelectedRequest(request);
    setShowIssueForm(true);
  };

  const issueCertificate = async () => {
    const institutionId = localStorage.getItem('institutionId');
    const institutionName = localStorage.getItem('institutionName');

    try {
      await axios.post('http://localhost:3000/api/certificates/issue', {
        studentEmail: selectedRequest.studentEmail,
        studentName: selectedRequest.studentName,
        institutionId,
        institutionName,
        certificateType: selectedRequest.certificateType,
        description: selectedRequest.description,
      });
      alert('Certificate issued successfully');
      setShowIssueForm(false);
      setSelectedRequest(null);
      fetchRequests();
    } catch (error) {
      alert('Failed to issue certificate');
    }
  };

  const handleReject = async (requestId) => {
    if (!confirm('Are you sure you want to reject this request?')) return;

    try {
      await axios.post('http://localhost:3000/api/certificates/reject-request', { requestId });
      alert('Request rejected');
      fetchRequests();
    } catch (error) {
      alert('Failed to reject request');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Pending Certificate Requests</h3>
      
      {requests.length === 0 ? (
        <p>No pending requests</p>
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
              <p><strong>Student:</strong> {req.studentName}</p>
              <p><strong>Email:</strong> {req.studentEmail}</p>
              <p><strong>Certificate Type:</strong> {req.certificateType}</p>
              <p><strong>Description:</strong> {req.description}</p>
              <p><strong>Status:</strong> {req.status}</p>
              <p><strong>Requested on:</strong> {new Date(req.createdAt).toLocaleDateString()}</p>
              
              {req.status === 'pending' && (
                <div style={{ marginTop: '10px' }}>
                  <button onClick={() => handleIssue(req)} style={{ marginRight: '10px', padding: '5px 15px' }}>
                    Issue Certificate
                  </button>
                  <button onClick={() => handleReject(req._id)} style={{ padding: '5px 15px', background: '#dc3545', color: 'white' }}>
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showIssueForm && selectedRequest && (
        <>
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'white',
              padding: '30px',
              border: '2px solid #333',
              zIndex: 1000,
              maxWidth: '500px',
              width: '90%',
            }}
          >
            <h3>Issue Certificate</h3>
            <p><strong>Student:</strong> {selectedRequest.studentName}</p>
            <p><strong>Certificate Type:</strong> {selectedRequest.certificateType}</p>
            <p><strong>Description:</strong> {selectedRequest.description}</p>
            
            <div style={{ marginTop: '20px' }}>
              <button onClick={issueCertificate} style={{ marginRight: '10px', padding: '8px 20px' }}>
                Confirm Issue
              </button>
              <button onClick={() => setShowIssueForm(false)} style={{ padding: '8px 20px' }}>
                Cancel
              </button>
            </div>
          </div>
          <div
            onClick={() => setShowIssueForm(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 999,
            }}
          />
        </>
      )}
    </div>
  );
};

export default PendingRequests;
