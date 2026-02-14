import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import organization_user from './models/Organization/OrganizationUser.js';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB connection failed", error);
    process.exit(1);
  }
};

const testOrg = async () => {
  try {
    await connectDB();

    const orgs = await organization_user.find({});
    console.log('\n=== ALL ORGANIZATIONS ===');
    orgs.forEach(org => {
      console.log(`Email: "${org.email}"`);
      console.log(`Password: "${org.password}"`);
      console.log(`Name: "${org.name}"`);
      console.log('---');
    });

    // Test finding by email
    const testEmail = 'hr@google.com';
    console.log(`\nTesting findOne with email: "${testEmail}"`);
    const found = await organization_user.findOne({ email: testEmail });
    console.log('Found:', found ? 'YES' : 'NO');
    if (found) {
      console.log('Details:', found);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

testOrg();
