import Link from "next/link";
import Wallet from "./components/Wallet";


export default async function Home() {

  return (
    <div className="flex flex-col justify-start h-screen p-2">
      <div className="flex flex-col justify-start items-end">
        <Wallet />
      </div>
      <h1 className="self-center text-4xl font-bold text-purple-700">My Crypto Auth App</h1>
      <div className="flex flex-col h-screen justify-center items-center">
        <p>Click the button below. If you are redirected to /api/test, you are authenticated!</p><br />
        <Link href="/api/test">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded cursor-pointer w-fit">Test API endpoint</div>
        </Link>
      </div>
    </div>
  );
}
// mx-auto w-fit my-24