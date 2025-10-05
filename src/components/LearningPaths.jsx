import { useState } from 'react';

const LearningPaths = ({ onSelectCourse, completedCourses = {} }) => {
  const learningTracks = [
    {
      trackName: 'Coding',
      trackIcon: '💻',
      trackColor: '#3776ab',
      courses: [
        {
          id: 'python-basics',
          title: 'Python Basics',
          description: 'Variables, loops, and conditions',
          icon: '🐍',
          difficulty: 'Beginner',
          duration: '5 min',
          reward: '10 B3TR'
        },
        {
          id: 'python-data-types',
          title: 'Data Types & Operators',
          description: 'Lists, dictionaries, and operations',
          icon: '📊',
          difficulty: 'Beginner',
          duration: '5 min',
          reward: '10 B3TR'
        },
        {
          id: 'python-functions',
          title: 'Python Functions',
          description: 'Creating reusable code blocks',
          icon: '⚡',
          difficulty: 'Intermediate',
          duration: '5 min',
          reward: '10 B3TR'
        },
        {
          id: 'python-files',
          title: 'File Handling',
          description: 'Reading and writing files',
          icon: '📁',
          difficulty: 'Intermediate',
          duration: '5 min',
          reward: '10 B3TR'
        },
        {
          id: 'python-oop',
          title: 'OOP Basics',
          description: 'Classes and objects in Python',
          icon: '🎯',
          difficulty: 'Intermediate',
          duration: '5 min',
          reward: '10 B3TR'
        }
      ]
    },
    {
      trackName: 'Web Development',
      trackIcon: '🌐',
      trackColor: '#e74c3c',
      courses: [
        {
          id: 'html-basics',
          title: 'HTML Basics',
          description: 'Structure web pages',
          icon: '📄',
          difficulty: 'Beginner',
          duration: '5 min',
          reward: '10 B3TR'
        },
        {
          id: 'css-styling',
          title: 'CSS Styling',
          description: 'Style beautiful websites',
          icon: '🎨',
          difficulty: 'Beginner',
          duration: '5 min',
          reward: '10 B3TR'
        },
        {
          id: 'react-intro',
          title: 'React Intro',
          description: 'Build UI components',
          icon: '⚛️',
          difficulty: 'Intermediate',
          duration: '7 min',
          reward: '10 B3TR'
        },
        {
          id: 'nodejs-backend',
          title: 'Node.js Backend',
          description: 'Server-side JavaScript',
          icon: '🟢',
          difficulty: 'Intermediate',
          duration: '7 min',
          reward: '10 B3TR'
        },
        {
          id: 'rest-apis',
          title: 'REST APIs',
          description: 'Build web services',
          icon: '🔌',
          difficulty: 'Intermediate',
          duration: '8 min',
          reward: '10 B3TR'
        },
        {
          id: 'fullstack-app',
          title: 'Full-Stack App',
          description: 'Complete web application',
          icon: '🚀',
          difficulty: 'Advanced',
          duration: '10 min',
          reward: '10 B3TR'
        }
      ]
    },
    {
      trackName: 'Blockchain',
      trackIcon: '⛓️',
      trackColor: '#9b59b6',
      courses: [
        {
          id: 'solidity-basics',
          title: 'Solidity Basics',
          description: 'Variables, types, and syntax',
          icon: '💎',
          difficulty: 'Beginner',
          duration: '5 min',
          reward: '10 B3TR'
        },
        {
          id: 'solidity-data-types',
          title: 'Data Types & Structs',
          description: 'Arrays, mappings, and structures',
          icon: '📊',
          difficulty: 'Beginner',
          duration: '5 min',
          reward: '10 B3TR'
        },
        {
          id: 'solidity-functions',
          title: 'Functions & Modifiers',
          description: 'Function types and access control',
          icon: '⚡',
          difficulty: 'Intermediate',
          duration: '5 min',
          reward: '10 B3TR'
        },
        {
          id: 'smart-contract-dev',
          title: 'Smart Contract Dev',
          description: 'Events, inheritance, and patterns',
          icon: '🔨',
          difficulty: 'Intermediate',
          duration: '5 min',
          reward: '10 B3TR'
        },
        {
          id: 'defi-tokens',
          title: 'DeFi & Token Standards',
          description: 'ERC20, ERC721, and DeFi basics',
          icon: '🪙',
          difficulty: 'Advanced',
          duration: '5 min',
          reward: '10 B3TR'
        }
      ]
    }
  ];

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      background: '#0f0f0f',
      minHeight: '100vh'
    }}>
      <div style={{
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        <h1 style={{
          color: '#fff',
          fontSize: '2.5rem',
          marginBottom: '10px'
        }}>
          Choose Your Learning Track
        </h1>
        <p style={{
          color: '#aaa',
          fontSize: '1.1rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Empowering women in tech through education. Complete courses and earn B3TR tokens!
        </p>
      </div>

      {learningTracks.map((track) => (
        <div key={track.trackName} style={{
          marginBottom: '50px'
        }}>
          {/* Track Header */}
          <div style={{
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '2rem' }}>{track.trackIcon}</span>
            <h2 style={{
              color: '#fff',
              fontSize: '1.8rem',
              margin: 0,
              fontWeight: 'bold'
            }}>
              {track.trackName}
            </h2>
          </div>

          {/* Horizontal Scrolling Course Cards */}
          <div style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '20px',
            padding: '10px 0 20px 0',
            scrollbarWidth: 'thin',
            scrollbarColor: `${track.trackColor} #333`
          }}>
            {track.courses.map((course) => {
              const isCompleted = completedCourses[course.id];

              return (
                <div
                  key={course.id}
                  onClick={() => onSelectCourse(course.id)}
                  style={{
                    minWidth: '280px',
                    maxWidth: '280px',
                    background: '#1a1a1a',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    cursor: isCompleted ? 'default' : 'pointer',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    border: `2px solid ${track.trackColor}`,
                    opacity: isCompleted ? 0.6 : 1,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (!isCompleted) {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = `0 8px 16px ${track.trackColor}80`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCompleted) {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {isCompleted && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: '#4CAF50',
                      color: 'white',
                      padding: '5px 10px',
                      borderRadius: '15px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      zIndex: 10
                    }}>
                      ✓ DONE
                    </div>
                  )}

                  {/* Course Icon Header */}
                  <div style={{
                    background: track.trackColor,
                    padding: '40px 20px',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      fontSize: '3.5rem',
                      marginBottom: '10px'
                    }}>
                      {course.icon}
                    </div>
                  </div>

                  {/* Course Details */}
                  <div style={{ padding: '20px' }}>
                    <h3 style={{
                      color: '#fff',
                      margin: '0 0 10px 0',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      minHeight: '50px'
                    }}>
                      {course.title}
                    </h3>

                    <p style={{
                      color: '#aaa',
                      fontSize: '0.9rem',
                      marginBottom: '15px',
                      lineHeight: '1.4',
                      minHeight: '40px'
                    }}>
                      {course.description}
                    </p>

                    {/* Course Meta */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '15px',
                      fontSize: '0.8rem',
                      color: '#888'
                    }}>
                      <div>
                        <span style={{
                          background: '#333',
                          padding: '4px 8px',
                          borderRadius: '4px'
                        }}>
                          {course.difficulty}
                        </span>
                      </div>
                      <div>{course.duration}</div>
                    </div>

                    {/* Reward */}
                    <div style={{
                      background: '#2a2a2a',
                      border: `1px solid ${track.trackColor}`,
                      borderRadius: '6px',
                      padding: '8px',
                      textAlign: 'center',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        fontSize: '0.85rem',
                        color: track.trackColor,
                        fontWeight: 'bold'
                      }}>
                        🎁 {course.reward}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      style={{
                        width: '100%',
                        padding: '10px',
                        background: isCompleted ? '#555' : track.trackColor,
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        cursor: isCompleted ? 'default' : 'pointer',
                        transition: 'background 0.3s'
                      }}
                      disabled={isCompleted}
                    >
                      {isCompleted ? 'Completed ✓' : 'Start →'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LearningPaths;
