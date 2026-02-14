import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Styles/Components.css';

const MyCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    const studentEmail = localStorage.getItem('studentEmail');
    try {
      const response = await axios.get(`http://localhost:3000/api/certificates/student-certificates/${studentEmail}`);
      setCertificates(response.data.certificates);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  const handleApprove = async (certificateId) => {
    try {
      await axios.post('http://localhost:3000/api/certificates/approve', { certificateId });
      alert('Certificate approved successfully');
      fetchCertificates();
    } catch (error) {
      alert('Failed to approve certificate');
    }
  };

  const viewDetails = (cert) => {
    setSelectedCert(cert);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>My Certificates</h3>
      
      {certificates.length === 0 ? (
        <p>No certificates yet</p>
      ) : (
        <div>
          {certificates.map((cert) => (
            <div
              key={cert._id}
              style={{
                border: '1px solid #ccc',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '5px',
              }}
            >
              <h4>{cert.certificateType}</h4>
              <p><strong>Institution:</strong> {cert.institutionName}</p>
              <p><strong>Certificate ID:</strong> {cert.certificateId}</p>
              <p><strong>Status:</strong> {cert.status}</p>
              <p><strong>Issue Date:</strong> {new Date(cert.issueDate).toLocaleDateString()}</p>
              
              <div style={{ marginTop: '10px' }}>
                <button onClick={() => viewDetails(cert)} style={{ marginRight: '10px', padding: '5px 15px' }}>
                  View Details
                </button>
                {cert.status === 'pending' && !cert.studentApproved && (
                  <button onClick={() => handleApprove(cert.certificateId)} style={{ padding: '5px 15px' }}>
                    Approve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCert && (
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
          <h3>Certificate Details</h3>
          <p><strong>Certificate ID:</strong> {selectedCert.certificateId}</p>
          <p><strong>Type:</strong> {selectedCert.certificateType}</p>
          <p><strong>Institution:</strong> {selectedCert.institutionName}</p>
          <p><strong>Student:</strong> {selectedCert.studentName}</p>
          <p><strong>Status:</strong> {selectedCert.status}</p>
          <p><strong>Issue Date:</strong> {new Date(selectedCert.issueDate).toLocaleDateString()}</p>
          <p><strong>Description:</strong> {selectedCert.description}</p>
          
          <BlockchainInfo 
            ipfsHash={selectedCert.ipfsHash}
            blockchainHash={selectedCert.blockchainHash}
          />
          
          <button onClick={() => setSelectedCert(null)} style={{ marginTop: '15px', padding: '8px 20px' }}>
            Close
          </button>
        </div>
      )}

      {selectedCert && (
        <div
          onClick={() => setSelectedCert(null)}
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
      )}
    </div>
  );
};

export default MyCertificates;
