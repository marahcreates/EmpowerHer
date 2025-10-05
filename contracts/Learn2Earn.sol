// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Interface for VeBetterDAO X2EarnRewardsPool
interface IX2EarnRewardsPool {
    function distributeReward(
        bytes32 appId,
        uint256 amount,
        address receiver,
        string memory proof
    ) external;
    
    function availableFunds(bytes32 appId) external view returns (uint256);
}

contract Learn2Earn {

    // The address of the registrar (contract creator)
    address private registrar;

    // The name of the university
    string public institute;
    
    // VeBetterDAO integration
    IX2EarnRewardsPool public x2EarnRewardsPoolContract;
    bytes32 public appId;
    uint256 public rewardAmount = 10 * 10**18; // 10 B3TR tokens per approved submission

    // Structure to store student information
    struct Student {
        address wallet;         // Student's wallet address
        bool registered;        // True if student is registered
        bool graduated;         // True if student has graduated
        bytes32 certificate;    // Certificate hash (created when student graduates)
    }

    // Structure to store user profile information
    struct UserProfile {
        string profilePicture;  // IPFS hash or URL to profile picture
        string bio;             // User biography
        string experience;      // Professional experience
        string skills;          // Skills list
        bool lookingForReferral; // True if user is looking for job referral
        bool profileCreated;    // True if profile has been created
        bool accountDeleted;    // True if user deleted their account
    }

    // Mapping from wallet address to student data
    mapping(address => Student) public students;

    // Mapping from wallet address to user profile
    mapping(address => UserProfile) public profiles;

    // Mapping to track completed courses per student: student => courseId => completed
    mapping(address => mapping(string => bool)) public completedCourses;

    // Structure to store referral information
    struct Referral {
        address referrer;       // Person who gave the referral
        address referee;        // Person who received the referral
        uint256 timestamp;      // When the referral was made
        bool confirmed;         // True if referee confirmed the referral
        bool rewardClaimed;     // True if referrer claimed the reward
    }

    // Mapping to track referrals: referee => array of referrals they received
    mapping(address => Referral[]) public referralsReceived;

    // Mapping to track referrals given: referrer => array of referrals they gave
    mapping(address => Referral[]) public referralsGiven;

    // Referral reward amount (5 B3TR tokens)
    uint256 public referralRewardAmount = 5 * 10**18;

    // Event triggered when a certificate is issued
    event CertificateIssued(string institute, bytes32 certificateHash, address student);

    // Event triggered when a course is completed correctly
    event CourseCompleted(address indexed user, string courseId);

    // Event triggered when rewards are distributed
    event RewardDistributed(address indexed user, uint256 amount);

    // Event triggered when a profile is created or updated
    event ProfileUpdated(address indexed user, bool lookingForReferral);

    // Event triggered when a referral is made
    event ReferralMade(address indexed referrer, address indexed referee, uint256 timestamp);

    // Event triggered when a referral is confirmed
    event ReferralConfirmed(address indexed referrer, address indexed referee, uint256 timestamp);

    // Event triggered when referral reward is claimed
    event ReferralRewardClaimed(address indexed referrer, address indexed referee, uint256 amount);

    // Set the university name, registrar, and VeBetterDAO details when contract is deployed
    constructor(
        string memory _institute,
        address _x2EarnRewardsPoolContract,
        bytes32 _appId
    ) {
        registrar = msg.sender;
        institute = _institute;
        x2EarnRewardsPoolContract = IX2EarnRewardsPool(_x2EarnRewardsPoolContract);
        appId = _appId;
    }

    // Function for students to register by paying 1 VET
    function addStudent() public payable {
        require(msg.value == 1 ether, "You must pay 1 VET to register.");

        // Make sure the student isn't already registered
        require(!students[msg.sender].registered, "You are already registered.");

        // Create a new student record
        students[msg.sender] = Student({
            wallet: msg.sender,
            registered: true,
            graduated: false,
            certificate: 0
        });
    }

    function _checkStudent(address studentAddress) view private returns (bool){
        Student storage student = students[studentAddress];
        require(student.registered, "This person is not a registered student.");
        return true;
    }

    // Function for students to complete a course and claim reward
    function completeCourse(string memory courseId) public {
        require(students[msg.sender].registered, "You must be a registered student.");
        require(!completedCourses[msg.sender][courseId], "You have already completed this course.");

        // Mark course as completed
        completedCourses[msg.sender][courseId] = true;

        // Distribute VeBetterDAO rewards
        _distributeReward(msg.sender, courseId);

        // Emit event
        emit CourseCompleted(msg.sender, courseId);
    }

    // Internal function to distribute VeBetterDAO rewards
    function _distributeReward(address studentAddress, string memory courseId) private {
        require(rewardAmount > 0, "Reward amount must be greater than 0");
        require(
            rewardAmount <= x2EarnRewardsPoolContract.availableFunds(appId),
            "Insufficient funds in rewards pool"
        );

        // Create proof string
        string memory proof = string(abi.encodePacked(
            '{"type":"education","course":"',
            courseId,
            '","institute":"',
            institute,
            '"}'
        ));

        // Call VeBetterDAO to distribute rewards
        x2EarnRewardsPoolContract.distributeReward(
            appId,
            rewardAmount,
            studentAddress,
            proof
        );

        emit RewardDistributed(studentAddress, rewardAmount);
    }

    // Registrar can mark a student as graduated
    function issueCertificate(address studentAddress) public {
        require(msg.sender == registrar, "Only the registrar can issue certificates.");

        if (_checkStudent(studentAddress)){
            Student storage student = students[studentAddress];
            require(!student.graduated, "This student has already graduated.");

            // Create a certificate and mark as graduated
            student.certificate = keccak256(abi.encodePacked(block.timestamp, student.wallet));
            student.graduated = true;

            // Emit event
            emit CertificateIssued(institute, student.certificate, student.wallet);
        }
    }

    // Check if a student has graduated
    function isGraduated(address studentAddress) public view returns (bool) {
        return students[studentAddress].graduated;
    }

    // Check if a student has completed a specific course
    function isCourseCompleted(address studentAddress, string memory courseId) public view returns (bool) {
        return completedCourses[studentAddress][courseId];
    }

    // Get available funds in the rewards pool
    function getAvailableFunds() public view returns (uint256) {
        return x2EarnRewardsPoolContract.availableFunds(appId);
    }

    // Registrar can set reward amount
    function setRewardAmount(uint256 _amount) public {
        require(msg.sender == registrar, "Only the registrar can set reward amount.");
        require(_amount > 0, "Amount must be greater than 0.");
        rewardAmount = _amount;
    }

    // Registrar can update app ID
    function updateAppId(bytes32 _appId) public {
        require(msg.sender == registrar, "Only the registrar can update app ID.");
        appId = _appId;
    }

    // Registrar can withdraw collected VET from student registrations
    function withdrawBalance() public {
        require(msg.sender == registrar, "Only the registrar can withdraw.");
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw.");
        (bool success, ) = payable(registrar).call{value: balance}("");
        require(success, "Transfer failed.");
    }

    // Function to create or update user profile
    function updateProfile(
        string memory _profilePicture,
        string memory _bio,
        string memory _experience,
        string memory _skills,
        bool _lookingForReferral
    ) public {
        require(students[msg.sender].registered, "You must be a registered student to create a profile.");

        profiles[msg.sender] = UserProfile({
            profilePicture: _profilePicture,
            bio: _bio,
            experience: _experience,
            skills: _skills,
            lookingForReferral: _lookingForReferral,
            profileCreated: true,
            accountDeleted: false
        });

        emit ProfileUpdated(msg.sender, _lookingForReferral);
    }

    // Function to delete account (clears profile and marks as deleted)
    function deleteAccount() public {
        require(students[msg.sender].registered, "You must be a registered student.");
        require(profiles[msg.sender].profileCreated, "No profile to delete.");

        profiles[msg.sender] = UserProfile({
            profilePicture: '',
            bio: '',
            experience: '',
            skills: '',
            lookingForReferral: false,
            profileCreated: false,
            accountDeleted: true
        });

        emit ProfileUpdated(msg.sender, false);
    }

    // Get user's completed courses
    function getCompletedCourses(address studentAddress) public view returns (string[] memory) {
        // All possible course IDs
        string[18] memory allCourses = [
            "python-basics", "javascript-intro", "java-fundamentals", "cpp-basics", "data-structures", "algorithms",
            "html-basics", "css-styling", "react-intro", "nodejs-backend", "rest-apis", "fullstack-app",
            "blockchain-basics", "cryptocurrency", "smart-contracts", "solidity-basics", "defi-fundamentals", "nft-development"
        ];

        // Count completed courses
        uint256 count = 0;
        for (uint256 i = 0; i < allCourses.length; i++) {
            if (completedCourses[studentAddress][allCourses[i]]) {
                count++;
            }
        }

        // Create array of completed courses
        string[] memory completed = new string[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < allCourses.length; i++) {
            if (completedCourses[studentAddress][allCourses[i]]) {
                completed[index] = allCourses[i];
                index++;
            }
        }

        return completed;
    }

    // Get user profile
    function getProfile(address userAddress) public view returns (
        string memory profilePicture,
        string memory bio,
        string memory experience,
        string memory skills,
        bool lookingForReferral,
        bool profileCreated,
        bool accountDeleted
    ) {
        UserProfile memory profile = profiles[userAddress];
        return (
            profile.profilePicture,
            profile.bio,
            profile.experience,
            profile.skills,
            profile.lookingForReferral,
            profile.profileCreated,
            profile.accountDeleted
        );
    }

    // Function to refer someone (called by referrer)
    function referUser(address _referee) public {
        require(students[msg.sender].registered, "You must be a registered student to refer.");
        require(students[_referee].registered, "Referee must be a registered student.");
        require(msg.sender != _referee, "You cannot refer yourself.");
        require(profiles[_referee].lookingForReferral, "This user is not looking for referrals.");

        Referral memory newReferral = Referral({
            referrer: msg.sender,
            referee: _referee,
            timestamp: block.timestamp,
            confirmed: false,
            rewardClaimed: false
        });

        referralsReceived[_referee].push(newReferral);
        referralsGiven[msg.sender].push(newReferral);

        emit ReferralMade(msg.sender, _referee, block.timestamp);
    }

    // Function to confirm a referral (called by referee)
    function confirmReferral(address _referrer) public {
        require(students[msg.sender].registered, "You must be a registered student.");

        Referral[] storage received = referralsReceived[msg.sender];
        bool found = false;
        uint256 referralIndex;

        // Find the referral from this referrer
        for (uint256 i = 0; i < received.length; i++) {
            if (received[i].referrer == _referrer && !received[i].confirmed) {
                found = true;
                referralIndex = i;
                break;
            }
        }

        require(found, "No pending referral from this address.");

        // Update the referral in both mappings
        referralsReceived[msg.sender][referralIndex].confirmed = true;

        // Find and update in referrer's given list
        Referral[] storage given = referralsGiven[_referrer];
        for (uint256 i = 0; i < given.length; i++) {
            if (given[i].referee == msg.sender && !given[i].confirmed) {
                referralsGiven[_referrer][i].confirmed = true;
                break;
            }
        }

        emit ReferralConfirmed(_referrer, msg.sender, block.timestamp);
    }

    // Function to claim referral reward (called by referrer)
    function claimReferralReward(address _referee) public {
        require(students[msg.sender].registered, "You must be a registered student.");

        Referral[] storage given = referralsGiven[msg.sender];
        bool found = false;
        uint256 referralIndex;

        // Find the confirmed referral
        for (uint256 i = 0; i < given.length; i++) {
            if (given[i].referee == _referee && given[i].confirmed && !given[i].rewardClaimed) {
                found = true;
                referralIndex = i;
                break;
            }
        }

        require(found, "No confirmed referral to claim reward for.");
        require(referralRewardAmount > 0, "Reward amount must be greater than 0");
        require(
            referralRewardAmount <= x2EarnRewardsPoolContract.availableFunds(appId),
            "Insufficient funds in rewards pool"
        );

        // Mark as claimed
        referralsGiven[msg.sender][referralIndex].rewardClaimed = true;

        // Update in referee's received list
        Referral[] storage received = referralsReceived[_referee];
        for (uint256 i = 0; i < received.length; i++) {
            if (received[i].referrer == msg.sender && received[i].confirmed && !received[i].rewardClaimed) {
                referralsReceived[_referee][i].rewardClaimed = true;
                break;
            }
        }

        // Create proof string
        string memory proof = string(abi.encodePacked(
            '{"type":"referral","referrer":"',
            toAsciiString(msg.sender),
            '","referee":"',
            toAsciiString(_referee),
            '"}'
        ));

        // Distribute reward
        x2EarnRewardsPoolContract.distributeReward(
            appId,
            referralRewardAmount,
            msg.sender,
            proof
        );

        emit ReferralRewardClaimed(msg.sender, _referee, referralRewardAmount);
    }

    // Get all referrals received by a user
    function getReferralsReceived(address userAddress) public view returns (Referral[] memory) {
        return referralsReceived[userAddress];
    }

    // Get all referrals given by a user
    function getReferralsGiven(address userAddress) public view returns (Referral[] memory) {
        return referralsGiven[userAddress];
    }

    // Get all users looking for referrals (with profiles)
    function getUsersLookingForReferrals() public view returns (address[] memory) {
        // First, count how many users are looking for referrals
        uint256 count = 0;
        address[] memory allStudents = new address[](1000); // Temporary array, assuming max 1000 students

        // This is a simplified version - in production, you'd track registered students separately
        // For now, we return empty array as we can't iterate all addresses
        address[] memory result = new address[](0);
        return result;
    }

    // Helper function to convert address to string
    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }

    // Registrar can set referral reward amount
    function setReferralRewardAmount(uint256 _amount) public {
        require(msg.sender == registrar, "Only the registrar can set referral reward amount.");
        require(_amount > 0, "Amount must be greater than 0.");
        referralRewardAmount = _amount;
    }
}