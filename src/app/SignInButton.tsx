"use client";
import React from 'react'
import { useSession, signIn, signOut, SessionProvider } from 'next-auth/react'
import { getServerSession } from 'next-auth';

const SignInButton = () => {

  const { data: session } = useSession();

  const handleSignIn = async () => {
    const result = await signIn('credentials', {
        email: 'test@test.com',
        password: 'test',
        redirect: false,
    });

    // if (result?.ok) {
    //   console.log('Signed in successfully:', result);
    // } else {
    //   console.log('Sign-in failed:', result);
    // }
  }
  const handleSignOut = async () => {
    const result = await signOut({
        redirect: false
    });
  }

  return (
    <div>
        {!session && (
            <button onClick={handleSignIn} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700">
                Connect Wallet
            </button>
        )}
        {session && (
        <button onClick={handleSignOut} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700">
            Disconnect
        </button>
        )}
    </div>
  )
}

export default SignInButton