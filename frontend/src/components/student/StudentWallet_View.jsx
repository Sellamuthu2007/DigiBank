import React from "react";
import "../../Styles/Student_page_css/StudentWallet_View.css";

const StudentWallet_View = () => {
  const certificates = [
    {
      id: 1,
      title: "B.Tech in Computer Science",
      issuer: "Anna University",
      issueYear: 2024,
      status: "Verified",
    },
    {
      id: 2,
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      issueYear: 2023,
      status: "Expired",
    },
    {
      id: 3,
      title: "React Developer Skill",
      issuer: "SkillBridge",
      issueYear: 2025,
      status: "Revoked",
    },
  ];

  return (
    <div className="student-wallet-view">
      <h2>Student Wallet View</h2>
      <p>
        This is where the student can view their wallet and manage their
        certificates.
      </p>

      <div className="wallet-section">
        <table className="certificate-table">
          <thead>
            <tr>
              <th>Certificate Name</th>
              <th>Issuer</th>
              <th>Issue Year</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {certificates.map((certificate) => (
              <tr key={certificate.id}>
                <td>{certificate.title}</td>
                <td>{certificate.issuer}</td>
                <td>{certificate.issueYear}</td>
                <td>{certificate.status}</td>
                <td className="actions">
                  <div className="drop-down">
                    <button className="dropdown-button">Actions</button>

                    <div className="dropdown-content">
                      <button className="btn btn-primary">View</button>
                      <button className="btn btn-success">Share</button>
                      <button className="btn btn-danger">Revoke</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentWallet_View;
