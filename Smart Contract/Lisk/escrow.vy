# pragma version ^0.3.0


# creator of the escrow - most likely the party paying for the service
sender: address

# the party rendering the service
receiver: address

# the admin to verify the service was rendered and authorize the payment
adminstrator: address

order_id: String[128]

claim_date: uint256

expiry_date: uint256

authorized: HashMap[address, bool]

event escrow_create:
    sender: address
    order_id: String[128]
    adminstrator: address
    amount: uint256
    receiver: address
    claim_date: uint256
    expiry_date: uint256

event deposit:
    sender: address
    amount: uint256

event escrow_claim:
    sender: address
    amount: uint256

event escrow_cancel:
    sender: address
    amount: uint256

event authorize:
    sender: address
    target: address
    state: bool

# 
@payable
@external
def __init__(_order_id: String[128], _receiver: address, _adminstrator: address, _claim_date: uint256, _expiry_date: uint256):
    # assert _claim_date > block.timestamp, "claim date is in the past"
    # assert _expiry_date > block.timestamp, "expiry date is in the past"
    assert _expiry_date > _claim_date, "error, expiry date cannot be earlier than claim date"
    self.sender = msg.sender
    self.receiver = _receiver
    self.order_id = _order_id
    self.adminstrator = _adminstrator
    self.claim_date = block.timestamp + _claim_date
    self.expiry_date = block.timestamp + _expiry_date
    self.authorized[_adminstrator] = True
    self.authorized[msg.sender] = False
    self.authorized[_receiver] = False
    log escrow_create(msg.sender, _order_id, _adminstrator, msg.value, _receiver, self.claim_date, self.expiry_date)


@nonreentrant("lock")
@external
def authorize_call(target: address, state: bool):
    assert msg.sender == self.adminstrator, "only the adminstrator can call this function"
    self.authorized[target] = state
    log authorize(msg.sender, target, state)
    

@nonreentrant("lock1")
@external
def claim_escrow():
    assert self.authorized[msg.sender], "not authorized to claim escrow"
    assert block.timestamp > self.claim_date, "too early to claim"
    assert block.timestamp < self.expiry_date, "too late to claim, can only cancel escrow"
    send(self.adminstrator, self.balance * 10 / 100)
    send(msg.sender, self.balance)
    log escrow_claim(msg.sender, self.balance)

    
@nonreentrant("lock2")
@external
def cancel_escrow():
    assert self.authorized[msg.sender], "not authorized to cancel escrow"
    assert block.timestamp > self.expiry_date, "unable to cancel escrow, expiry date not reached"
    send(self.adminstrator, self.balance * 10 / 100)
    send(msg.sender, self.balance)
    log escrow_cancel(msg.sender, self.balance)
    

@external
def amount_in_escrow() -> uint256:
    return self.balance

@payable
@external
def __default__():
    log deposit(msg.sender, msg.value)