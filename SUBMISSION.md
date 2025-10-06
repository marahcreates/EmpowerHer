# EmpowerHer - VeChain Global Hackathon Submission

## What are you planning to build?

EmpowerHer is a blockchain-powered educational platform that empowers women in tech through AI-generated interactive coding courses, learn-to-earn rewards, and job referral incentives distributed via VeChain's B3TR tokens.

## Title and Description

**Title:** EmpowerHer - Empowering Women in Tech Through Blockchain-Based Education Rewards

**Description:** EmpowerHer addresses the gender gap in technology by providing accessible AI-driven coding education with transparent, immutable reward distribution through blockchain - ensuring fair compensation for learning achievements and job referrals while creating verifiable proof of skills that can be trusted by employers without intermediaries.

## Project Summary

**Problem Addressed:** Women remain significantly underrepresented in the technology sector due to limited access to quality education, lack of financial incentives during the learning journey, and insufficient verifiable credentials that employers trust.

**Solution:** EmpowerHer combines AI-personalized course generation with blockchain-based incentives where students earn B3TR tokens for completing courses and successful job referrals, while smart contracts ensure transparent reward distribution and create tamper-proof learning credentials that enhance employability in a trustless ecosystem.

**Future Roadmap:**
- Expand AI course catalog to cover advanced tech skills (data science, blockchain development, cybersecurity)
- Implement employer partnership program for direct job placement with verified credentials
- Develop mentor matching system with token-based incentives
- Create community governance for course approval and quality standards
- Scale to support hundreds of thousands of women learners globally
- Integrate additional sustainability metrics aligned with VeBetterDAO goals

## Technology Stack

**Blockchain Layer:**
- **VeChain Thor Blockchain (Testnet):** Core blockchain infrastructure for transparent reward distribution
- **Solidity Smart Contracts:** Learn2Earn.sol contract managing student registration, proof submissions, and graduation certificates
- **VeBetterDAO Integration:** X2EarnRewardsPool for B3TR token distribution, X2EarnApps for platform registration
- **Hardhat Development Framework:** Smart contract compilation, testing, and deployment

**Backend Infrastructure:**
- **Node.js + Express.js:** RESTful API server handling submission management and moderator operations
- **SQLite Database:** Lightweight storage for submission lifecycle tracking (approved/claimed states)
- **VeChain SDK (@vechain/sdk-network, @vechain/sdk-core):** Blockchain interaction, transaction signing, and polling

**Frontend Application:**
- **React 18 + Vite:** Modern component-based UI with fast development server
- **VeChain DApp Kit:** Wallet connection supporting VeWorld, Sync2, and WalletConnect protocols
- **Tailwind CSS v4:** Utility-first styling with PostCSS pipeline
- **Framer Motion:** Smooth animations and transitions for enhanced UX

**AI Integration:**
- **Google Gemini API (@google/genai):** Dynamic course content generation tailored to individual learning paths
- **AI-Powered Interactive Courses:** Real-time code validation, personalized feedback, and adaptive learning modules

**Development & Deployment:**
- **Git Version Control:** Collaborative development workflow
- **Vercel Deployment:** Production hosting with automatic CI/CD pipeline
- **Environment Configuration:** Secure key management via .env for private keys and API credentials
