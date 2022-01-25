// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.9.0;

contract NoReceieve {

  address owner;

  constructor() {
    owner = msg.sender;
  }

  function get_banance() public returns (uint256) {
    return address(this).balance;
  }
}
