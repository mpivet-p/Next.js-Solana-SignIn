"use client";
import React, { useEffect } from 'react'
import { useSession, signIn, signOut, SignInResponse, getCsrfToken } from 'next-auth/react'
import dynamic from 'next/dynamic';
import { useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import { SolanaSignInInput, SolanaSignInOutput } from '@solana/wallet-standard-features';

const WalletMultiButtonDynamic = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton), { ssr: false });


const SignInButton = () => {

  const { data: session, status } = useSession();
  const wallet: WalletContextState = useWallet();

  const handleSignIn = async () => {

    if (!wallet.signIn) {
      console.warn("Wallet not supported!");
      return;
    }

    const csrfToken = await getCsrfToken();

    const input: SolanaSignInInput = {
      domain: window.location.host,
      address: wallet.publicKey?.toBase58() || '',
      statement: 'Sign in to the App',
      nonce: csrfToken,
    }

    const output: SolanaSignInOutput = await wallet.signIn(input)

    const jsonOutput: string = JSON.stringify({...output, account: {
      address: output.account.address,
      chains: output.account.chains,
      features: output.account.features,
      icon: output.account.icon,
      label: output.account.label,
      publicKey: output.account.publicKey,
      publicKeyLength: output.account.publicKey.length,
    }});
    const jsonInput: string = JSON.stringify(input);

    try {
      let result: SignInResponse | undefined = await signIn('credentials', {
          output: jsonOutput,
          input: jsonInput,
          redirect: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSignOut = async () => {
    const result = await signOut({
        redirect: false
    });
  }

  useEffect(() => {
    if (wallet.connected === false && status === "authenticated") {
      handleSignOut();
    } else if (wallet.connected === true && status === "unauthenticated") {
      handleSignIn();
    }

  }, [wallet.connected])

  return (
    <>
        <WalletMultiButtonDynamic />
    </>
  )
}

export default SignInButton