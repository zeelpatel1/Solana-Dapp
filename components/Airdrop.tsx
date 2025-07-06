"use client";
import React, { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// export const metadata:Metadata = {
//   title: "Solana Airdrop | Devnet Faucet",
//   description: "Send free SOL to any wallet on Solana devnet using a quick airdrop tool.",
//   keywords: ["Solana", "Airdrop", "Devnet", "Faucet", "SOL"],
//   openGraph: {
//     title: "Solana Devnet Airdrop Tool",
//     description: "Send free SOL tokens on devnet instantly.",
//     url: "",
//     siteName: "Solana Faucet",
//     type: "website",
//   }
// };


const Airdrop = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const [showDropdown, setShowDropdown] = useState(false);
  const [loading,setLoading]=useState(false)
  const [amount, setAmount] = useState("1");
  const [address,setAddress]=useState('')
  const amountOptions = ["0.5", "1", "2.5", "5"];

  const handleAirdrop=async()=>{
    if(!publicKey) return 

    try {
      setLoading(true)
      const pubkey=new PublicKey(address)
      const lamport=parseFloat(amount) * LAMPORTS_PER_SOL
      const res=await connection.requestAirdrop(pubkey,lamport)
      console.log(res)
      if(res){
        alert("Airdrop successful!");
      }
    } catch (error) {
      console.error("Airdrop failed:", error);
    }finally{
      setLoading(false)
    }

  }

  return (
    <div className="max-w-md mx-auto mt-10 relative">
      <Card className="border bg-white/5 text-black backdrop-blur shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Airdrop</CardTitle>
        </CardHeader>

        <CardContent>
          {publicKey ? (
            <div className="relative">
              <div className="flex items-center gap-4">
                <Input onChange={(e)=>setAddress(e.target.value)} placeholder="Wallet Address" className="flex-1" />
                <Button onClick={() => setShowDropdown(!showDropdown)}>
                  {amount} SOL
                </Button>
              </div>
              <Button
                className="w-full mt-5"
                onClick={handleAirdrop}
                disabled={!address}
              >
                {loading ? "Airdropping..." : "Confirm Airdrop"}
              </Button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 z-50 bg-black text-white p-4 rounded shadow-lg grid grid-cols-2 gap-4">
                  {amountOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setAmount(option);
                        setShowDropdown(false);
                      }}
                      className="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 transition text-center"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
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
  );
};

export default Airdrop;
