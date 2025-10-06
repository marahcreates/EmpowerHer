# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EmpowerHer is a blockchain-powered educational platform that empowers women in tech through AI-generated interactive coding courses, learn-to-earn rewards, and job referral incentives distributed via VeChain's B3TR tokens. The platform addresses the gender gap in technology by providing accessible AI-driven coding education with transparent, immutable reward distribution through blockchain.

## Architecture

### Three-Tier Architecture

1. **Smart Contract Layer** ([contracts/Learn2Earn.sol](contracts/Learn2Earn.sol))
   - Handles student registration (1 VET fee), course completion verification, and graduation certificates
   - Integrates with VeBetterDAO's X2EarnRewardsPool to distribute B3TR token rewards
   - Manages job referral system with confirmation and reward claiming functionality
   - Uses `gradeSubmission()` function to approve course completions and trigger reward distribution
   - Registrar (contract deployer) has exclusive rights to grade submissions and issue certificates

2. **Backend Service** ([backend/](backend/))
   - Express.js server with SQLite database for submission management
   - Acts as the registrar by calling smart contract functions via VeChain SDK
   - API endpoints for submission CRUD, moderator approval, and reward claiming
   - AI course generation endpoint using Google Gemini API for dynamic, personalized course creation
   - Moderator authentication using `x-moderator-key` header

3. **Frontend** ([src/](src/))
   - React + Vite application using VeChain DApp Kit for wallet integration
   - Component-based flow: WalletConnection → StudentRegistration → AI Course Generation → Interactive Learning → ClaimReward
   - AI-powered course interface with real-time code validation and feedback
   - Job referral system allowing users to refer others and earn B3TR token rewards
   - Checks both backend API and smart contract state to determine user status

### Critical Flows

**Course Completion & Reward Distribution:**
1. Student completes AI-generated interactive course modules through frontend
2. Student submits proof of completion → Backend stores in SQLite
3. Moderator approves via API endpoint → Backend updates database
4. Student clicks "Claim Reward" → Backend calls `gradeSubmission(address, true)` on smart contract as registrar
5. Smart contract verifies approval state and calls VeBetterDAO's `distributeReward()` to transfer B3TR tokens
6. Backend records transaction hash and updates claimed status

**Job Referral System:**
1. User refers another registered student for job opportunity via smart contract
2. Referred student confirms the referral on-chain
3. Referrer claims 5 B3TR token reward after confirmation
4. Smart contract prevents double-claiming and ensures fair reward distribution

## Development Commands

### Setup & Configuration
```bash
npm install                          # Install all dependencies
cp .env.example .env                 # Create environment file (must configure VECHAIN_PRIVATE_KEY)
```

### Smart Contract Development
```bash
npm run compile                      # Compile Solidity contracts with Hardhat
npm run deploy:testnet               # Deploy to VeChain testnet
npm run register:app                 # Register app with VeBetterDAO (run once)
npm run update:app                   # Update VeBetterDAO app ID in contract
```

### Running the Application
```bash
npm run server                       # Start Express backend on port 3001
npm run dev                          # Start Vite frontend on port 3000 (separate terminal)
```

### Building for Production
```bash
npm run build                        # Build frontend for production
npm run preview                      # Preview production build
```

## Key Configuration Files

### Environment Variables (.env)
- `VECHAIN_PRIVATE_KEY`: Registrar's private key (used for contract deployment and grading transactions)
- `MODERATOR_KEY`: Secret key for moderator API authentication
- `VITE_CONTRACT_ADDRESS`: Deployed contract address (update after deployment)
- `VEBETTERDAO_APP_ID`: Obtained after running `npm run register:app`
- `GEMINI_API_KEY`: Google Gemini API key for AI course generation

### Contract Configuration
- [src/config/contract.js](src/config/contract.js): Frontend contract address configuration
- [backend/contractService.js](backend/contractService.js): Backend contract interaction using VeChain SDK

## VeChain SDK Integration

### Frontend: VeChain DApp Kit
- Uses `@vechain/dapp-kit` and `@vechain/dapp-kit-react` for wallet connection (VeWorld, Sync2, WalletConnect)
- Configured with testnet settings in [src/App.jsx](src/App.jsx)
- Transaction signing handled by VeChainKitProvider with Connex integration
- Supports smart contract method calls for registration, referrals, and reward claiming

### Backend: VeChain SDK Core & Network
- Uses `@vechain/sdk-network` (ThorClient) to interact with VeChain nodes
- Transaction building with TransactionHandler and manual signing using registrar private key
- Implements transaction polling in `waitForTransaction()` helper (30s timeout)

## AI Course Generation

### Google Gemini Integration
- Backend endpoint `/api/generate-course` accepts prompts and generates structured course content
- Uses Gemini 2.5 Flash model with structured output schema for consistent course format
- Each AI-generated course includes 5 progressive modules with theory, coding exercises, and solutions
- Courses are cached in-memory and accessible via unique course IDs
- Frontend components render interactive coding environments with real-time validation

## Database Schema

SQLite database ([backend/submissions.db](backend/submissions.db)) tracks submission lifecycle:
- `wallet_address`: Primary key, student's wallet
- `approved`: Boolean flag set by moderator
- `claimed`: Boolean flag set after successful on-chain grading
- `transaction_hash`: VeChain transaction ID from `gradeSubmission()` call

## Deployment Process

1. Configure `.env` with `VECHAIN_PRIVATE_KEY` for testnet account with VET/VTHO
2. Run `npm run compile` to compile contracts
3. Run `npm run deploy:testnet` to deploy (saves details to deployment-info.json)
4. Run `npm run register:app` to register with VeBetterDAO and obtain APP_ID
5. Run `npm run update:app` to update contract with APP_ID
6. Update `VITE_CONTRACT_ADDRESS` in .env with deployed address
7. Ensure contract is added as Reward Distributor in VeBetterDAO admin panel

## VeBetterDAO Integration

Fixed testnet contract addresses (DO NOT MODIFY):
- X2EarnRewardsPool: `0x5F8f86B8D0Fa93cdaE20936d150175dF0205fB38`
- X2EarnApps: `0xcB23Eb1bBD5c07553795b9538b1061D0f4ABA153`
- B3TR Token: `0xbf64cf86894Ee0877C4e7d03936e35Ee8D8b864F`

The contract must be registered via [scripts/register-app.js](scripts/register-app.js) before rewards can be distributed.

## Moderator API Usage

### View All Submissions
```bash
curl http://localhost:3001/api/submissions
```

### Approve/Reject Submission
```bash
curl -X PUT "http://localhost:3001/api/submissions/{WALLET_ADDRESS}/approve" \
  -H "Content-Type: application/json" \
  -H "x-moderator-key: your-secret-key" \
  -d '{"approved": true, "moderatorNotes": "Approved"}'
```

## Job Referral System

### Smart Contract Features
- `referUser(address)`: Allows registered students to refer other registered students
- `confirmReferral(address)`: Referred student confirms the referral from a specific referrer
- `claimReferralReward(address)`: Referrer claims 5 B3TR tokens after confirmation
- `getReferralsReceived(address)`: View all referrals received by a student
- `getReferralsGiven(address)`: View all referrals given by a student

### Frontend Components
- [Referrals.jsx](src/components/Referrals.jsx): Browse users seeking job referrals and submit referrals
- [MyReferrals.jsx](src/components/MyReferrals.jsx): Track referrals given and claim rewards after confirmation

## Important Technical Notes

- Frontend uses Vite with extensive Node.js polyfills (see [vite.config.js](vite.config.js)) for VeChain SDK compatibility
- Hardhat config supports both regular and delegated (sponsored) transactions on testnet
- Backend service acts as the contract registrar for automated reward distribution
- Students cannot directly call `gradeSubmission()` - only the registrar address can execute grading
- The contract prevents double rewards using the `rewarded` mapping flag
- AI-generated courses use unique IDs starting with `ai-` prefix for routing
- Tailwind CSS v4 requires PostCSS configuration in CommonJS format for Vercel deployment
