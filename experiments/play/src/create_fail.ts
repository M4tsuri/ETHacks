/**
 * create a contract with raw transcation
 */

import Web3 from 'web3';
import { toWei, toHex } from 'web3-utils';
import { Transaction, TxData } from '@ethereumjs/tx';
import { toBuffer } from 'ethereumjs-util';
import Common from '@ethereumjs/common';

var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"))

const account = "0xD4332b1Dcd3f6139c391b6FC1CD505AF66eb617e"
const testPrivKey = "0xf92208ac8d6a14401d8a3268609f2b5a84c767a37d231eb73c862dd0e4f91b48";

async function sendRawTransaction(tx: TxData, key: string) {
  const common = Common.custom({chainId: 5777});
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
      await sendRawTransaction({
        nonce: nonce,
        gasPrice: toHex(toWei('20', 'gwei')),
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

      await sendRawTransaction({
        nonce: nonce + 1,
        gasPrice: toHex(toWei('20', 'gwei')),
        gasLimit: 1000000,
        to: undefined,
        value: 0,
        /**
         * INVALID
         * */ 
        data: "0xfe",
      }, testPrivKey)
        .catch(e => {
          console.log("Transaction failed successfully.")
          console.log(e)
        })
        .then(res => {
          console.log(`Gas cost: ${res}`)
        })
    });
}

main().catch(e => {
  console.log("Error: " + e)
})
