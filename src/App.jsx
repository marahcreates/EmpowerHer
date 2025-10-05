import React, { useState, useEffect } from 'react';
import { DAppKitProvider, useConnex, useWallet } from '@vechain/dapp-kit-react';
import WalletConnection from './components/WalletConnection';
import StudentRegistration from './components/StudentRegistration';
import LearningPaths from './components/LearningPaths';
import CourseRouter from './components/CourseRouter';
import Profile from './components/Profile';
import Referrals from './components/Referrals';
import MyReferrals from './components/MyReferrals';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config/contract';

function AppContent() {
  const [account, setAccount] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [completedCourses, setCompletedCourses] = useState({});
  const [currentView, setCurrentView] = useState('courses'); // 'courses', 'profile', 'referrals', 'my-referrals'
  const connex = useConnex();

  useEffect(() => {
    if (account && connex) {
      checkStatus();
    }
  }, [account, connex]);

  const checkStatus = async () => {
    try {
      // Check if student is registered
      const studentMethod = connex.thor.account(CONTRACT_ADDRESS).method(
        CONTRACT_ABI.find(abi => abi.name === 'students')
      );
      const studentResult = await studentMethod.call(account);
      setIsRegistered(studentResult.decoded.registered);

      // Check completed courses - all 18 courses
      const courseIds = [
        // Coding track
        'python-basics', 'javascript-intro', 'java-fundamentals', 'cpp-basics', 'data-structures', 'algorithms',
        // Web Development track
        'html-basics', 'css-styling', 'react-intro', 'nodejs-backend', 'rest-apis', 'fullstack-app',
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

  const totalCompleted = Object.values(completedCourses).filter(Boolean).length;

  return (
    <div className="container">
      <header className="header">
        <h1>Learn2Earn</h1>
        <p>Empowering Women in Tech - Learn and Earn B3TR Tokens</p>
        {isRegistered && (
          <div style={{
            marginTop: '10px',
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '20px',
            display: 'inline-block',
            fontSize: '0.9rem'
          }}>
            🏆 Courses Completed: {totalCompleted}/18
          </div>
        )}
      </header>

      <div className="wallet-section">
        <WalletConnection onAccountChange={setAccount} />
      </div>

      {isRegistered && (
        <div className="navigation-tabs" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => {
              setCurrentView('profile');
              setSelectedCourse(null);
            }}
            style={{
              background: currentView === 'profile' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e0e0e0',
              color: currentView === 'profile' ? 'white' : '#2c3e50',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
          >
            👤 Profile
          </button>
          <button
            onClick={() => {
              setCurrentView('courses');
              setSelectedCourse(null);
            }}
            style={{
              background: currentView === 'courses' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e0e0e0',
              color: currentView === 'courses' ? 'white' : '#2c3e50',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
          >
            📚 Courses
          </button>
          <button
            onClick={() => {
              setCurrentView('referrals');
              setSelectedCourse(null);
            }}
            style={{
              background: currentView === 'referrals' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e0e0e0',
              color: currentView === 'referrals' ? 'white' : '#2c3e50',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
          >
            👥 Referrals
          </button>
          <button
            onClick={() => {
              setCurrentView('my-referrals');
              setSelectedCourse(null);
            }}
            style={{
              background: currentView === 'my-referrals' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e0e0e0',
              color: currentView === 'my-referrals' ? 'white' : '#2c3e50',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
          >
            🤝 My Referrals
          </button>
        </div>
      )}

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
            <LearningPaths
              onSelectCourse={handleSelectCourse}
              completedCourses={completedCourses}
            />
          )}

          {isRegistered && currentView === 'referrals' && !selectedCourse && (
            <Referrals account={account} connex={connex} />
          )}

          {isRegistered && currentView === 'my-referrals' && !selectedCourse && (
            <MyReferrals account={account} connex={connex} />
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
        <div className="card">
          <p style={{ textAlign: 'center', color: '#666' }}>
            Please connect your VeWorld wallet to get started
          </p>
        </div>
      )}
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