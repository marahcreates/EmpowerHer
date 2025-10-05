import CourseCompletion from '../CourseCompletion';
import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import '../styles/PythonBasics.css';

const DATA_TYPES_MODULES = [
  {
    id: 1,
    title: "Working with Strings",
    theory: `
      <h3>String Mastery 📝</h3>
      <p>Strings are sequences of characters. Python provides powerful tools to manipulate them!</p>
      <h4>String Operations:</h4>
      <ul>
        <li><strong>Concatenation:</strong> Join strings with <code>+</code></li>
        <li><strong>Length:</strong> Get string length with <code>len()</code></li>
        <li><strong>Indexing:</strong> Access characters with <code>[index]</code></li>
        <li><strong>Methods:</strong> <code>.upper()</code>, <code>.lower()</code>, <code>.strip()</code></li>
      </ul>
      <h4>Example:</h4>
      <pre>name = "Python"
greeting = "Hello, " + name
length = len(greeting)
uppercase = name.upper()  # "PYTHON"</pre>
    `,
    task: "Create a variable `message` with the text 'python is fun', then convert it to uppercase and print it.",
    starterCode: "# Create the message\nmessage = 'python is fun'\n\n# Convert to uppercase and print\n",
    solution: `message = 'python is fun'
uppercase_message = message.upper()
print(uppercase_message)`,
    expectedOutput: "PYTHON IS FUN",
    hint: "Use the .upper() method on your string variable."
  },
  {
    id: 2,
    title: "Lists and Methods",
    theory: `
      <h3>List Operations 📋</h3>
      <p>Lists are dynamic arrays that can grow and shrink. They're incredibly versatile!</p>
      <h4>Common List Methods:</h4>
      <ul>
        <li><code>.append(item)</code> - Add item to end</li>
        <li><code>.insert(index, item)</code> - Insert at position</li>
        <li><code>.remove(item)</code> - Remove first occurrence</li>
        <li><code>.pop()</code> - Remove and return last item</li>
        <li><code>len(list)</code> - Get list length</li>
      </ul>
      <h4>Example:</h4>
      <pre>fruits = ["apple", "banana"]
fruits.append("orange")  # ["apple", "banana", "orange"]
count = len(fruits)  # 3</pre>
    `,
    task: "Create a list `numbers` with [1, 2, 3], append the number 4 to it, then print the length of the list.",
    starterCode: "# Create the list\nnumbers = [1, 2, 3]\n\n# Append 4 and print length\n",
    solution: `numbers = [1, 2, 3]
numbers.append(4)
print(len(numbers))`,
    expectedOutput: "4",
    hint: "Use .append(4) then len(numbers) to get the length."
  },
  {
    id: 3,
    title: "Dictionaries",
    theory: `
      <h3>Dictionaries - Key-Value Pairs 🗝️</h3>
      <p>Dictionaries store data as key-value pairs, perfect for structured information!</p>
      <h4>Dictionary Basics:</h4>
      <ul>
        <li>Created with curly braces: <code>{key: value}</code></li>
        <li>Access values: <code>dict[key]</code></li>
        <li>Add/Update: <code>dict[key] = value</code></li>
        <li>Get keys: <code>dict.keys()</code></li>
        <li>Get values: <code>dict.values()</code></li>
      </ul>
      <h4>Example:</h4>
      <pre>person = {"name": "Alice", "age": 25}
name = person["name"]  # "Alice"
person["city"] = "NYC"  # Add new key-value</pre>
    `,
    task: "Create a dictionary `student` with keys 'name' (value: 'Bob') and 'grade' (value: 90). Print the student's grade.",
    starterCode: "# Create the dictionary\n\n# Print the grade\n",
    solution: `student = {"name": "Bob", "grade": 90}
print(student["grade"])`,
    expectedOutput: "90",
    hint: "Access dictionary values using dict['key'] syntax."
  },
  {
    id: 4,
    title: "Tuples and Sets",
    theory: `
      <h3>Tuples and Sets 🎭</h3>
      <p>Tuples are immutable lists, and sets store unique values only.</p>
      <h4>Tuples (Immutable):</h4>
      <pre>coordinates = (10, 20)
x = coordinates[0]  # 10
# coordinates[0] = 5  # ERROR! Can't modify</pre>
      <h4>Sets (Unique Values):</h4>
      <pre>unique_numbers = {1, 2, 3, 3, 2}
# Result: {1, 2, 3} - duplicates removed
unique_numbers.add(4)  # {1, 2, 3, 4}</pre>
      <h4>When to Use:</h4>
      <ul>
        <li><strong>Tuples:</strong> For data that shouldn't change</li>
        <li><strong>Sets:</strong> To ensure uniqueness</li>
      </ul>
    `,
    task: "Create a tuple `point` with values (5, 10). Print the first value (index 0).",
    starterCode: "# Create the tuple\n\n# Print first value\n",
    solution: `point = (5, 10)
print(point[0])`,
    expectedOutput: "5",
    hint: "Tuples use parentheses () and access items like lists with [index]."
  },
  {
    id: 5,
    title: "Type Conversion",
    theory: `
      <h3>Converting Between Types 🔄</h3>
      <p>Python can convert data between different types when needed.</p>
      <h4>Conversion Functions:</h4>
      <ul>
        <li><code>str()</code> - Convert to string</li>
        <li><code>int()</code> - Convert to integer</li>
        <li><code>float()</code> - Convert to decimal</li>
        <li><code>list()</code> - Convert to list</li>
      </ul>
      <h4>Example:</h4>
      <pre>age = 25
age_text = str(age)  # "25"
number = int("42")  # 42
decimal = float("3.14")  # 3.14</pre>
      <h4>Practical Use:</h4>
      <pre>num = "100"
doubled = int(num) * 2  # 200 (not "100100"!)</pre>
    `,
    task: "Convert the string '50' to an integer, multiply it by 2, then print the result.",
    starterCode: "# Convert and calculate\ntext_num = '50'\n\n# Your code here\n",
    solution: `text_num = '50'
num = int(text_num)
result = num * 2
print(result)`,
    expectedOutput: "100",
    hint: "Use int() to convert the string, then multiply by 2."
  }
];

const PythonDataTypes = ({ walletAddress, onComplete, connex }) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState(new Set());
  const [showHint, setShowHint] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const module = DATA_TYPES_MODULES[currentModule];
  const progress = (completedModules.size / DATA_TYPES_MODULES.length) * 100;

  const handleSuccess = () => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(currentModule);
    setCompletedModules(newCompleted);
    setShowHint(false);

    if (newCompleted.size === DATA_TYPES_MODULES.length) {
      setCourseCompleted(true);
      // Don't call onComplete() here - let user claim reward first
    }
  };

  const goToNextModule = () => {
    if (currentModule < DATA_TYPES_MODULES.length - 1) {
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
        courseName="Python Data Types"
        courseId="python-data-types"
        moduleCount={PYTHON_DATA_TYPE_MODULES.length}
        walletAddress={walletAddress}
        connex={connex}
        onComplete={onComplete}
      />
    );
  }

  return (
    <div className="python-course">
      <div className="course-header">
        <div className="course-title">
          <h1>Python Data Types & Operators</h1>
          <p>Interactive Course</p>
        </div>
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-text">
            {completedModules.size} / {DATA_TYPES_MODULES.length} modules
          </span>
        </div>
      </div>

      <div className="module-nav">
        {DATA_TYPES_MODULES.map((mod, idx) => (
          <button
            key={mod.id}
            className={`module-nav-item ${idx === currentModule ? 'active' : ''} ${completedModules.has(idx) ? 'completed' : ''}`}
            onClick={() => setCurrentModule(idx)}
          >
            <span className="module-number">{idx + 1}</span>
            {completedModules.has(idx) && <span className="check-mark">✓</span>}
          </button>
        ))}
      </div>

      <div className="course-content">
        <div className="theory-panel">
          <div className="panel-header">
            <h2>
              <span className="module-badge">Module {module.id}</span>
              {module.title}
            </h2>
          </div>
          <div className="theory-content" dangerouslySetInnerHTML={{ __html: module.theory }} />

          <div className="task-section">
            <h3>📝 Your Task:</h3>
            <p>{module.task}</p>
            {showHint && (
              <div className="hint-box">
                <strong>💡 Hint:</strong> {module.hint}
              </div>
            )}
            {!showHint && (
              <button className="hint-btn" onClick={() => setShowHint(true)}>
                Show Hint
              </button>
            )}
          </div>
        </div>

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

      <div className="course-footer">
        <button className="nav-btn prev-btn" onClick={goToPreviousModule} disabled={currentModule === 0}>
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
          disabled={!completedModules.has(currentModule) || currentModule === DATA_TYPES_MODULES.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default PythonDataTypes;
