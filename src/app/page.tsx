import SignInButton from "./SignInButton";
import Wallet from "./Wallet";


export default async function Home() {

  return (
    <div className="flex flex-col justify-start items-end h-screen p-2">
        {/* <SignInButton /> */}
        <Wallet />
      <h1 className="self-center">My Crypto Auth App</h1>
    </div>
  );
}
