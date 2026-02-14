import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../Styles/pages/OrganizationDashboard.css';

const OrganizationDashboardEnhanced = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('dashboard');
  const [certificateId, setCertificateId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verificationHistory, setVerificationHistory] = useState([]);

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (!userType || userType !== 'organization') {
      navigate('/');
    }
    loadVerificationHistory();
  }, [navigate]);

  const loadVerificationHistory = () => {
    const history = JSON.parse(localStorage.getItem('verificationHistory') || '[]');
    setVerificationHistory(history);
  };

  const saveToHistory = (certId, result) => {
    const history = JSON.parse(localStorage.getItem('verificationHistory') || '[]');
    const newEntry = {
      certificateId: certId,
      valid: result.valid,
      timestamp: new Date().toISOString(),
      studentName: result.certificate?.studentName,
      institutionName: result.certificate?.institutionName,
    };
    history.unshift(newEntry);
    localStorage.setItem('verificationHistory', JSON.stringify(history.slice(0, 10)));
    setVerificationHistory(history.slice(0, 10));
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.get(`http://localhost:3000/api/certificates/verify/${certificateId}`);
      setResult(response.data);
      saveToHistory(certificateId, response.data);
    } catch (error) {
      setResult({
        valid: false,
        message: 'Certificate not found or error occurred',
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('organizationToken');
    localStorage.removeItem('userType');
    navigate('/');
  };

  const stats = {
    todayVerifications: verificationHistory.filter(v => {
      const today = new Date().toDateString();
      return new Date(v.timestamp).toDateString() === today;
    }).length,
    totalVerifications: verificationHistory.length,
    validCerts: verificationHistory.filter(v => v.valid).length,
    invalidCerts: verificationHistory.filter(v => !v.valid).length,
  };

  return (
    <div className="organization-dashboard">
      <header className="organization-header">
        <h1>🏢 Organization Verification Portal</h1>
        <div className="institution-header-actions">
          <span style={{ marginRight: '20px' }}>
            👤 {localStorage.getItem('organizationEmail') || 'Organization'}
          </span>
          <button className="institution-btn institution-btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {activeView === 'dashboard' && (
        <>
          <div className="organization-stats-grid">
            <div className="organization-stat-card">
              <div className="institution-stat-header">
                <div className="institution-stat-icon">📊</div>
              </div>
              <div className="institution-stat-value">{stats.todayVerifications}</div>
              <div className="institution-stat-label">Verified Today</div>
            </div>

            <div className="organization-stat-card success">
              <div className="institution-stat-header">
                <div className="institution-stat-icon">✅</div>
              </div>
              <div className="institution-stat-value">{stats.validCerts}</div>
              <div className="institution-stat-label">Valid Certificates</div>
            </div>

            <div className="organization-stat-card warning">
              <div className="institution-stat-header">
                <div className="institution-stat-icon">⚠️</div>
              </div>
              <div className="institution-stat-value">{stats.invalidCerts}</div>
              <div className="institution-stat-label">Invalid/Revoked</div>
            </div>

            <div className="organization-stat-card info">
              <div className="institution-stat-header">
                <div className="institution-stat-icon">📈</div>
              </div>
              <div className="institution-stat-value">{stats.totalVerifications}</div>
              <div className="institution-stat-label">Total Verifications</div>
            </div>
          </div>

          <div className="organization-content">
            <div className="organization-verification-section">
              <div className="organization-verification-header">
                <h2>🔍 Verify Certificate Authenticity</h2>
                <p>Enter the certificate ID to instantly verify its authenticity on the blockchain</p>
              </div>

              <form className="organization-verification-form" onSubmit={handleVerify}>
                <div className="organization-input-group">
                  <label>Certificate ID</label>
                  <input
                    type="text"
                    className="organization-input"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    placeholder="e.g., CERT-1234567890-1001"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="organization-verify-btn"
                  disabled={loading}
                >
                  {loading ? '🔄 Verifying...' : '🔍 Verify Certificate'}
                </button>
              </form>

              {result && (
                <div className={`organization-result-card ${result.valid ? 'valid' : 'invalid'}`}>
                  <div className="organization-result-header">
                    <div className={`organization-result-icon ${result.valid ? 'valid' : 'invalid'}`}>
                      {result.valid ? '✅' : '❌'}
                    </div>
                    <div>
                      <h3 className="organization-result-title">
                        {result.valid ? 'Certificate is Valid' : 'Certificate is Invalid'}
                      </h3>
                      <p style={{ margin: '5px 0 0 0', color: '#6b7280' }}>{result.message}</p>
                    </div>
                  </div>

                  {result.certificate && (
                    <div className="organization-result-details">
                      <div className="organization-result-row">
                        <span className="organization-result-label">Certificate ID:</span>
                        <span className="organization-result-value">{result.certificate.certificateId}</span>
                      </div>
                      <div className="organization-result-row">
                        <span className="organization-result-label">Certificate Type:</span>
                        <span className="organization-result-value">{result.certificate.certificateType}</span>
                      </div>
                      <div className="organization-result-row">
                        <span className="organization-result-label">Student Name:</span>
                        <span className="organization-result-value">{result.certificate.studentName}</span>
                      </div>
                      <div className="organization-result-row">
                        <span className="organization-result-label">Student Email:</span>
                        <span className="organization-result-value">{result.certificate.studentEmail}</span>
                      </div>
                      <div className="organization-result-row">
                        <span className="organization-result-label">Issued By:</span>
                        <span className="organization-result-value">{result.certificate.institutionName}</span>
                      </div>
                      <div className="organization-result-row">
                        <span className="organization-result-label">Issue Date:</span>
                        <span className="organization-result-value">
                          {new Date(result.certificate.issueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="organization-result-row">
                        <span className="organization-result-label">Status:</span>
                        <span className="organization-result-value">
                          <span className={`institution-badge ${result.certificate.status}`}>
                            {result.certificate.status}
                          </span>
                        </span>
                      </div>
                      <div className="organization-result-row">
                        <span className="organization-result-label">Blockchain Hash:</span>
                        <span className="organization-result-value" style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                          {result.certificate.blockchainHash}
                        </span>
                      </div>
                      <div className="organization-result-row">
                        <span className="organization-result-label">IPFS Hash:</span>
                        <span className="organization-result-value" style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                          {result.certificate.ipfsHash}
                        </span>
                      </div>
                      <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <span className="organization-blockchain-badge">
                          ⛓️ Verified on Blockchain
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="organization-history-section">
              <div className="organization-history-header">
                <h2 className="organization-history-title">📜 Verification History</h2>
              </div>
              {verificationHistory.length === 0 ? (
                <div className="institution-empty-state">
                  <div className="institution-empty-state-icon">📭</div>
                  <p className="institution-empty-state-text">No verification history yet</p>
                </div>
              ) : (
                verificationHistory.map((item, index) => (
                  <div key={index} className="organization-history-item">
                    <div className="organization-history-item-header">
                      <span className="organization-history-cert-id">
                        {item.valid ? '✅' : '❌'} {item.certificateId}
                      </span>
                      <span className="organization-history-timestamp">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </div>
                    {item.studentName && (
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        Student: {item.studentName} | Institution: {item.institutionName}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrganizationDashboardEnhanced;
