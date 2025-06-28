"use client";
import React from 'react';
import WalletStatus from './WalletStatus';
import Nav from './Nav';
import { useWallet } from '@solana/wallet-adapter-react';

const MainPage = () => {
  const { publicKey } = useWallet();

  return (
    <div>
      {!publicKey ? (
        <WalletStatus />
      ) : (
        <Nav />
      )}
    </div>
  );
};

export default MainPage;
