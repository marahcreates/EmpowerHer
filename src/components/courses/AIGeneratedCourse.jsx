import { useState, useEffect } from 'react';
import CourseCompletion from '../CourseCompletion';
import { API_URL } from '../../config/api';

const AIGeneratedCourse = ({ courseId, connex, walletAddress, onComplete, onBack }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
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

  const handleSubmitAnswer = () => {
    const correct = selectedAnswer === course.quiz.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setCourseCompleted(true);
    }
  };

  if (loading) {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⟳</div>
          <p>Loading course...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        flexDirection: 'column'
      }}>
        <p style={{ marginBottom: '1rem' }}>Error: {error}</p>
        <button onClick={onBack} style={{
          padding: '10px 20px',
          background: '#D092C3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>← Back to Courses</button>
      </div>
    );
  }

  if (courseCompleted) {
    return (
      <CourseCompletion
        courseName={course.title}
        courseId={courseId}
        moduleCount={course.sections?.length || 1}
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
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
      color: '#fff'
    }}>
      <button
        onClick={onBack}
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          background: 'rgba(208, 146, 195, 0.2)',
          color: '#D092C3',
          border: '1px solid #D092C3',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}
      >
        ← Back to Courses
      </button>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '10px'
      }}>
        <span style={{ fontSize: '2.5rem' }}>{course.icon}</span>
        <h1 style={{ color: '#fff', margin: 0 }}>{course.title}</h1>
      </div>

      <p style={{ color: '#CFCFCF', fontSize: '1.1rem', marginBottom: '30px' }}>
        {course.description}
      </p>

      {/* Course Sections */}
      {course.sections?.map((section, index) => (
        <div
          key={index}
          style={{
            backgroundColor: '#161315',
            padding: '25px',
            borderRadius: '12px',
            marginBottom: '20px',
            border: '1px solid rgba(208, 146, 195, 0.2)',
            lineHeight: '1.6'
          }}
        >
          <h2 style={{ color: '#D092C3', marginBottom: '15px' }}>{section.heading}</h2>
          <div
            style={{ color: '#CFCFCF', whiteSpace: 'pre-wrap' }}
            dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br/>') }}
          />
        </div>
      ))}

      {/* Quiz Section */}
      {course.quiz && (
        <div style={{
          backgroundColor: 'rgba(208, 146, 195, 0.1)',
          padding: '25px',
          borderRadius: '12px',
          border: '1px solid rgba(208, 146, 195, 0.3)',
          marginTop: '30px'
        }}>
          <h2 style={{ color: '#D092C3', marginTop: 0 }}>Quiz Time!</h2>
          <p style={{ fontWeight: 'bold', marginBottom: '20px', color: '#fff' }}>
            {course.quiz.question}
          </p>

          <div style={{ marginBottom: '20px' }}>
            {course.quiz.options?.map((option, index) => (
              <div
                key={index}
                style={{
                  margin: '10px 0',
                  padding: '12px',
                  backgroundColor: selectedAnswer === index ? 'rgba(208, 146, 195, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: `2px solid ${selectedAnswer === index ? '#D092C3' : 'rgba(208, 146, 195, 0.2)'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onClick={() => !showFeedback && setSelectedAnswer(index)}
              >
                <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#fff' }}>
                  <input
                    type="radio"
                    checked={selectedAnswer === index}
                    readOnly
                    style={{ marginRight: '10px' }}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>

          {!showFeedback && (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              style={{
                backgroundColor: selectedAnswer === null ? '#555' : '#D092C3',
                color: 'white',
                padding: '12px 30px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: selectedAnswer === null ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                opacity: selectedAnswer === null ? 0.5 : 1
              }}
            >
              Submit Answer
            </button>
          )}

          {showFeedback && (
            <div style={{
              marginTop: '20px',
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: isCorrect ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
              border: `1px solid ${isCorrect ? '#4CAF50' : '#f44336'}`,
              color: isCorrect ? '#4CAF50' : '#f44336'
            }}>
              {isCorrect ? (
                <>
                  <h3 style={{ marginTop: '0', color: '#4CAF50' }}>🎉 Correct!</h3>
                  <p style={{ color: '#CFCFCF' }}>Excellent! You've completed the course.</p>
                  <p style={{ fontWeight: 'bold', color: '#4CAF50' }}>
                    Click "Continue" to claim your reward.
                  </p>
                </>
              ) : (
                <>
                  <h3 style={{ marginTop: '0', color: '#f44336' }}>❌ Incorrect</h3>
                  <p style={{ color: '#CFCFCF' }}>Try again!</p>
                  <button
                    onClick={() => {
                      setShowFeedback(false);
                      setSelectedAnswer(null);
                    }}
                    style={{
                      backgroundColor: '#f44336',
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
      )}
    </div>
  );
};

export default AIGeneratedCourse;
