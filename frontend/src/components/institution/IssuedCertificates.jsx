import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Styles/Components.css';

const IssuedCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    const institutionId = localStorage.getItem('institutionId');
    
    if (!institutionId) {
      console.log('Institution ID not found in localStorage');
      return;
    }
    
    try {
      const response = await axios.get(`http://localhost:3000/api/certificates/institution-certificates/${institutionId}`);
      setCertificates(response.data.certificates);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  const handleRevoke = async (certificateId) => {
    if (!confirm('Are you sure you want to revoke this certificate?')) return;

    try {
      await axios.post('http://localhost:3000/api/certificates/revoke', { certificateId });
      alert('Certificate revoked successfully');
      fetchCertificates();
    } catch (error) {
      alert('Failed to revoke certificate');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Issued Certificates</h3>
      
      {certificates.length === 0 ? (
        <p>No certificates issued yet</p>
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
              <p><strong>Student:</strong> {cert.studentName}</p>
              <p><strong>Email:</strong> {cert.studentEmail}</p>
              <p><strong>Certificate ID:</strong> {cert.certificateId}</p>
              <p><strong>Status:</strong> <span style={{
                color: cert.status === 'approved' ? 'green' : cert.status === 'revoked' ? 'red' : 'orange'
              }}>{cert.status}</span></p>
              <p><strong>Issue Date:</strong> {new Date(cert.issueDate).toLocaleDateString()}</p>
              
              <div style={{ marginTop: '10px' }}>
                <button onClick={() => setSelectedCert(cert)} style={{ marginRight: '10px', padding: '5px 15px' }}>
                  View Details
                </button>
                {cert.status !== 'revoked' && (
                  <button onClick={() => handleRevoke(cert.certificateId)} style={{ padding: '5px 15px', background: '#dc3545', color: 'white' }}>
                    Revoke
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCert && (
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
            <h3>Certificate Details</h3>
            <p><strong>Certificate ID:</strong> {selectedCert.certificateId}</p>
            <p><strong>Type:</strong> {selectedCert.certificateType}</p>
            <p><strong>Student:</strong> {selectedCert.studentName}</p>
            <p><strong>Email:</strong> {selectedCert.studentEmail}</p>
            <p><strong>Status:</strong> {selectedCert.status}</p>
            <p><strong>Issue Date:</strong> {new Date(selectedCert.issueDate).toLocaleDateString()}</p>
            <p><strong>Description:</strong> {selectedCert.description}</p>
            <p><strong>IPFS Hash:</strong> {selectedCert.ipfsHash}</p>
            <p><strong>Blockchain Hash:</strong> {selectedCert.blockchainHash}</p>
            
            <button onClick={() => setSelectedCert(null)} style={{ marginTop: '15px', padding: '8px 20px' }}>
              Close
            </button>
          </div>
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
        </>
      )}
    </div>
  );
};

export default IssuedCertificates;
