import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Styles/Components.css';

const ShareCertificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertId, setSelectedCertId] = useState('');
  const [orgName, setOrgName] = useState('');

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    const studentEmail = localStorage.getItem('studentEmail');
    try {
      const response = await axios.get(`http://localhost:3000/api/certificates/student-certificates/${studentEmail}`);
      const approved = response.data.certificates.filter(cert => cert.status === 'approved');
      setCertificates(approved);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:3000/api/certificates/share', {
        certificateId: selectedCertId,
        organizationId: 'ORG-' + Date.now(),
        organizationName: orgName,
      });
      alert('Certificate shared successfully');
      setSelectedCertId('');
      setOrgName('');
    } catch (error) {
      alert('Failed to share certificate');
    }
  };

  const generateShareLink = (certId) => {
    return `${window.location.origin}/verify/${certId}`;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h3>Share Certificate</h3>
      
      <form onSubmit={handleShare}>
        <div style={{ marginBottom: '15px' }}>
          <label>Select Certificate:</label>
          <select
            value={selectedCertId}
            onChange={(e) => setSelectedCertId(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="">-- Select Certificate --</option>
            {certificates.map((cert) => (
              <option key={cert._id} value={cert.certificateId}>
                {cert.certificateType} - {cert.certificateId}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Organization Name:</label>
          <input
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="Enter organization name"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px' }}>
          Share Certificate
        </button>
      </form>

      {selectedCertId && (
        <div style={{ marginTop: '30px', padding: '15px', border: '1px solid #ccc' }}>
          <h4>Shareable Link:</h4>
          <p style={{ wordBreak: 'break-all', background: '#f5f5f5', padding: '10px' }}>
            {generateShareLink(selectedCertId)}
          </p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(generateShareLink(selectedCertId));
              alert('Link copied to clipboard');
            }}
            style={{ padding: '8px 15px', marginTop: '10px' }}
          >
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareCertificate;
