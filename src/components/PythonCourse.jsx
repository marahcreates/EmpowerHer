import { useState } from 'react';
import CourseCompletion from './CourseCompletion';

const PythonCourse = ({ connex, walletAddress, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const correctAnswer = 2; // Index of the correct answer

  const handleSubmitAnswer = () => {
    const correct = selectedAnswer === correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setCourseCompleted(true);
    }
  };

  if (courseCompleted) {
    return (
      <CourseCompletion
        courseName="Python Basics Quiz"
        courseId="python-quiz"
        moduleCount={1}
        walletAddress={walletAddress}
        connex={connex}
        onComplete={onComplete}
      />
    );
  }

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - 120px)',
      gap: '2rem',
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      {/* Left Side - Content */}
      <div style={{
        flex: '1',
        overflowY: 'auto',
        padding: '2rem',
        backgroundColor: '#161315',
        borderRadius: '16px',
        border: '1px solid rgba(208, 146, 195, 0.2)'
      }}>
        <h1 style={{
          color: 'white',
          fontSize: '2rem',
          marginBottom: '1.5rem',
          fontWeight: '600'
        }}>
          Python Basics: Your First Lesson
        </h1>

        <h2 style={{ color: '#D092C3', fontSize: '1.3rem', marginBottom: '1rem' }}>
          Introduction to Python Variables
        </h2>

        <p style={{ color: '#CFCFCF', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          <strong style={{ color: 'white' }}>What is a Variable?</strong><br/>
          In Python, a variable is like a container that stores data. You can think of it as a labeled box
          where you can put different types of information.
        </p>

        <h3 style={{ color: 'white', fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.8rem' }}>
          Creating Variables
        </h3>
        <p style={{ color: '#CFCFCF', lineHeight: '1.7', marginBottom: '1rem' }}>
          To create a variable in Python, you simply give it a name and assign it a value using the equals sign (=).
        </p>

        <div style={{
          backgroundColor: '#0d0d0d',
          color: '#d4d4d4',
          padding: '1.2rem',
          borderRadius: '8px',
          fontFamily: 'monospace',
          marginBottom: '1.5rem',
          fontSize: '0.9rem',
          border: '1px solid rgba(208, 146, 195, 0.1)'
        }}>
          <code>
            # Creating variables<br/>
            name = "Alice"<br/>
            age = 25<br/>
            height = 5.6<br/>
            is_student = True
          </code>
        </div>

        <h3 style={{ color: 'white', fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.8rem' }}>
          Variable Types
        </h3>
        <ul style={{ lineHeight: '1.8', color: '#CFCFCF', paddingLeft: '1.5rem' }}>
          <li><strong style={{ color: 'white' }}>String:</strong> Text data, enclosed in quotes (e.g., "Hello")</li>
          <li><strong style={{ color: 'white' }}>Integer:</strong> Whole numbers (e.g., 42)</li>
          <li><strong style={{ color: 'white' }}>Float:</strong> Decimal numbers (e.g., 3.14)</li>
          <li><strong style={{ color: 'white' }}>Boolean:</strong> True or False values</li>
        </ul>
      </div>

      {/* Right Side - Quiz */}
      <div style={{
        width: '500px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#161315',
        borderRadius: '16px',
        padding: '2rem',
        border: '1px solid rgba(208, 146, 195, 0.2)'
      }}>
        <h2 style={{ color: '#D092C3', fontSize: '1.5rem', marginTop: '0', marginBottom: '1rem' }}>
          Quiz Time!
        </h2>
        <p style={{ fontSize: '1rem', marginBottom: '1.5rem', color: '#CFCFCF' }}>
          Test your understanding of Python variables:
        </p>

        <p style={{ fontWeight: '600', marginBottom: '1.5rem', color: 'white', fontSize: '1.05rem' }}>
          Which of the following correctly creates a variable storing the number 100 in Python?
        </p>

        <div style={{ marginBottom: '2rem', flex: 1 }}>
          {[
            'var age = 100',
            'int age = 100',
            'age = 100',
            'age := 100'
          ].map((option, index) => (
            <div
              key={index}
              style={{
                margin: '12px 0',
                padding: '1rem 1.2rem',
                backgroundColor: selectedAnswer === index ? 'rgba(208, 146, 195, 0.1)' : 'transparent',
                border: `2px solid ${selectedAnswer === index ? '#D092C3' : 'rgba(208, 146, 195, 0.3)'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onClick={() => !showFeedback && setSelectedAnswer(index)}
            >
              <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  name="answer"
                  checked={selectedAnswer === index}
                  onChange={() => !showFeedback && setSelectedAnswer(index)}
                  disabled={showFeedback}
                  style={{
                    marginRight: '12px',
                    accentColor: '#D092C3',
                    width: '18px',
                    height: '18px'
                  }}
                />
                <code style={{ fontSize: '0.95rem', color: '#CFCFCF' }}>{option}</code>
              </label>
            </div>
          ))}
        </div>

        {!showFeedback && (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            style={{
              backgroundColor: selectedAnswer === null ? '#666' : '#D092C3',
              color: selectedAnswer === null ? '#999' : '#161315',
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: selectedAnswer === null ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              width: '100%',
              transition: 'background 0.3s'
            }}
          >
            Submit Answer
          </button>
        )}

        {showFeedback && (
          <div style={{
            padding: '1.2rem',
            borderRadius: '8px',
            backgroundColor: isCorrect ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
            border: `1px solid ${isCorrect ? '#4CAF50' : '#f44336'}`,
            color: isCorrect ? '#4CAF50' : '#f44336'
          }}>
            {isCorrect ? (
              <>
                <h3 style={{ marginTop: '0', color: '#4CAF50', fontSize: '1.2rem' }}>🎉 Correct!</h3>
                <p>
                  Great job! In Python, you create a variable by simply writing the variable name,
                  followed by an equals sign, and then the value. No type declaration is needed!
                </p>
                <p style={{ fontWeight: 'bold', color: '#155724' }}>
                  Course completed! Click "Continue" to claim your reward.
                </p>
              </>
            ) : (
              <>
                <h3 style={{ marginTop: '0', color: '#721c24' }}>❌ Incorrect</h3>
                <p>
                  Not quite right. In Python, you don't need keywords like 'var' or 'int' to declare variables.
                  Try again!
                </p>
                <button
                  onClick={() => {
                    setShowFeedback(false);
                    setSelectedAnswer(null);
                  }}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '10px'
                  }}
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PythonCourse;
