import CourseCompletion from '../CourseCompletion';
import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import '../styles/PythonBasics.css';

const SOLIDITY_FUNCTIONS_MODULES = [
  {
    id: 1,
    title: "Function Visibility",
    theory: `
      <h3>Function Visibility ⚡</h3>
      <p>Solidity has four visibility levels that control where functions can be called from!</p>
      <h4>Visibility Types:</h4>
      <ul>
        <li><code>public</code> - Anyone can call (external + internal)</li>
        <li><code>external</code> - Only callable from outside</li>
        <li><code>internal</code> - Only this contract + derived</li>
        <li><code>private</code> - Only this contract</li>
      </ul>
      <h4>Example:</h4>
      <pre>contract Visibility {
    function publicFunc() public returns (uint) {
        return 1;
    }

    function externalFunc() external returns (uint) {
        return 2;
    }

    function internalFunc() internal returns (uint) {
        return 3;
    }

    function privateFunc() private returns (uint) {
        return 4;
    }
}</pre>
      <h4>Best Practice:</h4>
      <p>Use <code>external</code> when function is only called from outside (saves gas!).</p>
    `,
    task: "Create a function that returns 'public'. Simulate it by creating a variable `visibility` with value 'public' and print it.",
    starterCode: "# Simulate public function\n\n# Print visibility\n",
    solution: `visibility = "public"
print(visibility)`,
    expectedOutput: "public",
    hint: "Store 'public' in visibility and print it."
  },
  {
    id: 2,
    title: "View and Pure Functions",
    theory: `
      <h3>View & Pure - Gas Savers 💰</h3>
      <p>These modifiers indicate functions that don't modify state, making them free to call!</p>
      <h4>View Functions:</h4>
      <pre>contract Storage {
    uint256 public value = 100;

    function getValue() public view returns (uint256) {
        return value;  // Read state, don't modify
    }
}</pre>
      <h4>Pure Functions:</h4>
      <pre>contract Math {
    function add(uint a, uint b) public pure returns (uint) {
        return a + b;  // No state read or write
    }
}</pre>
      <h4>Key Differences:</h4>
      <ul>
        <li><strong>view:</strong> Reads state but doesn't modify</li>
        <li><strong>pure:</strong> No state interaction at all</li>
        <li>Both are FREE when called externally</li>
        <li>Cost gas when called from other functions</li>
      </ul>
    `,
    task: "Simulate a pure function. Create variables `a = 5` and `b = 3`. Calculate and print their sum.",
    starterCode: "# Simulate pure function add(a, b)\na = 5\nb = 3\n\n# Calculate and print sum\n",
    solution: `a = 5
b = 3
result = a + b
print(result)`,
    expectedOutput: "8",
    hint: "Calculate result = a + b and print it."
  },
  {
    id: 3,
    title: "Function Modifiers",
    theory: `
      <h3>Modifiers - Reusable Checks 🛡️</h3>
      <p>Modifiers are reusable code that runs before function execution. Perfect for access control!</p>
      <h4>Basic Modifier:</h4>
      <pre>contract Owned {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;  // Continue execution
    }

    function changeOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }
}</pre>
      <h4>Modifier with Parameters:</h4>
      <pre>modifier minAmount(uint amount) {
    require(msg.value >= amount, "Insufficient funds");
    _;
}</pre>
      <h4>Common Modifiers:</h4>
      <ul>
        <li><code>onlyOwner</code> - Restrict to owner</li>
        <li><code>nonReentrant</code> - Prevent reentrancy</li>
        <li><code>whenNotPaused</code> - Pausable pattern</li>
      </ul>
    `,
    task: "Simulate a modifier check. Create `isOwner = True`. If True, print 'Access Granted', else print 'Denied'.",
    starterCode: "# Simulate onlyOwner modifier\nisOwner = True\n\n# Check and print\n",
    solution: `isOwner = True
if isOwner:
    print("Access Granted")
else:
    print("Denied")`,
    expectedOutput: "Access Granted",
    hint: "Use if isOwner: to check the condition."
  },
  {
    id: 4,
    title: "Payable Functions",
    theory: `
      <h3>Payable - Receiving Ether 💸</h3>
      <p>Functions marked <code>payable</code> can receive Ether. Critical for DeFi applications!</p>
      <h4>Payable Function:</h4>
      <pre>contract Wallet {
    mapping(address => uint) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}</pre>
      <h4>Special Variables:</h4>
      <ul>
        <li><code>msg.value</code> - Amount of wei sent</li>
        <li><code>msg.sender</code> - Address of caller</li>
        <li><code>address(this).balance</code> - Contract balance</li>
      </ul>
      <h4>Example - Withdraw:</h4>
      <pre>function withdraw(uint amount) public {
    require(balances[msg.sender] >= amount);
    balances[msg.sender] -= amount;
    payable(msg.sender).transfer(amount);
}</pre>
    `,
    task: "Simulate a deposit. Create `balance = 100` and `deposit = 50`. Add deposit to balance and print the new balance.",
    starterCode: "# Simulate payable deposit function\nbalance = 100\ndeposit = 50\n\n# Add and print new balance\n",
    solution: `balance = 100
deposit = 50
balance = balance + deposit
print(balance)`,
    expectedOutput: "150",
    hint: "Calculate balance = balance + deposit"
  },
  {
    id: 5,
    title: "Constructor Functions",
    theory: `
      <h3>Constructors - Initialization 🚀</h3>
      <p>Constructors run once when the contract is deployed. Perfect for setup!</p>
      <h4>Basic Constructor:</h4>
      <pre>contract Token {
    address public owner;
    uint public totalSupply;

    constructor(uint _supply) {
        owner = msg.sender;
        totalSupply = _supply;
    }
}</pre>
      <h4>Payable Constructor:</h4>
      <pre>contract Crowdfund {
    uint public goal;

    constructor(uint _goal) payable {
        goal = _goal;
        // Can receive Ether on deployment
    }
}</pre>
      <h4>Key Points:</h4>
      <ul>
        <li>Runs only once at deployment</li>
        <li>Sets initial state</li>
        <li>Can take parameters</li>
        <li>Can be payable</li>
        <li>No <code>function</code> keyword needed</li>
      </ul>
    `,
    task: "Simulate a constructor. Create `owner = 'deployer'` and `supply = 1000000`. Print the supply.",
    starterCode: "# Simulate constructor initialization\nowner = 'deployer'\nsupply = 1000000\n\n# Print supply\n",
    solution: `owner = 'deployer'
supply = 1000000
print(supply)`,
    expectedOutput: "1000000",
    hint: "Just print the supply variable."
  }
];

const SolidityFunctions = ({ walletAddress, onComplete, connex }) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState(new Set());
  const [showHint, setShowHint] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const module = SOLIDITY_FUNCTIONS_MODULES[currentModule];
  const progress = (completedModules.size / SOLIDITY_FUNCTIONS_MODULES.length) * 100;

  const handleSuccess = () => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(currentModule);
    setCompletedModules(newCompleted);
    setShowHint(false);

    if (newCompleted.size === SOLIDITY_FUNCTIONS_MODULES.length) {
      setCourseCompleted(true);
      // Don't call onComplete() here - let user claim reward first
    }
  };

  const goToNextModule = () => {
    if (currentModule < SOLIDITY_FUNCTIONS_MODULES.length - 1) {
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
        courseName="Solidity Functions"
        courseId="solidity-functions"
        moduleCount={SOLIDITY_FUNCTION_MODULES.length}
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
          <h1>Solidity Functions & Modifiers</h1>
          <p>Interactive Course</p>
        </div>
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-text">
            {completedModules.size} / {SOLIDITY_FUNCTIONS_MODULES.length} modules
          </span>
        </div>
      </div>

      <div className="module-nav">
        {SOLIDITY_FUNCTIONS_MODULES.map((mod, idx) => (
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
          disabled={!completedModules.has(currentModule) || currentModule === SOLIDITY_FUNCTIONS_MODULES.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default SolidityFunctions;
