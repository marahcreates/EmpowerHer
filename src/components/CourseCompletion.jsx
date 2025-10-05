import React, { useState } from 'react';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';

const CourseCompletion = ({
  courseName,
  courseId,
  moduleCount,
  walletAddress,
  connex,
  onComplete
}) => {
  const [claiming, setClaiming] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [claimError, setClaimError] = useState('');

  const claimReward = async () => {
    setClaiming(true);
    setClaimError('');

    try {
      if (!connex) {
        throw new Error('Please connect your wallet first');
      }

      // Get the completeCourse method from contract ABI
      const completeCourseMethod = connex.thor.account(CONTRACT_ADDRESS).method(
        CONTRACT_ABI.find(abi => abi.name === 'completeCourse')
      );

      // Create transaction clause
      const clause = completeCourseMethod.asClause(courseId);

      // Sign and send transaction
      const tx = await connex.vendor.sign('tx', [clause])
        .signer(walletAddress)
        .comment('Claiming reward for completing ' + courseId)
        .request();

      console.log('Transaction ID:', tx.txid);

      // Wait a bit for the transaction to be processed
      setTimeout(() => {
        setClaiming(false);
        setClaimSuccess(true);

        // Redirect after showing success message
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 3000);
      }, 3000);
    } catch (error) {
      console.error('Error claiming reward:', error);
      setClaiming(false);
      setClaimError(error.message || 'Failed to claim reward. Please try again.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#191A1F',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        background: '#161315',
        borderRadius: '20px',
        padding: '4rem 3rem',
        textAlign: 'center',
        border: '1px solid rgba(208, 146, 195, 0.2)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
      }}>
        {claimSuccess ? (
          <>
            <div style={{
              fontSize: '5rem',
              marginBottom: '1.5rem'
            }}>✅</div>
            <h2 style={{
              color: 'white',
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>Reward Claimed!</h2>
            <p style={{
              color: '#CFCFCF',
              fontSize: '1.1rem',
              marginBottom: '1rem'
            }}>You've successfully claimed 10 B3TR tokens!</p>
            <p style={{
              color: '#D092C3',
              fontSize: '1rem'
            }}>Redirecting you back to courses...</p>
          </>
        ) : (
          <>
            <div style={{
              fontSize: '5rem',
              marginBottom: '1.5rem'
            }}>🎉</div>
            <h2 style={{
              color: 'white',
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>Congratulations!</h2>
            <p style={{
              color: '#CFCFCF',
              fontSize: '1.1rem',
              marginBottom: '2rem'
            }}>You've completed the {courseName} course!</p>

            <div style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              marginBottom: '2.5rem'
            }}>
              <div style={{
                background: 'rgba(208, 146, 195, 0.1)',
                padding: '1.5rem',
                borderRadius: '12px',
                minWidth: '120px'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#D092C3',
                  marginBottom: '0.5rem'
                }}>{moduleCount}</div>
                <div style={{
                  color: '#CFCFCF',
                  fontSize: '0.9rem'
                }}>Modules Completed</div>
              </div>
              <div style={{
                background: 'rgba(208, 146, 195, 0.1)',
                padding: '1.5rem',
                borderRadius: '12px',
                minWidth: '120px'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#D092C3',
                  marginBottom: '0.5rem'
                }}>100%</div>
                <div style={{
                  color: '#CFCFCF',
                  fontSize: '0.9rem'
                }}>Course Progress</div>
              </div>
            </div>

            <p style={{
              color: '#CFCFCF',
              fontSize: '1rem',
              marginBottom: '2rem'
            }}>
              You can now claim your B3TR reward for completing this course!
            </p>

            {claimError && (
              <div style={{
                backgroundColor: '#f8d7da',
                color: '#721c24',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                border: '1px solid #f5c6cb'
              }}>
                ❌ {claimError}
              </div>
            )}

            <button
              onClick={claimReward}
              disabled={claiming}
              style={{
                background: claiming ? '#888' : '#D092C3',
                color: '#161315',
                border: 'none',
                padding: '1rem 3rem',
                borderRadius: '30px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: claiming ? 'not-allowed' : 'pointer',
                transition: 'background 0.3s',
                opacity: claiming ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!claiming) e.target.style.background = '#b877a8';
              }}
              onMouseLeave={(e) => {
                if (!claiming) e.target.style.background = '#D092C3';
              }}
            >
              {claiming ? (
                <>
                  <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
                  {' '}Claiming Reward...
                </>
              ) : (
                'Claim Your Reward'
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseCompletion;
