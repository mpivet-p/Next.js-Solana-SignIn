"use client";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { SessionProvider } from 'next-auth/react';
import React, { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { clusterApiUrl } from '@solana/web3.js';
import SignInButton from './SignInButton';
import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import TestButton from './TestButton';

require('@solana/wallet-adapter-react-ui/styles.css');

const WalletMultiButtonDynamic = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton), { ssr: false });
const WalletDisconnectButtonDynamic = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletDisconnectButton), { ssr: false });


const Wallet = () => {

    const network: WalletAdapterNetwork = WalletAdapterNetwork.Devnet;
    const endpoint = clusterApiUrl(network);
    const wallets = useMemo(() => [], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                <SessionProvider>
                    <WalletMultiButtonDynamic />
                    {/* <WalletDisconnectButtonDynamic /> */}
                    {/* <WalletMultiButton />
                    <WalletDisconnectButton /> */}
                    {/* {walletAddress && (
                        <div>
                            {walletAddress?.publicKey?.toBase58()}
                        </div>
                    )} */}
                    <SignInButton />
                    <TestButton />

                </SessionProvider>

            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
  )
}

export default Wallet