export const CONTRACT_ADDRESS = '0x1005b10c23c3269eeb5735347347e7b0625da156';

export const CONTRACT_ABI = [
  {
    name: 'addStudent',
    type: 'function',
    inputs: [],
    outputs: [],
    stateMutability: 'payable'
  },
  {
    name: 'students',
    type: 'function',
    inputs: [
      { name: '', type: 'address' }
    ],
    outputs: [
      { name: 'wallet', type: 'address' },
      { name: 'registered', type: 'bool' },
      { name: 'graduated', type: 'bool' },
      { name: 'certificate', type: 'bytes32' }
    ],
    stateMutability: 'view'
  },
  {
    name: 'completeCourse',
    type: 'function',
    inputs: [
      { name: 'courseId', type: 'string' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    name: 'isCourseCompleted',
    type: 'function',
    inputs: [
      { name: 'studentAddress', type: 'address' },
      { name: 'courseId', type: 'string' }
    ],
    outputs: [
      { name: '', type: 'bool' }
    ],
    stateMutability: 'view'
  },
  {
    name: 'updateProfile',
    type: 'function',
    inputs: [
      { name: '_profilePicture', type: 'string' },
      { name: '_bio', type: 'string' },
      { name: '_experience', type: 'string' },
      { name: '_skills', type: 'string' },
      { name: '_lookingForReferral', type: 'bool' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    name: 'deleteAccount',
    type: 'function',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    name: 'getProfile',
    type: 'function',
    inputs: [
      { name: 'userAddress', type: 'address' }
    ],
    outputs: [
      { name: 'profilePicture', type: 'string' },
      { name: 'bio', type: 'string' },
      { name: 'experience', type: 'string' },
      { name: 'skills', type: 'string' },
      { name: 'lookingForReferral', type: 'bool' },
      { name: 'profileCreated', type: 'bool' },
      { name: 'accountDeleted', type: 'bool' }
    ],
    stateMutability: 'view'
  },
  {
    name: 'getCompletedCourses',
    type: 'function',
    inputs: [
      { name: 'studentAddress', type: 'address' }
    ],
    outputs: [
      { name: '', type: 'string[]' }
    ],
    stateMutability: 'view'
  },
  {
    name: 'referUser',
    type: 'function',
    inputs: [
      { name: '_referee', type: 'address' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    name: 'confirmReferral',
    type: 'function',
    inputs: [
      { name: '_referrer', type: 'address' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    name: 'claimReferralReward',
    type: 'function',
    inputs: [
      { name: '_referee', type: 'address' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    name: 'getReferralsReceived',
    type: 'function',
    inputs: [
      { name: 'userAddress', type: 'address' }
    ],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        components: [
          { name: 'referrer', type: 'address' },
          { name: 'referee', type: 'address' },
          { name: 'timestamp', type: 'uint256' },
          { name: 'confirmed', type: 'bool' },
          { name: 'rewardClaimed', type: 'bool' }
        ]
      }
    ],
    stateMutability: 'view'
  },
  {
    name: 'getReferralsGiven',
    type: 'function',
    inputs: [
      { name: 'userAddress', type: 'address' }
    ],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        components: [
          { name: 'referrer', type: 'address' },
          { name: 'referee', type: 'address' },
          { name: 'timestamp', type: 'uint256' },
          { name: 'confirmed', type: 'bool' },
          { name: 'rewardClaimed', type: 'bool' }
        ]
      }
    ],
    stateMutability: 'view'
  }
];
