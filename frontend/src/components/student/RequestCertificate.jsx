import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Styles/Components.css';

const RequestCertificate = () => {
  const [institutions, setInstitutions] = useState([]);
  const [form, setForm] = useState({
    institutionEmail: '',
    certificateType: '',
    description: '',
  });

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/certificates/institutions');
      setInstitutions(response.data.institutions);
    } catch (error) {
      console.error('Error fetching institutions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentEmail = localStorage.getItem('studentEmail');

    try {
      await axios.post('http://localhost:3000/api/certificates/request', {
        studentEmail,
        ...form,
      });
      alert('Certificate request sent successfully');
      setForm({ institutionEmail: '', certificateType: '', description: '' });
    } catch (error) {
      alert('Failed to send request');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h3>Request Certificate</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Select Institution:</label>
          <select
            value={form.institutionEmail}
            onChange={(e) => setForm({ ...form, institutionEmail: e.target.value })}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="">-- Select Institution --</option>
            {institutions.map((inst) => (
              <option key={inst._id} value={inst.email}>
                {inst.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Certificate Type:</label>
          <input
            type="text"
            value={form.certificateType}
            onChange={(e) => setForm({ ...form, certificateType: e.target.value })}
            placeholder="e.g., Degree, Diploma, Course Completion"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Description:</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Additional details"
            rows="4"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px' }}>
          Send Request
        </button>
      </form>
    </div>
  );
};

export default RequestCertificate;
