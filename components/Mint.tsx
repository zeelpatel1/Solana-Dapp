"use client"
import React from 'react'
import { useWallet,useConnection } from '@solana/wallet-adapter-react'
import { Button } from './ui/button'
import {createMint} from '@solana/spl-token'
import {pack} from '@solana/spl-token-metadata'
import {Keypair,sendAndConfirmTransaction,SystemProgram,Transaction,} from '@solana/web3.js';

const Mint = () => {
  return (
    <div>Mint</div>
  )
}

export default Mint