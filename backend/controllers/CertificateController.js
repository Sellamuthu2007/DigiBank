import Certificate from '../models/Certificate.js';
import CertificateRequest from '../models/CertificateRequest.js';
import Institution_user from '../models/Institution/InstitutionUser.js';
import user from '../models/student/UserModel.js';

// Generate unique certificate ID
const generateCertificateId = () => {
  return 'CERT-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
};

// Generate mock blockchain hash
const generateBlockchainHash = () => {
  return '0x' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Generate mock IPFS hash
const generateIPFSHash = () => {
  return 'Qm' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Student requests certificate
export const requestCertificate = async (req, res) => {
  const { studentEmail, institutionEmail, certificateType, description } = req.body;

  try {
    const student = await user.findOne({ email: studentEmail });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const institution = await Institution_user.findOne({ email: institutionEmail });
    if (!institution) {
      return res.status(404).json({ message: 'Institution not found' });
    }

    const newRequest = new CertificateRequest({
      studentEmail,
      studentName: student.username,
      institutionEmail,
      certificateType,
      description,
    });

    await newRequest.save();
    res.status(201).json({ message: 'Certificate request sent', request: newRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get student's certificate requests
export const getStudentRequests = async (req, res) => {
  const { email } = req.params;

  try {
    const requests = await CertificateRequest.find({ studentEmail: email });
    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Institution issues certificate
export const issueCertificate = async (req, res) => {
  const { studentEmail, studentName, institutionId, institutionName, certificateType, description } = req.body;

  try {
    const certificateId = generateCertificateId();
    const ipfsHash = generateIPFSHash();
    const blockchainHash = generateBlockchainHash();

    const newCertificate = new Certificate({
      certificateId,
      studentEmail,
      studentName,
      institutionId,
      institutionName,
      certificateType,
      description,
      ipfsHash,
      blockchainHash,
      status: 'pending',
    });

    await newCertificate.save();
    res.status(201).json({ message: 'Certificate issued, awaiting student approval', certificate: newCertificate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get institution's pending requests
export const getInstitutionRequests = async (req, res) => {
  const { email } = req.params;

  try {
    const requests = await CertificateRequest.find({ institutionEmail: email });
    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Student approves certificate (dual consent)
export const approveCertificate = async (req, res) => {
  const { certificateId } = req.body;

  try {
    const certificate = await Certificate.findOne({ certificateId });
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    certificate.studentApproved = true;
    certificate.status = 'approved';
    await certificate.save();

    res.status(200).json({ message: 'Certificate approved', certificate });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get student's certificates
export const getStudentCertificates = async (req, res) => {
  const { email } = req.params;

  try {
    const certificates = await Certificate.find({ studentEmail: email });
    res.status(200).json({ certificates });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get institution's issued certificates
export const getInstitutionCertificates = async (req, res) => {
  const { institutionId } = req.params;

  try {
    const certificates = await Certificate.find({ institutionId });
    res.status(200).json({ certificates });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify certificate
export const verifyCertificate = async (req, res) => {
  const { certificateId } = req.params;

  try {
    const certificate = await Certificate.findOne({ certificateId });
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found', valid: false });
    }

    if (certificate.status === 'revoked') {
      return res.status(200).json({ message: 'Certificate has been revoked', valid: false, certificate });
    }

    if (certificate.status !== 'approved') {
      return res.status(200).json({ message: 'Certificate not yet approved', valid: false, certificate });
    }

    res.status(200).json({ message: 'Certificate is valid', valid: true, certificate });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Share certificate with organization
export const shareCertificate = async (req, res) => {
  const { certificateId, organizationId, organizationName } = req.body;

  try {
    const certificate = await Certificate.findOne({ certificateId });
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    certificate.sharedWith.push({
      organizationId,
      organizationName,
      sharedAt: new Date(),
    });

    await certificate.save();
    res.status(200).json({ message: 'Certificate shared successfully', certificate });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Revoke certificate
export const revokeCertificate = async (req, res) => {
  const { certificateId } = req.body;

  try {
    const certificate = await Certificate.findOne({ certificateId });
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    certificate.status = 'revoked';
    await certificate.save();

    res.status(200).json({ message: 'Certificate revoked', certificate });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all institutions (for student to select)
export const getAllInstitutions = async (req, res) => {
  try {
    const institutions = await Institution_user.find({}, 'name email');
    res.status(200).json({ institutions });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Reject certificate request
export const rejectRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    const request = await CertificateRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = 'rejected';
    await request.save();

    res.status(200).json({ message: 'Request rejected', request });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
