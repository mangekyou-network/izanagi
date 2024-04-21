// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/test.sol";
import {Izanagi} from "../src/Izanagi.sol";

contract IzanagiTest is Test {

    Izanagi izanagi;

    function setUp() public {
         izanagi = new Izanagi();
    }

    function testVerifyProof() public {
        bytes memory proof = "0x1234";
        bytes32[] memory publicInputs = new bytes32[](1);
        assertTrue(izanagi.verifyProof(proof, publicInputs));
    }
}
