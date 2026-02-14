import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BlockchainInfo from '../components/BlockchainInfo';

const VerifyCertificatePage = () => {
  const { certificateId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (certificateId) {
      verifyCertificate();
    }
  }, [certificateId]);

  const verifyCertificate = async () => {
    setLoading(true);
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

  if (loading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>Verifying Certificate...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '50px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Certificate Verification</h1>
      
      {result && (
        <div
          style={{
            marginTop: '30px',
            padding: '30px',
            border: `3px solid ${result.valid ? 'green' : 'red'}`,
            borderRadius: '10px',
            background: result.valid ? '#d4edda' : '#f8d7da',
          }}
        >
          <h2 style={{ color: result.valid ? 'green' : 'red', fontSize: '32px' }}>
            {result.valid ? '✓ Valid Certificate' : '✗ Invalid Certificate'}
          </h2>
          <p style={{ fontSize: '18px', marginTop: '10px' }}><strong>Status:</strong> {result.message}</p>

          {result.certificate && (
            <div style={{ marginTop: '30px', background: 'white', padding: '20px', borderRadius: '5px' }}>
              <h3>Certificate Details:</h3>
              <table style={{ width: '100%', marginTop: '15px' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>Certificate ID:</td>
                    <td style={{ padding: '10px' }}>{result.certificate.certificateId}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>Certificate Type:</td>
                    <td style={{ padding: '10px' }}>{result.certificate.certificateType}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>Student Name:</td>
                    <td style={{ padding: '10px' }}>{result.certificate.studentName}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>Student Email:</td>
                    <td style={{ padding: '10px' }}>{result.certificate.studentEmail}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>Institution:</td>
                    <td style={{ padding: '10px' }}>{result.certificate.institutionName}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>Issue Date:</td>
                    <td style={{ padding: '10px' }}>{new Date(result.certificate.issueDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>Status:</td>
                    <td style={{ padding: '10px' }}>{result.certificate.status}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>Description:</td>
                    <td style={{ padding: '10px' }}>{result.certificate.description}</td>
                  </tr>
                </tbody>
              </table>

              <BlockchainInfo 
                ipfsHash={result.certificate.ipfsHash}
                blockchainHash={result.certificate.blockchainHash}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyCertificatePage;
