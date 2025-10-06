import { useState } from 'react';

const LearningPaths = ({ onSelectCourse, completedCourses = {} }) => {
  const learningTracks = [
    {
      trackName: 'Coding',
      trackIcon: '',
      trackColor: '#3776ab',
      courses: [
        {
          id: 'python-basics',
          title: 'Python Basics',
          description: 'Variables, loops, and conditions',
          icon: '💻',
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
          icon: '⚙️',
          difficulty: 'Intermediate',
          duration: '5 min',
          reward: '10 B3TR'
        },
        {
          id: 'python-files',
          title: 'File Handling',
          description: 'Reading and writing files',
          icon: '📄',
          difficulty: 'Intermediate',
          duration: '5 min',
          reward: '10 B3TR'
        },
        {
          id: 'python-oop',
          title: 'OOP Basics',
          description: 'Classes and objects in Python',
          icon: '🏗️',
          difficulty: 'Intermediate',
          duration: '5 min',
          reward: '10 B3TR'
        }
      ]
    },
    {
      trackName: 'Blockchain',
      trackIcon: '',
      trackColor: '#9b59b6',
      courses: [
        {
          id: 'solidity-basics',
          title: 'Solidity Basics',
          description: 'Variables, types, and syntax',
          icon: '🔗',
          difficulty: 'Beginner',
          duration: '5 min',
          reward: '10 B3TR'
        },
        {
          id: 'solidity-data-types',
          title: 'Data Types & Structs',
          description: 'Arrays, mappings, and structures',
          icon: '🗂️',
          difficulty: 'Beginner',
          duration: '5 min',
          reward: '10 B3TR'
        },
        {
          id: 'solidity-functions',
          title: 'Functions & Modifiers',
          description: 'Function types and access control',
          icon: '🔐',
          difficulty: 'Intermediate',
          duration: '5 min',
          reward: '10 B3TR'
        },
        {
          id: 'smart-contract-dev',
          title: 'Smart Contract Dev',
          description: 'Events, inheritance, and patterns',
          icon: '📝',
          difficulty: 'Intermediate',
          duration: '5 min',
          reward: '10 B3TR'
        },
        {
          id: 'defi-tokens',
          title: 'DeFi & Token Standards',
          description: 'ERC20, ERC721, and DeFi basics',
          icon: '💰',
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
      fontFamily: 'Arial, sans-serif'
    }}>
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
            position: 'relative'
          }}>
            {/* Left Fade - Only visible when scrolled */}
            <div
              className={`scroll-fade-left-${track.trackName.replace(/\s+/g, '-').toLowerCase()}`}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 20,
                width: '40px',
                background: 'linear-gradient(to right, #191A1F 0%, transparent 100%)',
                zIndex: 2,
                pointerEvents: 'none',
                opacity: 0,
                transition: 'opacity 0.3s'
              }}
            ></div>

            {/* Right Fade - Initially visible */}
            <div
              className={`scroll-fade-right-${track.trackName.replace(/\s+/g, '-').toLowerCase()}`}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 20,
                width: '40px',
                background: 'linear-gradient(to left, #191A1F 0%, transparent 100%)',
                zIndex: 2,
                pointerEvents: 'none',
                opacity: 1,
                transition: 'opacity 0.3s'
              }}
            ></div>

            <div
              className={`course-scroll-container-${track.trackName.replace(/\s+/g, '-').toLowerCase()}`}
              style={{
                display: 'flex',
                overflowX: 'auto',
                gap: '20px',
                padding: '10px 0 20px 0',
                scrollbarWidth: 'thin',
                scrollbarColor: `${track.trackColor} #333`
              }}
              onScroll={(e) => {
                const fadeLeftEl = document.querySelector(`.scroll-fade-left-${track.trackName.replace(/\s+/g, '-').toLowerCase()}`);
                const fadeRightEl = document.querySelector(`.scroll-fade-right-${track.trackName.replace(/\s+/g, '-').toLowerCase()}`);
                const container = e.target;
                const maxScroll = container.scrollWidth - container.clientWidth;

                if (fadeLeftEl) {
                  fadeLeftEl.style.opacity = container.scrollLeft > 10 ? '1' : '0';
                }

                if (fadeRightEl) {
                  fadeRightEl.style.opacity = container.scrollLeft < maxScroll - 10 ? '1' : '0';
                }
              }}
            >
            {track.courses.map((course) => {
              const isCompleted = completedCourses[course.id];

              return (
                <div
                  key={course.id}
                  onClick={() => onSelectCourse(course.id)}
                  style={{
                    minWidth: '340px',
                    maxWidth: '340px',
                    background: '#161315',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: isCompleted ? 'default' : 'pointer',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    border: '1px solid rgba(208, 146, 195, 0.2)',
                    opacity: isCompleted ? 0.7 : 1,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (!isCompleted) {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCompleted) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {isCompleted && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: '#4CAF50',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      zIndex: 10
                    }}>
                      ✓ COMPLETED
                    </div>
                  )}

                  {/* Course Image Placeholder */}
                  <div style={{
                    background: '#f5e6d3',
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid rgba(208, 146, 195, 0.1)'
                  }}>
                    <div style={{
                      fontSize: '4rem'
                    }}>
                      {course.icon}
                    </div>
                  </div>

                  {/* Course Details */}
                  <div style={{ padding: '24px' }}>
                    <h3 style={{
                      color: '#fff',
                      margin: '0 0 12px 0',
                      fontSize: '1.4rem',
                      fontWeight: '600',
                      lineHeight: '1.3'
                    }}>
                      {course.title}
                    </h3>

                    <p style={{
                      color: '#CFCFCF',
                      fontSize: '0.95rem',
                      marginBottom: '20px',
                      lineHeight: '1.5'
                    }}>
                      {course.description}
                    </p>

                    {/* Course Meta */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      marginBottom: '0',
                      fontSize: '0.9rem',
                      color: '#888'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <span>⏱</span>
                        <span>{course.duration}</span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <span>🪙</span>
                        <span>{course.reward}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LearningPaths;
