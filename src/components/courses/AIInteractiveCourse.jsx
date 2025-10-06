import React, { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import { API_URL } from '../../config/api';
import '../styles/PythonBasics.css';
import CourseCompletion from '../CourseCompletion';

const AIInteractiveCourse = ({ courseId, walletAddress, onComplete, connex, onBack }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState(new Set());
  const [showHint, setShowHint] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`${API_URL}/api/generated-course/${courseId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course');
        }
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        background: '#191A1F'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'spin 1s linear infinite' }}>⟳</div>
          <p>Loading course...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        flexDirection: 'column',
        background: '#191A1F'
      }}>
        <p style={{ marginBottom: '1rem' }}>Error: {error || 'Course not found'}</p>
        <button onClick={onBack} className="back-btn">← Back to Courses</button>
      </div>
    );
  }

  const module = course.modules[currentModule];

  const handleSuccess = () => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(currentModule);
    setCompletedModules(newCompleted);
    setShowHint(false);

    // Check if all modules are completed
    if (newCompleted.size === course.modules.length) {
      setCourseCompleted(true);
    }
  };

  const goToNextModule = () => {
    if (currentModule < course.modules.length - 1) {
      setCurrentModule(currentModule + 1);
      setShowHint(false);
    }
  };

  const goToPreviousModule = () => {
    if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
      setShowHint(false);
    }
  };

  if (courseCompleted) {
    return (
      <CourseCompletion
        courseName={course.title}
        courseId={courseId}
        moduleCount={course.modules.length}
        walletAddress={walletAddress}
        connex={connex}
        onComplete={onComplete}
      />
    );
  }

  return (
    <div className="python-course">
      {/* Header with Back Button and Module Navigation */}
      <div className="course-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Courses
        </button>
        <div className="course-title">
          <h1>{course.icon} {course.title}</h1>
          <p>{course.description}</p>
        </div>
        <div className="module-nav">
          {course.modules.map((mod, idx) => (
            <button
              key={mod.id}
              className={`module-nav-item ${
                idx === currentModule ? 'active' : ''
              } ${completedModules.has(idx) ? 'completed' : ''}`}
              onClick={() => setCurrentModule(idx)}
            >
              <span className="module-number">{idx + 1}</span>
              {completedModules.has(idx) && <span className="check-mark">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="course-content">
        {/* Theory Panel */}
        <div className="theory-panel">
          <div className="panel-header">
            <h2>
              <span className="module-badge">Module {module.id}</span>
              {module.title}
            </h2>
          </div>
          <div
            className="theory-content"
            dangerouslySetInnerHTML={{ __html: module.theory }}
          />

          {/* Task Description */}
          <div className="task-section">
            <h3>📝 Your Task:</h3>
            <p>{module.task}</p>
            {showHint && (
              <div className="hint-box">
                <strong>💡 Hint:</strong> {module.hint}
              </div>
            )}
            {!showHint && (
              <button
                className="hint-btn"
                onClick={() => setShowHint(true)}
              >
                Show Hint
              </button>
            )}
          </div>
        </div>

        {/* Code Editor Panel */}
        <div className="editor-panel">
          <div className="panel-header">
            <h3>Code Editor</h3>
          </div>
          <CodeEditor
            starterCode={module.starterCode}
            expectedOutput={module.expectedOutput}
            onSuccess={handleSuccess}
            isCompleted={completedModules.has(currentModule)}
          />
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="course-footer">
        <button
          className="nav-btn prev-btn"
          onClick={goToPreviousModule}
          disabled={currentModule === 0}
        >
          ← Previous
        </button>

        <div className="module-status">
          {completedModules.has(currentModule) ? (
            <span className="status-complete">✓ Module Complete</span>
          ) : (
            <span className="status-incomplete">Complete the exercise to continue</span>
          )}
        </div>

        <button
          className="nav-btn next-btn"
          onClick={goToNextModule}
          disabled={currentModule === course.modules.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default AIInteractiveCourse;
