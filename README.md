# EmpowerHer - Empowering Women in Tech Through Blockchain Education

## 🌐 [Live Demo](https://empower-her-virid.vercel.app/)

[![EmpowerHer Platform](https://img.shields.io/badge/View%20Live%20Demo-EmpowerHer-D092C3?style=for-the-badge&logo=vercel&logoColor=white)](https://empower-her-virid.vercel.app/)

A blockchain-powered educational platform that empowers women in tech through AI-generated interactive coding courses, learn-to-earn rewards, and job referral incentives distributed via VeChain's B3TR tokens. Built on VeChain and integrated with VeBetterDAO's X2Earn rewards system.

## 🌟 Project Overview

**EmpowerHer** addresses the gender gap in technology by providing accessible AI-driven coding education with transparent, immutable reward distribution through blockchain - ensuring fair compensation for learning achievements and job referrals while creating verifiable proof of skills that can be trusted by employers without intermediaries.

### Problem We're Solving

Women remain significantly underrepresented in the technology sector due to:
- Limited access to quality education
- Lack of financial incentives during the learning journey
- Insufficient verifiable credentials that employers trust

### Our Solution

EmpowerHer combines AI-personalized course generation with blockchain-based incentives where students:
- Earn B3TR tokens for completing courses and successful job referrals
- Receive transparent reward distribution through smart contracts
- Build tamper-proof learning credentials that enhance employability in a trustless ecosystem

## ✨ Key Features

### 🤖 AI-Powered Course Generation
- Generate custom coding courses using Google Gemini API
- Interactive modules with real-time code validation
- Progressive difficulty with 5 modules per course
- Personalized learning paths tailored to individual needs

### 🎓 Learn-to-Earn System
- Student registration with 1 VET fee
- Complete interactive coding courses
- Earn B3TR token rewards upon course completion
- Verifiable graduation certificates on-chain

### 💼 Job Referral Network
- Refer other students for job opportunities
- Referred students confirm referrals on-chain
- Earn 5 B3TR tokens per confirmed referral
- Track all referrals given and received

### 🔗 Blockchain Integration
- VeWorld wallet integration via VeChain DApp Kit
- Smart contract-based reward distribution
- Integration with VeBetterDAO's X2EarnRewardsPool
- Transparent transaction tracking with explorer links

## 🏗️ Technology Stack

### Blockchain Layer
- **VeChain Thor Blockchain (Testnet):** Core blockchain infrastructure
- **Solidity Smart Contracts:** Learn2Earn.sol managing registration, rewards, and referrals
- **VeBetterDAO Integration:** X2EarnRewardsPool for B3TR token distribution
- **Hardhat Development Framework:** Contract compilation, testing, and deployment

### Backend Infrastructure
- **Node.js + Express.js:** RESTful API server
- **SQLite Database:** Submission lifecycle tracking
- **VeChain SDK:** Blockchain interaction via @vechain/sdk-network and @vechain/sdk-core
- **Google Gemini API:** AI-powered course generation

### Frontend Application
- **React 18 + Vite:** Modern component-based UI
- **VeChain DApp Kit:** Wallet connection (VeWorld, Sync2, WalletConnect)
- **Tailwind CSS v4:** Utility-first styling
- **Framer Motion:** Smooth animations and transitions

## 🚀 Quick Start

### 1. Installation

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file:

```env
# VeChain Configuration
VECHAIN_PRIVATE_KEY=your_private_key_here
VITE_CONTRACT_ADDRESS=deployed_contract_address

# Backend Configuration
PORT=3001
MODERATOR_KEY=your-secret-moderator-key-here
VITE_API_URL=http://localhost:3001  # For production: https://your-backend-url.com

# AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# VeBetterDAO Configuration (DO NOT MODIFY)
X2EARN_REWARDS_POOL=0x5F8f86B8D0Fa93cdaE20936d150175dF0205fB38
X2EARN_APPS=0xcB23Eb1bBD5c07553795b9538b1061D0f4ABA153
B3TR_TOKEN=0xbf64cf86894Ee0877C4e7d03936e35Ee8D8b864F
VEBETTERDAO_APP_ID=your_registered_app_id
```

### 3. Contract Deployment

```bash
# Compile contracts
npm run compile

# Deploy to VeChain testnet
npm run deploy:testnet

# Register with VeBetterDAO
npm run register:app

# Update app ID in contract
npm run update:app
```

### 4. Start the Application

```bash
# Start backend server
npm run server

# Start frontend (in another terminal)
npm run dev
```

Visit `http://localhost:3000` to access the platform.

## 📖 User Journey

### For Students

1. **Connect Wallet**: Connect VeWorld wallet to the platform
2. **Register**: Pay 1 VET registration fee to become a student
3. **Generate Course**: Use AI to create personalized coding courses
4. **Learn & Practice**: Complete interactive coding modules with real-time validation
5. **Submit Proof**: Submit proof of course completion
6. **Claim Rewards**: Receive B3TR tokens after moderator approval

### For Job Referrals

1. **Browse Candidates**: View other students looking for job referrals
2. **Submit Referral**: Refer a student for a job opportunity
3. **Await Confirmation**: Student confirms your referral on-chain
4. **Claim Reward**: Receive 5 B3TR tokens after confirmation

## 🛠️ Project Structure

```
EmpowerHer/
├── contracts/
│   └── Learn2Earn.sol              # Main smart contract
├── scripts/
│   ├── deploy.js                   # Contract deployment
│   ├── register-app.js             # VeBetterDAO app registration
│   └── update-app-id.js            # Update app configuration
├── src/                            # React frontend
│   ├── components/
│   │   ├── courses/                # Course components
│   │   │   ├── AIInteractiveCourse.jsx
│   │   │   └── [other courses]
│   │   ├── Referrals.jsx           # Job referral interface
│   │   ├── MyReferrals.jsx         # Track user's referrals
│   │   ├── LandingPage.jsx         # Landing page
│   │   └── CourseRouter.jsx        # Course routing logic
│   ├── config/                     # Contract configuration
│   └── App.jsx                     # Main app component
├── backend/                        # Express.js backend
│   ├── server.js                  # Main server with AI endpoints
│   └── contractService.js         # Smart contract integration
└── hardhat.config.cjs             # Hardhat configuration
```

## 🔑 Smart Contract Features

The `Learn2Earn.sol` contract handles:

### Core Functions
- **Student Registration**: `registerStudent()` - 1 VET registration fee
- **Proof Submission**: Backend-managed submission tracking
- **Reward Distribution**: `gradeSubmission()` - Automated B3TR token distribution
- **Graduation**: Certificate issuance for course completion

### Referral System
- **Submit Referral**: `referUser(address)` - Refer another student
- **Confirm Referral**: `confirmReferral(address)` - Confirm received referral
- **Claim Reward**: `claimReferralReward(address)` - Claim 5 B3TR tokens
- **Track Referrals**: `getReferralsGiven()`, `getReferralsReceived()`

## 🤖 AI Course Generation

### How It Works

1. Students enter a course topic (e.g., "Python for Data Science")
2. Backend calls Google Gemini API with structured output schema
3. AI generates 5 progressive modules with:
   - Educational theory with HTML formatting
   - Hands-on coding exercises
   - Starter code with helpful comments
   - Complete solutions
   - Expected outputs
   - Helpful hints
4. Course is cached and accessible via unique course ID
5. Frontend renders interactive coding environment

### API Endpoint

```bash
POST /api/generate-course
Content-Type: application/json

{
  "prompt": "Introduction to React Hooks"
}
```

## 👥 Moderator API

### View All Submissions
```bash
curl http://localhost:3001/api/submissions
```

### Approve a Submission
```bash
curl -X PUT "http://localhost:3001/api/submissions/{WALLET_ADDRESS}/approve" \
  -H "Content-Type: application/json" \
  -H "x-moderator-key: your-secret-moderator-key-here" \
  -d '{"approved": true, "moderatorNotes": "Great work!"}'
```

## 🗺️ Future Roadmap

- **Expanded AI Course Catalog**: Advanced tech skills (data science, blockchain development, cybersecurity)
- **Employer Partnership Program**: Direct job placement with verified credentials
- **Mentor Matching System**: Token-based incentives for mentorship
- **Community Governance**: Course approval and quality standards
- **Global Scaling**: Support hundreds of thousands of women learners worldwide
- **Sustainability Metrics**: Additional alignment with VeBetterDAO goals

## 🔐 VeBetterDAO Integration

EmpowerHer is integrated with VeBetterDAO's X2Earn system:

- **Rewards Pool**: Automatically distributes B3TR tokens
- **App Registration**: Registered as a VeBetterDAO application
- **Sustainability Goals**: Promotes education and gender equality in tech

### Testnet Contract Addresses (DO NOT MODIFY)
- X2EarnRewardsPool: `0x5F8f86B8D0Fa93cdaE20936d150175dF0205fB38`
- X2EarnApps: `0xcB23Eb1bBD5c07553795b9538b1061D0f4ABA153`
- B3TR Token: `0xbf64cf86894Ee0877C4e7d03936e35Ee8D8b864F`

## 💻 Development

### Prerequisites

- Node.js 18+
- VeWorld wallet extension
- VeChain testnet VET and VTHO tokens
- Google Gemini API key

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run server` - Start backend server
- `npm run compile` - Compile smart contracts
- `npm run deploy:testnet` - Deploy to VeChain testnet
- `npm run register:app` - Register with VeBetterDAO
- `npm run update:app` - Update app ID in contract

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ for women in tech, powered by VeChain and AI**
