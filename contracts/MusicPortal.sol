// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MusicPortal {

    uint256 totalSongsShared;
    uint256 private seed;

    event NewSong(address indexed from, uint256 timestamp, string message);

    struct Song {
        address userAddress;
        string url;
        uint256 timestamp;
    }

    Song[] songs;

    mapping(address => uint256) public lastSharedAt;

    constructor() payable {
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function shareSong(string memory _message) public {
        require(
            lastSharedAt[msg.sender] + 15 seconds < block.timestamp,
            "Wait a little"
        );

        lastSharedAt[msg.sender] = block.timestamp;

        totalSongsShared ++;

        songs.push(Song(msg.sender, _message, block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100;

        if (seed <= 10) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewSong(msg.sender, block.timestamp, _message);
    }

    function getAllSongs() public view returns (Song[] memory) {
        return songs;
    }

    function getTotalSongs() public view returns (uint256) {
        return totalSongsShared;
    }
}