import React, { useState } from 'react';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';
import './styles/PythonBasics.css';

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
    <div className="course-completion">
      <div className="completion-card">
        {claimSuccess ? (
          <>
            <div className="completion-icon">✅</div>
            <h2>Reward Claimed!</h2>
            <p>You've successfully claimed 10 B3TR tokens!</p>
            <p className="reward-message">Redirecting you back to courses...</p>
          </>
        ) : (
          <>
            <div className="completion-icon">🎉</div>
            <h2>Congratulations!</h2>
            <p>You've completed the {courseName} course!</p>
            <div className="completion-stats">
              <div className="stat">
                <span className="stat-number">{moduleCount}</span>
                <span className="stat-label">Modules Completed</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Course Progress</span>
              </div>
            </div>
            <p className="reward-message">
              You can now claim your B3TR reward for completing this course!
            </p>

            {claimError && (
              <div style={{
                backgroundColor: '#f8d7da',
                color: '#721c24',
                padding: '12px',
                borderRadius: '5px',
                marginBottom: '15px',
                border: '1px solid #f5c6cb'
              }}>
                ❌ {claimError}
              </div>
            )}

            <button
              className="claim-reward-btn"
              onClick={claimReward}
              disabled={claiming}
              style={{
                opacity: claiming ? 0.7 : 1,
                cursor: claiming ? 'not-allowed' : 'pointer'
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
