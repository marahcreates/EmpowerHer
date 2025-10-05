import CourseCompletion from '../CourseCompletion';
import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import '../styles/PythonBasics.css';

const SOLIDITY_DATA_MODULES = [
  {
    id: 1,
    title: "Arrays in Solidity",
    theory: `
      <h3>Arrays - Dynamic & Fixed 📊</h3>
      <p>Arrays store multiple values of the same type. Solidity supports both fixed and dynamic arrays.</p>
      <h4>Fixed-Size Arrays:</h4>
      <pre>contract ArrayExample {
    uint[5] public fixedArray;  // 5 elements
    address[10] public addresses;
}</pre>
      <h4>Dynamic Arrays:</h4>
      <pre>contract DynamicArray {
    uint[] public numbers;

    function addNumber(uint _num) public {
        numbers.push(_num);  // Add to end
    }
}</pre>
      <h4>Key Operations:</h4>
      <ul>
        <li><code>push()</code> - Add element (dynamic only)</li>
        <li><code>pop()</code> - Remove last element</li>
        <li><code>length</code> - Get array size</li>
      </ul>
    `,
    task: "Create a list `tokens` with [100, 200, 300]. Add 400 to it, then print the length.",
    starterCode: "# Simulate dynamic array\ntokens = [100, 200, 300]\n\n# Add 400 and print length\n",
    solution: `tokens = [100, 200, 300]
tokens.append(400)
print(len(tokens))`,
    expectedOutput: "4",
    hint: "Use .append(400) then len(tokens)"
  },
  {
    id: 2,
    title: "Mappings - Key-Value Storage",
    theory: `
      <h3>Mappings - Hash Tables of Solidity 🗺️</h3>
      <p>Mappings are like dictionaries/hash tables. They're the most gas-efficient way to store data!</p>
      <h4>Basic Mapping:</h4>
      <pre>contract Ledger {
    mapping(address => uint) public balances;

    function setBalance(address user, uint amount) public {
        balances[user] = amount;
    }
}</pre>
      <h4>Nested Mappings:</h4>
      <pre>// Allowances: owner => spender => amount
mapping(address => mapping(address => uint)) public allowances;</pre>
      <h4>Important Facts:</h4>
      <ul>
        <li>Keys are not stored (only hashed)</li>
        <li>Cannot iterate over mappings</li>
        <li>Default value is 0/false/empty</li>
        <li>Most gas-efficient storage</li>
      </ul>
    `,
    task: "Create a dictionary `balances` with {'Alice': 500, 'Bob': 300}. Print Bob's balance.",
    starterCode: "# Simulate mapping\nbalances = {'Alice': 500, 'Bob': 300}\n\n# Print Bob's balance\n",
    solution: `balances = {'Alice': 500, 'Bob': 300}
print(balances['Bob'])`,
    expectedOutput: "300",
    hint: "Access dictionary with balances['Bob']"
  },
  {
    id: 3,
    title: "Structs - Custom Types",
    theory: `
      <h3>Structs - Organize Complex Data 🏗️</h3>
      <p>Structs let you create custom data types, grouping related variables together!</p>
      <h4>Defining Structs:</h4>
      <pre>contract UserRegistry {
    struct User {
        string name;
        uint age;
        address wallet;
        bool isActive;
    }

    User public admin;
    User[] public users;
}</pre>
      <h4>Using Structs:</h4>
      <pre>function addUser(string memory _name, uint _age) public {
    User memory newUser = User({
        name: _name,
        age: _age,
        wallet: msg.sender,
        isActive: true
    });
    users.push(newUser);
}</pre>
      <h4>Best Practices:</h4>
      <ul>
        <li>Group related data together</li>
        <li>Use with mappings for efficiency</li>
        <li>Great for representing entities</li>
      </ul>
    `,
    task: "Create a dictionary `user` with keys 'name': 'Alice', 'tokens': 1000. Print the tokens value.",
    starterCode: "# Simulate struct\nuser = {'name': 'Alice', 'tokens': 1000}\n\n# Print tokens\n",
    solution: `user = {'name': 'Alice', 'tokens': 1000}
print(user['tokens'])`,
    expectedOutput: "1000",
    hint: "Access with user['tokens']"
  },
  {
    id: 4,
    title: "Enums - Named Constants",
    theory: `
      <h3>Enums - State Management 🎚️</h3>
      <p>Enums create custom types with a limited set of constant values. Perfect for state machines!</p>
      <h4>Defining Enums:</h4>
      <pre>contract Auction {
    enum State { Created, Bidding, Ended, Canceled }
    State public auctionState;

    function start() public {
        auctionState = State.Bidding;
    }
}</pre>
      <h4>Common Use Cases:</h4>
      <pre>enum Status { Pending, Approved, Rejected }
enum Direction { Up, Down, Left, Right }
enum Role { User, Admin, Moderator }</pre>
      <h4>Benefits:</h4>
      <ul>
        <li>More readable than numbers</li>
        <li>Type-safe (prevents invalid values)</li>
        <li>Self-documenting code</li>
        <li>Gas-efficient (stored as uint8)</li>
      </ul>
    `,
    task: "Create a variable `status` with value 1 (representing Approved: 0=Pending, 1=Approved, 2=Rejected). Print it.",
    starterCode: "# Simulate enum (0=Pending, 1=Approved, 2=Rejected)\nstatus = 1\n\n# Print status\n",
    solution: `status = 1
print(status)`,
    expectedOutput: "1",
    hint: "Just print the status value"
  },
  {
    id: 5,
    title: "Bytes and Byte Arrays",
    theory: `
      <h3>Bytes - Raw Data Storage 💾</h3>
      <p>Bytes are used for raw data, cryptographic operations, and gas optimization!</p>
      <h4>Fixed Bytes:</h4>
      <pre>contract ByteStorage {
    bytes32 public hash;        // 32 bytes fixed
    bytes32 public secretKey;
    bytes4 public selector;     // Function selector
}</pre>
      <h4>Dynamic Bytes:</h4>
      <pre>contract DynamicBytes {
    bytes public data;  // Dynamic size

    function store(bytes memory _data) public {
        data = _data;
    }
}</pre>
      <h4>Common Uses:</h4>
      <ul>
        <li><code>bytes32</code> - Hashes (keccak256)</li>
        <li><code>bytes4</code> - Function signatures</li>
        <li><code>bytes</code> - Dynamic raw data</li>
        <li>More gas-efficient than string</li>
      </ul>
      <h4>Example:</h4>
      <pre>bytes32 public constant ADMIN_ROLE = keccak256("ADMIN");</pre>
    `,
    task: "Create a variable `dataHash` with value '0x1234'. Print its length (4 characters after 0x means 2 bytes).",
    starterCode: "# Simulate bytes32 hash\ndataHash = '0x1234'\n\n# Print length (exclude '0x')\n",
    solution: `dataHash = '0x1234'
length = len(dataHash) - 2
print(length)`,
    expectedOutput: "4",
    hint: "Length is len(dataHash) - 2 to exclude '0x'"
  }
];

const SolidityDataTypes = ({ walletAddress, onComplete, connex }) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState(new Set());
  const [showHint, setShowHint] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const module = SOLIDITY_DATA_MODULES[currentModule];
  const progress = (completedModules.size / SOLIDITY_DATA_MODULES.length) * 100;

  const handleSuccess = () => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(currentModule);
    setCompletedModules(newCompleted);
    setShowHint(false);

    if (newCompleted.size === SOLIDITY_DATA_MODULES.length) {
      setCourseCompleted(true);
      // Don't call onComplete() here - let user claim reward first
    }
  };

  const goToNextModule = () => {
    if (currentModule < SOLIDITY_DATA_MODULES.length - 1) {
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
        courseName="Solidity Data Types"
        courseId="solidity-data-types"
        moduleCount={SOLIDITY_DATA_TYPE_MODULES.length}
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
          <h1>Solidity Data Types & Structs</h1>
          <p>Interactive Course</p>
        </div>
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-text">
            {completedModules.size} / {SOLIDITY_DATA_MODULES.length} modules
          </span>
        </div>
      </div>

      <div className="module-nav">
        {SOLIDITY_DATA_MODULES.map((mod, idx) => (
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
          disabled={!completedModules.has(currentModule) || currentModule === SOLIDITY_DATA_MODULES.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default SolidityDataTypes;
