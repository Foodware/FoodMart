# Notice 
The Smart Contract above is a test code deployed on Lisk L2 Testnet, it is not audited and is not recommended for industrial production yet.

It is escrow Contract that allows users to transact with vendors Peer-to-Peer as well as allowing Foodware the Moderation process via the administrator Address field and authorize function.

## Example Contract 
We deployed a contract on Lisk to show case our code and the Contract Address is [0x85D8CcabaDCa83ECB5aDA79D2c68288abf0888A4](https://sepolia-blockscout.lisk.com/address/0x85D8CcabaDCa83ECB5aDA79D2c68288abf0888A4?tab=contract)

The Claim date is *Block Number* - **6491000** (30 days from 14th May 2024)

The Expiry Datevis *Bloock Number* - **6923000** (40 days from 14th May 2024)

The smart contract is written in Vyper and Solidity. They have their respective .abi and .bin files.

The Contract will delivery 0.09 Ether to the receiver, and 0.01 Ether to the admin after claim date if either the receiver or sender are authorised by the admin, and they call the escrow claim function.
