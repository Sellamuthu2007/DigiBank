import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    certificateId: {
      type: String,
      required: true,
      unique: true,
    },
    studentEmail: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Institution_user',
      required: true,
    },
    institutionName: {
      type: String,
      required: true,
    },
    certificateType: {
      type: String,
      required: true,
    },
    issueDate: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
    },
    ipfsHash: {
      type: String,
      default: '',
    },
    blockchainHash: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'revoked'],
      default: 'pending',
    },
    studentApproved: {
      type: Boolean,
      default: false,
    },
    qrCode: {
      type: String,
      default: '',
    },
    sharedWith: [{
      organizationId: String,
      organizationName: String,
      sharedAt: Date,
    }],
  },
  { timestamps: true }
);

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;
