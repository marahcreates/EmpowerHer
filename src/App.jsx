import React, { useState, useEffect } from 'react';
import { DAppKitProvider, useConnex, useWallet } from '@vechain/dapp-kit-react';
import LandingPage from './components/LandingPage';
import WalletConnection from './components/WalletConnection';
import StudentRegistration from './components/StudentRegistration';
import LearningPaths from './components/LearningPaths';
import CourseRouter from './components/CourseRouter';
import Profile from './components/Profile';
import Referrals from './components/Referrals';
import MyReferrals from './components/MyReferrals';
import { API_URL } from './config/api';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config/contract';

function AppContent() {
  const [showApp, setShowApp] = useState(false);
  const [account, setAccount] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [completedCourses, setCompletedCourses] = useState({});
  const [currentView, setCurrentView] = useState('courses'); // 'courses', 'profile', 'referrals', 'my-referrals'
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatingCourse, setGeneratingCourse] = useState(false);
  const connex = useConnex();
  const { account: walletAccount, disconnect } = useWallet();

  useEffect(() => {
    // If wallet connects (either auto or manual), check status
    if (walletAccount && connex && !checkingStatus) {
      setAccount(walletAccount);
      if (!showApp) {
        // Auto-connecting at startup
        checkStatusAndShowApp(walletAccount);
      } else {
        // Manual connection from landing page
        checkStatusForConnectedWallet(walletAccount);
      }
    }
  }, [walletAccount, connex]);


  const checkStatusAndShowApp = async (walletAddr) => {
    setCheckingStatus(true);
    try {
      // Check if student is registered
      const studentMethod = connex.thor.account(CONTRACT_ADDRESS).method(
        CONTRACT_ABI.find(abi => abi.name === 'students')
      );
      const studentResult = await studentMethod.call(walletAddr);
      const blockchainRegistered = studentResult.decoded.registered;

      // Check if account was deleted
      const profileMethod = connex.thor.account(CONTRACT_ADDRESS).method(
        CONTRACT_ABI.find(abi => abi.name === 'getProfile')
      );
      const profileResult = await profileMethod.call(walletAddr);
      const accountDeleted = profileResult.decoded.accountDeleted || false;

      // If account was deleted, require verification again
      if (blockchainRegistered && accountDeleted) {
        setIsRegistered(false);
      } else {
        setIsRegistered(blockchainRegistered);
      }

      // Now show the app
      setShowApp(true);
    } catch (error) {
      console.error('Error checking status:', error);
      // Show app anyway on error
      setShowApp(true);
    } finally {
      setCheckingStatus(false);
    }
  };

  const checkStatusForConnectedWallet = async (walletAddr) => {
    setCheckingStatus(true);
    try {
      // Check if student is registered
      const studentMethod = connex.thor.account(CONTRACT_ADDRESS).method(
        CONTRACT_ABI.find(abi => abi.name === 'students')
      );
      const studentResult = await studentMethod.call(walletAddr);
      const blockchainRegistered = studentResult.decoded.registered;

      // Check if account was deleted
      const profileMethod = connex.thor.account(CONTRACT_ADDRESS).method(
        CONTRACT_ABI.find(abi => abi.name === 'getProfile')
      );
      const profileResult = await profileMethod.call(walletAddr);
      const accountDeleted = profileResult.decoded.accountDeleted || false;

      // If account was deleted, require verification again
      if (blockchainRegistered && accountDeleted) {
        setIsRegistered(false);
      } else {
        setIsRegistered(blockchainRegistered);
      }
    } catch (error) {
      console.error('Error checking status:', error);
    } finally {
      setCheckingStatus(false);
    }
  };

  if (!showApp || checkingStatus) {
    return checkingStatus ? (
      <div style={{
        minHeight: '100vh',
        background: '#191A1F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.2rem'
      }}>
        Checking verification status...
      </div>
    ) : (
      <LandingPage onGetStarted={() => setShowApp(true)} />
    );
  }

  const checkStatus = async () => {
    try {
      // Check if student is registered
      const studentMethod = connex.thor.account(CONTRACT_ADDRESS).method(
        CONTRACT_ABI.find(abi => abi.name === 'students')
      );
      const studentResult = await studentMethod.call(account);
      const blockchainRegistered = studentResult.decoded.registered;

      // Check if account was deleted
      const profileMethod = connex.thor.account(CONTRACT_ADDRESS).method(
        CONTRACT_ABI.find(abi => abi.name === 'getProfile')
      );
      const profileResult = await profileMethod.call(account);
      const accountDeleted = profileResult.decoded.accountDeleted || false;

      // If account was deleted, require verification again
      if (blockchainRegistered && accountDeleted) {
        setIsRegistered(false);
      } else {
        setIsRegistered(blockchainRegistered);
      }

      // Check completed courses - all 12 courses
      const courseIds = [
        // Coding track
        'python-basics', 'javascript-intro', 'java-fundamentals', 'cpp-basics', 'data-structures', 'algorithms',
        // Blockchain track
        'blockchain-basics', 'cryptocurrency', 'smart-contracts', 'solidity-basics', 'defi-fundamentals', 'nft-development'
      ];
      const completed = {};

      for (const courseId of courseIds) {
        try {
          const completedMethod = connex.thor.account(CONTRACT_ADDRESS).method(
            CONTRACT_ABI.find(abi => abi.name === 'isCourseCompleted')
          );
          const result = await completedMethod.call(account, courseId);
          completed[courseId] = result.decoded[0];
        } catch (error) {
          completed[courseId] = false;
        }
      }

      setCompletedCourses(completed);
    } catch (error) {
      console.error('Error checking status:', error);
    }
  };

  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
  };

  const handleCourseComplete = (courseId) => {
    setCompletedCourses(prev => ({ ...prev, [courseId]: true }));
    setSelectedCourse(null);
  };

  const handleSelectCourse = (courseId) => {
    if (completedCourses[courseId]) {
      alert('You have already completed this course!');
      return;
    }
    setSelectedCourse(courseId);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
  };

  const handleGenerateCourse = async () => {
    if (!aiPrompt.trim()) return;

    setGeneratingCourse(true);
    try {
      const response = await fetch(`${API_URL}/api/generate-course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: aiPrompt }),
      });

      const data = await response.json();

      if (data.courseId) {
        // Course generated successfully, redirect to it
        setSelectedCourse(data.courseId);
        setAiPrompt('');
      } else {
        alert('Failed to generate course. Please try again.');
      }
    } catch (error) {
      console.error('Error generating course:', error);
      alert('Failed to generate course. Please try again.');
    } finally {
      setGeneratingCourse(false);
    }
  };

  const totalCompleted = Object.values(completedCourses).filter(Boolean).length;

  return (
    <div className="dashboard">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-logo">
            <img src="/logo.png" alt="EmpowerHer" className="logo-icon" />
            <span className="logo-text">EmpowerHer</span>
          </div>

          {isRegistered && (
            <nav className="dashboard-nav">
              <button
                onClick={() => {
                  setCurrentView('courses');
                  setSelectedCourse(null);
                }}
                className={currentView === 'courses' ? 'nav-link active' : 'nav-link'}
              >
                Courses
              </button>
              <button
                onClick={() => {
                  setCurrentView('referrals');
                  setSelectedCourse(null);
                }}
                className={currentView === 'referrals' ? 'nav-link active' : 'nav-link'}
              >
                Referrals
              </button>
            </nav>
          )}

          <div className="dashboard-header-right">
            {!account && <WalletConnection onAccountChange={setAccount} />}
            {account && (
              <div className="profile-menu-wrapper">
                <button
                  className="profile-avatar"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <div className="avatar-circle">
                    {account.substring(2, 4).toUpperCase()}
                  </div>
                </button>
                {showProfileMenu && (
                  <div className="profile-dropdown">
                    <button
                      onClick={() => {
                        setCurrentView('profile');
                        setSelectedCourse(null);
                        setShowProfileMenu(false);
                      }}
                      className="dropdown-item"
                    >
                      Profile
                    </button>
                    <button
                      onClick={async () => {
                        setShowProfileMenu(false);
                        setAccount(null);
                        setIsRegistered(false);
                        setShowApp(false);
                        // Disconnect wallet
                        if (disconnect) {
                          await disconnect();
                        }
                      }}
                      className="dropdown-item"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="dashboard-content">

      {account && (
        <>
          {!isRegistered && (
            <StudentRegistration
              account={account}
              onRegistrationSuccess={handleRegistrationSuccess}
              onRegistrationStatusChange={setIsRegistered}
            />
          )}

          {isRegistered && currentView === 'profile' && !selectedCourse && (
            <Profile account={account} connex={connex} />
          )}

          {isRegistered && currentView === 'courses' && !selectedCourse && (
            <>
              <div className="welcome-section">
                <h1 className="welcome-title">What do you want to learn today?</h1>

                <div className="ai-course-generator">
                  <input
                    type="text"
                    className="ai-input"
                    placeholder="Generate a course on 'Web Development for Beginners'..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !generatingCourse && aiPrompt.trim()) {
                        handleGenerateCourse();
                      }
                    }}
                    disabled={generatingCourse}
                  />
                  <button
                    className="ai-generate-btn"
                    onClick={handleGenerateCourse}
                    disabled={!aiPrompt.trim() || generatingCourse}
                  >
                    {generatingCourse ? (
                      <span className="spinner-icon">⟳</span>
                    ) : (
                      <span className="sparkle-icon">➤</span>
                    )}
                  </button>
                </div>
              </div>
              <LearningPaths
                onSelectCourse={handleSelectCourse}
                completedCourses={completedCourses}
              />
            </>
          )}

          {isRegistered && currentView === 'referrals' && !selectedCourse && (
            <div className="referrals-container">
              <div className="referrals-tabs">
                <button
                  onClick={() => setCurrentView('referrals')}
                  className="referral-tab active"
                >
                  Referrals
                </button>
                <button
                  onClick={() => setCurrentView('my-referrals')}
                  className="referral-tab"
                >
                  Referrals I Gave
                </button>
              </div>
              <Referrals account={account} connex={connex} />
            </div>
          )}

          {isRegistered && currentView === 'my-referrals' && !selectedCourse && (
            <div className="referrals-container">
              <div className="referrals-tabs">
                <button
                  onClick={() => setCurrentView('referrals')}
                  className="referral-tab"
                >
                  Referrals
                </button>
                <button
                  onClick={() => setCurrentView('my-referrals')}
                  className="referral-tab active"
                >
                  Referrals I Gave
                </button>
              </div>
              <MyReferrals account={account} connex={connex} />
            </div>
          )}

          {isRegistered && selectedCourse && (
            <CourseRouter
              courseId={selectedCourse}
              connex={connex}
              account={account}
              onComplete={handleCourseComplete}
              onBack={handleBackToCourses}
            />
          )}
        </>
      )}

      {!account && (
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome!</h1>
          <p className="welcome-subtitle" style={{ color: '#CFCFCF' }}>
            Please connect your wallet to get started
          </p>
        </div>
      )}
      </div>
    </div>
  );
}

function App() {
  return (
    <DAppKitProvider
      nodeUrl="https://testnet.vechain.org/"
      genesis="test"
      usePersistence={true}
      requireCertificate={false}
      logLevel="DEBUG"
    >
      <AppContent />
    </DAppKitProvider>
  );
}

export default App;