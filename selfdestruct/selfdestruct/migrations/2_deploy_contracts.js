const SelfDestruct = artifacts.require('SelfDestruct')

module.exports = function(deployer) {
    deployer.deploy(SelfDestruct)
}