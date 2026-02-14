import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import user from './models/student/UserModel.js';
import Institution_user from './models/Institution/InstitutionUser.js';
import organization_user from './models/Organization/OrganizationUser.js';
import Certificate from './models/Certificate.js';
import CertificateRequest from './models/CertificateRequest.js';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB connection failed", error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await user.deleteMany({});
    await Institution_user.deleteMany({});
    await organization_user.deleteMany({});
    await Certificate.deleteMany({});
    await CertificateRequest.deleteMany({});

    console.log('Cleared existing data');

    // Create students
    const students = await user.create([
      {
        username: 'John Doe',
        email: 'john@student.com',
        phone: '1234567890',
        isverified: true,
      },
      {
        username: 'Jane Smith',
        email: 'jane@student.com',
        phone: '1234567891',
        isverified: true,
      },
      {
        username: 'Mike Johnson',
        email: 'mike@student.com',
        phone: '1234567892',
        isverified: true,
      },
      {
        username: 'Sarah Williams',
        email: 'sarah@student.com',
        phone: '1234567893',
        isverified: true,
      },
      {
        username: 'David Brown',
        email: 'david@student.com',
        phone: '1234567894',
        isverified: true,
      },
      {
        username: 'Emily Davis',
        email: 'emily@student.com',
        phone: '1234567895',
        isverified: true,
      },
    ]);

    console.log('Created students');

    // Create institutions
    const institutions = await Institution_user.create([
      {
        name: 'MIT University',
        phone_number: '9876543210',
        email: 'admin@mit.edu',
        password: 'password123',
      },
      {
        name: 'Stanford University',
        phone_number: '9876543211',
        email: 'admin@stanford.edu',
        password: 'password123',
      },
      {
        name: 'Harvard University',
        phone_number: '9876543212',
        email: 'admin@harvard.edu',
        password: 'password123',
      },
    ]);

    console.log('Created institutions');

    // Create organizations
    const organizations = await organization_user.create([
      {
        name: 'Google Inc',
        phone_number: '5551234567',
        email: 'hr@google.com',
        password: 'password123',
      },
      {
        name: 'Microsoft Corp',
        phone_number: '5551234568',
        email: 'hr@microsoft.com',
        password: 'password123',
      },
    ]);

    console.log('Created organizations');

    // Create certificates
    const certificates = await Certificate.create([
      {
        certificateId: 'CERT-1234567890-1001',
        studentEmail: 'john@student.com',
        studentName: 'John Doe',
        institutionId: institutions[0]._id,
        institutionName: 'MIT University',
        certificateType: 'Bachelor of Science in Computer Science',
        description: 'Completed 4-year degree program with honors',
        issueDate: new Date('2023-05-15'),
        ipfsHash: 'QmX7K8bC9vN2pQ3rT5wY6zL4mH8jF1dS9eA3xB7yC6wD5v',
        blockchainHash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
        status: 'approved',
        studentApproved: true,
      },
      {
        certificateId: 'CERT-1234567890-1002',
        studentEmail: 'john@student.com',
        studentName: 'John Doe',
        institutionId: institutions[1]._id,
        institutionName: 'Stanford University',
        certificateType: 'Machine Learning Certification',
        description: 'Advanced ML course completion',
        issueDate: new Date('2024-01-20'),
        ipfsHash: 'QmY8L9cD0wO3qR4sU6xZ7aM5nI9kG2eT0fB4yD8zE7xF6w',
        blockchainHash: '0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a',
        status: 'pending',
        studentApproved: false,
      },
      {
        certificateId: 'CERT-1234567890-1003',
        studentEmail: 'jane@student.com',
        studentName: 'Jane Smith',
        institutionId: institutions[0]._id,
        institutionName: 'MIT University',
        certificateType: 'Master of Business Administration',
        description: 'MBA with specialization in Finance',
        issueDate: new Date('2023-12-10'),
        ipfsHash: 'QmZ9M0dE1xP4rS5tV7yA8bN6oJ0lH3fU1gC5zF9aG8yH7x',
        blockchainHash: '0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b',
        status: 'approved',
        studentApproved: true,
      },
      {
        certificateId: 'CERT-1234567890-1004',
        studentEmail: 'mike@student.com',
        studentName: 'Mike Johnson',
        institutionId: institutions[2]._id,
        institutionName: 'Harvard University',
        certificateType: 'Data Science Bootcamp',
        description: 'Intensive 6-month data science program',
        issueDate: new Date('2024-02-01'),
        ipfsHash: 'QmA0N1eF2yQ5sT6uW8zB9cO7pK1mI4gV2hD6aG0bH9zI8y',
        blockchainHash: '0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c',
        status: 'approved',
        studentApproved: true,
      },
      {
        certificateId: 'CERT-1234567890-1005',
        studentEmail: 'sarah@student.com',
        studentName: 'Sarah Williams',
        institutionId: institutions[0]._id,
        institutionName: 'MIT University',
        certificateType: 'Artificial Intelligence Certificate',
        description: 'AI and Deep Learning specialization',
        issueDate: new Date('2023-11-05'),
        ipfsHash: 'QmB1O2fG3zQ6tS7uX9aC0dP8qL2nJ5hW3iE7bH1cI0zJ9y',
        blockchainHash: '0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d',
        status: 'approved',
        studentApproved: true,
      },
      {
        certificateId: 'CERT-1234567890-1006',
        studentEmail: 'david@student.com',
        studentName: 'David Brown',
        institutionId: institutions[1]._id,
        institutionName: 'Stanford University',
        certificateType: 'Blockchain Development Course',
        description: 'Smart contracts and DApp development',
        issueDate: new Date('2024-01-15'),
        ipfsHash: 'QmC2P3gH4aR7uT8vY0bD1eQ9rM3oK6iX4jF8cI2dJ1aK0z',
        blockchainHash: '0x6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e',
        status: 'approved',
        studentApproved: true,
      },
      {
        certificateId: 'CERT-1234567890-1007',
        studentEmail: 'emily@student.com',
        studentName: 'Emily Davis',
        institutionId: institutions[2]._id,
        institutionName: 'Harvard University',
        certificateType: 'Cybersecurity Fundamentals',
        description: 'Network security and ethical hacking',
        issueDate: new Date('2023-09-20'),
        ipfsHash: 'QmD3Q4hI5bS8vU9wZ1cE2fR0sN4pL7jY5kG9dJ3eK2bL1a',
        blockchainHash: '0x7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f',
        status: 'approved',
        studentApproved: true,
      },
      {
        certificateId: 'CERT-1234567890-1008',
        studentEmail: 'jane@student.com',
        studentName: 'Jane Smith',
        institutionId: institutions[1]._id,
        institutionName: 'Stanford University',
        certificateType: 'Cloud Computing Certification',
        description: 'AWS and Azure cloud architecture',
        issueDate: new Date('2024-02-10'),
        ipfsHash: 'QmE4R5iJ6cT9wV0xA2dF3gS1tO5qM8kZ6lH0eK4fL3cM2b',
        blockchainHash: '0x8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g',
        status: 'pending',
        studentApproved: false,
      },
    ]);

    console.log('Created certificates');

    // Create certificate requests
    const requests = await CertificateRequest.create([
      {
        studentEmail: 'john@student.com',
        studentName: 'John Doe',
        institutionEmail: 'admin@harvard.edu',
        certificateType: 'Python Programming Certificate',
        description: 'Completed Python course in Fall 2023',
        status: 'pending',
      },
      {
        studentEmail: 'jane@student.com',
        studentName: 'Jane Smith',
        institutionEmail: 'admin@stanford.edu',
        certificateType: 'Web Development Bootcamp',
        description: 'Full-stack web development certification',
        status: 'pending',
      },
      {
        studentEmail: 'mike@student.com',
        studentName: 'Mike Johnson',
        institutionEmail: 'admin@mit.edu',
        certificateType: 'Artificial Intelligence Course',
        description: 'AI fundamentals and applications',
        status: 'approved',
      },
    ]);

    console.log('Created certificate requests');

    console.log('\n=== SEED DATA SUMMARY ===');
    console.log(`Students: ${students.length}`);
    console.log(`Institutions: ${institutions.length}`);
    console.log(`Organizations: ${organizations.length}`);
    console.log(`Certificates: ${certificates.length}`);
    console.log(`Certificate Requests: ${requests.length}`);
    
    console.log('\n=== LOGIN CREDENTIALS ===');
    console.log('\nStudents (OTP-based login):');
    students.forEach(s => console.log(`  - ${s.email}`));
    
    console.log('\nInstitutions (email/password):');
    institutions.forEach(i => console.log(`  - ${i.email} / password123`));
    
    console.log('\nOrganizations (email/password):');
    organizations.forEach(o => console.log(`  - ${o.email} / password123`));

    console.log('\n=== SAMPLE CERTIFICATE IDs FOR VERIFICATION ===');
    certificates.forEach(c => console.log(`  - ${c.certificateId} (${c.status})`));

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
