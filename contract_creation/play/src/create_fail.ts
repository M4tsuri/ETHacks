/**
 * create a contract with raw transcation
 */

import Web3 from 'web3';
import { toWei, toHex, toBN } from 'web3-utils';
import { Transaction, TxData } from '@ethereumjs/tx';
import { toBuffer } from 'ethereumjs-util';
import Common, { CustomChain } from '@ethereumjs/common';

var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"))
// var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/c26185f06e4f4b96a954880736b79e56"))

// const account = "0x8C174c451BB55995B7550d7dFc5E41D8Cd31a0e5"
// const testPrivKey = "0xb9146010e6c4ac81443c43c0024ee5bda58f6dd1db0ad182fdfb4c2ebbc8f569"
const account = "0xD4332b1Dcd3f6139c391b6FC1CD505AF66eb617e"
const testPrivKey = "0xf92208ac8d6a14401d8a3268609f2b5a84c767a37d231eb73c862dd0e4f91b48";

async function sendRawTransaction(tx: TxData, key: string) {
  const common = Common.custom({chainId: 5777});
  // const common = Common.custom({chainId: 4})
  var transaction = new Transaction(tx, {common: common});
  transaction = transaction.sign(toBuffer(key))
  var raw = '0x' + transaction.serialize().toString('hex');
  return web3.eth.sendSignedTransaction(raw)
}

/**
 * create a contract with raw transcation
 * we just set T_t to \emptyset and data as the init code we want to execute
 * then the ethereum will enter a contract creation process and 
 * execute our init code
 */ 
async function main() {
  web3.eth.getTransactionCount(account)
    .then(async nonce => {
      console.log(`Nonce is ${nonce}`)

      const gasPrice = toBN(toWei('20', 'gwei'));
      await sendRawTransaction({
        nonce: nonce,
        gasPrice,
        gasLimit: 1000000,
        to: undefined,
        value: 0,
        /**
         * STOP
         * */ 
        data: "0x00",
      }, testPrivKey)
        .then(res => {
          console.log(`Transaction succeed, gas cost: ${res.gasUsed}`)
        })
      

      var balance_before = await web3.eth.getBalance(account);
      await sendRawTransaction({
        nonce: nonce + 1,
        gasPrice,
        gasLimit: 1000000,
        to: undefined,
        value: 0,
        /**
         * INVALID
         * */ 
        data: "0xfe",
      }, testPrivKey)
        .catch(_ => {
          console.log("Transaction failed successfully.")
        })
        .then(async _ => {
          const balance_after = await web3.eth.getBalance(account);
          console.log(`Gas cost: ${toBN(balance_before).sub(toBN(balance_after)).div(gasPrice)}`)
        })

      balance_before = await web3.eth.getBalance(account);
      await sendRawTransaction({
        nonce: nonce + 2,
        gasPrice,
        gasLimit: 1000000,
        to: undefined,
        value: 0,
        /**
         * INVALID
         * */ 
        data: "0x6006600c60003960066000fe600035600055",
      }, testPrivKey)
        .catch(_ => {
          console.log("Transaction failed successfully.")
        })
        .then(async _ => {
          const balance_after = await web3.eth.getBalance(account);
          console.log(`Gas cost: ${toBN(balance_before).sub(toBN(balance_after)).div(gasPrice)}`)
        })
    });
}

main().catch(e => {
  console.log("Error: " + e)
})
