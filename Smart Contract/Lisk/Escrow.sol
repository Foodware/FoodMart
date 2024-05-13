pragma solidity ^0.8.0;

contract Escrow {
    address public sender;
        address public receiver;
            address public administrator;
                string public order_id;
                    uint public claim_date;
                        uint public expiry_date;
                            mapping (address => bool) public authorized;

                                event EscrowCreate(address indexed sender, string order_id, address administrator, uint amount, address receiver, uint claim_date, uint expiry_date);
                                    event Deposit(address indexed sender, uint amount);
                                        event EscrowClaim(address indexed sender, uint amount);
                                            event EscrowCancel(address indexed sender, uint amount);
                                                event Authorize(address indexed sender, address target, bool state);

                                                    constructor(string memory _order_id, address _receiver, address _administrator, uint _claim_date, uint _expiry_date) payable {
                                                            require(block.timestamp < _claim_date, "claim date is in the past");
                                                                    require(block.timestamp < _expiry_date, "expiry date is in the past");
                                                                            require(_expiry_date > _claim_date, "error, expiry date cannot be earlier than claim date");

                                                                                    sender = msg.sender;
                                                                                            receiver = _receiver;
                                                                                                    order_id = _order_id;
                                                                                                            administrator = _administrator;
                                                                                                                    claim_date = block.timestamp + _claim_date;
                                                                                                                            expiry_date = block.timestamp + _expiry_date;
                                                                                                                                    authorized[administrator] = true;
                                                                                                                                            authorized[msg.sender] = false;
                                                                                                                                                    authorized[_receiver] = false;

                                                                                                                                                            emit EscrowCreate(msg.sender, _order_id, _administrator, msg.value, _receiver, claim_date, expiry_date);
                                                                                                                                                                }

                                                                                                                                                                    modifier nonReentrant(string memory lock) {
                                                                                                                                                                            require(!locked[lock], "Reentrancy detected");
                                                                                                                                                                                    locked[lock] = true;
                                                                                                                                                                                            _;
                                                                                                                                                                                                    locked[lock] = false;
                                                                                                                                                                                                        }

                                                                                                                                                                                                            mapping (string => bool) public locked;

                                                                                                                                                                                                                function authorize_call(address target, bool state) external nonReentrant("lock") {
                                                                                                                                                                                                                        require(msg.sender == administrator, "only the administrator can call this function");
                                                                                                                                                                                                                                authorized[target] = state;
                                                                                                                                                                                                                                        emit Authorize(msg.sender, target, state);
                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                function claim_escrow() external nonReentrant("lock1") {
                                                                                                                                                                                                                                                        require(authorized[msg.sender], "not authorized to claim escrow");
                                                                                                                                                                                                                                                                require(block.timestamp > claim_date, "too early to claim");
                                                                                                                                                                                                                                                                        require(block.timestamp < expiry_date, "too late to claim, can only cancel escrow");

                                                                                                                                                                                                                                                                                uint amount = address(this).balance;
                                                                                                                                                                                                                                                                                        payable(administrator).transfer(amount * 10 / 100);
                                                                                                                                                                                                                                                                                                payable(msg.sender).transfer(amount);
                                                                                                                                                                                                                                                                                                        emit EscrowClaim(msg.sender, amount);
                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                function cancel_escrow() external nonReentrant("lock2") {
                                                                                                                                                                                                                                                                                                                        require(authorized[msg.sender], "not authorized to cancel escrow");
                                                                                                                                                                                                                                                                                                                                require(block.timestamp > expiry_date, "unable to cancel escrow, expiry date not reached");

                                                                                                                                                                                                                                                                                                                                        uint amount = address(this).balance;
                                                                                                                                                                                                                                                                                                                                                payable(administrator).transfer(amount * 10 / 100);
                                                                                                                                                                                                                                                                                                                                                        payable(msg.sender).transfer(amount);
                                                                                                                                                                                                                                                                                                                                                                emit EscrowCancel(msg.sender, amount);
                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                        function amount_in_escrow() external view returns (uint) {
                                                                                                                                                                                                                                                                                                                                                                                return address(this).balance;
                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                        receive() external payable {
                                                                                                                                                                                                                                                                                                                                                                                                emit Deposit(msg.sender, msg.value);
                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                    }