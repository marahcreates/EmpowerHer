import CourseCompletion from '../CourseCompletion';
import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import '../styles/PythonBasics.css';

const FILES_MODULES = [
  {
    id: 1,
    title: "File Basics",
    theory: `
      <h3>Working with Files 📁</h3>
      <p>Files let you store and retrieve data permanently. Python makes file handling simple!</p>
      <h4>File Operations:</h4>
      <ul>
        <li><strong>Open:</strong> <code>open(filename, mode)</code></li>
        <li><strong>Read:</strong> Read content from file</li>
        <li><strong>Write:</strong> Save content to file</li>
        <li><strong>Close:</strong> Always close files after use</li>
      </ul>
      <h4>File Modes:</h4>
      <pre>'r' - Read (default)
'w' - Write (overwrites)
'a' - Append (adds to end)
'r+' - Read and write</pre>
      <h4>Simulated Example:</h4>
      <pre># We'll simulate file operations
content = "Hello, File!"
print(content)  # Simulates reading</pre>
    `,
    task: "Create a variable `file_content` with the text 'Python Files'. Print it to simulate reading a file.",
    starterCode: "# Create file content variable\n\n# Print it\n",
    solution: `file_content = "Python Files"
print(file_content)`,
    expectedOutput: "Python Files",
    hint: "Store the text in a variable and print it."
  },
  {
    id: 2,
    title: "Reading File Content",
    theory: `
      <h3>Reading Files 📖</h3>
      <p>Reading files is one of the most common file operations. Let's simulate it!</p>
      <h4>Read Methods:</h4>
      <ul>
        <li><code>.read()</code> - Read entire file as string</li>
        <li><code>.readline()</code> - Read one line</li>
        <li><code>.readlines()</code> - Read all lines as list</li>
      </ul>
      <h4>Typical Pattern:</h4>
      <pre>with open('file.txt', 'r') as f:
    content = f.read()
    print(content)</pre>
      <h4>Simulation:</h4>
      <pre># Simulate file content
text = "Line 1\\nLine 2\\nLine 3"
lines = text.split("\\n")
print(lines[0])  # First line</pre>
    `,
    task: "Create a variable `data` with 'apple,banana,orange'. Split it by comma and print the first item (index 0).",
    starterCode: "# Simulate CSV file content\ndata = 'apple,banana,orange'\n\n# Split and print first item\n",
    solution: `data = 'apple,banana,orange'
items = data.split(',')
print(items[0])`,
    expectedOutput: "apple",
    hint: "Use .split(',') to split by comma, then access [0]."
  },
  {
    id: 3,
    title: "Writing to Files",
    theory: `
      <h3>Writing Files ✍️</h3>
      <p>Writing lets you save data permanently. We'll simulate the process!</p>
      <h4>Write Operations:</h4>
      <ul>
        <li><code>'w'</code> mode - Creates new or overwrites</li>
        <li><code>.write()</code> - Write string to file</li>
        <li><code>.writelines()</code> - Write list of strings</li>
      </ul>
      <h4>Real Pattern:</h4>
      <pre>with open('output.txt', 'w') as f:
    f.write("Hello, World!")
    f.write("\\nNew line")</pre>
      <h4>Simulation:</h4>
      <pre># Simulate writing by joining
lines = ["First", "Second"]
output = "\\n".join(lines)
print(output)</pre>
    `,
    task: "Create a list `lines` with ['Hello', 'World']. Join them with a space and print the result.",
    starterCode: "# Create list of lines\nlines = ['Hello', 'World']\n\n# Join and print\n",
    solution: `lines = ['Hello', 'World']
output = ' '.join(lines)
print(output)`,
    expectedOutput: "Hello World",
    hint: "Use ' '.join(lines) to join with space."
  },
  {
    id: 4,
    title: "Appending to Files",
    theory: `
      <h3>Appending Data ➕</h3>
      <p>Append mode adds content to the end of a file without deleting existing content.</p>
      <h4>Append Mode:</h4>
      <pre>with open('log.txt', 'a') as f:
    f.write("New log entry\\n")</pre>
      <h4>When to Append:</h4>
      <ul>
        <li>Adding to log files</li>
        <li>Collecting data over time</li>
        <li>Preserving existing content</li>
      </ul>
      <h4>Simulation:</h4>
      <pre># Simulate append
existing = "Old data"
new = "New data"
combined = existing + "\\n" + new
print(combined)</pre>
    `,
    task: "Create `old_text = 'Line1'` and `new_text = 'Line2'`. Combine them with a comma and space, then print.",
    starterCode: "# Existing content\nold_text = 'Line1'\nnew_text = 'Line2'\n\n# Combine and print\n",
    solution: `old_text = 'Line1'
new_text = 'Line2'
combined = old_text + ', ' + new_text
print(combined)`,
    expectedOutput: "Line1, Line2",
    hint: "Use + to concatenate: old_text + ', ' + new_text"
  },
  {
    id: 5,
    title: "File Processing",
    theory: `
      <h3>Processing File Data 🔄</h3>
      <p>Real-world file handling often involves reading, processing, and transforming data.</p>
      <h4>Common Patterns:</h4>
      <pre># Read, process, write
with open('input.txt', 'r') as f:
    data = f.read()
    processed = data.upper()

with open('output.txt', 'w') as f:
    f.write(processed)</pre>
      <h4>Practical Uses:</h4>
      <ul>
        <li>Converting data formats</li>
        <li>Filtering content</li>
        <li>Analyzing text</li>
        <li>Batch processing</li>
      </ul>
      <h4>Simulation:</h4>
      <pre>numbers = "1,2,3,4,5"
num_list = numbers.split(',')
total = sum([int(x) for x in num_list])</pre>
    `,
    task: "Create `numbers = '10,20,30'`. Split by comma, convert to integers, sum them, and print the total.",
    starterCode: "# CSV numbers\nnumbers = '10,20,30'\n\n# Split, convert, sum, print\n",
    solution: `numbers = '10,20,30'
num_list = numbers.split(',')
total = int(num_list[0]) + int(num_list[1]) + int(num_list[2])
print(total)`,
    expectedOutput: "60",
    hint: "Split, then add int(num_list[0]) + int(num_list[1]) + int(num_list[2])"
  }
];

const PythonFiles = ({ walletAddress, onComplete, connex }) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState(new Set());
  const [showHint, setShowHint] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const module = FILES_MODULES[currentModule];
  const progress = (completedModules.size / FILES_MODULES.length) * 100;

  const handleSuccess = () => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(currentModule);
    setCompletedModules(newCompleted);
    setShowHint(false);

    if (newCompleted.size === FILES_MODULES.length) {
      setCourseCompleted(true);
      // Don't call onComplete() here - let user claim reward first
    }
  };

  const goToNextModule = () => {
    if (currentModule < FILES_MODULES.length - 1) {
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
        courseName="Python Files"
        courseId="python-files"
        moduleCount={PYTHON_FILE_MODULES.length}
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
          <h1>Python File Handling</h1>
          <p>Interactive Course</p>
        </div>
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-text">
            {completedModules.size} / {FILES_MODULES.length} modules
          </span>
        </div>
      </div>

      <div className="module-nav">
        {FILES_MODULES.map((mod, idx) => (
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
          disabled={!completedModules.has(currentModule) || currentModule === FILES_MODULES.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default PythonFiles;
