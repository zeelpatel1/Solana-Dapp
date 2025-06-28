"use client"
import React from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Card,CardHeader,CardTitle,CardDescription,CardContent } from './ui/card'
import { Wallet,Shield,Zap,TrendingUp } from 'lucide-react'
import Nav from './Nav'

const WalletStatus = () => {
    const {publicKey}=useWallet()

  return (
    <div className="text-center mt-4 text-sm">
        {
            !publicKey ? (
                <div className="max-w-2xl mx-auto">
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-2xl">
              <CardHeader className="text-center pb-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Wallet className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-white mb-4">Connect Your Wallet</CardTitle>
                <CardDescription className="text-lg text-gray-300">
                  Connect your Solana wallet to access all features and start interacting with the blockchain
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                    <h3 className="font-semibold text-white mb-1">Secure</h3>
                    <p className="text-sm text-gray-400">Your keys, your crypto</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <Zap className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                    <h3 className="font-semibold text-white mb-1">Fast</h3>
                    <p className="text-sm text-gray-400">Lightning-fast transactions</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
                    <h3 className="font-semibold text-white mb-1">Low Cost</h3>
                    <p className="text-sm text-gray-400">Minimal transaction fees</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
            ) : (
              <Nav/>
            )
        }
    </div>
  )
}

export default WalletStatus