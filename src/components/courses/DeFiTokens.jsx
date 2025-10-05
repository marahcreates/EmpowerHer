import CourseCompletion from '../CourseCompletion';
import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import '../styles/PythonBasics.css';

const DEFI_TOKENS_MODULES = [
  {
    id: 1,
    title: "ERC20 Token Standard",
    theory: `
      <h3>ERC20 - Fungible Tokens 🪙</h3>
      <p>ERC20 is the most popular token standard. Every token is identical and interchangeable!</p>
      <h4>Core Functions:</h4>
      <pre>interface IERC20 {
    function totalSupply() external view returns (uint);
    function balanceOf(address account) external view returns (uint);
    function transfer(address to, uint amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint);
    function approve(address spender, uint amount) external returns (bool);
    function transferFrom(address from, address to, uint amount) external returns (bool);
}</pre>
      <h4>Key Concepts:</h4>
      <ul>
        <li><strong>totalSupply:</strong> Total tokens in existence</li>
        <li><strong>balanceOf:</strong> Tokens owned by address</li>
        <li><strong>transfer:</strong> Send tokens</li>
        <li><strong>approve/transferFrom:</strong> Delegated transfers</li>
      </ul>
      <h4>Use Cases:</h4>
      <p>Stablecoins, governance tokens, utility tokens, wrapped tokens</p>
    `,
    task: "Simulate ERC20 balance. Create `balances = {'Alice': 1000, 'Bob': 500}`. Print Alice's balance.",
    starterCode: "# Simulate ERC20 balances\nbalances = {'Alice': 1000, 'Bob': 500}\n\n# Print Alice's balance\n",
    solution: `balances = {'Alice': 1000, 'Bob': 500}
print(balances['Alice'])`,
    expectedOutput: "1000",
    hint: "Access with balances['Alice']"
  },
  {
    id: 2,
    title: "ERC721 NFT Standard",
    theory: `
      <h3>ERC721 - Non-Fungible Tokens 🖼️</h3>
      <p>ERC721 tokens are unique. Each token has a distinct ID and can represent ownership of unique items!</p>
      <h4>Core Functions:</h4>
      <pre>interface IERC721 {
    function ownerOf(uint tokenId) external view returns (address);
    function safeTransferFrom(address from, address to, uint tokenId) external;
    function transferFrom(address from, address to, uint tokenId) external;
    function approve(address to, uint tokenId) external;
    function getApproved(uint tokenId) external view returns (address);
}</pre>
      <h4>Key Differences from ERC20:</h4>
      <ul>
        <li>Each token is unique (tokenId)</li>
        <li>No decimals or amounts</li>
        <li>ownerOf instead of balanceOf</li>
        <li>Metadata (tokenURI) for properties</li>
      </ul>
      <h4>Use Cases:</h4>
      <p>Digital art, collectibles, gaming items, real estate, tickets</p>
    `,
    task: "Simulate NFT ownership. Create `nftOwners = {1: 'Alice', 2: 'Bob', 3: 'Alice'}`. Print owner of token 2.",
    starterCode: "# Simulate ERC721 ownership\nnftOwners = {1: 'Alice', 2: 'Bob', 3: 'Alice'}\n\n# Print owner of token 2\n",
    solution: `nftOwners = {1: 'Alice', 2: 'Bob', 3: 'Alice'}
print(nftOwners[2])`,
    expectedOutput: "Bob",
    hint: "Access with nftOwners[2]"
  },
  {
    id: 3,
    title: "Token Minting & Burning",
    theory: `
      <h3>Minting & Burning Tokens 🔥</h3>
      <p>Minting creates new tokens, burning destroys them. Critical for supply management!</p>
      <h4>Minting:</h4>
      <pre>contract MyToken is ERC20 {
    function mint(address to, uint amount) public onlyOwner {
        _mint(to, amount);
    }
}

// Internal function
function _mint(address account, uint amount) internal {
    totalSupply += amount;
    balances[account] += amount;
    emit Transfer(address(0), account, amount);
}</pre>
      <h4>Burning:</h4>
      <pre>function burn(uint amount) public {
    require(balances[msg.sender] >= amount);
    balances[msg.sender] -= amount;
    totalSupply -= amount;
    emit Transfer(msg.sender, address(0), amount);
}</pre>
      <h4>Use Cases:</h4>
      <ul>
        <li><strong>Mint:</strong> Rewards, ICO, staking</li>
        <li><strong>Burn:</strong> Deflation, fees, buybacks</li>
      </ul>
    `,
    task: "Simulate minting. Create `supply = 1000`, `mintAmount = 500`. Add them and print new supply.",
    starterCode: "# Simulate token minting\nsupply = 1000\nmintAmount = 500\n\n# Calculate and print new supply\n",
    solution: `supply = 1000
mintAmount = 500
supply = supply + mintAmount
print(supply)`,
    expectedOutput: "1500",
    hint: "Add mintAmount to supply"
  },
  {
    id: 4,
    title: "DeFi Basics - Staking",
    theory: `
      <h3>Staking - Earn While You Hold 💎</h3>
      <p>Staking lets users lock tokens to earn rewards. Core DeFi primitive!</p>
      <h4>Basic Staking Contract:</h4>
      <pre>contract Staking {
    mapping(address => uint) public stakedBalance;
    mapping(address => uint) public stakingTimestamp;

    function stake(uint amount) public {
        token.transferFrom(msg.sender, address(this), amount);
        stakedBalance[msg.sender] += amount;
        stakingTimestamp[msg.sender] = block.timestamp;
    }

    function calculateReward(address user) public view returns (uint) {
        uint duration = block.timestamp - stakingTimestamp[user];
        uint rate = 10; // 10% APY
        return (stakedBalance[user] * rate * duration) / (365 days * 100);
    }
}</pre>
      <h4>Key Components:</h4>
      <ul>
        <li>Lock tokens in contract</li>
        <li>Track staking time</li>
        <li>Calculate rewards based on time</li>
        <li>Withdraw principal + rewards</li>
      </ul>
    `,
    task: "Simulate staking. Create `staked = 1000`, `rewardRate = 10`. Calculate reward as staked * rewardRate / 100. Print reward.",
    starterCode: "# Simulate staking reward\nstaked = 1000\nrewardRate = 10\n\n# Calculate and print reward\n",
    solution: `staked = 1000
rewardRate = 10
reward = staked * rewardRate / 100
print(int(reward))`,
    expectedOutput: "100",
    hint: "Calculate: staked * rewardRate / 100"
  },
  {
    id: 5,
    title: "DEX & Liquidity Pools",
    theory: `
      <h3>DEX - Decentralized Exchanges 🔄</h3>
      <p>DEXs use liquidity pools and automated market makers (AMM) instead of order books!</p>
      <h4>Constant Product Formula:</h4>
      <pre>// Uniswap V2 formula: x * y = k
// x = token A reserve
// y = token B reserve
// k = constant

function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut)
    public pure returns (uint) {
    uint amountInWithFee = amountIn * 997; // 0.3% fee
    uint numerator = amountInWithFee * reserveOut;
    uint denominator = (reserveIn * 1000) + amountInWithFee;
    return numerator / denominator;
}</pre>
      <h4>Liquidity Pool Concepts:</h4>
      <ul>
        <li><strong>Add Liquidity:</strong> Deposit token pairs</li>
        <li><strong>Swap:</strong> Exchange tokens</li>
        <li><strong>Remove Liquidity:</strong> Withdraw + fees</li>
        <li><strong>LP Tokens:</strong> Proof of pool ownership</li>
      </ul>
      <h4>Popular DEXs:</h4>
      <p>Uniswap, SushiSwap, PancakeSwap, Curve</p>
    `,
    task: "Simulate swap. Create `reserveA = 1000`, `reserveB = 2000`, `amountIn = 100`. Calculate output: (amountIn * reserveB) / (reserveA + amountIn). Print int result.",
    starterCode: "# Simulate simple swap formula\nreserveA = 1000\nreserveB = 2000\namountIn = 100\n\n# Calculate output and print\n",
    solution: `reserveA = 1000
reserveB = 2000
amountIn = 100
output = (amountIn * reserveB) / (reserveA + amountIn)
print(int(output))`,
    expectedOutput: "181",
    hint: "Formula: (amountIn * reserveB) / (reserveA + amountIn)"
  }
];

const DeFiTokens = ({ walletAddress, onComplete, connex }) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState(new Set());
  const [showHint, setShowHint] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const module = DEFI_TOKENS_MODULES[currentModule];
  const progress = (completedModules.size / DEFI_TOKENS_MODULES.length) * 100;

  const handleSuccess = () => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(currentModule);
    setCompletedModules(newCompleted);
    setShowHint(false);

    if (newCompleted.size === DEFI_TOKENS_MODULES.length) {
      setCourseCompleted(true);
      // Don't call onComplete() here - let user claim reward first
    }
  };

  const goToNextModule = () => {
    if (currentModule < DEFI_TOKENS_MODULES.length - 1) {
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
        courseName="DeFi Tokens"
        courseId="defi-tokens"
        moduleCount={DEFI_MODULES.length}
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
          <h1>DeFi & Token Standards</h1>
          <p>Interactive Course</p>
        </div>
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-text">
            {completedModules.size} / {DEFI_TOKENS_MODULES.length} modules
          </span>
        </div>
      </div>

      <div className="module-nav">
        {DEFI_TOKENS_MODULES.map((mod, idx) => (
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
          disabled={!completedModules.has(currentModule) || currentModule === DEFI_TOKENS_MODULES.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default DeFiTokens;
