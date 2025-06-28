"use client";

import React, { useEffect, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import {
  Card, CardHeader, CardTitle, CardContent, CardFooter
} from './ui/card';
import { Button } from "@/components/ui/button";
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

const Balance = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBalance = async () => {
    if (!publicKey) return;
    setLoading(true);
    try {
      const lamports = await connection.getBalance(publicKey);
      setBalance(lamports / LAMPORTS_PER_SOL);
    } catch (err) {
      console.error("Error fetching balance:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (publicKey) fetchBalance();
  }, [publicKey, connection]);

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card className="border bg-white/5 text-black backdrop-blur shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Wallet Balance</CardTitle>
        </CardHeader>

        <CardContent>
          {publicKey ? (
            loading ? (
              <p className="text-sm text-gray-400">Loading balance...</p>
            ) : (
              <p className="text-lg font-mono">
                {balance !== null ? `${balance.toFixed(4)} SOL` : "0 SOL"}
              </p>
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-10">
  <p className="text-xl text-red-400 text-center font-semibold">
    Connect your wallet to see balance
  </p>
</div>
          )}
        </CardContent>

        <CardFooter>
          <Button
            onClick={fetchBalance}
            disabled={!publicKey || loading}
            className="w-full"
            variant="secondary"
          >
            {loading ? "Refreshing..." : "Balance"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Balance;
