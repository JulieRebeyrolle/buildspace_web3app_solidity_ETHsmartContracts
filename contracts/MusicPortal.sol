// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MusicPortal {

    uint totalSongsShared;

    constructor() {

    }

    function shareSong() public {
        totalSongsShared += 1;
        console.log('%s has shared a song!', msg.sender);
    }

    function getTotalSongs() public view returns (uint256) {
        console.log('We have %d total songs!', totalSongsShared);

        return totalSongsShared;
    }
}