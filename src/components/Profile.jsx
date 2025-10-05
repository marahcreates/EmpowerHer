import React, { useState, useEffect } from 'react';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';
import '../components/styles/Profile.css';

const Profile = ({ account, connex }) => {
  const [profile, setProfile] = useState({
    profilePicture: '',
    bio: '',
    experience: '',
    skills: '',
    lookingForReferral: false,
    profileCreated: false
  });

  const [completedCourses, setCompletedCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (account && connex) {
      loadProfileData();
      loadStudentInfo();
    }
  }, [account, connex]);

  const loadStudentInfo = async () => {
    try {
      const studentMethod = connex.thor.account(CONTRACT_ADDRESS).method(
        CONTRACT_ABI.find(abi => abi.name === 'students')
      );
      const result = await studentMethod.call(account);
      setStudentInfo(result.decoded);
    } catch (error) {
      console.error('Error loading student info:', error);
    }
  };

  const loadProfileData = async () => {
    try {
      setLoading(true);

      // Load profile
      const profileMethod = connex.thor.account(CONTRACT_ADDRESS).method(
        CONTRACT_ABI.find(abi => abi.name === 'getProfile')
      );
      const profileResult = await profileMethod.call(account);

      setProfile({
        profilePicture: profileResult.decoded.profilePicture || '',
        bio: profileResult.decoded.bio || '',
        experience: profileResult.decoded.experience || '',
        skills: profileResult.decoded.skills || '',
        lookingForReferral: profileResult.decoded.lookingForReferral || false,
        profileCreated: profileResult.decoded.profileCreated || false
      });

      // Note: accountDeleted field exists in contract but not needed in component state

      // Load completed courses
      const coursesMethod = connex.thor.account(CONTRACT_ADDRESS).method(
        CONTRACT_ABI.find(abi => abi.name === 'getCompletedCourses')
      );
      const coursesResult = await coursesMethod.call(account);
      setCompletedCourses(coursesResult.decoded[0] || []);

      if (!profileResult.decoded.profileCreated) {
        setIsEditing(true);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateProfileMethod = connex.thor.account(CONTRACT_ADDRESS).method(
        CONTRACT_ABI.find(abi => abi.name === 'updateProfile')
      );

      const clause = updateProfileMethod.asClause(
        profile.profilePicture,
        profile.bio,
        profile.experience,
        profile.skills,
        profile.lookingForReferral
      );

      const result = await connex.vendor.sign('tx', [clause])
        .signer(account)
        .request();

      alert('Profile updated successfully! Transaction ID: ' + result.txid);
      setIsEditing(false);
      await loadProfileData();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);

    try {
      // Call deleteAccount function on smart contract
      const deleteAccountMethod = connex.thor.account(CONTRACT_ADDRESS).method(
        CONTRACT_ABI.find(abi => abi.name === 'deleteAccount')
      );

      const clause = deleteAccountMethod.asClause();

      await connex.vendor.sign('tx', [clause])
        .signer(account)
        .request();

      alert('Account deleted successfully! You will need to verify again next time you connect.');
      setShowDeleteConfirm(false);

      // Log out the user after deletion
      window.location.reload();
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account: ' + (error.message || 'Unknown error'));
    } finally {
      setDeleting(false);
    }
  };

  const courseNameMap = {
    'python-basics': 'Python Basics',
    'javascript-intro': 'JavaScript Introduction',
    'java-fundamentals': 'Java Fundamentals',
    'cpp-basics': 'C++ Basics',
    'data-structures': 'Data Structures',
    'algorithms': 'Algorithms',
    'html-basics': 'HTML Basics',
    'css-styling': 'CSS Styling',
    'react-intro': 'React Introduction',
    'nodejs-backend': 'Node.js Backend',
    'rest-apis': 'REST APIs',
    'fullstack-app': 'Full Stack Application',
    'blockchain-basics': 'Blockchain Basics',
    'cryptocurrency': 'Cryptocurrency',
    'smart-contracts': 'Smart Contracts',
    'solidity-basics': 'Solidity Basics',
    'defi-fundamentals': 'DeFi Fundamentals',
    'nft-development': 'NFT Development'
  };

  if (loading && !profile.profileCreated) {
    return <div className="profile-container">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>My Profile</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="edit-button"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="delete-button"
              >
                Delete Account
              </button>
            </>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#161315',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '500px',
            border: '1px solid rgba(208, 146, 195, 0.2)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
          }}>
            <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.8rem' }}>
              Delete Account?
            </h3>
            <p style={{ color: '#CFCFCF', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              This will clear your profile data. Note that your blockchain registration
              and course completions will remain on-chain and cannot be deleted.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                style={{
                  background: 'rgba(208, 146, 195, 0.2)',
                  color: '#CFCFCF',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                style={{
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '30px',
                  cursor: deleting ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  opacity: deleting ? 0.6 : 1
                }}
              >
                {deleting ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Profile Picture URL</label>
            <input
              type="text"
              name="profilePicture"
              value={profile.profilePicture}
              onChange={handleInputChange}
              placeholder="Enter image URL (e.g., https://... or ipfs://...)"
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              placeholder="Tell us about yourself..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Experience</label>
            <textarea
              name="experience"
              value={profile.experience}
              onChange={handleInputChange}
              placeholder="Your professional experience..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Skills</label>
            <input
              type="text"
              name="skills"
              value={profile.skills}
              onChange={handleInputChange}
              placeholder="e.g., JavaScript, React, Solidity, Python..."
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="lookingForReferral"
                checked={profile.lookingForReferral}
                onChange={handleInputChange}
              />
              <span>I'm looking for job referrals</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button" disabled={loading}>
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
            {profile.profileCreated && (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="profile-view">
          <div className="profile-info-section">
            {profile.profilePicture && (
              <div className="profile-picture">
                <img src={profile.profilePicture} alt="Profile" />
              </div>
            )}

            <div className="profile-details">
              {studentInfo && (
                <div className="student-info">
                  <h3>Verified Member</h3>
                  <p className="wallet-address">{account?.slice(0, 6)}...{account?.slice(-4)}</p>
                </div>
              )}

              {profile.bio && (
                <div className="info-block">
                  <h4>About Me</h4>
                  <p>{profile.bio}</p>
                </div>
              )}

              {profile.experience && (
                <div className="info-block">
                  <h4>Experience</h4>
                  <p>{profile.experience}</p>
                </div>
              )}

              {profile.skills && (
                <div className="info-block">
                  <h4>Skills</h4>
                  <div className="skills-list">
                    {profile.skills.split(',').map((skill, index) => (
                      <span key={index} className="skill-tag">{skill.trim()}</span>
                    ))}
                  </div>
                </div>
              )}

              {profile.lookingForReferral && (
                <div className="referral-badge">
                  Looking for job referrals
                </div>
              )}
            </div>
          </div>

          <div className="completed-courses-section">
            <h3>Completed Courses ({completedCourses.length}/18)</h3>
            {completedCourses.length > 0 ? (
              <div className="courses-grid">
                {completedCourses.map((courseId, index) => (
                  <div key={index} className="course-badge">
                    {courseNameMap[courseId] || courseId}
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-courses">No courses completed yet. Start learning to earn rewards!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
