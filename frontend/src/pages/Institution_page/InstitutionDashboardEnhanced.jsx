import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PendingRequests from '../../components/institution/PendingRequests';
import IssuedCertificates from '../../components/institution/IssuedCertificates';
import '../../Styles/pages/InstitutionDashboard.css';

const InstitutionDashboardEnhanced = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('dashboard');
  const [stats, setStats] = useState({
    totalIssued: 0,
    pendingRequests: 0,
    approvedCerts: 0,
    revokedCerts: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (!userType || userType !== 'institution') {
      navigate('/');
    }
    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    const institutionId = localStorage.getItem('institutionId');
    const institutionEmail = localStorage.getItem('institutionEmail');
    
    if (!institutionId || !institutionEmail) {
      console.log('Institution ID or email not found in localStorage');
      return;
    }
    
    try {
      const [certsResponse, requestsResponse] = await Promise.all([
        axios.get(`http://localhost:3000/api/certificates/institution-certificates/${institutionId}`),
        axios.get(`http://localhost:3000/api/certificates/institution-requests/${institutionEmail}`)
      ]);

      const certs = certsResponse.data.certificates;
      const requests = requestsResponse.data.requests;

      setStats({
        totalIssued: certs.length,
        pendingRequests: requests.filter(r => r.status === 'pending').length,
        approvedCerts: certs.filter(c => c.status === 'approved').length,
        revokedCerts: certs.filter(c => c.status === 'revoked').length,
      });

      // Recent activity
      const recent = certs.slice(0, 5).map(cert => ({
        type: 'issued',
        title: `Issued ${cert.certificateType}`,
        student: cert.studentName,
        date: cert.issueDate,
        status: cert.status,
      }));
      setRecentActivity(recent);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('institutionToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('institutionEmail');
    localStorage.removeItem('institutionId');
    localStorage.removeItem('institutionName');
    navigate('/');
  };

  return (
    <div className="institution-dashboard">
      <header className="institution-header">
        <h1>🏛️ {localStorage.getItem('institutionName') || 'Institution'} Dashboard</h1>
        <div className="institution-header-actions">
          <span style={{ marginRight: '20px' }}>
            👤 {localStorage.getItem('institutionEmail')}
          </span>
          <button className="institution-btn institution-btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {activeView === 'dashboard' && (
        <>
          <div className="institution-stats-grid">
            <div className="institution-stat-card">
              <div className="institution-stat-header">
                <div className="institution-stat-icon">📜</div>
              </div>
              <div className="institution-stat-value">{stats.totalIssued}</div>
              <div className="institution-stat-label">Total Certificates Issued</div>
              <div className="institution-stat-change positive">
                ↑ 12% from last month
              </div>
            </div>

            <div className="institution-stat-card warning">
              <div className="institution-stat-header">
                <div className="institution-stat-icon">⏳</div>
              </div>
              <div className="institution-stat-value">{stats.pendingRequests}</div>
              <div className="institution-stat-label">Pending Requests</div>
              <div className="institution-stat-change">
                Awaiting action
              </div>
            </div>

            <div className="institution-stat-card success">
              <div className="institution-stat-header">
                <div className="institution-stat-icon">✅</div>
              </div>
              <div className="institution-stat-value">{stats.approvedCerts}</div>
              <div className="institution-stat-label">Approved Certificates</div>
              <div className="institution-stat-change positive">
                ↑ 8% from last month
              </div>
            </div>

            <div className="institution-stat-card error">
              <div className="institution-stat-header">
                <div className="institution-stat-icon">🚫</div>
              </div>
              <div className="institution-stat-value">{stats.revokedCerts}</div>
              <div className="institution-stat-label">Revoked Certificates</div>
              <div className="institution-stat-change">
                Security maintained
              </div>
            </div>
          </div>

          <div className="institution-content">
            <div className="institution-quick-actions">
              <div className="institution-action-card" onClick={() => setActiveView('requests')}>
                <div className="institution-action-icon">📥</div>
                <h3 className="institution-action-title">View Requests</h3>
              </div>
              <div className="institution-action-card secondary" onClick={() => setActiveView('issued')}>
                <div className="institution-action-icon">📋</div>
                <h3 className="institution-action-title">Issued Certificates</h3>
              </div>
              <div className="institution-action-card accent">
                <div className="institution-action-icon">📊</div>
                <h3 className="institution-action-title">Analytics</h3>
              </div>
            </div>

            <div className="institution-section">
              <div className="institution-section-header">
                <h2 className="institution-section-title">Recent Activity</h2>
              </div>
              {recentActivity.length === 0 ? (
                <div className="institution-empty-state">
                  <div className="institution-empty-state-icon">📭</div>
                  <p className="institution-empty-state-text">No recent activity</p>
                </div>
              ) : (
                <table className="institution-table">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Student</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map((activity, index) => (
                      <tr key={index}>
                        <td>{activity.title}</td>
                        <td>{activity.student}</td>
                        <td>{new Date(activity.date).toLocaleDateString()}</td>
                        <td>
                          <span className={`institution-badge ${activity.status}`}>
                            {activity.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="institution-section">
              <div className="institution-section-header">
                <h2 className="institution-section-title">Blockchain Integration Status</h2>
              </div>
              <div style={{ padding: '20px', background: '#f0f9ff', borderRadius: '8px' }}>
                <p style={{ margin: '0 0 10px 0', fontWeight: '600' }}>🔗 Connected to Polygon Network</p>
                <p style={{ margin: '0 0 10px 0', color: '#6b7280' }}>📦 IPFS Storage: Active</p>
                <p style={{ margin: '0', color: '#6b7280' }}>⛓️ Smart Contract: 0x742d...3a8f</p>
              </div>
            </div>
          </div>
        </>
      )}

      {activeView === 'requests' && (
        <div className="institution-content">
          <div style={{ marginBottom: '20px' }}>
            <button className="institution-btn institution-btn-primary" onClick={() => setActiveView('dashboard')}>
              ← Back to Dashboard
            </button>
          </div>
          <PendingRequests />
        </div>
      )}

      {activeView === 'issued' && (
        <div className="institution-content">
          <div style={{ marginBottom: '20px' }}>
            <button className="institution-btn institution-btn-primary" onClick={() => setActiveView('dashboard')}>
              ← Back to Dashboard
            </button>
          </div>
          <IssuedCertificates />
        </div>
      )}
    </div>
  );
};

export default InstitutionDashboardEnhanced;
