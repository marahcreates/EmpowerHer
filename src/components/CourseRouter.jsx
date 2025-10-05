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

const CourseRouter = ({ courseId, connex, account, onComplete, onBack }) => {
  const ComingSoonPlaceholder = ({ title, color }) => (
    <div style={{ padding: '60px 20px', textAlign: 'center', background: '#0f0f0f', minHeight: '80vh' }}>
      <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '20px' }}>🚧</h1>
      <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '20px' }}>{title}</h2>
      <p style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '40px' }}>
        This course is currently being developed. Check back soon!
      </p>
      <button onClick={onBack} style={{
        padding: '15px 30px',
        background: color || '#666',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold'
      }}>← Back to All Courses</button>
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
    <div>
      <button
        onClick={onBack}
        style={{
          margin: '20px',
          padding: '10px 20px',
          background: '#666',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        ← Back to All Courses
      </button>
      <CourseComponent walletAddress={account} onComplete={onComplete} connex={connex} />
    </div>
  );
};

export default CourseRouter;
