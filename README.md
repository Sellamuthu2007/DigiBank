# DigiBank

An UPI like app for transferring Certificate

Certificate Bank is a **blockchain-based certificate storage and verification platform** that allows institutions to issue tamper-proof digital certificates, users to securely own and manage them, and verifiers to instantly validate authenticity — similar to how **UPI works for money, but for certificates**.

---

## 📌 Problem Statement

Educational and professional certificates today are:

- Easy to **forge or manipulate**
- Difficult to **verify instantly**
- Stored in **centralized systems** prone to loss or misuse
- Hard for individuals to **own and control**

There is no unified, secure, and globally verifiable system for digital certificates.

---

## 💡 Solution

**Certificate Bank** provides a **decentralized certificate ecosystem** where:

- Institutions issue verified certificates
- Certificates are stored securely using **IPFS**
- Proofs are recorded immutably on the **blockchain**
- Users fully own and control access to their certificates
- Verifiers can instantly validate authenticity without intermediaries

---

## 🧠 Key Features

### 👤 User (Certificate Holder)

- Secure digital certificate wallet
- View and manage owned certificates
- Share certificates via link / QR code
- Revoke access anytime

### 🏫 Issuer (Institution)

- Institution verification & onboarding
- Issue certificates with dual consent
- Track issued certificates
- Revoke certificates if required

### 🔍 Verifier (Employer / Organization)

- Verify certificates using hash / QR
- Instant blockchain-based validation
- No need to contact issuing institution

### 🔐 Security & Trust

- Certificate hash stored on blockchain
- Actual files stored on IPFS (decentralized)
- Role-based access control
- Tamper-proof & transparent verification

---

## 🏗️ System Architecture

User / Issuer / Verifier
↓
React Frontend
↓
Node.js + Express API
↓
┌───────────────┬────────────────┐
│ Blockchain │ IPFS │
│ (Polygon) │ (Certificates) │
└───────────────┴────────────────┘

---

## 🧰 Tech Stack

### Frontend

- React + Vite
- Tailwind CSS
- React Router
- Context API
- Ethers.js

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Blockchain

- Solidity
- Polygon (Mumbai Testnet)
- Hardhat
- MetaMask

### Storage

- IPFS (Pinata / Web3.Storage)

### Tools & DevOps

- GitHub
- Postman
- Vercel (Frontend)
- Railway / Render (Backend)

---

## 📁 Project Structure

certificate-bank/
│
├── frontend/ # React frontend
├── backend/ # Node.js backend
├── blockchain/ # Smart contracts
├── docs/ # Documentation
├── .env.example
└── README.md

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/certificate-bank.git
cd certificate-bank
2️⃣ Frontend Setup
cd frontend
npm install
npm run dev
3️⃣ Backend Setup
cd backend
npm install
npm run dev
4️⃣ Blockchain Setup
cd blockchain
npm install
npx hardhat compile
npx hardhat test
🔑 Environment Variables
Create .env files using .env.example

MONGO_URI=
JWT_SECRET=
PINATA_API_KEY=
PINATA_SECRET_KEY=
RPC_URL=
PRIVATE_KEY=
🧪 Testing
Smart contracts tested using Hardhat

API tested using Postman

Manual UI testing for flows

🛣️ Future Enhancements
W3C Verifiable Credentials (VC)

DID-based identity

AI-based fraud detection

Multi-language support

Mobile application

Government & enterprise onboarding

👥 Contributors
Name	Role
Sellamuthu	Project Lead
Team Member 2	Frontend
Team Member 3	Backend
Team Member 4	Blockchain
📜 License
This project is licensed under the MIT License.
```
