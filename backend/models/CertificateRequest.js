import mongoose from "mongoose";

const certificateRequestSchema = new mongoose.Schema(
  {
    studentEmail: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    institutionEmail: {
      type: String,
      required: true,
    },
    certificateType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const CertificateRequest = mongoose.model('CertificateRequest', certificateRequestSchema);

export default CertificateRequest;
