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
    // we will create an EOA with acc1, and acc2 will create a contract to hijack the EOA created by acc1
    const acc1 = web3.eth.accounts.privateKeyToAccount("f92208ac8d6a14401d8a3268609f2b5a84c767a37d231eb73c862dd0e4f91b48")
    const acc2 = web3.eth.accounts.privateKeyToAccount("30b51f010baa4496d2bf8f29d1a5e9c12c82833d48fa326d763d8345ed98604d")
    
    // 1. calculate the EOA address
    const acc2_nonce = toBN(await web3.eth.getTransactionCount(acc2.address));
    const acc2_addr = toBN(acc2.address)
    const encoded = rlp.encode([acc2_addr, acc2_nonce])
    const addr = bufferToHex(keccak256(encoded).slice(12, 32));
    await web3.eth.sendTransaction({
        from: acc1.address,
        to: addr,
        // send 0.1 eth
        value: toWei("0.1", "ether"),
    })

    // 2. acc2 create a contract
    console.log(`Account 2 balance [before]: ${await web3.eth.getBalance(acc2.address)}`)
    await web3.eth.sendTransaction({
        from: acc2.address,
        to: undefined,
        data: "6080604052348015600f57600080fd5b503373ffffffffffffffffffffffffffffffffffffffff16fffe",
        value: 0
    })
    console.log(`Account 2 balance [after]: ${await web3.eth.getBalance(acc2.address)}`)

 }
 
 main().catch(e => {
   console.log("Error: " + e)
 })
 