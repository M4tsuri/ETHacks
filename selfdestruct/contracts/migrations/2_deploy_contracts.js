const Attack = artifacts.require('Attack')
const EtherGame = artifacts.require('EtherGame')

module.exports = function(deployer) {
    deployer.then(async() => {
        await deployer.deploy(EtherGame);
        await deployer.deploy(Attack, EtherGame.address)
    })
}