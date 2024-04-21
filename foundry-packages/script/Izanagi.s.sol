// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import {Script, console2} from "forge-std/Script.sol";
import {Izanagi} from "../src/Izanagi.sol";

contract IzanagiScript is Script {
    Izanagi public izanagi;

    function run() public {
        uint256 deployerPk = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPk);

        // Deploy the contract
        izanagi = new Izanagi();

        // //call the function
        // izanagi.verifyProof(abi.encodePacked("proof"), ["publicInputs"]);
    }
}
