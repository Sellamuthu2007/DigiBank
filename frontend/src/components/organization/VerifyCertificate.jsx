import { useState } from 'react';
import axios from 'axios';
import '../../Styles/Components.css';

const VerifyCertificate = () => {
  const [certificateId, setCertificateId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.get(`http://localhost:3000/api/certificates/verify/${certificateId}`);
      setResult(response.data);
    } catch (error) {
      setResult({
        valid: false,
        message: 'Certificate not found or error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h3>Verify Certificate</h3>
      
      <form onSubmit={handleVerify}>
        <div style={{ marginBottom: '15px' }}>
          <label>Certificate ID:</label>
          <input
            type="text"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="Enter certificate ID (e.g., CERT-1234567890-5678)"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? 'Verifying...' : 'Verify Certificate'}
        </button>
      </form>

      {result && (
        <div
          style={{
            marginTop: '30px',
            padding: '20px',
            border: `2px solid ${result.valid ? 'green' : 'red'}`,
            borderRadius: '5px',
            background: result.valid ? '#d4edda' : '#f8d7da',
          }}
        >
          <h3 style={{ color: result.valid ? 'green' : 'red' }}>
            {result.valid ? '✓ Valid Certificate' : '✗ Invalid Certificate'}
          </h3>
          <p><strong>Message:</strong> {result.message}</p>

          {result.certificate && (
            <div style={{ marginTop: '15px' }}>
              <h4>Certificate Details:</h4>
              <p><strong>Certificate ID:</strong> {result.certificate.certificateId}</p>
              <p><strong>Type:</strong> {result.certificate.certificateType}</p>
              <p><strong>Student Name:</strong> {result.certificate.studentName}</p>
              <p><strong>Student Email:</strong> {result.certificate.studentEmail}</p>
              <p><strong>Institution:</strong> {result.certificate.institutionName}</p>
              <p><strong>Issue Date:</strong> {new Date(result.certificate.issueDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {result.certificate.status}</p>
              <p><strong>Description:</strong> {result.certificate.description}</p>
              <p><strong>IPFS Hash:</strong> {result.certificate.ipfsHash}</p>
              <p><strong>Blockchain Hash:</strong> {result.certificate.blockchainHash}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyCertificate;
