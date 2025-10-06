import React, { useState, useEffect } from 'react';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';
import '../components/styles/MyReferrals.css';

const MyReferrals = ({ account, connex }) => {
  const [referralsReceived, setReferralsReceived] = useState([]);
  const [referralsGiven, setReferralsGiven] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('given'); // 'received' or 'given'
  const [confirming, setConfirming] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [referring, setReferring] = useState(false);

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
      setReferralsGiven([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefer = async (userAddress) => {
    try {
      setReferring(true);

      const referUserMethod = connex.thor.account(CONTRACT_ADDRESS).method(
        CONTRACT_ABI.find(abi => abi.name === 'referUser')
      );

      const clause = referUserMethod.asClause(userAddress);

      const result = await connex.vendor.sign('tx', [clause])
        .signer(account)
        .request();

      alert('Referral submitted successfully! Transaction ID: ' + result.txid);
      await loadReferrals();
    } catch (error) {
      console.error('Error referring user:', error);
      alert('Failed to submit referral: ' + (error.message || 'Unknown error'));
    } finally {
      setReferring(false);
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
        <h2>My Referrals</h2>
        <p>Loading referrals...</p>
      </div>
    );
  }

  return (
    <div className="my-referrals-container">
      <h2>My Referrals</h2>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'given' ? 'active' : ''}`}
          onClick={() => setActiveTab('given')}
        >
          Referrals I Gave ({referralsGiven.length})
        </button>
      </div>

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
                    {referral.profilePicture ? (
                      <img src={referral.profilePicture} alt={`${referral.refereeName}'s profile`} className="referral-avatar-img" />
                    ) : (
                      <div className="referral-avatar">
                        {referral.refereeName.charAt(0)}{referral.refereeFamilyName.charAt(0)}
                      </div>
                    )}
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
                        <span className="status-badge pending">Waiting for Confirmation</span>
                        <button
                          className="refer-btn"
                          onClick={() => handleRefer(referral.referee)}
                          disabled={referring}
                        >
                          {referring ? 'Referring...' : 'Refer This Person'}
                        </button>
                        <p className="help-text">
                          Click to refer {referral.refereeName} for a job opportunity
                        </p>
                      </>
                    ) : !referral.rewardClaimed ? (
                      <>
                        <span className="status-badge confirmed">Confirmed</span>
                        <button
                          className="claim-btn"
                          onClick={() => handleClaimReward(referral.referee)}
                          disabled={claiming}
                        >
                          {claiming ? 'Claiming...' : 'Claim 5 B3TR Reward'}
                        </button>
                      </>
                    ) : (
                      <div className="confirmed-status">
                        <span className="status-badge confirmed">Confirmed</span>
                        <span className="status-badge claimed">Reward Claimed</span>
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
