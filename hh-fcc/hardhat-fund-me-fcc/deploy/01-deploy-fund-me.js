//const { networkConfig } = require("../helper-hardhat-config");
const { network } = require("hardhat");
const { developmentChains } = require("../hepler-hardhat-config");
const {verify} = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments}) =>{
    //const { } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    //AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
    let ethUsdPriceFeedAddress;
    if(developmentChains.includes(network.name)){
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    }else{
        console.log("********")
       // ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeedAddress"]
    }
    
    const fundMe = await deploy("FundMe",{
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    const args = [ethUsdPriceFeedAddress]

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
        await verify(fundMe.address, args)
    }
    console.log("____________________________________")
}
module.exports.tags = ["all","fundme"]
/*
module.exports = async(hre) =>{
    const { getNamedAccounts, deployments } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    
}
*/