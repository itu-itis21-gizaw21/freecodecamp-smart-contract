const { assert, expect } = require("chai");
const { deployments, ethers, getNamedAccounts, network } = require("hardhat");
const { developmentChains } = require("../../hepler-hardhat-config");

developmentChains.includes(network.name) ? describe.skip :
describe("FundMe", async function(){

    let fundMe;
    let deployer;
    const sendValue = ethers.utils.parseEther("1");
    beforeEach(async function(){
        deployer  = (await getNamedAccounts()).deployer
        fundMe = await ethers.getContractAt("FundMe",deployer)
    })

    it("allows people to fund and withdraw", async function(){
        await fundMe.fund({value: sendValue});
        await fundMe.withdraw();
        const endingBalance = await fundMe.provider.getBalance(fundMe.address)
        assert.equal(endingBalance.toString,"0");
    })

})
    