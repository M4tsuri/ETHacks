/**
 * create a contract with raw transcation
 */

import Web3 from 'web3';
import { toWei, toHex } from 'web3-utils';
import { Transaction } from '@ethereumjs/tx';
import { toBuffer } from 'ethereumjs-util';
import Common from '@ethereumjs/common';

var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"))

const account = "0xD4332b1Dcd3f6139c391b6FC1CD505AF66eb617e"
const testPrivKey = "0xf92208ac8d6a14401d8a3268609f2b5a84c767a37d231eb73c862dd0e4f91b48";

/**
 * create a contract with raw transcation
 * we just set T_t to \emptyset and data as the init code we want to execute
 * then the ethereum will enter a contract creation process and 
 * execute our init code
 */ 
async function main() {
  web3.eth.getTransactionCount(account)
    .then(nonce => {
      const common = Common.custom({chainId: 5777});
      var tx = new Transaction({
        nonce: nonce,
        gasPrice: toHex(toWei('20', 'gwei')),
        gasLimit: 100000,
        to: undefined,
        value: 0,
        // see https://blog.fukuball.com/ethereum-%E9%96%8B%E7%99%BC%E7%AD%86%E8%A8%98-23smart-contract-%E5%88%9D%E6%8E%A2%E5%BE%9E-bytecode-%E5%88%B0-solidity/
        /**
         * this data is executed after the contract account is created (see yellow paper (86)) 
         * at this time, the storage and contract code has not yet been initialized 
         * we will call the code in `data` (aka. `init`) to create the real contract 
         * The init code here is:
         * 
         * ```
         * PUSH1 0x03
         * PUSH1 0x05
         * ADD        // 3 + 5 -> 8
         * PUSH1 0x02
         * MUL        // 8 * 2 -> 16
         * PUSH1 0x00
         * SSTORE 
         * ```
         * */ 
        data: "0x6003600501600202600055",
      }, {common: common});

      tx = tx.sign(toBuffer(testPrivKey));

      var raw = '0x' + tx.serialize().toString('hex');
      
      web3.eth.sendSignedTransaction(raw)
        .then(async hash => {
          if (hash.contractAddress == undefined) {
            throw Error("No contract created")
          }
          const contract = hash.contractAddress;
          console.log(`Transcation confirmed: contract is at ${contract}`);
          console.log(`Storage at 0 is ${await web3.eth.getStorageAt(contract, 0)}`)
          console.log(`Account nonce is ${await web3.eth.getTransactionCount(contract)}`)
        })
    });
}

main().catch(e => {
  console.log("Error: " + e)
})
