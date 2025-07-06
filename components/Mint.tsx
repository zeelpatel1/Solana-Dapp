"use client";
import React, { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import {
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  ExtensionType,
  getMintLen,
  LENGTH_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
} from "@solana/spl-token";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";

import { uploadImageAndMetadata } from "./uploadToPinata";

const Mint = () => {
  const { wallet, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [mintAdd, setMintAdd] = useState("");
  const [txHash, setTxHash] = useState("");
  const [loading,setLoading]=useState(false)

  const [data, setData] = useState({
    name: "",
    symbol: "",
    supply: "",
    description: "",
    imageFile: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async () => {

    setLoading(true)

    if (!wallet || !publicKey) {
      alert("Connect wallet first");
      return;
    }

    if (!data.imageFile) {
      alert("Please upload an image");
      return;
    }

    const supplyAmount = Number(data.supply || "0");
    if (isNaN(supplyAmount) || supplyAmount <= 0) {
      alert("Supply must be a valid number greater than 0");
      return;
    }

    try {

      const { imageURI, metadataURI } = await uploadImageAndMetadata(
        data.imageFile,
        data.name,
        data.symbol,
        data.description
      );

      const mintKeypair = Keypair.generate();

      const tokenMetadata = {
        mint: mintKeypair.publicKey,
        name: data.name,
        symbol: data.symbol,
        uri: metadataURI,
        additionalMetadata: [],
      };

      const mintLen = getMintLen([ExtensionType.MetadataPointer]);
      const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(tokenMetadata).length;

      const lamports = await connection.getMinimumBalanceForRentExemption(
        mintLen + metadataLen
      );

      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: mintLen,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        }),

        createInitializeMetadataPointerInstruction(
          mintKeypair.publicKey,
          publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          9,
          publicKey,
          null,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeInstruction({
          programId: TOKEN_2022_PROGRAM_ID,
          mint: mintKeypair.publicKey,
          metadata: mintKeypair.publicKey,
          name: data.name,
          symbol: data.symbol,
          uri: tokenMetadata.uri,
          mintAuthority: publicKey,
          updateAuthority: publicKey,
        })
      );

      transaction.feePayer = publicKey;
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
      transaction.partialSign(mintKeypair);

      const res = await sendTransaction(transaction, connection);
      setTxHash(res);
      setMintAdd(mintKeypair.publicKey.toBase58());
    } catch (error) {
      console.log(error);
      alert("❌ Failed to create token mint");
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 relative">
      <Card>
        <CardHeader>
          <CardTitle>Create Token</CardTitle>
          {txHash && (
            <div className="mt-4 text-sm text-green-500 break-all">
              ✅ Transaction:{" "}
              <a
                href={`https://explorer.solana.com/tx/${txHash}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {txHash}
              </a>
            </div>
          )}

          {mintAdd && (
            <div className="mt-2 text-sm text-blue-500 break-all">
              🪙 Mint Address:{" "}
              <a
                href={`https://explorer.solana.com/address/${mintAdd}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {mintAdd}
              </a>
            </div>
          )}
        </CardHeader>

        <CardContent>
          {publicKey ? (
            <div className="relative">
              <div className="flex-col items-center">
                <Input
                  name="name"
                  placeholder="Name of token"
                  className="mb-2"
                  value={data.name}
                  onChange={handleChange}
                />
                <Input
                  name="symbol"
                  placeholder="Symbol of token"
                  className="mb-2"
                  value={data.symbol}
                  onChange={handleChange}
                />
                <Input
                  name="description"
                  placeholder="Description"
                  className="mb-2"
                  value={data.description}
                  onChange={handleChange}
                />
                <Input
                  name="supply"
                  type="number"
                  placeholder="Supply (e.g. 1000)"
                  className="mb-2"
                  value={data.supply}
                  onChange={handleChange}
                />
                <Input
                  type="file"
                  className="mb-2"
                  accept="image/*"
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      imageFile: e.target.files?.[0] || null,
                    }))
                  }
                />
              </div>
              <Button
                className="w-full mt-5"
                onClick={handleCreate}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Token"}
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
  );
};

export default Mint;
