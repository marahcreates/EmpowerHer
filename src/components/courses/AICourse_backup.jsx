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
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #4CAF50', paddingBottom: '10px' }}>
        Python Basics: Your First Lesson
      </h1>

      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        lineHeight: '1.6'
      }}>
        <h2 style={{ color: '#4CAF50' }}>Introduction to Python Variables</h2>

        <p>
          <strong>What is a Variable?</strong><br/>
          In Python, a variable is like a container that stores data. You can think of it as a labeled box
          where you can put different types of information.
        </p>

        <h3 style={{ color: '#555', marginTop: '20px' }}>Creating Variables</h3>
        <p>
          To create a variable in Python, you simply give it a name and assign it a value using the equals sign (=).
        </p>

        <div style={{
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          padding: '15px',
          borderRadius: '5px',
          fontFamily: 'monospace',
          marginBottom: '15px'
        }}>
          <code>
            # Creating variables<br/>
            name = "Alice"<br/>
            age = 25<br/>
            height = 5.6<br/>
            is_student = True
          </code>
        </div>

        <h3 style={{ color: '#555', marginTop: '20px' }}>Variable Types</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>String:</strong> Text data, enclosed in quotes (e.g., "Hello")</li>
          <li><strong>Integer:</strong> Whole numbers (e.g., 42)</li>
          <li><strong>Float:</strong> Decimal numbers (e.g., 3.14)</li>
          <li><strong>Boolean:</strong> True or False values</li>
        </ul>

        <h3 style={{ color: '#555', marginTop: '20px' }}>Using Variables</h3>
        <p>Once you've created a variable, you can use it in your code:</p>

        <div style={{
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          padding: '15px',
          borderRadius: '5px',
          fontFamily: 'monospace',
          marginBottom: '15px'
        }}>
          <code>
            greeting = "Hello"<br/>
            name = "Bob"<br/>
            print(greeting + ", " + name + "!")<br/>
            <span style={{ color: '#6A9955' }}># Output: Hello, Bob!</span>
          </code>
        </div>

        <h3 style={{ color: '#555', marginTop: '20px' }}>Key Points to Remember</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li>Variable names should be descriptive (e.g., <code>user_age</code> instead of <code>x</code>)</li>
          <li>Variables can be changed - you can assign a new value to an existing variable</li>
          <li>Python is case-sensitive: <code>Name</code> and <code>name</code> are different variables</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: '#fff3cd',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #ffc107',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#856404', marginTop: '0' }}>Quiz Time!</h2>
        <p style={{ fontSize: '16px', marginBottom: '20px' }}>
          Test your understanding of Python variables:
        </p>

        <p style={{ fontWeight: 'bold', marginBottom: '15px' }}>
          Which of the following correctly creates a variable storing the number 100 in Python?
        </p>

        <div style={{ marginBottom: '20px' }}>
          {[
            'var age = 100',
            'int age = 100',
            'age = 100',
            'age := 100'
          ].map((option, index) => (
            <div
              key={index}
              style={{
                margin: '10px 0',
                padding: '12px',
                backgroundColor: selectedAnswer === index ? '#e3f2fd' : 'white',
                border: `2px solid ${selectedAnswer === index ? '#2196F3' : '#ddd'}`,
                borderRadius: '5px',
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
                  style={{ marginRight: '10px' }}
                />
                <code style={{ fontSize: '14px' }}>{option}</code>
              </label>
            </div>
          ))}
        </div>

        {!showFeedback && (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            style={{
              backgroundColor: selectedAnswer === null ? '#ccc' : '#4CAF50',
              color: 'white',
              padding: '12px 30px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: selectedAnswer === null ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            Submit Answer
          </button>
        )}

        {showFeedback && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            borderRadius: '5px',
            backgroundColor: isCorrect ? '#d4edda' : '#f8d7da',
            border: `1px solid ${isCorrect ? '#c3e6cb' : '#f5c6cb'}`,
            color: isCorrect ? '#155724' : '#721c24'
          }}>
            {isCorrect ? (
              <>
                <h3 style={{ marginTop: '0', color: '#155724' }}>🎉 Correct!</h3>
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
