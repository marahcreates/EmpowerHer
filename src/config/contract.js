export const CONTRACT_ADDRESS = '0xb4e6da56300b24cec34d9a801f1eb91a21c62a3f';

export const CONTRACT_ABI = [
  {
    name: 'addStudent',
    type: 'function',
    inputs: [
      { name: '_name', type: 'string' },
      { name: '_familyName', type: 'string' }
    ],
    outputs: [],
    stateMutability: 'payable'
  },
  {
    name: 'submitProof',
    type: 'function',
    inputs: [
      { name: 'proof', type: 'string' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    name: 'gradeSubmission',
    type: 'function',
    inputs: [
      { name: 'studentAddress', type: 'address' },
      { name: 'approved', type: 'bool' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    name: 'isGraded',
    type: 'function',
    inputs: [
      { name: 'studentAddress', type: 'address' }
    ],
    outputs: [
      { name: '', type: 'bool' }
    ],
    stateMutability: 'view'
  },
  {
    name: 'isRewarded',
    type: 'function',
    inputs: [
      { name: 'studentAddress', type: 'address' }
    ],
    outputs: [
      { name: '', type: 'bool' }
    ],
    stateMutability: 'view'
  },
  {
    name: 'getSubmission',
    type: 'function',
    inputs: [
      { name: 'studentAddress', type: 'address' }
    ],
    outputs: [
      { name: '', type: 'string' }
    ],
    stateMutability: 'view'
  }
];