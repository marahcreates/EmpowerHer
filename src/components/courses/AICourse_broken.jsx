import { useState } from 'react';
import CourseCompletion from '../CourseCompletion';

const AICourse = ({ connex, walletAddress, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const correctAnswer = 1;

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
        courseName="AI Fundamentals"
        courseId="ai-fundamentals"
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
      <h1 style={{ color: '#333', borderBottom: '2px solid #ff6b6b', paddingBottom: '10px' }}>
        🤖 AI Fundamentals
      </h1>

      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        lineHeight: '1.6'
      }}>
        <h2 style={{ color: '#ff6b6b' }}>What is Artificial Intelligence?</h2>

        <p>
          <strong>Understanding AI</strong><br/>
          Artificial Intelligence (AI) is the simulation of human intelligence in machines that are programmed
          to think and learn like humans. It's transforming industries from healthcare to finance.
        </p>

        <h3 style={{ color: '#555', marginTop: '20px' }}>Types of AI</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>Machine Learning:</strong> Systems that learn from data without explicit programming</li>
          <li><strong>Deep Learning:</strong> Neural networks that mimic the human brain</li>
          <li><strong>Natural Language Processing:</strong> Understanding and generating human language</li>
          <li><strong>Computer Vision:</strong> Enabling computers to understand images and videos</li>
        </ul>

        <h3 style={{ color: '#555', marginTop: '20px' }}>Real-World Applications</h3>
        <div style={{
          backgroundColor: '#fff',
          padding: '15px',
          borderRadius: '5px',
          marginBottom: '15px'
        }}>
          <p>🏥 <strong>Healthcare:</strong> AI helps diagnose diseases and discover new medicines</p>
          <p>🚗 <strong>Transportation:</strong> Self-driving cars use AI to navigate safely</p>
          <p>💬 <strong>Virtual Assistants:</strong> Siri, Alexa, and Google Assistant use AI</p>
          <p>🎬 <strong>Entertainment:</strong> Netflix and Spotify use AI for recommendations</p>
        </div>

        <h3 style={{ color: '#555', marginTop: '20px' }}>Why Women in AI Matter</h3>
        <p>
          Diverse perspectives in AI development lead to more inclusive and fair technology.
          Women bring unique insights that help build AI systems that work for everyone.
        </p>
      </div>

      <div style={{
        backgroundColor: '#fff3cd',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #ffc107',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#856404', marginTop: '0' }}>Quiz Time!</h2>
        <p style={{ fontWeight: 'bold', marginBottom: '15px' }}>
          What is Machine Learning?
        </p>

        <div style={{ marginBottom: '20px' }}>
          {[
            'A type of computer hardware',
            'A system that learns from data without explicit programming',
            'A programming language',
            'A database management tool'
          ].map((option, index) => (
            <div
              key={index}
              style={{
                margin: '10px 0',
                padding: '12px',
                backgroundColor: selectedAnswer === index ? '#e3f2fd' : 'white',
                border: `2px solid ${selectedAnswer === index ? '#2196F3' : '#ddd'}`,
                borderRadius: '5px',
                cursor: 'pointer'
              }}
              onClick={() => !showFeedback && setSelectedAnswer(index)}
            >
              <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
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
              backgroundColor: selectedAnswer === null ? '#ccc' : '#ff6b6b',
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
                <p>Excellent! You understand AI fundamentals.</p>
                <p style={{ fontWeight: 'bold', color: '#155724' }}>
                  Course completed! Click "Continue" to claim your reward.
                </p>
              </>
            ) : (
              <>
                <h3 style={{ marginTop: '0', color: '#721c24' }}>❌ Incorrect</h3>
                <p>Try again!</p>
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

export default AICourse;
