// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    // State variables
    address public sender;
    address public receiver;
    address public administrator;
    string public order_id;
    uint public claim_block;
    uint public expiry_block;
    mapping (address => bool) public authorized;
    mapping (string => bool) public locked;

    // Events
    event EscrowCreate(address indexed sender, string order_id, address administrator, uint amount, address receiver, uint claim_block, uint expiry_block);
    event Deposit(address indexed sender, uint amount);
    event EscrowClaim(address indexed sender, uint amount);
    event EscrowCancel(address indexed sender, uint amount);
    event Authorize(address indexed sender, address target, bool state);

    // Constructor
    constructor(string memory _order_id, address _receiver, address _administrator, uint _claim_block, uint _expiry_block) payable {
        require(block.number < _claim_block, "claim block is in the past");
        require(block.number < _expiry_block, "expiry block is in the past");
        require(_expiry_block > _claim_block, "error, expiry block cannot be earlier than claim block");
        
        sender = msg.sender;
        receiver = _receiver;
        order_id = _order_id;
        administrator = _administrator;
        claim_block = _claim_block;
        expiry_block = _expiry_block;
        
        authorized[administrator] = true;
        authorized[msg.sender] = false;
        authorized[_receiver] = false;
        
        emit EscrowCreate(msg.sender, _order_id, _administrator, msg.value, _receiver, _claim_block, _expiry_block);
    }

    // Modifier to prevent reentrancy
    modifier nonReentrant(string memory lock) {
        require(!locked[lock], "Reentrancy detected");
        locked[lock] = true;
        _;
        locked[lock] = false;
    }

    // Function to authorize or revoke authorization for an address
    function authorize_call(address target, bool state) external nonReentrant("lock") {
        require(msg.sender == administrator, "only the administrator can call this function");
        authorized[target] = state;
        emit Authorize(msg.sender, target, state);
    }

    // Function to claim escrowed funds
    function claim_escrow() external nonReentrant("lock1") {
        require(authorized[msg.sender], "not authorized to claim escrow");
        require(block.number >= claim_block, "too early to claim");
        require(block.number < expiry_block, "too late to claim, can only cancel escrow");
        
        uint amount = address(this).balance;
        payable(administrator).transfer(amount * 10 / 100);
        payable(msg.sender).transfer(amount);
        
        emit EscrowClaim(msg.sender, amount);
    }

    // Function to cancel escrow
    function cancel_escrow() external nonReentrant("lock2") {
        require(authorized[msg.sender], "not authorized to cancel escrow");
        require(block.number >= expiry_block, "unable to cancel escrow, expiry block not reached");
        
        uint amount = address(this).balance;
        payable(administrator).transfer(amount * 10 / 100);
        payable(msg.sender).transfer(amount);
        
        emit EscrowCancel(msg.sender, amount);
    }

    // Function to get the amount of funds in escrow
    function amount_in_escrow() external view returns (uint) {
        return address(this).balance;
    }

    // Fallback function to accept incoming payments
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }
}
