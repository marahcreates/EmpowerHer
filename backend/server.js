import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ThorClient } from '@vechain/sdk-network';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// VeChain connection
const thorClient = ThorClient.fromUrl('https://testnet.vechain.org/');
const CONTRACT_ADDRESS = process.env.VITE_CONTRACT_ADDRESS;

// In-memory cache for registered students (in production, use a database)
const registeredStudents = new Set();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Learn2Earn backend is running',
    timestamp: new Date().toISOString()
  });
});

// Track registered student
app.post('/api/students/register', (req, res) => {
  const { address } = req.body;
  if (address) {
    registeredStudents.add(address.toLowerCase());
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Address required' });
  }
});

// Get all users looking for referrals
app.get('/api/referrals/seeking', async (req, res) => {
  try {
    const usersLookingForReferrals = [];

    // Check each registered student
    for (const studentAddress of registeredStudents) {
      try {
        // Get profile from contract
        const profileData = await thorClient.contracts.executeCall(
          CONTRACT_ADDRESS,
          {
            name: 'getProfile',
            inputs: [{ name: 'userAddress', type: 'address' }],
            outputs: [
              { name: 'profilePicture', type: 'string' },
              { name: 'bio', type: 'string' },
              { name: 'experience', type: 'string' },
              { name: 'skills', type: 'string' },
              { name: 'lookingForReferral', type: 'bool' },
              { name: 'profileCreated', type: 'bool' }
            ]
          },
          [studentAddress]
        );

        const profile = profileData.decoded;

        // If user is looking for referral and has a profile
        if (profile.lookingForReferral && profile.profileCreated) {
          // Get student info
          const studentData = await thorClient.contracts.executeCall(
            CONTRACT_ADDRESS,
            {
              name: 'students',
              inputs: [{ name: '', type: 'address' }],
              outputs: [
                { name: 'wallet', type: 'address' },
                { name: 'name', type: 'string' },
                { name: 'familyName', type: 'string' },
                { name: 'registered', type: 'bool' },
                { name: 'graduated', type: 'bool' },
                { name: 'certificate', type: 'bytes32' }
              ]
            },
            [studentAddress]
          );

          const student = studentData.decoded;

          usersLookingForReferrals.push({
            address: studentAddress,
            name: student.name,
            familyName: student.familyName,
            profilePicture: profile.profilePicture,
            bio: profile.bio,
            experience: profile.experience,
            skills: profile.skills
          });
        }
      } catch (error) {
        console.error(`Error fetching profile for ${studentAddress}:`, error);
      }
    }

    res.json(usersLookingForReferrals);
  } catch (error) {
    console.error('Error fetching users looking for referrals:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});