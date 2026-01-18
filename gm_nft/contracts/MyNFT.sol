// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 private _nextTokenId;

    constructor(address initialOwner) ERC721("MyCustomNFT", "MCN") Ownable(initialOwner) {}

    function mint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://bafybeihtabho2qk7he2552gy74gqssgt6hw422vimtx7g474zcas6ostae/";
    }                  
}