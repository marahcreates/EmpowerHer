import PythonCourse from './courses/PythonCourse';
import PythonBasics from './courses/PythonBasics';
import PythonDataTypes from './courses/PythonDataTypes';
import PythonFunctions from './courses/PythonFunctions';
import PythonFiles from './courses/PythonFiles';
import PythonOOP from './courses/PythonOOP';
import SolidityBasics from './courses/SolidityBasics';
import SolidityDataTypes from './courses/SolidityDataTypes';
import SolidityFunctions from './courses/SolidityFunctions';
import SmartContractDev from './courses/SmartContractDev';
import DeFiTokens from './courses/DeFiTokens';
import AICourse from './courses/AICourse';
import AIInteractiveCourse from './courses/AIInteractiveCourse';

const CourseRouter = ({ courseId, connex, account, onComplete, onBack }) => {
  // Check if this is an AI-generated course
  if (courseId?.startsWith('ai-')) {
    return (
      <div style={{
        height: 'calc(100vh - 80px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <AIInteractiveCourse
          courseId={courseId}
          walletAddress={account}
          onComplete={onComplete}
          connex={connex}
          onBack={onBack}
        />
      </div>
    );
  }
  const ComingSoonPlaceholder = ({ title, color }) => (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ color: '#fff', fontSize: '4rem', marginBottom: '1.5rem' }}>🚧</h1>
      <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>{title}</h2>
      <p style={{ color: '#CFCFCF', fontSize: '1.1rem', maxWidth: '500px' }}>
        This course is currently being developed. Check back soon!
      </p>
    </div>
  );

  const courses = {
    // Coding Track - Python Only
    'python-basics': PythonBasics,
    'python-data-types': PythonDataTypes,
    'python-functions': PythonFunctions,
    'python-files': PythonFiles,
    'python-oop': PythonOOP,

    // Web Development Track
    'html-basics': () => <ComingSoonPlaceholder title="HTML Basics - Coming Soon" color="#e74c3c" />,
    'css-styling': () => <ComingSoonPlaceholder title="CSS Styling - Coming Soon" color="#e74c3c" />,
    'react-intro': () => <ComingSoonPlaceholder title="React Intro - Coming Soon" color="#e74c3c" />,
    'nodejs-backend': () => <ComingSoonPlaceholder title="Node.js Backend - Coming Soon" color="#e74c3c" />,
    'rest-apis': () => <ComingSoonPlaceholder title="REST APIs - Coming Soon" color="#e74c3c" />,
    'fullstack-app': () => <ComingSoonPlaceholder title="Full-Stack App - Coming Soon" color="#e74c3c" />,

    // Blockchain Track - Solidity Only
    'solidity-basics': SolidityBasics,
    'solidity-data-types': SolidityDataTypes,
    'solidity-functions': SolidityFunctions,
    'smart-contract-dev': SmartContractDev,
    'defi-tokens': DeFiTokens
  };

  const CourseComponent = courses[courseId];

  if (!CourseComponent) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Course not found</h2>
        <button onClick={onBack} style={{
          padding: '10px 20px',
          background: '#666',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}>← Back to Courses</button>
      </div>
    );
  }

  return (
    <div style={{
      height: 'calc(100vh - 80px)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Course Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <CourseComponent walletAddress={account} onComplete={onComplete} connex={connex} onBack={onBack} />
      </div>
    </div>
  );
};

export default CourseRouter;
