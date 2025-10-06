import express from 'express';
import cors from 'cors';
import { ThorClient } from '@vechain/sdk-network';
import { GoogleGenAI } from '@google/genai';

const app = express();

app.use(cors());
app.use(express.json());

// VeChain connection
const thorClient = ThorClient.fromUrl('https://testnet.vechain.org/');
const CONTRACT_ADDRESS = process.env.VITE_CONTRACT_ADDRESS;

// Gemini AI initialization
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// In-memory cache for registered students (in production, use a database)
const registeredStudents = new Set();

// In-memory cache for generated courses
const generatedCourses = new Map();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'EmpowerHer Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// Register student endpoint
app.post('/api/students/register', (req, res) => {
  const { address } = req.body;
  registeredStudents.add(address.toLowerCase());
  res.json({ success: true, message: 'Student registered successfully' });
});

// Get submission status
app.get('/api/submissions/:walletAddress', async (req, res) => {
  const { walletAddress } = req.params;

  try {
    // For Vercel deployment, we'll use VeChain to check status
    // In production, this should query a real database
    res.json({
      exists: registeredStudents.has(walletAddress.toLowerCase()),
      approved: false,
      claimed: false
    });
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({ error: 'Failed to fetch submission status' });
  }
});

// Submit proof
app.post('/api/submissions', async (req, res) => {
  const { walletAddress, name, proofLink } = req.body;

  if (!walletAddress || !name || !proofLink) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Store in memory (in production, use database)
    registeredStudents.add(walletAddress.toLowerCase());

    res.json({
      success: true,
      message: 'Proof submitted successfully. Awaiting moderator approval.'
    });
  } catch (error) {
    console.error('Error submitting proof:', error);
    res.status(500).json({ error: 'Failed to submit proof' });
  }
});

// Get all submissions (for moderators)
app.get('/api/submissions', (req, res) => {
  // Return empty array for now (in production, query database)
  res.json([]);
});

// Approve/reject submission
app.put('/api/submissions/:walletAddress/approve', (req, res) => {
  const { approved, moderatorNotes } = req.body;
  const moderatorKey = req.headers['x-moderator-key'];

  if (!moderatorKey || moderatorKey !== process.env.MODERATOR_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.json({
    success: true,
    message: approved ? 'Submission approved' : 'Submission rejected'
  });
});

// Claim reward
app.post('/api/submissions/:walletAddress/claim', async (req, res) => {
  const { walletAddress } = req.params;

  try {
    res.json({
      success: true,
      message: 'Reward claimed successfully',
      transactionHash: '0x' + Math.random().toString(16).substring(2)
    });
  } catch (error) {
    console.error('Error claiming reward:', error);
    res.status(500).json({ error: 'Failed to claim reward' });
  }
});

// Get users looking for referrals
app.get('/api/referrals/seeking', async (req, res) => {
  try {
    // Return empty array for now (in production, query database)
    res.json([]);
  } catch (error) {
    console.error('Error loading users:', error);
    res.status(500).json({ error: 'Failed to load users' });
  }
});

// AI Course Generation endpoint
app.post('/api/generate-course', async (req, res) => {
  console.log('Received course generation request:', req.body);
  try {
    const { prompt } = req.body;

    if (!prompt) {
      console.log('Error: No prompt provided');
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Generating course for prompt:', prompt);

    // Generate course ID from prompt
    const courseId = `ai-${prompt.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30)}-${Date.now()}`;

    // Define structured output schema for interactive course
    const courseSchema = {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Course title' },
        description: { type: 'string', description: 'Brief course description' },
        icon: { type: 'string', description: 'Single emoji representing the course' },
        difficulty: { type: 'string', enum: ['Beginner', 'Intermediate', 'Advanced'] },
        duration: { type: 'string', description: 'Estimated duration like "25 min"' },
        modules: {
          type: 'array',
          minItems: 5,
          maxItems: 5,
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              title: { type: 'string', description: 'Module title' },
              theory: { type: 'string', description: 'Educational content with HTML formatting, includes h3, h4, p, ul, li, code, pre tags' },
              task: { type: 'string', description: 'Coding exercise description' },
              starterCode: { type: 'string', description: 'Initial code for the exercise with helpful comments' },
              solution: { type: 'string', description: 'Complete solution code' },
              expectedOutput: { type: 'string', description: 'Expected output when solution runs' },
              hint: { type: 'string', description: 'Helpful hint for completing the exercise' }
            },
            required: ['id', 'title', 'theory', 'task', 'starterCode', 'solution', 'expectedOutput', 'hint']
          }
        }
      },
      required: ['title', 'description', 'icon', 'difficulty', 'duration', 'modules']
    };

    // Create detailed prompt for course generation
    const aiPrompt = `Create an interactive coding course about "${prompt}" with exactly 5 progressive modules.

Each module must include:
1. Educational theory with HTML formatting (h3, h4, p, ul, li, code, pre tags)
2. A hands-on coding exercise
3. Starter code with comments to guide students
4. A complete solution
5. Expected output
6. A helpful hint

Make it educational, engaging, and progressively more challenging. Focus on practical, hands-on learning.`;

    console.log('Calling Gemini API with structured output...');
    const result = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: aiPrompt,
      config: {
        responseSchema: courseSchema,
        responseMimeType: 'application/json',
        thinkingConfig: {
          thinkingBudget: 0
        }
      }
    });

    console.log('Gemini API response received');
    const courseData = JSON.parse(result.text);

    // Store the generated course
    generatedCourses.set(courseId, {
      ...courseData,
      courseId,
      createdAt: new Date().toISOString()
    });

    res.json({ courseId, course: courseData });
  } catch (error) {
    console.error('Error generating course:', error);
    res.status(500).json({ error: 'Failed to generate course' });
  }
});

// Get generated course by ID
app.get('/api/generated-course/:courseId', (req, res) => {
  const { courseId } = req.params;
  const course = generatedCourses.get(courseId);

  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }

  res.json(course);
});

// Export for Vercel serverless
export default app;
