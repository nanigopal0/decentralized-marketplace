// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Demo {
    struct User {
        string name;
        uint age;
    }

    mapping(address => User) private  users;

    function setUser(string memory name, uint age) public {
        users[msg.sender] = User(name, age);
    }

    function getUser(address userAddr) public view returns (string memory, uint) {
        User memory u = users[userAddr];
        return (u.name, u.age);
    }

}
