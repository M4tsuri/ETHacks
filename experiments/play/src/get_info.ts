/**
 * create a contract with raw transcation
 */

import Web3 from 'web3';
import { toWei, toBN } from 'web3-utils';
import { bufferToHex, keccak256, rlp } from 'ethereumjs-util';

var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"))

/**
 * create a contract with raw transcation
 * we just set T_t to \emptyset and data as the init code we want to execute
 * then the ethereum will enter a contract creation process and 
 * execute our init code
 */ 
async function main() {
    const failed_creating = "0xdFB0320B7852b3052Ca9d9B746EE747B067d663C";
    const selfdestructed = "0x3C38295c725b91821CE331d9f345e8A337DC3AB9"
    const succeeded = "0x1df6a68D88A7fc027Ea4aA35d7DB1Ae3aEA2f0b2"
    console.log(`Failed: ${await web3.eth.getTransactionCount(failed_creating)}`)
    console.log(`Selfdestructed: ${await web3.eth.getTransactionCount(selfdestructed)}`)
    console.log(`Succeed: ${await web3.eth.getTransactionCount(succeeded)}`)
}
 
main().catch(e => {
    console.log("Error: " + e)
})
 