// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import {PlonkVerifier} from "./plonk_vk.sol";

contract Izanagi {
    PlonkVerifier public plonkVerifier;
    mapping(bytes32 => bool) public proofs;

    function verifyProof(bytes calldata _proof, bytes32[] memory _publicInputs) public returns (bool) {
        bytes32 proofId = keccak256(abi.encodePacked(_proof, _publicInputs));

        // to save gas : if the proof is already verified, return true
        if (proofs[proofId]) {
            return proofs[proofId];
        }

        bool verified = plonkVerifier.verify(_proof, _publicInputs);

        if (verified) {
            proofs[proofId] = true;
        }

        return verified;
    }
}
