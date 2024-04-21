import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";
import { verifySignIn } from "@solana/wallet-standard-util";
import { SolanaSignInOutput, SolanaSignInInput } from "@solana/wallet-standard-features";
import { getCsrfToken } from "next-auth/react";
import { error } from "console";
import { IdentifierArray, WalletAccount } from '@wallet-standard/base';
import { PublicKey } from "@solana/web3.js";
 
// interface Test {
//   chains: IdentifierArray;
//   address: string;
//   features: IdentifierArray;
//   publicKey: Uint8Array;
// }

async function handler(req: NextApiRequest, res: NextApiResponse) {

  const providers = [
      CredentialsProvider({
        name: "credentials",
        id: "credentials",
        credentials: {
          output: {
            label: "SigninOutput",
            type: "text"
          },
          input: {
            label: "SigninInput",
            type: "text",
          }
        },
          async authorize(credentials, req) {
            try {
              const jsonOutput: any = await JSON.parse(credentials?.output || "");
              const jsonInput: SolanaSignInInput = await JSON.parse(credentials?.input || "");
              const csrfToken = await getCsrfToken({ req: { ...req, body: null } });

              const length = jsonOutput.account.publicKeyLength;
              delete jsonOutput.account.publicKeyLength;

              let account = {...jsonOutput.account, publicKey: new Uint8Array(length)};
              
              for (let i = 0; i < length; i++) {
                account.publicKey[i] = jsonOutput.account.publicKey[i];
              }

              const output: SolanaSignInOutput = {
                account: account,
                signedMessage: new Uint8Array(jsonOutput.signedMessage.data),
                signature: new Uint8Array(jsonOutput.signature.data),
              };

              const input: SolanaSignInInput = {...jsonInput, nonce: csrfToken};

              if (!verifySignIn(input, output)) {
                throw new Error("Invalid signature");
              }

              // throw new Error("TEST");

              return {
                id: "gsdgdsgdsgsdgds",
                output: credentials?.output,
              };
            } catch (error: any) {
                console.log(error);
                return null;
            }
        },
      }),
    ];

  return await NextAuth(req, res, {
    session: {
      strategy: "jwt",
    },
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/",
    },
  });
}

export { handler as GET, handler as POST };