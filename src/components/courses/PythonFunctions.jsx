import CourseCompletion from '../CourseCompletion';
import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import '../styles/PythonBasics.css';

const FUNCTIONS_MODULES = [
  {
    id: 1,
    title: "Creating Functions",
    theory: `
      <h3>Your First Function ⚡</h3>
      <p>Functions are reusable blocks of code that perform specific tasks. They help organize your code and avoid repetition!</p>
      <h4>Function Syntax:</h4>
      <pre>def function_name():
    # code here
    return result</pre>
      <h4>Key Concepts:</h4>
      <ul>
        <li><code>def</code> - Keyword to define a function</li>
        <li><strong>Function name</strong> - Descriptive name in lowercase</li>
        <li><strong>(): </strong> - Parentheses (parameters go here)</li>
        <li><strong>Indentation</strong> - Code inside must be indented</li>
      </ul>
      <h4>Example:</h4>
      <pre>def greet():
    return "Hello, World!"

message = greet()
print(message)  # "Hello, World!"</pre>
    `,
    task: "Create a function called `say_hello` that returns the string 'Hello!'. Call it and print the result.",
    starterCode: "# Define your function\n\n# Call it and print\n",
    solution: `def say_hello():
    return "Hello!"

result = say_hello()
print(result)`,
    expectedOutput: "Hello!",
    hint: "Use def say_hello(): and return the string."
  },
  {
    id: 2,
    title: "Function Parameters",
    theory: `
      <h3>Functions with Inputs 📥</h3>
      <p>Parameters let you pass data into functions, making them more flexible and powerful!</p>
      <h4>Syntax with Parameters:</h4>
      <pre>def greet(name):
    return "Hello, " + name

greeting = greet("Alice")  # "Hello, Alice"</pre>
      <h4>Multiple Parameters:</h4>
      <pre>def add(a, b):
    return a + b

result = add(5, 3)  # 8</pre>
      <h4>Key Points:</h4>
      <ul>
        <li>Parameters are variables defined in function parentheses</li>
        <li>Arguments are actual values passed when calling</li>
        <li>Can have multiple parameters separated by commas</li>
      </ul>
    `,
    task: "Create a function `multiply` that takes two parameters (a, b) and returns their product. Call it with 6 and 7, then print the result.",
    starterCode: "# Define multiply function\n\n# Call with 6 and 7, print result\n",
    solution: `def multiply(a, b):
    return a * b

result = multiply(6, 7)
print(result)`,
    expectedOutput: "42",
    hint: "def multiply(a, b): return a * b"
  },
  {
    id: 3,
    title: "Default Parameters",
    theory: `
      <h3>Default Values 🎯</h3>
      <p>You can give parameters default values, making them optional when calling the function!</p>
      <h4>Default Parameter Syntax:</h4>
      <pre>def greet(name="Friend"):
    return "Hello, " + name

print(greet())        # "Hello, Friend"
print(greet("Alice")) # "Hello, Alice"</pre>
      <h4>Multiple Defaults:</h4>
      <pre>def power(base, exponent=2):
    return base ** exponent

print(power(5))     # 25 (5^2)
print(power(5, 3))  # 125 (5^3)</pre>
      <h4>Benefits:</h4>
      <ul>
        <li>Makes functions more flexible</li>
        <li>Reduces code when common values are used</li>
        <li>Provides sensible defaults</li>
      </ul>
    `,
    task: "Create a function `greet_person` with parameter `name` that defaults to 'Guest'. Return 'Welcome, ' + name. Call it without arguments and print.",
    starterCode: "# Define function with default parameter\n\n# Call without arguments and print\n",
    solution: `def greet_person(name="Guest"):
    return "Welcome, " + name

result = greet_person()
print(result)`,
    expectedOutput: "Welcome, Guest",
    hint: "Use name='Guest' as the parameter with a default value."
  },
  {
    id: 4,
    title: "Return Values",
    theory: `
      <h3>Returning Results 🔙</h3>
      <p>The <code>return</code> statement sends a value back to the caller and exits the function.</p>
      <h4>Return Basics:</h4>
      <pre>def calculate(x):
    result = x * 2
    return result

answer = calculate(5)  # 10</pre>
      <h4>Multiple Returns:</h4>
      <pre>def get_user():
    return "Alice", 25  # Returns a tuple

name, age = get_user()  # Unpacking</pre>
      <h4>Early Return:</h4>
      <pre>def is_adult(age):
    if age >= 18:
        return True
    return False</pre>
      <h4>Important:</h4>
      <ul>
        <li>Functions without <code>return</code> return <code>None</code></li>
        <li><code>return</code> immediately exits the function</li>
        <li>Can return any data type</li>
      </ul>
    `,
    task: "Create a function `square` that takes a number and returns its square. Call it with 8 and print the result.",
    starterCode: "# Define square function\n\n# Call with 8 and print\n",
    solution: `def square(num):
    return num * num

result = square(8)
print(result)`,
    expectedOutput: "64",
    hint: "Return num * num or num ** 2"
  },
  {
    id: 5,
    title: "Function Scope",
    theory: `
      <h3>Variable Scope 🔍</h3>
      <p>Scope determines where variables can be accessed. Variables inside functions are local!</p>
      <h4>Local vs Global:</h4>
      <pre>global_var = 100  # Global - accessible everywhere

def my_function():
    local_var = 50  # Local - only inside function
    return local_var

print(my_function())  # 50
# print(local_var)    # ERROR! Not accessible outside</pre>
      <h4>Global Keyword:</h4>
      <pre>counter = 0

def increment():
    global counter  # Modify global variable
    counter += 1

increment()
print(counter)  # 1</pre>
      <h4>Best Practice:</h4>
      <ul>
        <li>Prefer passing parameters over using globals</li>
        <li>Return values instead of modifying globals</li>
        <li>Keep functions self-contained</li>
      </ul>
    `,
    task: "Create a variable `total = 10` outside any function. Create a function `add_five` that takes a number, adds 5, and returns it. Call with `total` and print.",
    starterCode: "# Create total variable\ntotal = 10\n\n# Define add_five function\n\n# Call and print\n",
    solution: `total = 10

def add_five(num):
    return num + 5

result = add_five(total)
print(result)`,
    expectedOutput: "15",
    hint: "The function takes a parameter and returns parameter + 5."
  }
];

const PythonFunctions = ({ walletAddress, onComplete, connex }) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState(new Set());
  const [showHint, setShowHint] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const module = FUNCTIONS_MODULES[currentModule];
  const progress = (completedModules.size / FUNCTIONS_MODULES.length) * 100;

  const handleSuccess = () => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(currentModule);
    setCompletedModules(newCompleted);
    setShowHint(false);

    if (newCompleted.size === FUNCTIONS_MODULES.length) {
      setCourseCompleted(true);
      // Don't call onComplete() here - let user claim reward first
    }
  };

  const goToNextModule = () => {
    if (currentModule < FUNCTIONS_MODULES.length - 1) {
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
        courseName="Python Functions"
        courseId="python-functions"
        moduleCount={PYTHON_FUNCTION_MODULES.length}
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
          <h1>Python Functions</h1>
          <p>Interactive Course</p>
        </div>
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-text">
            {completedModules.size} / {FUNCTIONS_MODULES.length} modules
          </span>
        </div>
      </div>

      <div className="module-nav">
        {FUNCTIONS_MODULES.map((mod, idx) => (
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
          disabled={!completedModules.has(currentModule) || currentModule === FUNCTIONS_MODULES.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default PythonFunctions;
