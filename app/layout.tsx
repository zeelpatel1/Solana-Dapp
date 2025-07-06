import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SolanaWalletProvider } from "@/SolanaWalletProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Connect Wallet | Solana DApp",
  description: "Connect your Solana wallet to access minting, airdrops, and more.",
  keywords: ["Solana", "wallet", "connect", "mint", "airdrop", "web3", "dapp"],
  openGraph: {
    title: "Connect Wallet | Solana DApp",
    description: "Access Solana blockchain tools by connecting your wallet.",
    url: "",
    siteName: "Solana DApp",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SolanaWalletProvider >
        {children}
        </SolanaWalletProvider>
      </body>
    </html>
  );
}
