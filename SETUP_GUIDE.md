# Setup Guide - Getting Your .env Keys

## Current Status
✅ Frontend running: http://localhost:3000
✅ Backend running: http://localhost:3001
⚠️ Missing configuration keys needed for full functionality

---

## How to Get Missing Keys

### 1. VECHAIN_PRIVATE_KEY

This is your VeChain testnet wallet private key used for deploying contracts and signing transactions.

**Option A: Use VeWorld Wallet (Recommended)**
1. Install [VeWorld Browser Extension](https://www.veworld.net/)
2. Create a new wallet or import existing
3. Switch to **VeChain TestNet** in VeWorld settings
4. Export your private key:
   - Click on wallet settings
   - Select "Export Private Key"
   - Enter your password
   - Copy the private key (starts with `0x`)

**Option B: Create New Wallet Programmatically**
```bash
# Run this in your terminal to generate a new wallet
node -e "const { secp256k1 } = require('@vechain/sdk-core'); const pk = secp256k1.generatePrivateKey(); console.log('Private Key:', '0x' + Buffer.from(pk).toString('hex'));"
```

**Get Testnet Tokens:**
1. After getting your private key, derive your address:
   ```bash
   node -e "const { Address, secp256k1, Hex } = require('@vechain/sdk-core'); const pk = Hex.of('YOUR_PRIVATE_KEY_HERE').bytes; const addr = Address.ofPublicKey(secp256k1.derivePublicKey(pk)); console.log('Address:', addr.toString());"
   ```
2. Get free testnet VET from VeChain faucet:
   - Visit: https://faucet.vecha.in/
   - Or: https://testnet.vechain.org/faucet/
   - Enter your address and request tokens

---

### 2. VITE_CONTRACT_ADDRESS

This will be automatically generated when you deploy the contract. You don't have it yet.

**Steps to deploy and get the contract address:**

1. First, update your `.env` with `VECHAIN_PRIVATE_KEY` (from step 1)

2. Run deployment:
   ```bash
   npm run deploy:testnet
   ```

3. The deployment will output something like:
   ```
   Contract address: 0xabcd1234...
   ```

4. Copy that address and update `.env`:
   ```
   VITE_CONTRACT_ADDRESS=0xabcd1234...
   ```

5. The deployment also creates `deployment-info.json` with all details.

---

### 3. MODERATOR_KEY

This is a simple secret key you create yourself for backend API authentication.

**Just make up any secure random string:**

```bash
# Generate a random key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Or just use any secure password like: `my-super-secret-moderator-key-2024`

Update in `.env`:
```
MODERATOR_KEY=your-generated-key-here
```

---

### 4. VEBETTERDAO_APP_ID

This is obtained after registering your app with VeBetterDAO.

**Steps:**

1. First deploy the contract (step 2)

2. Then register with VeBetterDAO:
   ```bash
   npm run register:app
   ```

3. The script will output an APP_ID like:
   ```
   App ID: 0xc11b36c741e4f9f59ac2db24e78258281527780056a451c5fd3c58254875333a
   ```

4. Copy this and update `.env`:
   ```
   VEBETTERDAO_APP_ID=0xc11b36c741e4f9f59ac2db24e78258281527780056a451c5fd3c58254875333a
   ```

5. Finally, update the contract with the APP_ID:
   ```bash
   npm run update:app
   ```

---

## Complete Setup Workflow

Here's the full order to set everything up:

```bash
# 1. Get a VeChain testnet private key (see step 1 above)
# 2. Update .env with VECHAIN_PRIVATE_KEY

# 3. Set a moderator key
MODERATOR_KEY=my-secure-key-123

# 4. Deploy the contract
npm run deploy:testnet

# 5. Copy the contract address to .env
VITE_CONTRACT_ADDRESS=0x...  # from deployment output

# 6. Register with VeBetterDAO
npm run register:app

# 7. Copy the APP_ID to .env
VEBETTERDAO_APP_ID=0x...  # from registration output

# 8. Update contract with APP_ID
npm run update:app

# 9. Restart frontend to pick up new .env values
# (Kill the current dev server and run: npm run dev)
```

---

## Testing Without Full Setup

You can test the frontend UI right now without the contract being deployed:

1. Visit http://localhost:3000
2. You'll see the Learn2Earn interface
3. Connect with VeWorld wallet (testnet mode)
4. The UI will show errors when trying to interact with the contract, but you can see the design

The backend API at http://localhost:3001 is fully functional for storing submissions even without blockchain integration.

---

## Quick Reference - Current .env Template

```env
# VeChain Configuration
VECHAIN_PRIVATE_KEY=0x1234...  # Get from VeWorld or generate new
VITE_CONTRACT_ADDRESS=0xabcd...  # Get after running: npm run deploy:testnet

# Backend Configuration
PORT=3001
MODERATOR_KEY=any-secure-string-you-choose

# VeBetterDAO Configuration (DO NOT MODIFY)
X2EARN_REWARDS_POOL=0x5F8f86B8D0Fa93cdaE20936d150175dF0205fB38
X2EARN_APPS=0xcB23Eb1bBD5c07553795b9538b1061D0f4ABA153
B3TR_TOKEN=0xbf64cf86894Ee0877C4e7d03936e35Ee8D8b864F
VEBETTERDAO_APP_ID=0x...  # Get after running: npm run register:app
```

---

## Need Help?

- VeChain Docs: https://docs.vechain.org/
- VeWorld Wallet: https://www.veworld.net/
- VeBetterDAO: https://vebetterdao.org/
- VeChain Explorer (Testnet): https://explore-testnet.vechain.org/
