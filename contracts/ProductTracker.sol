// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductTracker {
    struct Product {
        string name;
        string description;
        address currentOwner;
        string[] history;
    }

    mapping(string => Product) public products;

    event ProductCreated(string uniqueId, string name, address indexed creator);
    event ProductTransferred(string uniqueId, address indexed from, address indexed to);

    /// @notice Creates a new product
    function createProduct(string memory uniqueId, string memory name, string memory description) public {
        require(products[uniqueId].currentOwner == address(0), "Product already exists");

        Product storage newProduct = products[uniqueId];
        newProduct.name = name;
        newProduct.description = description;
        newProduct.currentOwner = msg.sender;

        emit ProductCreated(uniqueId, name, msg.sender);
    }

    /// @notice Transfers product ownership
    function transferProduct(string memory uniqueId, address newOwner) public {
        Product storage product = products[uniqueId];
        require(product.currentOwner != address(0), "Product does not exist");
        require(product.currentOwner == msg.sender, "Only the current owner can transfer");

        product.history.push(string(abi.encodePacked("Transferred to ", toString(newOwner))));
        address previousOwner = product.currentOwner;
        product.currentOwner = newOwner;

        emit ProductTransferred(uniqueId, previousOwner, newOwner);
    }

    /// @notice Returns product transfer history
    function getProductHistory(string memory uniqueId) public view returns (string[] memory) {
        return products[uniqueId].history;
    }

    /// @notice Utility function to return basic product info
    function getProduct(string memory uniqueId) public view returns (
        string memory name,
        string memory description,
        address owner,
        uint256 historyLength
    ) {
        Product memory p = products[uniqueId];
        return (p.name, p.description, p.currentOwner, p.history.length);
    }

    /// @notice Converts address to string
    function toString(address _addr) internal pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(_addr)));
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(42);

        str[0] = '0';
        str[1] = 'x';

        for (uint256 i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3 + i * 2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }

        return string(str);
    }
}