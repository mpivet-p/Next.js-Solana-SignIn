import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server";

export const GET = async () => {

    const session = await getServerSession();
    console.log(session)

    return NextResponse.json({ message: 'Hello, Next.js!', session: session }, { status: 200 });
}

