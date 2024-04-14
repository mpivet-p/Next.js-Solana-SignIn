"use client";
import React, { useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react';

const TestButton = () => {

    const wallet = useWallet();
    const walletAddress = wallet.publicKey?.toString();

    const signMsg = async () => {
        console.log(walletAddress);
        const sign = new TextEncoder().encode('Hello, world!');

        if (wallet?.signMessage) {
            try {
                const result = await wallet.signMessage(sign);
            } catch (error: any) {
                console.error("");
            }
        }

    }

    useEffect(() => {
        // if (wallet.connected) {
        //     console.log("wallet connected!");
        // } else {
        //     console.log("wallet not connected!");
        // }
        console.log(wallet);
    }, [wallet.connected]);

    const sendTransaction = async () => {
        console.log(walletAddress);
    }

  return (
    <div>
        {/* <button onClick={handleClick}>{walletAddress}</button> */}
        <button className="btn btn-secondary" onClick={signMsg}>Sign Message</button><br />
        <button className="btn btn-primary" onClick={sendTransaction}>Send Transaction</button>
    </div>
  )
}

export default TestButton