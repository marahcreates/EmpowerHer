import React, { useState, useEffect } from 'react';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';
import '../components/styles/Referrals.css';

const Referrals = ({ account, connex }) => {
  const [usersLookingForReferrals, setUsersLookingForReferrals] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [referring, setReferring] = useState(false);

  useEffect(() => {
    loadUsersLookingForReferrals();
  }, []);

  const loadUsersLookingForReferrals = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/referrals/seeking');
      const users = await response.json();

      // Filter out the current user
      const filteredUsers = users.filter(user => user.address.toLowerCase() !== account.toLowerCase());

      setUsersLookingForReferrals(filteredUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      setUsersLookingForReferrals([]);
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
      setSelectedUser(null);
    } catch (error) {
      console.error('Error referring user:', error);
      alert('Failed to submit referral: ' + (error.message || 'Unknown error'));
    } finally {
      setReferring(false);
    }
  };

  if (loading) {
    return (
      <div className="referrals-container">
        <h2>People Looking for Job Referrals</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (usersLookingForReferrals.length === 0) {
    return (
      <div className="referrals-container">
        <h2>People Looking for Job Referrals</h2>
        <div className="no-users">
          <p>No users are currently looking for job referrals.</p>
          <p>Check back later!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="referrals-container">
      <h2>People Looking for Job Referrals</h2>
      <p className="subtitle">Help connect talented individuals with job opportunities</p>

      {!selectedUser ? (
        <div className="users-grid">
          {usersLookingForReferrals.map((user, index) => (
            <div key={index} className="user-card" onClick={() => setSelectedUser(user)}>
              <div className="user-card-header">
                {user.profilePicture && (
                  <img src={user.profilePicture} alt={`${user.name}'s profile`} className="user-avatar" />
                )}
                {!user.profilePicture && (
                  <div className="user-avatar-placeholder">
                    {user.name.charAt(0)}{user.familyName.charAt(0)}
                  </div>
                )}
              </div>
              <div className="user-card-body">
                <h3>{user.name} {user.familyName}</h3>
                <p className="user-address">{user.address.slice(0, 6)}...{user.address.slice(-4)}</p>
                {user.bio && (
                  <p className="user-bio-preview">
                    {user.bio.length > 100 ? user.bio.substring(0, 100) + '...' : user.bio}
                  </p>
                )}
                {user.skills && (
                  <div className="skills-preview">
                    {user.skills.split(',').slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="skill-tag-small">{skill.trim()}</span>
                    ))}
                    {user.skills.split(',').length > 3 && (
                      <span className="more-skills">+{user.skills.split(',').length - 3} more</span>
                    )}
                  </div>
                )}
                <button className="view-details-btn">View Full Profile</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="user-details-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedUser(null)}>✕</button>

            <div className="user-full-profile">
              <div className="profile-header-section">
                {selectedUser.profilePicture && (
                  <img src={selectedUser.profilePicture} alt={`${selectedUser.name}'s profile`} className="user-avatar-large" />
                )}
                {!selectedUser.profilePicture && (
                  <div className="user-avatar-large-placeholder">
                    {selectedUser.name.charAt(0)}{selectedUser.familyName.charAt(0)}
                  </div>
                )}
                <div className="profile-info">
                  <h2>{selectedUser.name} {selectedUser.familyName}</h2>
                  <p className="address-full">{selectedUser.address}</p>
                </div>
              </div>

              {selectedUser.bio && (
                <div className="detail-section">
                  <h3>About</h3>
                  <p>{selectedUser.bio}</p>
                </div>
              )}

              {selectedUser.experience && (
                <div className="detail-section">
                  <h3>Experience</h3>
                  <p>{selectedUser.experience}</p>
                </div>
              )}

              {selectedUser.skills && (
                <div className="detail-section">
                  <h3>Skills</h3>
                  <div className="skills-full">
                    {selectedUser.skills.split(',').map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill.trim()}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="action-section">
                <button
                  className="refer-btn"
                  onClick={() => handleRefer(selectedUser.address)}
                  disabled={referring}
                >
                  {referring ? 'Submitting Referral...' : 'Refer This Person'}
                </button>
                <p className="refer-note">
                  By clicking refer, you're helping {selectedUser.name} connect with job opportunities.
                  If they confirm your referral, you'll earn 5 B3TR tokens!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Referrals;
