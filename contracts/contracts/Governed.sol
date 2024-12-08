// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { TransferHelper } from "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";

contract Governed {
    uint256 public X;
    uint256 public Y;
    uint256 public Z;

    address public governor;
    address public owner;

    event XChanged(uint256 X);
    event YChanged(uint256 Y);
    event ZChanged(uint256 Z);

    constructor(
        address _governor,
        uint256 _X,
        uint256 _Y,
        uint256 _Z
    ) {
        governor = _governor;
        X = _X;
        Y = _Y;
        Z = _Z;
        owner = msg.sender;
    }

    modifier onlyOwnerOrGovernor() {
        require(
            msg.sender == owner || msg.sender == governor,
            "RaffleExtended: Caller is not the owner or governor"
        );
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "RaffleExtended: Caller is not the owner");
        _;
    }

    function setGovernor(address _governor) public onlyOwner {
        governor = _governor;
    }

    function setX(uint256 _X) public onlyOwnerOrGovernor {
        X = _X;
        emit XChanged(_X);
    }

    function setY(uint256 _Y) public onlyOwnerOrGovernor {
        Y = _Y;
        emit YChanged(_Y);
    }

    function setZ(uint256 _Z) public onlyOwnerOrGovernor {
        Z = _Z;
        emit ZChanged(_Z);
    }
}
