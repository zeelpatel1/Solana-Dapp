import MainPage from '@/components/MainPage'
import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Solana DApp | Home",
  description: "Welcome to the Solana DApp. Connect your wallet to get started with minting tokens, sending SOL, and airdrops.",
  keywords: ["Solana", "mint", "airdrop", "wallet", "transaction", "crypto", "blockchain", "dapp"],
  openGraph: {
    title: "Solana DApp | Home",
    description: "Interact with Solana blockchain directly from the browser.",
    url: "",
    siteName: "Solana DApp",
  }
};

const page = () => {
  return (
    <div>
      <MainPage/>
    </div>
  )
}

export default page