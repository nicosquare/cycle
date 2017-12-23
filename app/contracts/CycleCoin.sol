pragma solidity ^0.4.13;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';

contract CycleCoin is MintableToken {
  string public name = "CYCLE COIN";
  string public symbol = "CLE";
  uint8 public decimals = 18;
}
