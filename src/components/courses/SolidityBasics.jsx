import CourseCompletion from '../CourseCompletion';
import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import '../styles/PythonBasics.css';

const SOLIDITY_MODULES = [
  {
    id: 1,
    title: "Smart Contract Structure",
    theory: `
      <h3>Your First Smart Contract 💎</h3>
      <p>Solidity is the programming language for Ethereum smart contracts. Let's start with the basics!</p>
      <h4>Basic Contract Structure:</h4>
      <pre>// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public message = "Hello, Blockchain!";
}</pre>
      <h4>Key Components:</h4>
      <ul>
        <li><code>pragma</code> - Specifies Solidity version</li>
        <li><code>contract</code> - Like a class in OOP</li>
        <li><strong>State Variables</strong> - Stored on blockchain</li>
        <li><code>public</code> - Creates automatic getter</li>
      </ul>
      <h4>Note:</h4>
      <p>We'll simulate Solidity by printing contract outputs!</p>
    `,
    task: "Create a variable `contractName` with value 'MyFirstContract'. Print it to simulate deploying a contract.",
    starterCode: "# Simulate Solidity contract\n\n# Print contract name\n",
    solution: `contractName = "MyFirstContract"
print(contractName)`,
    expectedOutput: "MyFirstContract",
    hint: "Store the contract name and print it."
  },
  {
    id: 2,
    title: "Data Types - Integers",
    theory: `
      <h3>Solidity Data Types: uint & int 🔢</h3>
      <p>Solidity has strictly typed variables. The most common are unsigned integers (uint) and integers (int).</p>
      <h4>Integer Types:</h4>
      <ul>
        <li><code>uint</code> - Unsigned integer (0 and positive)</li>
        <li><code>uint256</code> - 256-bit unsigned (most common)</li>
        <li><code>int</code> - Signed integer (negative and positive)</li>
      </ul>
      <h4>Example:</h4>
      <pre>contract Numbers {
    uint256 public age = 25;
    uint public count = 100;
    int public temperature = -5;
}</pre>
      <h4>Gas Optimization:</h4>
      <p>uint256 and uint are the same. Smaller types (uint8, uint16) don't save gas in most cases!</p>
    `,
    task: "Create a variable `balance` with value 1000 (representing wei). Print it to simulate a contract balance.",
    starterCode: "# Simulate uint256 balance\n\n# Print balance\n",
    solution: `balance = 1000
print(balance)`,
    expectedOutput: "1000",
    hint: "Store 1000 in balance and print it."
  },
  {
    id: 3,
    title: "Address Type",
    theory: `
      <h3>Addresses - The Heart of Blockchain 📍</h3>
      <p>Addresses are 20-byte values representing Ethereum accounts. They're crucial for smart contracts!</p>
      <h4>Address Basics:</h4>
      <pre>contract AddressExample {
    address public owner;
    address payable public recipient;

    constructor() {
        owner = msg.sender;
    }
}</pre>
      <h4>Key Concepts:</h4>
      <ul>
        <li><code>address</code> - Regular address (20 bytes)</li>
        <li><code>address payable</code> - Can receive Ether</li>
        <li><code>msg.sender</code> - Address calling the function</li>
      </ul>
      <h4>Format:</h4>
      <p>Addresses look like: <code>0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7</code></p>
    `,
    task: "Create a variable `owner` with value '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7'. Print it.",
    starterCode: "# Simulate address type\n\n# Print owner address\n",
    solution: `owner = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7"
print(owner)`,
    expectedOutput: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
    hint: "Store the address string and print it."
  },
  {
    id: 4,
    title: "Boolean and String Types",
    theory: `
      <h3>Booleans and Strings 📝</h3>
      <p>Booleans for logic, strings for text data!</p>
      <h4>Boolean:</h4>
      <pre>contract Voting {
    bool public votingOpen = true;
    bool public hasVoted = false;

    function closeVoting() public {
        votingOpen = false;
    }
}</pre>
      <h4>Strings:</h4>
      <pre>contract Greeter {
    string public greeting = "Hello, Web3!";
    string private secretMessage;
}</pre>
      <h4>Important Notes:</h4>
      <ul>
        <li>Strings are expensive (high gas cost)</li>
        <li>Use bytes32 for fixed-length strings</li>
        <li>Booleans are cheap and efficient</li>
      </ul>
    `,
    task: "Create a variable `isActive` with value True and `name` with 'TokenContract'. Print 'Active' if isActive is True.",
    starterCode: "# Simulate boolean and string\nisActive = True\nname = 'TokenContract'\n\n# Print 'Active' if isActive\n",
    solution: `isActive = True
name = 'TokenContract'
if isActive:
    print("Active")`,
    expectedOutput: "Active",
    hint: "Use if isActive: to check the condition."
  },
  {
    id: 5,
    title: "State Variables vs Local",
    theory: `
      <h3>Variable Scope in Solidity 🎯</h3>
      <p>Understanding where variables live is crucial for gas optimization!</p>
      <h4>State Variables (Expensive):</h4>
      <pre>contract Storage {
    uint256 public storedData;  // Stored on blockchain
    address public owner;        // Permanent storage
}</pre>
      <h4>Local Variables (Cheap):</h4>
      <pre>function calculate(uint x) public pure returns (uint) {
    uint result = x * 2;  // Only exists during execution
    return result;
}</pre>
      <h4>Gas Costs:</h4>
      <ul>
        <li><strong>State variables:</strong> High gas (permanent storage)</li>
        <li><strong>Local variables:</strong> Low gas (temporary)</li>
        <li><strong>Memory:</strong> For complex types in functions</li>
      </ul>
    `,
    task: "Create `stateVar = 100`. In a simulated function, create `localVar = stateVar * 2`. Print localVar.",
    starterCode: "# State variable\nstateVar = 100\n\n# Simulate function with local var\n\n# Print local variable\n",
    solution: `stateVar = 100
localVar = stateVar * 2
print(localVar)`,
    expectedOutput: "200",
    hint: "Calculate localVar = stateVar * 2 and print it."
  }
];

const SolidityBasics = ({ walletAddress, onComplete, connex }) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState(new Set());
  const [showHint, setShowHint] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const module = SOLIDITY_MODULES[currentModule];
  const progress = (completedModules.size / SOLIDITY_MODULES.length) * 100;

  const handleSuccess = () => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(currentModule);
    setCompletedModules(newCompleted);
    setShowHint(false);

    if (newCompleted.size === SOLIDITY_MODULES.length) {
      setCourseCompleted(true);
      // Don't call onComplete() here - let user claim reward first
    }
  };

  const goToNextModule = () => {
    if (currentModule < SOLIDITY_MODULES.length - 1) {
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
        courseName="Solidity Basics"
        courseId="solidity-basics"
        moduleCount={SOLIDITY_MODULES.length}
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
          <h1>Solidity Basics</h1>
          <p>Interactive Course</p>
        </div>
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-text">
            {completedModules.size} / {SOLIDITY_MODULES.length} modules
          </span>
        </div>
      </div>

      <div className="module-nav">
        {SOLIDITY_MODULES.map((mod, idx) => (
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
          disabled={!completedModules.has(currentModule) || currentModule === SOLIDITY_MODULES.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default SolidityBasics;
