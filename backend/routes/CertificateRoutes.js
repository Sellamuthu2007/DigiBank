import express from 'express';
import {
  requestCertificate,
  getStudentRequests,
  issueCertificate,
  getInstitutionRequests,
  approveCertificate,
  getStudentCertificates,
  getInstitutionCertificates,
  verifyCertificate,
  shareCertificate,
  revokeCertificate,
  getAllInstitutions,
  rejectRequest,
} from '../controllers/CertificateController.js';

const router = express.Router();

// Student routes
router.post('/request', requestCertificate);
router.get('/student-requests/:email', getStudentRequests);
router.get('/student-certificates/:email', getStudentCertificates);
router.post('/approve', approveCertificate);
router.post('/share', shareCertificate);

// Institution routes
router.post('/issue', issueCertificate);
router.get('/institution-requests/:email', getInstitutionRequests);
router.get('/institution-certificates/:institutionId', getInstitutionCertificates);
router.post('/revoke', revokeCertificate);
router.post('/reject-request', rejectRequest);

// Verification routes
router.get('/verify/:certificateId', verifyCertificate);

// General routes
router.get('/institutions', getAllInstitutions);

export default router;
