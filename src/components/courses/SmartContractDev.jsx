import CourseCompletion from '../CourseCompletion';
import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import '../styles/PythonBasics.css';

const SMART_CONTRACT_MODULES = [
  {
    id: 1,
    title: "Events and Logging",
    theory: `
      <h3>Events - Blockchain Logs 📝</h3>
      <p>Events allow contracts to communicate with the outside world. They're stored in transaction logs!</p>
      <h4>Declaring Events:</h4>
      <pre>contract Token {
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 value
    );

    function transfer(address to, uint amount) public {
        // Transfer logic...
        emit Transfer(msg.sender, to, amount);
    }
}</pre>
      <h4>Indexed Parameters:</h4>
      <ul>
        <li>Up to 3 parameters can be <code>indexed</code></li>
        <li>Indexed params are searchable</li>
        <li>Great for filtering logs</li>
      </ul>
      <h4>Use Cases:</h4>
      <ul>
        <li>Token transfers</li>
        <li>State changes</li>
        <li>User actions</li>
        <li>Much cheaper than storage!</li>
      </ul>
    `,
    task: "Simulate emitting an event. Create `sender = 'Alice'`, `receiver = 'Bob'`, `amount = 100`. Print 'Transfer: Alice to Bob: 100'",
    starterCode: "# Simulate Transfer event\nsender = 'Alice'\nreceiver = 'Bob'\namount = 100\n\n# Print event\n",
    solution: `sender = 'Alice'
receiver = 'Bob'
amount = 100
print(f"Transfer: {sender} to {receiver}: {amount}")`,
    expectedOutput: "Transfer: Alice to Bob: 100",
    hint: "Use f-string: print(f'Transfer: {sender} to {receiver}: {amount}')"
  },
  {
    id: 2,
    title: "Error Handling",
    theory: `
      <h3>Require, Revert, Assert 🛡️</h3>
      <p>Solidity provides three ways to handle errors and validate conditions!</p>
      <h4>Require (Input Validation):</h4>
      <pre>function withdraw(uint amount) public {
    require(balance[msg.sender] >= amount, "Insufficient balance");
    // ... rest of code
}</pre>
      <h4>Revert (Complex Logic):</h4>
      <pre>function process(uint value) public {
    if (value > 100) {
        revert("Value too high");
    }
}</pre>
      <h4>Assert (Invariants):</h4>
      <pre>function divide(uint a, uint b) public pure returns (uint) {
    assert(b != 0);  // Should never be false
    return a / b;
}</pre>
      <h4>Key Differences:</h4>
      <ul>
        <li><strong>require:</strong> Validates inputs, refunds gas</li>
        <li><strong>revert:</strong> Same as require, more flexible</li>
        <li><strong>assert:</strong> Checks invariants, consumes all gas</li>
      </ul>
    `,
    task: "Simulate require. Create `balance = 50`, `amount = 100`. If amount > balance, print 'Error', else print 'Success'.",
    starterCode: "# Simulate require check\nbalance = 50\namount = 100\n\n# Check and print\n",
    solution: `balance = 50
amount = 100
if amount > balance:
    print("Error")
else:
    print("Success")`,
    expectedOutput: "Error",
    hint: "Use if amount > balance to check the condition."
  },
  {
    id: 3,
    title: "Inheritance",
    theory: `
      <h3>Contract Inheritance 🧬</h3>
      <p>Contracts can inherit from other contracts, enabling code reuse and organization!</p>
      <h4>Basic Inheritance:</h4>
      <pre>contract Ownable {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}

contract MyToken is Ownable {
    function mint() public onlyOwner {
        // Only owner can mint
    }
}</pre>
      <h4>Multiple Inheritance:</h4>
      <pre>contract Token is ERC20, Ownable, Pausable {
    // Inherits from all three
}</pre>
      <h4>Benefits:</h4>
      <ul>
        <li>Code reuse</li>
        <li>Modular design</li>
        <li>Clear hierarchy</li>
        <li>Upgradeable patterns</li>
      </ul>
    `,
    task: "Simulate inheritance. Create `baseValue = 10`. Create `derived = baseValue * 2`. Print derived.",
    starterCode: "# Simulate inherited value\nbaseValue = 10\n\n# Calculate derived and print\n",
    solution: `baseValue = 10
derived = baseValue * 2
print(derived)`,
    expectedOutput: "20",
    hint: "Calculate derived = baseValue * 2"
  },
  {
    id: 4,
    title: "Interfaces and Abstract",
    theory: `
      <h3>Interfaces & Abstract Contracts 🔌</h3>
      <p>Interfaces define contracts that other contracts must implement!</p>
      <h4>Interface:</h4>
      <pre>interface IERC20 {
    function transfer(address to, uint amount) external returns (bool);
    function balanceOf(address account) external view returns (uint);
}

contract MyToken is IERC20 {
    function transfer(address to, uint amount) external returns (bool) {
        // Implementation
    }
}</pre>
      <h4>Abstract Contract:</h4>
      <pre>abstract contract Base {
    function virtualFunc() public virtual returns (uint);
}

contract Derived is Base {
    function virtualFunc() public override returns (uint) {
        return 42;
    }
}</pre>
      <h4>Key Points:</h4>
      <ul>
        <li>Interfaces: Only signatures, no implementation</li>
        <li>Abstract: Can have some implementation</li>
        <li>Both enable polymorphism</li>
      </ul>
    `,
    task: "Simulate interface implementation. Create `interfaceVersion = 1` and `implementation = interfaceVersion`. Print implementation.",
    starterCode: "# Simulate interface\ninterfaceVersion = 1\n\n# Implement and print\n",
    solution: `interfaceVersion = 1
implementation = interfaceVersion
print(implementation)`,
    expectedOutput: "1",
    hint: "Set implementation = interfaceVersion and print it."
  },
  {
    id: 5,
    title: "Libraries and Using For",
    theory: `
      <h3>Libraries - Reusable Logic 📚</h3>
      <p>Libraries are reusable code that can be shared across contracts without deployment cost!</p>
      <h4>Library Definition:</h4>
      <pre>library SafeMath {
    function add(uint a, uint b) internal pure returns (uint) {
        uint c = a + b;
        require(c >= a, "Overflow");
        return c;
    }
}</pre>
      <h4>Using Libraries:</h4>
      <pre>contract Token {
    using SafeMath for uint;

    function increase(uint a, uint b) public pure returns (uint) {
        return a.add(b);  // Library function
    }
}</pre>
      <h4>Popular Libraries:</h4>
      <ul>
        <li><strong>SafeMath:</strong> Safe arithmetic (pre-0.8.0)</li>
        <li><strong>Address:</strong> Address utilities</li>
        <li><strong>Strings:</strong> String operations</li>
        <li><strong>ECDSA:</strong> Signature verification</li>
      </ul>
    `,
    task: "Simulate library usage. Create `a = 15`, `b = 25`. Add them safely and print the result.",
    starterCode: "# Simulate SafeMath library\na = 15\nb = 25\n\n# Safe add and print\n",
    solution: `a = 15
b = 25
result = a + b
print(result)`,
    expectedOutput: "40",
    hint: "Calculate result = a + b and print it."
  }
];

const SmartContractDev = ({ walletAddress, onComplete, connex }) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState(new Set());
  const [showHint, setShowHint] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const module = SMART_CONTRACT_MODULES[currentModule];
  const progress = (completedModules.size / SMART_CONTRACT_MODULES.length) * 100;

  const handleSuccess = () => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(currentModule);
    setCompletedModules(newCompleted);
    setShowHint(false);

    if (newCompleted.size === SMART_CONTRACT_MODULES.length) {
      setCourseCompleted(true);
      // Don't call onComplete() here - let user claim reward first
    }
  };

  const goToNextModule = () => {
    if (currentModule < SMART_CONTRACT_MODULES.length - 1) {
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
        courseName="Smart Contract Development"
        courseId="smart-contract-dev"
        moduleCount={SMART_CONTRACT_MODULES.length}
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
          <h1>Smart Contract Development</h1>
          <p>Interactive Course</p>
        </div>
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-text">
            {completedModules.size} / {SMART_CONTRACT_MODULES.length} modules
          </span>
        </div>
      </div>

      <div className="module-nav">
        {SMART_CONTRACT_MODULES.map((mod, idx) => (
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
          disabled={!completedModules.has(currentModule) || currentModule === SMART_CONTRACT_MODULES.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default SmartContractDev;
