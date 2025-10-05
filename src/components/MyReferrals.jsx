import React, { useState, useEffect } from 'react';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';
import '../components/styles/MyReferrals.css';

const MyReferrals = ({ account, connex }) => {
  const [referralsReceived, setReferralsReceived] = useState([]);
  const [referralsGiven, setReferralsGiven] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('received'); // 'received' or 'given'
  const [confirming, setConfirming] = useState(false);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    if (account && connex) {
      loadReferrals();
    }
  }, [account, connex]);

  const loadReferrals = async () => {
    try {
      setLoading(true);

      // Load referrals received
      const receivedMethod = connex.thor.account(CONTRACT_ADDRESS).method(
        CONTRACT_ABI.find(abi => abi.name === 'getReferralsReceived')
      );
      const receivedResult = await receivedMethod.call(account);

      const receivedWithDetails = await Promise.all(
        (receivedResult.decoded[0] || []).map(async (ref) => {
          const studentMethod = connex.thor.account(CONTRACT_ADDRESS).method(
            CONTRACT_ABI.find(abi => abi.name === 'students')
          );
          const studentResult = await studentMethod.call(ref.referrer);

          return {
            ...ref,
            referrerName: studentResult.decoded.name,
            referrerFamilyName: studentResult.decoded.familyName
          };
        })
      );

      setReferralsReceived(receivedWithDetails);

      // Load referrals given
      const givenMethod = connex.thor.account(CONTRACT_ADDRESS).method(
        CONTRACT_ABI.find(abi => abi.name === 'getReferralsGiven')
      );
      const givenResult = await givenMethod.call(account);

      const givenWithDetails = await Promise.all(
        (givenResult.decoded[0] || []).map(async (ref) => {
          const studentMethod = connex.thor.account(CONTRACT_ADDRESS).method(
            CONTRACT_ABI.find(abi => abi.name === 'students')
          );
          const studentResult = await studentMethod.call(ref.referee);

          return {
            ...ref,
            refereeName: studentResult.decoded.name,
            refereeFamilyName: studentResult.decoded.familyName
          };
        })
      );

      setReferralsGiven(givenWithDetails);
    } catch (error) {
      console.error('Error loading referrals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReferral = async (referrerAddress) => {
    try {
      setConfirming(true);

      const confirmMethod = connex.thor.account(CONTRACT_ADDRESS).method(
        CONTRACT_ABI.find(abi => abi.name === 'confirmReferral')
      );

      const clause = confirmMethod.asClause(referrerAddress);

      const result = await connex.vendor.sign('tx', [clause])
        .signer(account)
        .request();

      alert('Referral confirmed successfully! Transaction ID: ' + result.txid);
      await loadReferrals();
    } catch (error) {
      console.error('Error confirming referral:', error);
      alert('Failed to confirm referral: ' + (error.message || 'Unknown error'));
    } finally {
      setConfirming(false);
    }
  };

  const handleClaimReward = async (refereeAddress) => {
    try {
      setClaiming(true);

      const claimMethod = connex.thor.account(CONTRACT_ADDRESS).method(
        CONTRACT_ABI.find(abi => abi.name === 'claimReferralReward')
      );

      const clause = claimMethod.asClause(refereeAddress);

      const result = await connex.vendor.sign('tx', [clause])
        .signer(account)
        .request();

      alert('Reward claimed successfully! 5 B3TR tokens sent. Transaction ID: ' + result.txid);
      await loadReferrals();
    } catch (error) {
      console.error('Error claiming reward:', error);
      alert('Failed to claim reward: ' + (error.message || 'Unknown error'));
    } finally {
      setClaiming(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(Number(timestamp) * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="my-referrals-container">
        <h2>🤝 My Referrals</h2>
        <p>Loading referrals...</p>
      </div>
    );
  }

  return (
    <div className="my-referrals-container">
      <h2>🤝 My Referrals</h2>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'received' ? 'active' : ''}`}
          onClick={() => setActiveTab('received')}
        >
          Referrals I Received ({referralsReceived.length})
        </button>
        <button
          className={`tab ${activeTab === 'given' ? 'active' : ''}`}
          onClick={() => setActiveTab('given')}
        >
          Referrals I Gave ({referralsGiven.length})
        </button>
      </div>

      {activeTab === 'received' && (
        <div className="referrals-section">
          {referralsReceived.length === 0 ? (
            <div className="no-referrals">
              <p>You haven't received any referrals yet.</p>
              <p>Make sure your profile is set to "Looking for referrals" to appear in the referrals page!</p>
            </div>
          ) : (
            <div className="referrals-list">
              {referralsReceived.map((referral, index) => (
                <div key={index} className="referral-card">
                  <div className="referral-header">
                    <div className="referral-avatar">
                      {referral.referrerName.charAt(0)}{referral.referrerFamilyName.charAt(0)}
                    </div>
                    <div className="referral-info">
                      <h3>{referral.referrerName} {referral.referrerFamilyName}</h3>
                      <p className="referral-address">
                        {referral.referrer.slice(0, 6)}...{referral.referrer.slice(-4)}
                      </p>
                      <p className="referral-date">{formatDate(referral.timestamp)}</p>
                    </div>
                  </div>

                  <div className="referral-status">
                    {!referral.confirmed ? (
                      <>
                        <span className="status-badge pending">⏳ Pending Confirmation</span>
                        <button
                          className="confirm-btn"
                          onClick={() => handleConfirmReferral(referral.referrer)}
                          disabled={confirming}
                        >
                          {confirming ? 'Confirming...' : '✓ Confirm This Referral'}
                        </button>
                        <p className="help-text">
                          Did {referral.referrerName} actually refer you for a job? Confirm to help them earn rewards!
                        </p>
                      </>
                    ) : (
                      <div className="confirmed-status">
                        <span className="status-badge confirmed">✅ Confirmed</span>
                        {referral.rewardClaimed && (
                          <span className="status-badge claimed">🎁 Reward Claimed</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'given' && (
        <div className="referrals-section">
          {referralsGiven.length === 0 ? (
            <div className="no-referrals">
              <p>You haven't referred anyone yet.</p>
              <p>Visit the Referrals page to help connect people with job opportunities and earn rewards!</p>
            </div>
          ) : (
            <div className="referrals-list">
              {referralsGiven.map((referral, index) => (
                <div key={index} className="referral-card">
                  <div className="referral-header">
                    <div className="referral-avatar">
                      {referral.refereeName.charAt(0)}{referral.refereeFamilyName.charAt(0)}
                    </div>
                    <div className="referral-info">
                      <h3>{referral.refereeName} {referral.refereeFamilyName}</h3>
                      <p className="referral-address">
                        {referral.referee.slice(0, 6)}...{referral.referee.slice(-4)}
                      </p>
                      <p className="referral-date">{formatDate(referral.timestamp)}</p>
                    </div>
                  </div>

                  <div className="referral-status">
                    {!referral.confirmed ? (
                      <>
                        <span className="status-badge pending">⏳ Waiting for Confirmation</span>
                        <p className="help-text">
                          Waiting for {referral.refereeName} to confirm your referral
                        </p>
                      </>
                    ) : !referral.rewardClaimed ? (
                      <>
                        <span className="status-badge confirmed">✅ Confirmed</span>
                        <button
                          className="claim-btn"
                          onClick={() => handleClaimReward(referral.referee)}
                          disabled={claiming}
                        >
                          {claiming ? 'Claiming...' : '🎁 Claim 5 B3TR Reward'}
                        </button>
                      </>
                    ) : (
                      <div className="confirmed-status">
                        <span className="status-badge confirmed">✅ Confirmed</span>
                        <span className="status-badge claimed">🎁 Reward Claimed</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyReferrals;
