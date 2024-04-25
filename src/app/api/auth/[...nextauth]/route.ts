import NextAuth from "next-auth"
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/utils/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}

export { handler as GET, handler as POST };