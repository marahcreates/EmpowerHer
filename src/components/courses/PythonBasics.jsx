import React, { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import '../styles/PythonBasics.css';
import CourseCompletion from '../CourseCompletion';

const PYTHON_MODULES = [
  {
    id: 1,
    title: "Variables and Data Types",
    theory: `
      <h3>Welcome to Python! 🐍</h3>
      <p>In Python, variables are containers for storing data. You don't need to declare the type - Python figures it out automatically!</p>
      <h4>Basic Data Types:</h4>
      <ul>
        <li><strong>Strings:</strong> Text data in quotes - <code>"Hello"</code></li>
        <li><strong>Integers:</strong> Whole numbers - <code>42</code></li>
        <li><strong>Floats:</strong> Decimal numbers - <code>3.14</code></li>
        <li><strong>Booleans:</strong> True or False values</li>
      </ul>
      <h4>Example:</h4>
      <pre>name = "Alice"
age = 25
height = 5.6
is_student = True</pre>
    `,
    task: "Create a variable called `greeting` and assign it the value `'Hello, Python!'`. Then print it.",
    starterCode: "# Create your variable here\n\n# Print the greeting\n",
    solution: `greeting = "Hello, Python!"
print(greeting)`,
    expectedOutput: "Hello, Python!",
    hint: "Use the print() function to display your variable."
  },
  {
    id: 2,
    title: "Math Operations",
    theory: `
      <h3>Doing Math in Python ➕➖✖️➗</h3>
      <p>Python can perform all basic arithmetic operations:</p>
      <ul>
        <li><code>+</code> Addition</li>
        <li><code>-</code> Subtraction</li>
        <li><code>*</code> Multiplication</li>
        <li><code>/</code> Division</li>
        <li><code>**</code> Power (exponent)</li>
        <li><code>%</code> Modulo (remainder)</li>
      </ul>
      <h4>Example:</h4>
      <pre>x = 10 + 5    # 15
y = 20 - 3    # 17
z = 4 * 7     # 28
result = 2 ** 3  # 8 (2 to the power of 3)</pre>
    `,
    task: "Calculate the area of a rectangle with width `12` and height `8`. Store it in a variable called `area` and print it.",
    starterCode: "# Calculate the area\nwidth = 12\nheight = 8\n\n# Your code here\n",
    solution: `width = 12
height = 8
area = width * height
print(area)`,
    expectedOutput: "96",
    hint: "Area = width × height. Use the * operator."
  },
  {
    id: 3,
    title: "Lists and Indexing",
    theory: `
      <h3>Working with Lists 📋</h3>
      <p>Lists are ordered collections that can hold multiple items. They're created with square brackets.</p>
      <h4>Creating Lists:</h4>
      <pre>fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]</pre>
      <h4>Accessing Items (Indexing starts at 0):</h4>
      <pre>fruits[0]  # "apple"
fruits[1]  # "banana"
fruits[-1] # "cherry" (last item)</pre>
      <h4>List Operations:</h4>
      <ul>
        <li><code>len(list)</code> - Get list length</li>
        <li><code>list.append(item)</code> - Add item to end</li>
        <li><code>list[0]</code> - Access first item</li>
      </ul>
    `,
    task: "Create a list called `colors` with three colors: 'red', 'green', and 'blue'. Print the second color.",
    starterCode: "# Create your list\n\n# Print the second color (remember: indexing starts at 0!)\n",
    solution: `colors = ["red", "green", "blue"]
print(colors[1])`,
    expectedOutput: "green",
    hint: "The second item is at index 1!"
  },
  {
    id: 4,
    title: "Conditional Statements",
    theory: `
      <h3>Making Decisions with If/Else 🔀</h3>
      <p>Conditional statements let your code make decisions based on conditions.</p>
      <h4>Syntax:</h4>
      <pre>if condition:
    # code if true
else:
    # code if false</pre>
      <h4>Comparison Operators:</h4>
      <ul>
        <li><code>==</code> Equal to</li>
        <li><code>!=</code> Not equal to</li>
        <li><code>&gt;</code> Greater than</li>
        <li><code>&lt;</code> Less than</li>
        <li><code>&gt;=</code> Greater than or equal</li>
        <li><code>&lt;=</code> Less than or equal</li>
      </ul>
      <h4>Example:</h4>
      <pre>age = 18
if age >= 18:
    print("Adult")
else:
    print("Minor")</pre>
    `,
    task: "Create a variable `temperature` with value `75`. If temperature is greater than 70, print 'Hot', otherwise print 'Cold'.",
    starterCode: "# Set the temperature\ntemperature = 75\n\n# Write your if/else statement\n",
    solution: `temperature = 75
if temperature > 70:
    print("Hot")
else:
    print("Cold")`,
    expectedOutput: "Hot",
    hint: "Use if temperature > 70: with proper indentation."
  },
  {
    id: 5,
    title: "Loops and Iteration",
    theory: `
      <h3>Repeating Code with Loops 🔄</h3>
      <p>Loops let you repeat code multiple times without writing it over and over.</p>
      <h4>For Loop (iterate over items):</h4>
      <pre>for item in [1, 2, 3]:
    print(item)</pre>
      <h4>Range Function:</h4>
      <pre>for i in range(5):  # 0, 1, 2, 3, 4
    print(i)</pre>
      <h4>While Loop (repeat while condition is true):</h4>
      <pre>count = 0
while count < 3:
    print(count)
    count += 1</pre>
      <h4>Example:</h4>
      <pre>fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)</pre>
    `,
    task: "Use a for loop to print the numbers 1 through 5. Use range(1, 6) to generate the numbers.",
    starterCode: "# Write your for loop here\n",
    solution: `for i in range(1, 6):
    print(i)`,
    expectedOutput: "1\n2\n3\n4\n5",
    hint: "Use for i in range(1, 6): and print(i)"
  }
];

const PythonBasics = ({ walletAddress, onComplete, connex }) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState(new Set());
  const [showHint, setShowHint] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const module = PYTHON_MODULES[currentModule];
  const progress = (completedModules.size / PYTHON_MODULES.length) * 100;

  const handleSuccess = () => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(currentModule);
    setCompletedModules(newCompleted);
    setShowHint(false);

    // Check if all modules are completed
    if (newCompleted.size === PYTHON_MODULES.length) {
      setCourseCompleted(true);
      // Don't call onComplete() here - let user claim reward first
    }
  };

  const goToNextModule = () => {
    if (currentModule < PYTHON_MODULES.length - 1) {
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
        courseName="Python Basics"
        courseId="python-basics"
        moduleCount={PYTHON_MODULES.length}
        walletAddress={walletAddress}
        connex={connex}
        onComplete={onComplete}
      />
    );
  }

  return (
    <div className="python-course">
      {/* Header */}
      <div className="course-header">
        <div className="course-title">
          <h1>Python Basics</h1>
          <p>Interactive Course</p>
        </div>
        <div className="progress-section">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="progress-text">
            {completedModules.size} / {PYTHON_MODULES.length} modules
          </span>
        </div>
      </div>

      {/* Module Navigation */}
      <div className="module-nav">
        {PYTHON_MODULES.map((mod, idx) => (
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
          disabled={!completedModules.has(currentModule) || currentModule === PYTHON_MODULES.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default PythonBasics;
