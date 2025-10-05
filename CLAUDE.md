# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Learn2Earn is an educational rewards platform built on VeChain that integrates with VeBetterDAO's X2Earn rewards system. Students pay 1 VET to register, submit learning proofs, and receive B3TR token rewards upon moderator approval.

## Architecture

### Three-Tier Architecture

1. **Smart Contract Layer** ([contracts/Learn2Earn.sol](contracts/Learn2Earn.sol))
   - Handles student registration (1 VET fee), proof submission, and graduation certificates
   - Integrates with VeBetterDAO's X2EarnRewardsPool to distribute B3TR token rewards
   - Uses `gradeSubmission()` function to approve submissions and trigger reward distribution
   - Registrar (contract deployer) has exclusive rights to grade submissions and issue certificates

2. **Backend Service** ([backend/](backend/))
   - Express.js server with SQLite database for submission management
   - Acts as the registrar by calling smart contract functions via VeChain SDK
   - API endpoints for submission CRUD, moderator approval, and reward claiming
   - Moderator authentication using `x-moderator-key` header

3. **Frontend** ([src/](src/))
   - React + Vite application using VeChain Kit for wallet integration
   - Component-based flow: WalletConnection → StudentRegistration → ProofSubmission → ClaimReward
   - Checks both backend API and smart contract state to determine user status

### Critical Flow: Reward Distribution

The reward claiming process requires coordination between all layers:
1. Student submits proof through frontend → Backend stores in SQLite
2. Moderator approves via API endpoint → Backend updates database
3. Student clicks "Claim Reward" → Backend calls `gradeSubmission(address, true)` on smart contract as registrar
4. Smart contract verifies approval state and calls VeBetterDAO's `distributeReward()` to transfer B3TR tokens
5. Backend records transaction hash and updates claimed status

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

### Contract Configuration
- [src/config/contract.js](src/config/contract.js): Frontend contract address configuration
- [backend/contractService.js](backend/contractService.js): Backend contract interaction using VeChain SDK

## VeChain SDK Integration

### Frontend: VeChain Kit
- Uses `@vechain/vechain-kit` for wallet connection (VeWorld, Sync2, WalletConnect)
- Configured with testnet settings in [src/App.jsx](src/App.jsx)
- Transaction signing handled by VeChainKitProvider

### Backend: VeChain SDK Core & Network
- Uses `@vechain/sdk-network` (ThorClient) to interact with VeChain nodes
- Transaction building with TransactionHandler and manual signing using registrar private key
- Implements transaction polling in `waitForTransaction()` helper (30s timeout)

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

## Important Technical Notes

- Frontend uses Vite with extensive Node.js polyfills (see [vite.config.js](vite.config.js)) for VeChain SDK compatibility
- Hardhat config supports both regular and delegated (sponsored) transactions on testnet
- Backend service acts as the contract registrar for automated reward distribution
- Students cannot directly call `gradeSubmission()` - only the registrar address can execute grading
- The contract prevents double rewards using the `rewarded` mapping flag
