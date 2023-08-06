// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.7; //

contract SimpleStorage{
    uint256 favoriteNumber; 
    mapping(string=> uint256) public nameToFavoriteNmber;
    struct People{
        uint256 favoriteNumber;
        string name;
    }

    People[] public people;

    function store(uint256 _favoriteNumber) virtual public{
         favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns(uint256){
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public{
        people.push(People({favoriteNumber:_favoriteNumber,name:_name}));
        nameToFavoriteNmber[_name] = _favoriteNumber;
    }
}