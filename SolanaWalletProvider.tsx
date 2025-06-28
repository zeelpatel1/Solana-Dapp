"use client";

import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';

export const SolanaWalletProvider = ({children}:{children:React.ReactNode}) => {

    const endpoint=useMemo(()=>process.env.NEXT_PUBLIC_SOLANA_URL1 as string,[])

    const wallets = useMemo(() => [
        new UnsafeBurnerWalletAdapter(),
    ], []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton />
                    
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};