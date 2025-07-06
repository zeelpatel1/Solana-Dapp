"use client"
import React, { useState } from 'react'
import { useWallet,useConnection } from '@solana/wallet-adapter-react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
  } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";  
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';


// export const metadata:Metadata = {
//   title: "Send SOL | Solana Transfer Tool",
//   description: "Transfer SOL from your wallet to any Solana address easily.",
//   keywords: ["Solana", "Send SOL", "Transaction", "Transfer", "Wallet", "Crypto"],
//   openGraph: {
//     title: "Send SOL on Solana",
//     description: "Instantly send SOL from your wallet to any Solana address.",
//     url: "",
//     siteName: "Solana Tools",
//     type: "website",
//   }
// };


const SendTransaction = () => {
    const {connection}=useConnection()
    const {publicKey, sendTransaction}=useWallet()

    const [toAddress,setToAddress]=useState('')
    const [amount,setAmount]=useState("")
    const [loading,setLoading]=useState(false)

    const handleTransaction=async()=>{

        if (!publicKey || !toAddress || !amount) {
            alert("Please fill all fields correctly.")
            return
        }

        try {
            setLoading(true)
            const toPubKey = new PublicKey(toAddress)
            const lamports = parseFloat(amount) * LAMPORTS_PER_SOL

            const transaction=new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey:publicKey,
                    toPubkey:toPubKey,
                    lamports:lamports
                })
            )
            const signature=await sendTransaction(transaction,connection)

            alert("Transaction sent! Signature: " + signature)
        } catch (error) {
            console.error("Transaction error:", error)
        }finally{
            setLoading(false)
        }
    }

  return (
    <div className='max-w-md mx-auto mt-10 relative'>
        <Card className='border bg-white/5 text-black backdrop-blur shadow-md'>
        <CardHeader>
        <CardTitle className="text-xl">Send Transaction</CardTitle>
        </CardHeader>

        <CardContent>
            {publicKey ? (
                <div className="relative">
                <div className="flex-col items-center">
                  <Input value={publicKey?.toBase58()} disabled className='mb-2 bg-gray-200 text-black' />
                  <Input onChange={(e)=>setToAddress(e.target.value)} placeholder="To Address" className='mb-2' />
                  <Input onChange={(e)=>setAmount((e.target.value))} placeholder='Amount in SOL' className='mb-2'/>
                </div>
                <Button
                  className="w-full mt-5"
                  onClick={handleTransaction}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Transaction"}
                </Button>
                
              </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-10">
              <p className="text-xl text-red-400 text-center font-semibold">
                Connect your wallet to see balance
              </p>
            </div>
            )}
        </CardContent>
        </Card>
    </div>
  )
}

export default SendTransaction